# Table Management

4 endpoints.

## GET /accounts/{account_id}/basin-catalog/{bucket_name}/namespaces/{namespace}/tables

List tables in namespace

operationId: `basin-list-tables` · query: `page_token`, `page_size`, `return_uuids`, `return_details`

**Response** 200 → `result`

- `details`: object[] — Contains detailed metadata for each table when return_details is true.
  [array of]
  - `created_at`: string — Indicates the creation timestamp in ISO 8601 format.
  - `identifier`: object **required** — Specifies a unique table identifier within a catalog.
    - `name`: string **required** — Specifies the table name.
    - `namespace`: string[] **required** — Specifies the hierarchical namespace parts as an array of strings.
  - `location`: string — Specifies the base S3 URI for table storage location.
  - `metadata_location`: string — Contains the S3 URI to table metadata file. Null for staged tables.
  - `table_uuid`: string **required** — Contains the UUID that persists across renames.
  - `updated_at`: string — Shows the last update timestamp in ISO 8601 format. Null if never updated.
- `identifiers`: object[] **required** — Lists tables in the namespace.
  [array of]
  - `name`: string **required** — Specifies the table name.
  - `namespace`: string[] **required** — Specifies the hierarchical namespace parts as an array of strings.
    [array]
- `next_page_token`: string — Use this opaque token to fetch the next page of results.
- `table_uuids`: string[] — Contains UUIDs for each table when return_uuids is true.
  [array]

## GET /accounts/{account_id}/basin-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}

Get table details

operationId: `basin-get-table`

**Response** 200 → `result`

- `identifier`: object **required** — Specifies a unique table identifier within a catalog.
  - `name`: string **required** — Specifies the table name.
  - `namespace`: string[] **required** — Specifies the hierarchical namespace parts as an array of strings.
    [array]
- `metadata`: object **required** — Contains standard Apache Iceberg table metadata (format version 1 or 2).
- `metadata_location`: string — Specifies the S3-compatible URI to the current Iceberg metadata file
- `returned_snapshots`: integer **required** — Describes the number of snapshots that appear in `metadata.snapshots`. Caps the
- `table_uuid`: string **required** — Contains the Iceberg table UUID, stable across renames.
- `total_snapshots`: integer **required** — Indicates the total number of snapshots stored for the table, before pruning.

## GET /accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables

List tables in namespace

operationId: `list-tables` · query: `page_token`, `page_size`, `return_uuids`, `return_details`

**Response** 200 → `result`

- `details`: object[] — Contains detailed metadata for each table when return_details is true.
  [array of]
  - `created_at`: string — Indicates the creation timestamp in ISO 8601 format.
  - `identifier`: object **required** — Specifies a unique table identifier within a catalog.
    - `name`: string **required** — Specifies the table name.
    - `namespace`: string[] **required** — Specifies the hierarchical namespace parts as an array of strings.
  - `location`: string — Specifies the base S3 URI for table storage location.
  - `metadata_location`: string — Contains the S3 URI to table metadata file. Null for staged tables.
  - `table_uuid`: string **required** — Contains the UUID that persists across renames.
  - `updated_at`: string — Shows the last update timestamp in ISO 8601 format. Null if never updated.
- `identifiers`: object[] **required** — Lists tables in the namespace.
  [array of]
  - `name`: string **required** — Specifies the table name.
  - `namespace`: string[] **required** — Specifies the hierarchical namespace parts as an array of strings.
    [array]
- `next_page_token`: string — Use this opaque token to fetch the next page of results.
- `table_uuids`: string[] — Contains UUIDs for each table when return_uuids is true.
  [array]

## GET /accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}

Get table details

operationId: `get-table`

**Response** 200 → `result`

- `identifier`: object **required** — Specifies a unique table identifier within a catalog.
  - `name`: string **required** — Specifies the table name.
  - `namespace`: string[] **required** — Specifies the hierarchical namespace parts as an array of strings.
    [array]
- `metadata`: object **required** — Contains standard Apache Iceberg table metadata (format version 1 or 2).
- `metadata_location`: string — Specifies the S3-compatible URI to the current Iceberg metadata file
- `returned_snapshots`: integer **required** — Describes the number of snapshots that appear in `metadata.snapshots`. Caps the
- `table_uuid`: string **required** — Contains the Iceberg table UUID, stable across renames.
- `total_snapshots`: integer **required** — Indicates the total number of snapshots stored for the table, before pruning.
