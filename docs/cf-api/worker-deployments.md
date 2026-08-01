# Worker Deployments

4 endpoints.

## GET /accounts/{account_id}/workers/scripts/{script_name}/deployments

List Deployments

operationId: `worker-deployments-list-deployments`

## POST /accounts/{account_id}/workers/scripts/{script_name}/deployments

Create Deployment

operationId: `worker-deployments-create-deployment` · query: `force`

## DELETE /accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}

Delete Deployment

operationId: `worker-deployments-delete-deployment`

## GET /accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}

Get Deployment

operationId: `worker-deployments-get-deployment`
