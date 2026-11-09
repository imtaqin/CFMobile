# Credential Management

4 endpoints.

## POST /accounts/{account_id}/basin-catalog/{bucket_name}/credential

Store catalog credentials

operationId: `basin-store-credentials`

**Request** (application/json)

- `token`: string **required** — Provides the Cloudflare API token for accessing R2.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/basin-catalog/{bucket_name}/credential/status

Get Basin Catalog credential status

operationId: `basin-get-credential-status`

**Response** 200 → `result`

- `status`: string **required** enum: `valid`, `invalid`, `absent` — Shows the verified credential status probed against the catalog.

## POST /accounts/{account_id}/r2-catalog/{bucket_name}/credential

Store catalog credentials

operationId: `store-credentials`

**Request** (application/json)

- `token`: string **required** — Provides the Cloudflare API token for accessing R2.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2-catalog/{bucket_name}/credential/status

Get catalog credential status

operationId: `get-credential-status`

**Response** 200 → `result`

- `status`: string **required** enum: `valid`, `invalid`, `absent` — Shows the verified credential status probed against the catalog.
