# Origin Cloud Regions

15 endpoints.

## GET /zones/{zone_id}/cache/origin_cloud_regions

List origin cloud region mappings

operationId: `origin-cloud-regions-list`

## PATCH /zones/{zone_id}/cache/origin_cloud_regions

Create or update an origin cloud region mapping

operationId: `origin-cloud-regions-upsert`

## POST /zones/{zone_id}/cache/origin_cloud_regions

Create an origin cloud region mapping

operationId: `origin-cloud-regions-create`

## DELETE /zones/{zone_id}/cache/origin_cloud_regions/{origin_ip}

Delete an origin cloud region mapping

operationId: `origin-cloud-regions-delete`

## GET /zones/{zone_id}/cache/origin_cloud_regions/{origin_ip}

Get an origin cloud region mapping

operationId: `origin-cloud-regions-get`

## DELETE /zones/{zone_id}/cache/origin_cloud_regions/batch

Batch delete origin cloud region mappings

operationId: `origin-cloud-regions-batch-delete`

## PATCH /zones/{zone_id}/cache/origin_cloud_regions/batch

Batch create or update origin cloud region mappings

operationId: `origin-cloud-regions-batch-upsert`

## GET /zones/{zone_id}/cache/origin_cloud_regions/supported_regions

List supported cloud vendors and regions

operationId: `origin-cloud-regions-supported-regions`

## GET /zones/{zone_id}/origin/cloud_regions

List origin cloud region mappings

operationId: `origin-cloud-regions-v2-list` · query: `page`, `per_page`

## DELETE /zones/{zone_id}/origin/cloud_regions/{origin_ip}

Delete an origin cloud region mapping

operationId: `origin-cloud-regions-v2-delete`

## GET /zones/{zone_id}/origin/cloud_regions/{origin_ip}

Get an origin cloud region mapping

operationId: `origin-cloud-regions-v2-get`

## PUT /zones/{zone_id}/origin/cloud_regions/{origin_ip}

Create or replace an origin cloud region mapping

operationId: `origin-cloud-regions-v2-upsert`

## DELETE /zones/{zone_id}/origin/cloud_regions/batch

Batch delete origin cloud region mappings

operationId: `origin-cloud-regions-v2-batch-delete`

## PUT /zones/{zone_id}/origin/cloud_regions/batch

Batch create or replace origin cloud region mappings

operationId: `origin-cloud-regions-v2-batch-upsert`

## GET /zones/{zone_id}/origin/cloud_regions/supported_regions

List supported cloud vendors and regions

operationId: `origin-cloud-regions-v2-supported-regions`
