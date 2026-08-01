# Indicator

9 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators

Lists indicators

operationId: `get_IndicatorListLegacy` · query: `page`, `pageSize`, `name`, `indicatorType`, `relatedEvent`

## DELETE /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}

Deletes an indicator

operationId: `delete_IndicatorDelete`

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}

Reads an indicator

operationId: `get_IndicatorRead`

## PATCH /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}

Updates an indicator

operationId: `patch_IndicatorUpdate`

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/bulk

Creates multiple indicators in bulk

operationId: `post_IndicatorCreateBulk`

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/create

Creates a new indicator

operationId: `post_IndicatorCreate`

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/tags

List mirrored tags for an indicator dataset

operationId: `get_IndicatorTagsList`

## GET /accounts/{account_id}/cloudforce-one/events/indicators

Lists indicators across multiple datasets

operationId: `get_IndicatorList` · query: `datasetIds`, `page`, `pageSize`, `search`, `name`, `indicatorType`, `relatedEvents`, `tags`, `tagSearch`, `createdAfter`, `createdBefore`, `relatedEventsLimit`, `includeTags`, `includeTotalCount`, `format`, `source`, `cache`

## GET /accounts/{account_id}/cloudforce-one/events/indicators/aggregate

Aggregate indicators by column(s)

operationId: `get_IndicatorAggregate` · query: `aggregateBy`, `measure`, `tagUuid`, `datasetIds`, `createdAfter`, `createdBefore`, `eventDateAfter`, `eventDateBefore`, `limit`
