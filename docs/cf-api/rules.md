# Rules

15 endpoints.

## DELETE /accounts/{account_id}/cloudforce-one/rules

Delete all rules

operationId: `cloudforce-one-delete-all-rules`

## GET /accounts/{account_id}/cloudforce-one/rules

List rules

operationId: `cloudforce-one-list-rules` · query: `namespace`, `path`, `recursive`, `search`, `is_public`, `limit`, `offset`

## POST /accounts/{account_id}/cloudforce-one/rules

Create a rule

operationId: `cloudforce-one-create-rule`

## DELETE /accounts/{account_id}/cloudforce-one/rules/{id}

Delete a rule

operationId: `cloudforce-one-delete-rule`

## GET /accounts/{account_id}/cloudforce-one/rules/{id}

Get a rule

operationId: `cloudforce-one-get-rule`

## PUT /accounts/{account_id}/cloudforce-one/rules/{id}

Update a rule

operationId: `cloudforce-one-update-rule`

## DELETE /accounts/{account_id}/cloudforce-one/rules/exemptions

Remove patterns from exemption rules

operationId: `cloudforce-one-remove-account-exemptions`

## GET /accounts/{account_id}/cloudforce-one/rules/exemptions

Get exemption rules for an account

operationId: `cloudforce-one-get-exemptions`

## POST /accounts/{account_id}/cloudforce-one/rules/exemptions

Add patterns to exemption rules

operationId: `cloudforce-one-add-account-exemptions`

## PUT /accounts/{account_id}/cloudforce-one/rules/exemptions

Update exemption rule patterns

operationId: `cloudforce-one-update-account-exemptions`

## GET /accounts/{account_id}/cloudforce-one/rules/managed

Get managed rules

operationId: `cloudforce-one-get-managed-rules`

## GET /accounts/{account_id}/cloudforce-one/rules/search

Search rules

operationId: `cloudforce-one-search-rules` · query: `namespace`, `path`, `recursive`, `search`, `is_public`, `limit`, `offset`, `query`, `mode`, `language`

## GET /accounts/{account_id}/cloudforce-one/rules/stats

Get dashboard stats

operationId: `cloudforce-one-get-rule-stats`

## GET /accounts/{account_id}/cloudforce-one/rules/tree

Get folder tree structure

operationId: `cloudforce-one-get-rule-tree`

## POST /accounts/{account_id}/cloudforce-one/rules/validate

Validate rule with context

operationId: `cloudforce-one-validate-rule`
