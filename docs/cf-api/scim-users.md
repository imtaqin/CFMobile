# SCIM Users

6 endpoints.

## GET /accounts/{account_id}/scim/v2/Users

List SCIM Users

operationId: `scim-users-list` · query: `startIndex`, `count`, `filter`

**Response** 200 → `result`

- `Resources`: object[] **required**
  [array of]
  - `active`: boolean **required** — A Boolean value indicating the user's administrative status. Set to `false` to deprovision the user, removing their membership from the acco
  - `displayName`: string — The display name shown for the user. Falls back to formatted name or userName if not set.
  - `emails`: object[] — Always contains a single primary work email matching `userName`.
    [array of]
    - `primary`: boolean — A Boolean value indicating the preferred email address.
    - `type`: string — A label indicating the attribute's function, e.g., "work" or "home".
    - `value`: string **required** — The email address value.
  - `externalId`: string — An identifier for the user as defined by the provisioning client (IdP). This value is stored and returned but not interpreted by Cloudflare.
  - `groups`: string[] — A list of group identifiers to which the user belongs. Includes both system group tags (prefixed `cloudflare-v1-`) and custom user group tag
    [array]
  - `id`: string **required** — Unique identifier for the user, assigned by Cloudflare (user tag).
  - `meta`: object — Resource metadata for a SCIM User.
    - `resourceType`: string — The name of the resource type.
  - `name`: object — The components of the user's real name.
    - `familyName`: string — The family name (last name) of the user.
    - `formatted`: string — The full name, including all middle names, titles, and suffixes as appropriate, formatted for display.
    - `givenName`: string — The given name (first name) of the user.
  - `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:schemas:core:2.0:User`.
    [array]
  - `userName`: string **required** — Unique identifier for the user, equal to the user's email address.
- `itemsPerPage`: integer — The number of resources returned in this page.
- `schemas`: string[] **required**
  [array]
- `startIndex`: integer — The 1-based index of the first result in this set.
- `totalResults`: integer **required** — The total number of results matching the query.

## POST /accounts/{account_id}/scim/v2/Users

Create SCIM User

operationId: `scim-users-create`

**Request** (application/scim+json)

- `active`: boolean **required** — A Boolean value indicating the user's administrative status. Must be `true` for user creation.
- `displayName`: string — The name of the user, suitable for display to end-users. If not explicitly set, falls back to the formatted name or userName.
- `emails`: object[] **required** — Email addresses for the user. The primary email must match `userName`.
  [array of]
  - `primary`: boolean — A Boolean value indicating the preferred email address.
  - `type`: string — A label indicating the attribute's function, e.g., "work" or "home".
  - `value`: string **required** — The email address value.
- `externalId`: string — An identifier for the user as defined by the provisioning client (IdP). This value is stored and returned but not interpreted by Cloudflare.
- `name`: object — The components of the user's real name.
  - `familyName`: string — The family name (last name) of the user.
  - `formatted`: string — The full name, including all middle names, titles, and suffixes as appropriate, formatted for display.
  - `givenName`: string — The given name (first name) of the user.
- `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:schemas:core:2.0:User`.
  [array]
- `userName`: string **required** — Unique identifier for the user, equal to the user's email address.

**Response** 201 → `result`

- `active`: boolean **required** — A Boolean value indicating the user's administrative status. Set to `false` to deprovision the user, removing their membership from the acco
- `displayName`: string — The display name shown for the user. Falls back to formatted name or userName if not set.
- `emails`: object[] — Always contains a single primary work email matching `userName`.
  [array of]
  - `primary`: boolean — A Boolean value indicating the preferred email address.
  - `type`: string — A label indicating the attribute's function, e.g., "work" or "home".
  - `value`: string **required** — The email address value.
- `externalId`: string — An identifier for the user as defined by the provisioning client (IdP). This value is stored and returned but not interpreted by Cloudflare.
- `groups`: string[] — A list of group identifiers to which the user belongs. Includes both system group tags (prefixed `cloudflare-v1-`) and custom user group tag
  [array]
- `id`: string **required** — Unique identifier for the user, assigned by Cloudflare (user tag).
- `meta`: object — Resource metadata for a SCIM User.
  - `resourceType`: string — The name of the resource type.
- `name`: object — The components of the user's real name.
  - `familyName`: string — The family name (last name) of the user.
  - `formatted`: string — The full name, including all middle names, titles, and suffixes as appropriate, formatted for display.
  - `givenName`: string — The given name (first name) of the user.
- `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:schemas:core:2.0:User`.
  [array]
- `userName`: string **required** — Unique identifier for the user, equal to the user's email address.

## DELETE /accounts/{account_id}/scim/v2/Users/{user_id}

Delete SCIM User

operationId: `scim-users-delete`

## GET /accounts/{account_id}/scim/v2/Users/{user_id}

Get SCIM User

operationId: `scim-users-get`

**Response** 200 → `result`

- `active`: boolean **required** — A Boolean value indicating the user's administrative status. Set to `false` to deprovision the user, removing their membership from the acco
- `displayName`: string — The display name shown for the user. Falls back to formatted name or userName if not set.
- `emails`: object[] — Always contains a single primary work email matching `userName`.
  [array of]
  - `primary`: boolean — A Boolean value indicating the preferred email address.
  - `type`: string — A label indicating the attribute's function, e.g., "work" or "home".
  - `value`: string **required** — The email address value.
- `externalId`: string — An identifier for the user as defined by the provisioning client (IdP). This value is stored and returned but not interpreted by Cloudflare.
- `groups`: string[] — A list of group identifiers to which the user belongs. Includes both system group tags (prefixed `cloudflare-v1-`) and custom user group tag
  [array]
- `id`: string **required** — Unique identifier for the user, assigned by Cloudflare (user tag).
- `meta`: object — Resource metadata for a SCIM User.
  - `resourceType`: string — The name of the resource type.
- `name`: object — The components of the user's real name.
  - `familyName`: string — The family name (last name) of the user.
  - `formatted`: string — The full name, including all middle names, titles, and suffixes as appropriate, formatted for display.
  - `givenName`: string — The given name (first name) of the user.
- `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:schemas:core:2.0:User`.
  [array]
- `userName`: string **required** — Unique identifier for the user, equal to the user's email address.

## PATCH /accounts/{account_id}/scim/v2/Users/{user_id}

Patch SCIM User

operationId: `scim-users-patch`

**Request** (application/scim+json)

- `Operations`: object[] **required** — List of PATCH operations to apply.
  [array of]
  - `op`: string **required** enum: `add`, `remove`, `replace` — The operation to perform. Only `replace` is currently supported; `add` and `remove` are accepted without error but have no effect. Matched c
  - `path`: string — Attribute path targeted by this operation. When absent, `value` must be a singular complex attribute.
  - `value`: any — The value(s) for the operation. For `replace` without a path, this should be an object of attribute name/value pairs. For member path operat
- `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:api:messages:2.0:PatchOp`.
  [array]

**Response** 200 → `result`

- `active`: boolean **required** — A Boolean value indicating the user's administrative status. Set to `false` to deprovision the user, removing their membership from the acco
- `displayName`: string — The display name shown for the user. Falls back to formatted name or userName if not set.
- `emails`: object[] — Always contains a single primary work email matching `userName`.
  [array of]
  - `primary`: boolean — A Boolean value indicating the preferred email address.
  - `type`: string — A label indicating the attribute's function, e.g., "work" or "home".
  - `value`: string **required** — The email address value.
- `externalId`: string — An identifier for the user as defined by the provisioning client (IdP). This value is stored and returned but not interpreted by Cloudflare.
- `groups`: string[] — A list of group identifiers to which the user belongs. Includes both system group tags (prefixed `cloudflare-v1-`) and custom user group tag
  [array]
- `id`: string **required** — Unique identifier for the user, assigned by Cloudflare (user tag).
- `meta`: object — Resource metadata for a SCIM User.
  - `resourceType`: string — The name of the resource type.
- `name`: object — The components of the user's real name.
  - `familyName`: string — The family name (last name) of the user.
  - `formatted`: string — The full name, including all middle names, titles, and suffixes as appropriate, formatted for display.
  - `givenName`: string — The given name (first name) of the user.
- `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:schemas:core:2.0:User`.
  [array]
- `userName`: string **required** — Unique identifier for the user, equal to the user's email address.

## PUT /accounts/{account_id}/scim/v2/Users/{user_id}

Replace SCIM User

operationId: `scim-users-put`

**Request** (application/scim+json)

- `active`: boolean — A Boolean value indicating the user's administrative status. Optional; if omitted, the current value is preserved. Set to `false` to deprovi
- `displayName`: string — The name of the user, suitable for display to end-users. If not explicitly set, falls back to the formatted name or userName.
- `emails`: object[] — Email addresses for the user. If a primary email is provided, it must match `userName`.
  [array of]
  - `primary`: boolean — A Boolean value indicating the preferred email address.
  - `type`: string — A label indicating the attribute's function, e.g., "work" or "home".
  - `value`: string **required** — The email address value.
- `externalId`: string — An identifier for the user as defined by the provisioning client (IdP). This value is stored and returned but not interpreted by Cloudflare.
- `name`: object — The components of the user's real name.
  - `familyName`: string — The family name (last name) of the user.
  - `formatted`: string — The full name, including all middle names, titles, and suffixes as appropriate, formatted for display.
  - `givenName`: string — The given name (first name) of the user.
- `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:schemas:core:2.0:User`.
  [array]
- `userName`: string **required** — Unique identifier for the user, equal to the user's email address.

**Response** 200 → `result`

- `active`: boolean **required** — A Boolean value indicating the user's administrative status. Set to `false` to deprovision the user, removing their membership from the acco
- `displayName`: string — The display name shown for the user. Falls back to formatted name or userName if not set.
- `emails`: object[] — Always contains a single primary work email matching `userName`.
  [array of]
  - `primary`: boolean — A Boolean value indicating the preferred email address.
  - `type`: string — A label indicating the attribute's function, e.g., "work" or "home".
  - `value`: string **required** — The email address value.
- `externalId`: string — An identifier for the user as defined by the provisioning client (IdP). This value is stored and returned but not interpreted by Cloudflare.
- `groups`: string[] — A list of group identifiers to which the user belongs. Includes both system group tags (prefixed `cloudflare-v1-`) and custom user group tag
  [array]
- `id`: string **required** — Unique identifier for the user, assigned by Cloudflare (user tag).
- `meta`: object — Resource metadata for a SCIM User.
  - `resourceType`: string — The name of the resource type.
- `name`: object — The components of the user's real name.
  - `familyName`: string — The family name (last name) of the user.
  - `formatted`: string — The full name, including all middle names, titles, and suffixes as appropriate, formatted for display.
  - `givenName`: string — The given name (first name) of the user.
- `schemas`: string[] **required** — Must contain `urn:ietf:params:scim:schemas:core:2.0:User`.
  [array]
- `userName`: string **required** — Unique identifier for the user, equal to the user's email address.
