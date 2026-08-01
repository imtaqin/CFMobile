# OAuth Clients

8 endpoints.

## GET /accounts/{account_id}/oauth_clients

List OAuth Clients

operationId: `oauth-clients-list`

## POST /accounts/{account_id}/oauth_clients

Create OAuth Client

operationId: `oauth-clients-create`

## DELETE /accounts/{account_id}/oauth_clients/{oauth_client_id}

Delete OAuth Client

operationId: `oauth-clients-delete`

## GET /accounts/{account_id}/oauth_clients/{oauth_client_id}

OAuth Client Details

operationId: `oauth-clients-get`

## PATCH /accounts/{account_id}/oauth_clients/{oauth_client_id}

Update OAuth Client

operationId: `oauth-clients-update`

## DELETE /accounts/{account_id}/oauth_clients/{oauth_client_id}/rotate_secret

Delete Rotated OAuth Client Secret

operationId: `oauth-clients-delete-rotated-secret`

## POST /accounts/{account_id}/oauth_clients/{oauth_client_id}/rotate_secret

Rotate OAuth Client Secret

operationId: `oauth-clients-rotate-secret`

## GET /oauth/scopes

List OAuth Scopes

operationId: `oauth-scopes-list`
