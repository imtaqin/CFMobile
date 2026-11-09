# Worker Script

23 endpoints.

## POST /accounts/{account_id}/workers/assets/upload

Upload Worker Assets

operationId: `worker-assets-upload` · query: `base64`

**Request** (multipart/form-data)

object

**Response** 201 → `result`

- `jwt`: string — A "completion" JWT which can be redeemed when creating a Worker version.

## GET /accounts/{account_id}/workers/scripts

List Worker Scripts

operationId: `worker-script-list-workers` · query: `tags`

**Response** 200 → `result`

[array of]
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
- `routes`: object[] — Routes associated with the Worker.
  [array of]
  - `id`: any **required**
  - `pattern`: string **required** — Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-be
  - `script`: string — Name of the script to run if the route matches.

## GET /accounts/{account_id}/workers/scripts-search

Search Worker Scripts

operationId: `worker-script-search-workers` · query: `name`, `id`, `order_by`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_on`: string **required** — When the script was created.
- `environment_is_default`: boolean — Whether the environment is the default environment.
- `environment_name`: string — Name of the environment.
- `id`: string **required** — Identifier.
- `modified_on`: string **required** — When the script was last modified.
- `script_name`: string **required** — Name of the script.
- `service_name`: string — Name of the service.

## DELETE /accounts/{account_id}/workers/scripts/{script_name}

Delete Worker

operationId: `worker-script-delete-worker` · query: `force`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/workers/scripts/{script_name}

Download Worker Script

operationId: `worker-script-download-worker`

**Response** 200 → `result`

string

## PUT /accounts/{account_id}/workers/scripts/{script_name}

Upload Worker

operationId: `worker-script-upload-worker-module` · query: `bindings_inherit`

**Request** (application/javascript)

string

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
- `entry_point`: string — The entry point for the script.
- `startup_time_ms`: integer **required**

## POST /accounts/{account_id}/workers/scripts/{script_name}/assets-upload-session

Create Worker Assets Upload Session

operationId: `worker-script-update-create-assets-upload-session`

**Request** (application/json)

- `manifest`: object **required** — A manifest ([path]: {hash, size}) map of files to upload. As an example, `/blog/hello-world.html` would be a valid path key.

**Response** 200 → `result`

- `buckets`: array[] — The requests to make to upload assets.
  [array of]
  [array]
- `jwt`: string — A JWT to use as authentication for uploading assets.

## PUT /accounts/{account_id}/workers/scripts/{script_name}/content

Replace Worker Script Content

operationId: `worker-script-put-content`

**Request** (multipart/form-data)

- `files`: string[] — An array of modules (often JavaScript files) comprising a Worker script. At least one module must be present and referenced in the metadata 
  [array]
- `metadata`: object **required** — JSON-encoded metadata about the uploaded parts and Worker configuration.
  - `body_part`: string — Name of the uploaded file that contains the Worker script (e.g. the file adding a listener to the `fetch` event). Indicates a `service worke
  - `main_module`: string — Name of the uploaded file that contains the main module (e.g. the file exporting a `fetch` handler). Indicates a `module syntax` Worker.

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

## GET /accounts/{account_id}/workers/scripts/{script_name}/content/v2

Get Worker Script Content

operationId: `worker-script-get-content`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/workers/scripts/{script_name}/script-settings

Get Worker Script Settings

operationId: `worker-script-settings-get-settings`

**Response** 200 → `result`

- `logpush`: boolean default: `false` — Whether Logpush is turned on for the Worker.
- `observability`: any
- `tags`: any
- `tail_consumers`: object[] — List of Workers that will consume logs from the attached Worker.
  [array of]
  - `environment`: string — Optional environment if the Worker utilizes one.
  - `namespace`: string — Optional dispatch namespace the script belongs to.
  - `service`: string **required** — Name of Worker that is to be the consumer.

## PATCH /accounts/{account_id}/workers/scripts/{script_name}/script-settings

Patch Worker Script Settings

operationId: `worker-script-settings-patch-settings`

**Request** (application/json)

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

## GET /accounts/{account_id}/workers/scripts/{script_name}/secrets

List secrets bound to a Worker script

operationId: `worker-list-script-secrets`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `name`: string **required** — A JavaScript variable name for the binding.
- `text`: string **required** — The secret value to use.
- `type`: string **required** enum: `secret_text` — The kind of resource that the binding provides.

## PUT /accounts/{account_id}/workers/scripts/{script_name}/secrets

Add a secret to a Worker script

operationId: `worker-put-script-secret`

**Request** (application/json)

(one of 2 variants; showing the first)
- `name`: string **required** — A JavaScript variable name for the binding.
- `text`: string **required** — The secret value to use.
- `type`: string **required** enum: `secret_text` — The kind of resource that the binding provides.

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `name`: string **required** — A JavaScript variable name for the binding.
- `text`: string **required** — The secret value to use.
- `type`: string **required** enum: `secret_text` — The kind of resource that the binding provides.

## PATCH /accounts/{account_id}/workers/scripts/{script_name}/secrets-bulk

Patch multiple Worker script secrets

operationId: `worker-patch-script-secrets-bulk`

**Request** (application/json)

- `secrets`: object — Map of secret names to secret values:
- `version_tags`: object — Optional version tags to apply to the new script version.

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}

Delete Worker script secret

operationId: `worker-delete-script-secret` · query: `url_encoded`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}

Get a secret binding

operationId: `worker-get-script-secret` · query: `url_encoded`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `name`: string **required** — A JavaScript variable name for the binding.
- `text`: string **required** — The secret value to use.
- `type`: string **required** enum: `secret_text` — The kind of resource that the binding provides.

## GET /accounts/{account_id}/workers/scripts/{script_name}/settings

Get Worker Script and Version Settings

operationId: `worker-script-get-settings`

**Response** 200 → `result`

- `annotations`: object — Annotations for the Worker version. Annotations are not inherited across settings updates; omitting this field means the new version will ha
  - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
  - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the version. This is read-only and set by the server.
- `bindings`: any
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: any
- `compatibility_flags`: any
- `exports`: any — Declarative exports for the Worker. Worker entrypoint entries
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `limits`: object — Limits to apply for this Worker.
  - `cpu_ms`: integer — The amount of CPU time this Worker can use in milliseconds.
  - `subrequests`: integer — The number of subrequests this Worker can make per request.
- `logpush`: boolean default: `false` — Whether Logpush is turned on for the Worker.
- `migrations`: any — Migrations to apply for Durable Objects associated with this Worker.
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
- `placement`: any
- `tags`: any
- `tail_consumers`: any
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the Worker invocations.

## PATCH /accounts/{account_id}/workers/scripts/{script_name}/settings

Patch Worker Script and Version Settings

operationId: `worker-script-patch-settings`

**Request** (multipart/form-data)

- `settings`: object
  - `annotations`: object — Annotations for the Worker version. Annotations are not inherited across settings updates; omitting this field means the new version will ha
    - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
    - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
    - `workers/triggered_by`: string — Operation that triggered the creation of the version. This is read-only and set by the server.
  - `bindings`: any
  - `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
    - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
    - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
  - `compatibility_date`: any
  - `compatibility_flags`: any
  - `exports`: any — Declarative exports for the Worker. Worker entrypoint entries
  - `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
  - `limits`: object — Limits to apply for this Worker.
    - `cpu_ms`: integer — The amount of CPU time this Worker can use in milliseconds.
    - `subrequests`: integer — The number of subrequests this Worker can make per request.
  - `logpush`: boolean default: `false` — Whether Logpush is turned on for the Worker.
  - `migrations`: any — Migrations to apply for Durable Objects associated with this Worker.
  - `observability`: object — Observability settings for the Worker.
    - `enabled`: boolean **required** — Whether observability is enabled for the Worker.
    - `head_sampling_rate`: number — The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.
    - `issues`: object — Real-time Issues settings for the Worker.
    - `logs`: object — Log settings for the Worker.
    - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
    - `traces`: object — Trace settings for the Worker.
  - `placement`: any
  - `tags`: any
  - `tail_consumers`: any
  - `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the Worker invocations.

**Response** 200 → `result`

- `annotations`: object — Annotations for the Worker version. Annotations are not inherited across settings updates; omitting this field means the new version will ha
  - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
  - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the version. This is read-only and set by the server.
- `bindings`: any
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: any
- `compatibility_flags`: any
- `exports`: any — Declarative exports for the Worker. Worker entrypoint entries
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `limits`: object — Limits to apply for this Worker.
  - `cpu_ms`: integer — The amount of CPU time this Worker can use in milliseconds.
  - `subrequests`: integer — The number of subrequests this Worker can make per request.
- `logpush`: boolean default: `false` — Whether Logpush is turned on for the Worker.
- `migrations`: any — Migrations to apply for Durable Objects associated with this Worker.
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
- `placement`: any
- `tags`: any
- `tail_consumers`: any
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the Worker invocations.

## DELETE /accounts/{account_id}/workers/scripts/{script_name}/subdomain

Delete Worker Script Subdomain

operationId: `worker-script-delete-subdomain`

**Response** 200 → `result`

- `enabled`: boolean **required** default: `false` — Whether the Worker is available on the workers.dev subdomain.
- `previews_enabled`: boolean **required** — Whether the Worker's Preview URLs are available on the workers.dev subdomain.

## GET /accounts/{account_id}/workers/scripts/{script_name}/subdomain

Get Worker Script Subdomain

operationId: `worker-script-get-subdomain`

**Response** 200 → `result`

- `enabled`: boolean **required** default: `false` — Whether the Worker is available on the workers.dev subdomain.
- `previews_enabled`: boolean **required** — Whether the Worker's Preview URLs are available on the workers.dev subdomain.

## POST /accounts/{account_id}/workers/scripts/{script_name}/subdomain

Update Worker Script Subdomain

operationId: `worker-script-post-subdomain`

**Request** (application/json)

- `enabled`: boolean **required** — Whether the Worker should be available on the workers.dev subdomain.
- `previews_enabled`: boolean — Whether the Worker's Preview URLs should be available on the workers.dev subdomain.

**Response** 200 → `result`

- `enabled`: boolean **required** default: `false` — Whether the Worker is available on the workers.dev subdomain.
- `previews_enabled`: boolean **required** — Whether the Worker's Preview URLs are available on the workers.dev subdomain.

## GET /accounts/{account_id}/workers/scripts/{script_name}/usage-model

Get Worker Script Usage Model

operationId: `worker-script-fetch-usage-model`

**Response** 200 → `result`

- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the Worker invocations.
- `user_limits`: object — User-defined resource limits for Workers with standard usage model.
  - `cpu_ms`: integer — The amount of CPU time this Worker can use in milliseconds.

## PUT /accounts/{account_id}/workers/scripts/{script_name}/usage-model

Replace Worker Script Usage Model

operationId: `worker-script-update-usage-model`

**Request** (application/json)

- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the Worker invocations.
- `user_limits`: object — User-defined resource limits for Workers with standard usage model.
  - `cpu_ms`: integer — The amount of CPU time this Worker can use in milliseconds.

**Response** 200 → `result`

- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the Worker invocations.
- `user_limits`: object — User-defined resource limits for Workers with standard usage model.
  - `cpu_ms`: integer — The amount of CPU time this Worker can use in milliseconds.
