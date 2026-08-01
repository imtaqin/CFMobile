# WAF rules

3 endpoints.

## GET /zones/{zone_id}/firewall/waf/packages/{package_id}/rules

List WAF rules

operationId: `waf-rules-list-waf-rules` · query: `mode`, `group_id`, `page`, `per_page`, `order`, `direction`, `match`, `description`, `priority`

## GET /zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{rule_id}

Get a WAF rule

operationId: `waf-rules-get-a-waf-rule`

## PATCH /zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{rule_id}

Update a WAF rule

operationId: `waf-rules-update-a-waf-rule`
