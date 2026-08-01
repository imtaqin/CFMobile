# WAF packages

3 endpoints.

## GET /zones/{zone_id}/firewall/waf/packages

List WAF packages

operationId: `waf-packages-list-waf-packages` · query: `page`, `per_page`, `order`, `direction`, `match`, `name`

## GET /zones/{zone_id}/firewall/waf/packages/{package_id}

Get a WAF package

operationId: `waf-packages-get-a-waf-package`

## PATCH /zones/{zone_id}/firewall/waf/packages/{package_id}

Update a WAF package

operationId: `waf-packages-update-a-waf-package`
