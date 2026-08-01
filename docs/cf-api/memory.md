# Memory

9 endpoints.

## DELETE /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}

Delete a profile

operationId: `agent-memory-profile-delete`

## POST /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/ingest

Ingest messages

operationId: `agent-memory-ingest`

## GET /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/memories

List memories

operationId: `agent-memory-memory-list` · query: `per_page`, `cursor`, `session_id`, `type`

## DELETE /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/memories/{memory_id}

Delete a memory

operationId: `agent-memory-memory-delete`

## GET /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/memories/{memory_id}

Get a memory

operationId: `agent-memory-memory-get`

## POST /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/recall

Recall memories

operationId: `agent-memory-recall`

## POST /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/remember

Remember a memory

operationId: `agent-memory-remember`

## DELETE /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/sessions/{session_id}

Delete a session

operationId: `agent-memory-session-delete`

## POST /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/summary

Get a profile summary

operationId: `agent-memory-summary`
