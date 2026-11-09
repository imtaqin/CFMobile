# MoQ Relays

8 endpoints.

## GET /accounts/{account_id}/moq/relays

List relays

operationId: `moq-relays-list` · query: `created_before`, `created_after`, `per_page`, `asc`

**Response** 200 → `result`

[array of]
- `created`: string **required**
- `modified`: string **required**
- `name`: string **required**
- `uid`: string **required**

## POST /accounts/{account_id}/moq/relays

Create a relay

operationId: `moq-relays-create`

**Request** (application/json)

- `name`: string **required** — Human-readable name for the relay.

**Response** 201 → `result`

- `config`: object **required** — Relay configuration. All sub-objects use whole-object replacement when
  - `upstreams`: object — Upstreams are external MOQT server publishers that a relay falls back
    - `enabled`: boolean default: `false`
    - `upstreams`: object[] default: `` — Ordered list of upstream MOQT server publishers. Each entry is an
- `created`: string **required**
- `issuers`: object[] **required** — Token collection (discriminated union on `type`). On create this
  [array of]
  - `cloudflare_tokens`: object[] **required** — Always present ([] when empty).
    [array of]
    - `created`: string **required**
    - `expires`: string **required** — Mandatory; no more than 1 year after `created`.
    - `jti`: string **required** — Token identity and registry key (32 hex chars).
    - `label`: string — Optional, customer-set.
    - `operations`: string[] **required** — Signed allowlist of what the token may do. V1 coarse roles; the array
    - `secret`: string — The signed JWT. Present ONLY in create / auto-create responses (shown
  - `issuer`: string **required** enum: `cloudflare`
  - `type`: string **required** enum: `cloudflare_jwt`
- `modified`: string **required**
- `name`: string **required**
- `uid`: string **required** — Server-generated unique identifier (32 hex chars).

## DELETE /accounts/{account_id}/moq/relays/{relay_id}

Delete a relay

operationId: `moq-relays-delete`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/moq/relays/{relay_id}

Get a relay

operationId: `moq-relays-get`

**Response** 200 → `result`

- `config`: object **required** — Relay configuration. All sub-objects use whole-object replacement when
  - `upstreams`: object — Upstreams are external MOQT server publishers that a relay falls back
    - `enabled`: boolean default: `false`
    - `upstreams`: object[] default: `` — Ordered list of upstream MOQT server publishers. Each entry is an
- `created`: string **required**
- `modified`: string **required**
- `name`: string **required**
- `status`: string enum: `connected` — "connected" when active, omitted otherwise.
- `uid`: string **required**

## PUT /accounts/{account_id}/moq/relays/{relay_id}

Update a relay

operationId: `moq-relays-update`

**Request** (application/json)

- `config`: any
- `name`: string

**Response** 200 → `result`

- `config`: object **required** — Relay configuration. All sub-objects use whole-object replacement when
  - `upstreams`: object — Upstreams are external MOQT server publishers that a relay falls back
    - `enabled`: boolean default: `false`
    - `upstreams`: object[] default: `` — Ordered list of upstream MOQT server publishers. Each entry is an
- `created`: string **required**
- `modified`: string **required**
- `name`: string **required**
- `status`: string enum: `connected` — "connected" when active, omitted otherwise.
- `uid`: string **required**

## GET /accounts/{account_id}/moq/relays/{relay_id}/tokens

List tokens

operationId: `moq-relays-tokens-list`

**Response** 200 → `result`

- `issuers`: object[] **required**
  [array of]
  - `cloudflare_tokens`: object[] **required** — Always present ([] when empty).
    [array of]
    - `created`: string **required**
    - `expires`: string **required** — Mandatory; no more than 1 year after `created`.
    - `jti`: string **required** — Token identity and registry key (32 hex chars).
    - `label`: string — Optional, customer-set.
    - `operations`: string[] **required** — Signed allowlist of what the token may do. V1 coarse roles; the array
    - `secret`: string — The signed JWT. Present ONLY in create / auto-create responses (shown
  - `issuer`: string **required** enum: `cloudflare`
  - `type`: string **required** enum: `cloudflare_jwt`

## POST /accounts/{account_id}/moq/relays/{relay_id}/tokens

Create a token

operationId: `moq-relays-tokens-create`

**Request** (application/json)

- `expires`: string — Optional expiry (RFC 3339). Defaults to 1 year from creation;
- `label`: string — Optional, customer-set label.
- `operations`: string[] **required** — Non-empty subset of the V1 roles the token is allowed to
  [array]

**Response** 201 → `result`

- `issuers`: object[] **required**
  [array of]
  - `cloudflare_tokens`: object[] **required** — Always present ([] when empty).
    [array of]
    - `created`: string **required**
    - `expires`: string **required** — Mandatory; no more than 1 year after `created`.
    - `jti`: string **required** — Token identity and registry key (32 hex chars).
    - `label`: string — Optional, customer-set.
    - `operations`: string[] **required** — Signed allowlist of what the token may do. V1 coarse roles; the array
    - `secret`: string — The signed JWT. Present ONLY in create / auto-create responses (shown
  - `issuer`: string **required** enum: `cloudflare`
  - `type`: string **required** enum: `cloudflare_jwt`

## DELETE /accounts/{account_id}/moq/relays/{relay_id}/tokens/{jti}

Revoke a token

operationId: `moq-relays-tokens-delete`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer
  - `message`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer
  - `message`: string
- `success`: boolean **required**
