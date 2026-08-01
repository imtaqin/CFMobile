# Token Validation Token Rules

8 endpoints.

## GET /zones/{zone_id}/token_validation/rules

List token validation rules

operationId: `token-validation-rules-list` · query: `token_configuration`, `action`, `enabled`, `id`, `rule_id`, `host`, `hostname`

## POST /zones/{zone_id}/token_validation/rules

Create a token validation rule

operationId: `token-validation-rules-create`

## DELETE /zones/{zone_id}/token_validation/rules/{rule_id}

Delete a zone token validation rule

operationId: `token-validation-rules-delete`

## GET /zones/{zone_id}/token_validation/rules/{rule_id}

Get a zone token validation rule

operationId: `token-validation-rules-get`

## PATCH /zones/{zone_id}/token_validation/rules/{rule_id}

Edit a zone token validation rule

operationId: `token-validation-rules-edit`

## PATCH /zones/{zone_id}/token_validation/rules/bulk

Bulk edit token validation rules

operationId: `token-validation-rules-bulk-edit`

## POST /zones/{zone_id}/token_validation/rules/bulk

Bulk create token validation rules

operationId: `token-validation-rules-bulk-create`

## POST /zones/{zone_id}/token_validation/rules/preview

Preview operations covered by a Token Validation rule

operationId: `token-validation-rules-preview` · query: `state`, `host`, `hostname`, `method`, `endpoint`
