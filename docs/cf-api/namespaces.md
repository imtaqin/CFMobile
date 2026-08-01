# Namespaces

4 endpoints.

## GET /accounts/{account_id}/agent-memory/namespaces

List namespaces

operationId: `agent-memory-namespace-list` · query: `per_page`, `order`, `direction`, `cursor`

## POST /accounts/{account_id}/agent-memory/namespaces

Create a namespace

operationId: `agent-memory-namespace-create`

## DELETE /accounts/{account_id}/agent-memory/namespaces/{namespace_name}

Delete a namespace

operationId: `agent-memory-namespace-delete`

## GET /accounts/{account_id}/agent-memory/namespaces/{namespace_name}

Get a namespace

operationId: `agent-memory-namespace-get`
