# CWS Rego Metadata

5 endpoints.

## GET /accounts/{account_id}/cws/rego-metadata

List Rego metadata documents

operationId: `cws-list-rego-metadata` · query: `cursor`, `per_page`, `order`, `direction`, `name`, `import_path`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `data`: any **required** — Arbitrary non-null JSON document with at most 100 nesting levels. Nested null values are supported. PostgreSQL-normalized JSON must not exce
- `id`: string **required** — Server-assigned UUID
- `import_path`: string **required** — Unique Rego import path in the form metadata.<segment>, with one alphanumeric or underscore segment. Reference it as data.<import_path>.
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/rego-metadata

Create a new rego metadata document

operationId: `cws-create-rego-metadata`

**Request** (application/json)

- `data`: any **required** — Arbitrary non-null JSON payload with at most 100 nesting levels. Nested null values are supported. PostgreSQL-normalized JSON must not excee
- `import_path`: string **required** — Unique Rego import path in the form metadata.<segment>, with one alphanumeric or underscore segment. Reference it as data.<import_path>.
- `name`: string **required** — Name of the rego metadata document (unique per account)

**Response** 201 → `result`

- `created_at`: string **required**
- `data`: any **required** — Arbitrary non-null JSON document with at most 100 nesting levels. Nested null values are supported. PostgreSQL-normalized JSON must not exce
- `id`: string **required** — Server-assigned UUID
- `import_path`: string **required** — Unique Rego import path in the form metadata.<segment>, with one alphanumeric or underscore segment. Reference it as data.<import_path>.
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cws/rego-metadata/{rego_metadata_id}

Delete a rego metadata document

operationId: `cws-delete-rego-metadata`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/rego-metadata/{rego_metadata_id}

Get a rego metadata document by ID

operationId: `cws-get-rego-metadata`

**Response** 200 → `result`

- `created_at`: string **required**
- `data`: any **required** — Arbitrary non-null JSON document with at most 100 nesting levels. Nested null values are supported. PostgreSQL-normalized JSON must not exce
- `id`: string **required** — Server-assigned UUID
- `import_path`: string **required** — Unique Rego import path in the form metadata.<segment>, with one alphanumeric or underscore segment. Reference it as data.<import_path>.
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## PUT /accounts/{account_id}/cws/rego-metadata/{rego_metadata_id}

Update a rego metadata document

operationId: `cws-update-rego-metadata`

**Request** (application/json)

- `data`: any **required** — Arbitrary non-null JSON payload with at most 100 nesting levels. Nested null values are supported. PostgreSQL-normalized JSON must not excee
- `import_path`: string **required** — Unique Rego import path in the form metadata.<segment>, with one alphanumeric or underscore segment. Reference it as data.<import_path>.
- `name`: string **required** — Name of the rego metadata document (unique per account)

**Response** 200 → `result`

- `created_at`: string **required**
- `data`: any **required** — Arbitrary non-null JSON document with at most 100 nesting levels. Nested null values are supported. PostgreSQL-normalized JSON must not exce
- `id`: string **required** — Server-assigned UUID
- `import_path`: string **required** — Unique Rego import path in the form metadata.<segment>, with one alphanumeric or underscore segment. Reference it as data.<import_path>.
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**
