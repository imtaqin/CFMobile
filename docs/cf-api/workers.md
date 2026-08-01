# Workers

12 endpoints.

## POST /accounts/{account_id}/builds/workers

Create worker build configuration

operationId: `createWorkerBuild`

## GET /accounts/{account_id}/builds/workers/{external_script_id}/builds

List builds by script

operationId: `listBuildsByScript`

## GET /accounts/{account_id}/builds/workers/{external_script_id}/triggers

List triggers by script

operationId: `listTriggersByScript`

## DELETE /accounts/{account_id}/builds/workers/{script_tag}

Delete worker build configuration

operationId: `deleteWorkerBuild`

## GET /accounts/{account_id}/builds/workers/{script_tag}

Get worker build configuration

operationId: `getWorkerBuild`

## PATCH /accounts/{account_id}/builds/workers/{script_tag}

Update worker build configuration

operationId: `updateWorkerBuild`

## GET /accounts/{account_id}/workers/workers

List Workers

operationId: `listWorkers` · query: `page`, `per_page`, `order_by`, `order`

## POST /accounts/{account_id}/workers/workers

Create Worker

operationId: `createWorker`

## DELETE /accounts/{account_id}/workers/workers/{worker_id}

Delete Worker

operationId: `deleteWorker`

## GET /accounts/{account_id}/workers/workers/{worker_id}

Get Worker

operationId: `getWorker`

## PATCH /accounts/{account_id}/workers/workers/{worker_id}

Edit Worker

operationId: `editWorker`

## PUT /accounts/{account_id}/workers/workers/{worker_id}

Update Worker

operationId: `updateWorker`
