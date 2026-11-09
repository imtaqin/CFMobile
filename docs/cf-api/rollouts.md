# Rollouts

1 endpoints.

## POST /accounts/{account_id}/containers/applications/{application_id}/rollouts

Create a new rollout for an application

operationId: `createApplicationRollout`

**Request** (application/json)

- `description`: string **required** — Description of the rollout process.
- `kind`: string enum: `full_auto`, `full_manual` default: `full_auto` — Kind of the rollout process. Defaults to "full_auto".
- `percentage`: integer — Initial target version percentage (0-100). Version sync actively replaces instances to match.
- `step_percentage`: integer enum: `5`, `10`, `20`, `25`, `50`, `100` — Percentage of rollout to increase in each step when "steps" is absent. Applicable values: 5, 10, 20, 25, 50, 100.
- `steps`: object[] — Steps defining the rollout process, used when "step_percentage" is absent.
  [array of]
  - `description`: string **required** — Description of the rollout step.
  - `step_size`: object **required**
    - `percentage`: integer **required** — Percentage of instances affected in this step. Min 10% and Max 100%.
- `strategy`: string **required** enum: `rolling`, `new_instances` — Strategy used for the rollout.
- `target_configuration`: object **required** — User-specified container configuration changes.
  - `authorized_keys`: object[]
    [array of]
    - `name`: string — Optional human readable name for this key.
    - `public_key`: string **required** — An SSH public key.
  - `command`: string[] — The command that runs when the container starts, passed to the entrypoint.
    [array]
  - `entrypoint`: string[] — The entry point for the container, specifying the executable to run when the container starts.
    [array]
  - `environment_variables`: object[] — Container environment variables.
    [array of]
    - `name`: string **required** — An environment variable name.
    - `value`: string **required** — An environment variable value.
  - `image`: string — Image url.
  - `instance_type`: string default: `lite` — The instance type configures vCPU, memory, and disk.
  - `observability`: object — Settings for deployment observability such as logging.
    - `logs`: object — Observability logging settings.

**Response** 201 → `result`

- `created_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `current_configuration`: object **required** — User-specified container configuration changes.
  - `authorized_keys`: object[]
    [array of]
    - `name`: string — Optional human readable name for this key.
    - `public_key`: string **required** — An SSH public key.
  - `command`: string[] — The command that runs when the container starts, passed to the entrypoint.
    [array]
  - `entrypoint`: string[] — The entry point for the container, specifying the executable to run when the container starts.
    [array]
  - `environment_variables`: object[] — Container environment variables.
    [array of]
    - `name`: string **required** — An environment variable name.
    - `value`: string **required** — An environment variable value.
  - `image`: string — Image url.
  - `instance_type`: string default: `lite` — The instance type configures vCPU, memory, and disk.
  - `observability`: object — Settings for deployment observability such as logging.
    - `logs`: object — Observability logging settings.
- `current_version`: integer **required** — Current application version before the rollout.
- `description`: string **required**
- `health`: object **required**
  - `errors`: object[] **required**
    [array of]
    - `event`: object **required** — An event within a Placement or a Job.
    - `instance_id`: string **required** — An instance ID represents an identifier of an instance configuration that maintains an underlying placement.
  - `instances`: object **required** — Shows a count of application instance states.
    - `active`: integer **required** — Number of instances whose runtime reports the container as running (container_status = "running"). This is a subset of the placements that r
    - `assigned`: integer **required** — Number of instances bound to a Durable Object with a running placement whose container_status remains behind "running". These count as live,
  - `summary`: string enum: `healthy`, `degraded`, `unhealthy`, `pending` — High-level health assessment. Only populated for "new_instances" strategy.
- `id`: string **required** — An identifier for a specific rollout within an application.
- `kind`: string **required** enum: `full_auto`, `full_manual`, `durable_objects_auto` — Kind of the rollout process.
- `last_updated_at`: any **required** — Timestamp of the most recent update to status, health, or progress.
- `percentage`: integer — Current target version percentage (0-100). Only present for "new_instances" strategy.
- `progress`: object — Progress details of an application rollout.
  - `current_step`: integer **required** — Current step being executed in the rollout process. Initialized to 0.
  - `total_instances`: integer **required** — Total number of instances the rollout affects.
  - `total_steps`: integer **required** — Total number of steps in the rollout.
  - `updated_instances`: integer **required** — Number of instances updated in the rollout process.
  - `version_distribution`: object — Expected distribution of instances per version, based on the current percentage split.
    - `current_version_instances`: integer — Expected number of instances remaining on the current (old) version based on the current percentage split. Only populated for "rolling" stra
    - `current_version_percentage`: integer — The percentage of new instances being scheduled on the current version (100 - target_version_percentage).
    - `target_version_instances`: integer — Expected number of instances scheduled for the target (new) version based on the current percentage split. Only populated for "rolling" stra
    - `target_version_percentage`: integer — The active percentage of new instances being scheduled on the target version.
- `started_at`: string — Timestamp when the rollout started.
- `status`: string **required** enum: `pending`, `progressing`, `completed`, `reverted`, `replaced` — Current status of the rollout.
- `steps`: object[]
  [array of]
  - `completed_at`: string — UTC timestamp string in ISO 8601 format.
  - `description`: string **required** — Description of the rollout step.
  - `id`: integer **required** — The sequential order of the rollout step, automatically assigned starting from 1, based on the total number of steps in the rollout process.
  - `reason`: string — Reason for the step's current status.
  - `started_at`: string — UTC timestamp string in ISO 8601 format.
  - `status`: string **required** enum: `pending`, `progressing`, `reverting`, `completed`, `reverted` — Status of the rollout step.
  - `step_size`: object **required**
    - `percentage`: integer **required** — Percentage of instances affected in this step. Min 10% and Max 100%.
- `strategy`: string **required** enum: `rolling`, `new_instances` — The rollout strategy.
- `target_configuration`: object **required** — User-specified container configuration changes.
  - `authorized_keys`: object[]
    [array of]
    - `name`: string — Optional human readable name for this key.
    - `public_key`: string **required** — An SSH public key.
  - `command`: string[] — The command that runs when the container starts, passed to the entrypoint.
    [array]
  - `entrypoint`: string[] — The entry point for the container, specifying the executable to run when the container starts.
    [array]
  - `environment_variables`: object[] — Container environment variables.
    [array of]
    - `name`: string **required** — An environment variable name.
    - `value`: string **required** — An environment variable value.
  - `image`: string — Image url.
  - `instance_type`: string default: `lite` — The instance type configures vCPU, memory, and disk.
  - `observability`: object — Settings for deployment observability such as logging.
    - `logs`: object — Observability logging settings.
- `target_version`: integer **required** — Target application version after the rollout is complete and applied to all current instances.
- `version_distribution`: object — Version percentage distribution. Only present for "new_instances" strategy.
  - `current_version_percentage`: integer **required** — Percentage of instances on the current (old) version.
  - `target_version_percentage`: integer **required** — Percentage of instances on the target (new) version.
