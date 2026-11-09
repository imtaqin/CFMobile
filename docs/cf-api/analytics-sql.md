# Analytics SQL

6 endpoints.

## GET /accounts/{account_id}/analytics/sql

Query analytics datasets

operationId: `sql-api-query-get-account-scoped` · query: `query`

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `data`: object[] **required** — Query result rows keyed by the selected column names.
  [array]
- `rows`: integer **required** — Number of rows in `data`.
- `statistics`: object **required**
  - `bytes_read`: integer **required** — Number of source bytes read while executing the query.
  - `elapsed_ms`: integer **required** — Backend execution time in milliseconds.
  - `rows_read`: integer **required** — Number of source rows read while executing the query.

## POST /accounts/{account_id}/analytics/sql

Query analytics datasets

operationId: `sql-api-query-post-account-scoped`

**Request** (application/json)

- `params`: any — Positional array values for `$1`, `$2`, and similar placeholders, or named object values for placeholders such as `$status`.
- `query`: string **required** — SQL query to execute. A trailing FORMAT selects JSON, JSONEachRow, TabSeparated, or TSV output on any dataset.
- `scope`: any — Account or zone scope applied to the query. Include exactly one scope tag. Do not include account or zone tenancy predicates in the SQL quer
- `time_range`: any

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `data`: object[] **required** — Query result rows keyed by the selected column names.
  [array]
- `rows`: integer **required** — Number of rows in `data`.
- `statistics`: object **required**
  - `bytes_read`: integer **required** — Number of source bytes read while executing the query.
  - `elapsed_ms`: integer **required** — Backend execution time in milliseconds.
  - `rows_read`: integer **required** — Number of source rows read while executing the query.

## GET /accounts/{account_id}/analytics/sql/introspection

List available analytics datasets

operationId: `sql-api-introspection-account-scoped` · query: `include_columns`, `include_custom_attributes`, `include_attributes`, `include_wae`, `include_lex`, `dataset_name`

**Response** 200 → `result`

- `datasets`: object[] **required** — Datasets visible through the Analytics SQL API.
  [array of]
  - `attributes`: object[] — Present when `include_attributes` is true and the dataset supports attributes. Replaces `custom_attributes`, which is deprecated; while both
    [array of]
    - `data_type`: string **required** — ClickHouse type of the attribute value.
    - `name`: string **required** — Attribute name.
  - `category`: string **required** — Human-readable dataset category from the catalogue metadata.
  - `columns`: object[] — Present when `include_columns` is true.
    [array of]
    - `data_type`: string **required** — SQL data type of the column.
    - `description`: string **required** — Human-readable description of the column.
    - `hidden`: boolean **required** — Whether the column is de-emphasised in column listings. A presentation hint only: a hidden column is still returned here, is still selectabl
    - `name`: string **required** — Column name used in SQL queries.
  - `custom_attributes`: object[] — Present when `include_custom_attributes` is true and the dataset supports custom attributes. Deprecated in favor of `attributes`.
    [array of]
    - `data_type`: string **required** — ClickHouse type of the attribute value.
    - `name`: string **required** — Attribute name.
  - `description`: string **required** — Human-readable description of the dataset.
  - `hidden`: boolean **required** — Whether the dataset is de-emphasised in catalogue listings. A presentation hint only: a hidden dataset is still returned here and is just as
  - `kind`: object **required** — What kind of dataset this is. Determines aggregation rules and sampling behavior. Exactly one of `events`, `states`, or `logs` is present.
    - `availability`: object[] — Scopes the dataset is enabled for, as reported by the service that owns it. Absent when availability is not applicable to the dataset.
    - `events`: object — Row-per-event analytics dataset. Aggregations describe the cumulative effect of those events.
    - `logs`: object — Row-per-log dataset intended for record retrieval.
    - `states`: object — Snapshot/state dataset. Only `valid_aggregations` are valid aggregations for this dataset.
  - `name`: string **required** — Dataset name used in SQL queries.
  - `title`: string **required** — Human-readable title of the dataset.

## GET /analytics/sql

Query analytics datasets

operationId: `sql-api-query-get` · query: `query`

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `data`: object[] **required** — Query result rows keyed by the selected column names.
  [array]
- `rows`: integer **required** — Number of rows in `data`.
- `statistics`: object **required**
  - `bytes_read`: integer **required** — Number of source bytes read while executing the query.
  - `elapsed_ms`: integer **required** — Backend execution time in milliseconds.
  - `rows_read`: integer **required** — Number of source rows read while executing the query.

## POST /analytics/sql

Query analytics datasets

operationId: `sql-api-query-post`

**Request** (application/json)

- `params`: any — Positional array values for `$1`, `$2`, and similar placeholders, or named object values for placeholders such as `$status`.
- `query`: string **required** — SQL query to execute. A trailing FORMAT selects JSON, JSONEachRow, TabSeparated, or TSV output on any dataset.
- `scope`: any — Account or zone scope applied to the query. Include exactly one scope tag. Do not include account or zone tenancy predicates in the SQL quer
- `time_range`: any

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `data`: object[] **required** — Query result rows keyed by the selected column names.
  [array]
- `rows`: integer **required** — Number of rows in `data`.
- `statistics`: object **required**
  - `bytes_read`: integer **required** — Number of source bytes read while executing the query.
  - `elapsed_ms`: integer **required** — Backend execution time in milliseconds.
  - `rows_read`: integer **required** — Number of source rows read while executing the query.

## GET /analytics/sql/introspection

List available analytics datasets

operationId: `sql-api-introspection` · query: `account_tag`, `include_columns`, `include_custom_attributes`, `include_attributes`, `include_wae`, `include_lex`, `dataset_name`

**Response** 200 → `result`

- `datasets`: object[] **required** — Datasets visible through the Analytics SQL API.
  [array of]
  - `attributes`: object[] — Present when `include_attributes` is true and the dataset supports attributes. Replaces `custom_attributes`, which is deprecated; while both
    [array of]
    - `data_type`: string **required** — ClickHouse type of the attribute value.
    - `name`: string **required** — Attribute name.
  - `category`: string **required** — Human-readable dataset category from the catalogue metadata.
  - `columns`: object[] — Present when `include_columns` is true.
    [array of]
    - `data_type`: string **required** — SQL data type of the column.
    - `description`: string **required** — Human-readable description of the column.
    - `hidden`: boolean **required** — Whether the column is de-emphasised in column listings. A presentation hint only: a hidden column is still returned here, is still selectabl
    - `name`: string **required** — Column name used in SQL queries.
  - `custom_attributes`: object[] — Present when `include_custom_attributes` is true and the dataset supports custom attributes. Deprecated in favor of `attributes`.
    [array of]
    - `data_type`: string **required** — ClickHouse type of the attribute value.
    - `name`: string **required** — Attribute name.
  - `description`: string **required** — Human-readable description of the dataset.
  - `hidden`: boolean **required** — Whether the dataset is de-emphasised in catalogue listings. A presentation hint only: a hidden dataset is still returned here and is just as
  - `kind`: object **required** — What kind of dataset this is. Determines aggregation rules and sampling behavior. Exactly one of `events`, `states`, or `logs` is present.
    - `availability`: object[] — Scopes the dataset is enabled for, as reported by the service that owns it. Absent when availability is not applicable to the dataset.
    - `events`: object — Row-per-event analytics dataset. Aggregations describe the cumulative effect of those events.
    - `logs`: object — Row-per-log dataset intended for record retrieval.
    - `states`: object — Snapshot/state dataset. Only `valid_aggregations` are valid aggregations for this dataset.
  - `name`: string **required** — Dataset name used in SQL queries.
  - `title`: string **required** — Human-readable title of the dataset.
