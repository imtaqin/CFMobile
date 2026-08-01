# Worker Versions

3 endpoints.

## GET /accounts/{account_id}/workers/scripts/{script_name}/versions

List Versions

operationId: `worker-versions-list-versions` · query: `deployable`, `page`, `per_page`

## POST /accounts/{account_id}/workers/scripts/{script_name}/versions

Upload Version

operationId: `worker-versions-upload-version` · query: `bindings_inherit`

## GET /accounts/{account_id}/workers/scripts/{script_name}/versions/{version_id}

Get Version Detail

operationId: `worker-versions-get-version-detail`
