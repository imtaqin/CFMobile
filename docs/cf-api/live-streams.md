# Live streams

11 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/daywise

Fetch day-wise analytics data for your livestreams

operationId: `get-livestream-analytics-daywise` · query: `start_time`, `end_time`, `filters`

**Response** 200 → `result`

- `data`: object[]
  [array of]
  - `count`: integer — Count of total livestream sessions.
  - `date`: string — Analytics date.
  - `total_ingest_seconds`: number — Total time duration for which the input was given or the meeting was streamed.
  - `total_viewer_seconds`: number — Total view time for which the viewers watched the stream.
- `success`: boolean

## GET /accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/overall

Fetch complete analytics data for your livestreams

operationId: `get-livestream-analytics-complete` · query: `start_time`, `end_time`, `filters`

**Response** 200 → `result`

- `data`: object
  - `count`: integer — Count of total livestreams.
  - `total_ingest_seconds`: number — Total time duration for which the input was given or the meeting was streamed.
  - `total_viewer_seconds`: number — Total view time for which the viewers watched the stream.
- `success`: boolean

## GET /accounts/{account_id}/realtime/kit/{app_id}/livestreams

Fetch all livestreams

operationId: `fetch_all_livestreams` · query: `exclude_meetings`, `per_page`, `page_no`, `status`, `start_time`, `end_time`, `sort_order`

**Response** 200 → `result`

- `data`: object[] **required**
  [array of]
  - `created_at`: string **required** — Timestamp the livestream was created at, in ISO format.
  - `disabled`: boolean **required** — Specifies if the livestream is disabled.
  - `external_id`: string **required** — ID of the underlying Cloudflare Stream live input.
  - `id`: string **required** — ID of the livestream.
  - `ingest_server`: string **required** — The server URL to which the RTMP encoder sends the video and audio data.
  - `manual_ingest`: boolean **required** — Specifies if the livestream is ingested manually by an RTMP encoder.
  - `meeting_id`: string **required** — ID of the meeting being livestreamed, if any.
  - `name`: string **required** — Name of the livestream.
  - `playback_url`: string **required** — The web address that viewers can use to watch the livestream.
  - `status`: string **required** enum: `LIVE`, `IDLE`, `ERRORED`, `INVOKED`, `METRICS_READY` — Status of the livestream.
  - `stream_key`: string **required** — Unique key for accessing each livestream. Empty if the livestream is disabled.
  - `updated_at`: string **required** — Timestamp the livestream was last updated at, in ISO format.
- `paging`: object **required**
  - `end_offset`: number **required**
  - `start_offset`: number **required**
  - `total_count`: number **required**
- `success`: boolean **required**

## GET /accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}

Fetch livestream details using livestream ID

operationId: `get-v2-livestream-session-livestream-id` · query: `page_no`, `per_page`

**Response** 200 → `result`

- `data`: object **required**
  - `livestream`: object **required**
    - `created_at`: string **required** — Timestamp the livestream was created at, in ISO format.
    - `disabled`: boolean **required** — Specifies if the livestream is disabled.
    - `external_id`: string **required** — ID of the underlying Cloudflare Stream live input.
    - `id`: string **required** — ID of the livestream.
    - `ingest_server`: string **required** — The server URL to which the RTMP encoder sends the video and audio data.
    - `manual_ingest`: boolean **required** — Specifies if the livestream is ingested manually by an RTMP encoder.
    - `meeting_id`: string **required** — ID of the meeting being livestreamed, if any.
    - `name`: string **required** — Name of the livestream.
    - `playback_url`: string **required** — The web address that viewers can use to watch the livestream.
    - `status`: string **required** enum: `LIVE`, `IDLE`, `ERRORED`, `INVOKED`, `METRICS_READY` — Status of the livestream.
    - `stream_key`: string **required** — Unique key for accessing each livestream. Empty if the livestream is disabled.
    - `updated_at`: string **required** — Timestamp the livestream was last updated at, in ISO format.
  - `sessions`: object[] **required**
    [array of]
    - `created_at`: string **required** — Timestamp the livestream session was created at, in ISO format.
    - `err_message`: string **required** — Error message, if the livestream session failed.
    - `id`: string **required** — ID of the livestream session.
    - `ingest_seconds`: number **required** — The time duration for which the input was given or the meeting was streamed.
    - `invoked_time`: string **required** — Timestamp the livestream session was invoked at, in ISO format.
    - `livestream_id`: string **required** — ID of the livestream.
    - `started_time`: string **required** — Timestamp the livestream session started at, in ISO format.
    - `stopped_time`: string **required** — Timestamp the livestream session stopped at, in ISO format.
    - `updated_at`: string **required** — Timestamp the livestream session was last updated at, in ISO format.
    - `viewer_seconds`: number **required** — The total view time for which the viewers watched the stream.
- `paging`: object **required**
  - `end_offset`: number **required**
  - `start_offset`: number **required**
  - `total_count`: number **required**
- `success`: boolean **required**

## GET /accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}/active-livestream-session

Fetch active livestream session details

operationId: `get-v2-active-livestream-session-details`

**Response** 200 → `result`

- `data`: object **required**
  - `livestream`: object **required**
    - `created_at`: string **required** — Timestamp the livestream was created at, in ISO format.
    - `disabled`: boolean **required** — Specifies if the livestream is disabled.
    - `external_id`: string **required** — ID of the underlying Cloudflare Stream live input.
    - `id`: string **required** — ID of the livestream.
    - `ingest_server`: string **required** — The server URL to which the RTMP encoder sends the video and audio data.
    - `manual_ingest`: boolean **required** — Specifies if the livestream is ingested manually by an RTMP encoder.
    - `meeting_id`: string **required** — ID of the meeting being livestreamed, if any.
    - `name`: string **required** — Name of the livestream.
    - `playback_url`: string **required** — The web address that viewers can use to watch the livestream.
    - `status`: string **required** enum: `LIVE`, `IDLE`, `ERRORED`, `INVOKED`, `METRICS_READY` — Status of the livestream.
    - `stream_key`: string **required** — Unique key for accessing each livestream. Empty if the livestream is disabled.
    - `updated_at`: string **required** — Timestamp the livestream was last updated at, in ISO format.
  - `session`: object **required**
    - `created_at`: string **required** — Timestamp the livestream session was created at, in ISO format.
    - `err_message`: string **required** — Error message, if the livestream session failed.
    - `id`: string **required** — ID of the livestream session.
    - `ingest_seconds`: number **required** — The time duration for which the input was given or the meeting was streamed.
    - `invoked_time`: string **required** — Timestamp the livestream session was invoked at, in ISO format.
    - `livestream_id`: string **required** — ID of the livestream.
    - `started_time`: string **required** — Timestamp the livestream session started at, in ISO format.
    - `stopped_time`: string **required** — Timestamp the livestream session stopped at, in ISO format.
    - `updated_at`: string **required** — Timestamp the livestream session was last updated at, in ISO format.
    - `viewer_seconds`: number **required** — The total view time for which the viewers watched the stream.
- `success`: boolean **required**

## GET /accounts/{account_id}/realtime/kit/{app_id}/livestreams/sessions/{livestream-session-id}

Fetch livestream session details using livestream session ID

operationId: `get-v2-livestreams-livestream-session-id`

**Response** 200 → `result`

- `data`: object **required**
  - `created_at`: string **required** — Timestamp the livestream session was created at, in ISO format.
  - `err_message`: string **required** — Error message, if the livestream session failed.
  - `id`: string **required** — ID of the livestream session.
  - `ingest_seconds`: number **required** — The time duration for which the input was given or the meeting was streamed.
  - `invoked_time`: string **required** — Timestamp the livestream session was invoked at, in ISO format.
  - `livestream_id`: string **required** — ID of the livestream.
  - `started_time`: string **required** — Timestamp the livestream session started at, in ISO format.
  - `stopped_time`: string **required** — Timestamp the livestream session stopped at, in ISO format.
  - `updated_at`: string **required** — Timestamp the livestream session was last updated at, in ISO format.
  - `viewer_seconds`: number **required** — The total view time for which the viewers watched the stream.
- `success`: boolean **required**

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream

Fetch active livestreams for a meeting

operationId: `get-v2-meetings-meetingId-active-livestream`

**Response** 200 → `result`

- `data`: object **required**
  - `created_at`: string **required** — Timestamp the livestream was created at, in ISO format.
  - `disabled`: boolean **required** — Specifies if the livestream is disabled.
  - `external_id`: string **required** — ID of the underlying Cloudflare Stream live input.
  - `id`: string **required** — ID of the livestream.
  - `ingest_server`: string **required** — The server URL to which the RTMP encoder sends the video and audio data.
  - `manual_ingest`: boolean **required** — Specifies if the livestream is ingested manually by an RTMP encoder.
  - `meeting_id`: string **required** — ID of the meeting being livestreamed, if any.
  - `name`: string **required** — Name of the livestream.
  - `playback_url`: string **required** — The web address that viewers can use to watch the livestream.
  - `status`: string **required** enum: `LIVE`, `IDLE`, `ERRORED`, `INVOKED`, `METRICS_READY` — Status of the livestream.
  - `stream_key`: string **required** — Unique key for accessing each livestream. Empty if the livestream is disabled.
  - `updated_at`: string **required** — Timestamp the livestream was last updated at, in ISO format.
- `success`: boolean **required**

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream/stop

Stop livestreaming a meeting

operationId: `stop_livestreaming`

**Response** 200 → `result`

- `data`: object
  - `message`: string
- `success`: boolean

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/livestream

Fetch livestream session details for a meeting

operationId: `livestream-session-details` · query: `page_no`, `per_page`

**Response** 200 → `result`

- `data`: object **required**
  - `data`: object **required**
    - `livestream`: object **required**
    - `sessions`: object[] **required**
  - `paging`: object **required**
    - `end_offset`: number **required**
    - `start_offset`: number **required**
    - `total_count`: number **required**
- `success`: boolean **required**

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/livestreams

Start livestreaming a meeting

operationId: `start-livestreaming`

**Request** (application/json)

- `name`: string
- `video_config`: object
  - `height`: integer — Height of the livestreaming video in pixels
  - `width`: integer — Width of the livestreaming video in pixels

**Response** 201 → `result`

- `data`: object **required**
  - `id`: string **required** — ID of the livestream.
  - `ingest_server`: string **required** — The server URL to which the RTMP encoder sends the video and audio data.
  - `meeting_id`: string **required** — ID of the meeting being livestreamed, if any.
  - `name`: string **required** — Name of the livestream.
  - `playback_url`: string **required** — The web address that viewers can use to watch the livestream.
  - `status`: string **required** enum: `LIVE`, `IDLE`, `ERRORED`, `INVOKED`, `METRICS_READY` — Status of the livestream.
  - `stream_key`: string **required** — Unique key for accessing each livestream. Empty if the livestream is disabled.
- `success`: boolean **required**

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/livestream-sessions

Fetch livestream session details using a session ID

operationId: `get-v2-livestreamsession-session-meetingId-active-livestream` · query: `per_page`, `page_no`

**Response** 200 → `result`

- `data`: object **required**
  - `data`: object[] **required**
    [array of]
    - `created_at`: string **required** — Timestamp the livestream session was created at, in ISO format.
    - `err_message`: string **required** — Error message, if the livestream session failed.
    - `id`: string **required** — ID of the livestream session.
    - `ingest_seconds`: number **required** — The time duration for which the input was given or the meeting was streamed.
    - `invoked_time`: string **required** — Timestamp the livestream session was invoked at, in ISO format.
    - `livestream_id`: string **required** — ID of the livestream.
    - `started_time`: string **required** — Timestamp the livestream session started at, in ISO format.
    - `stopped_time`: string **required** — Timestamp the livestream session stopped at, in ISO format.
    - `updated_at`: string **required** — Timestamp the livestream session was last updated at, in ISO format.
    - `viewer_seconds`: number **required** — The total view time for which the viewers watched the stream.
  - `paging`: object **required**
    - `end_offset`: number **required**
    - `start_offset`: number **required**
    - `total_count`: number **required**
- `success`: boolean **required**
