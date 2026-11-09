# Workers for Platforms

27 endpoints.

## GET /accounts/{account_id}/workers/dispatch/namespaces

List Workers for Platforms Dispatch Namespaces

operationId: `namespace-worker-list`

**Response** 200 → `result`

[array of]
- `created_by`: string — Identifier.
- `created_on`: string — When the script was created.
- `modified_by`: string — Identifier.
- `modified_on`: string — When the script was last modified.
- `namespace_id`: string — API Resource UUID tag.
- `namespace_name`: string — Name of the Workers for Platforms dispatch namespace.
- `script_count`: integer — The current number of scripts in this Dispatch Namespace.
- `trusted_workers`: boolean default: `false` — Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for th

## POST /accounts/{account_id}/workers/dispatch/namespaces

Create Workers for Platforms Dispatch Namespace

operationId: `namespace-worker-create`

**Request** (application/json)

- `name`: string — The name of the dispatch namespace.

**Response** 200 → `result`

- `created_by`: string — Identifier.
- `created_on`: string — When the script was created.
- `modified_by`: string — Identifier.
- `modified_on`: string — When the script was last modified.
- `namespace_id`: string — API Resource UUID tag.
- `namespace_name`: string — Name of the Workers for Platforms dispatch namespace.
- `script_count`: integer — The current number of scripts in this Dispatch Namespace.
- `trusted_workers`: boolean default: `false` — Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for th

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}

Delete Workers for Platforms Dispatch Namespace

operationId: `namespace-worker-delete-namespace`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}

Get Workers for Platforms Dispatch Namespace

operationId: `namespace-worker-get-namespace`

**Response** 200 → `result`

- `created_by`: string — Identifier.
- `created_on`: string — When the script was created.
- `modified_by`: string — Identifier.
- `modified_on`: string — When the script was last modified.
- `namespace_id`: string — API Resource UUID tag.
- `namespace_name`: string — Name of the Workers for Platforms dispatch namespace.
- `script_count`: integer — The current number of scripts in this Dispatch Namespace.
- `trusted_workers`: boolean default: `false` — Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for th

## PATCH /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}

Patch Workers for Platforms Dispatch Namespace

operationId: `namespace-worker-patch-namespace`

**Request** (application/json)

- `name`: string — The name of the dispatch namespace.
- `trusted_workers`: boolean default: `false` — Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for th

**Response** 200 → `result`

- `created_by`: string — Identifier.
- `created_on`: string — When the script was created.
- `modified_by`: string — Identifier.
- `modified_on`: string — When the script was last modified.
- `namespace_id`: string — API Resource UUID tag.
- `namespace_name`: string — Name of the Workers for Platforms dispatch namespace.
- `script_count`: integer — The current number of scripts in this Dispatch Namespace.
- `trusted_workers`: boolean default: `false` — Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for th

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}

Update Workers for Platforms Dispatch Namespace

operationId: `namespace-worker-put-namespace`

**Request** (application/json)

- `name`: string — The name of the dispatch namespace.
- `trusted_workers`: boolean default: `false` — Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for th

**Response** 200 → `result`

- `created_by`: string — Identifier.
- `created_on`: string — When the script was created.
- `modified_by`: string — Identifier.
- `modified_on`: string — When the script was last modified.
- `namespace_id`: string — API Resource UUID tag.
- `namespace_name`: string — Name of the Workers for Platforms dispatch namespace.
- `script_count`: integer — The current number of scripts in this Dispatch Namespace.
- `trusted_workers`: boolean default: `false` — Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for th

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts

Delete Workers for Platforms Scripts

operationId: `namespace-worker-delete-scripts` · query: `tags`, `limit`

**Response** 200 → `result`

- `deleted`: object[]
  [array of]
  - `id`: string — API Resource UUID tag.
- `deleted_count`: integer
- `has_more`: boolean

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts

List Workers for Platforms Scripts

operationId: `namespace-worker-list-scripts` · query: `tags`

**Response** 200 → `result`

[array of]
- `created_on`: string — When the script was created.
- `dispatch_namespace`: string — Name of the Workers for Platforms dispatch namespace.
- `modified_on`: string — When the script was last modified.
- `script`: object
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
    - `name`: string — The name of the export.
  - `observability`: object — Observability settings for the Worker.
    - `enabled`: boolean **required** — Whether observability is enabled for the Worker.
    - `head_sampling_rate`: number — The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.
    - `issues`: object — Real-time Issues settings for the Worker.
    - `logs`: object — Log settings for the Worker.
    - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
    - `traces`: object — Trace settings for the Worker.
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

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}

Delete Workers for Platforms Script

operationId: `namespace-worker-script-delete-worker` · query: `force`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}

Get Workers for Platforms Script details

operationId: `namespace-worker-script-worker-details`

**Response** 200 → `result`

- `created_on`: string — When the script was created.
- `dispatch_namespace`: string — Name of the Workers for Platforms dispatch namespace.
- `modified_on`: string — When the script was last modified.
- `script`: object
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
    - `name`: string — The name of the export.
  - `observability`: object — Observability settings for the Worker.
    - `enabled`: boolean **required** — Whether observability is enabled for the Worker.
    - `head_sampling_rate`: number — The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.
    - `issues`: object — Real-time Issues settings for the Worker.
    - `logs`: object — Log settings for the Worker.
    - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
    - `traces`: object — Trace settings for the Worker.
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

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}

Upload Workers for Platforms Script

operationId: `namespace-worker-script-upload-worker-module` · query: `bindings_inherit`

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

## POST /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/assets-upload-session

Create Workers for Platforms Assets Upload Session

operationId: `namespace-worker-script-update-create-assets-upload-session`

**Request** (application/json)

- `manifest`: object **required** — A manifest ([path]: {hash, size}) map of files to upload. As an example, `/blog/hello-world.html` would be a valid path key.

**Response** 200 → `result`

- `buckets`: array[] — The requests to make to upload assets.
  [array of]
  [array]
- `jwt`: string — A JWT to use as authentication for uploading assets.

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/bindings

Get Workers for Platforms Script Bindings

operationId: `namespace-worker-get-script-bindings`

**Response** 200 → `result`

[array of]
(one of 39 variants; showing the first)
- `name`: string **required** — A JavaScript variable name for the binding.
- `type`: string **required** enum: `ai` — The kind of resource that the binding provides.

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content

Get Workers for Platforms Script Content

operationId: `namespace-worker-get-script-content`

**Response** 200 → `result`

string

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content

Replace Workers for Platforms Script Content

operationId: `namespace-worker-put-script-content`

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

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets

List Workers for Platforms Script Secrets

operationId: `namespace-worker-list-script-secrets`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `name`: string **required** — A JavaScript variable name for the binding.
- `text`: string **required** — The secret value to use.
- `type`: string **required** enum: `secret_text` — The kind of resource that the binding provides.

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets

Add a secret to a Workers for Platforms script

operationId: `namespace-worker-put-script-secrets`

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

## PATCH /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets-bulk

Patch multiple Workers for Platforms script secrets

operationId: `namespace-worker-patch-script-secrets-bulk`

**Request** (application/json)

- `secrets`: object — Map of secret names to secret values:
- `version_tags`: object — Optional version tags to apply to the new script version.

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets/{secret_name}

Delete Workers for Platforms script secret

operationId: `namespace-worker-delete-script-secret` · query: `url_encoded`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets/{secret_name}

Get Workers for Platforms Script Secret

operationId: `namespace-worker-get-script-secrets` · query: `url_encoded`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `name`: string **required** — A JavaScript variable name for the binding.
- `text`: string **required** — The secret value to use.
- `type`: string **required** enum: `secret_text` — The kind of resource that the binding provides.

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/settings

Get Workers for Platforms Script Settings

operationId: `namespace-worker-get-script-settings`

**Response** 200 → `result`

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

## PATCH /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/settings

Patch Workers for Platforms Script Settings

operationId: `namespace-worker-patch-script-settings`

**Request** (multipart/form-data)

- `settings`: object — Script and version settings for Workers for Platforms namespace scripts. Same as script-and-version-settings-item but without annotations, w
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

## GET /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags

List Workers for Platforms Script Tags

operationId: `namespace-worker-get-script-tags`

**Response** 200 → `result`

[array of]
string

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags

Replace Workers for Platforms Script Tags

operationId: `namespace-worker-put-script-tags`

**Request** (application/json)

[array of]
string

**Response** 200 → `result`

[array of]
string

## DELETE /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags/{tag}

Delete Workers for Platforms Script Tag

operationId: `namespace-worker-delete-script-tag`

**Response** 200 → `result`

object

## PATCH /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags/{tag}

Update Workers for Platforms Script Tag

operationId: `namespace-worker-patch-script-tag`

**Request** (application/json)

- `value`: string **required**

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags/{tag}

Create Workers for Platforms Script Tag

operationId: `namespace-worker-put-script-tag`

**Response** 200 → `result`

object
