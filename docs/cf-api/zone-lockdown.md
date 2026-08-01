# Zone Lockdown

5 endpoints.

## GET /zones/{zone_id}/firewall/lockdowns

List Zone Lockdown rules

operationId: `zone-lockdown-list-zone-lockdown-rules` · query: `page`, `description`, `modified_on`, `ip`, `priority`, `uri_search`, `ip_range_search`, `per_page`, `created_on`, `description_search`, `ip_search`

## POST /zones/{zone_id}/firewall/lockdowns

Create a Zone Lockdown rule

operationId: `zone-lockdown-create-a-zone-lockdown-rule`

## DELETE /zones/{zone_id}/firewall/lockdowns/{lock_downs_id}

Delete a Zone Lockdown rule

operationId: `zone-lockdown-delete-a-zone-lockdown-rule`

## GET /zones/{zone_id}/firewall/lockdowns/{lock_downs_id}

Get a Zone Lockdown rule

operationId: `zone-lockdown-get-a-zone-lockdown-rule`

## PUT /zones/{zone_id}/firewall/lockdowns/{lock_downs_id}

Update a Zone Lockdown rule

operationId: `zone-lockdown-update-a-zone-lockdown-rule`
