# AI Gateway Logs

6 endpoints.

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs

Delete Gateway Logs

operationId: `aig-config-delete-gateway-logs` · query: `order_by`, `order_by_direction`, `filters`, `limit`

**Response** 200 → `result`

- `success`: boolean **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs

List Gateway Logs

operationId: `aig-config-list-gateway-logs` · query: `search`, `page`, `per_page`, `order_by`, `order_by_direction`, `filters`, `meta_info`, `direction`, `start_date`, `end_date`, `min_cost`, `max_cost`, `min_tokens_in`, `max_tokens_in`, `min_tokens_out`, `max_tokens_out`, `min_total_tokens`, `max_total_tokens`, `min_duration`, `max_duration`, `feedback`, `success`, `cached`, `model`, `model_type`, `provider`, `request_content_type`, `response_content_type`

**Response** 200 → `result`

[array of]
- `cached`: boolean **required**
- `collect_log_payload`: boolean — Whether the request and response bodies were eligible to be stored. False when the request sent `cf-aig-collect-log-payload: false`, logging
- `cost`: number
- `created_at`: string **required**
- `custom_cost`: boolean
- `duration`: integer **required**
- `id`: string **required**
- `metadata`: string
- `model`: string **required**
- `model_type`: string
- `path`: string **required**
- `provider`: string **required**
- `request_content_type`: string
- `request_type`: string
- `response_content_type`: string
- `status_code`: integer
- `step`: integer
- `success`: boolean **required**
- `tokens_in`: integer **required**
- `tokens_out`: integer **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}

Get Gateway Log Detail

operationId: `aig-config-get-gateway-log-detail`

**Response** 200 → `result`

- `cached`: boolean **required**
- `collect_log_payload`: boolean — Whether the request and response bodies were eligible to be stored. False when the request sent `cf-aig-collect-log-payload: false`, logging
- `cost`: number
- `created_at`: string **required**
- `custom_cost`: boolean
- `duration`: integer **required**
- `id`: string **required**
- `metadata`: string
- `model`: string **required**
- `model_type`: string
- `path`: string **required**
- `provider`: string **required**
- `request_content_type`: string
- `request_head`: string
- `request_head_complete`: boolean
- `request_size`: integer
- `request_type`: string
- `response_content_type`: string
- `response_head`: string
- `response_head_complete`: boolean
- `response_size`: integer
- `status_code`: integer
- `step`: integer
- `success`: boolean **required**
- `tokens_in`: integer **required**
- `tokens_out`: integer **required**

## PATCH /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}

Patch Gateway Log

operationId: `aig-config-patch-gateway-log`

**Request** (application/json)

- `feedback`: number
- `metadata`: object
- `score`: number

**Response** 200 → `result`

object

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/request

Get Gateway Log Request

operationId: `aig-config-get-gateway-log-request`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/response

Get Gateway Log Response

operationId: `aig-config-get-gateway-log-response`

**Response** 200 → `result`

object
