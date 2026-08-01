# Catalog Sync

8 endpoints.

## GET /accounts/{account_id}/magic/cloud/catalog-syncs

List Catalog Syncs

operationId: `catalog-syncs-list`

## POST /accounts/{account_id}/magic/cloud/catalog-syncs

Create Catalog Sync

operationId: `catalog-syncs-create`

## DELETE /accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}

Delete Catalog Sync

operationId: `catalog-syncs-delete` · query: `delete_destination`

## GET /accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}

Read Catalog Sync

operationId: `catalog-syncs-read`

## PATCH /accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}

Patch Catalog Sync

operationId: `catalog-syncs-patch`

## PUT /accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}

Update Catalog Sync

operationId: `catalog-syncs-update`

## POST /accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}/refresh

Run Catalog Sync

operationId: `catalog-syncs-refresh`

## GET /accounts/{account_id}/magic/cloud/catalog-syncs/prebuilt-policies

List Prebuilt Policies

operationId: `catalog-syncs-prebuilt-policies-list` · query: `destination_type`
