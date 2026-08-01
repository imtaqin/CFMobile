# Active session

6 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session

Fetch details of an active session

operationId: `GetActiveSession`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick

Kick participants from an active session

operationId: `KickPartcipants`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick-all

Kick all participants

operationId: `KickAllParticipants`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/mute

Mute participants of an active session

operationId: `MuteParticipants`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/mute-all

Mute all participants

operationId: `MuteAllParticipants`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/poll

Create a poll

operationId: `CreatePoll`
