# Namespace Management

2 endpoints.

## GET /accounts/{account_id}/basin-catalog/{bucket_name}/namespaces

List namespaces in catalog

operationId: `basin-list-namespaces` · query: `page_token`, `page_size`, `parent`, `return_uuids`, `return_details`

**Response** 200 → `result`

- `details`: object[] — Contains detailed metadata for each namespace when return_details is true.
  [array of]
  - `created_at`: string — Indicates the creation timestamp in ISO 8601 format.
  - `namespace`: string[] **required** — Specifies the hierarchical namespace parts as an array of strings.
    [array]
  - `namespace_uuid`: string **required** — Contains the UUID that persists across renames.
  - `updated_at`: string — Shows the last update timestamp in ISO 8601 format. Null if never updated.
- `namespace_uuids`: string[] — Contains UUIDs for each namespace when return_uuids is true.
  [array]
- `namespaces`: array[] **required** — Lists namespaces in the catalog.
  [array of]
  [array]
- `next_page_token`: string — Use this opaque token to fetch the next page of results.

## GET /accounts/{account_id}/r2-catalog/{bucket_name}/namespaces

List namespaces in catalog

operationId: `list-namespaces` · query: `page_token`, `page_size`, `parent`, `return_uuids`, `return_details`

**Response** 200 → `result`

- `details`: object[] — Contains detailed metadata for each namespace when return_details is true.
  [array of]
  - `created_at`: string — Indicates the creation timestamp in ISO 8601 format.
  - `namespace`: string[] **required** — Specifies the hierarchical namespace parts as an array of strings.
    [array]
  - `namespace_uuid`: string **required** — Contains the UUID that persists across renames.
  - `updated_at`: string — Shows the last update timestamp in ISO 8601 format. Null if never updated.
- `namespace_uuids`: string[] — Contains UUIDs for each namespace when return_uuids is true.
  [array]
- `namespaces`: array[] **required** — Lists namespaces in the catalog.
  [array of]
  [array]
- `next_page_token`: string — Use this opaque token to fetch the next page of results.
