# Security Center Partners

5 endpoints.

## GET /accounts/{account_id}/security-center/partners/{partner}/settings

Retrieves Partner Integration Settings

operationId: `get-security-center-partner-settings`

**Response** 200 → `result`

- `enabled`: boolean **required** — Whether the partner integration is enabled for the account.
- `resolution_status`: string enum: `resolved`, `not_found`, `no_zones`, `pending` — Whether the account has been matched with the partner. `resolved` means a match was found, `not_found` means the partner has no record of th

## POST /accounts/{account_id}/security-center/partners/{partner}/settings

Updates Partner Integration Settings

operationId: `update-security-center-partner-settings`

**Request** (application/json)

- `enabled`: boolean **required** — Whether the partner integration is enabled for the account.

**Response** 200 → `result`

- `enabled`: boolean **required** — Whether the partner integration is enabled for the account.

## GET /accounts/{account_id}/security-center/partners/{partner}/shadow-zones

Lists Partner-Discovered Shadow Zones

operationId: `get-security-center-partner-shadow-zones` · query: `cursor`, `per_page`

**Response** 200 → `result`

- `collection_truncated`: boolean **required** — Whether the partner reported that the parent organization's domain collection was truncated.
- `entitlement`: string **required** enum: `baseline`, `premium` — The account's feature level for the partner integration.
- `items`: object[] **required** — Paginated shadow zones. Empty for baseline accounts.
  [array of]
  - `discovered_at`: string **required** — When the partner first discovered the domain.
  - `domain`: string **required** — A partner-discovered domain that is not in the account.
  - `shadow_host_count`: integer **required** — Number of partner-discovered hosts beneath the domain that are not in the account.
- `total_count`: integer **required** — Total number of shadow zones discovered for the account.

## GET /accounts/{account_id}/security-center/partners/{partner}/shadow-zones/{domain}/hosts

Lists Hosts in a Partner-Discovered Shadow Zone

operationId: `get-security-center-partner-shadow-zone-hosts` · query: `cursor`, `per_page`

**Response** 200 → `result`

- `collection_truncated`: boolean **required** — Whether the partner reported that the parent domain's host collection was truncated.
- `domain`: string **required** — The parent domain for the returned hosts.
- `entitlement`: string **required** enum: `baseline`, `premium` — The account's feature level for the partner integration.
- `items`: object[] **required** — Paginated shadow hosts. Empty for baseline accounts.
  [array of]
  - `criticality`: string **required** enum: `unknown`, `idle`, `low`, `medium`, `high` — The partner-provided criticality, or `unknown` when unavailable or unrecognized.
  - `discovered_at`: string **required** — When the partner first discovered the host.
  - `hosting_provider`: string **required** — The observed hosting provider, or `unknown` when unavailable.
  - `hostname`: string **required**
  - `ip_address`: string **required** — The IP address observed for the host.
  - `issue_count`: integer — Number of active Security Center insights associated with the host. Present only in zone-level shadow-host responses.
- `total_count`: integer **required** — Total number of shadow hosts discovered beneath the domain.

## GET /zones/{zone_id}/security-center/partners/{partner}/shadow-hosts

Lists Partner-Discovered Shadow Hosts for a Zone

operationId: `get-zone-security-center-partner-shadow-hosts` · query: `cursor`, `per_page`

**Response** 200 → `result`

- `collection_truncated`: boolean **required** — Whether the partner reported that the parent domain's host collection was truncated.
- `domain`: string **required** — The parent domain for the returned hosts.
- `entitlement`: string **required** enum: `baseline`, `premium` — The account's feature level for the partner integration.
- `items`: object[] **required** — Paginated shadow hosts. Empty for baseline accounts.
  [array of]
  - `criticality`: string **required** enum: `unknown`, `idle`, `low`, `medium`, `high` — The partner-provided criticality, or `unknown` when unavailable or unrecognized.
  - `discovered_at`: string **required** — When the partner first discovered the host.
  - `hosting_provider`: string **required** — The observed hosting provider, or `unknown` when unavailable.
  - `hostname`: string **required**
  - `ip_address`: string **required** — The IP address observed for the host.
  - `issue_count`: integer — Number of active Security Center insights associated with the host. Present only in zone-level shadow-host responses.
- `total_count`: integer **required** — Total number of shadow hosts discovered beneath the domain.
