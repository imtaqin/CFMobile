# WAF rule groups

3 endpoints.

## GET /zones/{zone_id}/firewall/waf/packages/{package_id}/groups

List WAF rule groups

operationId: `waf-rule-groups-list-waf-rule-groups` · query: `mode`, `page`, `per_page`, `order`, `direction`, `match`, `name`, `rules_count`

## GET /zones/{zone_id}/firewall/waf/packages/{package_id}/groups/{group_id}

Get a WAF rule group

operationId: `waf-rule-groups-get-a-waf-rule-group`

## PATCH /zones/{zone_id}/firewall/waf/packages/{package_id}/groups/{group_id}

Update a WAF rule group

operationId: `waf-rule-groups-update-a-waf-rule-group`
