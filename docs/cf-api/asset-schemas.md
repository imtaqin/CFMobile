# asset_schemas

2 endpoints.

## GET /accounts/{account_id}/data-security/posture/asset_schemas

List asset schemas

operationId: `ListAssetSchemas` · query: `vendor`

**Response** 200 → `result`

[array of]
- `asset_classes`: object[] **required** — Asset classes belonging to this vendor, sorted by asset_class.
  [array of]
  - `asset_class`: string **required** — Asset class identifier (PascalCase), e.g. AnthropicUser.
- `vendor`: string **required** — Canonical vendor enum value, e.g. GOOGLE_WORKSPACE.

## GET /accounts/{account_id}/data-security/posture/asset_schemas/{asset_class}

Get asset schema by asset class

operationId: `GetAssetSchema`

**Response** 200 → `result`

- `asset_class`: string **required** — Asset class identifier (PascalCase), e.g. AnthropicApiKey.
- `schema`: object **required** — Fields and related attributes a custom finding type may reference for this asset
