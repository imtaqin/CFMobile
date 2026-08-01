# Collections

13 endpoints.

## GET /accounts/{account_id}/cloudforce-one/v2/collections

List collections

operationId: `get_CollectionList` · query: `page`, `limit`

## POST /accounts/{account_id}/cloudforce-one/v2/collections

Create a new collection

operationId: `post_CollectionCreate`

## DELETE /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}

Delete collection

operationId: `delete_CollectionDelete`

## GET /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}

Get collection

operationId: `get_CollectionGet`

## PATCH /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}

Update collection

operationId: `patch_CollectionUpdate`

## POST /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}/columns

Add column to collection

operationId: `post_ColumnAdd`

## DELETE /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}/columns/{column_id}

Delete column

operationId: `delete_ColumnDelete`

## PATCH /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}/columns/{column_id}

Update column

operationId: `patch_ColumnUpdate`

## GET /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}/export

Export collection to CSV, JSONL, or Markdown

operationId: `get_CollectionExportEndpoint` · query: `include_ids`

## GET /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}/items

Query collection items

operationId: `get_ItemQuery` · query: `cursor`, `limit`, `q`

## DELETE /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}/items/{item_id}

Delete collection item

operationId: `delete_ItemDelete`

## GET /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}/items/{item_id}

Get collection item

operationId: `get_ItemGet`

## PATCH /accounts/{account_id}/cloudforce-one/v2/collections/{collection_id}/items/{item_id}

Update collection item

operationId: `patch_ItemUpdate`
