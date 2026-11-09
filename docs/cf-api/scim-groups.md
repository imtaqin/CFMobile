# SCIM Groups

6 endpoints.

## GET /accounts/{account_id}/scim/v2/Groups

List SCIM Groups

operationId: `scim-groups-list` · query: `startIndex`, `count`, `filter`

**Response** 200 → `result`

- `Resources`: object[] **required**
  [array of]
  - `displayName`: string **required** — A human-readable name for the Group.
  - `externalId`: string — Identifier for the Group as defined by the provisioning client (IdP).
  - `id`: string **required** — Unique identifier for the Group, assigned by Cloudflare. System groups are prefixed `cloudflare-v1-<permissionGroupTag>`; custom groups use 
  - `meta`: object — Resource metadata for a SCIM Group.
    - `resourceType`: string — The name of the resource type.
  - `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:schemas:core:2.0:Group`.
    [array]
- `itemsPerPage`: integer — The number of resources returned in this page.
- `schemas`: string[] **required**
  [array]
- `startIndex`: integer — The 1-based index of the first result in this set.
- `totalResults`: integer **required** — The total number of results matching the query.

## POST /accounts/{account_id}/scim/v2/Groups

Create SCIM Group

operationId: `scim-groups-create`

**Request** (application/scim+json)

- `displayName`: string **required** — A human-readable name for the Group. REQUIRED. Must not start with `CF` (reserved prefix for Cloudflare-managed virtual groups).
- `externalId`: string — Identifier for the Group as defined by the provisioning client (IdP).

**Response** 201 → `result`

- `displayName`: string **required** — A human-readable name for the Group.
- `externalId`: string — Identifier for the Group as defined by the provisioning client (IdP).
- `id`: string **required** — Unique identifier for the Group, assigned by Cloudflare. System groups are prefixed `cloudflare-v1-<permissionGroupTag>`; custom groups use 
- `members`: object[] — A list of members of the Group. Only populated for custom (Phase 2) groups on individual GET requests. Each member object contains a `value`
  [array of]
  - `display`: string — The display name (email) of the group member.
  - `value`: string — The user tag identifier of the group member.
- `meta`: object — Resource metadata for a SCIM Group.
  - `resourceType`: string — The name of the resource type.
- `schemas`: string[] **required**
  [array]

## DELETE /accounts/{account_id}/scim/v2/Groups/{group_id}

Delete SCIM Group

operationId: `scim-groups-delete`

## GET /accounts/{account_id}/scim/v2/Groups/{group_id}

Get SCIM Group

operationId: `scim-groups-get`

**Response** 200 → `result`

- `displayName`: string **required** — A human-readable name for the Group.
- `externalId`: string — Identifier for the Group as defined by the provisioning client (IdP).
- `id`: string **required** — Unique identifier for the Group, assigned by Cloudflare. System groups are prefixed `cloudflare-v1-<permissionGroupTag>`; custom groups use 
- `members`: object[] — A list of members of the Group. Only populated for custom (Phase 2) groups on individual GET requests. Each member object contains a `value`
  [array of]
  - `display`: string — The display name (email) of the group member.
  - `value`: string — The user tag identifier of the group member.
- `meta`: object — Resource metadata for a SCIM Group.
  - `resourceType`: string — The name of the resource type.
- `schemas`: string[] **required**
  [array]

## PATCH /accounts/{account_id}/scim/v2/Groups/{group_id}

Patch SCIM Group

operationId: `scim-groups-patch`

**Request** (application/scim+json)

- `Operations`: object[] **required** — List of PATCH operations to apply.
  [array of]
  - `op`: string **required** enum: `add`, `remove`, `replace` — The operation to perform.
  - `path`: string — Attribute path targeted by this operation. Use `members` to modify group membership. May also include a filter expression to target specific
  - `value`: any — The value(s) for the operation. For member add/replace operations, an array of member value objects. For `displayName` or `externalId` updat
- `schemas`: string[] **required**
  [array]

**Response** 200 → `result`

- `displayName`: string **required** — A human-readable name for the Group.
- `externalId`: string — Identifier for the Group as defined by the provisioning client (IdP).
- `id`: string **required** — Unique identifier for the Group, assigned by Cloudflare. System groups are prefixed `cloudflare-v1-<permissionGroupTag>`; custom groups use 
- `members`: object[] — A list of members of the Group. Only populated for custom (Phase 2) groups on individual GET requests. Each member object contains a `value`
  [array of]
  - `display`: string — The display name (email) of the group member.
  - `value`: string — The user tag identifier of the group member.
- `meta`: object — Resource metadata for a SCIM Group.
  - `resourceType`: string — The name of the resource type.
- `schemas`: string[] **required**
  [array]

## PUT /accounts/{account_id}/scim/v2/Groups/{group_id}

Replace SCIM Group

operationId: `scim-groups-put`

**Request** (application/scim+json)

- `displayName`: string **required** — A human-readable name for the Group.
- `externalId`: string — Identifier for the Group as defined by the provisioning client (IdP). Omission clears the existing value.
- `members`: object[] — The complete replacement member set. Omission is treated as an empty list.
  [array of]
  - `value`: string — The user tag of the member to add or remove.
- `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:schemas:core:2.0:Group`.
  [array]

**Response** 200 → `result`

- `displayName`: string **required** — A human-readable name for the Group.
- `externalId`: string — Identifier for the Group as defined by the provisioning client (IdP).
- `id`: string **required** — Unique identifier for the Group, assigned by Cloudflare. System groups are prefixed `cloudflare-v1-<permissionGroupTag>`; custom groups use 
- `members`: object[] — A list of members of the Group. Only populated for custom (Phase 2) groups on individual GET requests. Each member object contains a `value`
  [array of]
  - `display`: string — The display name (email) of the group member.
  - `value`: string — The user tag identifier of the group member.
- `meta`: object — Resource metadata for a SCIM Group.
  - `resourceType`: string — The name of the resource type.
- `schemas`: string[] **required**
  [array]
