# IP Access rules for an account

5 endpoints.

## GET /accounts/{account_id}/firewall/access_rules/rules

List IP Access rules

operationId: `ip-access-rules-for-an-account-list-ip-access-rules` · query: `mode`, `configuration.target`, `configuration.value`, `notes`, `match`, `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/firewall/access_rules/rules

Create an IP Access rule

operationId: `ip-access-rules-for-an-account-create-an-ip-access-rule`

## DELETE /accounts/{account_id}/firewall/access_rules/rules/{rule_id}

Delete an IP Access rule

operationId: `ip-access-rules-for-an-account-delete-an-ip-access-rule`

## GET /accounts/{account_id}/firewall/access_rules/rules/{rule_id}

Get an IP Access rule

operationId: `ip-access-rules-for-an-account-get-an-ip-access-rule`

## PATCH /accounts/{account_id}/firewall/access_rules/rules/{rule_id}

Update an IP Access rule

operationId: `ip-access-rules-for-an-account-update-an-ip-access-rule`
