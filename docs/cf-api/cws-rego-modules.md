# CWS Rego Modules

5 endpoints.

## GET /accounts/{account_id}/cws/rego-modules

List Rego modules

operationId: `cws-list-rego-modules` · query: `cursor`, `per_page`, `order`, `direction`, `name`, `package_path`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `package_path`: string **required** — Dotted path derived from rego_source. Begins with lib. and is unique per account.
- `rego_source`: string **required** — Library Rego source with a package beginning with "lib." Maximum 16384 UTF-8 bytes.
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/rego-modules

Create a new Rego module

operationId: `cws-create-rego-module`

**Request** (application/json)

- `name`: string **required** — Name of the Rego module (unique per account)
- `rego_source`: string **required** — Library Rego source with a package beginning with "lib." Maximum 16384 UTF-8 bytes.

**Response** 201 → `result`

- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `package_path`: string **required** — Dotted path derived from rego_source. Begins with lib. and is unique per account.
- `rego_source`: string **required** — Library Rego source with a package beginning with "lib." Maximum 16384 UTF-8 bytes.
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cws/rego-modules/{rego_module_id}

Delete a Rego module

operationId: `cws-delete-rego-module`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/rego-modules/{rego_module_id}

Get a Rego module by ID

operationId: `cws-get-rego-module`

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `package_path`: string **required** — Dotted path derived from rego_source. Begins with lib. and is unique per account.
- `rego_source`: string **required** — Library Rego source with a package beginning with "lib." Maximum 16384 UTF-8 bytes.
- `updated_at`: string **required**

## PUT /accounts/{account_id}/cws/rego-modules/{rego_module_id}

Update a Rego module

operationId: `cws-update-rego-module`

**Request** (application/json)

- `name`: string **required** — Name of the Rego module (unique per account)
- `rego_source`: string **required** — Library Rego source with a package beginning with "lib." Maximum 16384 UTF-8 bytes.

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `package_path`: string **required** — Dotted path derived from rego_source. Begins with lib. and is unique per account.
- `rego_source`: string **required** — Library Rego source with a package beginning with "lib." Maximum 16384 UTF-8 bytes.
- `updated_at`: string **required**
