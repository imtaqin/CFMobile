# Email Routing routing rules

9 endpoints.

## GET /accounts/{account_id}/email/routing/rules

List account routing rules

operationId: `email-routing-routing-rules-list-account-routing-rules` · query: `page`, `per_page`, `enabled`

## POST /accounts/{account_id}/email/routing/rules/plan

Plan account routing rule changes

operationId: `email-routing-routing-rules-plan-account-routing-rules`

## GET /zones/{zone_id}/email/routing/rules

List routing rules

operationId: `email-routing-routing-rules-list-routing-rules` · query: `page`, `per_page`, `enabled`

## POST /zones/{zone_id}/email/routing/rules

Create routing rule

operationId: `email-routing-routing-rules-create-routing-rule`

## DELETE /zones/{zone_id}/email/routing/rules/{rule_identifier}

Delete routing rule

operationId: `email-routing-routing-rules-delete-routing-rule`

## GET /zones/{zone_id}/email/routing/rules/{rule_identifier}

Get routing rule

operationId: `email-routing-routing-rules-get-routing-rule`

## PUT /zones/{zone_id}/email/routing/rules/{rule_identifier}

Update routing rule

operationId: `email-routing-routing-rules-update-routing-rule`

## GET /zones/{zone_id}/email/routing/rules/catch_all

Get catch-all rule

operationId: `email-routing-routing-rules-get-catch-all-rule`

## PUT /zones/{zone_id}/email/routing/rules/catch_all

Update catch-all rule

operationId: `email-routing-routing-rules-update-catch-all-rule`
