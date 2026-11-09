# Secrets Store

12 endpoints.

## GET /accounts/{account_id}/secrets_store/quota

View secret usage

operationId: `secrets-store-quota`

**Response** 200 → `result`

- `secrets`: object **required**
  - `quota`: number **required** — The number of secrets the account is entitled to use.
  - `usage`: number **required** — The number of secrets the account is currently using.

## GET /accounts/{account_id}/secrets_store/stores

List account stores

operationId: `secrets-store-list` · query: `direction`, `page`, `per_page`, `order`

**Response** 200 → `result`

[array of]
- `account_id`: string — Account Identifier.
- `created`: string **required** — When the secret was created.
- `id`: string **required** — Store Identifier.
- `modified`: string **required** — When the secret was modified.
- `name`: string **required** — The name of the store.

## POST /accounts/{account_id}/secrets_store/stores

Create a store

operationId: `secrets-store-create`

**Request** (application/json)

- `name`: string **required** — The name of the store.

**Response** 200 → `result`

- `account_id`: string — Account Identifier.
- `created`: string **required** — When the secret was created.
- `id`: string **required** — Store Identifier.
- `modified`: string **required** — When the secret was modified.
- `name`: string **required** — The name of the store.

## DELETE /accounts/{account_id}/secrets_store/stores/{store_id}

Delete a store

operationId: `secrets-store-delete-by-id` · query: `force`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/secrets_store/stores/{store_id}

Get a store by ID

operationId: `secrets-store-get-store-by-id`

**Response** 200 → `result`

- `account_id`: string — Account Identifier.
- `created`: string **required** — When the secret was created.
- `id`: string **required** — Store Identifier.
- `modified`: string **required** — When the secret was modified.
- `name`: string **required** — The name of the store.

## DELETE /accounts/{account_id}/secrets_store/stores/{store_id}/secrets

Delete secrets

operationId: `secrets-store-delete-bulk`

**Request** (application/json)

- `ids`: string[] **required** — List of secret identifier tags to delete.
  [array]

**Response** 202 → `result`

object

## GET /accounts/{account_id}/secrets_store/stores/{store_id}/secrets

List store secrets

operationId: `secrets-store-secrets-list` · query: `direction`, `page`, `per_page`, `search`, `order`, `scopes`

**Response** 200 → `result`

[array of]
- `comment`: string — Freeform text describing the secret.
- `created`: string **required** — When the secret was created.
- `id`: string **required** — Secret identifier tag.
- `modified`: string **required** — When the secret was modified.
- `name`: string **required** — The name of the secret.
- `scopes`: string[] — The list of services that can use this secret, or null when the secret inherits its store's scopes. Set it to null in a patch to inherit aga
  [array]
- `status`: string **required** enum: `pending`, `active`, `deleted`
- `store_id`: string **required** — Store Identifier.

## POST /accounts/{account_id}/secrets_store/stores/{store_id}/secrets

Create a secret

operationId: `secrets-store-secret-create`

**Request** (application/json)

[array of]
- `comment`: string — Freeform text describing the secret.
- `name`: string **required** — The name of the secret.
- `scopes`: string[] — The list of services that can use this secret. Omit it on create or duplicate to inherit the store's scopes. An empty list lets no service u
  [array]
- `value`: string **required** — The value of the secret. Maximum 64 KiB (65,536 bytes). Note that this is 'write only' - the API never returns this value; it exists only to

**Response** 200 → `result`

[array of]
- `comment`: string — Freeform text describing the secret.
- `created`: string **required** — When the secret was created.
- `id`: string **required** — Secret identifier tag.
- `modified`: string **required** — When the secret was modified.
- `name`: string **required** — The name of the secret.
- `scopes`: string[] — The list of services that can use this secret, or null when the secret inherits its store's scopes. Set it to null in a patch to inherit aga
  [array]
- `status`: string **required** enum: `pending`, `active`, `deleted`
- `store_id`: string **required** — Store Identifier.

## DELETE /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}

Delete a secret

operationId: `secrets-store-secret-delete-by-id`

**Response** 202 → `result`

object

## GET /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}

Get a secret by ID

operationId: `secrets-store-get-by-id`

**Response** 200 → `result`

- `comment`: string — Freeform text describing the secret.
- `created`: string **required** — When the secret was created.
- `id`: string **required** — Secret identifier tag.
- `modified`: string **required** — When the secret was modified.
- `name`: string **required** — The name of the secret.
- `scopes`: string[] — The list of services that can use this secret, or null when the secret inherits its store's scopes. Set it to null in a patch to inherit aga
  [array]
- `status`: string **required** enum: `pending`, `active`, `deleted`
- `store_id`: string **required** — Store Identifier.

## PATCH /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}

Patch a secret

operationId: `secrets-store-patch-by-id`

**Request** (application/json)

- `comment`: string — Freeform text describing the secret.
- `scopes`: string[] — The list of services that can use this secret, or null when the secret inherits its store's scopes. Set it to null in a patch to inherit aga
  [array]
- `value`: string — The value of the secret. Maximum 64 KiB (65,536 bytes). Note that this is 'write only' - the API never returns this value; it exists only to

**Response** 200 → `result`

- `comment`: string — Freeform text describing the secret.
- `created`: string **required** — When the secret was created.
- `id`: string **required** — Secret identifier tag.
- `modified`: string **required** — When the secret was modified.
- `name`: string **required** — The name of the secret.
- `scopes`: string[] — The list of services that can use this secret, or null when the secret inherits its store's scopes. Set it to null in a patch to inherit aga
  [array]
- `status`: string **required** enum: `pending`, `active`, `deleted`
- `store_id`: string **required** — Store Identifier.

## POST /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}/duplicate

Duplicate Secret

operationId: `secrets-store-duplicate-by-id`

**Request** (application/json)

- `comment`: string — Freeform text describing the secret.
- `name`: string **required** — The name of the secret.
- `scopes`: string[] — The list of services that can use this secret. Omit it on create or duplicate to inherit the store's scopes. An empty list lets no service u
  [array]

**Response** 200 → `result`

- `comment`: string — Freeform text describing the secret.
- `created`: string **required** — When the secret was created.
- `id`: string **required** — Secret identifier tag.
- `modified`: string **required** — When the secret was modified.
- `name`: string **required** — The name of the secret.
- `scopes`: string[] — The list of services that can use this secret, or null when the secret inherits its store's scopes. Set it to null in a patch to inherit aga
  [array]
- `status`: string **required** enum: `pending`, `active`, `deleted`
- `store_id`: string **required** — Store Identifier.
