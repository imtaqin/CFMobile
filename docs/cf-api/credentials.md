# Credentials

6 endpoints.

## GET /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}/credentials

List credentials

operationId: `list-credentials` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `credential_set_id`: string **required** — Parent credential set identifier.
- `id`: string **required** — Credential identifier.
- `location`: string **required** enum: `header`, `cookie` — Where the credential is attached in outgoing requests.
- `location_name`: string **required** — Name of the header or cookie where the credential is attached.
- `name`: string **required** — Human-readable name.

## POST /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}/credentials

Create credential

operationId: `create-credential`

**Request** (application/json)

- `location`: string **required** enum: `header`, `cookie` — Where the credential is attached in outgoing requests.
- `location_name`: string **required** — Name of the header or cookie where the credential is attached.
- `name`: string **required** — Human-readable name.
- `value`: string **required** — The credential value (e.g. API key, session token). Write-only.

**Response** 200 → `result`

- `credential_set_id`: string **required** — Parent credential set identifier.
- `id`: string **required** — Credential identifier.
- `location`: string **required** enum: `header`, `cookie` — Where the credential is attached in outgoing requests.
- `location_name`: string **required** — Name of the header or cookie where the credential is attached.
- `name`: string **required** — Human-readable name.

## DELETE /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}/credentials/{credential_id}

Delete credential

operationId: `delete-credential`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}/credentials/{credential_id}

Get credential

operationId: `get-credential`

**Response** 200 → `result`

- `credential_set_id`: string **required** — Parent credential set identifier.
- `id`: string **required** — Credential identifier.
- `location`: string **required** enum: `header`, `cookie` — Where the credential is attached in outgoing requests.
- `location_name`: string **required** — Name of the header or cookie where the credential is attached.
- `name`: string **required** — Human-readable name.

## PATCH /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}/credentials/{credential_id}

Edit credential

operationId: `edit-credential`

**Request** (application/json)

- `location`: string enum: `header`, `cookie` — Where the credential is attached in outgoing requests.
- `location_name`: string — Name of the header or cookie where the credential is attached.
- `name`: string — Human-readable name.
- `value`: string — The credential value. Write-only. Never returned in responses.

**Response** 200 → `result`

- `credential_set_id`: string **required** — Parent credential set identifier.
- `id`: string **required** — Credential identifier.
- `location`: string **required** enum: `header`, `cookie` — Where the credential is attached in outgoing requests.
- `location_name`: string **required** — Name of the header or cookie where the credential is attached.
- `name`: string **required** — Human-readable name.

## PUT /accounts/{account_id}/vuln_scanner/credential_sets/{credential_set_id}/credentials/{credential_id}

Update credential

operationId: `update-credential`

**Request** (application/json)

- `location`: string **required** enum: `header`, `cookie` — Where the credential is attached in outgoing requests.
- `location_name`: string **required** — Name of the header or cookie where the credential is attached.
- `name`: string **required** — Human-readable name.
- `value`: string **required** — The credential value. Write-only. Never returned in responses.

**Response** 200 → `result`

- `credential_set_id`: string **required** — Parent credential set identifier.
- `id`: string **required** — Credential identifier.
- `location`: string **required** enum: `header`, `cookie` — Where the credential is attached in outgoing requests.
- `location_name`: string **required** — Name of the header or cookie where the credential is attached.
- `name`: string **required** — Human-readable name.
