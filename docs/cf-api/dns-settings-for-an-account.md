# DNS Settings for an Account

2 endpoints.

## GET /accounts/{account_id}/dns_settings

Show DNS Settings

operationId: `dns-settings-for-an-account-list-dns-settings`

**Response** 200 → `result`

- `enforce_dns_only`: boolean — When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record's individual proxy 
- `zone_defaults`: object **required** — Default settings for new zones created in this account.

## PATCH /accounts/{account_id}/dns_settings

Update DNS Settings

operationId: `dns-settings-for-an-account-update-dns-settings`

**Request** (application/json)

- `enforce_dns_only`: boolean — When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record's individual proxy 
- `zone_defaults`: object — Default settings for new zones created in this account.

**Response** 200 → `result`

- `enforce_dns_only`: boolean — When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record's individual proxy 
- `zone_defaults`: object **required** — Default settings for new zones created in this account.
