# Versions

6 endpoints.

## GET /accounts/{account_id}/workers/workers/{worker_id}/versions

List Worker Versions

operationId: `listWorkerVersions` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `annotations`: object — Metadata about the version.
  - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
  - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the version.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `author_email`: string — Email of the user who created the version.
- `author_id`: string — Identifier of the user who created the version.
- `bindings`: object[] — List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration
  [array of]
  - `name`: string **required** — A JavaScript variable name for the binding.
  - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: any — Enables or disables specific Workers runtime features, such as upcoming features or changes outside the `compatibility_date`.
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `created_on`: string **required** — When the version was created.
- `exports`: any — Declarative exports for the version, including Durable Object
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Version identifier.
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).
- `migration_tag`: string — Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Dura
- `migrations`: any — Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `number`: integer **required** — The integer version number, starting from one.
- `package_dependencies`: object[] — The list of npm packages that were installed and used when this Worker
  [array of]
  - `installedVersion`: string **required** — The exact version that was resolved and installed by the package manager.
  - `name`: string **required** — The npm package name.
  - `packageJsonVersion`: string **required** — The version constraint as written in package.json.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `source`: string — The client used to create the version.
- `startup_time_ms`: integer — Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).
- `urls`: string[] **required** — All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different versi
  [array]
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the version.

## POST /accounts/{account_id}/workers/workers/{worker_id}/versions

Create Worker Version

operationId: `createWorkerVersion` · query: `deploy`

**Request** (application/json)

- `annotations`: object — Metadata about the version.
  - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
  - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the version.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `author_email`: string — Email of the user who created the version.
- `author_id`: string — Identifier of the user who created the version.
- `bindings`: object[] — List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration
  [array of]
  - `name`: string **required** — A JavaScript variable name for the binding.
  - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: any — Enables or disables specific Workers runtime features, such as upcoming features or changes outside the `compatibility_date`.
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `created_on`: string **required** — When the version was created.
- `exports`: any — Declarative exports for the version, including Durable Object
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Version identifier.
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).
- `migration_tag`: string — Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Dura
- `migrations`: any — Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `number`: integer **required** — The integer version number, starting from one.
- `package_dependencies`: object[] — The list of npm packages that were installed and used when this Worker
  [array of]
  - `installedVersion`: string **required** — The exact version that was resolved and installed by the package manager.
  - `name`: string **required** — The npm package name.
  - `packageJsonVersion`: string **required** — The version constraint as written in package.json.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `source`: string — The client used to create the version.
- `startup_time_ms`: integer — Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).
- `urls`: string[] **required** — All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different versi
  [array]
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the version.

**Response** 200 → `result`

- `annotations`: object — Metadata about the version.
  - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
  - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the version.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `author_email`: string — Email of the user who created the version.
- `author_id`: string — Identifier of the user who created the version.
- `bindings`: object[] — List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration
  [array of]
  - `name`: string **required** — A JavaScript variable name for the binding.
  - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: any — Enables or disables specific Workers runtime features, such as upcoming features or changes outside the `compatibility_date`.
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `created_on`: string **required** — When the version was created.
- `exports`: any — Declarative exports for the version, including Durable Object
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Version identifier.
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).
- `migration_tag`: string — Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Dura
- `migrations`: any — Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `number`: integer **required** — The integer version number, starting from one.
- `package_dependencies`: object[] — The list of npm packages that were installed and used when this Worker
  [array of]
  - `installedVersion`: string **required** — The exact version that was resolved and installed by the package manager.
  - `name`: string **required** — The npm package name.
  - `packageJsonVersion`: string **required** — The version constraint as written in package.json.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `source`: string — The client used to create the version.
- `startup_time_ms`: integer — Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).
- `urls`: string[] **required** — All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different versi
  [array]
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the version.

## DELETE /accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}

Delete Worker Version

operationId: `deleteWorkerVersion`

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

## GET /accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}

Get Worker Version

operationId: `getWorkerVersion` · query: `include`

**Response** 200 → `result`

- `annotations`: object — Metadata about the version.
  - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
  - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the version.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `author_email`: string — Email of the user who created the version.
- `author_id`: string — Identifier of the user who created the version.
- `bindings`: object[] — List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration
  [array of]
  - `name`: string **required** — A JavaScript variable name for the binding.
  - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: any — Enables or disables specific Workers runtime features, such as upcoming features or changes outside the `compatibility_date`.
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `created_on`: string **required** — When the version was created.
- `exports`: any — Declarative exports for the version, including Durable Object
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Version identifier.
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).
- `migration_tag`: string — Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Dura
- `migrations`: any — Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `number`: integer **required** — The integer version number, starting from one.
- `package_dependencies`: object[] — The list of npm packages that were installed and used when this Worker
  [array of]
  - `installedVersion`: string **required** — The exact version that was resolved and installed by the package manager.
  - `name`: string **required** — The npm package name.
  - `packageJsonVersion`: string **required** — The version constraint as written in package.json.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `source`: string — The client used to create the version.
- `startup_time_ms`: integer — Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).
- `urls`: string[] **required** — All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different versi
  [array]
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the version.

## GET /accounts/{account_id}/workers/workers/{worker_id}/versions/latest

Get Latest Worker Version

operationId: `getLatestWorkerVersion` · query: `include`

**Response** 200 → `result`

- `annotations`: object — Metadata about the version.
  - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
  - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the version.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `author_email`: string — Email of the user who created the version.
- `author_id`: string — Identifier of the user who created the version.
- `bindings`: object[] — List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration
  [array of]
  - `name`: string **required** — A JavaScript variable name for the binding.
  - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: any — Enables or disables specific Workers runtime features, such as upcoming features or changes outside the `compatibility_date`.
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `created_on`: string **required** — When the version was created.
- `exports`: any — Declarative exports for the version, including Durable Object
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Version identifier.
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).
- `migration_tag`: string — Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Dura
- `migrations`: any — Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `number`: integer **required** — The integer version number, starting from one.
- `package_dependencies`: object[] — The list of npm packages that were installed and used when this Worker
  [array of]
  - `installedVersion`: string **required** — The exact version that was resolved and installed by the package manager.
  - `name`: string **required** — The npm package name.
  - `packageJsonVersion`: string **required** — The version constraint as written in package.json.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `source`: string — The client used to create the version.
- `startup_time_ms`: integer — Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).
- `urls`: string[] **required** — All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different versi
  [array]
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the version.

## PATCH /accounts/{account_id}/workers/workers/{worker_id}/versions/latest

Patch Latest Worker Version

operationId: `patchLatestWorkerVersion` · query: `deploy`

**Request** (application/json)

- `annotations`: object — Metadata about the version.
  - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
  - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the version.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `author_email`: string — Email of the user who created the version.
- `author_id`: string — Identifier of the user who created the version.
- `bindings`: object[] — List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration
  [array of]
  - `name`: string **required** — A JavaScript variable name for the binding.
  - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: any — Enables or disables specific Workers runtime features, such as upcoming features or changes outside the `compatibility_date`.
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `created_on`: string **required** — When the version was created.
- `exports`: any — Declarative exports for the version, including Durable Object
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Version identifier.
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).
- `migration_tag`: string — Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Dura
- `migrations`: any — Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `number`: integer **required** — The integer version number, starting from one.
- `package_dependencies`: object[] — The list of npm packages that were installed and used when this Worker
  [array of]
  - `installedVersion`: string **required** — The exact version that was resolved and installed by the package manager.
  - `name`: string **required** — The npm package name.
  - `packageJsonVersion`: string **required** — The version constraint as written in package.json.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `source`: string — The client used to create the version.
- `startup_time_ms`: integer — Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).
- `urls`: string[] **required** — All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different versi
  [array]
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the version.
object

**Response** 200 → `result`

- `annotations`: object — Metadata about the version.
  - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
  - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `workers/triggered_by`: string — Operation that triggered the creation of the version.
- `assets`: object — Configuration for assets within a Worker.
  - `config`: object — Configuration for assets within a Worker.
    - `base_path`: string default: `/` — The public URL path prefix under which assets are served. A null request value resets it to `/`; responses represent the root as `/`. All ve
    - `html_handling`: string enum: `auto-trailing-slash`, `force-trailing-slash`, `drop-trailing-slash`, `none` default: `auto-trailing-slash` — Determines the redirects and rewrites of requests for HTML content.
    - `not_found_handling`: string enum: `none`, `404-page`, `single-page-application` default: `none` — Determines the response when a request does not match a static asset, and there is no Worker script.
    - `run_worker_first`: any default: `false`
  - `jwt`: string — Token provided upon successful upload of all files from a registered manifest.
- `author_email`: string — Email of the user who created the version.
- `author_id`: string — Identifier of the user who created the version.
- `bindings`: object[] — List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration
  [array of]
  - `name`: string **required** — A JavaScript variable name for the binding.
  - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
- `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
  - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
  - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
- `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
- `compatibility_flags`: any — Enables or disables specific Workers runtime features, such as upcoming features or changes outside the `compatibility_date`.
- `containers`: object[] — List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.
  [array of]
  - `class_name`: string **required** — Select which Durable Object class should get this container attached.
- `created_on`: string **required** — When the version was created.
- `exports`: any — Declarative exports for the version, including Durable Object
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that ran on
- `id`: string **required** — Version identifier.
- `limits`: object — Resource limits enforced at runtime.
  - `cpu_ms`: integer — CPU time limit in milliseconds.
  - `subrequests`: integer — Subrequest limit per request.
- `main_module`: string — The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).
- `migration_tag`: string — Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Dura
- `migrations`: any — Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.
- `modules`: object[] — Code, sourcemaps, and other content used at runtime.
  [array of]
  - `content_base64`: string **required** — The base64-encoded module content.
  - `content_type`: string **required** — The content type of the module.
  - `name`: string **required** — The name of the module.
- `number`: integer **required** — The integer version number, starting from one.
- `package_dependencies`: object[] — The list of npm packages that were installed and used when this Worker
  [array of]
  - `installedVersion`: string **required** — The exact version that was resolved and installed by the package manager.
  - `name`: string **required** — The npm package name.
  - `packageJsonVersion`: string **required** — The version constraint as written in package.json.
- `placement`: object — Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart
- `source`: string — The client used to create the version.
- `startup_time_ms`: integer — Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).
- `urls`: string[] **required** — All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different versi
  [array]
- `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the version.
