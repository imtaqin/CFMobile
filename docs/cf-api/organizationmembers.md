# OrganizationMembers

5 endpoints.

## GET /organizations/{organization_id}/members

List organization members

operationId: `Members_list` · query: `status`, `user.email`, `user.email.contains`, `user.email.startsWith`, `user.email.endsWith`, `page_token`, `page_size`

**Response** 200 → `result`

[array of]
- `create_time`: string **required**
- `id`: string **required** — Organization Member ID
- `meta`: object **required**
- `policies`: object[] — Direct policies of the membership. Present only for DSR members enrolled in Organization Roles.
  [array of]
  - `id`: string — Omit to create a policy. An unchanged policy keeps its ID; a changed policy is replaced under a new ID.
  - `roles`: object[] **required**
    [array of]
    - `id`: string **required**
  - `scopes`: object[] **required**
    [array of]
    - `key`: string **required** — An Organization (`com.cloudflare.api.tenant.unit.<tag>`) or Account (`com.cloudflare.api.account.<tag>`) key.
    - `subset_of`: object[] — The route Organization for Account scopes. Optional in requests and always returned for Account scopes.
- `status`: string **required** enum: `active`, `pending`, `rejected`, `canceled`
- `update_time`: string **required**
- `user`: object **required**
  - `email`: string **required**
  - `id`: string **required**
  - `name`: string **required**
  - `two_factor_authentication_enabled`: boolean **required**

## POST /organizations/{organization_id}/members

Create organization member

operationId: `Members_create`

**Request** (application/json)

- `member`: object **required**
  - `user`: object **required**
    - `email`: string **required**

**Response** 200 → `result`

- `create_time`: string **required**
- `id`: string **required** — Organization Member ID
- `meta`: object **required**
- `policies`: object[] — Direct policies of the membership. Present only for DSR members enrolled in Organization Roles.
  [array of]
  - `id`: string — Omit to create a policy. An unchanged policy keeps its ID; a changed policy is replaced under a new ID.
  - `roles`: object[] **required**
    [array of]
    - `id`: string **required**
  - `scopes`: object[] **required**
    [array of]
    - `key`: string **required** — An Organization (`com.cloudflare.api.tenant.unit.<tag>`) or Account (`com.cloudflare.api.account.<tag>`) key.
    - `subset_of`: object[] — The route Organization for Account scopes. Optional in requests and always returned for Account scopes.
- `status`: string **required** enum: `active`, `pending`, `rejected`, `canceled`
- `update_time`: string **required**
- `user`: object **required**
  - `email`: string **required**
  - `id`: string **required**
  - `name`: string **required**
  - `two_factor_authentication_enabled`: boolean **required**

## POST /organizations/{organization_id}/members:batchCreate

Batch create organization members

operationId: `Members_batchCreate`

**Request** (application/json)

- `members`: object[] — Omitted or null members are treated as an empty batch.
  [array of]
  - `user`: object **required**
    - `email`: string **required**

**Response** 200 → `result`

[array of]
- `create_time`: string **required**
- `id`: string **required** — Organization Member ID
- `meta`: object **required**
- `policies`: object[] — Direct policies of the membership. Present only for DSR members enrolled in Organization Roles.
  [array of]
  - `id`: string — Omit to create a policy. An unchanged policy keeps its ID; a changed policy is replaced under a new ID.
  - `roles`: object[] **required**
    [array of]
    - `id`: string **required**
  - `scopes`: object[] **required**
    [array of]
    - `key`: string **required** — An Organization (`com.cloudflare.api.tenant.unit.<tag>`) or Account (`com.cloudflare.api.account.<tag>`) key.
    - `subset_of`: object[] — The route Organization for Account scopes. Optional in requests and always returned for Account scopes.
- `status`: string **required** enum: `active`, `pending`, `rejected`, `canceled`
- `update_time`: string **required**
- `user`: object **required**
  - `email`: string **required**
  - `id`: string **required**
  - `name`: string **required**
  - `two_factor_authentication_enabled`: boolean **required**

## DELETE /organizations/{organization_id}/members/{member_id}

Delete organization member

operationId: `Members_delete`

**Response** 200 → `result`

- `id`: string **required**

## GET /organizations/{organization_id}/members/{member_id}

Get organization member

operationId: `Members_retrieve`

**Response** 200 → `result`

- `create_time`: string **required**
- `id`: string **required** — Organization Member ID
- `meta`: object **required**
- `policies`: object[] — Direct policies of the membership. Present only for DSR members enrolled in Organization Roles.
  [array of]
  - `id`: string — Omit to create a policy. An unchanged policy keeps its ID; a changed policy is replaced under a new ID.
  - `roles`: object[] **required**
    [array of]
    - `id`: string **required**
  - `scopes`: object[] **required**
    [array of]
    - `key`: string **required** — An Organization (`com.cloudflare.api.tenant.unit.<tag>`) or Account (`com.cloudflare.api.account.<tag>`) key.
    - `subset_of`: object[] — The route Organization for Account scopes. Optional in requests and always returned for Account scopes.
- `status`: string **required** enum: `active`, `pending`, `rejected`, `canceled`
- `update_time`: string **required**
- `user`: object **required**
  - `email`: string **required**
  - `id`: string **required**
  - `name`: string **required**
  - `two_factor_authentication_enabled`: boolean **required**
