# Log Explorer Datasets

12 endpoints.

## GET /accounts/{account_id}/logs/explorer/datasets

List account datasets

operationId: `accounts-logs-explorer-datasets-list` · query: `include_zones`

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.

## POST /accounts/{account_id}/logs/explorer/datasets

Create an account dataset

operationId: `accounts-logs-explorer-datasets-create`

**Request** (application/json)

- `dataset`: string **required** — Dataset type name to create (e.g. `http_requests`).
- `fields`: object[] — Controls which fields the API ingests. Defaults to all available
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — Optional Logpush filter predicate to restrict which events are ingested.
- `filter_attack_traffic`: boolean — Whether to filter attack traffic from the Logpush job. Defaults to

**Response** 201 → `result`

- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.
- `fields`: object[] **required** — The field configuration for this dataset.
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — The Logpush filter predicate applied to this dataset. Omitted
- `filter_attack_traffic`: boolean — Whether the Logpush job filters attack traffic. Omitted for

## DELETE /accounts/{account_id}/logs/explorer/datasets/{dataset_id}

Delete an account dataset

operationId: `accounts-logs-explorer-datasets-delete`

**Response** 202 → `result`

- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.
- `fields`: object[] **required** — The field configuration for this dataset.
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — The Logpush filter predicate applied to this dataset. Omitted
- `filter_attack_traffic`: boolean — Whether the Logpush job filters attack traffic. Omitted for

## GET /accounts/{account_id}/logs/explorer/datasets/{dataset_id}

Get an account dataset

operationId: `accounts-logs-explorer-datasets-get`

**Response** 200 → `result`

- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.
- `fields`: object[] **required** — The field configuration for this dataset.
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — The Logpush filter predicate applied to this dataset. Omitted
- `filter_attack_traffic`: boolean — Whether the Logpush job filters attack traffic. Omitted for

## PUT /accounts/{account_id}/logs/explorer/datasets/{dataset_id}

Update an account dataset

operationId: `accounts-logs-explorer-datasets-update`

**Request** (application/json)

- `deletion_protection`: boolean — Set to `false` to allow deletion of this dataset.
- `enabled`: boolean **required** — Whether to enable or disable log ingest for this dataset.
- `fields`: object[] — Controls which fields the API ingests after the update. Defaults
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — Optional Logpush filter predicate to restrict which events are
- `filter_attack_traffic`: boolean — Whether to filter attack traffic from the Logpush job. If omitted,

**Response** 200 → `result`

- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.
- `fields`: object[] **required** — The field configuration for this dataset.
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — The Logpush filter predicate applied to this dataset. Omitted
- `filter_attack_traffic`: boolean — Whether the Logpush job filters attack traffic. Omitted for

## GET /accounts/{account_id}/logs/explorer/datasets/available

List available account datasets

operationId: `accounts-logs-explorer-datasets-available-list`

**Response** 200 → `result`

[array of]
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset type is account-scoped or zone-scoped.
- `schema`: object **required** — JSON Schema that describes the fields this dataset exposes.
  - `properties`: object
  - `required`: string[]
    [array]
  - `type`: string enum: `object`
- `timestamp_field`: string **required** — The primary timestamp field name for this dataset.

## GET /zones/{zone_id}/logs/explorer/datasets

List zone datasets

operationId: `zones-logs-explorer-datasets-list`

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.

## POST /zones/{zone_id}/logs/explorer/datasets

Create a zone dataset

operationId: `zones-logs-explorer-datasets-create`

**Request** (application/json)

- `dataset`: string **required** — Dataset type name to create (e.g. `http_requests`).
- `fields`: object[] — Controls which fields the API ingests. Defaults to all available
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — Optional Logpush filter predicate to restrict which events are ingested.
- `filter_attack_traffic`: boolean — Whether to filter attack traffic from the Logpush job. Defaults to

**Response** 201 → `result`

- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.
- `fields`: object[] **required** — The field configuration for this dataset.
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — The Logpush filter predicate applied to this dataset. Omitted
- `filter_attack_traffic`: boolean — Whether the Logpush job filters attack traffic. Omitted for

## DELETE /zones/{zone_id}/logs/explorer/datasets/{dataset_id}

Delete a zone dataset

operationId: `zones-logs-explorer-datasets-delete`

**Response** 202 → `result`

- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.
- `fields`: object[] **required** — The field configuration for this dataset.
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — The Logpush filter predicate applied to this dataset. Omitted
- `filter_attack_traffic`: boolean — Whether the Logpush job filters attack traffic. Omitted for

## GET /zones/{zone_id}/logs/explorer/datasets/{dataset_id}

Get a zone dataset

operationId: `zones-logs-explorer-datasets-get`

**Response** 200 → `result`

- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.
- `fields`: object[] **required** — The field configuration for this dataset.
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — The Logpush filter predicate applied to this dataset. Omitted
- `filter_attack_traffic`: boolean — Whether the Logpush job filters attack traffic. Omitted for

## PUT /zones/{zone_id}/logs/explorer/datasets/{dataset_id}

Update a zone dataset

operationId: `zones-logs-explorer-datasets-update`

**Request** (application/json)

- `deletion_protection`: boolean — Set to `false` to allow deletion of this dataset.
- `enabled`: boolean **required** — Whether to enable or disable log ingest for this dataset.
- `fields`: object[] — Controls which fields the API ingests after the update. Defaults
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — Optional Logpush filter predicate to restrict which events are
- `filter_attack_traffic`: boolean — Whether to filter attack traffic from the Logpush job. If omitted,

**Response** 200 → `result`

- `created_at`: string **required** — RFC3339 timestamp recording when the API created this dataset.
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `dataset_id`: string **required** — Unique dataset ID.
- `deletion_protection`: boolean **required** default: `true` — Whether deletion is blocked. Set to `false` before deleting the dataset.
- `enabled`: boolean **required** default: `true` — Whether log ingest is currently active for this dataset.
- `object_id`: string **required** — Public ID of the account or zone that owns this dataset.
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset belongs to an account or a zone.
- `updated_at`: string **required** — RFC3339 timestamp recording when the API last updated this dataset.
- `fields`: object[] **required** — The field configuration for this dataset.
  [array of]
  - `enabled`: boolean **required** — Whether the API includes this field in log ingest.
  - `name`: string **required** — Field name in lowercase.
- `filter`: string — The Logpush filter predicate applied to this dataset. Omitted
- `filter_attack_traffic`: boolean — Whether the Logpush job filters attack traffic. Omitted for

## GET /zones/{zone_id}/logs/explorer/datasets/available

List available zone datasets

operationId: `zones-logs-explorer-datasets-available-list`

**Response** 200 → `result`

[array of]
- `dataset`: string **required** — Dataset type name (e.g. `http_requests`).
- `object_type`: string **required** enum: `account`, `zone` — Whether this dataset type is account-scoped or zone-scoped.
- `schema`: object **required** — JSON Schema that describes the fields this dataset exposes.
  - `properties`: object
  - `required`: string[]
    [array]
  - `type`: string enum: `object`
- `timestamp_field`: string **required** — The primary timestamp field name for this dataset.
