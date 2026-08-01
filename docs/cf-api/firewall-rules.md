# Firewall rules

9 endpoints.

## DELETE /zones/{zone_id}/firewall/rules

Delete firewall rules

operationId: `firewall-rules-delete-firewall-rules`

## GET /zones/{zone_id}/firewall/rules

List firewall rules

operationId: `firewall-rules-list-firewall-rules` · query: `description`, `action`, `page`, `per_page`, `id`, `paused`

## PATCH /zones/{zone_id}/firewall/rules

Update priority of firewall rules

operationId: `firewall-rules-update-priority-of-firewall-rules`

## POST /zones/{zone_id}/firewall/rules

Create firewall rules

operationId: `firewall-rules-create-firewall-rules`

## PUT /zones/{zone_id}/firewall/rules

Update firewall rules

operationId: `firewall-rules-update-firewall-rules`

## DELETE /zones/{zone_id}/firewall/rules/{rule_id}

Delete a firewall rule

operationId: `firewall-rules-delete-a-firewall-rule`

## GET /zones/{zone_id}/firewall/rules/{rule_id}

Get a firewall rule

operationId: `firewall-rules-get-a-firewall-rule` · query: `id`

## PATCH /zones/{zone_id}/firewall/rules/{rule_id}

Update priority of a firewall rule

operationId: `firewall-rules-update-priority-of-a-firewall-rule`

## PUT /zones/{zone_id}/firewall/rules/{rule_id}

Update a firewall rule

operationId: `firewall-rules-update-a-firewall-rule`
