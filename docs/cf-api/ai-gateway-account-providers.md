# AI Gateway Account Providers

5 endpoints.

## GET /accounts/{account_id}/ai-gateway/custom-providers

List Account Providers

operationId: `aig-config-list-account-provider` · query: `page`, `per_page`, `beta`, `enable`, `search`

## POST /accounts/{account_id}/ai-gateway/custom-providers

Create a new Account Provider

operationId: `aig-config-create-account-provider`

## DELETE /accounts/{account_id}/ai-gateway/custom-providers/{id}

Delete a Account Provider

operationId: `aig-config-delete-account-provider`

## GET /accounts/{account_id}/ai-gateway/custom-providers/{id}

Fetch a Account Provider

operationId: `aig-config-fetch-account-provider`

## PATCH /accounts/{account_id}/ai-gateway/custom-providers/{id}

Update a Account Provider

operationId: `aig-config-update-account-provider`
