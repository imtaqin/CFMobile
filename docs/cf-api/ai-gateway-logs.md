# AI Gateway Logs

6 endpoints.

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs

Delete Gateway Logs

operationId: `aig-config-delete-gateway-logs` · query: `order_by`, `order_by_direction`, `filters`, `limit`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs

List Gateway Logs

operationId: `aig-config-list-gateway-logs` · query: `search`, `page`, `per_page`, `order_by`, `order_by_direction`, `filters`, `meta_info`, `direction`, `start_date`, `end_date`, `min_cost`, `max_cost`, `min_tokens_in`, `max_tokens_in`, `min_tokens_out`, `max_tokens_out`, `min_total_tokens`, `max_total_tokens`, `min_duration`, `max_duration`, `feedback`, `success`, `cached`, `model`, `model_type`, `provider`, `request_content_type`, `response_content_type`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}

Get Gateway Log Detail

operationId: `aig-config-get-gateway-log-detail`

## PATCH /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}

Patch Gateway Log

operationId: `aig-config-patch-gateway-log`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/request

Get Gateway Log Request

operationId: `aig-config-get-gateway-log-request`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/response

Get Gateway Log Response

operationId: `aig-config-get-gateway-log-response`
