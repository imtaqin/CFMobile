# Worker Tail Logs

3 endpoints.

## GET /accounts/{account_id}/workers/scripts/{script_name}/tails

List Worker Tails

operationId: `worker-tail-logs-list-tails`

**Response** 200 → `result`

- `expires_at`: string **required**
- `id`: any **required**
- `url`: string **required**

## POST /accounts/{account_id}/workers/scripts/{script_name}/tails

Start Worker Tail

operationId: `worker-tail-logs-start-tail`

**Response** 200 → `result`

- `expires_at`: string **required**
- `id`: any **required**
- `url`: string **required**

## DELETE /accounts/{account_id}/workers/scripts/{script_name}/tails/{id}

Delete Worker Tail

operationId: `worker-tail-logs-delete-tail`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
