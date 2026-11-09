# Worker Cron Trigger

2 endpoints.

## GET /accounts/{account_id}/workers/scripts/{script_name}/schedules

Get Worker Script Schedules (Cron Triggers)

operationId: `worker-cron-trigger-get-cron-triggers`

**Response** 200 → `result`

- `schedules`: object[] **required**
  [array of]
  - `created_on`: string
  - `cron`: string **required**
  - `modified_on`: string

## PUT /accounts/{account_id}/workers/scripts/{script_name}/schedules

Update Worker Script Schedules (Cron Triggers)

operationId: `worker-cron-trigger-update-cron-triggers`

**Request** (application/json)

[array of]
- `created_on`: string
- `cron`: string **required**
- `modified_on`: string

**Response** 200 → `result`

- `schedules`: object[] **required**
  [array of]
  - `created_on`: string
  - `cron`: string **required**
  - `modified_on`: string
