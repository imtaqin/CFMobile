# Token Validation Token Rules

8 endpoints.

## GET /zones/{zone_id}/token_validation/rules

List token validation rules

operationId: `token-validation-rules-list` · query: `per_page`, `page`, `token_configuration`, `action`, `enabled`, `id`, `rule_id`, `host`, `hostname`

**Response** 200 → `result`

[array of]
- `action`: string **required** enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `created_at`: any
- `description`: string **required** — A human-readable description that gives more details than `title`.
- `enabled`: boolean **required** — Toggle rule on or off.
- `expression`: string **required** — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `id`: any
- `last_updated`: any
- `selector`: object **required** — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string **required** — A human-readable name for the rule.

## POST /zones/{zone_id}/token_validation/rules

Create a token validation rule

operationId: `token-validation-rules-create`

**Request** (application/json)

object
- `action`: string enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `description`: string — A human-readable description that gives more details than `title`.
- `enabled`: boolean — Toggle rule on or off.
- `expression`: string — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `selector`: object — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string — A human-readable name for the rule.

**Response** 200 → `result`

- `action`: string **required** enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `created_at`: any
- `description`: string **required** — A human-readable description that gives more details than `title`.
- `enabled`: boolean **required** — Toggle rule on or off.
- `expression`: string **required** — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `id`: any
- `last_updated`: any
- `selector`: object **required** — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string **required** — A human-readable name for the rule.

## DELETE /zones/{zone_id}/token_validation/rules/{rule_id}

Delete a token validation rule

operationId: `token-validation-rules-delete`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/token_validation/rules/{rule_id}

Get a token validation rule

operationId: `token-validation-rules-get`

**Response** 200 → `result`

- `action`: string **required** enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `created_at`: any
- `description`: string **required** — A human-readable description that gives more details than `title`.
- `enabled`: boolean **required** — Toggle rule on or off.
- `expression`: string **required** — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `id`: any
- `last_updated`: any
- `selector`: object **required** — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string **required** — A human-readable name for the rule.

## PATCH /zones/{zone_id}/token_validation/rules/{rule_id}

Edit a token validation rule

operationId: `token-validation-rules-edit`

**Request** (application/json)

- `action`: string enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `description`: string — A human-readable description that gives more details than `title`.
- `enabled`: boolean — Toggle rule on or off.
- `expression`: string — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `selector`: object — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string — A human-readable name for the rule.
- `position`: object — Update rule order among zone rules.

**Response** 200 → `result`

- `action`: string **required** enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `created_at`: any
- `description`: string **required** — A human-readable description that gives more details than `title`.
- `enabled`: boolean **required** — Toggle rule on or off.
- `expression`: string **required** — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `id`: any
- `last_updated`: any
- `selector`: object **required** — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string **required** — A human-readable name for the rule.

## PATCH /zones/{zone_id}/token_validation/rules/bulk

Edit token validation rules

operationId: `token-validation-rules-bulk-edit`

**Request** (application/json)

[array of]
- `id`: string **required** — Rule ID this patch applies to
- `action`: string enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `description`: string — A human-readable description that gives more details than `title`.
- `enabled`: boolean — Toggle rule on or off.
- `expression`: string — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `selector`: object — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string — A human-readable name for the rule.
- `position`: object — Update rule order among zone rules.

**Response** 200 → `result`

[array of]
- `action`: string **required** enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `created_at`: any
- `description`: string **required** — A human-readable description that gives more details than `title`.
- `enabled`: boolean **required** — Toggle rule on or off.
- `expression`: string **required** — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `id`: any
- `last_updated`: any
- `selector`: object **required** — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string **required** — A human-readable name for the rule.

## POST /zones/{zone_id}/token_validation/rules/bulk

Create token validation rules

operationId: `token-validation-rules-bulk-create`

**Request** (application/json)

[array of]
object
- `action`: string enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `description`: string — A human-readable description that gives more details than `title`.
- `enabled`: boolean — Toggle rule on or off.
- `expression`: string — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `selector`: object — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string — A human-readable name for the rule.

**Response** 200 → `result`

[array of]
- `action`: string **required** enum: `log`, `block` — Action to take on requests that match operations included in `selector` and fail `expression`.
- `created_at`: any
- `description`: string **required** — A human-readable description that gives more details than `title`.
- `enabled`: boolean **required** — Toggle rule on or off.
- `expression`: string **required** — Rule expression. Requests that fail to match this expression will be subject to `action`.
- `id`: any
- `last_updated`: any
- `selector`: object **required** — Select operations covered by this rule.
  - `exclude`: object[] — Ignore operations that were otherwise included by `include`.
    [array of]
    - `operation_ids`: object[] — Excluded operation IDs.
  - `include`: object[] — Select all matching operations.
    [array of]
    - `host`: string[] — Included hostnames.
- `title`: string **required** — A human-readable name for the rule.

## POST /zones/{zone_id}/token_validation/rules/preview

Preview a token validation rule

operationId: `token-validation-rules-preview` · query: `per_page`, `page`, `state`, `host`, `hostname`, `method`, `endpoint`

**Request** (application/json)

- `exclude`: object[] — Ignore operations that were otherwise included by `include`.
  [array of]
  - `operation_ids`: object[] — Excluded operation IDs.
    [array]
- `include`: object[] — Select all matching operations.
  [array of]
  - `host`: string[] — Included hostnames.
    [array]

**Response** 200 → `result`

- `available_hosts`: string[] — All hostnames on zone used by operations
  [array]
- `excluded`: integer — Number of operations with `excluded` `state`
- `ignored`: integer — Number of operations with `ignored` `state`
- `included`: integer — Number of operations with `included` `state`
- `operations`: object[]
  [array of]
  - `endpoint`: string — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
  - `host`: string — RFC3986-compliant host.
  - `last_updated`: any
  - `method`: string enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
  - `operation_id`: any
  - `state`: string enum: `included`, `excluded`, `ignored` — Details how `selector` interacted with an operation:
- `selected_hosts`: string[] — Hostnames of `included` operations
  [array]
- `total`: integer — Number of operations on zone
