# Tenants

1 endpoints.

## GET /tenants/{tenant_id}/accounts

List tenant accounts

operationId: `Tenants_listAccounts` · query: `account_pubname`, `account_pubname.startsWith`, `account_pubname.endsWith`, `account_pubname.contains`, `name`, `name.startsWith`, `name.endsWith`, `name.contains`, `status`, `order_by`, `direction`, `include_total`, `page_token`, `page_size`

**Response** 200 → `result`

[array of]
- `account_pubname`: string **required**
- `account_tag`: string **required**
- `account_type`: string **required** enum: `standard`, `enterprise`
- `created_on`: string **required**
- `settings`: object **required**
  - `access_approval_expiry`: string **required**
  - `api_access_enabled`: boolean **required**
  - `enforce_two_factor`: boolean **required**
  - `use_account_custom_ns_by_default`: boolean **required**
