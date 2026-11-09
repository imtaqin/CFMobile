# Worker Subdomain

3 endpoints.

## DELETE /accounts/{account_id}/workers/subdomain

Delete Workers Subdomain

operationId: `worker-subdomain-delete-subdomain`

## GET /accounts/{account_id}/workers/subdomain

Get a Workers Subdomain

operationId: `worker-subdomain-get-subdomain`

**Response** 200 → `result`

- `subdomain`: string **required**

## PUT /accounts/{account_id}/workers/subdomain

Create a Workers Subdomain

operationId: `worker-subdomain-create-subdomain`

**Request** (application/json)

- `subdomain`: string **required**

**Response** 200 → `result`

- `subdomain`: string **required**
