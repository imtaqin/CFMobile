# Worker Script

23 endpoints.

## POST /accounts/{account_id}/workers/assets/upload

Upload Assets

operationId: `worker-assets-upload` · query: `base64`

## GET /accounts/{account_id}/workers/scripts

List Workers

operationId: `worker-script-list-workers` · query: `tags`

## GET /accounts/{account_id}/workers/scripts-search

Search Workers

operationId: `worker-script-search-workers` · query: `name`, `id`, `order_by`, `page`, `per_page`

## DELETE /accounts/{account_id}/workers/scripts/{script_name}

Delete Worker

operationId: `worker-script-delete-worker` · query: `force`

## GET /accounts/{account_id}/workers/scripts/{script_name}

Download Worker

operationId: `worker-script-download-worker`

## PUT /accounts/{account_id}/workers/scripts/{script_name}

Upload Worker Module

operationId: `worker-script-upload-worker-module` · query: `bindings_inherit`

## POST /accounts/{account_id}/workers/scripts/{script_name}/assets-upload-session

Create Assets Upload Session

operationId: `worker-script-update-create-assets-upload-session`

## PUT /accounts/{account_id}/workers/scripts/{script_name}/content

Put script content

operationId: `worker-script-put-content`

## GET /accounts/{account_id}/workers/scripts/{script_name}/content/v2

Get script content

operationId: `worker-script-get-content`

## GET /accounts/{account_id}/workers/scripts/{script_name}/script-settings

Get Script Settings

operationId: `worker-script-settings-get-settings`

## PATCH /accounts/{account_id}/workers/scripts/{script_name}/script-settings

Patch Script Settings

operationId: `worker-script-settings-patch-settings`

## GET /accounts/{account_id}/workers/scripts/{script_name}/secrets

List script secrets

operationId: `worker-list-script-secrets`

## PUT /accounts/{account_id}/workers/scripts/{script_name}/secrets

Add script secret

operationId: `worker-put-script-secret`

## PATCH /accounts/{account_id}/workers/scripts/{script_name}/secrets-bulk

Patch multiple script secrets

operationId: `worker-patch-script-secrets-bulk`

## DELETE /accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}

Delete script secret

operationId: `worker-delete-script-secret` · query: `url_encoded`

## GET /accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}

Get secret binding

operationId: `worker-get-script-secret` · query: `url_encoded`

## GET /accounts/{account_id}/workers/scripts/{script_name}/settings

Get Settings

operationId: `worker-script-get-settings`

## PATCH /accounts/{account_id}/workers/scripts/{script_name}/settings

Patch Settings

operationId: `worker-script-patch-settings`

## DELETE /accounts/{account_id}/workers/scripts/{script_name}/subdomain

Delete Worker subdomain

operationId: `worker-script-delete-subdomain`

## GET /accounts/{account_id}/workers/scripts/{script_name}/subdomain

Get Worker subdomain

operationId: `worker-script-get-subdomain`

## POST /accounts/{account_id}/workers/scripts/{script_name}/subdomain

Post Worker subdomain

operationId: `worker-script-post-subdomain`

## GET /accounts/{account_id}/workers/scripts/{script_name}/usage-model

Fetch Usage Model

operationId: `worker-script-fetch-usage-model`

## PUT /accounts/{account_id}/workers/scripts/{script_name}/usage-model

Update Usage Model

operationId: `worker-script-update-usage-model`
