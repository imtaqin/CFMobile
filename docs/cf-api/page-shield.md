# Page Shield

13 endpoints.

## GET /zones/{zone_id}/page_shield

Get Page Shield settings

operationId: `page-shield-get-settings`

## PUT /zones/{zone_id}/page_shield

Update Page Shield settings

operationId: `page-shield-update-settings`

## GET /zones/{zone_id}/page_shield/connections

List Page Shield connections

operationId: `page-shield-list-connections` · query: `exclude_urls`, `urls`, `hosts`, `page`, `per_page`, `order_by`, `direction`, `prioritize_malicious`, `exclude_cdn_cgi`, `status`, `page_url`, `export`

## GET /zones/{zone_id}/page_shield/connections/{connection_id}

Get a Page Shield connection

operationId: `page-shield-get-connection`

## GET /zones/{zone_id}/page_shield/cookies

List Page Shield Cookies

operationId: `page-shield-list-cookies` · query: `hosts`, `page`, `per_page`, `order_by`, `direction`, `page_url`, `export`, `name`, `secure`, `http_only`, `same_site`, `type`, `path`, `domain`

## GET /zones/{zone_id}/page_shield/cookies/{cookie_id}

Get a Page Shield cookie

operationId: `page-shield-get-cookie`

## GET /zones/{zone_id}/page_shield/policies

List Page Shield policies

operationId: `page-shield-list-policies`

## POST /zones/{zone_id}/page_shield/policies

Create a Page Shield policy

operationId: `page-shield-create-policy`

## DELETE /zones/{zone_id}/page_shield/policies/{policy_id}

Delete a Page Shield policy

operationId: `page-shield-delete-policy`

## GET /zones/{zone_id}/page_shield/policies/{policy_id}

Get a Page Shield policy

operationId: `page-shield-get-policy`

## PUT /zones/{zone_id}/page_shield/policies/{policy_id}

Update a Page Shield policy

operationId: `page-shield-update-policy`

## GET /zones/{zone_id}/page_shield/scripts

List Page Shield scripts

operationId: `page-shield-list-scripts` · query: `exclude_urls`, `urls`, `hosts`, `page`, `per_page`, `order_by`, `direction`, `prioritize_malicious`, `exclude_cdn_cgi`, `exclude_duplicates`, `status`, `page_url`, `export`

## GET /zones/{zone_id}/page_shield/scripts/{script_id}

Get a Page Shield script

operationId: `page-shield-get-script`
