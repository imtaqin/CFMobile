# Worker Tail Logs

3 endpoints.

## GET /accounts/{account_id}/workers/scripts/{script_name}/tails

List Tails

operationId: `worker-tail-logs-list-tails`

## POST /accounts/{account_id}/workers/scripts/{script_name}/tails

Start Tail

operationId: `worker-tail-logs-start-tail`

## DELETE /accounts/{account_id}/workers/scripts/{script_name}/tails/{id}

Delete Tail

operationId: `worker-tail-logs-delete-tail`
