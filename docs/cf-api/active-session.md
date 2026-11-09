# Active session

6 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session

Fetch details of an active session

operationId: `GetActiveSession`

**Response** 200 → `result`

- `data`: object
  - `associated_id`: string **required** — ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the
  - `breakout_rooms`: object[]
    [array of]
    - `associated_id`: string **required** — ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the
    - `breakout_rooms`: object[]
    - `created_at`: string **required** — timestamp when session created
    - `ended_at`: string — timestamp when session ended
    - `id`: string **required** — ID of the session
    - `live_participants`: number **required** — number of participants currently in the session
    - `max_concurrent_participants`: number **required** — number of maximum participants that were in the session
    - `meeting_display_name`: string **required** — Title of the meeting this session belongs to
    - `minutes_consumed`: number **required** — number of minutes consumed since the session started
    - `organization_id`: string **required** — App id that hosted this session
    - `started_at`: string **required** — timestamp when session started
    - `status`: string **required** enum: `LIVE`, `ENDED` — current status of session
    - `type`: string **required** enum: `meeting`, `livestream`, `participant` — type of session
    - `updated_at`: string **required** — timestamp when session was last updated
  - `created_at`: string **required** — timestamp when session created
  - `ended_at`: string — timestamp when session ended
  - `id`: string **required** — ID of the session
  - `live_participants`: number **required** — number of participants currently in the session
  - `max_concurrent_participants`: number **required** — number of maximum participants that were in the session
  - `meeting_display_name`: string **required** — Title of the meeting this session belongs to
  - `minutes_consumed`: number **required** — number of minutes consumed since the session started
  - `organization_id`: string **required** — App id that hosted this session
  - `started_at`: string **required** — timestamp when session started
  - `status`: string **required** enum: `LIVE`, `ENDED` — current status of session
  - `type`: string **required** enum: `meeting`, `livestream`, `participant` — type of session
  - `updated_at`: string **required** — timestamp when session was last updated
- `success`: boolean

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick

Kick participants from an active session

operationId: `KickPartcipants`

**Request** (application/json)

(one of 2 variants; showing the first)

**Response** 200 → `result`

- `data`: object
  - `action`: string
  - `participants`: object[]
    [array of]
    - `created_at`: string **required**
    - `email`: string — Email of the session participant.
    - `id`: string **required** — ID of the session participant
    - `name`: string — Name of the session participant.
    - `picture`: string — A URL pointing to a picture of the participant.
    - `updated_at`: string **required**
- `success`: boolean

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick-all

Kick all participants

operationId: `KickAllParticipants`

**Response** 200 → `result`

- `data`: object
  - `action`: string
  - `kicked_participants_count`: number
- `success`: boolean

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/mute

Mute participants of an active session

operationId: `MuteParticipants`

**Request** (application/json)

(one of 2 variants; showing the first)

**Response** 200 → `result`

- `data`: object
  - `action`: string
  - `participants`: object[]
    [array of]
    - `created_at`: string **required**
    - `email`: string — Email of the session participant.
    - `id`: string **required** — ID of the session participant
    - `name`: string — Name of the session participant.
    - `picture`: string — A URL pointing to a picture of the participant.
    - `updated_at`: string **required**
- `success`: boolean

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/mute-all

Mute all participants

operationId: `MuteAllParticipants`

**Request** (application/json)

- `allow_unmute`: boolean default: `false` — if false, participants won't be able to unmute themselves after they are muted

**Response** 200 → `result`

- `data`: object
  - `action`: string
  - `muted_participants_count`: number
- `success`: boolean

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/poll

Create a poll

operationId: `CreatePoll`

**Request** (application/json)

- `anonymous`: boolean — if voters on a poll are anonymous
- `hide_votes`: boolean — if votes on an option are visible before a person votes
- `options`: string[] **required** — Different options for the question
  [array]
- `question`: string **required** — Question of the poll

**Response** 201 → `result`

- `data`: object
  - `action`: string
  - `poll`: object
    - `anonymous`: boolean
    - `created_by`: string
    - `hide_votes`: boolean
    - `id`: string **required** — ID of the poll
    - `options`: object[] **required** — Answer options
    - `question`: string **required** — Question asked by the poll
    - `voted`: string[]
- `success`: boolean
