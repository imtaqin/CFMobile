# AI Gateway Evaluations

5 endpoints.

## GET /accounts/{account_id}/ai-gateway/evaluation-types

List evaluator types (deprecated)

operationId: `aig-config-list-evaluators` · query: `page`, `per_page`, `order_by`, `order_by_direction`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `description`: string **required**
- `enable`: boolean **required**
- `id`: string **required**
- `mandatory`: boolean **required**
- `modified_at`: string **required**
- `name`: string **required**
- `type`: string **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations

List evaluations (deprecated)

operationId: `aig-config-list-evaluations` · query: `page`, `per_page`, `name`, `processed`, `search`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `datasets`: object[] **required**
  [array of]
  - `account_id`: string **required**
  - `account_tag`: string **required**
  - `created_at`: string **required**
  - `enable`: boolean **required**
  - `filters`: object[] **required**
    [array of]
    - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
    - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
    - `value`: object[] **required**
  - `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
  - `id`: string **required**
  - `modified_at`: string **required**
  - `name`: string **required**
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**
- `processed`: boolean **required**
- `results`: object[] **required**
  [array of]
  - `created_at`: string **required**
  - `evaluation_id`: string **required**
  - `evaluation_type_id`: string **required**
  - `id`: string **required**
  - `modified_at`: string **required**
  - `result`: string **required**
  - `status`: number **required**
  - `status_description`: string **required**
  - `total_logs`: number **required**
- `total_logs`: number **required**

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations

Create an evaluation (deprecated)

operationId: `aig-config-create-evaluations`

**Request** (application/json)

- `dataset_ids`: string[] **required**
  [array]
- `evaluation_type_ids`: string[] **required**
  [array]
- `name`: string **required**

**Response** 200 → `result`

- `created_at`: string **required**
- `datasets`: object[] **required**
  [array of]
  - `account_id`: string **required**
  - `account_tag`: string **required**
  - `created_at`: string **required**
  - `enable`: boolean **required**
  - `filters`: object[] **required**
    [array of]
    - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
    - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
    - `value`: object[] **required**
  - `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
  - `id`: string **required**
  - `modified_at`: string **required**
  - `name`: string **required**
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**
- `processed`: boolean **required**
- `results`: object[] **required**
  [array of]
  - `created_at`: string **required**
  - `evaluation_id`: string **required**
  - `evaluation_type_id`: string **required**
  - `id`: string **required**
  - `modified_at`: string **required**
  - `result`: string **required**
  - `status`: number **required**
  - `status_description`: string **required**
  - `total_logs`: number **required**
- `total_logs`: number **required**

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations/{id}

Delete an evaluation (deprecated)

operationId: `aig-config-delete-evaluations`

**Response** 200 → `result`

- `created_at`: string **required**
- `datasets`: object[] **required**
  [array of]
  - `account_id`: string **required**
  - `account_tag`: string **required**
  - `created_at`: string **required**
  - `enable`: boolean **required**
  - `filters`: object[] **required**
    [array of]
    - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
    - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
    - `value`: object[] **required**
  - `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
  - `id`: string **required**
  - `modified_at`: string **required**
  - `name`: string **required**
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**
- `processed`: boolean **required**
- `results`: object[] **required**
  [array of]
  - `created_at`: string **required**
  - `evaluation_id`: string **required**
  - `evaluation_type_id`: string **required**
  - `id`: string **required**
  - `modified_at`: string **required**
  - `result`: string **required**
  - `status`: number **required**
  - `status_description`: string **required**
  - `total_logs`: number **required**
- `total_logs`: number **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations/{id}

Get an evaluation (deprecated)

operationId: `aig-config-fetch-evaluations`

**Response** 200 → `result`

- `created_at`: string **required**
- `datasets`: object[] **required**
  [array of]
  - `account_id`: string **required**
  - `account_tag`: string **required**
  - `created_at`: string **required**
  - `enable`: boolean **required**
  - `filters`: object[] **required**
    [array of]
    - `key`: string **required** enum: `created_at`, `request_content_type`, `response_content_type`, `success`, `cached`, `provider`, `model`, `cost`
    - `operator`: string **required** enum: `eq`, `contains`, `lt`, `gt`
    - `value`: object[] **required**
  - `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
  - `id`: string **required**
  - `modified_at`: string **required**
  - `name`: string **required**
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**
- `processed`: boolean **required**
- `results`: object[] **required**
  [array of]
  - `created_at`: string **required**
  - `evaluation_id`: string **required**
  - `evaluation_type_id`: string **required**
  - `id`: string **required**
  - `modified_at`: string **required**
  - `result`: string **required**
  - `status`: number **required**
  - `status_description`: string **required**
  - `total_logs`: number **required**
- `total_logs`: number **required**
