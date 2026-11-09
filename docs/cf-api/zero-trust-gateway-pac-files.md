# Zero Trust Gateway PAC files

5 endpoints.

## GET /accounts/{account_id}/gateway/pacfiles

List PAC files

operationId: `zero-trust-gateway-pacfiles-list` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: string
- `description`: string — Detailed description of the PAC file.
- `id`: string
- `name`: string — Name of the PAC file.
- `slug`: string — URL-friendly version of the PAC file name.
- `updated_at`: string
- `url`: string — Unique URL to download the PAC file.

## POST /accounts/{account_id}/gateway/pacfiles

Create a PAC file

operationId: `zero-trust-gateway-pacfiles-create-pacfile`

**Request** (application/json)

- `contents`: string **required** — Actual contents of the PAC file
- `description`: string — Detailed description of the PAC file.
- `name`: string **required** — Name of the PAC file.
- `slug`: string — URL-friendly version of the PAC file name. If not provided, it will be auto-generated

**Response** 200 → `result`

- `contents`: string — Actual contents of the PAC file
- `created_at`: string
- `description`: string — Detailed description of the PAC file.
- `id`: string
- `name`: string — Name of the PAC file.
- `slug`: string — URL-friendly version of the PAC file name.
- `updated_at`: string
- `url`: string — Unique URL to download the PAC file.

## DELETE /accounts/{account_id}/gateway/pacfiles/{pacfile_id}

Delete a PAC file

operationId: `zero-trust-gateway-pacfiles-delete`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/gateway/pacfiles/{pacfile_id}

Get a PAC file

operationId: `zero-trust-gateway-pacfiles-details`

**Response** 200 → `result`

- `contents`: string — Actual contents of the PAC file
- `created_at`: string
- `description`: string — Detailed description of the PAC file.
- `id`: string
- `name`: string — Name of the PAC file.
- `slug`: string — URL-friendly version of the PAC file name.
- `updated_at`: string
- `url`: string — Unique URL to download the PAC file.

## PUT /accounts/{account_id}/gateway/pacfiles/{pacfile_id}

Update a Zero Trust Gateway PAC file

operationId: `zero-trust-gateway-pacfiles-update`

**Request** (application/json)

- `contents`: string **required** — Actual contents of the PAC file
- `description`: string **required** — Detailed description of the PAC file.
- `name`: string **required** — Name of the PAC file.

**Response** 200 → `result`

- `contents`: string — Actual contents of the PAC file
- `created_at`: string
- `description`: string — Detailed description of the PAC file.
- `id`: string
- `name`: string — Name of the PAC file.
- `slug`: string — URL-friendly version of the PAC file name.
- `updated_at`: string
- `url`: string — Unique URL to download the PAC file.
