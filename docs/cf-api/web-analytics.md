# Web Analytics

15 endpoints.

## POST /accounts/{account_id}/rum/site_info

Create a Web Analytics site

operationId: `web-analytics-create-site`

## DELETE /accounts/{account_id}/rum/site_info/{site_id}

Delete a Web Analytics site

operationId: `web-analytics-delete-site`

## GET /accounts/{account_id}/rum/site_info/{site_id}

Get a Web Analytics site

operationId: `web-analytics-get-site`

## PUT /accounts/{account_id}/rum/site_info/{site_id}

Update a Web Analytics site

operationId: `web-analytics-update-site`

## GET /accounts/{account_id}/rum/site_info/list

List Web Analytics sites

operationId: `web-analytics-list-sites` · query: `per_page`, `page`, `order_by`

## GET /accounts/{account_id}/rum/site_info/site_tag/list

List Web Analytics site tags

operationId: `web-analytics-list-site-tags` · query: `all`

## GET /accounts/{account_id}/rum/site_info/validate/{hostname}

Validate a Web Analytics site hostname

operationId: `web-analytics-validate-site-hostname`

## GET /accounts/{account_id}/rum/site_info/zone_tag/list

List Web Analytics zone tags

operationId: `web-analytics-list-zone-tags`

## POST /accounts/{account_id}/rum/v2/{ruleset_id}/rule

Create a Web Analytics rule

operationId: `web-analytics-create-rule`

## DELETE /accounts/{account_id}/rum/v2/{ruleset_id}/rule/{rule_id}

Delete a Web Analytics rule

operationId: `web-analytics-delete-rule`

## PUT /accounts/{account_id}/rum/v2/{ruleset_id}/rule/{rule_id}

Update a Web Analytics rule

operationId: `web-analytics-update-rule`

## GET /accounts/{account_id}/rum/v2/{ruleset_id}/rules

List rules in Web Analytics ruleset

operationId: `web-analytics-list-rules`

## POST /accounts/{account_id}/rum/v2/{ruleset_id}/rules

Update Web Analytics rules

operationId: `web-analytics-modify-rules`

## GET /zones/{zone_id}/settings/rum

Get RUM status for a zone

operationId: `web-analytics-get-rum-status`

## PATCH /zones/{zone_id}/settings/rum

Toggle RUM on/off for a zone

operationId: `web-analytics-toggle-rum`
