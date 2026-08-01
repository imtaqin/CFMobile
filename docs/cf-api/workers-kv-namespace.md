# Workers KV Namespace

14 endpoints.

## GET /accounts/{account_id}/storage/kv/namespaces

List Namespaces

operationId: `workers-kv-namespace-list-namespaces` · query: `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/storage/kv/namespaces

Create a Namespace

operationId: `workers-kv-namespace-create-a-namespace`

## DELETE /accounts/{account_id}/storage/kv/namespaces/{namespace_id}

Remove a Namespace

operationId: `workers-kv-namespace-remove-a-namespace`

## GET /accounts/{account_id}/storage/kv/namespaces/{namespace_id}

Get a Namespace

operationId: `workers-kv-namespace-get-a-namespace`

## PUT /accounts/{account_id}/storage/kv/namespaces/{namespace_id}

Rename a Namespace

operationId: `workers-kv-namespace-rename-a-namespace`

## DELETE /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk

Delete multiple key-value pairs

operationId: `workers-kv-namespace-delete-multiple-key-value-pairs-deprecated`

## PUT /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk

Write multiple key-value pairs

operationId: `workers-kv-namespace-write-multiple-key-value-pairs`

## POST /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/delete

Delete multiple key-value pairs

operationId: `workers-kv-namespace-delete-multiple-key-value-pairs`

## POST /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/get

Get multiple key-value pairs

operationId: `workers-kv-namespace-get-multiple-key-value-pairs`

## GET /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/keys

List a Namespace's Keys

operationId: `workers-kv-namespace-list-a-namespace'-s-keys` · query: `limit`, `prefix`, `cursor`

## GET /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/metadata/{key_name}

Read the metadata for a key

operationId: `workers-kv-namespace-read-the-metadata-for-a-key`

## DELETE /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}

Delete key-value pair

operationId: `workers-kv-namespace-delete-key-value-pair`

## GET /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}

Read key-value pair

operationId: `workers-kv-namespace-read-key-value-pair`

## PUT /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}

Write key-value pair with optional metadata

operationId: `workers-kv-namespace-write-key-value-pair-with-metadata` · query: `expiration`, `expiration_ttl`
