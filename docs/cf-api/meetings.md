# Meetings

12 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings

Fetch all meetings for an App

operationId: `get_all_meetings` · query: `status`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings

Create a meeting

operationId: `create_meeting`

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}

Fetch a meeting for an App

operationId: `get_meeting` · query: `name`

## PATCH /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}

Update a meeting

operationId: `update_meeting`

## PUT /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}

Replace a meeting

operationId: `replace_meeting`

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants

Fetch all participants of a meeting

operationId: `get_meeting_participants`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants

Add a participant

operationId: `add_participant`

## DELETE /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

Delete a participant

operationId: `delete_meeting_participant`

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

Fetch a participant's detail

operationId: `get_meeting_participant`

## PATCH /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

Edit a participant's detail

operationId: `edit_participant`

## PUT /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

Replace a participant's detail

operationId: `replace_participant`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}/token

Refresh participant's authentication token

operationId: `regenerate_token`
