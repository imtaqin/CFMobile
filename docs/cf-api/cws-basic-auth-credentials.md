# CWS Basic Auth Credentials

8 endpoints.

## GET /accounts/{account_id}/cws/basic-auth-credentials

List basic-auth credentials for an account

operationId: `cws-list-basic-auth-credentials` · query: `cursor`, `per_page`, `order`, `direction`, `username`, `deployment_id`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `updated_at`: string **required**
- `username`: string **required** — Login presented by the client. Printable ASCII only, excluding space and colon (RFC 7617 forbids a colon in the user-id).

## POST /accounts/{account_id}/cws/basic-auth-credentials

Create a basic-auth credential

operationId: `cws-create-basic-auth-credential`

**Request** (application/json)

- `username`: string **required** — Login presented by the client. Printable ASCII only, excluding space and colon.

**Response** 201 → `result`

- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `updated_at`: string **required**
- `username`: string **required** — Login presented by the client. Printable ASCII only, excluding space and colon (RFC 7617 forbids a colon in the user-id).

## DELETE /accounts/{account_id}/cws/basic-auth-credentials/{credential_id}

Delete a basic-auth credential

operationId: `cws-delete-basic-auth-credential`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/basic-auth-credentials/{credential_id}

Get a basic-auth credential by ID

operationId: `cws-get-basic-auth-credential`

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `updated_at`: string **required**
- `username`: string **required** — Login presented by the client. Printable ASCII only, excluding space and colon (RFC 7617 forbids a colon in the user-id).

## GET /accounts/{account_id}/cws/basic-auth-credentials/{credential_id}/secrets

List secrets for a basic-auth credential

operationId: `cws-list-basic-auth-secrets` · query: `cursor`, `per_page`, `order`, `direction`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `expires_at`: string — Optional RFC 3339 expiration time. Omit for no expiration.
- `id`: string **required** — Server-assigned UUID

## POST /accounts/{account_id}/cws/basic-auth-credentials/{credential_id}/secrets

Add a secret to a basic-auth credential

operationId: `cws-create-basic-auth-secret`

**Request** (application/json)

- `expires_at`: string — Optional deactivation deadline (RFC 3339). Omit or null for no expiry.
- `password`: string **required** — Password stored only as a one-way hash and never returned. Maximum 72 UTF-8 bytes.

**Response** 201 → `result`

- `created_at`: string **required**
- `expires_at`: string — Optional RFC 3339 expiration time. Omit for no expiration.
- `id`: string **required** — Server-assigned UUID

## DELETE /accounts/{account_id}/cws/basic-auth-credentials/{credential_id}/secrets/{secret_id}

Delete a basic-auth secret

operationId: `cws-delete-basic-auth-secret`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/basic-auth-credentials/{credential_id}/secrets/{secret_id}

Get a basic-auth secret by ID

operationId: `cws-get-basic-auth-secret`

**Response** 200 → `result`

- `created_at`: string **required**
- `expires_at`: string — Optional RFC 3339 expiration time. Omit for no expiration.
- `id`: string **required** — Server-assigned UUID
