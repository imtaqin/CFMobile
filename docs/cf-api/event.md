# Event

35 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events

List events

operationId: `get_EventListGet` · query: `cursor`, `search`, `searchBranches`, `page`, `pageSize`, `orderBy`, `order`, `datasetId`, `forceRefresh`, `format`, `cache`

**Response** 200 → `result`

[array of]
- `attacker`: string **required**
- `attackerCountry`: string **required**
- `attackerCountryAlpha3`: string **required**
- `category`: string **required**
- `datasetId`: string **required**
- `date`: string **required**
- `event`: string **required**
- `hasChildren`: boolean **required**
- `indicator`: string **required**
- `indicatorType`: string **required**
- `indicatorTypeId`: number **required**
- `insight`: string
- `killChain`: number **required**
- `mitreAttack`: string[] **required**
  [array]
- `mitreCapec`: string[] **required**
  [array]
- `numReferenced`: number **required**
- `numReferences`: number **required**
- `rawId`: string **required**
- `referenced`: string[] **required**
  [array]
- `referencedIds`: number[] **required**
  [array]
- `references`: string[] **required**
  [array]
- `referencesIds`: number[] **required**
  [array]
- `releasabilityId`: string
- `tags`: string[] **required**
  [array]
- `targetCountry`: string **required**
- `targetCountryAlpha3`: string **required**
- `targetIndustry`: string **required**
- `tlp`: string **required**
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events

Search events

operationId: `post_EventList` · query: `forceRefresh`, `format`, `cache`

**Request** (application/json)

- `cursor`: string — Cursor for pagination. When provided, filters are embedded in the cursor so you only need to pass cursor and pageSize.
- `datasetId`: string[] — Dataset UUIDs to query, or one standalone scope value: 'all'/'*' or 'operational' for readable intelligence datasets (isAnalytics=false), or
  [array]
- `order`: string enum: `asc`, `desc`
- `orderBy`: string
- `page`: number
- `pageSize`: number
- `search`: object[] default: `` — Structured search as a JSON array of {field, op, value} objects, AND'd together. Max 10 conditions per request. `in` and `notIn` take an arr
  [array of]
  - `field`: string **required** enum: `attacker`, `attackerCountry`, `category`, `createdAt`, `date`, `event`, `indicator`, `indicatorType`
  - `op`: string **required** enum: `equals`, `not`, `gt`, `gte`, `lt`, `lte`, `like`, `contains`
  - `value`: string **required**
- `searchBranches`: array[] — OR branches of structured search filters. Filters within a branch are AND'd, branches are OR'd, and the result is AND'd with `search`: `AND(
  [array of]
  [array of]
  - `field`: string **required** enum: `attacker`, `attackerCountry`, `category`, `createdAt`, `date`, `event`, `indicator`, `indicatorType`
  - `op`: string **required** enum: `equals`, `not`, `gt`, `gte`, `lt`, `lte`, `like`, `contains`
  - `value`: string **required**

**Response** 200 → `result`

[array of]
- `attacker`: string **required**
- `attackerCountry`: string **required**
- `attackerCountryAlpha3`: string **required**
- `category`: string **required**
- `datasetId`: string **required**
- `date`: string **required**
- `event`: string **required**
- `hasChildren`: boolean **required**
- `indicator`: string **required**
- `indicatorType`: string **required**
- `indicatorTypeId`: number **required**
- `insight`: string
- `killChain`: number **required**
- `mitreAttack`: string[] **required**
  [array]
- `mitreCapec`: string[] **required**
  [array]
- `numReferenced`: number **required**
- `numReferences`: number **required**
- `rawId`: string **required**
- `referenced`: string[] **required**
  [array]
- `referencedIds`: number[] **required**
  [array]
- `references`: string[] **required**
  [array]
- `referencesIds`: number[] **required**
  [array]
- `releasabilityId`: string
- `tags`: string[] **required**
  [array]
- `targetCountry`: string **required**
- `targetCountryAlpha3`: string **required**
- `targetIndustry`: string **required**
- `tlp`: string **required**
- `uuid`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/{dataset_id}/delete

Delete events (legacy)

operationId: `delete_LegacyEventDelete` · query: `eventIds`

**Response** 200 → `result`

number

## GET /accounts/{account_id}/cloudforce-one/events/{event_id}

Get an event (legacy)

operationId: `get_EventReadDeprecated`

**Response** 200 → `result`

- `attacker`: string **required**
- `attackerCountry`: string **required**
- `attackerCountryAlpha3`: string **required**
- `category`: string **required**
- `datasetId`: string **required**
- `date`: string **required**
- `event`: string **required**
- `hasChildren`: boolean **required**
- `indicator`: string **required**
- `indicatorType`: string **required**
- `indicatorTypeId`: number **required**
- `insight`: string
- `killChain`: number **required**
- `mitreAttack`: string[] **required**
  [array]
- `mitreCapec`: string[] **required**
  [array]
- `numReferenced`: number **required**
- `numReferences`: number **required**
- `rawId`: string **required**
- `referenced`: string[] **required**
  [array]
- `referencedIds`: number[] **required**
  [array]
- `references`: string[] **required**
  [array]
- `referencesIds`: number[] **required**
  [array]
- `releasabilityId`: string
- `tags`: string[] **required**
  [array]
- `targetCountry`: string **required**
- `targetCountryAlpha3`: string **required**
- `targetIndustry`: string **required**
- `tlp`: string **required**
- `uuid`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/events/{event_id}

Update an event

operationId: `patch_EventUpdate`

**Request** (application/json)

- `attacker`: string
- `attackerCountry`: string
- `category`: string
- `createdAt`: string
- `datasetId`: string **required** — Dataset ID containing the event to update.
- `date`: string
- `event`: string
- `indicator`: string
- `indicatorType`: string
- `insight`: string
- `raw`: object
  - `data`: object
  - `source`: string
  - `tlp`: string
- `targetCountry`: string
- `targetIndustry`: string
- `tlp`: string

**Response** 200 → `result`

- `attacker`: string **required**
- `attackerCountry`: string **required**
- `attackerCountryAlpha3`: string **required**
- `category`: string **required**
- `datasetId`: string **required**
- `date`: string **required**
- `event`: string **required**
- `hasChildren`: boolean **required**
- `indicator`: string **required**
- `indicatorType`: string **required**
- `indicatorTypeId`: number **required**
- `insight`: string
- `killChain`: number **required**
- `mitreAttack`: string[] **required**
  [array]
- `mitreCapec`: string[] **required**
  [array]
- `numReferenced`: number **required**
- `numReferences`: number **required**
- `rawId`: string **required**
- `referenced`: string[] **required**
  [array]
- `referencedIds`: number[] **required**
  [array]
- `references`: string[] **required**
  [array]
- `referencesIds`: number[] **required**
  [array]
- `releasabilityId`: string
- `tags`: string[] **required**
  [array]
- `targetCountry`: string **required**
- `targetCountryAlpha3`: string **required**
- `targetIndustry`: string **required**
- `tlp`: string **required**
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/{event_id}

Update an event

operationId: `post_EventUpdate`

**Request** (application/json)

- `attacker`: string
- `attackerCountry`: string
- `category`: string
- `createdAt`: string
- `datasetId`: string **required** — Dataset ID containing the event to update.
- `date`: string
- `event`: string
- `indicator`: string
- `indicatorType`: string
- `insight`: string
- `raw`: object
  - `data`: object
  - `source`: string
  - `tlp`: string
- `targetCountry`: string
- `targetIndustry`: string
- `tlp`: string

**Response** 200 → `result`

- `attacker`: string **required**
- `attackerCountry`: string **required**
- `attackerCountryAlpha3`: string **required**
- `category`: string **required**
- `datasetId`: string **required**
- `date`: string **required**
- `event`: string **required**
- `hasChildren`: boolean **required**
- `indicator`: string **required**
- `indicatorType`: string **required**
- `indicatorTypeId`: number **required**
- `insight`: string
- `killChain`: number **required**
- `mitreAttack`: string[] **required**
  [array]
- `mitreCapec`: string[] **required**
  [array]
- `numReferenced`: number **required**
- `numReferences`: number **required**
- `rawId`: string **required**
- `referenced`: string[] **required**
  [array]
- `referencedIds`: number[] **required**
  [array]
- `references`: string[] **required**
  [array]
- `referencesIds`: number[] **required**
  [array]
- `releasabilityId`: string
- `tags`: string[] **required**
  [array]
- `targetCountry`: string **required**
- `targetCountryAlpha3`: string **required**
- `targetIndustry`: string **required**
- `tlp`: string **required**
- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}

Get raw event data by raw ID (legacy)

operationId: `get_EventRawRead`

**Response** 200 → `result`

- `accountId`: number **required**
- `created`: string **required**
- `data`: object **required**
- `id`: string **required**
- `source`: string **required**
- `tlp`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}

Update raw event data by raw ID (legacy)

operationId: `patch_EventRawUpdate`

**Request** (application/json)

- `data`: object
- `source`: string
- `tlp`: string

**Response** 200 → `result`

- `data`: object **required**
- `id`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}

Update raw event data by raw ID (legacy)

operationId: `post_EventRawUpdate`

**Request** (application/json)

- `data`: object
- `source`: string
- `tlp`: string

**Response** 200 → `result`

- `data`: object **required**
- `id`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/{event_id}/relationships

List related events (legacy)

operationId: `get_LegacyEventRelationships` · query: `direction`, `maxDepth`, `relationshipTypes`, `indicatorTypeIds`, `datasetId`, `includeParent`, `page`, `pageSize`

**Response** 200 → `result`

[array of]
- `attacker`: string **required**
- `attackerCountry`: string **required**
- `attackerCountryAlpha3`: string **required**
- `category`: string **required**
- `datasetId`: string **required**
- `date`: string **required**
- `event`: string **required**
- `hasChildren`: boolean **required**
- `indicator`: string **required**
- `indicatorType`: string **required**
- `indicatorTypeId`: number **required**
- `insight`: string
- `killChain`: number **required**
- `mitreAttack`: string[] **required**
  [array]
- `mitreCapec`: string[] **required**
  [array]
- `numReferenced`: number **required**
- `numReferences`: number **required**
- `rawId`: string **required**
- `referenced`: string[] **required**
  [array]
- `referencedIds`: number[] **required**
  [array]
- `references`: string[] **required**
  [array]
- `referencesIds`: number[] **required**
  [array]
- `releasabilityId`: string
- `tags`: string[] **required**
  [array]
- `targetCountry`: string **required**
- `targetCountryAlpha3`: string **required**
- `targetIndustry`: string **required**
- `tlp`: string **required**
- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/aggregate

Aggregate events

operationId: `get_EventAggregate` · query: `aggregateBy`, `datasetId`, `startDate`, `endDate`, `groupByDate`, `limit`

**Response** 200 → `result`

- `aggregateBy`: string **required** — Column(s) that were aggregated by
- `aggregations`: object[] **required** — Array of aggregation results with dynamic fields based on aggregateBy columns
  [array of]
  - `count`: number **required** — Number of events for this aggregation
  - `date`: string — Date (if groupByDate is true)
- `dateRange`: object — Date range used for filtering
  - `endDate`: string
  - `startDate`: string
- `total`: number **required** — Total number of events in the aggregation

## GET /accounts/{account_id}/cloudforce-one/events/by-id/{event_id}/relationships

List related events

operationId: `get_EventRelationships` · query: `direction`, `maxDepth`, `relationshipTypes`, `indicatorTypeIds`, `datasetId`, `includeParent`, `page`, `pageSize`

**Response** 200 → `result`

[array of]
- `attacker`: string **required**
- `attackerCountry`: string **required**
- `attackerCountryAlpha3`: string **required**
- `category`: string **required**
- `datasetId`: string **required**
- `date`: string **required**
- `event`: string **required**
- `hasChildren`: boolean **required**
- `indicator`: string **required**
- `indicatorType`: string **required**
- `indicatorTypeId`: number **required**
- `insight`: string
- `killChain`: number **required**
- `mitreAttack`: string[] **required**
  [array]
- `mitreCapec`: string[] **required**
  [array]
- `numReferenced`: number **required**
- `numReferences`: number **required**
- `rawId`: string **required**
- `referenced`: string[] **required**
  [array]
- `referencedIds`: number[] **required**
  [array]
- `references`: string[] **required**
  [array]
- `referencesIds`: number[] **required**
  [array]
- `releasabilityId`: string
- `tags`: string[] **required**
  [array]
- `targetCountry`: string **required**
- `targetCountryAlpha3`: string **required**
- `targetIndustry`: string **required**
- `tlp`: string **required**
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/create

Create an event

operationId: `post_EventCreate`

**Request** (application/json)

- `accountId`: number
- `attacker`: string
- `attackerCountry`: string
- `category`: string **required**
- `datasetId`: string
- `date`: string **required**
- `event`: string **required**
- `indicator`: string
- `indicatorType`: string
- `indicators`: object[] — Array of indicators for this event. Supports multiple indicators per event for complex scenarios.
  [array of]
  - `indicatorType`: string **required** — The type of indicator (e.g., DOMAIN, IP, JA3, HASH)
  - `value`: string **required** — The indicator value (e.g., domain name, IP address, hash)
- `insight`: string
- `raw`: object **required**
  - `data`: object **required**
  - `source`: string
  - `tlp`: string
- `source`: object — Controlled provenance for an event and its indicators derived from a Threat Signals article.
  - `resourceId`: string **required**
  - `resourceType`: string **required** enum: `article`
  - `system`: string **required** enum: `threat-signals`
  - `title`: string — Threat Signals article title; null for historical provenance without a stored title.
- `tags`: string[]
  [array]
- `targetCountry`: string
- `targetIndustry`: string
- `tlp`: string **required**

**Response** 200 → `result`

- `attacker`: string **required**
- `attackerCountry`: string **required**
- `attackerCountryAlpha3`: string **required**
- `category`: string **required**
- `datasetId`: string **required**
- `date`: string **required**
- `event`: string **required**
- `hasChildren`: boolean **required**
- `indicator`: string **required**
- `indicatorType`: string **required**
- `indicatorTypeId`: number **required**
- `insight`: string
- `killChain`: number **required**
- `mitreAttack`: string[] **required**
  [array]
- `mitreCapec`: string[] **required**
  [array]
- `numReferenced`: number **required**
- `numReferences`: number **required**
- `rawId`: string **required**
- `referenced`: string[] **required**
  [array]
- `referencedIds`: number[] **required**
  [array]
- `references`: string[] **required**
  [array]
- `referencesIds`: number[] **required**
  [array]
- `releasabilityId`: string
- `tags`: string[] **required**
  [array]
- `targetCountry`: string **required**
- `targetCountryAlpha3`: string **required**
- `targetIndustry`: string **required**
- `tlp`: string **required**
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/create/bulk

Create events in bulk

operationId: `post_EventCreateBulk`

**Request** (application/json)

- `data`: object[] **required**
  [array of]
  - `accountId`: number
  - `attacker`: string
  - `attackerCountry`: string
  - `category`: string **required**
  - `datasetId`: string
  - `date`: string **required**
  - `event`: string **required**
  - `indicator`: string
  - `indicatorType`: string
  - `indicators`: object[] — Array of indicators for this event. Supports multiple indicators per event for complex scenarios.
    [array of]
    - `indicatorType`: string **required** — The type of indicator (e.g., DOMAIN, IP, JA3, HASH)
    - `value`: string **required** — The indicator value (e.g., domain name, IP address, hash)
  - `insight`: string
  - `raw`: object **required**
    - `data`: object **required**
    - `source`: string
    - `tlp`: string
  - `tags`: string[]
    [array]
  - `targetCountry`: string
  - `targetIndustry`: string
  - `tlp`: string **required**
- `datasetId`: string **required**
- `includeCreatedEvents`: boolean — When true, response includes array of created event UUIDs and shard IDs. Useful for tracking which events were created and where.

**Response** 202 → `result`

- `createBulkEventsRequestId`: string — Correlation ID for async indicator processing
- `createdEvents`: object[] — Array of created events with UUIDs and shard locations. Only present when includeCreatedEvents=true
  [array of]
  - `eventIndex`: number **required** — Original index in the input data array
  - `shardId`: string **required** — Dataset ID of the shard where the event was created
  - `uuid`: string **required** — UUID of the created event
- `createdEventsCount`: number **required** — Number of events created
- `createdTagsCount`: number **required** — Number of new tags created in SoT
- `errorCount`: number **required** — Number of errors encountered
- `errors`: object[] — Array of error details
  [array of]
  - `error`: string **required** — Error message
  - `eventIndex`: number **required** — Index of the event that caused the error
- `queuedIndicatorsCount`: number **required** — Number of indicators queued for async processing

## POST /accounts/{account_id}/cloudforce-one/events/create/bulk/relationships

Create events with relationships in bulk (legacy)

operationId: `post_DOSEventCreateBulkWithRelationships`

**Request** (application/json)

- `data`: object[] **required**
  [array of]
  - `accountId`: number
  - `attacker`: string
  - `attackerCountry`: string
  - `category`: string **required**
  - `datasetId`: string
  - `date`: string **required**
  - `event`: string **required**
  - `indicator`: string
  - `indicatorType`: string
  - `indicators`: object[] — Array of indicators for this event. Supports multiple indicators per event for complex scenarios.
    [array of]
    - `indicatorType`: string **required** — The type of indicator (e.g., DOMAIN, IP, JA3, HASH)
    - `value`: string **required** — The indicator value (e.g., domain name, IP address, hash)
  - `insight`: string
  - `raw`: object **required**
    - `data`: object **required**
    - `source`: string
    - `tlp`: string
  - `tags`: string[]
    [array]
  - `targetCountry`: string
  - `targetIndustry`: string
  - `tlp`: string **required**
- `datasetId`: string **required**

**Response** 200 → `result`

- `createdEventsCount`: number **required** — Number of events created
- `createdIndicatorsCount`: number **required** — Number of indicators created
- `createdRelationshipsCount`: number **required** — Number of relationships created
- `errorCount`: number **required** — Number of errors encountered
- `errors`: object[] — Array of error details
  [array of]
  - `error`: string **required** — Error message
  - `eventIndex`: number **required** — Index of the event that caused the error

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/copy

Copy events to another dataset

operationId: `post_EventCopyToNewDS` · query: `keepRawData`

**Request** (application/json)

- `destDatasetId`: string **required**
- `eventIds`: string[] **required**
  [array]

**Response** 200 → `result`

- `copied`: number **required** — Number of events successfully copied
- `indicatorsCopied`: number **required** — Number of indicators successfully copied
- `insertFailures`: object[] — Array of events that failed to insert into destination
  [array of]
  - `index`: number **required** — Index of the event that failed to insert
  - `reason`: string **required** — Reason for the failure
- `relationshipsCopied`: number **required** — Number of relationships successfully copied

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/events/{event_id}

Get an event

operationId: `get_EventRead`

**Response** 200 → `result`

- `attacker`: string **required**
- `attackerCountry`: string **required**
- `attackerCountryAlpha3`: string **required**
- `category`: string **required**
- `datasetId`: string **required**
- `date`: string **required**
- `event`: string **required**
- `hasChildren`: boolean **required**
- `indicator`: string **required**
- `indicatorType`: string **required**
- `indicatorTypeId`: number **required**
- `insight`: string
- `killChain`: number **required**
- `mitreAttack`: string[] **required**
  [array]
- `mitreCapec`: string[] **required**
  [array]
- `numReferenced`: number **required**
- `numReferences`: number **required**
- `rawId`: string **required**
- `referenced`: string[] **required**
  [array]
- `referencedIds`: number[] **required**
  [array]
- `references`: string[] **required**
  [array]
- `referencesIds`: number[] **required**
  [array]
- `releasabilityId`: string
- `tags`: string[] **required**
  [array]
- `targetCountry`: string **required**
- `targetCountryAlpha3`: string **required**
- `targetIndustry`: string **required**
- `tlp`: string **required**
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/move

Move events to another dataset

operationId: `post_EventMoveToNewDS` · query: `keepRawData`

**Request** (application/json)

- `destDatasetId`: string **required**
- `eventIds`: string[] **required**
  [array]

**Response** 200 → `result`

- `deletionFailures`: object[] — Array of source datasets where deletion failed
  [array of]
  - `datasetId`: string **required** — Dataset ID where deletion failed
  - `reason`: string **required** — Reason for the deletion failure
- `indicatorsCopied`: number **required** — Number of indicators successfully copied
- `insertFailures`: object[] — Array of events that failed to insert into destination
  [array of]
  - `index`: number **required** — Index of the event that failed to insert
  - `reason`: string **required** — Reason for the failure
- `moved`: number **required** — Number of events successfully moved
- `relationshipsCopied`: number **required** — Number of relationships successfully copied

## DELETE /accounts/{account_id}/cloudforce-one/events/datasets/{dataset_id}/events

Delete events

operationId: `delete_EventDelete` · query: `eventIds`

**Response** 200 → `result`

number

## GET /accounts/{account_id}/cloudforce-one/events/datasets/{dataset_id}/events/{event_id}/raw

Get raw data for an event

operationId: `get_EventRawReadDS`

**Response** 200 → `result`

- `accountId`: number **required**
- `created`: string **required**
- `data`: string **required**
- `id`: number **required**
- `source`: string **required**
- `tlp`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/event_tag/{event_id}

Remove tags from an event (legacy)

operationId: `delete_EventTagDelete`

**Request** (application/json)

- `tags`: string[] **required**
  [array]

**Response** 200 → `result`

- `success`: boolean **required**

## POST /accounts/{account_id}/cloudforce-one/events/event_tag/{event_id}/create

Add tags to an event (legacy)

operationId: `post_EventTagCreate`

**Request** (application/json)

- `tags`: string[] **required**
  [array]

**Response** 200 → `result`

- `success`: boolean **required**

## POST /accounts/{account_id}/cloudforce-one/events/graphql

Run a GraphQL aggregation over events

operationId: `post_EventGraphQL`

**Response** 200 → `result`

- `data`: object
- `errors`: object[]
  [array]

## GET /accounts/{account_id}/cloudforce-one/events/queries

List saved event queries

operationId: `get_EventQueryList`

**Response** 200 → `result`

[array of]
- `account_id`: integer **required** — Account ID
- `alert_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `alert_rollup_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `created_at`: string **required** — Creation timestamp
- `custom_threat_feed_id`: integer — Deprecated: saved-query alerting and rules were removed. Always null.
- `id`: integer **required** — Unique identifier for the saved query
- `name`: string **required** — Name of the saved query
- `query_json`: string **required** — JSON string containing the query parameters
- `rule_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `rule_list_id`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `rule_scope`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `updated_at`: string **required** — Last update timestamp
- `user_email`: string **required** — Email of the user who created the query

## DELETE /accounts/{account_id}/cloudforce-one/events/queries/{query_id}

Delete a saved event query

operationId: `delete_EventQueryDelete`

## GET /accounts/{account_id}/cloudforce-one/events/queries/{query_id}

Get a saved event query

operationId: `get_EventQueryRead`

**Response** 200 → `result`

- `account_id`: integer **required** — Account ID
- `alert_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `alert_rollup_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `created_at`: string **required** — Creation timestamp
- `custom_threat_feed_id`: integer — Deprecated: saved-query alerting and rules were removed. Always null.
- `id`: integer **required** — Unique identifier for the saved query
- `name`: string **required** — Name of the saved query
- `query_json`: string **required** — JSON string containing the query parameters
- `rule_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `rule_list_id`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `rule_scope`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `updated_at`: string **required** — Last update timestamp
- `user_email`: string **required** — Email of the user who created the query

## PATCH /accounts/{account_id}/cloudforce-one/events/queries/{query_id}

Update a saved event query

operationId: `patch_EventQueryUpdate`

**Request** (application/json)

- `alert_enabled`: boolean — Deprecated and ignored: saved-query alerting and rules were removed.
- `alert_rollup_enabled`: boolean — Deprecated and ignored: saved-query alerting and rules were removed.
- `name`: string — Unique name for the saved query
- `query_json`: string — JSON string containing the query parameters
- `rule_enabled`: boolean — Deprecated and ignored: saved-query alerting and rules were removed.
- `rule_scope`: string — Deprecated and ignored: saved-query alerting and rules were removed.

**Response** 200 → `result`

- `account_id`: integer **required** — Account ID
- `alert_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `alert_rollup_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `created_at`: string **required** — Creation timestamp
- `custom_threat_feed_id`: integer — Deprecated: saved-query alerting and rules were removed. Always null.
- `id`: integer **required** — Unique identifier for the saved query
- `name`: string **required** — Name of the saved query
- `query_json`: string **required** — JSON string containing the query parameters
- `rule_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `rule_list_id`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `rule_scope`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `updated_at`: string **required** — Last update timestamp
- `user_email`: string **required** — Email of the user who created the query

## POST /accounts/{account_id}/cloudforce-one/events/queries/{query_id}

Update a saved event query

operationId: `post_EventQueryUpdate`

**Request** (application/json)

- `alert_enabled`: boolean — Deprecated and ignored: saved-query alerting and rules were removed.
- `alert_rollup_enabled`: boolean — Deprecated and ignored: saved-query alerting and rules were removed.
- `name`: string — Unique name for the saved query
- `query_json`: string — JSON string containing the query parameters
- `rule_enabled`: boolean — Deprecated and ignored: saved-query alerting and rules were removed.
- `rule_scope`: string — Deprecated and ignored: saved-query alerting and rules were removed.

**Response** 200 → `result`

- `account_id`: integer **required** — Account ID
- `alert_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `alert_rollup_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `created_at`: string **required** — Creation timestamp
- `custom_threat_feed_id`: integer — Deprecated: saved-query alerting and rules were removed. Always null.
- `id`: integer **required** — Unique identifier for the saved query
- `name`: string **required** — Name of the saved query
- `query_json`: string **required** — JSON string containing the query parameters
- `rule_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `rule_list_id`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `rule_scope`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `updated_at`: string **required** — Last update timestamp
- `user_email`: string **required** — Email of the user who created the query

## POST /accounts/{account_id}/cloudforce-one/events/queries/create

Create a saved event query

operationId: `post_EventQueryCreate`

**Request** (application/json)

- `alert_enabled`: boolean default: `false` — Deprecated and ignored: saved-query alerting and rules were removed.
- `alert_rollup_enabled`: boolean default: `false` — Deprecated and ignored: saved-query alerting and rules were removed.
- `name`: string **required** — Unique name for the saved query
- `query_json`: string **required** — JSON string containing the query parameters
- `rule_enabled`: boolean default: `false` — Deprecated and ignored: saved-query alerting and rules were removed.
- `rule_scope`: string — Deprecated and ignored: saved-query alerting and rules were removed.

**Response** 200 → `result`

- `account_id`: integer **required** — Account ID
- `alert_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `alert_rollup_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `created_at`: string **required** — Creation timestamp
- `custom_threat_feed_id`: integer — Deprecated: saved-query alerting and rules were removed. Always null.
- `id`: integer **required** — Unique identifier for the saved query
- `name`: string **required** — Name of the saved query
- `query_json`: string **required** — JSON string containing the query parameters
- `rule_enabled`: boolean **required** — Deprecated: saved-query alerting and rules were removed. Always false.
- `rule_list_id`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `rule_scope`: string — Deprecated: saved-query alerting and rules were removed. Always null.
- `updated_at`: string **required** — Last update timestamp
- `user_email`: string **required** — Email of the user who created the query

## GET /accounts/{account_id}/cloudforce-one/events/raw/{dataset_id}/{event_id}

Get raw data for an event (legacy)

operationId: `get_LegacyEventRawReadDS`

**Response** 200 → `result`

- `accountId`: number **required**
- `created`: string **required**
- `data`: string **required**
- `id`: number **required**
- `source`: string **required**
- `tlp`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/relate/{event_id}

Remove event references (legacy)

operationId: `delete_EventReferenceDelete`

**Request** (application/json)

- `events`: string[] **required**
  [array]

**Response** 200 → `result`

- `success`: boolean **required**

## POST /accounts/{account_id}/cloudforce-one/events/relate/{event_id}/create

Add event references (legacy)

operationId: `post_EventReferenceCreate`

**Request** (application/json)

- `events`: string[] **required**
  [array]

**Response** 200 → `result`

- `success`: boolean **required**

## POST /accounts/{account_id}/cloudforce-one/events/relationships/create

Create event relationships

operationId: `post_CreateEventRelationship`

**Request** (application/json)

- `childIds`: string[] **required** — Array of UUIDs for child events. Single child = 1:1 relationship, multiple = 1:many relationships
  [array]
- `datasetId`: string **required** — Dataset identifier where the events are stored
- `parentId`: string **required** — UUID of the parent event that will be the source of the relationship
- `relationshipType`: string **required** enum: `related_to`, `caused_by`, `attributed_to` — Type of relationship to create between parent and child events

**Response** 200 → `result`

- `childIds`: string[] — Array of child event UUIDs that were processed
  [array]
- `errors`: object[] — Array of errors for relationships that failed to be created (only present if some relationships failed)
  [array of]
  - `childId`: string **required** — UUID of the child event that failed to create a relationship
  - `error`: string **required** — Error message describing why the relationship creation failed
  - `errorType`: string — Type/category of the error that occurred
- `message`: string **required** — Human-readable message describing the operation result
- `relationships`: object[] **required** — Array of successfully created relationship objects
  [array of]
  - `childDatasetId`: string **required** — Dataset ID where the child event resides
  - `childId`: string **required** — UUID of the child event in the relationship
  - `parentDatasetId`: string **required** — Dataset ID where the parent event resides
  - `parentId`: string **required** — UUID of the parent event in the relationship
  - `relationshipType`: string **required** enum: `related_to`, `caused_by`, `attributed_to` — Type of relationship between the events
- `relationshipsCreated`: number — Number of relationships that were successfully created
- `success`: boolean **required** — Whether the relationship creation operation completed successfully

## PATCH /accounts/{account_id}/cloudforce-one/events/update/bulk

Update events in bulk

operationId: `patch_EventUpdateBulk`

**Request** (application/json)

- `datasetId`: string **required** — Dataset ID containing the events to update. Required to prevent cross-account modifications.
- `eventIds`: string[] **required** — List of event UUIDs to update (1-100)
  [array]
- `updates`: object **required** — Fields to update on all specified events. All fields including 'insight' are supported, except 'date' which requires shard migration.
  - `attacker`: string
  - `attackerCountry`: string
  - `category`: string
  - `createdAt`: string
  - `event`: string
  - `indicator`: string
  - `indicatorType`: string
  - `insight`: string
  - `raw`: object
    - `data`: object
    - `source`: string
    - `tlp`: string
  - `targetCountry`: string
  - `targetIndustry`: string
  - `tlp`: string

**Response** 200 → `result`

- `failedCount`: number **required**
- `failures`: object[] — List of events that failed to update with error messages
  [array of]
  - `error`: string **required**
  - `eventId`: string **required**
- `updatedCount`: number **required**

## POST /accounts/{account_id}/cloudforce-one/v2/events/graphql

Run a GraphQL aggregation over events (legacy)

operationId: `post_EventGraphQLV2`

**Response** 200 → `result`

- `data`: object
- `errors`: object[]
  [array]
