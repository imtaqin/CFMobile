# Worker Versions

3 endpoints.

## GET /accounts/{account_id}/workers/scripts/{script_name}/versions

List Versions

operationId: `worker-versions-list-versions` · query: `deployable`, `page`, `per_page`

**Response** 200 → `result`

- `items`: object[]
  [array of]
  - `id`: string — Unique identifier for the version.
  - `metadata`: object
    - `author_email`: string — Email of the user who created the version.
    - `author_id`: string — Identifier of the user who created the version.
    - `created_on`: string — When the version was created.
    - `hasPreview`: boolean — Whether the version can be previewed.
    - `modified_on`: string — When the version was last modified.
    - `source`: string enum: `unknown`, `api`, `wrangler`, `terraform`, `dash`, `cf_cli`, `dash_template`, `integration` — The source of the version upload.
  - `number`: number — Sequential version number.

## POST /accounts/{account_id}/workers/scripts/{script_name}/versions

Upload Version

operationId: `worker-versions-upload-version` · query: `bindings_inherit`

**Request** (multipart/form-data)

- `files`: string[] — An array of modules (often JavaScript files) comprising a Worker script. At least one module must be present and referenced in the metadata 
  [array]
- `metadata`: object **required** — JSON-encoded metadata about the uploaded parts and Worker configuration.
  - `annotations`: object
    - `workers/alias`: string — Associated alias for a version.
    - `workers/commit_sha`: string — Full commit SHA associated with the version, detected from the CI environment. Maximum 64 bytes.
    - `workers/message`: string — Human-readable message about the version. Truncated to 1000 bytes if longer.
    - `workers/pull_request_number`: string — Number of the pull or merge request associated with the version, detected from the CI environment. Maximum 20 bytes.
    - `workers/pull_request_title`: string — Title of the pull or merge request associated with the version, detected from the CI environment. Maximum 512 bytes.
    - `workers/pull_request_url`: string — URL of the pull or merge request associated with the version, detected from the CI environment. Maximum 512 bytes.
    - `workers/repository_url`: string — URL of the source repository the version was built from, detected from the CI environment. Maximum 512 bytes.
    - `workers/tag`: string — User-provided identifier for the version. Maximum 100 bytes.
  - `bindings`: object[] — List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration
    [array of]
    - `name`: string **required** — A JavaScript variable name for the binding.
    - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
  - `cache_options`: object — Global CacheW configuration for the Worker. When caching is on,
    - `cross_version_cache`: boolean default: `false` — Whether cached responses are shared across Worker version
    - `enabled`: boolean **required** default: `false` — Whether caching is enabled for this Worker.
  - `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
  - `compatibility_flags`: string[] default: `` — Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes 
    [array]
  - `exports`: any — Declarative exports for this version. Worker
  - `keep_bindings`: string[] — List of binding types to keep from previous_upload.
    [array]
  - `main_module`: string **required** — Name of the uploaded file that contains the main module (e.g. the file exporting a `fetch` handler). Indicates a `module syntax` Worker, whi
  - `package_dependencies`: object[] — The list of npm packages that were installed and used when this Worker
    [array of]
    - `installedVersion`: string **required** — The exact version that was resolved and installed by the package manager.
    - `name`: string **required** — The npm package name.
    - `packageJsonVersion`: string **required** — The version constraint as written in package.json.
  - `usage_model`: string enum: `standard`, `bundled`, `unbound` default: `standard` — Usage model for the Worker invocations.

**Response** 200 → `result`

- `id`: string — Unique identifier for the version.
- `metadata`: object
  - `author_email`: string — Email of the user who created the version.
  - `author_id`: string — Identifier of the user who created the version.
  - `created_on`: string — When the version was created.
  - `hasPreview`: boolean — Whether the version can be previewed.
  - `modified_on`: string — When the version was last modified.
  - `source`: string enum: `unknown`, `api`, `wrangler`, `terraform`, `dash`, `cf_cli`, `dash_template`, `integration` — The source of the version upload.
- `number`: number — Sequential version number.
- `resources`: object **required**
  - `bindings`: object[]
    [array of]
    - `name`: string **required** — A JavaScript variable name for the binding.
    - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
    [array of]
    - `name`: string **required** — A JavaScript variable name for the binding.
    - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
  - `script`: object
    - `etag`: string — Hashed script content
    - `handlers`: string[] — The names of handlers exported as part of the default export.
    - `last_deployed_from`: string — The client most recently used to deploy this Worker.
    - `named_handlers`: object[] — Named exports, such as Durable Object class implementations and named entrypoints.
  - `script_runtime`: object — Runtime configuration for the Worker.
    - `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
    - `compatibility_flags`: string[] default: `` — Lists the flags this version sets explicitly to enable or disable
    - `exports`: any — Declarative exports for this version, including
    - `limits`: object — Resource limits for the Worker.
    - `migration_tag`: string — The tag of the Durable Object migration that was most recently applied for this Worker.
    - `usage_model`: string enum: `bundled`, `unbound`, `standard` — Usage model for the Worker invocations.
- `exports_reconciliation`: any — Summary of the declarative exports reconciliation that
- `startup_time_ms`: integer — Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).

## GET /accounts/{account_id}/workers/scripts/{script_name}/versions/{version_id}

Get Worker Script Version

operationId: `worker-versions-get-version-detail`

**Response** 200 → `result`

- `id`: string — Unique identifier for the version.
- `metadata`: object
  - `author_email`: string — Email of the user who created the version.
  - `author_id`: string — Identifier of the user who created the version.
  - `created_on`: string — When the version was created.
  - `hasPreview`: boolean — Whether the version can be previewed.
  - `modified_on`: string — When the version was last modified.
  - `source`: string enum: `unknown`, `api`, `wrangler`, `terraform`, `dash`, `cf_cli`, `dash_template`, `integration` — The source of the version upload.
- `number`: number — Sequential version number.
- `resources`: object **required**
  - `bindings`: object[]
    [array of]
    - `name`: string **required** — A JavaScript variable name for the binding.
    - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
    [array of]
    - `name`: string **required** — A JavaScript variable name for the binding.
    - `type`: string **required** enum: `ai` — The kind of resource that the binding provides.
  - `script`: object
    - `etag`: string — Hashed script content
    - `handlers`: string[] — The names of handlers exported as part of the default export.
    - `last_deployed_from`: string — The client most recently used to deploy this Worker.
    - `named_handlers`: object[] — Named exports, such as Durable Object class implementations and named entrypoints.
  - `script_runtime`: object — Runtime configuration for the Worker.
    - `compatibility_date`: string — Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect thi
    - `compatibility_flags`: string[] default: `` — Lists the flags this version sets explicitly to enable or disable
    - `exports`: any — Declarative exports for this version, including
    - `limits`: object — Resource limits for the Worker.
    - `migration_tag`: string — The tag of the Durable Object migration that was most recently applied for this Worker.
    - `usage_model`: string enum: `bundled`, `unbound`, `standard` — Usage model for the Worker invocations.
