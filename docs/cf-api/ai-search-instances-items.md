# AI Search Instances Items

9 endpoints.

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items

Items List.

operationId: `ai-search-namespace-instance-list-items` · query: `page`, `per_page`, `search`, `sort_by`, `status`, `source`, `metadata_filter`, `item_id`, `key`

## POST /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items

Upload Item.

operationId: `ai-search-namespace-instance-upload-item`

## PUT /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items

Create or Update Item.

operationId: `ai-search-namespace-instance-create-or-update-item`

## DELETE /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}

Delete Item.

operationId: `ai-search-namespace-instance-delete-item`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}

Get Item.

operationId: `ai-search-namespace-instance-get-item`

## PATCH /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}

Sync Item.

operationId: `ai-search-namespace-instance-sync-item`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}/chunks

List Item Chunks.

operationId: `ai-search-namespace-instance-list-item-chunks` · query: `limit`, `offset`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}/download

Download Item Content.

operationId: `ai-search-namespace-instance-get-item-content`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}/logs

Item Logs.

operationId: `ai-search-namespace-instance-logs-item` · query: `limit`, `cursor`
