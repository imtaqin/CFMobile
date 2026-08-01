# Builds

5 endpoints.

## GET /accounts/{account_id}/builds/builds

Get builds by version IDs

operationId: `getBuildsByVersionIds` · query: `version_ids`

## GET /accounts/{account_id}/builds/builds/{build_uuid}

Get build by UUID

operationId: `getBuildByUuid`

## PUT /accounts/{account_id}/builds/builds/{build_uuid}/cancel

Cancel build

operationId: `cancelBuildByUuid`

## GET /accounts/{account_id}/builds/builds/{build_uuid}/logs

Get build logs

operationId: `getBuildLogs` · query: `cursor`

## GET /accounts/{account_id}/builds/builds/latest

Get latest builds by script IDs

operationId: `getLatestBuildsByScripts` · query: `external_script_ids`
