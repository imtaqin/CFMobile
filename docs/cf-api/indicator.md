# Indicator

14 endpoints.

## DELETE /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators

Delete indicators in bulk

operationId: `delete_IndicatorDeleteBulk` · query: `indicatorIds`

**Response** 200 → `result`

- `deletedCount`: integer **required** — Number of indicators deleted.
- `missingUUIDs`: string[] — Requested UUIDs that were not found in the dataset. Omitted when every UUID was deleted.
  [array]

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators

List indicators in a dataset (legacy)

operationId: `get_IndicatorListLegacy` · query: `page`, `pageSize`, `name`, `indicatorType`, `relatedEvent`

**Response** 200 → `result`

- `indicators`: object[] **required**
  [array of]
  - `createdAt`: string **required**
  - `datasetId`: string — The dataset ID this indicator belongs to. Included in list responses.
  - `indicatorType`: string **required**
  - `relatedEvents`: object[] — Related events, capped by `relatedEventsLimit` (default 2). Check `relatedEventsHasMore` to detect a capped list; pass `relatedEventsLimit=-
    [array of]
    - `datasetId`: string **required**
    - `eventDate`: string — ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.
    - `eventId`: string **required**
  - `relatedEventsHasMore`: boolean — True when this indicator appears in more events than `relatedEvents` contains because `relatedEventsLimit` capped the list. Pass `relatedEve
  - `sources`: object[] **required** — RSS article sources from which this indicator was extracted.
    [array of]
    - `resourceId`: string **required**
    - `resourceType`: string **required** enum: `article`
    - `system`: string **required** enum: `threat-signals`
    - `title`: string **required** — Threat Signals article title; null for historical provenance without a stored title.
  - `tags`: object[]
    [array of]
    - `categoryId`: string — The UUID of the tag category, or null when the tag is uncategorized.
    - `categoryName`: string
    - `uuid`: string
    - `value`: string
  - `tlp`: string — Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.
  - `updatedAt`: string **required**
  - `uuid`: string **required**
  - `value`: string **required**
- `pagination`: object **required**
  - `page`: number **required**
  - `pageSize`: number **required**
  - `totalCount`: number **required**
  - `totalPages`: number **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}

Delete an indicator

operationId: `delete_IndicatorDelete`

**Response** 200 → `result`

- `message`: string
- `success`: boolean

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}

Get an indicator

operationId: `get_IndicatorRead`

**Response** 200 → `result`

- `createdAt`: string **required**
- `datasetId`: string — The dataset ID this indicator belongs to. Included in list responses.
- `indicatorType`: string **required**
- `relatedEvents`: object[] — Related events, capped by `relatedEventsLimit` (default 2). Check `relatedEventsHasMore` to detect a capped list; pass `relatedEventsLimit=-
  [array of]
  - `datasetId`: string **required**
  - `eventDate`: string — ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.
  - `eventId`: string **required**
- `relatedEventsHasMore`: boolean — True when this indicator appears in more events than `relatedEvents` contains because `relatedEventsLimit` capped the list. Pass `relatedEve
- `tags`: object[]
  [array of]
  - `categoryId`: string — The UUID of the tag category, or null when the tag is uncategorized.
  - `categoryName`: string
  - `uuid`: string
  - `value`: string
- `tlp`: string — Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.
- `updatedAt`: string **required**
- `uuid`: string **required**
- `value`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}

Update an indicator

operationId: `patch_IndicatorUpdate`

**Request** (application/json)

- `indicatorType`: string
- `relatedEvents`: object[]
  [array of]
  - `datasetId`: string **required**
  - `eventId`: string **required**
- `tags`: object[]
  [array]
- `tlp`: string — Traffic Light Protocol designation. Case-insensitive on input, stored and returned as UPPERCASE. Allowed values: clear, green, amber, amber-
- `value`: string

**Response** 200 → `result`

- `createdAt`: string **required**
- `datasetId`: string — The dataset ID this indicator belongs to. Included in list responses.
- `indicatorType`: string **required**
- `relatedEvents`: object[] — Related events, capped by `relatedEventsLimit` (default 2). Check `relatedEventsHasMore` to detect a capped list; pass `relatedEventsLimit=-
  [array of]
  - `datasetId`: string **required**
  - `eventDate`: string — ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.
  - `eventId`: string **required**
- `relatedEventsHasMore`: boolean — True when this indicator appears in more events than `relatedEvents` contains because `relatedEventsLimit` capped the list. Pass `relatedEve
- `tags`: object[]
  [array of]
  - `categoryId`: string — The UUID of the tag category, or null when the tag is uncategorized.
  - `categoryName`: string
  - `uuid`: string
  - `value`: string
- `tlp`: string — Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.
- `updatedAt`: string **required**
- `uuid`: string **required**
- `value`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}/relationships

List indicator relationships

operationId: `get_IndicatorRelationshipsList` · query: `search`, `expand`, `cursor`, `pageSize`

**Response** 200 → `result`

- `counts`: object
- `cursor`: string
- `entities`: object[]
  [array]
- `hasMore`: boolean
- `hydrationErrors`: object
- `relationships`: object[]
  [array of]
  - `confidence`: integer **required** — Confidence score 0–100, or null.
  - `createdAt`: string **required** — ISO 8601 creation timestamp.
  - `datasetId`: string **required** — Dataset the relationship belongs to.
  - `entityId`: string **required** — UUID of the related entity (other end).
  - `entityType`: string **required** enum: `event`, `indicator`, `tag` — Type of the related entity.
  - `metadata`: object **required** — Arbitrary JSON metadata, or null.
  - `relationshipUuid`: string **required** — Relationship UUID (use for PATCH/DELETE).
  - `type`: string **required** — Relationship type.
  - `updatedAt`: string **required** — ISO 8601 last-update timestamp.

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}/relationships

Create an indicator relationship

operationId: `post_IndicatorRelationshipCreate`

**Request** (application/json)

- `confidence`: integer — Confidence score 0–100.
- `metadata`: object — Arbitrary JSON metadata.
- `targetId`: string **required** — UUID of the target entity.
- `targetType`: string **required** enum: `event`, `tag` — Target type. "indicator" is not allowed (indicator↔indicator relationships are not supported).
- `type`: string **required** — Relationship type.

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}/relationships/{rel_uuid}

Delete an indicator relationship

operationId: `delete_IndicatorRelationshipDelete`

**Response** 200 → `result`

- `deleted`: boolean

## PATCH /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/{indicator_id}/relationships/{rel_uuid}

Update an indicator relationship

operationId: `patch_IndicatorRelationshipUpdate`

**Request** (application/json)

- `confidence`: integer — Updated confidence. null clears it.
- `metadata`: object — Updated metadata. null clears it.
- `type`: string — Updated relationship type.

**Response** 200 → `result`

object

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/bulk

Create indicators in bulk

operationId: `post_IndicatorCreateBulk`

**Request** (application/json)

- `autoCreateType`: boolean — Global flag to automatically create indicator types if they don't exist. Individual indicators can override this with their own autoCreateTy
- `indicators`: object[] **required**
  [array of]
  - `autoCreateType`: boolean — If true, automatically create the indicator type if it doesn't exist. If false (default), throw an error when the indicator type doesn't exi
  - `indicatorType`: string **required**
  - `relatedEvents`: object[]
    [array of]
    - `datasetId`: string **required**
    - `eventId`: string **required**
  - `tags`: object[]
    [array]
  - `tlp`: string — Traffic Light Protocol designation. Case-insensitive on input, stored and returned as UPPERCASE. Allowed values: clear, green, amber, amber-
  - `value`: string **required**

**Response** 200 → `result`

number

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/create

Create an indicator

operationId: `post_IndicatorCreate`

**Request** (application/json)

- `autoCreateType`: boolean — If true, automatically create the indicator type if it doesn't exist. If false (default), throw an error when the indicator type doesn't exi
- `indicatorType`: string **required**
- `relatedEvents`: object[]
  [array of]
  - `datasetId`: string **required**
  - `eventId`: string **required**
- `tags`: object[]
  [array]
- `tlp`: string — Traffic Light Protocol designation. Case-insensitive on input, stored and returned as UPPERCASE. Allowed values: clear, green, amber, amber-
- `value`: string **required**

**Response** 200 → `result`

- `createdAt`: string **required**
- `datasetId`: string — The dataset ID this indicator belongs to. Included in list responses.
- `indicatorType`: string **required**
- `relatedEvents`: object[] — Related events, capped by `relatedEventsLimit` (default 2). Check `relatedEventsHasMore` to detect a capped list; pass `relatedEventsLimit=-
  [array of]
  - `datasetId`: string **required**
  - `eventDate`: string — ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.
  - `eventId`: string **required**
- `relatedEventsHasMore`: boolean — True when this indicator appears in more events than `relatedEvents` contains because `relatedEventsLimit` capped the list. Pass `relatedEve
- `tags`: object[]
  [array of]
  - `categoryId`: string — The UUID of the tag category, or null when the tag is uncategorized.
  - `categoryName`: string
  - `uuid`: string
  - `value`: string
- `tlp`: string — Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.
- `updatedAt`: string **required**
- `uuid`: string **required**
- `value`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicators/tags

List tags on a dataset's indicators

operationId: `get_IndicatorTagsList`

**Response** 200 → `result`

[array of]
object

## GET /accounts/{account_id}/cloudforce-one/events/indicators

List indicators

operationId: `get_IndicatorList` · query: `datasetIds`, `page`, `pageSize`, `search`, `name`, `indicatorType`, `relatedEvents`, `tags`, `tagSearch`, `createdAfter`, `createdBefore`, `relatedEventsLimit`, `includeTags`, `includeTotalCount`, `format`, `cache`, `cursor`

**Response** 200 → `result`

- `properties`: object **required**
  - `completeness`: object **required**
    - `properties`: object **required**
    - `type`: string **required**
  - `indicators`: object **required**
    - `items`: object **required**
    - `type`: string **required**
  - `pagination`: object **required**
    - `properties`: object **required**
    - `type`: string **required**
- `type`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/indicators/aggregate

Aggregate indicators by column(s)

operationId: `get_IndicatorAggregate` · query: `aggregateBy`, `measure`, `tagUuid`, `datasetIds`, `createdAfter`, `createdBefore`, `eventDateAfter`, `eventDateBefore`, `limit`

**Response** 200 → `result`

- `aggregateBy`: string **required** — Column(s) that were aggregated by
- `aggregations`: object[] **required** — Array of aggregation results with dynamic fields based on aggregateBy columns
  [array of]
  - `count`: number **required** — Number of indicators for this aggregation
- `failedDatasets`: number **required** — Number of datasets whose aggregation failed and were excluded from the result
- `total`: number **required** — Total count in the aggregation: indicator rows when measure=indicators, or linked-event rows when measure=relationships
