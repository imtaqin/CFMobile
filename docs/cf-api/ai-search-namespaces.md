# AI Search Namespaces

6 endpoints.

## GET /accounts/{account_id}/ai-search/namespaces

List namespaces

operationId: `ai-search-list-namespaces` · query: `page`, `per_page`, `search`

## POST /accounts/{account_id}/ai-search/namespaces

Create a namespace

operationId: `ai-search-create-namespace`

## DELETE /accounts/{account_id}/ai-search/namespaces/{name}

Delete a namespace

operationId: `ai-search-delete-namespace`

## GET /accounts/{account_id}/ai-search/namespaces/{name}

Get a namespace

operationId: `ai-search-fetch-namespace`

## PUT /accounts/{account_id}/ai-search/namespaces/{name}

Update a namespace

operationId: `ai-search-update-namespace`

## PATCH /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}

Move an instance to a different namespace.

operationId: `ai-search-move-instance`
