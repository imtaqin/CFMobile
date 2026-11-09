# Workers

18 endpoints.

## POST /accounts/{account_id}/builds/workers

Create Worker build configuration

operationId: `createWorkerBuild`

**Request** (application/json)

- `git_repository`: any **required**
- `previews_base_config`: object **required** — Build and deploy settings when creating a Worker build configuration
  - `build_caching_enabled`: boolean default: `true` — Whether builds reuse cached dependencies and build artifacts.
  - `build_command`: string **required** — Command to build the Worker.
  - `build_token_uuid`: string **required** — UUID of the build token used when deploying the Worker.
  - `deploy_command`: string **required** — Command to deploy the Worker.
  - `environment_variables`: object — Map of environment-variable names to build-time values. Names must begin with a letter or underscore and contain only letters, numbers, and 
  - `path_excludes`: string[] — Path patterns that must not start builds.
    [array]
  - `path_includes`: string[] default: `*` — Path patterns that can start builds.
    [array]
  - `root_directory`: any default: `/`
- `previews_enabled`: boolean **required** — Whether Previews are enabled for this Worker
- `production_settings`: object **required** — Build and deploy settings when creating a Worker build configuration
  - `build_caching_enabled`: boolean default: `true` — Whether builds reuse cached dependencies and build artifacts.
  - `build_command`: string **required** — Command to build the Worker.
  - `build_token_uuid`: string **required** — UUID of the build token used when deploying the Worker.
  - `deploy_command`: string **required** — Command to deploy the Worker.
  - `environment_variables`: object — Map of environment-variable names to build-time values. Names must begin with a letter or underscore and contain only letters, numbers, and 
  - `path_excludes`: string[] — Path patterns that must not start builds.
    [array]
  - `path_includes`: string[] default: `*` — Path patterns that can start builds.
    [array]
  - `root_directory`: any default: `/`
- `script_tag`: string **required** — System-generated tag of the Worker. This is not the Worker name.

**Response** 201 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/builds/workers/{external_script_id}/builds

List builds for a Worker

operationId: `listBuildsByScript` · query: `page`, `per_page`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/builds/workers/{external_script_id}/triggers

List triggers for a Worker

operationId: `listTriggersByScript`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## DELETE /accounts/{account_id}/builds/workers/{script_tag}

Delete Worker build configuration

operationId: `deleteWorkerBuild`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/builds/workers/{script_tag}

Get Worker build configuration

operationId: `getWorkerBuild`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PATCH /accounts/{account_id}/builds/workers/{script_tag}

Update Worker build configuration

operationId: `updateWorkerBuild` · query: `patch_existing_previews`

**Request** (application/json)

- `git_repository`: object — Git repository settings to update
  - `branch`: string — New git branch to watch for builds
- `previews_base_config`: object — Partial build settings for updating a Worker build configuration
  - `build_caching_enabled`: boolean default: `false` — Whether builds reuse cached dependencies and build artifacts.
  - `build_command`: string — Command to build the Worker.
  - `build_token_uuid`: string — UUID of the build token used when deploying the Worker.
  - `deploy_command`: string — Command to deploy the Worker.
  - `environment_variables`: object — Environment variable updates. Set the variable entry to null to delete it.
  - `path_excludes`: string[] — Path patterns that must not start builds.
    [array]
  - `path_includes`: string[] default: `*` — Path patterns that can start builds.
    [array]
  - `root_directory`: string — Repository directory in which build and deploy commands run.
- `previews_enabled`: boolean — Enable or disable Previews for this Worker. Enabling requires previews_base_config to already exist or to be sent in the same request.
- `production_settings`: object — Partial build settings for updating a Worker build configuration
  - `build_caching_enabled`: boolean default: `false` — Whether builds reuse cached dependencies and build artifacts.
  - `build_command`: string — Command to build the Worker.
  - `build_token_uuid`: string — UUID of the build token used when deploying the Worker.
  - `deploy_command`: string — Command to deploy the Worker.
  - `environment_variables`: object — Environment variable updates. Set the variable entry to null to delete it.
  - `path_excludes`: string[] — Path patterns that must not start builds.
    [array]
  - `path_includes`: string[] default: `*` — Path patterns that can start builds.
    [array]
  - `root_directory`: string — Repository directory in which build and deploy commands run.

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## POST /accounts/{account_id}/builds/workers/{script_tag}/migrate_to_previews

Migrate worker to previews

operationId: `migrateWorkerToPreviews`

**Request** (application/json)

- `deploy_command`: string — Deploy command for the migrated Preview settings. Omit it to have the existing 'wrangler versions upload' command rewritten to 'wrangler pre

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/builds/workers/{script_tag}/previews

List previews

operationId: `listWorkerPreviews` · query: `page`, `per_page`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/builds/workers/{script_tag}/previews/{preview_id}

Get preview

operationId: `getWorkerPreview`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PATCH /accounts/{account_id}/builds/workers/{script_tag}/previews/{preview_id}

Update preview

operationId: `updateWorkerPreview`

**Request** (application/json)

- `auto_build`: boolean — Whether pushes to the git branch build this Preview. Deploy hooks, manual builds, and retries run regardless of this setting.
- `auto_delete`: boolean — Whether deleting the git branch also deletes this Preview.
- `branch`: string — Git branch this Preview tracks
- `settings`: object — Partial build settings for updating a Worker build configuration
  - `build_caching_enabled`: boolean default: `false` — Whether builds reuse cached dependencies and build artifacts.
  - `build_command`: string — Command to build the Worker.
  - `build_token_uuid`: string — UUID of the build token used when deploying the Worker.
  - `deploy_command`: string — Command to deploy the Worker.
  - `environment_variables`: object — Environment variable updates. Set the variable entry to null to delete it.
  - `path_excludes`: string[] — Path patterns that must not start builds.
    [array]
  - `path_includes`: string[] default: `*` — Path patterns that can start builds.
    [array]
  - `root_directory`: string — Repository directory in which build and deploy commands run.

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/builds/workers/{script_tag}/previews/{preview_id}/builds

List builds by preview

operationId: `listBuildsByPreview` · query: `page`, `per_page`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## POST /accounts/{account_id}/builds/workers/{script_tag}/previews/{preview_id}/builds

Create preview build

operationId: `createPreviewBuild`

**Request** (application/json)

(one of 2 variants; showing the first)

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/workers/workers

List Workers

operationId: `listWorkers` · query: `page`, `per_page`, `order_by`, `order`

**Response** 200 → `result`

[array of]
- `created_on`: string **required** — When the Worker was created.
- `deployed_on`: string — When the Worker's most recent deployment was created. `null` if the Worker has never been deployed.
- `id`: string **required** — Immutable ID of the Worker.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Worker.
- `name`: string **required** — Name of the Worker.
- `observability`: object **required** — Observability settings for the Worker.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Worker.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Worker.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Worker.
  - `logs`: object — Log settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Wo
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Worker.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Worker.
    - `propagation_policy`: string enum: `authenticated`, `accept`, `null` — Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" honors inbound trace c
- `previews_base_config`: any — Template configuration used when creating new Previews for this Worker.
- `references`: object **required** — Other resources that reference the Worker and depend on it existing.
  - `dispatch_namespace_outbounds`: object[] **required** — Other Workers that reference the Worker as an outbound for a dispatch namespace.
    [array of]
    - `namespace_id`: string **required** — ID of the dispatch namespace.
    - `namespace_name`: string **required** — Name of the dispatch namespace.
    - `worker_id`: string **required** — ID of the Worker using the dispatch namespace.
    - `worker_name`: string **required** — Name of the Worker using the dispatch namespace.
  - `domains`: object[] **required** — Custom domains connected to the Worker.
    [array of]
    - `certificate_id`: string **required** — ID of the TLS certificate issued for the custom domain.
    - `hostname`: string **required** — Full hostname of the custom domain, including the zone name.
    - `id`: string **required** — ID of the custom domain.
    - `zone_id`: string **required** — ID of the zone.
    - `zone_name`: string **required** — Name of the zone.
  - `durable_objects`: object[] **required** — Other Workers that reference Durable Object classes implemented by the Worker.
    [array of]
    - `namespace_id`: string **required** — ID of the Durable Object namespace being used.
    - `namespace_name`: string **required** — Name of the Durable Object namespace being used.
    - `worker_id`: string **required** — ID of the Worker using the Durable Object implementation.
    - `worker_name`: string **required** — Name of the Worker using the Durable Object implementation.
  - `queues`: object[] **required** — Queues that send messages to the Worker.
    [array of]
    - `queue_consumer_id`: string **required** — ID of the queue consumer configuration.
    - `queue_id`: string **required** — ID of the queue.
    - `queue_name`: string **required** — Name of the queue.
  - `workers`: object[] **required** — Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bin
    [array of]
    - `id`: string **required** — ID of the referencing Worker.
    - `name`: string **required** — Name of the referencing Worker.
- `subdomain`: object **required** — Subdomain settings for the Worker.
  - `enabled`: boolean default: `false` — Whether the *.workers.dev subdomain is enabled for the Worker.
  - `preview_url_suffix`: string — Prepend a version or preview prefix to this host suffix to form the *.workers.dev [preview URL](https://developers.cloudflare.com/workers/co
  - `previews_enabled`: boolean — Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.
  - `url`: string — The address the Worker would serve on once its *.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain
- `tags`: string[] **required** default: `` — Tags associated with the Worker.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Worker.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Worker was most recently updated.

## POST /accounts/{account_id}/workers/workers

Create Worker

operationId: `createWorker`

**Request** (application/json)

- `created_on`: string **required** — When the Worker was created.
- `deployed_on`: string — When the Worker's most recent deployment was created. `null` if the Worker has never been deployed.
- `id`: string **required** — Immutable ID of the Worker.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Worker.
- `name`: string **required** — Name of the Worker.
- `observability`: object **required** — Observability settings for the Worker.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Worker.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Worker.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Worker.
  - `logs`: object — Log settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Wo
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Worker.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Worker.
    - `propagation_policy`: string enum: `authenticated`, `accept`, `null` — Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" honors inbound trace c
- `previews_base_config`: any — Template configuration used when creating new Previews for this Worker.
- `references`: object **required** — Other resources that reference the Worker and depend on it existing.
  - `dispatch_namespace_outbounds`: object[] **required** — Other Workers that reference the Worker as an outbound for a dispatch namespace.
    [array of]
    - `namespace_id`: string **required** — ID of the dispatch namespace.
    - `namespace_name`: string **required** — Name of the dispatch namespace.
    - `worker_id`: string **required** — ID of the Worker using the dispatch namespace.
    - `worker_name`: string **required** — Name of the Worker using the dispatch namespace.
  - `domains`: object[] **required** — Custom domains connected to the Worker.
    [array of]
    - `certificate_id`: string **required** — ID of the TLS certificate issued for the custom domain.
    - `hostname`: string **required** — Full hostname of the custom domain, including the zone name.
    - `id`: string **required** — ID of the custom domain.
    - `zone_id`: string **required** — ID of the zone.
    - `zone_name`: string **required** — Name of the zone.
  - `durable_objects`: object[] **required** — Other Workers that reference Durable Object classes implemented by the Worker.
    [array of]
    - `namespace_id`: string **required** — ID of the Durable Object namespace being used.
    - `namespace_name`: string **required** — Name of the Durable Object namespace being used.
    - `worker_id`: string **required** — ID of the Worker using the Durable Object implementation.
    - `worker_name`: string **required** — Name of the Worker using the Durable Object implementation.
  - `queues`: object[] **required** — Queues that send messages to the Worker.
    [array of]
    - `queue_consumer_id`: string **required** — ID of the queue consumer configuration.
    - `queue_id`: string **required** — ID of the queue.
    - `queue_name`: string **required** — Name of the queue.
  - `workers`: object[] **required** — Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bin
    [array of]
    - `id`: string **required** — ID of the referencing Worker.
    - `name`: string **required** — Name of the referencing Worker.
- `subdomain`: object **required** — Subdomain settings for the Worker.
  - `enabled`: boolean default: `false` — Whether the *.workers.dev subdomain is enabled for the Worker.
  - `preview_url_suffix`: string — Prepend a version or preview prefix to this host suffix to form the *.workers.dev [preview URL](https://developers.cloudflare.com/workers/co
  - `previews_enabled`: boolean — Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.
  - `url`: string — The address the Worker would serve on once its *.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain
- `tags`: string[] **required** default: `` — Tags associated with the Worker.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Worker.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Worker was most recently updated.
object

**Response** 200 → `result`

- `created_on`: string **required** — When the Worker was created.
- `deployed_on`: string — When the Worker's most recent deployment was created. `null` if the Worker has never been deployed.
- `id`: string **required** — Immutable ID of the Worker.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Worker.
- `name`: string **required** — Name of the Worker.
- `observability`: object **required** — Observability settings for the Worker.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Worker.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Worker.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Worker.
  - `logs`: object — Log settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Wo
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Worker.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Worker.
    - `propagation_policy`: string enum: `authenticated`, `accept`, `null` — Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" honors inbound trace c
- `previews_base_config`: any — Template configuration used when creating new Previews for this Worker.
- `references`: object **required** — Other resources that reference the Worker and depend on it existing.
  - `dispatch_namespace_outbounds`: object[] **required** — Other Workers that reference the Worker as an outbound for a dispatch namespace.
    [array of]
    - `namespace_id`: string **required** — ID of the dispatch namespace.
    - `namespace_name`: string **required** — Name of the dispatch namespace.
    - `worker_id`: string **required** — ID of the Worker using the dispatch namespace.
    - `worker_name`: string **required** — Name of the Worker using the dispatch namespace.
  - `domains`: object[] **required** — Custom domains connected to the Worker.
    [array of]
    - `certificate_id`: string **required** — ID of the TLS certificate issued for the custom domain.
    - `hostname`: string **required** — Full hostname of the custom domain, including the zone name.
    - `id`: string **required** — ID of the custom domain.
    - `zone_id`: string **required** — ID of the zone.
    - `zone_name`: string **required** — Name of the zone.
  - `durable_objects`: object[] **required** — Other Workers that reference Durable Object classes implemented by the Worker.
    [array of]
    - `namespace_id`: string **required** — ID of the Durable Object namespace being used.
    - `namespace_name`: string **required** — Name of the Durable Object namespace being used.
    - `worker_id`: string **required** — ID of the Worker using the Durable Object implementation.
    - `worker_name`: string **required** — Name of the Worker using the Durable Object implementation.
  - `queues`: object[] **required** — Queues that send messages to the Worker.
    [array of]
    - `queue_consumer_id`: string **required** — ID of the queue consumer configuration.
    - `queue_id`: string **required** — ID of the queue.
    - `queue_name`: string **required** — Name of the queue.
  - `workers`: object[] **required** — Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bin
    [array of]
    - `id`: string **required** — ID of the referencing Worker.
    - `name`: string **required** — Name of the referencing Worker.
- `subdomain`: object **required** — Subdomain settings for the Worker.
  - `enabled`: boolean default: `false` — Whether the *.workers.dev subdomain is enabled for the Worker.
  - `preview_url_suffix`: string — Prepend a version or preview prefix to this host suffix to form the *.workers.dev [preview URL](https://developers.cloudflare.com/workers/co
  - `previews_enabled`: boolean — Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.
  - `url`: string — The address the Worker would serve on once its *.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain
- `tags`: string[] **required** default: `` — Tags associated with the Worker.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Worker.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Worker was most recently updated.

## DELETE /accounts/{account_id}/workers/workers/{worker_id}

Delete Worker

operationId: `deleteWorker` · query: `force`

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

## GET /accounts/{account_id}/workers/workers/{worker_id}

Get Worker

operationId: `getWorker`

**Response** 200 → `result`

- `created_on`: string **required** — When the Worker was created.
- `deployed_on`: string — When the Worker's most recent deployment was created. `null` if the Worker has never been deployed.
- `id`: string **required** — Immutable ID of the Worker.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Worker.
- `name`: string **required** — Name of the Worker.
- `observability`: object **required** — Observability settings for the Worker.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Worker.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Worker.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Worker.
  - `logs`: object — Log settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Wo
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Worker.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Worker.
    - `propagation_policy`: string enum: `authenticated`, `accept`, `null` — Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" honors inbound trace c
- `previews_base_config`: any — Template configuration used when creating new Previews for this Worker.
- `references`: object **required** — Other resources that reference the Worker and depend on it existing.
  - `dispatch_namespace_outbounds`: object[] **required** — Other Workers that reference the Worker as an outbound for a dispatch namespace.
    [array of]
    - `namespace_id`: string **required** — ID of the dispatch namespace.
    - `namespace_name`: string **required** — Name of the dispatch namespace.
    - `worker_id`: string **required** — ID of the Worker using the dispatch namespace.
    - `worker_name`: string **required** — Name of the Worker using the dispatch namespace.
  - `domains`: object[] **required** — Custom domains connected to the Worker.
    [array of]
    - `certificate_id`: string **required** — ID of the TLS certificate issued for the custom domain.
    - `hostname`: string **required** — Full hostname of the custom domain, including the zone name.
    - `id`: string **required** — ID of the custom domain.
    - `zone_id`: string **required** — ID of the zone.
    - `zone_name`: string **required** — Name of the zone.
  - `durable_objects`: object[] **required** — Other Workers that reference Durable Object classes implemented by the Worker.
    [array of]
    - `namespace_id`: string **required** — ID of the Durable Object namespace being used.
    - `namespace_name`: string **required** — Name of the Durable Object namespace being used.
    - `worker_id`: string **required** — ID of the Worker using the Durable Object implementation.
    - `worker_name`: string **required** — Name of the Worker using the Durable Object implementation.
  - `queues`: object[] **required** — Queues that send messages to the Worker.
    [array of]
    - `queue_consumer_id`: string **required** — ID of the queue consumer configuration.
    - `queue_id`: string **required** — ID of the queue.
    - `queue_name`: string **required** — Name of the queue.
  - `workers`: object[] **required** — Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bin
    [array of]
    - `id`: string **required** — ID of the referencing Worker.
    - `name`: string **required** — Name of the referencing Worker.
- `subdomain`: object **required** — Subdomain settings for the Worker.
  - `enabled`: boolean default: `false` — Whether the *.workers.dev subdomain is enabled for the Worker.
  - `preview_url_suffix`: string — Prepend a version or preview prefix to this host suffix to form the *.workers.dev [preview URL](https://developers.cloudflare.com/workers/co
  - `previews_enabled`: boolean — Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.
  - `url`: string — The address the Worker would serve on once its *.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain
- `tags`: string[] **required** default: `` — Tags associated with the Worker.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Worker.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Worker was most recently updated.

## PATCH /accounts/{account_id}/workers/workers/{worker_id}

Edit Worker

operationId: `editWorker`

**Request** (application/json)

- `created_on`: string **required** — When the Worker was created.
- `deployed_on`: string — When the Worker's most recent deployment was created. `null` if the Worker has never been deployed.
- `id`: string **required** — Immutable ID of the Worker.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Worker.
- `name`: string **required** — Name of the Worker.
- `observability`: object **required** — Observability settings for the Worker.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Worker.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Worker.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Worker.
  - `logs`: object — Log settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Wo
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Worker.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Worker.
    - `propagation_policy`: string enum: `authenticated`, `accept`, `null` — Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" honors inbound trace c
- `previews_base_config`: any — Template configuration used when creating new Previews for this Worker.
- `references`: object **required** — Other resources that reference the Worker and depend on it existing.
  - `dispatch_namespace_outbounds`: object[] **required** — Other Workers that reference the Worker as an outbound for a dispatch namespace.
    [array of]
    - `namespace_id`: string **required** — ID of the dispatch namespace.
    - `namespace_name`: string **required** — Name of the dispatch namespace.
    - `worker_id`: string **required** — ID of the Worker using the dispatch namespace.
    - `worker_name`: string **required** — Name of the Worker using the dispatch namespace.
  - `domains`: object[] **required** — Custom domains connected to the Worker.
    [array of]
    - `certificate_id`: string **required** — ID of the TLS certificate issued for the custom domain.
    - `hostname`: string **required** — Full hostname of the custom domain, including the zone name.
    - `id`: string **required** — ID of the custom domain.
    - `zone_id`: string **required** — ID of the zone.
    - `zone_name`: string **required** — Name of the zone.
  - `durable_objects`: object[] **required** — Other Workers that reference Durable Object classes implemented by the Worker.
    [array of]
    - `namespace_id`: string **required** — ID of the Durable Object namespace being used.
    - `namespace_name`: string **required** — Name of the Durable Object namespace being used.
    - `worker_id`: string **required** — ID of the Worker using the Durable Object implementation.
    - `worker_name`: string **required** — Name of the Worker using the Durable Object implementation.
  - `queues`: object[] **required** — Queues that send messages to the Worker.
    [array of]
    - `queue_consumer_id`: string **required** — ID of the queue consumer configuration.
    - `queue_id`: string **required** — ID of the queue.
    - `queue_name`: string **required** — Name of the queue.
  - `workers`: object[] **required** — Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bin
    [array of]
    - `id`: string **required** — ID of the referencing Worker.
    - `name`: string **required** — Name of the referencing Worker.
- `subdomain`: object **required** — Subdomain settings for the Worker.
  - `enabled`: boolean default: `false` — Whether the *.workers.dev subdomain is enabled for the Worker.
  - `preview_url_suffix`: string — Prepend a version or preview prefix to this host suffix to form the *.workers.dev [preview URL](https://developers.cloudflare.com/workers/co
  - `previews_enabled`: boolean — Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.
  - `url`: string — The address the Worker would serve on once its *.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain
- `tags`: string[] **required** default: `` — Tags associated with the Worker.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Worker.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Worker was most recently updated.
object

**Response** 200 → `result`

- `created_on`: string **required** — When the Worker was created.
- `deployed_on`: string — When the Worker's most recent deployment was created. `null` if the Worker has never been deployed.
- `id`: string **required** — Immutable ID of the Worker.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Worker.
- `name`: string **required** — Name of the Worker.
- `observability`: object **required** — Observability settings for the Worker.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Worker.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Worker.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Worker.
  - `logs`: object — Log settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Wo
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Worker.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Worker.
    - `propagation_policy`: string enum: `authenticated`, `accept`, `null` — Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" honors inbound trace c
- `previews_base_config`: any — Template configuration used when creating new Previews for this Worker.
- `references`: object **required** — Other resources that reference the Worker and depend on it existing.
  - `dispatch_namespace_outbounds`: object[] **required** — Other Workers that reference the Worker as an outbound for a dispatch namespace.
    [array of]
    - `namespace_id`: string **required** — ID of the dispatch namespace.
    - `namespace_name`: string **required** — Name of the dispatch namespace.
    - `worker_id`: string **required** — ID of the Worker using the dispatch namespace.
    - `worker_name`: string **required** — Name of the Worker using the dispatch namespace.
  - `domains`: object[] **required** — Custom domains connected to the Worker.
    [array of]
    - `certificate_id`: string **required** — ID of the TLS certificate issued for the custom domain.
    - `hostname`: string **required** — Full hostname of the custom domain, including the zone name.
    - `id`: string **required** — ID of the custom domain.
    - `zone_id`: string **required** — ID of the zone.
    - `zone_name`: string **required** — Name of the zone.
  - `durable_objects`: object[] **required** — Other Workers that reference Durable Object classes implemented by the Worker.
    [array of]
    - `namespace_id`: string **required** — ID of the Durable Object namespace being used.
    - `namespace_name`: string **required** — Name of the Durable Object namespace being used.
    - `worker_id`: string **required** — ID of the Worker using the Durable Object implementation.
    - `worker_name`: string **required** — Name of the Worker using the Durable Object implementation.
  - `queues`: object[] **required** — Queues that send messages to the Worker.
    [array of]
    - `queue_consumer_id`: string **required** — ID of the queue consumer configuration.
    - `queue_id`: string **required** — ID of the queue.
    - `queue_name`: string **required** — Name of the queue.
  - `workers`: object[] **required** — Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bin
    [array of]
    - `id`: string **required** — ID of the referencing Worker.
    - `name`: string **required** — Name of the referencing Worker.
- `subdomain`: object **required** — Subdomain settings for the Worker.
  - `enabled`: boolean default: `false` — Whether the *.workers.dev subdomain is enabled for the Worker.
  - `preview_url_suffix`: string — Prepend a version or preview prefix to this host suffix to form the *.workers.dev [preview URL](https://developers.cloudflare.com/workers/co
  - `previews_enabled`: boolean — Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.
  - `url`: string — The address the Worker would serve on once its *.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain
- `tags`: string[] **required** default: `` — Tags associated with the Worker.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Worker.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Worker was most recently updated.

## PUT /accounts/{account_id}/workers/workers/{worker_id}

Update Worker

operationId: `updateWorker`

**Request** (application/json)

- `created_on`: string **required** — When the Worker was created.
- `deployed_on`: string — When the Worker's most recent deployment was created. `null` if the Worker has never been deployed.
- `id`: string **required** — Immutable ID of the Worker.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Worker.
- `name`: string **required** — Name of the Worker.
- `observability`: object **required** — Observability settings for the Worker.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Worker.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Worker.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Worker.
  - `logs`: object — Log settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Wo
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Worker.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Worker.
    - `propagation_policy`: string enum: `authenticated`, `accept`, `null` — Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" honors inbound trace c
- `previews_base_config`: any — Template configuration used when creating new Previews for this Worker.
- `references`: object **required** — Other resources that reference the Worker and depend on it existing.
  - `dispatch_namespace_outbounds`: object[] **required** — Other Workers that reference the Worker as an outbound for a dispatch namespace.
    [array of]
    - `namespace_id`: string **required** — ID of the dispatch namespace.
    - `namespace_name`: string **required** — Name of the dispatch namespace.
    - `worker_id`: string **required** — ID of the Worker using the dispatch namespace.
    - `worker_name`: string **required** — Name of the Worker using the dispatch namespace.
  - `domains`: object[] **required** — Custom domains connected to the Worker.
    [array of]
    - `certificate_id`: string **required** — ID of the TLS certificate issued for the custom domain.
    - `hostname`: string **required** — Full hostname of the custom domain, including the zone name.
    - `id`: string **required** — ID of the custom domain.
    - `zone_id`: string **required** — ID of the zone.
    - `zone_name`: string **required** — Name of the zone.
  - `durable_objects`: object[] **required** — Other Workers that reference Durable Object classes implemented by the Worker.
    [array of]
    - `namespace_id`: string **required** — ID of the Durable Object namespace being used.
    - `namespace_name`: string **required** — Name of the Durable Object namespace being used.
    - `worker_id`: string **required** — ID of the Worker using the Durable Object implementation.
    - `worker_name`: string **required** — Name of the Worker using the Durable Object implementation.
  - `queues`: object[] **required** — Queues that send messages to the Worker.
    [array of]
    - `queue_consumer_id`: string **required** — ID of the queue consumer configuration.
    - `queue_id`: string **required** — ID of the queue.
    - `queue_name`: string **required** — Name of the queue.
  - `workers`: object[] **required** — Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bin
    [array of]
    - `id`: string **required** — ID of the referencing Worker.
    - `name`: string **required** — Name of the referencing Worker.
- `subdomain`: object **required** — Subdomain settings for the Worker.
  - `enabled`: boolean default: `false` — Whether the *.workers.dev subdomain is enabled for the Worker.
  - `preview_url_suffix`: string — Prepend a version or preview prefix to this host suffix to form the *.workers.dev [preview URL](https://developers.cloudflare.com/workers/co
  - `previews_enabled`: boolean — Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.
  - `url`: string — The address the Worker would serve on once its *.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain
- `tags`: string[] **required** default: `` — Tags associated with the Worker.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Worker.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Worker was most recently updated.
object

**Response** 200 → `result`

- `created_on`: string **required** — When the Worker was created.
- `deployed_on`: string — When the Worker's most recent deployment was created. `null` if the Worker has never been deployed.
- `id`: string **required** — Immutable ID of the Worker.
- `logpush`: boolean **required** default: `false` — Whether logpush is enabled for the Worker.
- `name`: string **required** — Name of the Worker.
- `observability`: object **required** — Observability settings for the Worker.
  - `enabled`: boolean default: `false` — Whether observability is enabled for the Worker.
  - `head_sampling_rate`: number default: `1` — The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).
  - `issues`: object — Real-time Issues settings for the Worker.
    - `enabled`: boolean default: `false` — Whether real-time Issues are enabled for the Worker.
  - `logs`: object — Log settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where logs will be exported to.
    - `enabled`: boolean default: `false` — Whether logs are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `invocation_logs`: boolean default: `true` — Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Wo
    - `persist`: boolean default: `true` — Whether log persistence is enabled for the Worker.
  - `redact_query_string`: boolean default: `false` — Whether query strings are removed from request URLs in logs and traces.
  - `traces`: object — Trace settings for the Worker.
    - `destinations`: string[] default: `` — A list of destinations where traces will be exported to.
    - `enabled`: boolean default: `false` — Whether traces are enabled for the Worker.
    - `head_sampling_rate`: number default: `1` — The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).
    - `persist`: boolean default: `true` — Whether trace persistence is enabled for the Worker.
    - `propagation_policy`: string enum: `authenticated`, `accept`, `null` — Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" honors inbound trace c
- `previews_base_config`: any — Template configuration used when creating new Previews for this Worker.
- `references`: object **required** — Other resources that reference the Worker and depend on it existing.
  - `dispatch_namespace_outbounds`: object[] **required** — Other Workers that reference the Worker as an outbound for a dispatch namespace.
    [array of]
    - `namespace_id`: string **required** — ID of the dispatch namespace.
    - `namespace_name`: string **required** — Name of the dispatch namespace.
    - `worker_id`: string **required** — ID of the Worker using the dispatch namespace.
    - `worker_name`: string **required** — Name of the Worker using the dispatch namespace.
  - `domains`: object[] **required** — Custom domains connected to the Worker.
    [array of]
    - `certificate_id`: string **required** — ID of the TLS certificate issued for the custom domain.
    - `hostname`: string **required** — Full hostname of the custom domain, including the zone name.
    - `id`: string **required** — ID of the custom domain.
    - `zone_id`: string **required** — ID of the zone.
    - `zone_name`: string **required** — Name of the zone.
  - `durable_objects`: object[] **required** — Other Workers that reference Durable Object classes implemented by the Worker.
    [array of]
    - `namespace_id`: string **required** — ID of the Durable Object namespace being used.
    - `namespace_name`: string **required** — Name of the Durable Object namespace being used.
    - `worker_id`: string **required** — ID of the Worker using the Durable Object implementation.
    - `worker_name`: string **required** — Name of the Worker using the Durable Object implementation.
  - `queues`: object[] **required** — Queues that send messages to the Worker.
    [array of]
    - `queue_consumer_id`: string **required** — ID of the queue consumer configuration.
    - `queue_id`: string **required** — ID of the queue.
    - `queue_name`: string **required** — Name of the queue.
  - `workers`: object[] **required** — Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bin
    [array of]
    - `id`: string **required** — ID of the referencing Worker.
    - `name`: string **required** — Name of the referencing Worker.
- `subdomain`: object **required** — Subdomain settings for the Worker.
  - `enabled`: boolean default: `false` — Whether the *.workers.dev subdomain is enabled for the Worker.
  - `preview_url_suffix`: string — Prepend a version or preview prefix to this host suffix to form the *.workers.dev [preview URL](https://developers.cloudflare.com/workers/co
  - `previews_enabled`: boolean — Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.
  - `url`: string — The address the Worker would serve on once its *.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain
- `tags`: string[] **required** default: `` — Tags associated with the Worker.
  [array]
- `tail_consumers`: object[] **required** default: `` — Other Workers that should consume logs from the Worker.
  [array of]
  - `name`: string **required** — Name of the consumer Worker.
- `updated_on`: string **required** — When the Worker was most recently updated.
