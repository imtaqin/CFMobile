# Zero Trust users

10 endpoints.

## GET /accounts/{account_id}/access/users

Get users

operationId: `zero-trust-users-get-users` · query: `name`, `email`, `search`

## POST /accounts/{account_id}/access/users

Create a user

operationId: `zero-trust-users-create-user`

## DELETE /accounts/{account_id}/access/users/{user_id}

Delete a user

operationId: `zero-trust-users-delete-user`

## GET /accounts/{account_id}/access/users/{user_id}

Get a user

operationId: `zero-trust-users-get-user`

## PUT /accounts/{account_id}/access/users/{user_id}

Update a user

operationId: `zero-trust-users-update-user`

## GET /accounts/{account_id}/access/users/{user_id}/active_sessions

Get active sessions

operationId: `zero-trust-users-get-active-sessions`

## GET /accounts/{account_id}/access/users/{user_id}/active_sessions/{nonce}

Get single active session

operationId: `zero-trust-users-get-active-session`

## GET /accounts/{account_id}/access/users/{user_id}/failed_logins

Get failed logins

operationId: `zero-trust-users-get-failed-logins`

## GET /accounts/{account_id}/access/users/{user_id}/last_seen_identity

Get last seen identity

operationId: `zero-trust-users-get-last-seen-identity`

## DELETE /accounts/{account_id}/access/users/{user_id}/mfa_authenticators/{authenticator_id}

Delete a user's MFA device

operationId: `zero-trust-users-delete-mfa-authenticator`
