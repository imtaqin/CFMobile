# Account

4 endpoints.

## GET /accounts/{account_id}/ai-gateway/logging-state

Get AI Gateway logging state

operationId: `aig-config-get-logging-state`

**Response** 200 → `result`

- `migrated_at`: integer **required**
- `migration_available`: boolean **required**
- `platform`: string **required** enum: `legacy`, `workers_observability`

## PATCH /accounts/{account_id}/ai-gateway/logging-state

Migrate AI Gateway logging to Workers Observability

operationId: `aig-config-patch-logging-state`

**Response** 200 → `result`

- `migrated_at`: integer **required**
- `migration_available`: boolean **required**
- `platform`: string **required** enum: `legacy`, `workers_observability`

## GET /accounts/{account_id}/builds/account/limits

Get build-minute availability

operationId: `getAccountLimits`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /accounts/{account_id}/containers/usage

Get live account usage

operationId: `getUsage`

**Response** 200 → `result`

- `maximum`: object **required** — Lists account limits for the resources reported in usage.
  - `disk_mb`: integer **required** — Maximum disk in MB for the account.
  - `memory_mib`: integer **required** — Maximum memory in MiB for the account.
  - `vcpus`: number **required** — Maximum vCPU for the account.
- `usage`: object **required** — Lists current resource consumption for active and assigned instances.
  - `disk_mb`: integer **required**
  - `instances`: integer **required**
  - `memory_mib`: integer **required**
  - `vcpus`: number **required**
- `utilization`: object **required** — Live resource utilization percentages. A value of 100 represents full utilization. Values can exceed 100 when usage exceeds quota. The API o
  - `disk_mb`: number — Live disk usage as a percentage of maximum disk.
  - `memory_mib`: number — Live memory usage as a percentage of maximum memory.
  - `vcpus`: number — Live vCPU usage as a percentage of maximum vCPU.
