# AI Gateway Datasets

5 endpoints.

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets

List Datasets

operationId: `aig-config-list-dataset` · query: `page`, `per_page`, `name`, `enable`, `search`

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets

Create a new Dataset

operationId: `aig-config-create-dataset`

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}

Delete a Dataset

operationId: `aig-config-delete-dataset`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}

Fetch a Dataset

operationId: `aig-config-fetch-dataset`

## PUT /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}

Update a Dataset

operationId: `aig-config-update-dataset`
