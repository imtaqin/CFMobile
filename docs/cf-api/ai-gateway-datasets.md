# AI Gateway Datasets

5 endpoints.

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets

List datasets (deprecated)

operationId: `aig-config-list-dataset` · query: `page`, `per_page`, `name`, `enable`, `search`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `enable`: boolean **required**
- `filters`: object[] **required**
  [array of]
  - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
  - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
  - `value`: object[] **required**
    [array]
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets

Create a dataset (deprecated)

operationId: `aig-config-create-dataset`

**Request** (application/json)

- `enable`: boolean **required**
- `filters`: object[] **required**
  [array of]
  - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
  - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
  - `value`: object[] **required**
    [array]
- `name`: string **required**

**Response** 200 → `result`

- `created_at`: string **required**
- `enable`: boolean **required**
- `filters`: object[] **required**
  [array of]
  - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
  - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
  - `value`: object[] **required**
    [array]
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}

Delete a dataset (deprecated)

operationId: `aig-config-delete-dataset`

**Response** 200 → `result`

- `created_at`: string **required**
- `enable`: boolean **required**
- `filters`: object[] **required**
  [array of]
  - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
  - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
  - `value`: object[] **required**
    [array]
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}

Get a dataset (deprecated)

operationId: `aig-config-fetch-dataset`

**Response** 200 → `result`

- `created_at`: string **required**
- `enable`: boolean **required**
- `filters`: object[] **required**
  [array of]
  - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
  - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
  - `value`: object[] **required**
    [array]
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**

## PUT /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}

Update a dataset (deprecated)

operationId: `aig-config-update-dataset`

**Request** (application/json)

- `enable`: boolean **required**
- `filters`: object[] **required**
  [array of]
  - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
  - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
  - `value`: object[] **required**
    [array]
- `name`: string **required**

**Response** 200 → `result`

- `created_at`: string **required**
- `enable`: boolean **required**
- `filters`: object[] **required**
  [array of]
  - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
  - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
  - `value`: object[] **required**
    [array]
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**
