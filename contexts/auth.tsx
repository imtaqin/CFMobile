import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthConfig, CFUser } from '@/services/types';
import * as CF from '@/services/cloudflare';

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
}

interface AuthContextValue extends AuthState {
  login: (config: AuthConfig) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  switchAccount: (accountId: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    accountId: null,
    accounts: [],
    authConfig: null,
  });

  const fetchUser = useCallback(async () => {
    try {
      const [userRes, accountsRes] = await Promise.all([CF.getUser(), CF.getAccounts()]);
      const user = userRes.result;
      const accounts = accountsRes.result ?? [];
      // Pick the account that matches the user's email, otherwise fall back to last account
      // (first account is often a shared/org account where you're a member with limited perms)
      const ownAccount = accounts.find(
        (a) => a.name.toLowerCase().includes(user.email.split('@')[0].toLowerCase())
      );
      const accountId = ownAccount?.id ?? accounts[accounts.length - 1]?.id ?? null;
      setState((s) => ({
        ...s, user, accountId, isAuthenticated: true, isLoading: false,
        accounts,
      }));
    } catch {
      await CF.clearAuth();
      setState({ isLoading: false, isAuthenticated: false, user: null, accountId: null, authConfig: null, accounts: [] });
    }
  }, []);

  useEffect(() => {
    (async () => {
      const config = await CF.loadAuth();
      if (config) {
        setState((s) => ({ ...s, authConfig: config }));
        await fetchUser();
      } else {
        setState((s) => ({ ...s, isLoading: false }));
      }
    })();
  }, [fetchUser]);

  const login = useCallback(async (config: AuthConfig) => {
    await CF.saveAuth(config);
    setState((s) => ({ ...s, authConfig: config }));
    // Verify token works
    if (config.method === 'token') {
      await CF.verifyToken();
    }
    await fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    await CF.clearAuth();
    setState({ isLoading: false, isAuthenticated: false, user: null, accountId: null, accounts: [], authConfig: null });
  }, []);

  const switchAccount = useCallback((accountId: string) => {
    setState((s) => ({ ...s, accountId }));
  }, []);

  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshUser, switchAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
