# AI Gateway Gateways

6 endpoints.

## GET /accounts/{account_id}/ai-gateway/gateways

List Gateways

operationId: `aig-config-list-gateway` · query: `page`, `per_page`, `search`

## POST /accounts/{account_id}/ai-gateway/gateways

Create a new Gateway

operationId: `aig-config-create-gateway`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/url/{provider}

Get Gateway URL

operationId: `aig-config-get-gateway-url`

## DELETE /accounts/{account_id}/ai-gateway/gateways/{id}

Delete a Gateway

operationId: `aig-config-delete-gateway`

## GET /accounts/{account_id}/ai-gateway/gateways/{id}

Fetch a Gateway

operationId: `aig-config-fetch-gateway`

## PUT /accounts/{account_id}/ai-gateway/gateways/{id}

Update a Gateway

operationId: `aig-config-update-gateway`
