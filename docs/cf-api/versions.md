# Versions

5 endpoints.

## GET /accounts/{account_id}/workers/workers/{worker_id}/versions

List Versions

operationId: `listWorkerVersions` · query: `page`, `per_page`

## POST /accounts/{account_id}/workers/workers/{worker_id}/versions

Create Version

operationId: `createWorkerVersion` · query: `deploy`

## DELETE /accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}

Delete Version

operationId: `deleteWorkerVersion`

## GET /accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}

Get Version

operationId: `getWorkerVersion` · query: `include`

## PATCH /accounts/{account_id}/workers/workers/{worker_id}/versions/latest

Patch Latest Version

operationId: `patchLatestWorkerVersion` · query: `deploy`
