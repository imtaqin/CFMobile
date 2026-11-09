# Meetings

13 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings

Fetch all meetings for an App

operationId: `get_all_meetings` · query: `page_no`, `per_page`, `start_time`, `end_time`, `search`, `status`

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
  - `created_at`: string **required** — Timestamp the object was created at. The time is returned in ISO format.
  - `id`: string **required** — ID of the meeting.
  - `live_stream_on_start`: boolean — Specifies if the meeting should start getting livestreamed on start.
  - `persist_chat`: boolean — Specifies if Chat within a meeting should persist for a week.
  - `record_on_start`: boolean — Specifies if the meeting should start getting recorded as soon as someone joins the meeting.
  - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
    - `live_streaming_config`: object
    - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
    - `realtimekit_bucket_config`: object
    - `storage_config`: object
    - `video_config`: object
  - `session_keep_alive_time_in_secs`: number default: `60` — Time in seconds, for which a session remains active, after the last participant has left the meeting.
  - `status`: string enum: `ACTIVE`, `INACTIVE` — Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.
  - `summarize_on_end`: boolean — Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or su
  - `title`: string — Title of the meeting.
  - `transcribe_on_end`: boolean — Automatically generate transcripts when the meeting ends.
  - `updated_at`: string **required** — Timestamp the object was updated at. The time is returned in ISO format.

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings

Create a meeting

operationId: `create_meeting`

**Request** (application/json)

- `ai_config`: object — The AI Config allows you to customize the behavior of meeting transcriptions and summaries
  - `summarization`: object — Summary Config
    - `summary_type`: string enum: `general`, `team_meeting`, `sales_call`, `client_check_in`, `interview`, `daily_standup`, `one_on_one_meeting`, `lecture` default: `general` — Defines the style of the summary, such as general, team meeting, or sales call.
    - `text_format`: string enum: `plain_text`, `markdown` default: `markdown` — Determines the text format of the summary, such as plain text or markdown.
    - `word_limit`: integer default: `500` — Sets the maximum number of words in the meeting summary.
  - `transcription`: object — Transcription Configurations
    - `keywords`: string[] — Adds specific terms to improve accurate detection during transcription.
    - `language`: string enum: `en-US`, `en-IN`, `de`, `hi`, `sv`, `ru`, `pl`, `el` — Specifies the language code for transcription to ensure accurate results. If omitted, the language is auto-detected for post-meeting (Whispe
    - `profanity_filter`: boolean default: `false` — Control the inclusion of offensive language in transcriptions.
- `live_stream_on_start`: boolean default: `false` — Specifies if the meeting should start getting livestreamed on start.
- `persist_chat`: boolean default: `false` — If a meeting is set to persist_chat, meeting chat would remain for a week within the meeting space.
- `record_on_start`: boolean default: `false` — Specifies if the meeting should start getting recorded as soon as someone joins the meeting.
- `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
  - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `channel`: string enum: `mono`, `stereo` default: `stereo` — Audio signal pathway within an audio file that carries a specific sound source.
    - `codec`: string enum: `MP3`, `AAC` default: `AAC` — Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, 
    - `export_file`: boolean default: `true` — Controls whether to export audio file seperately
  - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
  - `live_streaming_config`: object
    - `rtmp_url`: string — RTMP URL to stream to
  - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
  - `realtimekit_bucket_config`: object
    - `enabled`: boolean **required** — Controls whether recordings are uploaded to RealtimeKit's bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expir
  - `storage_config`: object
    - `type`: any enum: `gcs`
  - `video_config`: object
    - `codec`: string enum: `H264`, `VP8`, `VP9` default: `H264` — Codec using which the recording will be encoded.
    - `export_file`: boolean default: `true` — Controls whether to export video file seperately
    - `height`: integer default: `720` — Height of the recording video in pixels
    - `watermark`: object — Watermark to be added to the recording
    - `width`: integer default: `1280` — Width of the recording video in pixels
- `session_keep_alive_time_in_secs`: number default: `60` — Time in seconds, for which a session remains active, after the last participant has left the meeting.
- `summarize_on_end`: boolean default: `false` — Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or su
- `title`: string — Title of the meeting
- `transcribe_on_end`: boolean default: `false` — Automatically generate transcripts when the meeting ends.

**Response** 201 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object
  - `created_at`: string **required** — Timestamp the object was created at. The time is returned in ISO format.
  - `id`: string **required** — ID of the meeting.
  - `live_stream_on_start`: boolean — Specifies if the meeting should start getting livestreamed on start.
  - `persist_chat`: boolean — Specifies if Chat within a meeting should persist for a week.
  - `record_on_start`: boolean — Specifies if the meeting should start getting recorded as soon as someone joins the meeting.
  - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
    - `live_streaming_config`: object
    - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
    - `realtimekit_bucket_config`: object
    - `storage_config`: object
    - `video_config`: object
  - `session_keep_alive_time_in_secs`: number default: `60` — Time in seconds, for which a session remains active, after the last participant has left the meeting.
  - `status`: string enum: `ACTIVE`, `INACTIVE` — Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.
  - `summarize_on_end`: boolean — Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or su
  - `title`: string — Title of the meeting.
  - `transcribe_on_end`: boolean — Automatically generate transcripts when the meeting ends.
  - `updated_at`: string **required** — Timestamp the object was updated at. The time is returned in ISO format.
- `data`: object
  - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
    - `live_streaming_config`: object
    - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
    - `realtimekit_bucket_config`: object
    - `storage_config`: object
    - `video_config`: object
- `data`: object
  - `ai_config`: object — The AI Config allows you to customize the behavior of meeting transcriptions and summaries
    - `summarization`: object — Summary Config
    - `transcription`: object — Transcription Configurations

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}

Fetch a meeting for an App

operationId: `get_meeting` · query: `name`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object
  - `created_at`: string **required** — Timestamp the object was created at. The time is returned in ISO format.
  - `id`: string **required** — ID of the meeting.
  - `live_stream_on_start`: boolean — Specifies if the meeting should start getting livestreamed on start.
  - `persist_chat`: boolean — Specifies if Chat within a meeting should persist for a week.
  - `record_on_start`: boolean — Specifies if the meeting should start getting recorded as soon as someone joins the meeting.
  - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
    - `live_streaming_config`: object
    - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
    - `realtimekit_bucket_config`: object
    - `storage_config`: object
    - `video_config`: object
  - `session_keep_alive_time_in_secs`: number default: `60` — Time in seconds, for which a session remains active, after the last participant has left the meeting.
  - `status`: string enum: `ACTIVE`, `INACTIVE` — Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.
  - `summarize_on_end`: boolean — Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or su
  - `title`: string — Title of the meeting.
  - `transcribe_on_end`: boolean — Automatically generate transcripts when the meeting ends.
  - `updated_at`: string **required** — Timestamp the object was updated at. The time is returned in ISO format.
- `data`: object
  - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
    - `live_streaming_config`: object
    - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
    - `realtimekit_bucket_config`: object
    - `storage_config`: object
    - `video_config`: object
- `data`: object
  - `ai_config`: object — The AI Config allows you to customize the behavior of meeting transcriptions and summaries
    - `summarization`: object — Summary Config
    - `transcription`: object — Transcription Configurations

## PATCH /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}

Update a meeting

operationId: `update_meeting`

**Request** (application/json)

- `ai_config`: object — The AI Config allows you to customize the behavior of meeting transcriptions and summaries
  - `summarization`: object — Summary Config
    - `summary_type`: string enum: `general`, `team_meeting`, `sales_call`, `client_check_in`, `interview`, `daily_standup`, `one_on_one_meeting`, `lecture` default: `general` — Defines the style of the summary, such as general, team meeting, or sales call.
    - `text_format`: string enum: `plain_text`, `markdown` default: `markdown` — Determines the text format of the summary, such as plain text or markdown.
    - `word_limit`: integer default: `500` — Sets the maximum number of words in the meeting summary.
  - `transcription`: object — Transcription Configurations
    - `keywords`: string[] — Adds specific terms to improve accurate detection during transcription.
    - `language`: string enum: `en-US`, `en-IN`, `de`, `hi`, `sv`, `ru`, `pl`, `el` — Specifies the language code for transcription to ensure accurate results. If omitted, the language is auto-detected for post-meeting (Whispe
    - `profanity_filter`: boolean default: `false` — Control the inclusion of offensive language in transcriptions.
- `live_stream_on_start`: boolean — Specifies if the meeting should start getting livestreamed on start.
- `persist_chat`: boolean — If a meeting is updated to persist_chat, meeting chat would remain for a week within the meeting space.
- `record_on_start`: boolean — Specifies if the meeting should start getting recorded as soon as someone joins the meeting.
- `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
  - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `channel`: string enum: `mono`, `stereo` default: `stereo` — Audio signal pathway within an audio file that carries a specific sound source.
    - `codec`: string enum: `MP3`, `AAC` default: `AAC` — Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, 
    - `export_file`: boolean default: `true` — Controls whether to export audio file seperately
  - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
  - `live_streaming_config`: object
    - `rtmp_url`: string — RTMP URL to stream to
  - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
  - `realtimekit_bucket_config`: object
    - `enabled`: boolean **required** — Controls whether recordings are uploaded to RealtimeKit's bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expir
  - `storage_config`: object
    - `type`: any enum: `gcs`
  - `video_config`: object
    - `codec`: string enum: `H264`, `VP8`, `VP9` default: `H264` — Codec using which the recording will be encoded.
    - `export_file`: boolean default: `true` — Controls whether to export video file seperately
    - `height`: integer default: `720` — Height of the recording video in pixels
    - `watermark`: object — Watermark to be added to the recording
    - `width`: integer default: `1280` — Width of the recording video in pixels
- `session_keep_alive_time_in_secs`: number — Time in seconds, for which a session remains active, after the last participant has left the meeting.
- `status`: string enum: `ACTIVE`, `INACTIVE` — Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.
- `summarize_on_end`: boolean — Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or su
- `title`: string — Title of the meeting
- `transcribe_on_end`: boolean — Automatically generate transcripts when the meeting ends.

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object
  - `created_at`: string **required** — Timestamp the object was created at. The time is returned in ISO format.
  - `id`: string **required** — ID of the meeting.
  - `live_stream_on_start`: boolean — Specifies if the meeting should start getting livestreamed on start.
  - `persist_chat`: boolean — Specifies if Chat within a meeting should persist for a week.
  - `record_on_start`: boolean — Specifies if the meeting should start getting recorded as soon as someone joins the meeting.
  - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
    - `live_streaming_config`: object
    - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
    - `realtimekit_bucket_config`: object
    - `storage_config`: object
    - `video_config`: object
  - `session_keep_alive_time_in_secs`: number default: `60` — Time in seconds, for which a session remains active, after the last participant has left the meeting.
  - `status`: string enum: `ACTIVE`, `INACTIVE` — Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.
  - `summarize_on_end`: boolean — Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or su
  - `title`: string — Title of the meeting.
  - `transcribe_on_end`: boolean — Automatically generate transcripts when the meeting ends.
  - `updated_at`: string **required** — Timestamp the object was updated at. The time is returned in ISO format.
- `data`: object
  - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
    - `live_streaming_config`: object
    - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
    - `realtimekit_bucket_config`: object
    - `storage_config`: object
    - `video_config`: object
- `data`: object
  - `ai_config`: object — The AI Config allows you to customize the behavior of meeting transcriptions and summaries
    - `summarization`: object — Summary Config
    - `transcription`: object — Transcription Configurations

## PUT /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}

Replace a meeting

operationId: `replace_meeting`

**Request** (application/json)

- `ai_config`: object — The AI Config allows you to customize the behavior of meeting transcriptions and summaries
  - `summarization`: object — Summary Config
    - `summary_type`: string enum: `general`, `team_meeting`, `sales_call`, `client_check_in`, `interview`, `daily_standup`, `one_on_one_meeting`, `lecture` default: `general` — Defines the style of the summary, such as general, team meeting, or sales call.
    - `text_format`: string enum: `plain_text`, `markdown` default: `markdown` — Determines the text format of the summary, such as plain text or markdown.
    - `word_limit`: integer default: `500` — Sets the maximum number of words in the meeting summary.
  - `transcription`: object — Transcription Configurations
    - `keywords`: string[] — Adds specific terms to improve accurate detection during transcription.
    - `language`: string enum: `en-US`, `en-IN`, `de`, `hi`, `sv`, `ru`, `pl`, `el` — Specifies the language code for transcription to ensure accurate results. If omitted, the language is auto-detected for post-meeting (Whispe
    - `profanity_filter`: boolean default: `false` — Control the inclusion of offensive language in transcriptions.
- `live_stream_on_start`: boolean default: `false` — Specifies if the meeting should start getting livestreamed on start.
- `persist_chat`: boolean default: `false` — If a meeting is set to persist_chat, meeting chat would remain for a week within the meeting space.
- `record_on_start`: boolean default: `false` — Specifies if the meeting should start getting recorded as soon as someone joins the meeting.
- `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
  - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `channel`: string enum: `mono`, `stereo` default: `stereo` — Audio signal pathway within an audio file that carries a specific sound source.
    - `codec`: string enum: `MP3`, `AAC` default: `AAC` — Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, 
    - `export_file`: boolean default: `true` — Controls whether to export audio file seperately
  - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
  - `live_streaming_config`: object
    - `rtmp_url`: string — RTMP URL to stream to
  - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
  - `realtimekit_bucket_config`: object
    - `enabled`: boolean **required** — Controls whether recordings are uploaded to RealtimeKit's bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expir
  - `storage_config`: object
    - `type`: any enum: `gcs`
  - `video_config`: object
    - `codec`: string enum: `H264`, `VP8`, `VP9` default: `H264` — Codec using which the recording will be encoded.
    - `export_file`: boolean default: `true` — Controls whether to export video file seperately
    - `height`: integer default: `720` — Height of the recording video in pixels
    - `watermark`: object — Watermark to be added to the recording
    - `width`: integer default: `1280` — Width of the recording video in pixels
- `session_keep_alive_time_in_secs`: number default: `60` — Time in seconds, for which a session remains active, after the last participant has left the meeting.
- `summarize_on_end`: boolean default: `false` — Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or su
- `title`: string — Title of the meeting
- `transcribe_on_end`: boolean default: `false` — Automatically generate transcripts when the meeting ends.

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object
  - `created_at`: string **required** — Timestamp the object was created at. The time is returned in ISO format.
  - `id`: string **required** — ID of the meeting.
  - `live_stream_on_start`: boolean — Specifies if the meeting should start getting livestreamed on start.
  - `persist_chat`: boolean — Specifies if Chat within a meeting should persist for a week.
  - `record_on_start`: boolean — Specifies if the meeting should start getting recorded as soon as someone joins the meeting.
  - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
    - `live_streaming_config`: object
    - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
    - `realtimekit_bucket_config`: object
    - `storage_config`: object
    - `video_config`: object
  - `session_keep_alive_time_in_secs`: number default: `60` — Time in seconds, for which a session remains active, after the last participant has left the meeting.
  - `status`: string enum: `ACTIVE`, `INACTIVE` — Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.
  - `summarize_on_end`: boolean — Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or su
  - `title`: string — Title of the meeting.
  - `transcribe_on_end`: boolean — Automatically generate transcripts when the meeting ends.
  - `updated_at`: string **required** — Timestamp the object was updated at. The time is returned in ISO format.
- `data`: object
  - `recording_config`: object — Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKi
    - `audio_config`: object — Object containing configuration regarding the audio that is being recorded.
    - `file_name_prefix`: string — Adds a prefix to the beginning of the file name of the recording.
    - `live_streaming_config`: object
    - `max_seconds`: number — Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.
    - `realtimekit_bucket_config`: object
    - `storage_config`: object
    - `video_config`: object
- `data`: object
  - `ai_config`: object — The AI Config allows you to customize the behavior of meeting transcriptions and summaries
    - `summarization`: object — Summary Config
    - `transcription`: object — Transcription Configurations

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants

Fetch all participants of a meeting

operationId: `get_meeting_participants` · query: `page_no`, `per_page`

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
  - `created_at`: string **required** — When this object was created. The time is returned in ISO format.
  - `custom_participant_id`: string **required** — A unique participant ID generated by the client.
  - `id`: string **required** — ID of the participant.
  - `name`: string — Name of the participant.
  - `picture`: string — URL to a picture of the participant.
  - `preset_name`: string **required** — Preset applied to the participant.
  - `updated_at`: string **required** — When this object was updated. The time is returned in ISO format.

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants

Add a participant

operationId: `add_participant`

**Request** (application/json)

- `custom_participant_id`: string **required** — A unique participant ID. You must specify a unique ID for the participant, for example, UUID, email address, and so on.
- `name`: string — (Optional) Name of the participant.
- `picture`: string — (Optional) A URL to a picture to be used for the participant.
- `preset_name`: string **required** default: `group_call_host` — Name of the preset to apply to this participant.
- `token`: object — Validity window of the participant authentication token. The window is [not_before, expires_on) and cannot be longer than 100 days. Defaults
  - `expires_on`: string — RFC 3339 timestamp with a timezone at or after which the token cannot be used. Must be in the future. Defaults to not_before plus 100 days.
  - `not_before`: string — RFC 3339 timestamp with a timezone before which the token cannot be used. Defaults to the current time. May be in the past.

**Response** 201 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any

## DELETE /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

Delete a participant

operationId: `delete_meeting_participant`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object
  - `created_at`: string **required** — Timestamp this object was created at. The time is returned in ISO format.
  - `custom_participant_id`: string **required** — A unique participant ID generated by the client.
  - `preset_id`: string **required** — ID of the preset applied to this participant.
  - `updated_at`: string **required** — Timestamp this object was updated at. The time is returned in ISO format.

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

Fetch a participant's detail

operationId: `get_meeting_participant`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object **required** — Represents a participant.
  - `created_at`: string **required** — When this object was created. The time is returned in ISO format.
  - `custom_participant_id`: string **required** — A unique participant ID generated by the client.
  - `id`: string **required** — ID of the participant.
  - `name`: string — Name of the participant.
  - `picture`: string — URL to a picture of the participant.
  - `preset_name`: string **required** — Preset applied to the participant.
  - `updated_at`: string **required** — When this object was updated. The time is returned in ISO format.

## PATCH /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

Edit a participant's detail

operationId: `edit_participant`

**Request** (application/json)

- `name`: string — (Optional) Name of the participant.
- `picture`: string — (Optional) A URL to a picture to be used for the participant.
- `preset_name`: string — (Optional) Name of the preset to apply to this participant.

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any

## PUT /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

Replace a participant's detail

operationId: `replace_participant`

**Request** (application/json)

- `custom_participant_id`: string **required** — Unique participant ID accepted by the replace participant API.
- `name`: string — (Optional) Name of the participant.
- `picture`: string — (Optional) A URL to a picture to be used for the participant.
- `preset_name`: string **required** — Name of the preset to apply to this participant.

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any

## DELETE /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}/token

Revoke participant's authentication token

operationId: `revoke_token`

**Request** (application/json)

- `token`: string **required** — The participant authentication token to revoke.

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object **required**
  - `token`: string **required** — The revoked participant authentication token.

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}/token

Refresh participant's authentication token

operationId: `regenerate_token`

**Request** (application/json)

- `expires_on`: string — RFC 3339 timestamp with a timezone at or after which the token cannot be used. Must be in the future. Defaults to not_before plus 100 days.
- `not_before`: string — RFC 3339 timestamp with a timezone before which the token cannot be used. Defaults to the current time. May be in the past.

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: object **required**
  - `expires_on`: string **required** — Time at which the token stops being valid, in UTC.
  - `not_before`: string **required** — Time from which the token is valid, in UTC.
  - `token`: string **required** — Regenerated participant's authentication token.
