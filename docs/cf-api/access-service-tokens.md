# Access service tokens

7 endpoints.

## GET /accounts/{account_id}/access/service_tokens

List service tokens

operationId: `access-service-tokens-list-service-tokens` · query: `name`, `search`

## POST /accounts/{account_id}/access/service_tokens

Create a service token

operationId: `access-service-tokens-create-a-service-token`

## DELETE /accounts/{account_id}/access/service_tokens/{service_token_id}

Delete a service token

operationId: `access-service-tokens-delete-a-service-token`

## GET /accounts/{account_id}/access/service_tokens/{service_token_id}

Get a service token

operationId: `access-service-tokens-get-a-service-token`

## PUT /accounts/{account_id}/access/service_tokens/{service_token_id}

Update a service token

operationId: `access-service-tokens-update-a-service-token`

## POST /accounts/{account_id}/access/service_tokens/{service_token_id}/refresh

Refresh a service token

operationId: `access-service-tokens-refresh-a-service-token`

## POST /accounts/{account_id}/access/service_tokens/{service_token_id}/rotate

Rotate a service token

operationId: `access-service-tokens-rotate-a-service-token`
