# Workers Account Settings

2 endpoints.

## GET /accounts/{account_id}/workers/account-settings

Fetch Workers Account Settings

operationId: `worker-account-settings-fetch-worker-account-settings`

**Response** 200 → `result`

- `default_usage_model`: string
- `green_compute`: boolean

## PUT /accounts/{account_id}/workers/account-settings

Configure Workers Account Settings

operationId: `worker-account-settings-create-worker-account-settings`

**Request** (application/json)

- `default_usage_model`: string
- `green_compute`: boolean

**Response** 200 → `result`

- `default_usage_model`: string
- `green_compute`: boolean
