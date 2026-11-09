# Custom assets for an account

5 endpoints.

## GET /accounts/{account_id}/custom_pages/assets

List custom assets

operationId: `custom-assets-for-an-account-list-custom-assets` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `description`: string — A short description of the custom asset.
- `last_updated`: string
- `name`: string — The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).
- `size_bytes`: integer — The size of the asset content in bytes.
- `url`: string — The URL where the asset content is fetched from.

## POST /accounts/{account_id}/custom_pages/assets

Create a custom asset

operationId: `custom-assets-for-an-account-create-a-custom-asset`

**Request** (application/json)

- `description`: string **required** — A short description of the custom asset.
- `name`: string **required** — The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).
- `url`: string **required** — The URL where the asset content is fetched from.

**Response** 200 → `result`

- `description`: string — A short description of the custom asset.
- `last_updated`: string
- `name`: string — The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).
- `size_bytes`: integer — The size of the asset content in bytes.
- `url`: string — The URL where the asset content is fetched from.

## DELETE /accounts/{account_id}/custom_pages/assets/{asset_name}

Delete a custom asset

operationId: `custom-assets-for-an-account-delete-a-custom-asset`

## GET /accounts/{account_id}/custom_pages/assets/{asset_name}

Get a custom asset

operationId: `custom-assets-for-an-account-get-a-custom-asset`

**Response** 200 → `result`

- `description`: string — A short description of the custom asset.
- `last_updated`: string
- `name`: string — The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).
- `size_bytes`: integer — The size of the asset content in bytes.
- `url`: string — The URL where the asset content is fetched from.

## PUT /accounts/{account_id}/custom_pages/assets/{asset_name}

Update a custom asset

operationId: `custom-assets-for-an-account-update-a-custom-asset`

**Request** (application/json)

- `description`: string **required** — A short description of the custom asset.
- `url`: string **required** — The URL where the asset content is fetched from.

**Response** 200 → `result`

- `description`: string — A short description of the custom asset.
- `last_updated`: string
- `name`: string — The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).
- `size_bytes`: integer — The size of the asset content in bytes.
- `url`: string — The URL where the asset content is fetched from.
