# Presets

6 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/presets

Fetch all presets

operationId: `get-presets` · query: `per_page`, `page_no`, `search`

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
  - `created_at`: string — Timestamp this preset was created at
  - `id`: string — ID of the preset
  - `name`: string — Name of the preset
  - `updated_at`: string — Timestamp this preset was last updated

## POST /accounts/{account_id}/realtime/kit/{app_id}/presets

Create a preset

operationId: `post-presets`

**Request** (application/json)

- `config`: object **required**
  - `livestream_viewer_qualities`: integer[] default: `` — Livestream viewer quality levels.
    [array]
  - `max_screenshare_count`: number **required** — Maximum number of screen shares that can be active at a given time
  - `max_video_streams`: object **required** — Maximum number of streams that are visible on a device
    - `desktop`: number **required** — Maximum number of video streams visible on desktop devices
    - `mobile`: number **required** — Maximum number of streams visible on mobile devices
  - `media`: object **required** — Media configuration options. eg: Video quality
    - `audio`: object — Control options for Audio quality.
    - `screenshare`: object **required** — Configuration options for participant screen shares
    - `video`: object **required** — Configuration options for participant videos
  - `view_type`: string **required** enum: `GROUP_CALL`, `WEBINAR`, `AUDIO_ROOM`, `LIVESTREAM` — Type of the meeting
- `name`: string **required** — Name of the preset
- `permissions`: object **required**
  - `accept_stage_requests`: boolean
  - `accept_waiting_requests`: boolean **required** — Whether this participant can accept waiting requests
  - `can_accept_production_requests`: boolean **required**
  - `can_change_participant_permissions`: boolean **required**
  - `can_edit_display_name`: boolean **required**
  - `can_livestream`: boolean **required**
  - `can_record`: boolean **required**
  - `can_spotlight`: boolean **required**
  - `chat`: object **required**
    - `private`: object **required**
    - `public`: object **required**
  - `connected_meetings`: object **required**
    - `can_alter_connected_meetings`: boolean **required**
    - `can_switch_connected_meetings`: boolean **required**
    - `can_switch_to_parent_meeting`: boolean **required**
  - `disable_participant_audio`: boolean **required**
  - `disable_participant_screensharing`: boolean **required**
  - `disable_participant_video`: boolean **required**
  - `hidden_participant`: boolean **required** — Whether this participant is visible to others or not
  - `is_recorder`: boolean
  - `kick_participant`: boolean **required**
  - `media`: object **required** — Media permissions
    - `audio`: object **required** — Audio permissions
    - `screenshare`: object **required** — Screenshare permissions
    - `video`: object **required** — Video permissions
  - `pin_participant`: boolean **required**
  - `plugins`: object **required** — Plugin permissions
    - `can_close`: boolean **required** — Can close plugins that are already open
    - `can_edit_config`: boolean **required** — Can edit plugin config
    - `can_start`: boolean **required** — Can start plugins
    - `config`: object **required** — Plugin configuration keyed by plugin UUID.
  - `polls`: object **required** — Poll permissions
    - `can_create`: boolean **required** — Can create polls
    - `can_view`: boolean **required** — Can view polls
    - `can_vote`: boolean **required** — Can vote on polls
  - `recorder_type`: string **required** enum: `RECORDER`, `LIVESTREAMER`, `NONE` — Type of the recording peer
  - `show_participant_list`: boolean **required**
  - `stage_access`: string enum: `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`
  - `stage_enabled`: boolean
  - `transcription_enabled`: boolean
  - `waiting_room_type`: string **required** enum: `SKIP`, `ON_PRIVILEGED_USER_ENTRY`, `SKIP_ON_ACCEPT` — Waiting room type
- `ui`: object **required**
  - `design_tokens`: object **required**
    - `border_radius`: string **required** enum: `sharp`, `rounded`, `extra-rounded`, `circular`
    - `border_width`: string **required** enum: `none`, `thin`, `fat`
    - `colors`: object **required**
    - `font_family`: string
    - `google_font`: string
    - `logo`: string
    - `spacing_base`: number **required**
    - `theme`: string **required** enum: `darkest`, `dark`, `light`

**Response** 201 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any **required**

## DELETE /accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}

Delete a preset

operationId: `delete-presets-preset_id`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any **required**

## GET /accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}

Fetch details of a preset

operationId: `get-presets-preset_id`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any **required**

## PATCH /accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}

Update a preset

operationId: `patch-presets-preset_id`

**Request** (application/json)

- `config`: object
  - `livestream_viewer_qualities`: integer[] default: `` — Livestream viewer quality levels.
    [array]
  - `max_screenshare_count`: number — Maximum number of screen shares that can be active at a given time
  - `max_video_streams`: object — Maximum number of streams that are visible on a device
    - `desktop`: number — Maximum number of video streams visible on desktop devices
    - `mobile`: number — Maximum number of streams visible on mobile devices
  - `media`: object — Media configuration options. eg: Video quality
    - `audio`: object — Control options for Audio quality.
    - `screenshare`: object — Configuration options for participant screen shares
    - `video`: object — Configuration options for participant videos
  - `view_type`: string enum: `GROUP_CALL`, `WEBINAR`, `AUDIO_ROOM`, `LIVESTREAM` — Type of the meeting
- `name`: string — Name of the preset
- `permissions`: object
  - `accept_stage_requests`: boolean
  - `accept_waiting_requests`: boolean — Whether this participant can accept waiting requests
  - `can_accept_production_requests`: boolean
  - `can_change_participant_permissions`: boolean
  - `can_edit_display_name`: boolean
  - `can_livestream`: boolean
  - `can_record`: boolean
  - `can_spotlight`: boolean
  - `chat`: object
    - `private`: object
    - `public`: object
  - `connected_meetings`: object
    - `can_alter_connected_meetings`: boolean
    - `can_switch_connected_meetings`: boolean
    - `can_switch_to_parent_meeting`: boolean
  - `disable_participant_audio`: boolean
  - `disable_participant_screensharing`: boolean
  - `disable_participant_video`: boolean
  - `hidden_participant`: boolean — Whether this participant is visible to others or not
  - `is_recorder`: boolean
  - `kick_participant`: boolean
  - `media`: object — Media permissions
    - `audio`: object — Audio permissions
    - `screenshare`: object — Screenshare permissions
    - `video`: object — Video permissions
  - `pin_participant`: boolean
  - `plugins`: object — Plugin permissions
    - `can_close`: boolean — Can close plugins that are already open
    - `can_edit_config`: boolean — Can edit plugin config
    - `can_start`: boolean — Can start plugins
    - `config`: object — Plugin configuration keyed by plugin UUID.
  - `polls`: object — Poll permissions
    - `can_create`: boolean — Can create polls
    - `can_view`: boolean — Can view polls
    - `can_vote`: boolean — Can vote on polls
  - `recorder_type`: string enum: `RECORDER`, `LIVESTREAMER`, `NONE` — Type of the recording peer
  - `show_participant_list`: boolean
  - `stage_access`: string enum: `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`
  - `stage_enabled`: boolean
  - `transcription_enabled`: boolean
  - `waiting_room_type`: string enum: `SKIP`, `ON_PRIVILEGED_USER_ENTRY`, `SKIP_ON_ACCEPT` — Waiting room type
- `ui`: object
  - `design_tokens`: object
    - `border_radius`: string enum: `sharp`, `rounded`, `extra-rounded`, `circular`
    - `border_width`: string enum: `none`, `thin`, `fat`
    - `colors`: object
    - `font_family`: string
    - `google_font`: string
    - `logo`: string
    - `spacing_base`: number
    - `theme`: string enum: `darkest`, `dark`, `light`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any **required**

## PUT /accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}

Replace a preset

operationId: `put-presets-preset_id`

**Request** (application/json)

- `config`: object **required**
  - `livestream_viewer_qualities`: integer[] default: `` — Livestream viewer quality levels.
    [array]
  - `max_screenshare_count`: number **required** — Maximum number of screen shares that can be active at a given time
  - `max_video_streams`: object **required** — Maximum number of streams that are visible on a device
    - `desktop`: number **required** — Maximum number of video streams visible on desktop devices
    - `mobile`: number **required** — Maximum number of streams visible on mobile devices
  - `media`: object **required** — Media configuration options. eg: Video quality
    - `audio`: object — Control options for Audio quality.
    - `screenshare`: object **required** — Configuration options for participant screen shares
    - `video`: object **required** — Configuration options for participant videos
  - `view_type`: string **required** enum: `GROUP_CALL`, `WEBINAR`, `AUDIO_ROOM`, `LIVESTREAM` — Type of the meeting
- `name`: string **required** — Name of the preset
- `permissions`: object **required**
  - `accept_stage_requests`: boolean
  - `accept_waiting_requests`: boolean **required** — Whether this participant can accept waiting requests
  - `can_accept_production_requests`: boolean **required**
  - `can_change_participant_permissions`: boolean **required**
  - `can_edit_display_name`: boolean **required**
  - `can_livestream`: boolean **required**
  - `can_record`: boolean **required**
  - `can_spotlight`: boolean **required**
  - `chat`: object **required**
    - `private`: object **required**
    - `public`: object **required**
  - `connected_meetings`: object **required**
    - `can_alter_connected_meetings`: boolean **required**
    - `can_switch_connected_meetings`: boolean **required**
    - `can_switch_to_parent_meeting`: boolean **required**
  - `disable_participant_audio`: boolean **required**
  - `disable_participant_screensharing`: boolean **required**
  - `disable_participant_video`: boolean **required**
  - `hidden_participant`: boolean **required** — Whether this participant is visible to others or not
  - `is_recorder`: boolean
  - `kick_participant`: boolean **required**
  - `media`: object **required** — Media permissions
    - `audio`: object **required** — Audio permissions
    - `screenshare`: object **required** — Screenshare permissions
    - `video`: object **required** — Video permissions
  - `pin_participant`: boolean **required**
  - `plugins`: object **required** — Plugin permissions
    - `can_close`: boolean **required** — Can close plugins that are already open
    - `can_edit_config`: boolean **required** — Can edit plugin config
    - `can_start`: boolean **required** — Can start plugins
    - `config`: object **required** — Plugin configuration keyed by plugin UUID.
  - `polls`: object **required** — Poll permissions
    - `can_create`: boolean **required** — Can create polls
    - `can_view`: boolean **required** — Can view polls
    - `can_vote`: boolean **required** — Can vote on polls
  - `recorder_type`: string **required** enum: `RECORDER`, `LIVESTREAMER`, `NONE` — Type of the recording peer
  - `show_participant_list`: boolean **required**
  - `stage_access`: string enum: `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`
  - `stage_enabled`: boolean
  - `transcription_enabled`: boolean
  - `waiting_room_type`: string **required** enum: `SKIP`, `ON_PRIVILEGED_USER_ENTRY`, `SKIP_ON_ACCEPT` — Waiting room type
- `ui`: object **required**
  - `design_tokens`: object **required**
    - `border_radius`: string **required** enum: `sharp`, `rounded`, `extra-rounded`, `circular`
    - `border_width`: string **required** enum: `none`, `thin`, `fat`
    - `colors`: object **required**
    - `font_family`: string
    - `google_font`: string
    - `logo`: string
    - `spacing_base`: number **required**
    - `theme`: string **required** enum: `darkest`, `dark`, `light`

**Response** 200 → `result`

- `data`: object — Data returned by the operation
- `success`: boolean **required** default: `true` — Success status of the operation
- `data`: any **required**
