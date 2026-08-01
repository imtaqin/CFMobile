# Table Management

2 endpoints.

## GET /accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables

List tables in namespace

operationId: `list-tables` · query: `page_token`, `page_size`, `return_uuids`, `return_details`

## GET /accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}

Get table details

operationId: `get-table`
