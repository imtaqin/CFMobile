# Access JIT request logs

2 endpoints.

## GET /accounts/{account_id}/access/logs/jit_requests

List Access JIT request logs

operationId: `access-jit-request-logs-list` · query: `per_page`, `status`, `search`, `since`, `until`

## GET /accounts/{account_id}/access/logs/jit_requests/{knock_request_id}

Get an Access JIT request log

operationId: `access-jit-request-logs-get`
