# Sessions

9 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions

Fetch all sessions of an App

operationId: `GetSessions` · query: `search`, `associated_id`

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}

Fetch details of a session

operationId: `GetSessionDetails` · query: `include_breakout_rooms`

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/chat

Fetch all chat messages of a session

operationId: `GetSessionChat`

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/participants

Fetch participants list of a session

operationId: `GetSessionParticipants` · query: `search`, `include_peer_events`, `view`

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/participants/{participant_id}

Fetch details of a participant

operationId: `GetParticipantDetails` · query: `include_peer_events`

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary

Fetch summary of transcripts for a session

operationId: `GetSessionSummary`

## POST /accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary

Generate summary of Transcripts for the session

operationId: `post-sessions-session_id-summary`

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/transcript

Fetch the complete transcript for a session

operationId: `GetSessionTranscript` · query: `format`

## GET /accounts/{account_id}/realtime/kit/{app_id}/sessions/peer-report/{peer_id}

Fetch details of peer

operationId: `GetParticipantDataFromPeerId` · query: `filters`, `include_peer_events`
