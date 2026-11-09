# Stream MP4 Downloads

5 endpoints.

## DELETE /accounts/{account_id}/stream/{identifier}/downloads

Delete downloads

operationId: `stream-mp4-downloads-delete-downloads`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/stream/{identifier}/downloads

List downloads

operationId: `stream-mp4-downloads-list-downloads`

**Response** 200 → `result`

- `audio`: any — The audio-only download. Only present if this download type has been created.
- `default`: any — The default video download. Only present if this download type has been created.

## POST /accounts/{account_id}/stream/{identifier}/downloads

Create downloads

operationId: `stream-mp4-downloads-create-downloads`

**Response** 200 → `result`

- `audio`: any — The audio-only download. Only present if this download type has been created.
- `default`: any — The default video download. Only present if this download type has been created.

## DELETE /accounts/{account_id}/stream/{identifier}/downloads/{download_type}

Delete download

operationId: `stream-downloads-delete-type-specific-downloads`

**Response** 200 → `result`

string

## POST /accounts/{account_id}/stream/{identifier}/downloads/{download_type}

Create download

operationId: `stream-downloads-create-type-specific-downloads`

**Response** 200 → `result`

- `audio`: any — The audio-only download. Only present if this download type has been created.
- `default`: any — The default video download. Only present if this download type has been created.
