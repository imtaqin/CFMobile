# DEX Rules

5 endpoints.

## GET /accounts/{account_id}/dex/rules

List DEX Rules

operationId: `list-dex-rules` · query: `page`, `per_page`, `sort_order`, `sort_by`, `name`

## POST /accounts/{account_id}/dex/rules

Create a DEX Rule

operationId: `create-dex-rule`

## DELETE /accounts/{account_id}/dex/rules/{rule_id}

Delete a DEX Rule

operationId: `delete-dex-rule`

## GET /accounts/{account_id}/dex/rules/{rule_id}

Get DEX Rule

operationId: `get-dex-rule`

## PATCH /accounts/{account_id}/dex/rules/{rule_id}

Update a DEX Rule

operationId: `update-dex-rule`
