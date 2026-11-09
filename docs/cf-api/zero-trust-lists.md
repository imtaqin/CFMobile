# Zero Trust lists

8 endpoints.

## GET /accounts/{account_id}/gateway/lists

List Zero Trust lists

operationId: `zero-trust-lists-list-zero-trust-lists` · query: `type`, `filter`, `search`, `order_by`, `direction`

**Response** 200 → `result`

[array of]
- `count`: number — Indicate the number of items in the list.
- `created_at`: string
- `description`: string — Provide the list description.
- `id`: string — Identify the API resource with a UUID.
- `items`: object[] — Provide the list items.
  [array of]
  - `created_at`: string
  - `description`: string — Provide the list item description (optional).
  - `value`: string — Specify the item value.
- `name`: string — Specify the list name.
- `type`: string enum: `SERIAL`, `URL`, `DOMAIN`, `EMAIL`, `IP`, `CATEGORY`, `LOCATION`, `DEVICE` — Specify the list type.
- `updated_at`: string

## POST /accounts/{account_id}/gateway/lists

Create Zero Trust list

operationId: `zero-trust-lists-create-zero-trust-list`

**Request** (application/json)

- `description`: string — Provide the list description.
- `items`: object[] — Add items to the list.
  [array of]
  - `description`: string — Provide the list item description (optional).
  - `value`: string — Specify the item value.
- `name`: string **required** — Specify the list name.
- `type`: string **required** enum: `SERIAL`, `URL`, `DOMAIN`, `EMAIL`, `IP`, `CATEGORY`, `LOCATION`, `DEVICE` — Specify the list type.

**Response** 200 → `result`

- `created_at`: string
- `description`: string — Provide the list description.
- `id`: string — Identify the API resource with a UUID.
- `items`: object[] — Provide the list items.
  [array of]
  - `created_at`: string
  - `description`: string — Provide the list item description (optional).
  - `value`: string — Specify the item value.
- `name`: string — Specify the list name.
- `type`: string enum: `SERIAL`, `URL`, `DOMAIN`, `EMAIL`, `IP`, `CATEGORY`, `LOCATION`, `DEVICE` — Specify the list type.
- `updated_at`: string

## DELETE /accounts/{account_id}/gateway/lists/{list_id}

Delete Zero Trust list

operationId: `zero-trust-lists-delete-zero-trust-list`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/gateway/lists/{list_id}

Get Zero Trust list details

operationId: `zero-trust-lists-zero-trust-list-details`

**Response** 200 → `result`

- `count`: number — Indicate the number of items in the list.
- `created_at`: string
- `description`: string — Provide the list description.
- `id`: string — Identify the API resource with a UUID.
- `items`: object[] — Provide the list items.
  [array of]
  - `created_at`: string
  - `description`: string — Provide the list item description (optional).
  - `value`: string — Specify the item value.
- `name`: string — Specify the list name.
- `type`: string enum: `SERIAL`, `URL`, `DOMAIN`, `EMAIL`, `IP`, `CATEGORY`, `LOCATION`, `DEVICE` — Specify the list type.
- `updated_at`: string

## PATCH /accounts/{account_id}/gateway/lists/{list_id}

Patch Zero Trust list.

operationId: `zero-trust-lists-patch-zero-trust-list`

**Request** (application/json)

- `append`: object[] — Add items to the list.
  [array of]
  - `description`: string — Provide the list item description (optional).
  - `value`: string — Specify the item value.
- `remove`: string[] — Lists of item values you want to remove.
  [array]

**Response** 200 → `result`

- `count`: number — Indicate the number of items in the list.
- `created_at`: string
- `description`: string — Provide the list description.
- `id`: string — Identify the API resource with a UUID.
- `items`: object[] — Provide the list items.
  [array of]
  - `created_at`: string
  - `description`: string — Provide the list item description (optional).
  - `value`: string — Specify the item value.
- `name`: string — Specify the list name.
- `type`: string enum: `SERIAL`, `URL`, `DOMAIN`, `EMAIL`, `IP`, `CATEGORY`, `LOCATION`, `DEVICE` — Specify the list type.
- `updated_at`: string

## PUT /accounts/{account_id}/gateway/lists/{list_id}

Update Zero Trust list

operationId: `zero-trust-lists-update-zero-trust-list`

**Request** (application/json)

- `description`: string — Provide the list description.
- `items`: object[] — Add items to the list.
  [array of]
  - `description`: string — Provide the list item description (optional).
  - `value`: string — Specify the item value.
- `name`: string **required** — Specify the list name.

**Response** 200 → `result`

- `count`: number — Indicate the number of items in the list.
- `created_at`: string
- `description`: string — Provide the list description.
- `id`: string — Identify the API resource with a UUID.
- `items`: object[] — Provide the list items.
  [array of]
  - `created_at`: string
  - `description`: string — Provide the list item description (optional).
  - `value`: string — Specify the item value.
- `name`: string — Specify the list name.
- `type`: string enum: `SERIAL`, `URL`, `DOMAIN`, `EMAIL`, `IP`, `CATEGORY`, `LOCATION`, `DEVICE` — Specify the list type.
- `updated_at`: string

## GET /accounts/{account_id}/gateway/lists/{list_id}/items

Get Zero Trust list items

operationId: `zero-trust-lists-zero-trust-list-items` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: string
- `description`: string — Provide the list item description (optional).
- `value`: string — Specify the item value.

## POST /accounts/{account_id}/gateway/lists/upload

Create Zero Trust list from CSV

operationId: `zero-trust-lists-create-zero-trust-list-from-csv`

**Request** (multipart/form-data)

- `file`: string **required** — The CSV file containing list items. Must be `text/csv` or `text/plain` and cannot exceed 2 MB.

**Response** 200 → `result`

- `created_at`: string
- `data`: object
  - `description`: string — Provide the list description.
  - `list_type`: string enum: `SERIAL`, `URL`, `DOMAIN`, `EMAIL`, `IP`, `CATEGORY`, `LOCATION`, `DEVICE` — Specify the list type.
  - `name`: string — Specify the list name.
- `id`: string — Identify the API resource with a UUID.
- `operation_type`: string enum: `create_list` — The type of operation.
- `processing_error`: string — A human-readable error message if the operation failed. Only present when the operation status is `failed`.
- `result`: string — The result of the operation. Only present when the operation has completed successfully.
- `status`: string enum: `pending`, `active`, `failed`, `complete` — The status of the operation.
- `updated_at`: string
