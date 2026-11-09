# AI Search Instances Items

9 endpoints.

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/items

Items List.

operationId: `ai-search-namespace-instance-list-items` · query: `page`, `per_page`, `search`, `sort_by`, `status`, `source`, `metadata_filter`, `item_id`, `key`

**Response** 200 → `result`

[array of]
- `checksum`: string **required**
- `chunks_count`: integer **required**
- `created_at`: string **required**
- `error`: string
- `file_size`: number **required**
- `id`: string **required**
- `key`: string **required**
- `last_seen_at`: string **required**
- `metadata`: object **required** — Built-in, configured filterable, and retained source metadata for the item.
- `namespace`: string **required**
- `next_action`: string **required** enum: `INDEX`, `DELETE`, `null`
- `source_id`: string **required** — Identifies which data source this item belongs to. "builtin" for uploaded files, "{type}:{source}" for external sources, null for legacy ite
- `status`: string **required** enum: `queued`, `running`, `completed`, `error`, `skipped`, `outdated`

## POST /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/items

Upload Item.

operationId: `ai-search-namespace-instance-upload-item`

**Request** (multipart/form-data)

- `file`: string **required** — The file to upload. Filename must not exceed 128 characters.
- `metadata`: string — JSON string of custom metadata key-value pairs.
- `wait_for_completion`: boolean default: `false` — Wait for indexing before responding. After processing, vector-indexed instances use any time remaining in a 25s wait budget to confirm Vecto

**Response** 200 → `result`

- `checksum`: string **required**
- `chunks_count`: integer **required**
- `created_at`: string **required**
- `error`: string
- `file_size`: number **required**
- `id`: string **required**
- `key`: string **required**
- `last_seen_at`: string **required**
- `metadata`: object **required** — Built-in, configured filterable, and retained source metadata for the item.
- `namespace`: string **required**
- `next_action`: string **required** enum: `INDEX`, `DELETE`, `null`
- `source_id`: string **required** — Identifies which data source this item belongs to. "builtin" for uploaded files, "{type}:{source}" for external sources, null for legacy ite
- `status`: string **required** enum: `queued`, `running`, `completed`, `error`, `skipped`, `outdated`
- `warnings`: object[]
  [array of]
  - `code`: string **required** enum: `custom_metadata_value_not_indexed`
  - `expected_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field`: string **required**

## PUT /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/items

Create or Update Item.

operationId: `ai-search-namespace-instance-create-or-update-item`

**Request** (application/json)

- `key`: string **required** — Item key / filename. Must not exceed 128 characters.
- `next_action`: string **required** enum: `INDEX`
- `wait_for_completion`: boolean default: `false` — Wait for indexing before responding. After processing, vector-indexed instances use any time remaining in a 25s wait budget to confirm Vecto

**Response** 200 → `result`

- `checksum`: string **required**
- `chunks_count`: integer **required**
- `created_at`: string **required**
- `error`: string
- `file_size`: number **required**
- `id`: string **required**
- `key`: string **required**
- `last_seen_at`: string **required**
- `metadata`: object **required** — Built-in, configured filterable, and retained source metadata for the item.
- `namespace`: string **required**
- `next_action`: string **required** enum: `INDEX`, `DELETE`, `null`
- `source_id`: string **required** — Identifies which data source this item belongs to. "builtin" for uploaded files, "{type}:{source}" for external sources, null for legacy ite
- `status`: string **required** enum: `queued`, `running`, `completed`, `error`, `skipped`, `outdated`

## DELETE /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/items/{item_id}

Delete Item.

operationId: `ai-search-namespace-instance-delete-item`

**Response** 200 → `result`

- `key`: string **required**

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/items/{item_id}

Get Item.

operationId: `ai-search-namespace-instance-get-item`

**Response** 200 → `result`

- `checksum`: string **required**
- `chunks_count`: integer **required**
- `created_at`: string **required**
- `error`: string
- `file_size`: number **required**
- `id`: string **required**
- `key`: string **required**
- `last_seen_at`: string **required**
- `metadata`: object **required** — Built-in, configured filterable, and retained source metadata for the item.
- `namespace`: string **required**
- `next_action`: string **required** enum: `INDEX`, `DELETE`, `null`
- `source_id`: string **required** — Identifies which data source this item belongs to. "builtin" for uploaded files, "{type}:{source}" for external sources, null for legacy ite
- `status`: string **required** enum: `queued`, `running`, `completed`, `error`, `skipped`, `outdated`

## PATCH /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/items/{item_id}

Sync Item.

operationId: `ai-search-namespace-instance-sync-item`

**Request** (application/json)

- `next_action`: string **required** enum: `INDEX`
- `wait_for_completion`: boolean default: `false` — Wait for indexing before responding. After processing, vector-indexed instances use any time remaining in a 25s wait budget to confirm Vecto

**Response** 200 → `result`

- `checksum`: string **required**
- `chunks_count`: integer **required**
- `created_at`: string **required**
- `error`: string
- `file_size`: number **required**
- `id`: string **required**
- `key`: string **required**
- `last_seen_at`: string **required**
- `metadata`: object **required** — Built-in, configured filterable, and retained source metadata for the item.
- `namespace`: string **required**
- `next_action`: string **required** enum: `INDEX`, `DELETE`, `null`
- `source_id`: string **required** — Identifies which data source this item belongs to. "builtin" for uploaded files, "{type}:{source}" for external sources, null for legacy ite
- `status`: string **required** enum: `queued`, `running`, `completed`, `error`, `skipped`, `outdated`

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/items/{item_id}/chunks

List Item Chunks.

operationId: `ai-search-namespace-instance-list-item-chunks` · query: `limit`, `offset`

**Response** 200 → `result`

[array of]
- `end_byte`: number
- `id`: string **required**
- `item`: object **required**
  - `key`: string **required**
  - `metadata`: object
  - `timestamp`: number
- `media_end_ms`: integer — Audio/video transcript chunks only: end, in milliseconds from the start of the media (whole seconds), of the last transcript section the chu
- `media_start_ms`: integer — Audio/video transcript chunks only: start, in milliseconds from the start of the media (whole seconds), of the transcript section the chunk 
- `source_media_type`: string enum: `audio`, `video` — Audio/video transcript chunks only: type of the source media file. Omitted for all other chunks.
- `start_byte`: number
- `text`: string **required**

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/items/{item_id}/download

Download Item Content.

operationId: `ai-search-namespace-instance-get-item-content`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/items/{item_id}/logs

Item Logs.

operationId: `ai-search-namespace-instance-logs-item` · query: `limit`, `cursor`

**Response** 200 → `result`

[array of]
- `action`: string **required**
- `chunkCount`: integer **required**
- `errorType`: string **required**
- `fileKey`: string **required**
- `message`: string **required**
- `processingTimeMs`: integer **required**
- `timestamp`: string **required**
