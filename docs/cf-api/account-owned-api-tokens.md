# Account Owned API Tokens

8 endpoints.

## GET /accounts/{account_id}/tokens

List Tokens

operationId: `account-api-tokens-list-tokens` · query: `page`, `per_page`, `direction`

## POST /accounts/{account_id}/tokens

Create Token

operationId: `account-api-tokens-create-token`

## DELETE /accounts/{account_id}/tokens/{token_id}

Delete Token

operationId: `account-api-tokens-delete-token`

## GET /accounts/{account_id}/tokens/{token_id}

Token Details

operationId: `account-api-tokens-token-details`

## PUT /accounts/{account_id}/tokens/{token_id}

Update Token

operationId: `account-api-tokens-update-token`

## PUT /accounts/{account_id}/tokens/{token_id}/value

Roll Token

operationId: `account-api-tokens-roll-token`

## GET /accounts/{account_id}/tokens/permission_groups

List Permission Groups

operationId: `account-api-tokens-list-permission-groups` · query: `name`, `scope`

## GET /accounts/{account_id}/tokens/verify

Verify Token

operationId: `account-api-tokens-verify-token`
