# Credential Sets

6 endpoints.

## GET /accounts/{account_id}/vuln_scanner/credential_sets

List credential sets

operationId: `list-credential-sets` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `id`: string **required** — Credential set identifier.
- `name`: string **required** — Human-readable name.

## POST /accounts/{account_id}/vuln_scanner/credential_sets

Create credential set

operationId: `create-credential-set`

**Request** (application/json)

- `name`: string **required** — Human-readable name.

**Response** 200 → `result`

- `id`: string **required** — Credential set identifier.
- `name`: string **required** — Human-readable name.

## DELETE /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}

Delete credential set

operationId: `delete-credential-set`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}

Get credential set

operationId: `get-credential-set`

**Response** 200 → `result`

- `id`: string **required** — Credential set identifier.
- `name`: string **required** — Human-readable name.

## PATCH /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}

Edit credential set

operationId: `edit-credential-set`

**Request** (application/json)

- `name`: string — Human-readable name.

**Response** 200 → `result`

- `id`: string **required** — Credential set identifier.
- `name`: string **required** — Human-readable name.

## PUT /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}

Update credential set

operationId: `update-credential-set`

**Request** (application/json)

- `name`: string **required** — Human-readable name.

**Response** 200 → `result`

- `id`: string **required** — Credential set identifier.
- `name`: string **required** — Human-readable name.
