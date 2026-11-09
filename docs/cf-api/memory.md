# Memory

10 endpoints.

## GET /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles

List profiles

operationId: `agent-memory-profile-list` · query: `per_page`, `cursor`

**Response** 200 → `result`

[array of]
- `createdAt`: string **required** — Time the profile was first recorded in the namespace index.
- `name`: string **required** — Profile name.

## DELETE /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}

Delete a profile

operationId: `agent-memory-profile-delete`

**Response** 200 → `result`

object

## POST /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/ingest

Ingest messages

operationId: `agent-memory-ingest`

**Request** (application/json)

- `messages`: object[] **required** — Conversation messages to extract memories from.
  [array of]
  - `content`: string **required** — Text content of the message.
  - `role`: string **required** enum: `system`, `user`, `assistant` — Author role of the message.
  - `timestamp`: string — Message timestamp.
- `sessionId`: string — Session identifier.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/memories

List memories

operationId: `agent-memory-memory-list` · query: `per_page`, `cursor`, `session_id`, `type`

**Response** 200 → `result`

[array of]
- `createdAt`: string **required** — Time the memory was created.
- `id`: string **required** — Unique identifier of the memory.
- `sessionId`: string **required** — Identifier of the session this memory is associated with.
- `summary`: string **required** — Short, human-readable summary of the memory.
- `type`: string **required** enum: `fact`, `event`, `instruction`, `task` — Classification of a memory: 'fact', 'event', 'instruction', or 'task'.
- `updatedAt`: string **required** — Time the memory was last updated.

## DELETE /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/memories/{memory_id}

Delete a memory

operationId: `agent-memory-memory-delete`

**Response** 200 → `result`

- `content`: string **required** — Full memory content extracted from the conversation.
- `createdAt`: string **required** — Time the memory was created.
- `id`: string **required** — Unique identifier of the memory.
- `sessionId`: string **required** — Identifier of the session this memory is associated with.
- `summary`: string **required** — Short, human-readable summary of the memory.
- `type`: string **required** enum: `fact`, `event`, `instruction`, `task` — Classification of a memory: 'fact', 'event', 'instruction', or 'task'.
- `updatedAt`: string **required** — Time the memory was last updated.

## GET /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/memories/{memory_id}

Get a memory

operationId: `agent-memory-memory-get`

**Response** 200 → `result`

- `content`: string **required** — Full memory content extracted from the conversation.
- `createdAt`: string **required** — Time the memory was created.
- `id`: string **required** — Unique identifier of the memory.
- `sessionId`: string **required** — Identifier of the session this memory is associated with.
- `summary`: string **required** — Short, human-readable summary of the memory.
- `type`: string **required** enum: `fact`, `event`, `instruction`, `task` — Classification of a memory: 'fact', 'event', 'instruction', or 'task'.
- `updatedAt`: string **required** — Time the memory was last updated.

## POST /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/recall

Recall memories

operationId: `agent-memory-recall`

**Request** (application/json)

- `query`: string **required** — Natural-language query to match against stored memories.
- `referenceDate`: string — Temporal anchor for relative date references in the query.
- `responseLength`: string enum: `short`, `medium`, `long` — Verbosity of the synthesized answer. Defaults to 'medium'.
- `thinkingLevel`: string enum: `low`, `medium`, `high` — Recall intensity / search depth. Defaults to 'low'.

**Response** 200 → `result`

- `answer`: string — LLM-synthesized answer to the query. Omitted when synthesis is skipped.
- `candidates`: object[] **required** — Matching memories ranked by relevance (most relevant first).
  [array of]
  - `id`: string **required** — Unique identifier of the memory.
  - `score`: number **required** — Relevance score for the query; higher is more relevant.
  - `sessionId`: string **required** — Session the candidate memory is associated with, or null if not session-scoped.
  - `summary`: string **required** — Short summary of the candidate memory.
- `count`: number **required** — Number of matching memories returned in `candidates`.

## POST /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/remember

Remember a memory

operationId: `agent-memory-remember`

**Request** (application/json)

- `content`: string **required** — Raw memory content to store.
- `sessionId`: string — Session identifier.

**Response** 200 → `result`

- `content`: string **required** — Full memory content extracted from the conversation.
- `createdAt`: string **required** — Time the memory was created.
- `id`: string **required** — Unique identifier of the memory.
- `sessionId`: string **required** — Identifier of the session this memory is associated with.
- `summary`: string **required** — Short, human-readable summary of the memory.
- `type`: string **required** enum: `fact`, `event`, `instruction`, `task` — Classification of a memory: 'fact', 'event', 'instruction', or 'task'.
- `updatedAt`: string **required** — Time the memory was last updated.

## DELETE /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/sessions/{session_id}

Delete a session

operationId: `agent-memory-session-delete`

**Response** 200 → `result`

object

## POST /accounts/{account_id}/agent-memory/namespaces/{namespace_name}/profiles/{profile_name}/summary

Get a profile summary

operationId: `agent-memory-summary`

**Request** (application/json)

- `sessionId`: string — Session identifier.

**Response** 200 → `result`

- `summary`: string **required** — Paste-ready prompt block summarizing everything stored in the profile.
