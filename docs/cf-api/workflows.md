# Workflows

31 endpoints.

## DELETE /accounts/{account_id}/triggers/{script_name}

Delete script triggers

operationId: `wor-delete-script-triggers`

**Response** 200 → `result`

- `deleted`: integer **required**

## GET /accounts/{account_id}/triggers/{script_name}

Get script triggers

operationId: `wor-get-script-triggers`

**Response** 200 → `result`

- `script_name`: string **required**
- `triggers`: object[] **required**
  [array of]
  - `filter`: object default: `[object Object]`
  - `targets`: object[] **required**
    [array of]
    - `script_name`: string **required**
    - `type`: string **required** enum: `workflow`
    - `workflow_name`: string **required**
  - `type`: string **required**

## PATCH /accounts/{account_id}/triggers/{script_name}

Add script triggers

operationId: `wor-add-script-triggers`

**Request** (application/json)

[array of]
- `filter`: object default: `[object Object]`
- `targets`: object[] **required**
  [array of]
  - `script_name`: string **required**
  - `type`: string **required** enum: `workflow`
  - `workflow_name`: string **required**
- `type`: string **required**

**Response** 200 → `result`

- `script_name`: string **required**
- `triggers`: object[] **required**
  [array of]
  - `filter`: object default: `[object Object]`
  - `targets`: object[] **required**
    [array of]
    - `script_name`: string **required**
    - `type`: string **required** enum: `workflow`
    - `workflow_name`: string **required**
  - `type`: string **required**

## PUT /accounts/{account_id}/triggers/{script_name}

Replace script triggers

operationId: `wor-replace-script-triggers`

**Request** (application/json)

[array of]
- `filter`: object default: `[object Object]`
- `targets`: object[] **required**
  [array of]
  - `script_name`: string **required**
  - `type`: string **required** enum: `workflow`
  - `workflow_name`: string **required**
- `type`: string **required**

**Response** 200 → `result`

- `script_name`: string **required**
- `triggers`: object[] **required**
  [array of]
  - `filter`: object default: `[object Object]`
  - `targets`: object[] **required**
    [array of]
    - `script_name`: string **required**
    - `type`: string **required** enum: `workflow`
    - `workflow_name`: string **required**
  - `type`: string **required**

## GET /accounts/{account_id}/workflows

List all Workflows

operationId: `wor-list-workflows` · query: `per_page`, `page`, `search`

**Response** 200 → `result`

[array of]
- `class_name`: string **required**
- `created_on`: string **required**
- `id`: string **required**
- `instances`: object **required**
- `jurisdiction`: string enum: `eu`, `fedramp`, `us` — Jurisdiction where instances of this workflow run and store data. Set when the workflow is created and cannot be changed.
- `modified_on`: string **required**
- `name`: string **required**
- `schedules`: object[]
  [array of]
  - `cron`: string **required**
  - `next_instance`: string **required**
- `script_deleted`: boolean — Whether the bound Worker was deleted, leaving this Workflow inactive.
- `script_name`: string **required**
- `triggered_on`: string **required**

## DELETE /accounts/{account_id}/workflows/{workflow_name}

Deletes a Workflow

operationId: `wor-delete-workflow`

**Response** 200 → `result`

- `status`: string **required** enum: `ok`
- `success`: boolean **required**

## GET /accounts/{account_id}/workflows/{workflow_name}

Get Workflow details

operationId: `wor-get-workflow-details`

**Response** 200 → `result`

- `class_name`: string **required**
- `created_on`: string **required**
- `id`: string **required**
- `instances`: object **required**
- `jurisdiction`: string enum: `eu`, `fedramp`, `us` — Jurisdiction where instances of this workflow run and store data. Set when the workflow is created and cannot be changed.
- `modified_on`: string **required**
- `name`: string **required**
- `schedules`: object[]
  [array of]
  - `cron`: string **required**
  - `next_instance`: string **required**
- `script_deleted`: boolean — Whether the bound Worker was deleted, leaving this Workflow inactive.
- `script_name`: string **required**
- `triggered_on`: string **required**

## PUT /accounts/{account_id}/workflows/{workflow_name}

Create/modify Workflow

operationId: `wor-create-or-modify-workflow`

**Request** (application/json)

- `class_name`: string **required**
- `concurrency`: object
  - `limit`: integer — Maximum number of instances of this workflow that can run concurrently. Additional instances are queued and started as running instances com
- `default_retention`: object — Default retention applied to instances of this version when they do not set their own retention.
  - `error_retention`: any — Specifies the duration in milliseconds or as a string like '5 minutes'.
  - `success_retention`: any — Specifies the duration in milliseconds or as a string like '5 minutes'.
- `jurisdiction`: string enum: `eu`, `fedramp`, `us` — Jurisdiction where instances of this workflow run and store data. Can only be set when the workflow is created and cannot be changed afterwa
- `limits`: object
  - `steps`: integer
- `schedules`: object[]
  [array of]
  - `cron`: string **required**
- `script_name`: string **required**

**Response** 200 → `result`

- `class_name`: string **required**
- `created_on`: string **required**
- `id`: string **required**
- `is_deleted`: number **required**
- `jurisdiction`: string enum: `eu`, `fedramp`, `us` — Jurisdiction where instances of this workflow run and store data. Set when the workflow is created and cannot be changed.
- `modified_on`: string **required**
- `name`: string **required**
- `script_name`: string **required**
- `terminator_running`: number **required**
- `triggered_on`: string **required**
- `version_id`: string **required**

## GET /accounts/{account_id}/workflows/{workflow_name}/instances

List of workflow instances

operationId: `wor-list-workflow-instances` · query: `page`, `per_page`, `cursor`, `direction`, `status`, `date_start`, `date_end`

**Response** 200 → `result`

[array of]
- `created_on`: string **required**
- `ended_on`: string **required**
- `id`: string **required**
- `modified_on`: string **required**
- `started_on`: string **required**
- `status`: string **required** enum: `queued`, `running`, `paused`, `errored`, `terminated`, `complete`, `waitingForPause`, `waiting`
- `trigger_source`: string enum: `unknown`, `api`, `binding`, `event`, `cron`
- `version_id`: string **required**
- `workflow_id`: string **required**

## POST /accounts/{account_id}/workflows/{workflow_name}/instances

Create a new workflow instance

operationId: `wor-create-new-workflow-instance`

**Request** (application/json)

- `instance_id`: string — The system reserves IDs that consist of the `cf_` prefix and exactly 64 lowercase hexadecimal characters.
- `instance_retention`: object
  - `error_retention`: any — Specifies the duration in milliseconds or as a string like '5 minutes'.
  - `success_retention`: any — Specifies the duration in milliseconds or as a string like '5 minutes'.
- `location_hint`: string enum: `wnam`, `weur`, `enam`, `eeur`, `apac`, `apac-ne`, `apac-se`, `oc`
- `params`: string — JSON-encoded event payload passed into the new instance.

**Response** 200 → `result`

- `id`: string **required**
- `status`: string **required** enum: `queued`, `running`, `paused`, `errored`, `terminated`, `complete`, `waitingForPause`, `waiting`
- `trigger_source`: string enum: `unknown`, `api`, `binding`, `event`, `cron`
- `version_id`: string **required**
- `workflow_id`: string **required**

## DELETE /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}

Delete a workflow instance

operationId: `wor-delete-workflow-instance`

**Response** 200 → `result`

- `instanceId`: string **required**
- `timestamp`: string **required** — Accepts ISO 8601 with no timezone offsets and in UTC.

## GET /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}

Get logs and status from instance

operationId: `wor-describe-workflow-instance` · query: `simple`, `order`

**Response** 200 → `result`

- `end`: string **required**
- `error`: object **required**
  - `message`: string **required**
  - `name`: string **required**
- `output`: any **required**
- `params`: object **required**
- `queued`: string **required**
- `rollback`: object **required**
  - `error`: object **required**
    - `message`: string **required**
    - `name`: string **required**
  - `outcome`: string **required** enum: `complete`, `failed`
- `schedule`: object
  - `cron`: string **required**
  - `scheduledTime`: number **required**
- `start`: string **required**
- `status`: string **required** enum: `queued`, `running`, `paused`, `errored`, `terminated`, `complete`, `waitingForPause`, `waiting`
- `step_count`: integer **required**
- `steps`: object[] **required**
  [array of]
  - `attempts`: object[] **required**
    [array of]
    - `end`: string **required**
    - `error`: object **required**
    - `start`: string **required**
    - `success`: boolean **required**
  - `config`: object **required**
    - `retries`: object **required**
    - `sensitive`: string enum: `output` — When set to 'output', step output is redacted from log and step output responses.
    - `timeout`: any **required** — Specifies the timeout duration.
  - `end`: string **required**
  - `name`: string **required**
  - `output`: string **required**
  - `start`: string **required**
  - `success`: boolean **required**
  - `type`: string **required** enum: `step`, `rollback`
- `success`: boolean **required**
- `trigger`: object **required**
  - `source`: string **required** enum: `unknown`, `api`, `binding`, `event`, `cron`
- `versionId`: string **required**

## POST /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/events/{event_type}

Send event to instance

operationId: `wor-send-event-workflow-instance`

**Request** (application/json)

object

**Response** 200 → `result`

- `instanceId`: string **required**
- `timestamp`: string **required** — Accepts ISO 8601 with no timezone offsets and in UTC.

## PATCH /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/status

Change status of instance

operationId: `wor-change-status-workflow-instance`

**Request** (application/json)

(one of 4 variants; showing the first)
- `status`: string **required** enum: `pause`

**Response** 200 → `result`

- `status`: string **required** enum: `queued`, `running`, `paused`, `errored`, `terminated`, `complete`, `waitingForPause`, `waiting`
- `timestamp`: string **required** — Accepts ISO 8601 with no timezone offsets and in UTC.

## GET /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/step

Get full step output from instance

operationId: `wor-get-workflow-instance-step` · query: `name`, `type`, `attempt`

**Response** 200 → `result`

- `error`: object **required** — Error details when status='errored'; null otherwise.
  - `message`: string **required**
  - `name`: string **required**
- `event_type`: string — The event type the step is waiting on, as supplied to step.waitForEvent. Only present when type='waitForEvent'.
- `output`: object — Contains the full step output or waitForEvent payload without truncation. Uses '[REDACTED]' for sensitive outputs. Contains a value when sta
- `status`: string **required** enum: `queued`, `running`, `paused`, `errored`, `terminated`, `complete`, `waitingForPause`, `waiting`

## GET /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/subscribe/token

Create a workflow instance event subscription token

operationId: `wor-create-workflow-instance-subscription-token`

**Response** 200 → `result`

- `token`: string **required**
- `websocketUrl`: string **required**

## POST /accounts/{account_id}/workflows/{workflow_name}/instances/batch

Batch create new Workflow instances

operationId: `wor-batch-create-workflow-instance`

**Request** (application/json)

[array of]
- `instance_id`: string — The system reserves IDs that consist of the `cf_` prefix and exactly 64 lowercase hexadecimal characters.
- `instance_retention`: object
  - `error_retention`: any — Specifies the duration in milliseconds or as a string like '5 minutes'.
  - `success_retention`: any — Specifies the duration in milliseconds or as a string like '5 minutes'.
- `location_hint`: string enum: `wnam`, `weur`, `enam`, `eeur`, `apac`, `apac-ne`, `apac-se`, `oc`
- `params`: string — JSON-encoded event payload passed into the new instance.

**Response** 200 → `result`

[array of]
- `id`: string **required**
- `status`: string **required** enum: `queued`, `running`, `paused`, `errored`, `terminated`, `complete`, `waitingForPause`, `waiting`
- `trigger_source`: string enum: `unknown`, `api`, `binding`, `event`, `cron`
- `version_id`: string **required**
- `workflow_id`: string **required**

## POST /accounts/{account_id}/workflows/{workflow_name}/instances/batch/delete

Batch delete instances of a workflow

operationId: `wor-batch-delete-workflow-instances`

**Request** (application/json)

- `instances`: string[] **required**
  [array]

**Response** 200 → `result`

- `deleted`: object[] **required**
  [array of]
  - `id`: string **required**
- `errors`: object[] **required**
  [array of]
  - `code`: number **required**
  - `id`: string **required**
  - `message`: string **required**

## POST /accounts/{account_id}/workflows/{workflow_name}/instances/batch/terminate

Batch terminate instances of a workflow

operationId: `wor-batch-terminate-workflow-instances`

**Request** (application/json)

[array of]
string

**Response** 200 → `result`

- `instancesTerminated`: number **required**
- `status`: string **required** enum: `ok`, `already_running`

## GET /accounts/{account_id}/workflows/{workflow_name}/instances/terminate

Get status of the job responsible for terminate all instances of a workflow

operationId: `wor-status-terminate-workflow-instances`

**Response** 200 → `result`

- `status`: string **required** enum: `running`, `not_running`

## GET /accounts/{account_id}/workflows/{workflow_name}/versions

List deployed Workflow versions

operationId: `wor-list-workflow-versions` · query: `per_page`, `page`

**Response** 200 → `result`

[array of]
- `class_name`: string **required**
- `concurrency`: object
  - `limit`: integer — Maximum number of instances of this workflow that can run concurrently. Additional instances are queued and started as running instances com
- `created_on`: string **required**
- `default_retention`: object
  - `error_retention`: integer — Default error retention in milliseconds.
  - `success_retention`: integer — Default success retention in milliseconds.
- `has_dag`: boolean **required**
- `id`: string **required**
- `language`: string **required** enum: `javascript`, `python` — The programming language of the workflow implementation.
- `limits`: object
  - `steps`: integer
- `modified_on`: string **required**
- `workflow_id`: string **required**

## GET /accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}

Get Workflow version details

operationId: `wor-describe-workflow-versions`

**Response** 200 → `result`

- `class_name`: string **required**
- `concurrency`: object
  - `limit`: integer — Maximum number of instances of this workflow that can run concurrently. Additional instances are queued and started as running instances com
- `created_on`: string **required**
- `default_retention`: object
  - `error_retention`: integer — Default error retention in milliseconds.
  - `success_retention`: integer — Default success retention in milliseconds.
- `has_dag`: boolean **required**
- `id`: string **required**
- `language`: string **required** enum: `javascript`, `python` — The programming language of the workflow implementation.
- `limits`: object
  - `steps`: integer
- `modified_on`: string **required**
- `workflow_id`: string **required**

## GET /accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}/dag

Get Workflow version dag

operationId: `wor-describe-workflow-versions-dag`

**Response** 200 → `result`

- `class_name`: string **required**
- `created_on`: string **required**
- `dag`: object **required**
- `id`: string **required**
- `modified_on`: string **required**
- `workflow_id`: string **required**

## GET /accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}/graph

Get Workflow version graph

operationId: `wor-describe-workflow-versions-graph`

**Response** 200 → `result`

- `class_name`: string **required**
- `created_on`: string **required**
- `graph`: object **required** — Versioned workflow graph payload.
  - `version`: number **required**
  - `workflow`: object **required** — A parsed workflow entrypoint with its step graph.
    - `class_name`: string **required**
    - `functions`: object **required**
    - `nodes`: object[] **required**
    - `payload`: any — Shape descriptor for JSON payloads.
- `id`: string **required**
- `modified_on`: string **required**
- `workflow_id`: string **required**

## GET /accounts/{account_id}/workflows/concurrency

List concurrency keys

operationId: `wor-list-concurrency-keys` · query: `per_page`, `page`

**Response** 200 → `result`

[array of]
- `created_on`: string **required**
- `id`: string **required** — Stable identifier of the concurrency key.
- `limit`: integer **required** — Maximum number of steps that may concurrently hold this key.
- `name`: string **required** — Unique (per account) name of the concurrency key. Referenced by workflow steps via step config.

## POST /accounts/{account_id}/workflows/concurrency

Create a concurrency key

operationId: `wor-create-concurrency-key`

**Request** (application/json)

- `limit`: integer **required** — Maximum number of steps that may concurrently hold this key.
- `name`: string **required** — Unique (per account) name of the concurrency key. Referenced by workflow steps via step config.

**Response** 200 → `result`

- `created_on`: string **required**
- `id`: string **required** — Stable identifier of the concurrency key.
- `limit`: integer **required** — Maximum number of steps that may concurrently hold this key.
- `name`: string **required** — Unique (per account) name of the concurrency key. Referenced by workflow steps via step config.

## DELETE /accounts/{account_id}/workflows/concurrency/{key_id}

Delete a concurrency key

operationId: `wor-delete-concurrency-key`

**Response** 200 → `result`

- `status`: string **required** enum: `ok`
- `success`: boolean **required**

## GET /accounts/{account_id}/workflows/concurrency/{key_id}

Get concurrency key details

operationId: `wor-get-concurrency-key`

**Response** 200 → `result`

- `created_on`: string **required**
- `id`: string **required** — Stable identifier of the concurrency key.
- `limit`: integer **required** — Maximum number of steps that may concurrently hold this key.
- `name`: string **required** — Unique (per account) name of the concurrency key. Referenced by workflow steps via step config.
- `referencing_workflows`: object[] **required** — Workflows whose latest deployed version references this key. Blocks deletion while non-empty.
  [array of]
  - `version_id`: string **required**
  - `workflow_name`: string **required**

## PATCH /accounts/{account_id}/workflows/concurrency/{key_id}

Update a concurrency key

operationId: `wor-update-concurrency-key`

**Request** (application/json)

- `limit`: integer **required** — Maximum number of steps that may concurrently hold this key.

**Response** 200 → `result`

- `created_on`: string **required**
- `id`: string **required** — Stable identifier of the concurrency key.
- `limit`: integer **required** — Maximum number of steps that may concurrently hold this key.
- `name`: string **required** — Unique (per account) name of the concurrency key. Referenced by workflow steps via step config.

## GET /accounts/{account_id}/workflows/settings

Get account settings

operationId: `wor-get-workflow-settings`

**Response** 200 → `result`

- `default_retention`: object
  - `error_retention`: integer — Default error retention in milliseconds.
  - `success_retention`: integer — Default success retention in milliseconds.

## PATCH /accounts/{account_id}/workflows/settings

Update account settings

operationId: `wor-update-workflow-settings`

**Request** (application/json)

- `default_retention`: object — Default retention applied to instances of this version when they do not set their own retention.
  - `error_retention`: any — Specifies the duration in milliseconds or as a string like '5 minutes'.
  - `success_retention`: any — Specifies the duration in milliseconds or as a string like '5 minutes'.

**Response** 200 → `result`

- `default_retention`: object
  - `error_retention`: integer — Default error retention in milliseconds.
  - `success_retention`: integer — Default success retention in milliseconds.
