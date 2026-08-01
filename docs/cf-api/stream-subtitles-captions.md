# Stream Subtitles/Captions

6 endpoints.

## GET /accounts/{account_id}/stream/{identifier}/captions

List captions or subtitles

operationId: `stream-subtitles/-captions-list-captions-or-subtitles`

## DELETE /accounts/{account_id}/stream/{identifier}/captions/{language}

Delete captions or subtitles

operationId: `stream-subtitles/-captions-delete-captions-or-subtitles`

## GET /accounts/{account_id}/stream/{identifier}/captions/{language}

List captions or subtitles for a provided language

operationId: `stream-subtitles/-captions-get-caption-or-subtitle-for-language`

## PUT /accounts/{account_id}/stream/{identifier}/captions/{language}

Upload captions or subtitles

operationId: `stream-subtitles/-captions-upload-captions-or-subtitles`

## POST /accounts/{account_id}/stream/{identifier}/captions/{language}/generate

Generate captions or subtitles for a provided language via AI

operationId: `stream-subtitles/-captions-generate-caption-or-subtitle-for-language`

## GET /accounts/{account_id}/stream/{identifier}/captions/{language}/vtt

Return WebVTT captions for a provided language

operationId: `stream-subtitles/-captions-get-vtt-caption-or-subtitle`
