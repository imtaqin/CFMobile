# Live streams

12 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/daywise

Fetch day-wise analytics data for your livestreams

operationId: `get-livestream-analytics-daywise` · query: `start_time`, `end_time`, `filters`

## GET /accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/overall

Fetch complete analytics data for your livestreams

operationId: `get-livestream-analytics-complete` · query: `start_time`, `end_time`, `filters`

## GET /accounts/{account_id}/realtime/kit/{app_id}/livestreams

Fetch all livestreams

operationId: `fetch_all_livestreams` · query: `exclude_meetings`, `per_page`, `page_no`, `status`, `start_time`, `end_time`, `sort_order`

## POST /accounts/{account_id}/realtime/kit/{app_id}/livestreams

Create an independent livestream

operationId: `create_livestream`

## GET /accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}

Fetch livestream details using livestream ID

operationId: `get-v2-livestream-session-livestream-id` · query: `page_no`, `per_page`

## GET /accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}/active-livestream-session

Fetch active livestream session details

operationId: `get-v2-active-livestream-session-details`

## GET /accounts/{account_id}/realtime/kit/{app_id}/livestreams/sessions/{livestream-session-id}

Fetch livestream session details using livestream session ID

operationId: `get-v2-livestreams-livestream-session-id`

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream

Fetch active livestreams for a meeting

operationId: `get-v2-meetings-meetingId-active-livestream`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream/stop

Stop livestreaming a meeting

operationId: `stop_livestreaming`

## GET /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/livestream

Fetch livestream session details for a meeting

operationId: `livestream-session-details` · query: `page_no`, `per_page`

## POST /accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/livestreams

Start livestreaming a meeting

operationId: `start-livestreaming`

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/livestream-sessions

Fetch livestream session details using a session ID

operationId: `get-v2-livestreamsession-session-meetingId-active-livestream` · query: `per_page`, `page_no`
