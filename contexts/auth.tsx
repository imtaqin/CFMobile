import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthConfig, CFUser } from '@/services/types';
import * as CF from '@/services/cloudflare';
import * as profiles from '@/services/profiles';
import { Profile } from '@/services/profiles';

interface CFAccount {
  id: string;
  name: string;
  type: string;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: CFUser | null;
  accountId: string | null;
  accounts: CFAccount[];
  authConfig: AuthConfig | null;
  permissions: CF.Permissions | null;
  /** every stored Cloudflare login */
  profiles: Profile[];
  activeProfileId: string | null;
}

interface AuthContextValue extends AuthState {
  login: (config: AuthConfig) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  switchAccount: (accountId: string) => void;
  switchProfile: (id: string) => Promise<void>;
  removeProfile: (id: string) => Promise<void>;
  renameProfile: (id: string, label: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEFAULT_PERMS: CF.Permissions = {
  user: false, accounts: false, zones: false, dns: false, ssl: false,
  firewall: false, cache: false, analytics: false, pageRules: false,
  workers: false, kv: false, r2: false, pages: false, d1: false,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    accountId: null,
    accounts: [],
    authConfig: null,
    permissions: null,
    profiles: [],
    activeProfileId: null,
  });

  const fetchUser = useCallback(async () => {
    let user: CFUser | null = null;
    let accounts: CFAccount[] = [];
    let zoneSample: any = null;
    let zonesAccessible = false;

    try {
      const userRes = await CF.getUser();
      user = userRes.result;
    } catch {
      // Token doesn't have User:Read permission — that's fine
    }

    try {
      const accountsRes = await CF.getAccounts();
      accounts = accountsRes.result ?? [];
    } catch {
      // Token doesn't have Account:Read — try to derive accounts from zones
    }

    try {
      const zonesRes = await CF.getZones(1);
      const zones = zonesRes.result ?? [];
      zonesAccessible = true;
      if (zones.length > 0) {
        zoneSample = zones[0];
        if (accounts.length === 0) {
          // Derive accounts from zone data
          const accountMap = new Map<string, CFAccount>();
          for (const z of zones) {
            if (z.account?.id) {
              accountMap.set(z.account.id, {
                id: z.account.id,
                name: z.account.name ?? 'Account',
                type: 'standard',
              });
            }
          }
          accounts = Array.from(accountMap.values());
        }
      }
    } catch {
      // No zones access either
    }

    // Token is usable if: has user, has accounts, OR zones API is accessible (even if empty)
    if (!user && accounts.length === 0 && !zonesAccessible) {
      await CF.clearAuth();
      setState((s) => ({ ...s, isLoading: false, isAuthenticated: false, user: null, accountId: null, authConfig: null, accounts: [], permissions: null }));
      return;
    }

    // Pick account
    let accountId: string | null = null;
    if (user && accounts.length > 0) {
      const ownAccount = accounts.find(
        (a) => a.name.toLowerCase().includes(user!.email.split('@')[0].toLowerCase())
      );
      accountId = ownAccount?.id ?? accounts[accounts.length - 1]?.id ?? null;
    } else {
      accountId = accounts[0]?.id ?? null;
    }

    // Probe permissions (don't block login if this fails)
    let permissions: CF.Permissions = { ...DEFAULT_PERMS, zones: zonesAccessible };
    try {
      permissions = await CF.probePermissions(zoneSample?.id, accountId ?? undefined);
    } catch {
      // ignore
    }

    // Now that the account is known, give the profile a human label instead of
    // the token fingerprint it was created with.
    const realName = user?.email ?? accounts[0]?.name;
    if (realName) {
      const active = await profiles.getActiveProfile();
      if (active && /^Token ••••/.test(active.label)) {
        await profiles.renameProfile(active.id, realName);
      }
    }
    const list = await profiles.getProfiles();
    const activeAfter = await profiles.getActiveProfile();

    setState((s) => ({
      ...s,
      user,
      accountId,
      accounts,
      isAuthenticated: true,
      isLoading: false,
      permissions,
      profiles: list,
      activeProfileId: activeAfter?.id ?? s.activeProfileId,
    }));
  }, []);

  const loadProfiles = useCallback(async () => {
    const list = await profiles.getProfiles();
    const active = await profiles.getActiveProfile();
    setState((s) => ({ ...s, profiles: list, activeProfileId: active?.id ?? null }));
    return active;
  }, []);

  useEffect(() => {
    (async () => {
      const active = await loadProfiles();
      if (active) {
        await CF.saveAuth(active.config);
        setState((s) => ({ ...s, authConfig: active.config }));
        await fetchUser();
      } else {
        setState((s) => ({ ...s, isLoading: false }));
      }
    })();
  }, [fetchUser, loadProfiles]);

  /** Sign in, or add another Cloudflare login alongside the existing ones. */
  const login = useCallback(async (config: AuthConfig) => {
    await CF.saveAuth(config);
    setState((s) => ({ ...s, authConfig: config }));
    if (config.method === 'token') {
      await CF.verifyToken();
    }
    await profiles.addProfile(config);
    await loadProfiles();
    await fetchUser();
  }, [fetchUser, loadProfiles]);

  /** Switch to another stored login and reload everything for it. */
  const switchProfile = useCallback(async (id: string) => {
    const list = await profiles.getProfiles();
    const target = list.find((p) => p.id === id);
    if (!target) return;

    setState((s) => ({ ...s, isLoading: true }));
    await profiles.setActiveProfile(id);
    await CF.saveAuth(target.config);
    setState((s) => ({
      ...s,
      authConfig: target.config,
      activeProfileId: id,
      // clear the previous account's data so nothing from it lingers on screen
      user: null,
      accounts: [],
      accountId: null,
      permissions: null,
    }));
    await fetchUser();
  }, [fetchUser]);

  const removeProfile = useCallback(async (id: string) => {
    const next = await profiles.removeProfile(id);
    if (!next) {
      await CF.clearAuth();
      setState({
        isLoading: false, isAuthenticated: false, user: null, accountId: null,
        accounts: [], authConfig: null, permissions: null, profiles: [], activeProfileId: null,
      });
      return;
    }
    await loadProfiles();
    await switchProfile(next.id);
  }, [loadProfiles, switchProfile]);

  const renameProfile = useCallback(async (id: string, label: string) => {
    await profiles.renameProfile(id, label);
    await loadProfiles();
  }, [loadProfiles]);

  /** Sign out of everything. */
  const logout = useCallback(async () => {
    await profiles.clearAllProfiles();
    await CF.clearAuth();
    setState({
      isLoading: false, isAuthenticated: false, user: null, accountId: null,
      accounts: [], authConfig: null, permissions: null, profiles: [], activeProfileId: null,
    });
  }, []);

  const switchAccount = useCallback((accountId: string) => {
    setState((s) => ({ ...s, accountId }));
  }, []);

  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, refreshUser, switchAccount, switchProfile, removeProfile, renameProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
