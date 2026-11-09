# Zero Trust users

11 endpoints.

## GET /accounts/{account_id}/access/users

Get users

operationId: `zero-trust-users-get-users` · query: `name`, `email`, `search`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `access_seat`: boolean — True if the user has authenticated with Cloudflare Access.
- `active_device_count`: number — The number of active devices registered to the user.
- `created_at`: string
- `email`: string — The email of the user.
- `gateway_seat`: boolean — True if the user has logged into the WARP client.
- `id`: string — UUID.
- `last_successful_login`: string — The time at which the user last successfully logged in.
- `name`: string — The name of the user.
- `seat_uid`: string — The unique API identifier for the Zero Trust seat.
- `uid`: string — The unique API identifier for the user.
- `updated_at`: string

## POST /accounts/{account_id}/access/users

Create a user

operationId: `zero-trust-users-create-user`

**Request** (application/json)

- `email`: string **required** — The email of the user.
- `name`: string — The name of the user.

**Response** 201 → `result`

- `access_seat`: boolean — True if the user has authenticated with Cloudflare Access.
- `active_device_count`: number — The number of active devices registered to the user.
- `created_at`: string
- `email`: string — The email of the user.
- `gateway_seat`: boolean — True if the user has logged into the WARP client.
- `id`: string — UUID.
- `last_successful_login`: string — The time at which the user last successfully logged in.
- `name`: string — The name of the user.
- `seat_uid`: string — The unique API identifier for the Zero Trust seat.
- `uid`: string — The unique API identifier for the user.
- `updated_at`: string

## DELETE /accounts/{account_id}/access/users/{user_id}

Delete a user

operationId: `zero-trust-users-delete-user`

**Response** 202 → `result`

object

## GET /accounts/{account_id}/access/users/{user_id}

Get a user

operationId: `zero-trust-users-get-user`

**Response** 200 → `result`

- `access_seat`: boolean — True if the user has authenticated with Cloudflare Access.
- `active_device_count`: number — The number of active devices registered to the user.
- `created_at`: string
- `email`: string — The email of the user.
- `gateway_seat`: boolean — True if the user has logged into the WARP client.
- `id`: string — UUID.
- `last_successful_login`: string — The time at which the user last successfully logged in.
- `name`: string — The name of the user.
- `seat_uid`: string — The unique API identifier for the Zero Trust seat.
- `uid`: string — The unique API identifier for the user.
- `updated_at`: string

## PUT /accounts/{account_id}/access/users/{user_id}

Update a user

operationId: `zero-trust-users-update-user`

**Request** (application/json)

- `email`: string **required** — The email of the user.
- `name`: string **required** — The name of the user.

**Response** 200 → `result`

- `access_seat`: boolean — True if the user has authenticated with Cloudflare Access.
- `active_device_count`: number — The number of active devices registered to the user.
- `created_at`: string
- `email`: string — The email of the user.
- `gateway_seat`: boolean — True if the user has logged into the WARP client.
- `id`: string — UUID.
- `last_successful_login`: string — The time at which the user last successfully logged in.
- `name`: string — The name of the user.
- `seat_uid`: string — The unique API identifier for the Zero Trust seat.
- `uid`: string — The unique API identifier for the user.
- `updated_at`: string

## GET /accounts/{account_id}/access/users/{user_id}/active_sessions

Get active sessions

operationId: `zero-trust-users-get-active-sessions`

**Response** 200 → `result`

[array of]
- `expiration`: integer
- `metadata`: object
  - `apps`: object
  - `expires`: integer
  - `iat`: integer
  - `nonce`: string
  - `ttl`: integer
- `name`: string

## GET /accounts/{account_id}/access/users/{user_id}/active_sessions/{nonce}

Get single active session

operationId: `zero-trust-users-get-active-session`

**Response** 200 → `result`

- `account_id`: string
- `auth_status`: string
- `common_name`: string
- `devicePosture`: object
- `device_id`: string
- `device_sessions`: object
- `email`: string
- `geo`: object
  - `country`: string
- `iat`: number
- `idp`: object
  - `id`: string
  - `type`: string
- `ip`: string
- `is_gateway`: boolean
- `is_warp`: boolean
- `mtls_auth`: object
  - `auth_status`: string
  - `cert_issuer_dn`: string
  - `cert_issuer_ski`: string
  - `cert_presented`: boolean
  - `cert_serial`: string
- `service_token_id`: string
- `service_token_status`: boolean
- `user_uuid`: string
- `version`: number
- `isActive`: boolean

## GET /accounts/{account_id}/access/users/{user_id}/failed_logins

Get failed logins

operationId: `zero-trust-users-get-failed-logins`

**Response** 200 → `result`

[array of]
- `expiration`: integer
- `metadata`: object

## GET /accounts/{account_id}/access/users/{user_id}/last_seen_identity

Get last seen identity

operationId: `zero-trust-users-get-last-seen-identity`

**Response** 200 → `result`

- `account_id`: string
- `auth_status`: string
- `common_name`: string
- `devicePosture`: object
- `device_id`: string
- `device_sessions`: object
- `email`: string
- `geo`: object
  - `country`: string
- `iat`: number
- `idp`: object
  - `id`: string
  - `type`: string
- `ip`: string
- `is_gateway`: boolean
- `is_warp`: boolean
- `mtls_auth`: object
  - `auth_status`: string
  - `cert_issuer_dn`: string
  - `cert_issuer_ski`: string
  - `cert_presented`: boolean
  - `cert_serial`: string
- `service_token_id`: string
- `service_token_status`: boolean
- `user_uuid`: string
- `version`: number
- `passkeys`: object[] — Active passkey enrollments for the user.
  [array of]
  - `created_at`: string
  - `id`: string — Authenticator ID used to delete the passkey.
  - `last_used_at`: string
  - `name`: string

## DELETE /accounts/{account_id}/access/users/{user_id}/mfa_authenticators/{authenticator_id}

Delete a user's authenticator

operationId: `zero-trust-users-delete-mfa-authenticator`

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/access/users/{user_id}/passkeys/{authenticator_id}

Delete a user's passkey

operationId: `zero-trust-users-delete-passkey`

**Response** 200 → `result`

object
