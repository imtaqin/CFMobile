# Stream Videos

10 endpoints.

## GET /accounts/{account_id}/stream

List videos

operationId: `stream-videos-list-videos` · query: `status`, `creator`, `type`, `asc`, `video_name`, `search`, `start`, `end`, `include_counts`, `id`, `name`, `live_input_id`, `before`, `after`, `limit`

## POST /accounts/{account_id}/stream

Initiate video uploads using TUS

operationId: `stream-videos-initiate-video-uploads-using-tus` · query: `direct_user`

## DELETE /accounts/{account_id}/stream/{identifier}

Delete video

operationId: `stream-videos-delete-video`

## GET /accounts/{account_id}/stream/{identifier}

Retrieve video details

operationId: `stream-videos-retrieve-video-details`

## POST /accounts/{account_id}/stream/{identifier}

Edit video details

operationId: `stream-videos-update-video-details`

## GET /accounts/{account_id}/stream/{identifier}/embed

Retrieve embed Code HTML

operationId: `stream-videos-retreieve-embed-code-html`

## POST /accounts/{account_id}/stream/{identifier}/token

Create signed URL tokens for videos

operationId: `stream-videos-create-signed-url-tokens-for-videos`

## POST /accounts/{account_id}/stream/copy

Upload videos from a URL

operationId: `stream-videos-upload-videos-from-a-url`

## POST /accounts/{account_id}/stream/direct_upload

Upload videos via direct upload URLs

operationId: `stream-videos-upload-videos-via-direct-upload-ur-ls`

## GET /accounts/{account_id}/stream/storage-usage

Storage use

operationId: `stream-videos-storage-usage` · query: `creator`
