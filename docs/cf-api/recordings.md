# Recordings

6 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/recordings

Fetch all recordings for an App

operationId: `get_all_recordings` · query: `meeting_id`, `page_no`, `per_page`, `expired`, `search`, `sort_by`, `sort_order`, `start_time`, `end_time`, `status`

**Response** 200 → `result`

- `data`: object[] **required**
  [array]
- `paging`: object **required**
  - `end_offset`: number **required**
  - `start_offset`: number **required**
  - `total_count`: number **required**
- `success`: boolean **required**
- `data`: object[]
  [array of]
  - `audio_download_url`: string **required** — If the audio_config is passed, the URL for downloading the audio recording is returned.
  - `download_url`: string **required** — URL where the recording can be downloaded.
  - `download_url_expiry`: string **required** — Timestamp when the download URL expires.
  - `file_size`: number **required** — File size of the recording, in bytes.
  - `id`: string **required** — ID of the recording
  - `invoked_time`: string **required** — Timestamp when this recording was invoked.
  - `output_file_name`: string **required** — File name of the recording.
  - `recording_duration`: integer — Total recording time in seconds.
  - `session_id`: string **required** — ID of the meeting session this recording is for.
  - `started_time`: string **required** — Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.
  - `status`: string **required** enum: `INVOKED`, `RECORDING`, `UPLOADING`, `UPLOADED`, `ERRORED`, `PAUSED` — Current status of the recording.
  - `stopped_time`: string **required** — Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.
  - `storage_config`: object
    - `type`: any enum: `gcs`
  - `meeting`: object
    - `created_at`: string **required** — Timestamp the object was created at. The time is returned in ISO format.
    - `id`: string **required** — ID of the meeting.
    - `live_stream_on_start`: boolean — Specifies if the meeting should start getting livestreamed on start.
    - `persist_chat`: boolean — Specifies if Chat within a meeting should persist for a week.
    - `record_on_start`: boolean — Specifies if the meeting should start getting recorded as soon as someone joins the meeting.
    - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `session_keep_alive_time_in_secs`: number default: `60` — Time in seconds, for which a session remains active, after the last participant has left the meeting.
    - `status`: string enum: `ACTIVE`, `INACTIVE` — Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.
    - `summarize_on_end`: boolean — Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or su
    - `title`: string — Title of the meeting.
    - `transcribe_on_end`: boolean — Automatically generate transcripts when the meeting ends.
    - `updated_at`: string **required** — Timestamp the object was updated at. The time is returned in ISO format.

## POST /accounts/{account_id}/realtime/kit/{app_id}/recordings

Start recording a meeting

operationId: `start_recording`

**Request** (application/json)

- `allow_multiple_recordings`: boolean default: `false` — By default, a meeting allows only one recording to run at a time. Enabling the `allow_multiple_recordings` parameter to true allows you to i
- `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
  - `channel`: string enum: `mono`, `stereo` default: `stereo` — Audio signal pathway within an audio file that carries a specific sound source.
  - `codec`: string enum: `MP3`, `AAC` default: `AAC` — Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, 
  - `export_file`: boolean default: `true` — Controls whether to export audio file seperately
- `file_name_prefix`: string — Update the recording file name.
- `interactive_config`: object — Allows you to add timed metadata to your recordings, which are digital markers inserted into a video file to provide contextual information 
  - `type`: string enum: `ID3` — The metadata is presented in the form of ID3 tags.
- `max_seconds`: integer — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
- `meeting_id`: string **required** — ID of the meeting to record.
- `realtimekit_bucket_config`: object
  - `enabled`: boolean **required** — Controls whether recordings are uploaded to RealtimeKit's bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expir
- `rtmp_out_config`: object
  - `rtmp_url`: string — RTMP URL to stream to
- `storage_config`: object
  - `type`: any enum: `gcs`
- `url`: string — Pass a custom url to record arbitary screen
- `video_config`: object
  - `codec`: string enum: `H264`, `VP8`, `VP9` default: `H264` — Codec using which the recording will be encoded.
  - `export_file`: boolean default: `true` — Controls whether to export video file seperately
  - `height`: integer default: `720` — Height of the recording video in pixels
  - `watermark`: object — Watermark to be added to the recording
    - `position`: string enum: `left top`, `right top`, `left bottom`, `right bottom` default: `left top` — Position of the watermark
    - `size`: object — Size of the watermark
    - `url`: string — URL of the watermark image
  - `width`: integer default: `1280` — Width of the recording video in pixels

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any

## GET /accounts/{account_id}/realtime/kit/{app_id}/recordings/{recording_id}

Fetch details of a recording

operationId: `get_one_recording`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any

## PUT /accounts/{account_id}/realtime/kit/{app_id}/recordings/{recording_id}

Pause/Resume/Stop recording

operationId: `pause_resume_stop_recording`

**Request** (application/json)

- `action`: string **required** enum: `stop`, `pause`, `resume`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any

## GET /accounts/{account_id}/realtime/kit/{app_id}/recordings/active-recording/{meeting_id}

Fetch active recording

operationId: `get_active_recording`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object **required**
  - `audio_download_url`: string **required** — If the audio_config is passed, the URL for downloading the audio recording is returned.
  - `download_url`: string **required** — URL where the recording can be downloaded.
  - `download_url_expiry`: string **required** — Timestamp when the download URL expires.
  - `file_size`: number **required** — File size of the recording, in bytes.
  - `id`: string **required** — ID of the recording
  - `invoked_time`: string **required** — Timestamp when this recording was invoked.
  - `output_file_name`: string **required** — File name of the recording.
  - `recording_duration`: integer — Total recording time in seconds.
  - `session_id`: string **required** — ID of the meeting session this recording is for.
  - `started_time`: string **required** — Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.
  - `status`: string **required** enum: `INVOKED`, `RECORDING`, `UPLOADING`, `UPLOADED`, `ERRORED`, `PAUSED` — Current status of the recording.
  - `stopped_time`: string **required** — Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

## POST /accounts/{account_id}/realtime/kit/{app_id}/recordings/track

Start recording participant audio tracks

operationId: `startTrackRecordingForAMeeting`

**Request** (application/json)

- `layers`: object — Optional audio layer configuration. If omitted, RealtimeKit records all participant audio using the default file name prefix.
- `meeting_id`: string **required** — ID of the meeting to record.
- `user_ids`: string[] — Optional list of participant user IDs to record. Selective track recording (`user_ids`) is in early beta contact support to use this feature
  [array]

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object
  - `recording`: object **required**
    - `audio_download_url`: string **required** — If the audio_config is passed, the URL for downloading the audio recording is returned.
    - `download_url`: string **required** — URL where the recording can be downloaded.
    - `download_url_expiry`: string **required** — Timestamp when the download URL expires.
    - `file_size`: number **required** — File size of the recording, in bytes.
    - `id`: string **required** — ID of the recording
    - `invoked_time`: string **required** — Timestamp when this recording was invoked.
    - `output_file_name`: string **required** — File name of the recording.
    - `recording_duration`: integer — Total recording time in seconds.
    - `session_id`: string **required** — ID of the meeting session this recording is for.
    - `started_time`: string **required** — Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.
    - `status`: string **required** enum: `INVOKED`, `RECORDING`, `UPLOADING`, `UPLOADED`, `ERRORED`, `PAUSED` — Current status of the recording.
    - `stopped_time`: string **required** — Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.
