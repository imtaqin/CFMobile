# R2 Catalog Management

5 endpoints.

## GET /accounts/{account_id}/r2-catalog

List R2 catalogs

operationId: `list-catalogs`

**Response** 200 → `result`

- `warehouses`: object[] **required** — Lists catalogs in the account.
  [array of]
  - `bucket`: string **required** — Specifies the associated R2 bucket name.
  - `credential_status`: string — Shows the credential configuration status.
  - `id`: string **required** — Use this to uniquely identify the catalog.
  - `jurisdiction`: string — Specifies the data-locality jurisdiction of the catalog. The first enable sets it, and it cannot change. Currently always `default`.
  - `maintenance_config`: object — Configures maintenance for the catalog.
  - `name`: string **required** — Specifies the catalog name (generated from account and bucket name).
  - `status`: string **required** enum: `active`, `inactive` — Indicates the status of the catalog.

## GET /accounts/{account_id}/r2-catalog/{bucket_name}

Get R2 catalog details

operationId: `get-catalog-details`

**Response** 200 → `result`

- `bucket`: string **required** — Specifies the associated R2 bucket name.
- `credential_status`: string — Shows the credential configuration status.
- `id`: string **required** — Use this to uniquely identify the catalog.
- `jurisdiction`: string — Specifies the data-locality jurisdiction of the catalog. The first enable sets it, and it cannot change. Currently always `default`.
- `maintenance_config`: object — Configures maintenance for the catalog.
- `name`: string **required** — Specifies the catalog name (generated from account and bucket name).
- `status`: string **required** enum: `active`, `inactive` — Indicates the status of the catalog.

## POST /accounts/{account_id}/r2-catalog/{bucket_name}/delete

Delete R2 catalog metadata

operationId: `delete-catalog` · query: `force`

## POST /accounts/{account_id}/r2-catalog/{bucket_name}/disable

Disable R2 catalog

operationId: `disable-catalog`

## POST /accounts/{account_id}/r2-catalog/{bucket_name}/enable

Enable R2 bucket as a catalog

operationId: `enable-catalog`

**Request** (application/json)

- `credential`: object — Contains request to store catalog credentials.
  - `token`: string **required** — Provides the Cloudflare API token for accessing R2.

**Response** 200 → `result`

- `id`: string **required** — Use this to uniquely identify the activated catalog.
- `name`: string **required** — Specifies the name of the activated catalog.
