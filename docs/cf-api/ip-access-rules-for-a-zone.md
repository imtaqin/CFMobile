# IP Access rules for a zone

4 endpoints.

## GET /zones/{zone_id}/firewall/access_rules/rules

List IP Access rules

operationId: `ip-access-rules-for-a-zone-list-ip-access-rules` · query: `mode`, `configuration.target`, `configuration.value`, `notes`, `match`, `page`, `per_page`, `order`, `direction`

## POST /zones/{zone_id}/firewall/access_rules/rules

Create an IP Access rule

operationId: `ip-access-rules-for-a-zone-create-an-ip-access-rule`

## DELETE /zones/{zone_id}/firewall/access_rules/rules/{rule_id}

Delete an IP Access rule

operationId: `ip-access-rules-for-a-zone-delete-an-ip-access-rule`

## PATCH /zones/{zone_id}/firewall/access_rules/rules/{rule_id}

Update an IP Access rule

operationId: `ip-access-rules-for-a-zone-update-an-ip-access-rule`
