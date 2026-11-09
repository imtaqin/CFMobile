# Worker Environment

4 endpoints.

## GET /accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/content

Get Worker Environment Script Content

operationId: `worker-environment-get-script-content`

**Response** 200 → `result`

string

## PUT /accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/content

Replace Worker Environment Script Content

operationId: `worker-environment-put-script-content`

**Request** (multipart/form-data)

- `files`: string[] — An array of modules (often JavaScript files) comprising a Worker script. At least one module must be present and referenced in the metadata 
  [array]
- `metadata`: object **required** — JSON-encoded metadata about the uploaded parts and Worker configuration.
  - `body_part`: string — Name of the part in the multipart request that contains the script (e.g. the file adding a listener to the `fetch` event). Indicates a `serv
  - `main_module`: string — Name of the part in the multipart request that contains the main module (e.g. the file exporting a `fetch` handler). Indicates a `module syn

**Response** 200 → `result`

- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: string[] default: `` — Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes 
  [array]
- `created_on`: string — When the script was created.
- `etag`: string — Hashed script content, can be used in a If-None-Match header when updating.
- `exports`: any — Declarative exports for the Worker's most recent version,
- `handlers`: string[] — The names of handlers exported as part of the default export.
  [array]
- `has_assets`: boolean — Whether a Worker contains assets.
- `has_modules`: boolean — Whether a Worker contains modules.
- `id`: string — The name used to identify the script.
- `last_deployed_from`: string — The client most recently used to deploy this Worker.
- `logpush`: boolean default: `false` — Whether Logpush is turned on for the Worker.
- `migration_tag`: string — The tag of the Durable Object migration that was most recently applied for this Worker.
- `modified_on`: string — When the script was last modified.
- `named_handlers`: object[] — Named exports, such as Durable Object class implementations and named entrypoints.
  [array of]
  - `handlers`: string[] — The names of handlers exported as part of the named export.
    [array]
  - `name`: string — The name of the export.
- `observability`: object — Observability settings for the Worker.
  - `enabled`: boolean **required** — Whether observability is enabled for the Worker.
  - `head_sampling_rate`: number — The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.
  - `issues`: object — Real-time Issues settings for the Worker.
    - `enabled`: boolean — Whether real-time Issues are enabled for the Worker.
  - `logs`: object — Log settings for the Worker.
    - `destinations`: string[] — A list of destinations where logs will be exported to.
    - `enabled`: boolean **required** — Whether logs are enabled for the Worker.
    - `head_sampling_rate`: number — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.
    - `invocation_logs`: boolean **required** — Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Wo
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Worker.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Worker.
    - `destinations`: string[] — A list of destinations where traces will be exported to.
    - `enabled`: boolean — Whether traces are enabled for the Worker.
    - `head_sampling_rate`: number — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Worker.
    - `propagation_policy`: string enum: `authenticated`, `accept`, `null` — Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" honors inbound trace c
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `placement_mode`: any
- `placement_status`: any
- `tag`: string — The immutable ID of the script.
- `tags`: string[] — Tags associated with the Worker.
  [array]
- `tail_consumers`: object[] — List of Workers that will consume logs from the attached Worker.
  [array of]
  - `environment`: string — Optional environment if the Worker utilizes one.
  - `namespace`: string — Optional dispatch namespace the script belongs to.
  - `service`: string **required** — Name of Worker that is to be the consumer.
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the Worker invocations.

## GET /accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/settings

Get Worker Environment Settings

operationId: `worker-script-environment-get-settings`

**Response** 200 → `result`

- `logpush`: boolean default: `false` — Whether Logpush is turned on for the Worker.
- `observability`: any
- `tags`: any
- `tail_consumers`: object[] — List of Workers that will consume logs from the attached Worker.
  [array of]
  - `environment`: string — Optional environment if the Worker utilizes one.
  - `namespace`: string — Optional dispatch namespace the script belongs to.
  - `service`: string **required** — Name of Worker that is to be the consumer.

## PATCH /accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/settings

Patch Worker Environment Settings

operationId: `worker-script-environment-patch-settings`

**Request** (application/json)

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
- `result`: object **required**
  - `logpush`: boolean default: `false` — Whether Logpush is turned on for the Worker.
  - `observability`: any
  - `tags`: any
  - `tail_consumers`: object[] — List of Workers that will consume logs from the attached Worker.
    [array of]
    - `environment`: string — Optional environment if the Worker utilizes one.
    - `namespace`: string — Optional dispatch namespace the script belongs to.
    - `service`: string **required** — Name of Worker that is to be the consumer.

**Response** 200 → `result`

- `logpush`: boolean default: `false` — Whether Logpush is turned on for the Worker.
- `observability`: any
- `tags`: any
- `tail_consumers`: object[] — List of Workers that will consume logs from the attached Worker.
  [array of]
  - `environment`: string — Optional environment if the Worker utilizes one.
  - `namespace`: string — Optional dispatch namespace the script belongs to.
  - `service`: string **required** — Name of Worker that is to be the consumer.
