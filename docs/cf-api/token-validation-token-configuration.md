# Token Validation Token Configuration

7 endpoints.

## GET /zones/{zone_id}/token_validation/config

List token validation configurations

operationId: `token-validation-config-list` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: any **required**
- `credentials`: object **required**
  - `keys`: object[] **required**
    [array of]
    - `kid`: string **required** — Key ID
    - `alg`: string **required** enum: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` — Algorithm
    - `e`: string **required** — RSA exponent
    - `kty`: string **required** enum: `RSA` — Key Type
    - `n`: string **required** — RSA modulus
- `description`: string **required**
- `id`: any **required**
- `last_updated`: any **required**
- `title`: string **required**
- `token_sources`: object[] **required**
  [array]
- `token_type`: string **required** enum: `JWT`

## POST /zones/{zone_id}/token_validation/config

Create a token validation configuration

operationId: `token-validation-config-create`

**Request** (application/json)

- `credentials`: object **required** — Request payload for create and PUT credentials operations. Provided keys define the complete stored key set. Key identities (`{alg,kid}`) mu
  - `keys`: object[] **required**
    [array of]
    - `kid`: string **required** — Key ID
    - `alg`: string **required** enum: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` — Algorithm
    - `e`: string **required** — RSA exponent
    - `kty`: string **required** enum: `RSA` — Key Type
    - `n`: string **required** — RSA modulus
- `description`: string **required**
- `title`: string **required**
- `token_sources`: object[] **required**
  [array]
- `token_type`: string **required** enum: `JWT`

**Response** 200 → `result`

- `created_at`: any **required**
- `credentials`: object **required**
  - `keys`: object[] **required**
    [array of]
    - `kid`: string **required** — Key ID
    - `alg`: string **required** enum: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` — Algorithm
    - `e`: string **required** — RSA exponent
    - `kty`: string **required** enum: `RSA` — Key Type
    - `n`: string **required** — RSA modulus
- `description`: string **required**
- `id`: any **required**
- `last_updated`: any **required**
- `title`: string **required**
- `token_sources`: object[] **required**
  [array]
- `token_type`: string **required** enum: `JWT`

## DELETE /zones/{zone_id}/token_validation/config/{config_id}

Delete a token validation configuration

operationId: `token-validation-config-delete`

**Response** 200 → `result`

- `id`: any

## GET /zones/{zone_id}/token_validation/config/{config_id}

Get a token validation configuration

operationId: `token-validation-config-get`

**Response** 200 → `result`

- `created_at`: any **required**
- `credentials`: object **required**
  - `keys`: object[] **required**
    [array of]
    - `kid`: string **required** — Key ID
    - `alg`: string **required** enum: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` — Algorithm
    - `e`: string **required** — RSA exponent
    - `kty`: string **required** enum: `RSA` — Key Type
    - `n`: string **required** — RSA modulus
- `description`: string **required**
- `id`: any **required**
- `last_updated`: any **required**
- `title`: string **required**
- `token_sources`: object[] **required**
  [array]
- `token_type`: string **required** enum: `JWT`

## PATCH /zones/{zone_id}/token_validation/config/{config_id}

Edit a token validation configuration

operationId: `token-validation-config-edit`

**Request** (application/json)

- `description`: string
- `title`: string
- `token_sources`: object[]
  [array]

**Response** 200 → `result`

- `description`: string
- `id`: any
- `title`: string
- `token_sources`: object[]
  [array]

## PATCH /zones/{zone_id}/token_validation/config/{config_id}/credentials

Edit token validation credentials

operationId: `token-validation-config-credentials-edit`

**Request** (application/json)

- `keys`: object[] **required**
  [array of]
  - `kid`: string **required** — Key ID
  - `alg`: string **required** enum: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` — Algorithm
  - `e`: string **required** — RSA exponent
  - `kty`: string **required** enum: `RSA` — Key Type
  - `n`: string **required** — RSA modulus

**Response** 200 → `result`

- `keys`: object[] **required**
  [array of]
  - `kid`: string **required** — Key ID
  - `alg`: string **required** enum: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` — Algorithm
  - `e`: string **required** — RSA exponent
  - `kty`: string **required** enum: `RSA` — Key Type
  - `n`: string **required** — RSA modulus

## PUT /zones/{zone_id}/token_validation/config/{config_id}/credentials

Replace token validation credentials

operationId: `token-validation-config-credentials-update`

**Request** (application/json)

- `keys`: object[] **required**
  [array of]
  - `kid`: string **required** — Key ID
  - `alg`: string **required** enum: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` — Algorithm
  - `e`: string **required** — RSA exponent
  - `kty`: string **required** enum: `RSA` — Key Type
  - `n`: string **required** — RSA modulus

**Response** 200 → `result`

- `keys`: object[] **required**
  [array of]
  - `kid`: string **required** — Key ID
  - `alg`: string **required** enum: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` — Algorithm
  - `e`: string **required** — RSA exponent
  - `kty`: string **required** enum: `RSA` — Key Type
  - `n`: string **required** — RSA modulus
