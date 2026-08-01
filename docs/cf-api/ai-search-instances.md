# AI Search Instances

17 endpoints.

## GET /accounts/{account_id}/ai-search/instances

List AI Search instances.

operationId: `ai-search-list-instances` · query: `page`, `per_page`, `search`, `namespace`, `order_by`, `order_by_direction`

## POST /accounts/{account_id}/ai-search/instances

Create an AI Search instance.

operationId: `ai-search-create-instance`

## DELETE /accounts/{account_id}/ai-search/instances/{id}

Delete an AI Search instance.

operationId: `ai-search-delete-instance`

## GET /accounts/{account_id}/ai-search/instances/{id}

Get an AI Search instance.

operationId: `ai-search-fetch-instance`

## PUT /accounts/{account_id}/ai-search/instances/{id}

Update an AI Search instance.

operationId: `ai-search-update-instance`

## POST /accounts/{account_id}/ai-search/instances/{id}/chat/completions

Chat Completions

operationId: `ai-search-instance-chat-completion`

## POST /accounts/{account_id}/ai-search/instances/{id}/search

Search

operationId: `ai-search-instance-search`

## GET /accounts/{account_id}/ai-search/instances/{id}/stats

Get instance statistics.

operationId: `ai-search-stats`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances

List AI Search instances.

operationId: `ai-search-namespace-list-instances` · query: `page`, `per_page`, `search`, `namespace`, `order_by`, `order_by_direction`

## POST /accounts/{account_id}/ai-search/namespaces/{name}/instances

Create an AI Search instance.

operationId: `ai-search-namespace-create-instance`

## DELETE /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}

Delete an AI Search instance.

operationId: `ai-search-namespace-delete-instance`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}

Get an AI Search instance.

operationId: `ai-search-namespace-fetch-instance`

## PUT /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}

Update an AI Search instance.

operationId: `ai-search-namespace-update-instance`

## POST /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/chat/completions

Chat Completions

operationId: `ai-search-namespace-instance-chat-completion`

## POST /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/purge_cache

Purge search cache.

operationId: `ai-search-namespace-purge-instance-cache`

## POST /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/search

Search

operationId: `ai-search-namespace-instance-search`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/stats

Get instance statistics.

operationId: `ai-search-namespace-stats`
