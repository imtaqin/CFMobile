# Zone

8 endpoints.

## GET /zones

List Zones

operationId: `zones-get` · query: `name`, `status`, `type`, `account.id`, `account.name`, `page`, `per_page`, `order`, `direction`, `match`

## POST /zones

Create Zone

operationId: `zones-post`

## DELETE /zones/{zone_id}

Delete Zone

operationId: `zones-0-delete`

## GET /zones/{zone_id}

Zone Details

operationId: `zones-0-get`

## PATCH /zones/{zone_id}

Edit Zone

operationId: `zones-0-patch`

## PUT /zones/{zone_id}/activation_check

Rerun the Activation Check

operationId: `put-zones-zone_id-activation_check`

## POST /zones/{zone_id}/environments/{environment_id}/purge_cache

Purge Cached Content by Environment

operationId: `zone-environment-purge`

## POST /zones/{zone_id}/purge_cache

Purge Cached Content

operationId: `zone-purge`
