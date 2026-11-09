# CWS Workloads

5 endpoints.

## GET /accounts/{account_id}/cws/workloads

List workloads

operationId: `cws-list-workloads` · query: `cursor`, `per_page`, `order`, `direction`, `name`, `policy_set_id`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `filter`: string **required** — Filter expression selecting the requests this workload matches. Maximum 4096 UTF-8 bytes.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable handle; unique per account.
- `tags`: object **required** — Tags attached to this workload
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/workloads

Create a new workload

operationId: `cws-create-workload`

**Request** (application/json)

- `description`: string — Optional free-form description.
- `filter`: string **required** — Filter expression selecting the requests this workload matches. Maximum 4096 UTF-8 bytes.
- `name`: string **required** — Human-readable handle; unique per account.
- `tags`: object — Tags to attach. Keys are limited to 256 UTF-8 bytes and values to 1024 UTF-8 bytes.

**Response** 201 → `result`

- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `filter`: string **required** — Filter expression selecting the requests this workload matches. Maximum 4096 UTF-8 bytes.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable handle; unique per account.
- `tags`: object **required** — Tags attached to this workload
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cws/workloads/{workload_id}

Delete a workload

operationId: `cws-delete-workload`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/workloads/{workload_id}

Get a workload by ID

operationId: `cws-get-workload`

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `filter`: string **required** — Filter expression selecting the requests this workload matches. Maximum 4096 UTF-8 bytes.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable handle; unique per account.
- `tags`: object **required** — Tags attached to this workload
- `updated_at`: string **required**

## PUT /accounts/{account_id}/cws/workloads/{workload_id}

Update a workload

operationId: `cws-update-workload`

**Request** (application/json)

- `description`: string — Optional free-form description.
- `filter`: string **required** — Filter expression selecting the requests this workload matches. Maximum 4096 UTF-8 bytes.
- `name`: string **required** — Human-readable handle; unique per account.
- `tags`: object — Replacement tag set. Omit or use {} to clear. Keys are limited to 256 UTF-8 bytes and values to 1024 UTF-8 bytes.

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `filter`: string **required** — Filter expression selecting the requests this workload matches. Maximum 4096 UTF-8 bytes.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable handle; unique per account.
- `tags`: object **required** — Tags attached to this workload
- `updated_at`: string **required**
