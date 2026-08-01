# Recordings

6 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/recordings

Fetch all recordings for an App

operationId: `get_all_recordings` · query: `meeting_id`, `expired`

## POST /accounts/{account_id}/realtime/kit/{app_id}/recordings

Start recording a meeting

operationId: `start_recording`

## GET /accounts/{account_id}/realtime/kit/{app_id}/recordings/{recording_id}

Fetch details of a recording

operationId: `get_one_recording`

## PUT /accounts/{account_id}/realtime/kit/{app_id}/recordings/{recording_id}

Pause/Resume/Stop recording

operationId: `pause_resume_stop_recording`

## GET /accounts/{account_id}/realtime/kit/{app_id}/recordings/active-recording/{meeting_id}

Fetch active recording

operationId: `get_active_recording`

## POST /accounts/{account_id}/realtime/kit/{app_id}/recordings/track

Start recording participant audio tracks

operationId: `startTrackRecordingForAMeeting`
