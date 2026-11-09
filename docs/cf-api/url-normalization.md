# URL Normalization

3 endpoints.

## DELETE /zones/{zone_id}/url_normalization

Delete URL Normalization settings

operationId: `deleteUrlNormalization`

## GET /zones/{zone_id}/url_normalization

Get URL Normalization settings

operationId: `getUrlNormalization`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## PUT /zones/{zone_id}/url_normalization

Update URL Normalization settings

operationId: `updateUrlNormalization`

**Request** (application/json)

- `scope`: string **required** enum: `incoming`, `both`, `none` — The scope of the URL normalization.
- `type`: string **required** enum: `cloudflare`, `rfc3986` — The type of URL normalization performed by Cloudflare.

**Response** 200 → `result`

(one of 5 variants; showing the first)
object
