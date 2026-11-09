# Previews

6 endpoints.

## GET /accounts/{account_id}/workers/workers/{worker_id}/previews

List Previews

operationId: `workers.previews.list` · query: `page`, `per_page`, `order_by`, `order`, `slug`, `name`

**Response** 200 → `result`

[array of]
- `created_on`: string **required** — When the Preview was created.
- `deployed_on`: string — When the Preview's most recent deployment was created. `null` if the Preview has never been deployed.
- `id`: string **required** — Immutable ID of the Preview.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Preview.
- `name`: string **required** — Human-readable name of the Preview.
- `observability`: object **required** — Observability settings for the Preview.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Preview.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Preview.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Preview.
  - `logs`: object — Log settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether invocation logs are enabled for the Preview.
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Preview.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Preview.
- `slug`: string **required** — Immutable URL-safe identifier for the Preview.
- `tags`: string[] **required** default: `` — Tags associated with the Preview.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Preview.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Preview was most recently updated.
- `urls`: string[] **required** — Routable URLs for the Preview.
  [array]

## POST /accounts/{account_id}/workers/workers/{worker_id}/previews

Create Preview

operationId: `workers.previews.create` · query: `ignore_base_config`

**Request** (application/json)

- `created_on`: string **required** — When the Preview was created.
- `deployed_on`: string — When the Preview's most recent deployment was created. `null` if the Preview has never been deployed.
- `id`: string **required** — Immutable ID of the Preview.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Preview.
- `name`: string **required** — Human-readable name of the Preview.
- `observability`: object **required** — Observability settings for the Preview.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Preview.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Preview.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Preview.
  - `logs`: object — Log settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether invocation logs are enabled for the Preview.
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Preview.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Preview.
- `slug`: string **required** — Immutable URL-safe identifier for the Preview.
- `tags`: string[] **required** default: `` — Tags associated with the Preview.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Preview.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Preview was most recently updated.
- `urls`: string[] **required** — Routable URLs for the Preview.
  [array]
object

**Response** 200 → `result`

- `created_on`: string **required** — When the Preview was created.
- `deployed_on`: string — When the Preview's most recent deployment was created. `null` if the Preview has never been deployed.
- `id`: string **required** — Immutable ID of the Preview.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Preview.
- `name`: string **required** — Human-readable name of the Preview.
- `observability`: object **required** — Observability settings for the Preview.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Preview.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Preview.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Preview.
  - `logs`: object — Log settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether invocation logs are enabled for the Preview.
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Preview.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Preview.
- `slug`: string **required** — Immutable URL-safe identifier for the Preview.
- `tags`: string[] **required** default: `` — Tags associated with the Preview.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Preview.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Preview was most recently updated.
- `urls`: string[] **required** — Routable URLs for the Preview.
  [array]

## DELETE /accounts/{account_id}/workers/workers/{worker_id}/previews/{preview_id}

Delete Preview

operationId: `workers.previews.delete` · query: `force`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /accounts/{account_id}/workers/workers/{worker_id}/previews/{preview_id}

Get Preview

operationId: `workers.previews.get`

**Response** 200 → `result`

- `created_on`: string **required** — When the Preview was created.
- `deployed_on`: string — When the Preview's most recent deployment was created. `null` if the Preview has never been deployed.
- `id`: string **required** — Immutable ID of the Preview.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Preview.
- `name`: string **required** — Human-readable name of the Preview.
- `observability`: object **required** — Observability settings for the Preview.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Preview.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Preview.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Preview.
  - `logs`: object — Log settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether invocation logs are enabled for the Preview.
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Preview.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Preview.
- `slug`: string **required** — Immutable URL-safe identifier for the Preview.
- `tags`: string[] **required** default: `` — Tags associated with the Preview.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Preview.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Preview was most recently updated.
- `urls`: string[] **required** — Routable URLs for the Preview.
  [array]

## PATCH /accounts/{account_id}/workers/workers/{worker_id}/previews/{preview_id}

Edit Preview

operationId: `workers.previews.edit`

**Request** (application/json)

- `created_on`: string **required** — When the Preview was created.
- `deployed_on`: string — When the Preview's most recent deployment was created. `null` if the Preview has never been deployed.
- `id`: string **required** — Immutable ID of the Preview.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Preview.
- `name`: string **required** — Human-readable name of the Preview.
- `observability`: object **required** — Observability settings for the Preview.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Preview.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Preview.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Preview.
  - `logs`: object — Log settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether invocation logs are enabled for the Preview.
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Preview.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Preview.
- `slug`: string **required** — Immutable URL-safe identifier for the Preview.
- `tags`: string[] **required** default: `` — Tags associated with the Preview.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Preview.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Preview was most recently updated.
- `urls`: string[] **required** — Routable URLs for the Preview.
  [array]
object

**Response** 200 → `result`

- `created_on`: string **required** — When the Preview was created.
- `deployed_on`: string — When the Preview's most recent deployment was created. `null` if the Preview has never been deployed.
- `id`: string **required** — Immutable ID of the Preview.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Preview.
- `name`: string **required** — Human-readable name of the Preview.
- `observability`: object **required** — Observability settings for the Preview.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Preview.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Preview.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Preview.
  - `logs`: object — Log settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether invocation logs are enabled for the Preview.
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Preview.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Preview.
- `slug`: string **required** — Immutable URL-safe identifier for the Preview.
- `tags`: string[] **required** default: `` — Tags associated with the Preview.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Preview.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Preview was most recently updated.
- `urls`: string[] **required** — Routable URLs for the Preview.
  [array]

## PUT /accounts/{account_id}/workers/workers/{worker_id}/previews/{preview_id}

Update Preview

operationId: `workers.previews.update` · query: `ignore_base_config`

**Request** (application/json)

- `created_on`: string **required** — When the Preview was created.
- `deployed_on`: string — When the Preview's most recent deployment was created. `null` if the Preview has never been deployed.
- `id`: string **required** — Immutable ID of the Preview.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Preview.
- `name`: string **required** — Human-readable name of the Preview.
- `observability`: object **required** — Observability settings for the Preview.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Preview.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Preview.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Preview.
  - `logs`: object — Log settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether invocation logs are enabled for the Preview.
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Preview.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Preview.
- `slug`: string **required** — Immutable URL-safe identifier for the Preview.
- `tags`: string[] **required** default: `` — Tags associated with the Preview.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Preview.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Preview was most recently updated.
- `urls`: string[] **required** — Routable URLs for the Preview.
  [array]
object

**Response** 200 → `result`

- `created_on`: string **required** — When the Preview was created.
- `deployed_on`: string — When the Preview's most recent deployment was created. `null` if the Preview has never been deployed.
- `id`: string **required** — Immutable ID of the Preview.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Preview.
- `name`: string **required** — Human-readable name of the Preview.
- `observability`: object **required** — Observability settings for the Preview.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Preview.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Preview.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Preview.
  - `logs`: object — Log settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether invocation logs are enabled for the Preview.
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Preview.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Preview.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Preview.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Preview.
- `slug`: string **required** — Immutable URL-safe identifier for the Preview.
- `tags`: string[] **required** default: `` — Tags associated with the Preview.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Preview.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Preview was most recently updated.
- `urls`: string[] **required** — Routable URLs for the Preview.
  [array]
