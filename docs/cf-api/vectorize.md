# Vectorize

14 endpoints.

## GET /accounts/{account_id}/vectorize/v2/indexes

List Vectorize Indexes

operationId: `vectorize-list-vectorize-indexes`

## POST /accounts/{account_id}/vectorize/v2/indexes

Create Vectorize Index

operationId: `vectorize-create-vectorize-index`

## DELETE /accounts/{account_id}/vectorize/v2/indexes/{index_name}

Delete Vectorize Index

operationId: `vectorize-delete-vectorize-index`

## GET /accounts/{account_id}/vectorize/v2/indexes/{index_name}

Get Vectorize Index

operationId: `vectorize-get-vectorize-index`

## POST /accounts/{account_id}/vectorize/v2/indexes/{index_name}/delete_by_ids

Delete Vectors By Identifier

operationId: `vectorize-delete-vectors-by-id`

## POST /accounts/{account_id}/vectorize/v2/indexes/{index_name}/get_by_ids

Get Vectors By Identifier

operationId: `vectorize-get-vectors-by-id`

## GET /accounts/{account_id}/vectorize/v2/indexes/{index_name}/info

Get Vectorize Index Info

operationId: `vectorize-index-info`

## POST /accounts/{account_id}/vectorize/v2/indexes/{index_name}/insert

Insert Vectors

operationId: `vectorize-insert-vector` · query: `unparsable-behavior`

## GET /accounts/{account_id}/vectorize/v2/indexes/{index_name}/list

List Vectors

operationId: `vectorize-list-vectors` · query: `count`, `cursor`

## POST /accounts/{account_id}/vectorize/v2/indexes/{index_name}/metadata_index/create

Create Metadata Index

operationId: `vectorize-create-metadata-index`

## POST /accounts/{account_id}/vectorize/v2/indexes/{index_name}/metadata_index/delete

Delete Metadata Index

operationId: `vectorize-delete-metadata-index`

## GET /accounts/{account_id}/vectorize/v2/indexes/{index_name}/metadata_index/list

List Metadata Indexes

operationId: `vectorize-list-metadata-indexes`

## POST /accounts/{account_id}/vectorize/v2/indexes/{index_name}/query

Query Vectors

operationId: `vectorize-query-vector`

## POST /accounts/{account_id}/vectorize/v2/indexes/{index_name}/upsert

Upsert Vectors

operationId: `vectorize-upsert-vector` · query: `unparsable-behavior`
