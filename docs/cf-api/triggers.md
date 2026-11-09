# Triggers

5 endpoints.

## POST /accounts/{account_id}/builds/triggers

Create a build trigger

operationId: `createTrigger`

**Request** (application/json)

- `branch_excludes`: string[] **required** — Branch patterns that must not start builds.
  [array]
- `branch_includes`: string[] **required** — Branch patterns that can start builds.
  [array]
- `build_caching_enabled`: boolean default: `false` — Whether builds reuse cached dependencies and build artifacts.
- `build_command`: string **required** — Command to build the Worker.
- `build_token_uuid`: string **required** — UUID of the build token used when deploying the Worker.
- `deploy_command`: string **required** — Command to deploy the Worker.
- `external_script_id`: string **required** — System-generated tag of the Worker. This is not the Worker name.
- `path_excludes`: string[] **required** — Path patterns that must not start builds.
  [array]
- `path_includes`: string[] **required** default: `*` — Path patterns that can start builds.
  [array]
- `repo_connection_uuid`: string **required** — Repository connection UUID.
- `root_directory`: string **required** — Repository directory in which build and deploy commands run.
- `trigger_name`: string **required** — Human-readable name of the build trigger.

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## DELETE /accounts/{account_id}/builds/triggers/{trigger_uuid}

Delete a build trigger

operationId: `deleteTrigger`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PATCH /accounts/{account_id}/builds/triggers/{trigger_uuid}

Update a build trigger

operationId: `updateTrigger`

**Request** (application/json)

- `branch_excludes`: string[] — Branch patterns that must not start builds.
  [array]
- `branch_includes`: string[] — Branch patterns that can start builds.
  [array]
- `build_caching_enabled`: boolean default: `false` — Whether builds reuse cached dependencies and build artifacts.
- `build_command`: string — Command to build the Worker.
- `build_token_uuid`: string — UUID of the build token used when deploying the Worker.
- `deploy_command`: string — Command to deploy the Worker.
- `path_excludes`: string[] — Path patterns that must not start builds.
  [array]
- `path_includes`: string[] default: `*` — Path patterns that can start builds.
  [array]
- `root_directory`: string — Repository directory in which build and deploy commands run.
- `trigger_name`: string — Human-readable name of the build trigger.

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## POST /accounts/{account_id}/builds/triggers/{trigger_uuid}/builds

Start a Workers build

operationId: `createManualBuild`

**Request** (application/json)

(one of 2 variants; showing the first)

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## POST /accounts/{account_id}/builds/triggers/{trigger_uuid}/purge_build_cache

Purge a trigger's build cache

operationId: `purgeBuildCache`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object
