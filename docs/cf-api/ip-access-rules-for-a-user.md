# IP Access rules for a user

5 endpoints.

## GET /user/firewall/access_rules/rules

List IP Access rules

operationId: `ip-access-rules-for-a-user-list-ip-access-rules` · query: `mode`, `configuration.target`, `configuration.value`, `notes`, `match`, `page`, `per_page`, `order`, `direction`

## POST /user/firewall/access_rules/rules

Create an IP Access rule

operationId: `ip-access-rules-for-a-user-create-an-ip-access-rule`

## DELETE /user/firewall/access_rules/rules/{rule_id}

Delete an IP Access rule

operationId: `ip-access-rules-for-a-user-delete-an-ip-access-rule`

## GET /user/firewall/access_rules/rules/{rule_id}

Get an IP Access rule

operationId: `ip-access-rules-for-a-user-get-an-ip-access-rule`

## PATCH /user/firewall/access_rules/rules/{rule_id}

Update an IP Access rule

operationId: `ip-access-rules-for-a-user-update-an-ip-access-rule`
