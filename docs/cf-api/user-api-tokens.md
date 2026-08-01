# User API Tokens

8 endpoints.

## GET /user/tokens

List Tokens

operationId: `user-api-tokens-list-tokens` · query: `page`, `per_page`, `direction`

## POST /user/tokens

Create Token

operationId: `user-api-tokens-create-token`

## DELETE /user/tokens/{token_id}

Delete Token

operationId: `user-api-tokens-delete-token`

## GET /user/tokens/{token_id}

Token Details

operationId: `user-api-tokens-token-details`

## PUT /user/tokens/{token_id}

Update Token

operationId: `user-api-tokens-update-token`

## PUT /user/tokens/{token_id}/value

Roll Token

operationId: `user-api-tokens-roll-token`

## GET /user/tokens/permission_groups

List Token Permission Groups

operationId: `permission-groups-list-permission-groups` · query: `name`, `scope`

## GET /user/tokens/verify

Verify Token

operationId: `user-api-tokens-verify-token`
