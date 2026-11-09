# Worker Profiling

1 endpoints.

## POST /accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}/profile

Profile Worker Version

operationId: `profileWorkerVersion`

**Request** (application/json)

- `actor_id`: string — Identifies the exact Durable Object actor to profile. Must be specified together with namespace_id. The actor must currently be active and r
- `duration_ms`: integer **required** — Profile duration in milliseconds.
- `namespace_id`: string — Identifies the Durable Object namespace containing the actor to profile. Must be specified together with actor_id.
- `profile_type`: string enum: `cpu`, `heap` default: `cpu`

**Response** 200 → `result`

string
