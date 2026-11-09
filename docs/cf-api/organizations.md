# Organizations

9 endpoints.

## GET /organizations

List organizations the user has access to

operationId: `Organization_listOrganizations` · query: `id`, `name`, `name.startsWith`, `name.endsWith`, `name.contains`, `containing.account`, `containing.user`, `containing.organization`, `parent.id`, `member.email`, `order_by`, `direction`, `page_token`, `page_size`

**Response** 200 → `result`

[array of]
- `create_time`: string **required**
- `id`: any **required**
- `meta`: object **required**
  - `are_child_accounts_accessible_by_org_members`: boolean
  - `hierarchy_tags`: string[] — Ordered chain of organization tags from the root organization down to
    [array]
  - `managed_by`: string
  - `tenant_flags`: any
  - `tenant_type`: string
- `name`: string **required**
- `parent`: object
  - `id`: string **required**
  - `name`: string **required**
- `profile`: object
  - `business_address`: string **required**
  - `business_email`: string **required**
  - `business_name`: string **required**
  - `business_phone`: string **required**
  - `external_metadata`: string **required**

## POST /organizations

Create organization

operationId: `Organizations_createUserOrganization`

**Request** (application/json)

- `name`: string **required** — The Organization name, limited to 65 UTF-8 bytes.
- `parent`: object
  - `id`: string **required**
- `profile`: object — Optional profile fields, each limited to 1,000 UTF-8 bytes. An empty profile is ignored.
  - `business_address`: string
  - `business_email`: string
  - `business_name`: string
  - `business_phone`: string
  - `external_metadata`: string

**Response** 200 → `result`

- `create_time`: string **required**
- `id`: any **required**
- `meta`: object **required**
  - `are_child_accounts_accessible_by_org_members`: boolean
  - `hierarchy_tags`: string[] — Ordered chain of organization tags from the root organization down to
    [array]
  - `managed_by`: string
  - `tenant_flags`: any
  - `tenant_type`: string
- `name`: string **required**
- `parent`: object
  - `id`: string **required**
  - `name`: string **required**
- `profile`: object
  - `business_address`: string **required**
  - `business_email`: string **required**
  - `business_name`: string **required**
  - `business_phone`: string **required**
  - `external_metadata`: string **required**

## DELETE /organizations/{organization_id}

Delete organization

operationId: `Organizations_delete`

**Response** 200 → `result`

- `id`: string **required**

## GET /organizations/{organization_id}

Get organization

operationId: `Organizations_retrieve`

**Response** 200 → `result`

- `create_time`: string **required**
- `id`: any **required**
- `meta`: object **required**
  - `are_child_accounts_accessible_by_org_members`: boolean
  - `hierarchy_tags`: string[] — Ordered chain of organization tags from the root organization down to
    [array]
  - `managed_by`: string
  - `tenant_flags`: any
  - `tenant_type`: string
- `name`: string **required**
- `parent`: object
  - `id`: string **required**
  - `name`: string **required**
- `profile`: object
  - `business_address`: string **required**
  - `business_email`: string **required**
  - `business_name`: string **required**
  - `business_phone`: string **required**
  - `external_metadata`: string **required**

## PUT /organizations/{organization_id}

Update organization

operationId: `Organizations_modify`

**Request** (application/json)

- `name`: string — The Organization name, limited to 65 UTF-8 bytes. An omitted, empty, or unchanged value is a no-op.
- `parent_id`: any — The current parent Organization ID. A different value is rejected; this endpoint cannot move an Organization.

**Response** 200 → `result`

- `create_time`: string **required**
- `id`: any **required**
- `meta`: object **required**
  - `are_child_accounts_accessible_by_org_members`: boolean
  - `hierarchy_tags`: string[] — Ordered chain of organization tags from the root organization down to
    [array]
  - `managed_by`: string
  - `tenant_flags`: any
  - `tenant_type`: string
- `name`: string **required**
- `parent`: object
  - `id`: string **required**
  - `name`: string **required**
- `profile`: object
  - `business_address`: string **required**
  - `business_email`: string **required**
  - `business_name`: string **required**
  - `business_phone`: string **required**
  - `external_metadata`: string **required**

## GET /organizations/{organization_id}/accounts

List organization accounts

operationId: `Organizations_getAccounts` · query: `account_pubname`, `account_pubname.startsWith`, `account_pubname.endsWith`, `account_pubname.contains`, `name`, `name.startsWith`, `name.endsWith`, `name.contains`, `status`, `order_by`, `direction`, `include_tags`, `include_total`, `page_token`, `page_size`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `created_on`: string **required**
- `id`: string **required**
- `name`: string **required**
- `settings`: object **required**
  - `abuse_contact_email`: string **required**
  - `access_approval_expiry`: string **required**
  - `api_access_enabled`: boolean **required**
  - `default_nameservers`: string **required** — Use [DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings) instead. Deprecated.
  - `enforce_twofactor`: boolean **required**
  - `use_account_custom_ns_by_default`: boolean **required** — Use [DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings) instead. Deprecated.
- `tags`: object — Account tags, present only when `include_tags=true` is requested.
- `type`: string **required** enum: `standard`, `enterprise`

## PUT /organizations/{organization_id}/invites/{member_code}

Handle organization invite

operationId: `Organizations_handleOrganizationInvite`

**Request** (application/json)

- `status`: string **required** enum: `accept`, `reject`

**Response** 200 → `result`

- `create_time`: string **required**
- `id`: string **required** — Organization Member ID
- `meta`: object **required**
- `status`: string **required** enum: `active`, `pending`, `rejected`, `canceled`
- `update_time`: string **required**
- `user`: object **required**
  - `email`: string **required**
  - `id`: string **required**
  - `name`: string **required**
  - `two_factor_authentication_enabled`: boolean **required**

## GET /organizations/{organization_id}/profile

Get organization profile

operationId: `Organizations_getProfile`

**Response** 200 → `result`

- `business_address`: string **required**
- `business_email`: string **required**
- `business_name`: string **required**
- `business_phone`: string **required**
- `external_metadata`: string **required**

## PUT /organizations/{organization_id}/profile

Modify organization profile.

operationId: `Organizations_modifyProfile`

**Request** (application/json)

- `business_address`: string
- `business_email`: string
- `business_name`: string
- `business_phone`: string
- `external_metadata`: string
