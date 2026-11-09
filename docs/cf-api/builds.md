# Builds

5 endpoints.

## GET /accounts/{account_id}/builds/builds

Get builds by Worker version

operationId: `getBuildsByVersionIds` · query: `version_ids`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/builds/builds/{build_uuid}

Get a Workers build

operationId: `getBuildByUuid`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PUT /accounts/{account_id}/builds/builds/{build_uuid}/cancel

Cancel a Workers build

operationId: `cancelBuildByUuid`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/builds/builds/{build_uuid}/logs

Get Workers build logs

operationId: `getBuildLogs` · query: `cursor`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/builds/builds/latest

Get latest builds by script IDs

operationId: `getLatestBuildsByScripts` · query: `external_script_ids`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object
