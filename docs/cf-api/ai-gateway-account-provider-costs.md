# AI Gateway Account Provider Costs

5 endpoints.

## GET /accounts/{account_id}/ai-gateway/custom-providers/costs

List Account Provider Costs

operationId: `aig-config-list-account-provider-cost` · query: `page`, `per_page`, `enable`, `account_provider_id`, `model_rule`, `cost_type`, `search`

## POST /accounts/{account_id}/ai-gateway/custom-providers/costs

Create a new Account Provider Cost

operationId: `aig-config-create-account-provider-cost`

## DELETE /accounts/{account_id}/ai-gateway/custom-providers/costs/{id}

Delete a Account Provider Cost

operationId: `aig-config-delete-account-provider-cost`

## GET /accounts/{account_id}/ai-gateway/custom-providers/costs/{id}

Fetch a Account Provider Cost

operationId: `aig-config-fetch-account-provider-cost`

## PATCH /accounts/{account_id}/ai-gateway/custom-providers/costs/{id}

Update a Account Provider Cost

operationId: `aig-config-update-account-provider-cost`
