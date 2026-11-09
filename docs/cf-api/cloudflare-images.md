# Cloudflare Images

11 endpoints.

## GET /accounts/{account_id}/images/v1

List images

operationId: `cloudflare-images-list-images` · query: `page`, `per_page`, `creator`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/images/v1

Upload an image

operationId: `cloudflare-images-upload-an-image-via-url`

**Request** (multipart/form-data)

- `creator`: string — Can set the creator field with an internal user ID.
- `file`: string — An image binary data. Only needed when type is uploading a file.
- `id`: string — An optional custom unique identifier for your image.
- `metadata`: object — User modifiable key-value store. Can use used for keeping references to another system of record for managing images.
- `requireSignedURLs`: boolean default: `false` — Indicates whether the image requires a signature token for the access.
- `url`: string — A URL to fetch an image from origin. Only needed when type is uploading from a URL.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/images/v1/{image_id}

Delete image

operationId: `cloudflare-images-delete-image`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/images/v1/{image_id}

Image details

operationId: `cloudflare-images-image-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/images/v1/{image_id}

Update image

operationId: `cloudflare-images-update-image`

**Request** (application/json)

- `creator`: string — Can set the creator field with an internal user ID.
- `metadata`: object — User modifiable key-value store. Can be used for keeping references to another system of record for managing images. No change if not specif
- `requireSignedURLs`: boolean — Indicates whether the image can be accessed using only its UID. If set to `true`, a signed token needs to be generated with a signing key to

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/images/v1/{image_id}/blob

Download image

operationId: `cloudflare-images-base-image`

**Response** 200 → `result`

string

## POST /accounts/{account_id}/images/v1/direct_upload

Create authenticated direct upload URL V1

operationId: `cloudflare-images-create-authenticated-direct-upload-url-v-1`

**Request** (application/json)

- `expiry`: string — The date after which the upload will not be accepted. Minimum: Now + 2 minutes. Maximum: Now + 6 hours.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/images/v1/stats

Images usage statistics

operationId: `cloudflare-images-images-usage-statistics`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/images/v2

List images V2

operationId: `cloudflare-images-list-images-v2` · query: `continuation_token`, `per_page`, `sort_order`, `creator`, `meta.<field>[<operator>]`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/images/v2/direct_upload

Create authenticated direct upload URL V2

operationId: `cloudflare-images-create-authenticated-direct-upload-url-v-2`

**Request** (multipart/form-data)

- `creator`: string — Can set the creator field with an internal user ID.
- `expiry`: string default: `Now + 30 minutes` — The date after which the upload will not be accepted. Minimum: Now + 2 minutes. Maximum: Now + 6 hours.
- `id`: string — Optional Image Custom ID. Up to 1024 chars. Can include any number of subpaths, and utf8 characters. Cannot start nor end with a / (forward 
- `metadata`: object — User modifiable key-value store. Can be used for keeping references to another system of record, for managing images.
- `requireSignedURLs`: boolean default: `false` — Indicates whether the image requires a signature token to be accessed.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/images/v2/metadata/keys

List image metadata keys

operationId: `cloudflare-images-list-metadata-keys`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
