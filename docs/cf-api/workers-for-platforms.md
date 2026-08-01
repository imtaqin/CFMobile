# Workers for Platforms

26 endpoints.

## GET /accounts/{account_id}/workers/dispatch/namespaces

List dispatch namespaces

operationId: `namespace-worker-list`

## POST /accounts/{account_id}/workers/dispatch/namespaces

Create dispatch namespace

operationId: `namespace-worker-create`

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}

Delete dispatch namespace

operationId: `namespace-worker-delete-namespace`

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}

Get dispatch namespace

operationId: `namespace-worker-get-namespace`

## PATCH /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}

Patch dispatch namespace

operationId: `namespace-worker-patch-namespace`

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}

Update dispatch namespace

operationId: `namespace-worker-put-namespace`

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts

Delete Scripts in Namespace

operationId: `namespace-worker-delete-scripts` · query: `tags`, `limit`

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts

List Scripts in Namespace

operationId: `namespace-worker-list-scripts` · query: `tags`

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}

Delete Worker

operationId: `namespace-worker-script-delete-worker` · query: `force`

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}

Worker Details

operationId: `namespace-worker-script-worker-details`

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}

Upload Worker Module

operationId: `namespace-worker-script-upload-worker-module` · query: `bindings_inherit`

## POST /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/assets-upload-session

Create Assets Upload Session

operationId: `namespace-worker-script-update-create-assets-upload-session`

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/bindings

Get Script Bindings

operationId: `namespace-worker-get-script-bindings`

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content

Get Script Content

operationId: `namespace-worker-get-script-content`

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content

Put Script Content

operationId: `namespace-worker-put-script-content`

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets

List Script Secrets

operationId: `namespace-worker-list-script-secrets`

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets

Add script secret

operationId: `namespace-worker-put-script-secrets`

## PATCH /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets-bulk

Patch multiple script secrets

operationId: `namespace-worker-patch-script-secrets-bulk`

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets/{secret_name}

Delete script secret

operationId: `namespace-worker-delete-script-secret` · query: `url_encoded`

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets/{secret_name}

Get secret binding

operationId: `namespace-worker-get-script-secrets` · query: `url_encoded`

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/settings

Get Script Settings

operationId: `namespace-worker-get-script-settings`

## PATCH /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/settings

Patch Script Settings

operationId: `namespace-worker-patch-script-settings`

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags

Get Script Tags

operationId: `namespace-worker-get-script-tags`

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags

Put Script Tags

operationId: `namespace-worker-put-script-tags`

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags/{tag}

Delete Script Tag

operationId: `namespace-worker-delete-script-tag`

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags/{tag}

Put Script Tag

operationId: `namespace-worker-put-script-tag`
