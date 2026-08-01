# Secrets Store

12 endpoints.

## GET /accounts/{account_id}/secrets_store/quota

View secret usage

operationId: `secrets-store-quota`

## GET /accounts/{account_id}/secrets_store/stores

List account stores

operationId: `secrets-store-list`

## POST /accounts/{account_id}/secrets_store/stores

Create a store

operationId: `secrets-store-create`

## DELETE /accounts/{account_id}/secrets_store/stores/{store_id}

Delete a store

operationId: `secrets-store-delete-by-id`

## GET /accounts/{account_id}/secrets_store/stores/{store_id}

Get a store by ID

operationId: `secrets-store-get-store-by-id`

## DELETE /accounts/{account_id}/secrets_store/stores/{store_id}/secrets

Delete secrets

operationId: `secrets-store-delete-bulk`

## GET /accounts/{account_id}/secrets_store/stores/{store_id}/secrets

List store secrets

operationId: `secrets-store-secrets-list`

## POST /accounts/{account_id}/secrets_store/stores/{store_id}/secrets

Create a secret

operationId: `secrets-store-secret-create`

## DELETE /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}

Delete a secret

operationId: `secrets-store-secret-delete-by-id`

## GET /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}

Get a secret by ID

operationId: `secrets-store-get-by-id`

## PATCH /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}

Patch a secret

operationId: `secrets-store-patch-by-id`

## POST /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}/duplicate

Duplicate Secret

operationId: `secrets-store-duplicate-by-id`
