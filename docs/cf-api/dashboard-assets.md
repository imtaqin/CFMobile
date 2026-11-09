# Dashboard Assets

3 endpoints.

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/{request_id}/assets/{asset_id}/download

Download asset (Customer)

operationId: `get_DashboardAssetDownload`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/{request_id}/assets/list

List assets in request (Customer)

operationId: `get_DashboardAssetList`

**Response** 200 → `result`

- `properties`: object **required**
  - `assets`: object **required**
    - `items`: object **required**
    - `type`: string **required**
  - `count`: object **required**
    - `type`: string **required**
- `type`: string **required**

## POST /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/{request_id}/assets/upload

Upload asset to request (Customer)

operationId: `post_DashboardAssetUpload`

**Request** (multipart/form-data)

- `description`: string — Optional description of the asset
- `file`: string — The file to upload (can also use 'source')
- `metadata`: string — Optional JSON string of key-value pairs (e.g., '{"key1":"value1"}')
- `source`: string — The file to upload (can also use 'file')

**Response** 200 → `result`

- `properties`: object **required**
  - `contentType`: object **required**
    - `type`: string **required**
  - `downloadable`: object **required**
    - `description`: string **required**
    - `type`: string **required**
  - `expiresAt`: object **required**
    - `nullable`: boolean **required**
    - `type`: string **required**
  - `fileName`: object **required**
    - `type`: string **required**
  - `fileSize`: object **required**
    - `type`: string **required**
  - `id`: object **required**
    - `type`: string **required**
  - `is_cloudflare_team`: object **required**
    - `description`: string **required**
    - `type`: string **required**
  - `metadata`: object **required**
    - `additionalProperties`: object **required**
    - `nullable`: boolean **required**
    - `type`: string **required**
  - `origin`: object **required**
    - `type`: string **required**
  - `state`: object **required**
    - `type`: string **required**
  - `tlp`: object **required**
    - `enum`: string[] **required**
    - `type`: string **required**
  - `uploadedAt`: object **required**
    - `type`: string **required**
- `type`: string **required**
