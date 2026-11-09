# Logpush transformers

8 endpoints.

## GET /accounts/{account_id}/logpush/transformers

List transformers

operationId: `get-accounts-account_id-logpush-transformers`

**Response** 200 → `result`

[array of]
- `associated_jobs`: object[] — Logpush jobs that reference this transformer.
  [array of]
  - `id`: integer — The logpush job ID.
  - `name`: string — The logpush job destination name.
  - `object_tag`: string — The zone or account tag.
  - `object_type`: string enum: `zone`, `account` — Whether the job is zone-scoped or account-scoped.
- `created_at`: string — When the transformer was created (RFC 3339).
- `dataset`: string — The dataset this transformer operates on, derived from the SQL query's FROM clause. Informational only. May be absent if the dataset cannot 
- `description`: string — Optional customer-provided description.
- `id`: integer — The transformer ID.
- `name`: string — Customer-provided name for identification.
- `updated_at`: string — When the transformer was last modified (RFC 3339).

## POST /accounts/{account_id}/logpush/transformers

Create transformer

operationId: `post-accounts-account_id-logpush-transformers`

**Request** (application/json)

- `code`: string **required** — The SQL transformer query. Maximum 32 KB. The query must contain a FROM clause referencing a valid logpush dataset.
- `description`: string — Optional customer-provided description.
- `name`: string **required** — Customer-provided name for identification.

**Response** 201 → `result`

- `associated_jobs`: object[] — Logpush jobs that reference this transformer.
  [array of]
  - `id`: integer — The logpush job ID.
  - `name`: string — The logpush job destination name.
  - `object_tag`: string — The zone or account tag.
  - `object_type`: string enum: `zone`, `account` — Whether the job is zone-scoped or account-scoped.
- `created_at`: string — When the transformer was created (RFC 3339).
- `dataset`: string — The dataset this transformer operates on, derived from the SQL query's FROM clause. Informational only. May be absent if the dataset cannot 
- `description`: string — Optional customer-provided description.
- `id`: integer — The transformer ID.
- `name`: string — Customer-provided name for identification.
- `updated_at`: string — When the transformer was last modified (RFC 3339).

## DELETE /accounts/{account_id}/logpush/transformers/{transformer_id}

Delete transformer

operationId: `delete-accounts-account_id-logpush-transformers-transformer_id`

**Response** 200 → `result`

- `id`: integer — The deleted transformer's ID.

## GET /accounts/{account_id}/logpush/transformers/{transformer_id}

Get transformer

operationId: `get-accounts-account_id-logpush-transformers-transformer_id`

**Response** 200 → `result`

- `associated_jobs`: object[] — Logpush jobs that reference this transformer.
  [array of]
  - `id`: integer — The logpush job ID.
  - `name`: string — The logpush job destination name.
  - `object_tag`: string — The zone or account tag.
  - `object_type`: string enum: `zone`, `account` — Whether the job is zone-scoped or account-scoped.
- `created_at`: string — When the transformer was created (RFC 3339).
- `dataset`: string — The dataset this transformer operates on, derived from the SQL query's FROM clause. Informational only. May be absent if the dataset cannot 
- `description`: string — Optional customer-provided description.
- `id`: integer — The transformer ID.
- `name`: string — Customer-provided name for identification.
- `updated_at`: string — When the transformer was last modified (RFC 3339).

## PUT /accounts/{account_id}/logpush/transformers/{transformer_id}

Update transformer

operationId: `put-accounts-account_id-logpush-transformers-transformer_id`

**Request** (application/json)

- `code`: string — The SQL transformer query. Maximum 32 KB. The query must contain a FROM clause referencing a valid logpush dataset.
- `description`: string — Optional customer-provided description.
- `name`: string **required** — Customer-provided name for identification.

**Response** 200 → `result`

- `associated_jobs`: object[] — Logpush jobs that reference this transformer.
  [array of]
  - `id`: integer — The logpush job ID.
  - `name`: string — The logpush job destination name.
  - `object_tag`: string — The zone or account tag.
  - `object_type`: string enum: `zone`, `account` — Whether the job is zone-scoped or account-scoped.
- `created_at`: string — When the transformer was created (RFC 3339).
- `dataset`: string — The dataset this transformer operates on, derived from the SQL query's FROM clause. Informational only. May be absent if the dataset cannot 
- `description`: string — Optional customer-provided description.
- `id`: integer — The transformer ID.
- `name`: string — Customer-provided name for identification.
- `updated_at`: string — When the transformer was last modified (RFC 3339).

## GET /accounts/{account_id}/logpush/transformers/{transformer_id}/content

Get transformer content

operationId: `get-accounts-account_id-logpush-transformers-transformer_id-content` · query: `version_id`

**Response** 200 → `result`

- `content`: string — The SQL query content.

## GET /accounts/{account_id}/logpush/transformers/{transformer_id}/versions

List transformer versions

operationId: `get-accounts-account_id-logpush-transformers-transformer_id-versions` · query: `limit`

**Response** 200 → `result`

[array of]
- `created_at`: string — When this version was created (RFC 3339).
- `id`: integer — Unique identifier for this version.
- `version`: integer — Sequential version number.

## POST /accounts/{account_id}/logpush/transformers/preview

Preview transformer

operationId: `post-accounts-account_id-logpush-transformers-preview`

**Request** (application/json)

- `input`: object **required** — A single log record to transform (JSON object).
- `sql`: string **required** — The SQL transformer query. Maximum 32 KB. The query must contain a FROM clause referencing a valid logpush dataset.

**Response** 200 → `result`

[array of]
object
