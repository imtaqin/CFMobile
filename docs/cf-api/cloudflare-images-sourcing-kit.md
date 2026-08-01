# Cloudflare Images Sourcing Kit

15 endpoints.

## GET /accounts/{account_id}/images/v2/sourcingkit/migrations

List sourcing kit migrations

operationId: `cloudflare-images-sourcingkit-list-migrations` · query: `offset`, `limit`

## POST /accounts/{account_id}/images/v2/sourcingkit/migrations

Create a sourcing kit migration

operationId: `cloudflare-images-sourcingkit-create-migration`

## DELETE /accounts/{account_id}/images/v2/sourcingkit/migrations/{migration_id}

Delete a sourcing kit migration

operationId: `cloudflare-images-sourcingkit-delete-migration`

## GET /accounts/{account_id}/images/v2/sourcingkit/migrations/{migration_id}

Get sourcing kit migration

operationId: `cloudflare-images-sourcingkit-get-migration`

## GET /accounts/{account_id}/images/v2/sourcingkit/migrations/{migration_id}/lifecycle

Get migration progress

operationId: `cloudflare-images-sourcingkit-get-migration-progress`

## PATCH /accounts/{account_id}/images/v2/sourcingkit/migrations/{migration_id}/lifecycle/abort

Abort a migration

operationId: `cloudflare-images-sourcingkit-abort-migration`

## PATCH /accounts/{account_id}/images/v2/sourcingkit/migrations/{migration_id}/lifecycle/start

Start a migration

operationId: `cloudflare-images-sourcingkit-start-migration`

## GET /accounts/{account_id}/images/v2/sourcingkit/migrations/{migration_id}/logs

List migration logs

operationId: `cloudflare-images-sourcingkit-list-migration-logs` · query: `offset`, `limit`

## GET /accounts/{account_id}/images/v2/sourcingkit/sources

List sourcing kit sources

operationId: `cloudflare-images-sourcingkit-list-sources` · query: `offset`, `limit`, `name`

## POST /accounts/{account_id}/images/v2/sourcingkit/sources

Create a sourcing kit source

operationId: `cloudflare-images-sourcingkit-create-source`

## DELETE /accounts/{account_id}/images/v2/sourcingkit/sources/{source_id}

Delete a sourcing kit source

operationId: `cloudflare-images-sourcingkit-delete-source`

## GET /accounts/{account_id}/images/v2/sourcingkit/sources/{source_id}

Get sourcing kit source

operationId: `cloudflare-images-sourcingkit-get-source`

## PATCH /accounts/{account_id}/images/v2/sourcingkit/sources/{source_id}

Update a sourcing kit source

operationId: `cloudflare-images-sourcingkit-update-source`

## GET /accounts/{account_id}/images/v2/sourcingkit/sources/{source_id}/connectivity

Get source connectivity status

operationId: `cloudflare-images-sourcingkit-get-source-connectivity`

## POST /accounts/{account_id}/images/v2/sourcingkit/sources/connectivity-precheck

Precheck source connectivity

operationId: `cloudflare-images-sourcingkit-precheck-source-connectivity`
