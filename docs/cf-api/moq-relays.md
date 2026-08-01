# MoQ Relays

8 endpoints.

## GET /accounts/{account_id}/moq/relays

List relays

operationId: `moq-relays-list`

## POST /accounts/{account_id}/moq/relays

Create a relay

operationId: `moq-relays-create`

## DELETE /accounts/{account_id}/moq/relays/{relay_id}

Delete a relay

operationId: `moq-relays-delete`

## GET /accounts/{account_id}/moq/relays/{relay_id}

Get a relay

operationId: `moq-relays-get`

## PUT /accounts/{account_id}/moq/relays/{relay_id}

Update a relay

operationId: `moq-relays-update`

## GET /accounts/{account_id}/moq/relays/{relay_id}/tokens

List tokens

operationId: `moq-relays-tokens-list`

## POST /accounts/{account_id}/moq/relays/{relay_id}/tokens

Create a token

operationId: `moq-relays-tokens-create`

## DELETE /accounts/{account_id}/moq/relays/{relay_id}/tokens/{jti}

Revoke a token

operationId: `moq-relays-tokens-delete`
