# Preview Deployments

5 endpoints.

## GET /accounts/{account_id}/workers/workers/{worker_id}/previews/{preview_id}/deployments

List Preview Deployments

operationId: `workers.previews.deployments.list` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `annotations`: object — Metadata about the deployment.
  - `workers/commit_sha`: string — Full commit SHA associated with the deployment, detected from the CI environment. Maximum 64 bytes.
  - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
  - `workers/pull_request_number`: string — Number of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 20 bytes.
  - `workers/pull_request_title`: string — Title of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/pull_request_url`: string — URL of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/repository_url`: string — URL of the source repository the deployment was built from, detected from the CI environment. Maximum 512 bytes.
  - `workers/tag`: string — User-provided identifier for the deployment. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `bindings`: any — Bindings attached to the deployment, as an array of objects
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: string[] default: `` — Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes 
  [array]
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `env`: any — Bindings attached to the deployment, keyed by binding name. An
- `exports`: any — Declarative exports for the deployment, including Durable
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the module that exports a `fetch` handler. Multipart uploads reference the file part by filename.
- `migrations`: any — Migrations for Durable Objects associated with the deployment. Migrations are applied when the deployment is created.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the deployment.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `author_email`: string **required** — Email of the user who created the deployment. May be empty for deployments created using an API token.
- `author_id`: string **required** — Identifier of the user who created the deployment.
- `created_on`: string **required** — When the deployment was created.
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Deployment identifier.
- `migration_tag`: string — Durable Object migration tag. Omitted if the Preview does not use Durable Objects.
- `number`: integer **required** — The integer deployment number, starting from one.
- `source`: string — The client used to create the deployment.
- `startup_time_ms`: integer — Time in milliseconds spent on Worker startup.
- `urls`: string[] **required** — All routable URLs that always point to this deployment.
  [array]

## POST /accounts/{account_id}/workers/workers/{worker_id}/previews/{preview_id}/deployments

Create Preview Deployment

operationId: `workers.previews.deployments.create`

**Request** (application/json)

- `annotations`: object — Metadata about the deployment.
  - `workers/commit_sha`: string — Full commit SHA associated with the deployment, detected from the CI environment. Maximum 64 bytes.
  - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
  - `workers/pull_request_number`: string — Number of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 20 bytes.
  - `workers/pull_request_title`: string — Title of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/pull_request_url`: string — URL of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/repository_url`: string — URL of the source repository the deployment was built from, detected from the CI environment. Maximum 512 bytes.
  - `workers/tag`: string — User-provided identifier for the deployment. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `bindings`: any — Bindings attached to the deployment, as an array of objects
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: string[] default: `` — Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes 
  [array]
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `env`: any — Bindings attached to the deployment, keyed by binding name. An
- `exports`: any — Declarative exports for the deployment, including Durable
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the module that exports a `fetch` handler. Multipart uploads reference the file part by filename.
- `migrations`: any — Migrations for Durable Objects associated with the deployment. Migrations are applied when the deployment is created.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the deployment.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.

**Response** 200 → `result`

- `annotations`: object — Metadata about the deployment.
  - `workers/commit_sha`: string — Full commit SHA associated with the deployment, detected from the CI environment. Maximum 64 bytes.
  - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
  - `workers/pull_request_number`: string — Number of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 20 bytes.
  - `workers/pull_request_title`: string — Title of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/pull_request_url`: string — URL of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/repository_url`: string — URL of the source repository the deployment was built from, detected from the CI environment. Maximum 512 bytes.
  - `workers/tag`: string — User-provided identifier for the deployment. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `bindings`: any — Bindings attached to the deployment, as an array of objects
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: string[] default: `` — Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes 
  [array]
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `env`: any — Bindings attached to the deployment, keyed by binding name. An
- `exports`: any — Declarative exports for the deployment, including Durable
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the module that exports a `fetch` handler. Multipart uploads reference the file part by filename.
- `migrations`: any — Migrations for Durable Objects associated with the deployment. Migrations are applied when the deployment is created.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the deployment.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `author_email`: string **required** — Email of the user who created the deployment. May be empty for deployments created using an API token.
- `author_id`: string **required** — Identifier of the user who created the deployment.
- `created_on`: string **required** — When the deployment was created.
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Deployment identifier.
- `migration_tag`: string — Durable Object migration tag. Omitted if the Preview does not use Durable Objects.
- `number`: integer **required** — The integer deployment number, starting from one.
- `source`: string — The client used to create the deployment.
- `startup_time_ms`: integer — Time in milliseconds spent on Worker startup.
- `urls`: string[] **required** — All routable URLs that always point to this deployment.
  [array]

## DELETE /accounts/{account_id}/workers/workers/{worker_id}/previews/{preview_id}/deployments/{deployment_id}

Delete Preview Deployment

operationId: `workers.previews.deployments.delete`

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

## GET /accounts/{account_id}/workers/workers/{worker_id}/previews/{preview_id}/deployments/{deployment_id}

Get Preview Deployment

operationId: `workers.previews.deployments.get` · query: `include`

**Response** 200 → `result`

- `annotations`: object — Metadata about the deployment.
  - `workers/commit_sha`: string — Full commit SHA associated with the deployment, detected from the CI environment. Maximum 64 bytes.
  - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
  - `workers/pull_request_number`: string — Number of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 20 bytes.
  - `workers/pull_request_title`: string — Title of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/pull_request_url`: string — URL of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/repository_url`: string — URL of the source repository the deployment was built from, detected from the CI environment. Maximum 512 bytes.
  - `workers/tag`: string — User-provided identifier for the deployment. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `bindings`: any — Bindings attached to the deployment, as an array of objects
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: string[] default: `` — Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes 
  [array]
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `env`: any — Bindings attached to the deployment, keyed by binding name. An
- `exports`: any — Declarative exports for the deployment, including Durable
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the module that exports a `fetch` handler. Multipart uploads reference the file part by filename.
- `migrations`: any — Migrations for Durable Objects associated with the deployment. Migrations are applied when the deployment is created.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the deployment.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `author_email`: string **required** — Email of the user who created the deployment. May be empty for deployments created using an API token.
- `author_id`: string **required** — Identifier of the user who created the deployment.
- `created_on`: string **required** — When the deployment was created.
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Deployment identifier.
- `migration_tag`: string — Durable Object migration tag. Omitted if the Preview does not use Durable Objects.
- `number`: integer **required** — The integer deployment number, starting from one.
- `source`: string — The client used to create the deployment.
- `startup_time_ms`: integer — Time in milliseconds spent on Worker startup.
- `urls`: string[] **required** — All routable URLs that always point to this deployment.
  [array]

## PATCH /accounts/{account_id}/workers/workers/{worker_id}/previews/{preview_id}/deployments/latest

Patch Latest Preview Deployment

operationId: `workers.previews.deployments.patchLatest`

**Request** (application/json)

- `annotations`: object — Metadata about the deployment.
  - `workers/commit_sha`: string — Full commit SHA associated with the deployment, detected from the CI environment. Maximum 64 bytes.
  - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
  - `workers/pull_request_number`: string — Number of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 20 bytes.
  - `workers/pull_request_title`: string — Title of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/pull_request_url`: string — URL of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/repository_url`: string — URL of the source repository the deployment was built from, detected from the CI environment. Maximum 512 bytes.
  - `workers/tag`: string — User-provided identifier for the deployment. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `bindings`: any — Bindings attached to the deployment, as an array of objects
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: string[] default: `` — Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes 
  [array]
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `env`: any — Bindings attached to the deployment, keyed by binding name. An
- `exports`: any — Declarative exports for the deployment, including Durable
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the module that exports a `fetch` handler. Multipart uploads reference the file part by filename.
- `migrations`: any — Migrations for Durable Objects associated with the deployment. Migrations are applied when the deployment is created.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the deployment.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.

**Response** 200 → `result`

- `annotations`: object — Metadata about the deployment.
  - `workers/commit_sha`: string — Full commit SHA associated with the deployment, detected from the CI environment. Maximum 64 bytes.
  - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
  - `workers/pull_request_number`: string — Number of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 20 bytes.
  - `workers/pull_request_title`: string — Title of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/pull_request_url`: string — URL of the pull or merge request associated with the deployment, detected from the CI environment. Maximum 512 bytes.
  - `workers/repository_url`: string — URL of the source repository the deployment was built from, detected from the CI environment. Maximum 512 bytes.
  - `workers/tag`: string — User-provided identifier for the deployment. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `bindings`: any — Bindings attached to the deployment, as an array of objects
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: string[] default: `` — Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes 
  [array]
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `env`: any — Bindings attached to the deployment, keyed by binding name. An
- `exports`: any — Declarative exports for the deployment, including Durable
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the module that exports a `fetch` handler. Multipart uploads reference the file part by filename.
- `migrations`: any — Migrations for Durable Objects associated with the deployment. Migrations are applied when the deployment is created.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the deployment.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `author_email`: string **required** — Email of the user who created the deployment. May be empty for deployments created using an API token.
- `author_id`: string **required** — Identifier of the user who created the deployment.
- `created_on`: string **required** — When the deployment was created.
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Deployment identifier.
- `migration_tag`: string — Durable Object migration tag. Omitted if the Preview does not use Durable Objects.
- `number`: integer **required** — The integer deployment number, starting from one.
- `source`: string — The client used to create the deployment.
- `startup_time_ms`: integer — Time in milliseconds spent on Worker startup.
- `urls`: string[] **required** — All routable URLs that always point to this deployment.
  [array]
