# Token Validation Token Configuration

7 endpoints.

## GET /zones/{zone_id}/token_validation/config

List token validation configurations

operationId: `token-validation-config-list`

## POST /zones/{zone_id}/token_validation/config

Create a new Token Validation configuration

operationId: `token-validation-config-create`

## DELETE /zones/{zone_id}/token_validation/config/{config_id}

Delete Token Configuration

operationId: `token-validation-config-delete`

## GET /zones/{zone_id}/token_validation/config/{config_id}

Get a single Token Configuration

operationId: `token-validation-config-get`

## PATCH /zones/{zone_id}/token_validation/config/{config_id}

Edit an existing Token Configuration

operationId: `token-validation-config-edit`

## PATCH /zones/{zone_id}/token_validation/config/{config_id}/credentials

Edit Token Configuration credentials

operationId: `token-validation-config-credentials-edit`

## PUT /zones/{zone_id}/token_validation/config/{config_id}/credentials

Update Token Configuration credentials

operationId: `token-validation-config-credentials-update`
