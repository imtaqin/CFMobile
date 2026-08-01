# Filters

7 endpoints.

## DELETE /zones/{zone_id}/filters

Delete filters

operationId: `filters-delete-filters` · query: `id`

## GET /zones/{zone_id}/filters

List filters

operationId: `filters-list-filters` · query: `paused`, `expression`, `description`, `ref`, `page`, `per_page`, `id`

## POST /zones/{zone_id}/filters

Create filters

operationId: `filters-create-filters`

## PUT /zones/{zone_id}/filters

Update filters

operationId: `filters-update-filters`

## DELETE /zones/{zone_id}/filters/{filter_id}

Delete a filter

operationId: `filters-delete-a-filter`

## GET /zones/{zone_id}/filters/{filter_id}

Get a filter

operationId: `filters-get-a-filter`

## PUT /zones/{zone_id}/filters/{filter_id}

Update a filter

operationId: `filters-update-a-filter`
