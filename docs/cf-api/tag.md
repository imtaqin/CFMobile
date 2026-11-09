# Tag

12 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/tags/{tag_uuid}/indicators

List indicators related to a tag within a dataset (deprecated)

operationId: `get_DatasetTagIndicatorsList` · query: `page`, `pageSize`, `indicatorType`, `relatedEvent`, `search`

**Response** 200 → `result`

- `failedShardCount`: number — Number of shards that failed or timed out. Present only with partialResults.
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
- `partialResults`: boolean — Present and true when one or more shards failed or timed out. Indicators from those shards may be missing from this page and from totalCount

## GET /accounts/{account_id}/cloudforce-one/events/tags

List tags

operationId: `get_TagList` · query: `page`, `pageSize`, `search`, `categoryUuid`, `filters`, `cache`

**Response** 200 → `result`

- `pagination`: object **required**
  - `page`: number **required**
  - `pageSize`: number **required**
  - `totalCount`: number **required**
  - `totalPages`: number **required**
- `tags`: object[] **required**
  [array of]
  - `activeDuration`: string
  - `activeDuration_annotated`: object
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `actorCategory`: string
  - `actorCategory_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `aliasGroupNames`: string[]
    [array]
  - `aliasGroupNamesInternal`: string[]
    [array]
  - `aliases`: object[] — Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purpl
    [array of]
    - `confidence`: integer
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `attributionOrganization`: string
  - `attributionOrganization_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `categoryName`: string
  - `categoryUuid`: string
  - `confidence`: integer — Overall tag confidence (1-10).
  - `createdAt`: string
  - `dateOfDiscovery`: string
  - `description`: string
  - `externalReferenceLinks`: string[]
    [array]
  - `externalReferences`: object[] — Structured external references ({ url, description }). Public: returned to all accounts.
    [array of]
    - `description`: string
    - `url`: string **required**
  - `externalReferences_annotated`: object[]
    [array of]
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `internalAliases`: object[] — Owner-private structured aliases ({ value, confidence 1-10, tlp }). Returned to the owning account and omitted from shared-catalog non-owner
    [array of]
    - `confidence`: integer
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `internalDescription`: string
  - `lastSeen`: string
  - `motive`: string
  - `motive_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `opsecLevel`: string
  - `opsecLevel_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `originCountryISO`: string — ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.
  - `originCountryISO_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `priority`: number
  - `priority_annotated`: object
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: number **required**
  - `properties`: object — Parsed custom field values. Null when the tag has no custom fields.
  - `sophisticationLevel`: string
  - `sophisticationLevel_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict` — Tag-level TLP handling marking.
  - `updatedAt`: string
  - `uuid`: string **required**
  - `value`: string **required**
  - `version`: number

## DELETE /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}

Delete a tag

operationId: `delete_TagDelete`

**Response** 200 → `result`

- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}

Get a tag

operationId: `get_TagDetail`

**Response** 200 → `result`

- `activeDuration`: string
- `activeDuration_annotated`: object
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `actorCategory`: string
- `actorCategory_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `aliasGroupNames`: string[]
  [array]
- `aliasGroupNamesInternal`: string[]
  [array]
- `aliases`: object[] — Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purpl
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `attributionOrganization`: string
- `attributionOrganization_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `categoryName`: string
- `categoryUuid`: string
- `confidence`: integer — Overall tag confidence (1-10).
- `createdAt`: string
- `dateOfDiscovery`: string
- `description`: string
- `externalReferenceLinks`: string[]
  [array]
- `externalReferences`: object[] — Structured external references ({ url, description }). Public: returned to all accounts.
  [array of]
  - `description`: string
  - `url`: string **required**
- `externalReferences_annotated`: object[]
  [array of]
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `internalAliases`: object[] — Owner-private structured aliases ({ value, confidence 1-10, tlp }). Returned to the owning account and omitted from shared-catalog non-owner
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `internalDescription`: string
- `lastSeen`: string
- `motive`: string
- `motive_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `opsecLevel`: string
- `opsecLevel_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `originCountryISO`: string — ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.
- `originCountryISO_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `priority`: number
- `priority_annotated`: object
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: number **required**
- `properties`: object — Parsed custom field values. Null when the tag has no custom fields.
- `sophisticationLevel`: string
- `sophisticationLevel_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict` — Tag-level TLP handling marking.
- `updatedAt`: string
- `uuid`: string **required**
- `value`: string **required**
- `version`: number

## PATCH /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}

Update a tag

operationId: `patch_TagUpdate`

**Request** (application/json)

- `activeDuration`: any
- `actorCategory`: any
- `aliasGroupNames`: string[]
  [array]
- `aliasGroupNamesInternal`: string[]
  [array]
- `aliases`: object[] — Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purpl
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `attributionOrganization`: any
- `categoryUuid`: string — Tag type (category) UUID. When changed, existing `properties` are re-validated against the new category's schema (400 on mismatch). Set to n
- `confidence`: integer — Overall tag confidence (1-10). Omit to preserve existing.
- `dateOfDiscovery`: string — Date of discovery (ISO YYYY-MM-DD). Omit to preserve existing.
- `description`: string
- `externalReferenceLinks`: string[]
  [array]
- `externalReferences`: object[] — Structured external references ({ url, description }). Public: returned to all accounts.
  [array of]
  - `description`: string
  - `url`: string **required**
- `internalAliases`: object[] — Owner-private structured aliases ({ value, confidence 1-10, tlp }). Returned to the owning account and omitted from shared-catalog non-owner
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `internalDescription`: string
- `lastSeen`: string
- `motive`: any
- `opsecLevel`: any
- `originCountryISO`: any
- `priority`: any
- `properties`: object — Custom field values blob. When omitted, the existing value is preserved. When provided, performs a shallow per-key merge over the stored val
- `sophisticationLevel`: any
- `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict` — Tag-level TLP marking. Omit to preserve existing. Cannot be cleared to null.
- `value`: string

**Response** 200 → `result`

- `activeDuration`: string
- `activeDuration_annotated`: object
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `actorCategory`: string
- `actorCategory_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `aliasGroupNames`: string[]
  [array]
- `aliasGroupNamesInternal`: string[]
  [array]
- `aliases`: object[] — Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purpl
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `attributionOrganization`: string
- `attributionOrganization_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `categoryName`: string
- `categoryUuid`: string
- `confidence`: integer — Overall tag confidence (1-10).
- `createdAt`: string
- `dateOfDiscovery`: string
- `description`: string
- `externalReferenceLinks`: string[]
  [array]
- `externalReferences`: object[] — Structured external references ({ url, description }). Public: returned to all accounts.
  [array of]
  - `description`: string
  - `url`: string **required**
- `externalReferences_annotated`: object[]
  [array of]
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `internalAliases`: object[] — Owner-private structured aliases ({ value, confidence 1-10, tlp }). Returned to the owning account and omitted from shared-catalog non-owner
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `internalDescription`: string
- `lastSeen`: string
- `motive`: string
- `motive_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `opsecLevel`: string
- `opsecLevel_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `originCountryISO`: string — ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.
- `originCountryISO_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `priority`: number
- `priority_annotated`: object
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: number **required**
- `properties`: object — Parsed custom field values. Null when the tag has no custom fields.
- `sophisticationLevel`: string
- `sophisticationLevel_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict` — Tag-level TLP handling marking.
- `updatedAt`: string
- `uuid`: string **required**
- `value`: string **required**
- `version`: number

## GET /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}/indicators

List a tag's indicators

operationId: `get_TagIndicatorsList` · query: `datasetIds`, `page`, `pageSize`, `indicatorType`, `relatedEvent`, `search`

**Response** 200 → `result`

- `failedShardCount`: number — Number of shards that failed or timed out. Present only with partialResults.
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
- `partialResults`: boolean — Present and true when one or more shards failed or timed out. Indicators from those shards may be missing from this page and from totalCount

## GET /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}/relationships

List tag relationships

operationId: `get_TagRelationshipsList` · query: `datasets`, `search`, `expand`, `cursor`, `pageSize`

**Response** 200 → `result`

- `counts`: object
- `cursor`: string
- `entities`: object[]
  [array]
- `failedShardCount`: number
- `hasMore`: boolean
- `hydrationErrors`: object
- `partialResults`: boolean
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

## POST /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}/relationships

Create a tag relationship

operationId: `post_TagRelationshipCreate`

**Request** (application/json)

- `confidence`: integer — Confidence score 0–100.
- `datasetId`: string **required** — Dataset UUID where the relationship row will be stored (locates the Indicators DO).
- `metadata`: object — Arbitrary JSON metadata.
- `targetId`: string **required** — UUID of the target entity.
- `targetType`: string **required** enum: `event`, `indicator` — Target type. "tag" is not allowed (tag↔tag relationships are not supported).
- `type`: string **required** — Relationship type.

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}/relationships/{rel_uuid}

Delete a tag relationship

operationId: `delete_TagRelationshipDelete` · query: `datasetId`

**Response** 200 → `result`

- `deleted`: boolean

## PATCH /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}/relationships/{rel_uuid}

Update a tag relationship

operationId: `patch_TagRelationshipUpdate` · query: `datasetId`

**Request** (application/json)

- `confidence`: integer — Updated confidence. null clears it.
- `metadata`: object — Updated metadata. null clears it.
- `type`: string — Updated relationship type.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/cloudforce-one/events/tags/categories/actors

List threat actors

operationId: `get_TaggedActorList` · query: `page`, `pageSize`, `value`, `filters`

**Response** 200 → `result`

- `pagination`: object **required**
  - `page`: number **required**
  - `pageSize`: number **required**
  - `totalCount`: number **required**
  - `totalPages`: number **required**
- `tags`: object[] **required**
  [array of]
  - `activeDuration`: string
  - `activeDuration_annotated`: object
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `actorCategory`: string
  - `actorCategory_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `aliasGroupNames`: string[]
    [array]
  - `aliasGroupNamesInternal`: string[]
    [array]
  - `aliases`: object[] — Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purpl
    [array of]
    - `confidence`: integer
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `attributionOrganization`: string
  - `attributionOrganization_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `categoryName`: string
  - `categoryUuid`: string
  - `confidence`: integer — Overall tag confidence (1-10).
  - `createdAt`: string
  - `dateOfDiscovery`: string
  - `description`: string
  - `externalReferenceLinks`: string[]
    [array]
  - `externalReferences`: object[] — Structured external references ({ url, description }). Public: returned to all accounts.
    [array of]
    - `description`: string
    - `url`: string **required**
  - `externalReferences_annotated`: object[]
    [array of]
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `internalAliases`: object[] — Owner-private structured aliases ({ value, confidence 1-10, tlp }). Returned to the owning account and omitted from shared-catalog non-owner
    [array of]
    - `confidence`: integer
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `internalDescription`: string
  - `lastSeen`: string
  - `motive`: string
  - `motive_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `opsecLevel`: string
  - `opsecLevel_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `originCountryISO`: string — ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.
  - `originCountryISO_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `priority`: number
  - `priority_annotated`: object
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: number **required**
  - `properties`: object — Parsed custom field values. Null when the tag has no custom fields.
  - `sophisticationLevel`: string
  - `sophisticationLevel_annotated`: object
    - `confidence`: number
    - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
    - `value`: string **required**
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict` — Tag-level TLP handling marking.
  - `updatedAt`: string
  - `uuid`: string **required**
  - `value`: string **required**
  - `version`: number

## POST /accounts/{account_id}/cloudforce-one/events/tags/create

Create a tag

operationId: `post_TagCreate`

**Request** (application/json)

- `activeDuration`: any
- `actorCategory`: any
- `aliasGroupNames`: string[]
  [array]
- `aliasGroupNamesInternal`: string[]
  [array]
- `aliases`: object[] — Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purpl
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `attributionOrganization`: any
- `categoryUuid`: string — Tag type (category) UUID. Optional — when present, `properties` is validated against this category's schema. When absent, the tag is typeles
- `confidence`: integer — Overall tag confidence (1-10). Optional.
- `dateOfDiscovery`: string — Date of discovery (ISO YYYY-MM-DD). Optional.
- `description`: string
- `externalReferenceLinks`: string[]
  [array]
- `externalReferences`: object[] — Structured external references ({ url, description }). Public: returned to all accounts.
  [array of]
  - `description`: string
  - `url`: string **required**
- `internalAliases`: object[] — Owner-private structured aliases ({ value, confidence 1-10, tlp }). Returned to the owning account and omitted from shared-catalog non-owner
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `internalDescription`: string
- `lastSeen`: string
- `motive`: any
- `opsecLevel`: any
- `originCountryISO`: any
- `priority`: any
- `properties`: object — Structured metadata blob. Optional. When `categoryUuid` is given, validated against this category's schema on write. When typeless, accepted
- `sophisticationLevel`: any
- `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict` — Tag-level TLP handling marking. Optional. Allowed values: red, amber, amber-strict, green, clear, purple, amber+strict.
- `value`: string **required**

**Response** 200 → `result`

- `activeDuration`: string
- `activeDuration_annotated`: object
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `actorCategory`: string
- `actorCategory_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `aliasGroupNames`: string[]
  [array]
- `aliasGroupNamesInternal`: string[]
  [array]
- `aliases`: object[] — Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purpl
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `attributionOrganization`: string
- `attributionOrganization_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `categoryName`: string
- `categoryUuid`: string
- `confidence`: integer — Overall tag confidence (1-10).
- `createdAt`: string
- `dateOfDiscovery`: string
- `description`: string
- `externalReferenceLinks`: string[]
  [array]
- `externalReferences`: object[] — Structured external references ({ url, description }). Public: returned to all accounts.
  [array of]
  - `description`: string
  - `url`: string **required**
- `externalReferences_annotated`: object[]
  [array of]
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `internalAliases`: object[] — Owner-private structured aliases ({ value, confidence 1-10, tlp }). Returned to the owning account and omitted from shared-catalog non-owner
  [array of]
  - `confidence`: integer
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `internalDescription`: string
- `lastSeen`: string
- `motive`: string
- `motive_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `opsecLevel`: string
- `opsecLevel_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `originCountryISO`: string — ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.
- `originCountryISO_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `priority`: number
- `priority_annotated`: object
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: number **required**
- `properties`: object — Parsed custom field values. Null when the tag has no custom fields.
- `sophisticationLevel`: string
- `sophisticationLevel_annotated`: object
  - `confidence`: number
  - `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict`
  - `value`: string **required**
- `tlp`: string enum: `red`, `amber`, `amber-strict`, `green`, `clear`, `purple`, `amber+strict` — Tag-level TLP handling marking.
- `updatedAt`: string
- `uuid`: string **required**
- `value`: string **required**
- `version`: number
