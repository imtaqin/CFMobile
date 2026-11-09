# Access user population users

6 endpoints.

## GET /accounts/{account_id}/access/user_populations/{user_population_id}/users

List users in a user population

operationId: `access-user-populations-list-users` · query: `filter`, `startIndex`, `count`, `attributes`, `excludedAttributes`

**Response** 200 → `result`

- `Resources`: object[] **required**
  [array of]
  - `active`: boolean
  - `displayName`: string
  - `emails`: object[]
    [array of]
    - `primary`: boolean
    - `type`: string
    - `value`: string
  - `externalId`: string
  - `id`: string
  - `meta`: object
    - `created`: string
    - `lastModified`: string
    - `location`: string
    - `resourceType`: string
    - `version`: string
  - `name`: object
    - `familyName`: string
    - `formatted`: string
    - `givenName`: string
    - `honorificPrefix`: string
    - `honorificSuffix`: string
    - `middleName`: string
  - `schemas`: string[] — The SCIM schemas that apply to this resource.
    [array]
  - `userName`: string
- `itemsPerPage`: integer **required**
- `schemas`: string[] **required**
  [array]
- `startIndex`: integer **required**
- `totalResults`: integer **required**

## POST /accounts/{account_id}/access/user_populations/{user_population_id}/users

Create a user population user

operationId: `access-user-populations-create-user`

**Request** (application/json)

- `active`: boolean
- `displayName`: string
- `emails`: object[]
  [array of]
  - `primary`: boolean
  - `type`: string
  - `value`: string
- `externalId`: string
- `id`: string
- `meta`: object
  - `created`: string
  - `lastModified`: string
  - `location`: string
  - `resourceType`: string
  - `version`: string
- `name`: object
  - `familyName`: string
  - `formatted`: string
  - `givenName`: string
  - `honorificPrefix`: string
  - `honorificSuffix`: string
  - `middleName`: string
- `schemas`: string[] — The SCIM schemas that apply to this resource.
  [array]
- `userName`: string

**Response** 201 → `result`

- `active`: boolean
- `displayName`: string
- `emails`: object[]
  [array of]
  - `primary`: boolean
  - `type`: string
  - `value`: string
- `externalId`: string
- `id`: string
- `meta`: object
  - `created`: string
  - `lastModified`: string
  - `location`: string
  - `resourceType`: string
  - `version`: string
- `name`: object
  - `familyName`: string
  - `formatted`: string
  - `givenName`: string
  - `honorificPrefix`: string
  - `honorificSuffix`: string
  - `middleName`: string
- `schemas`: string[] — The SCIM schemas that apply to this resource.
  [array]
- `userName`: string

## DELETE /accounts/{account_id}/access/user_populations/{user_population_id}/users/{user_id}

Delete a user population user

operationId: `access-user-populations-delete-user`

## GET /accounts/{account_id}/access/user_populations/{user_population_id}/users/{user_id}

Get a user population user

operationId: `access-user-populations-get-user` · query: `attributes`, `excludedAttributes`

**Response** 200 → `result`

- `active`: boolean
- `displayName`: string
- `emails`: object[]
  [array of]
  - `primary`: boolean
  - `type`: string
  - `value`: string
- `externalId`: string
- `id`: string
- `meta`: object
  - `created`: string
  - `lastModified`: string
  - `location`: string
  - `resourceType`: string
  - `version`: string
- `name`: object
  - `familyName`: string
  - `formatted`: string
  - `givenName`: string
  - `honorificPrefix`: string
  - `honorificSuffix`: string
  - `middleName`: string
- `schemas`: string[] — The SCIM schemas that apply to this resource.
  [array]
- `userName`: string

## PATCH /accounts/{account_id}/access/user_populations/{user_population_id}/users/{user_id}

Update a user population user

operationId: `access-user-populations-update-user`

**Request** (application/json)

- `Operations`: object[] **required**
  [array of]
  - `op`: string **required** enum: `add`, `remove`, `replace`
  - `path`: string
  - `value`: any
- `schemas`: string[]
  [array]

**Response** 200 → `result`

- `active`: boolean
- `displayName`: string
- `emails`: object[]
  [array of]
  - `primary`: boolean
  - `type`: string
  - `value`: string
- `externalId`: string
- `id`: string
- `meta`: object
  - `created`: string
  - `lastModified`: string
  - `location`: string
  - `resourceType`: string
  - `version`: string
- `name`: object
  - `familyName`: string
  - `formatted`: string
  - `givenName`: string
  - `honorificPrefix`: string
  - `honorificSuffix`: string
  - `middleName`: string
- `schemas`: string[] — The SCIM schemas that apply to this resource.
  [array]
- `userName`: string

## PUT /accounts/{account_id}/access/user_populations/{user_population_id}/users/{user_id}

Replace a user population user

operationId: `access-user-populations-replace-user`

**Request** (application/json)

- `active`: boolean
- `displayName`: string
- `emails`: object[]
  [array of]
  - `primary`: boolean
  - `type`: string
  - `value`: string
- `externalId`: string
- `id`: string
- `meta`: object
  - `created`: string
  - `lastModified`: string
  - `location`: string
  - `resourceType`: string
  - `version`: string
- `name`: object
  - `familyName`: string
  - `formatted`: string
  - `givenName`: string
  - `honorificPrefix`: string
  - `honorificSuffix`: string
  - `middleName`: string
- `schemas`: string[] — The SCIM schemas that apply to this resource.
  [array]
- `userName`: string

**Response** 200 → `result`

- `active`: boolean
- `displayName`: string
- `emails`: object[]
  [array of]
  - `primary`: boolean
  - `type`: string
  - `value`: string
- `externalId`: string
- `id`: string
- `meta`: object
  - `created`: string
  - `lastModified`: string
  - `location`: string
  - `resourceType`: string
  - `version`: string
- `name`: object
  - `familyName`: string
  - `formatted`: string
  - `givenName`: string
  - `honorificPrefix`: string
  - `honorificSuffix`: string
  - `middleName`: string
- `schemas`: string[] — The SCIM schemas that apply to this resource.
  [array]
- `userName`: string
