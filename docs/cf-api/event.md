# Event

31 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events

Filter and list events

operationId: `get_EventListGet` · query: `cursor`, `search`, `page`, `pageSize`, `orderBy`, `order`, `datasetId`, `forceRefresh`, `format`, `source`, `cache`

## DELETE /accounts/{account_id}/cloudforce-one/events/{dataset_id}/delete

Deletes one or more events

operationId: `delete_EventDelete` · query: `eventIds`

## GET /accounts/{account_id}/cloudforce-one/events/{event_id}

Reads an event

operationId: `get_EventReadDeprecated`

## PATCH /accounts/{account_id}/cloudforce-one/events/{event_id}

Updates an event

operationId: `patch_EventUpdate`

## POST /accounts/{account_id}/cloudforce-one/events/{event_id}

Updates an event

operationId: `post_EventUpdate`

## GET /accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}

Reads data for a raw event

operationId: `get_EventRawRead`

## PATCH /accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}

Updates a raw event

operationId: `patch_EventRawUpdate`

## POST /accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}

Updates a raw event

operationId: `post_EventRawUpdate`

## GET /accounts/{account_id}/cloudforce-one/events/{event_id}/relationships

Filter and list events related to specific event

operationId: `get_EventRelationships` · query: `direction`, `maxDepth`, `relationshipTypes`, `indicatorTypeIds`, `datasetId`, `includeParent`, `page`, `pageSize`

## GET /accounts/{account_id}/cloudforce-one/events/aggregate

Aggregate events by single or multiple columns with optional date filtering

operationId: `get_EventAggregate` · query: `aggregateBy`, `datasetId`, `startDate`, `endDate`, `groupByDate`, `limit`

## POST /accounts/{account_id}/cloudforce-one/events/create

Creates a new event

operationId: `post_EventCreate`

## POST /accounts/{account_id}/cloudforce-one/events/create/bulk

Creates bulk events

operationId: `post_EventCreateBulk`

## POST /accounts/{account_id}/cloudforce-one/events/create/bulk/relationships

Creates bulk DOS event with relationships and indicators

operationId: `post_DOSEventCreateBulkWithRelationships`

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/copy

Copies specified events from one dataset to another dataset

operationId: `post_EventCopyToNewDS` · query: `keepRawData`

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/events/{event_id}

Reads an event

operationId: `get_EventRead`

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/move

Moves specified events from one dataset to another dataset

operationId: `post_EventMoveToNewDS` · query: `keepRawData`

## DELETE /accounts/{account_id}/cloudforce-one/events/event_tag/{event_id}

Removes a tag from an event

operationId: `delete_EventTagDelete`

## POST /accounts/{account_id}/cloudforce-one/events/event_tag/{event_id}/create

Adds a tag to an event

operationId: `post_EventTagCreate`

## POST /accounts/{account_id}/cloudforce-one/events/graphql

GraphQL endpoint for event aggregation

operationId: `post_EventGraphQL`

## GET /accounts/{account_id}/cloudforce-one/events/queries

List all saved event queries

operationId: `get_EventQueryList`

## DELETE /accounts/{account_id}/cloudforce-one/events/queries/{query_id}

Delete a saved event query

operationId: `delete_EventQueryDelete`

## GET /accounts/{account_id}/cloudforce-one/events/queries/{query_id}

Read a saved event query

operationId: `get_EventQueryRead`

## PATCH /accounts/{account_id}/cloudforce-one/events/queries/{query_id}

Update a saved event query

operationId: `patch_EventQueryUpdate`

## POST /accounts/{account_id}/cloudforce-one/events/queries/{query_id}

Update a saved event query

operationId: `post_EventQueryUpdate`

## POST /accounts/{account_id}/cloudforce-one/events/queries/create

Create a saved event query

operationId: `post_EventQueryCreate`

## GET /accounts/{account_id}/cloudforce-one/events/raw/{dataset_id}/{event_id}

Reads raw data for an event by UUID

operationId: `get_EventRawReadDS`

## DELETE /accounts/{account_id}/cloudforce-one/events/relate/{event_id}

Removes an event reference

operationId: `delete_EventReferenceDelete`

## POST /accounts/{account_id}/cloudforce-one/events/relate/{event_id}/create

Creates event references for a event

operationId: `post_EventReferenceCreate`

## POST /accounts/{account_id}/cloudforce-one/events/relationships/create

Create a relationship between two events

operationId: `post_CreateEventRelationship`

## PATCH /accounts/{account_id}/cloudforce-one/events/update/bulk

Bulk update events

operationId: `patch_EventUpdateBulk`

## POST /accounts/{account_id}/cloudforce-one/v2/events/graphql

GraphQL endpoint for event aggregation

operationId: `post_EventGraphQLV2`
