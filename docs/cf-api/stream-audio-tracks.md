# Stream Audio Tracks

4 endpoints.

## GET /accounts/{account_id}/stream/{identifier}/audio

List additional audio tracks on a video

operationId: `list-audio-tracks`

## DELETE /accounts/{account_id}/stream/{identifier}/audio/{audio_identifier}

Delete additional audio tracks on a video

operationId: `delete-audio-tracks`

## PATCH /accounts/{account_id}/stream/{identifier}/audio/{audio_identifier}

Edit additional audio tracks on a video

operationId: `edit-audio-tracks`

## POST /accounts/{account_id}/stream/{identifier}/audio/copy

Add audio tracks to a video

operationId: `add-audio-track`
