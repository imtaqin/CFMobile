# AI Gateway Evaluations

5 endpoints.

## GET /accounts/{account_id}/ai-gateway/evaluation-types

List Evaluators

operationId: `aig-config-list-evaluators` · query: `page`, `per_page`, `order_by`, `order_by_direction`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations

List Evaluations

operationId: `aig-config-list-evaluations` · query: `page`, `per_page`, `name`, `processed`, `search`

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations

Create a new Evaluation

operationId: `aig-config-create-evaluations`

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations/{id}

Delete a Evaluation

operationId: `aig-config-delete-evaluations`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations/{id}

Fetch a Evaluation

operationId: `aig-config-fetch-evaluations`
