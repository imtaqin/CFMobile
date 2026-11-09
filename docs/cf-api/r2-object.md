# R2 Object

5 endpoints.

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/objects

Delete Objects

operationId: `r2-delete-objects` · query: `prefix`

**Request** (application/json)

[array of]
string

**Response** 200 → `result`

[array of]
- `key`: string — The key (name) of the deleted object.

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/objects

List Objects

operationId: `r2-list-objects` · query: `per_page`, `prefix`, `delimiter`, `cursor`, `start_after`

**Response** 200 → `result`

[array of]
- `custom_metadata`: object — Custom metadata key-value pairs associated with the object.
- `etag`: string — The entity tag for the object. In JSON list/get responses this is the raw
- `http_metadata`: object — HTTP metadata associated with an R2 object.
  - `cacheControl`: string — Specifies caching behavior for the object.
  - `cacheExpiry`: string — The date and time at which the object's cache entry expires.
  - `contentDisposition`: string — Specifies presentational information for the object.
  - `contentEncoding`: string — Specifies the content encoding applied to the object.
  - `contentLanguage`: string — The language of the object content.
  - `contentType`: string — The MIME type of the object.
- `key`: string — The object key (name).
- `last_modified`: string — The date and time the object was last modified.
- `size`: integer — The size of the object in bytes.
- `ssec`: boolean — Whether the object is encrypted with a customer-supplied encryption key.
- `storage_class`: string enum: `Standard`, `InfrequentAccess` default: `Standard` — Storage class for newly uploaded objects, unless specified otherwise.

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}

Delete Object

operationId: `r2-delete-object`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}

Get Object

operationId: `r2-get-object`

**Response** 200 → `result`

string

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}

Upload Object

operationId: `r2-put-object`

**Request** (application/octet-stream)

string

**Response** 200 → `result`

object
