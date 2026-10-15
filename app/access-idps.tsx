import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Alert, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow, ToggleRow, ValueRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import type {
  AccessIdentityProvider,
  AccessIdentityProviderConfig,
  AccessIdentityProviderType,
  AccessScimGroup,
  AccessScimUser,
} from '@/services/cloudflare';
import { usePremium } from '@/services/premium';
import { PremiumPaywall } from '@/components/ui/premium-gate';

// Config fields per provider type, taken from the schema's 17 type variants.
// Only plain strings, string lists and one boolean per type are editable here;
// everything else (custom claims, SAML attribute/header mappings, prompt,
// encryption and conditional-access flags) is preserved untouched on edit.
type StrKey =
  | 'client_id' | 'client_secret' | 'directory_id' | 'apps_domain'
  | 'centrify_account' | 'centrify_app_id' | 'auth_url' | 'token_url' | 'certs_url'
  | 'issuer_url' | 'okta_account' | 'authorization_server_id' | 'onelogin_account'
  | 'ping_env_id' | 'sso_target_url' | 'email_attribute_name';
type ListKey = 'scopes' | 'idp_public_certs';
type FieldKey = StrKey | ListKey;
type BoolKey = 'support_groups' | 'pkce_enabled' | 'sign_request' | 'restrict_to_account_members' | 'login_page_auto_prompt';

const OAUTH: FieldKey[] = ['client_id', 'client_secret'];

const TYPE_SPEC: Record<AccessIdentityProviderType, { fields: FieldKey[]; toggles: BoolKey[] }> = {
  onetimepin: { fields: [], toggles: [] },
  github: { fields: OAUTH, toggles: [] },
  google: { fields: OAUTH, toggles: [] },
  facebook: { fields: OAUTH, toggles: [] },
  linkedin: { fields: OAUTH, toggles: [] },
  yandex: { fields: OAUTH, toggles: [] },
  'google-apps': { fields: [...OAUTH, 'apps_domain'], toggles: [] },
  azureAD: { fields: [...OAUTH, 'directory_id'], toggles: ['support_groups'] },
  okta: { fields: [...OAUTH, 'okta_account', 'authorization_server_id'], toggles: [] },
  onelogin: { fields: [...OAUTH, 'onelogin_account'], toggles: [] },
  pingone: { fields: [...OAUTH, 'ping_env_id'], toggles: [] },
  centrify: { fields: [...OAUTH, 'centrify_account', 'centrify_app_id'], toggles: [] },
  duo: { fields: [...OAUTH, 'issuer_url'], toggles: [] },
  oidc: { fields: [...OAUTH, 'auth_url', 'token_url', 'certs_url', 'scopes'], toggles: ['pkce_enabled'] },
  saml: { fields: ['issuer_url', 'sso_target_url', 'idp_public_certs', 'email_attribute_name'], toggles: ['sign_request'] },
  cloudflare: { fields: [], toggles: ['restrict_to_account_members'] },
  passkeys: { fields: [], toggles: ['login_page_auto_prompt'] },
};

const TYPE_ORDER: AccessIdentityProviderType[] = [
  'onetimepin', 'github', 'google', 'google-apps', 'azureAD', 'okta', 'oidc', 'saml',
  'onelogin', 'pingone', 'centrify', 'duo', 'facebook', 'linkedin', 'yandex', 'cloudflare', 'passkeys',
];

// Brand names stay as-is; only the generic one-time PIN label is translated.
const BRAND_LABEL: Partial<Record<AccessIdentityProviderType, string>> = {
  github: 'GitHub', google: 'Google', 'google-apps': 'Google Workspace', azureAD: 'Microsoft Entra ID',
  okta: 'Okta', oidc: 'OpenID Connect', saml: 'SAML', onelogin: 'OneLogin', pingone: 'PingOne',
  centrify: 'Centrify', duo: 'Duo', facebook: 'Facebook', linkedin: 'LinkedIn', yandex: 'Yandex',
  cloudflare: 'Cloudflare', passkeys: 'Passkeys',
};

const PLACEHOLDER: Partial<Record<FieldKey, string>> = {
  apps_domain: 'example.com',
  directory_id: '00000000-0000-0000-0000-000000000000',
  okta_account: 'https://dev-123456.okta.com',
  authorization_server_id: 'aus9o8wzkhckw9TLa0h7',
  onelogin_account: 'https://example.onelogin.com',
  centrify_account: 'https://abc123.my.centrify.com/',
  auth_url: 'https://idp.example.com/oauth2/authorize',
  token_url: 'https://idp.example.com/oauth2/token',
  certs_url: 'https://idp.example.com/oauth2/keys',
  scopes: 'openid email profile',
  issuer_url: 'https://idp.example.com',
  sso_target_url: 'https://idp.example.com/sso/saml',
  idp_public_certs: '-----BEGIN CERTIFICATE-----',
  email_attribute_name: 'email',
};

const CERT_RE = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;

function splitCerts(text: string): string[] {
  const found = text.match(CERT_RE);
  if (found && found.length) return found.map((c) => c.trim());
  const one = text.trim();
  return one ? [one] : [];
}

export default function AccessIdpsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();
  const premium = usePremium();

  const [idps, setIdps] = useState<AccessIdentityProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Editor
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AccessIdentityProvider | null>(null);
  const [formType, setFormType] = useState<AccessIdentityProviderType>('onetimepin');
  const [formName, setFormName] = useState('');
  const [values, setValues] = useState<Partial<Record<FieldKey, string>>>({});
  const [toggles, setToggles] = useState<Partial<Record<BoolKey, boolean>>>({});
  const [saving, setSaving] = useState(false);

  // Detail
  const [detail, setDetail] = useState<AccessIdentityProvider | null>(null);
  const [scimUsers, setScimUsers] = useState<AccessScimUser[] | null>(null);
  const [scimGroups, setScimGroups] = useState<AccessScimGroup[] | null>(null);
  const [scimLoading, setScimLoading] = useState(false);
  const [certBusy, setCertBusy] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';
  const typeLabel = (type: AccessIdentityProviderType) =>
    type === 'onetimepin' ? t('access_idps.type_onetimepin') : BRAND_LABEL[type] ?? type;

  const fetchIdps = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getAccessIdentityProviders(accountId);
      setIdps(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchIdps(); }, [fetchIdps]);

  const openCreate = () => {
    setEditing(null);
    setFormType('onetimepin');
    setFormName('');
    setValues({});
    setToggles({});
    setShowForm(true);
  };

  const openEdit = (idp: AccessIdentityProvider) => {
    const spec = TYPE_SPEC[idp.type] ?? { fields: [], toggles: [] };
    const v: Partial<Record<FieldKey, string>> = {};
    for (const f of spec.fields) {
      if (f === 'client_secret') continue; // redacted by the API; blank keeps the current one
      if (f === 'scopes') v.scopes = (idp.config?.scopes ?? []).join(' ');
      else if (f === 'idp_public_certs') v.idp_public_certs = (idp.config?.idp_public_certs ?? []).join('\n\n');
      else v[f] = idp.config?.[f] ?? '';
    }
    const b: Partial<Record<BoolKey, boolean>> = {};
    for (const k of spec.toggles) b[k] = !!idp.config?.[k];
    setEditing(idp);
    setFormType(idp.type);
    setFormName(idp.name);
    setValues(v);
    setToggles(b);
    setDetail(null);
    setShowForm(true);
  };

  const buildConfig = (): AccessIdentityProviderConfig => {
    const spec = TYPE_SPEC[formType];
    // Start from the existing config on edit so fields this form does not show survive the PUT.
    const cfg: AccessIdentityProviderConfig = editing && editing.type === formType ? { ...editing.config } : {};
    delete cfg.redirect_url; // read-only
    for (const f of spec.fields) {
      const raw = (values[f] ?? '').trim();
      if (f === 'scopes') {
        const list = raw.split(/[\s,]+/).filter(Boolean);
        if (list.length) cfg.scopes = list; else delete cfg.scopes;
      } else if (f === 'idp_public_certs') {
        const list = splitCerts(raw);
        if (list.length) cfg.idp_public_certs = list; else delete cfg.idp_public_certs;
      } else if (raw) {
        cfg[f] = raw;
      } else {
        delete cfg[f];
      }
    }
    for (const k of spec.toggles) cfg[k] = !!toggles[k];
    return cfg;
  };

  const submit = async () => {
    if (!accountId) return;
    const name = formName.trim();
    if (!name) return;
    setSaving(true);
    try {
      const body = {
        name,
        type: formType,
        config: buildConfig(),
        ...(editing?.scim_config ? { scim_config: editing.scim_config } : {}),
      };
      if (editing?.id) {
        const id = editing.id;
        const res = await api.updateAccessIdentityProvider(accountId, id, body);
        if (res.result) setIdps((prev) => prev.map((x) => (x.id === id ? res.result : x)));
      } else {
        const res = await api.createAccessIdentityProvider(accountId, body);
        if (res.result) setIdps((prev) => [...prev, res.result]);
      }
      setShowForm(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (idp: AccessIdentityProvider) => {
    if (!accountId || !idp.id) return;
    const id = idp.id;
    Alert.alert(t('access_idps.delete_title'), t('access_idps.delete_confirm', { name: idp.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteAccessIdentityProvider(accountId, id);
            setIdps((prev) => prev.filter((x) => x.id !== id));
            setDetail(null);
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const openDetail = async (idp: AccessIdentityProvider) => {
    setDetail(idp);
    setScimUsers(null);
    setScimGroups(null);
    if (!accountId || !idp.id || !idp.scim_config?.enabled) return;
    setScimLoading(true);
    // SCIM lists are optional extras; a 403 on either just hides that list.
    const [u, g] = await Promise.allSettled([
      api.getAccessIdpScimUsers(accountId, idp.id),
      api.getAccessIdpScimGroups(accountId, idp.id),
    ]);
    if (u.status === 'fulfilled') setScimUsers(u.value.result ?? []);
    if (g.status === 'fulfilled') setScimGroups(g.value.result ?? []);
    setScimLoading(false);
  };

  const generateSamlCert = async (idp: AccessIdentityProvider) => {
    if (!accountId || !idp.id) return;
    const id = idp.id;
    setCertBusy(true);
    try {
      const res = await api.createAccessIdpSamlCertificate(accountId, id);
      if (res.result) {
        const updated = { ...idp, saml_certificate_set: res.result, saml_certificate_set_id: res.result.uid };
        setIdps((prev) => prev.map((x) => (x.id === id ? updated : x)));
        setDetail(updated);
      }
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setCertBusy(false);
    }
  };

  const copy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert(t('access_idps.copied'));
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('access_idps.title') }} />
        <PremiumPaywall />
      </>
    );
  }

  if (loading) return <Loading />;

  const spec = TYPE_SPEC[formType];
  const detailCert = detail?.saml_certificate_set?.current_certificate;

  return (
    <>
      <Stack.Screen options={{ title: t('access_idps.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchIdps(); }} tintColor={colors.primary} />}
        >
          {!!error && <Banner message={error} />}

          <SectionHeader title={t('access_idps.providers')} />
          {idps.length === 0 ? (
            <EmptyState icon="users" title={t('access_idps.no_idps')} message={t('access_idps.no_idps_message')} />
          ) : (
            idps.map((idp) => (
              <View
                key={idp.id ?? idp.name}
                style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              >
                <ListRow
                  icon="users"
                  title={idp.name}
                  subtitle={typeLabel(idp.type)}
                  onPress={() => openDetail(idp)}
                  chevron
                  trailing={
                    <>
                      {!!idp.scim_config?.enabled && <View><Badge label="SCIM" variant="info" /></View>}
                      {!!idp.read_only && <View><Badge label={t('access_idps.read_only')} /></View>}
                    </>
                  }
                />
              </View>
            ))
          )}
        </ScrollView>

        <Fab label={t('access_idps.add')} onPress={openCreate} />
      </View>

      {/* Detail */}
      <Sheet visible={!!detail} onClose={() => setDetail(null)} title={detail?.name}>
        {!!detail && (
          <>
            <Group>
              <ValueRow label={t('access_idps.type')} value={typeLabel(detail.type)} />
              {!!detail.id && <ValueRow label="ID" value={detail.id} mono />}
              {!!detail.config?.client_id && <ValueRow label={t('access_idps.f_client_id')} value={detail.config.client_id} mono />}
              {!!detail.config?.redirect_url && <ValueRow label={t('access_idps.redirect_url')} value={detail.config.redirect_url} mono />}
              <ValueRow label="SCIM" value={detail.scim_config?.enabled ? t('access_idps.enabled') : t('access_idps.disabled')} />
            </Group>

            {detail.type === 'saml' && (
              <>
                <FieldLabel>{t('access_idps.saml_encryption')}</FieldLabel>
                {detailCert ? (
                  <Group>
                    <ValueRow label={t('access_idps.expires')} value={new Date(detailCert.not_after).toLocaleDateString()} />
                    <ListRow
                      icon="copy"
                      title={t('access_idps.copy_public_cert')}
                      onPress={() => copy(detailCert.public_certificate)}
                    />
                  </Group>
                ) : (
                  <Text style={[styles.note, { color: colors.textSecondary }]}>{t('access_idps.no_saml_cert')}</Text>
                )}
                {!detail.read_only && (
                  <Button
                    title={detailCert ? t('access_idps.rotate_saml_cert') : t('access_idps.generate_saml_cert')}
                    variant="secondary"
                    onPress={() => generateSamlCert(detail)}
                    loading={certBusy}
                    style={styles.spaced}
                  />
                )}
              </>
            )}

            {!!detail.scim_config?.enabled && (
              <>
                <FieldLabel>{t('access_idps.scim_users')}</FieldLabel>
                {scimLoading ? (
                  <Text style={[styles.note, { color: colors.textSecondary }]}>{t('access_idps.loading')}</Text>
                ) : scimUsers === null ? (
                  <Text style={[styles.note, { color: colors.textSecondary }]}>{t('access_idps.scim_unavailable')}</Text>
                ) : scimUsers.length === 0 ? (
                  <Text style={[styles.note, { color: colors.textSecondary }]}>{t('access_idps.scim_none')}</Text>
                ) : (
                  <Group>
                    {scimUsers.map((u, i) => {
                      const email = u.emails?.find((e) => e.primary)?.value ?? u.emails?.[0]?.value;
                      return (
                        <ListRow
                          key={u.id ?? String(i)}
                          icon="user"
                          title={u.displayName ?? email ?? u.id ?? '-'}
                          subtitle={email}
                          trailing={
                            <View>
                              <Badge
                                label={u.active ? t('access_idps.active') : t('access_idps.inactive')}
                                variant={u.active ? 'success' : 'default'}
                              />
                            </View>
                          }
                        />
                      );
                    })}
                  </Group>
                )}

                <FieldLabel>{t('access_idps.scim_groups')}</FieldLabel>
                {scimLoading ? null : scimGroups === null ? (
                  <Text style={[styles.note, { color: colors.textSecondary }]}>{t('access_idps.scim_unavailable')}</Text>
                ) : scimGroups.length === 0 ? (
                  <Text style={[styles.note, { color: colors.textSecondary }]}>{t('access_idps.scim_none')}</Text>
                ) : (
                  <Group>
                    {scimGroups.map((g, i) => (
                      <ListRow key={g.id ?? String(i)} icon="users" title={g.displayName ?? g.id ?? '-'} subtitle={g.externalId} mono />
                    ))}
                  </Group>
                )}
              </>
            )}

            {detail.read_only ? (
              <Text style={[styles.note, { color: colors.textSecondary }]}>{t('access_idps.read_only_note')}</Text>
            ) : (
              <View style={styles.actions}>
                <Button title={t('access_idps.edit_action')} variant="secondary" onPress={() => openEdit(detail)} style={styles.flex} />
                <Button title={t('common.delete')} variant="danger" onPress={() => confirmDelete(detail)} style={styles.flex} />
              </View>
            )}
          </>
        )}
      </Sheet>

      {/* Create / edit */}
      <Sheet
        visible={showForm}
        onClose={() => setShowForm(false)}
        title={editing ? t('access_idps.edit') : t('access_idps.add')}
        footer={<Button title={t('common.save')} onPress={submit} loading={saving} disabled={!formName.trim()} />}
      >
        <Field
          label={t('access_idps.name')}
          placeholder="Company SSO"
          value={formName}
          onChangeText={setFormName}
        />

        <FieldLabel>{t('access_idps.type')}</FieldLabel>
        {editing ? (
          <Text style={[styles.typeFixed, { color: colors.text }]}>{typeLabel(formType)}</Text>
        ) : (
          <ChipRow
            wrap
            value={formType}
            onChange={(v) => { setFormType(v); setValues({}); setToggles({}); }}
            options={TYPE_ORDER.map((ty) => ({ value: ty, label: typeLabel(ty) }))}
          />
        )}

        {spec.fields.length === 0 && spec.toggles.length === 0 && (
          <Text style={[styles.note, { color: colors.textSecondary }]}>{t('access_idps.no_config_needed')}</Text>
        )}

        {spec.fields.map((f) => (
          <Field
            key={f}
            label={t(`access_idps.f_${f}`)}
            placeholder={PLACEHOLDER[f]}
            hint={
              f === 'client_secret' && editing ? t('access_idps.secret_keep_hint')
                : f === 'scopes' ? t('access_idps.scopes_hint')
                  : f === 'idp_public_certs' ? t('access_idps.certs_hint')
                    : undefined
            }
            value={values[f] ?? ''}
            onChangeText={(text) => setValues((prev) => ({ ...prev, [f]: text }))}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={f === 'client_secret'}
            multiline={f === 'idp_public_certs'}
            mono={f !== 'email_attribute_name'}
          />
        ))}

        {spec.toggles.length > 0 && (
          <Group style={styles.spaced}>
            {spec.toggles.map((k) => (
              <ToggleRow
                key={k}
                title={t(`access_idps.t_${k}`)}
                value={!!toggles[k]}
                onValueChange={(v) => setToggles((prev) => ({ ...prev, [k]: v }))}
              />
            ))}
          </Group>
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
  note: { fontSize: FontSize.sm, marginTop: Spacing.sm, marginBottom: Spacing.sm },
  typeFixed: { fontSize: FontSize.md, fontWeight: '600', marginBottom: Spacing.sm },
  spaced: { marginTop: Spacing.md },
  actions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg },
  flex: { flex: 1 },
});
