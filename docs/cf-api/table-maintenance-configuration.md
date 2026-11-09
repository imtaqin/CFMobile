# Table Maintenance Configuration

8 endpoints.

## GET /accounts/{account_id}/basin-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs

Get table maintenance configuration

operationId: `basin-get-table-maintenance-config`

**Response** 200 → `result`

- `maintenance_config`: object **required** — Configures maintenance for the table.
  - `compaction`: object — Configures compaction settings for table optimization.
    - `next_eligible_at`: string — Earliest time when the scheduler can claim this operation. Null when disabled.
    - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
    - `target_size_mb`: string **required** enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
  - `interval`: any
  - `snapshot_expiration`: object
    - `max_snapshot_age`: string **required** — Specifies the maximum age for snapshots.
    - `min_snapshots_to_keep`: integer **required** — Specifies the minimum number of snapshots to retain. Defaults to 100.
    - `next_eligible_at`: string — Earliest time when the scheduler can claim this operation. Null when disabled.
    - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

## POST /accounts/{account_id}/basin-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs

Update table maintenance configuration

operationId: `basin-update-table-maintenance-config`

**Request** (application/json)

- `compaction`: object — Updates table compaction configuration; all fields are optional.
  - `state`: string enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
  - `target_size_mb`: string enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
- `snapshot_expiration`: object — Updates snapshot expiration configuration (all fields optional).
  - `max_snapshot_age`: string — Updates the maximum age for snapshots optionally.
  - `min_snapshots_to_keep`: integer — Updates the minimum number of snapshots to retain optionally.
  - `state`: string enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

**Response** 200 → `result`

- `compaction`: object — Configures compaction settings for table optimization.
  - `next_eligible_at`: string — Earliest time when the scheduler can claim this operation. Null when disabled.
  - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
  - `target_size_mb`: string **required** enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
- `interval`: any
- `snapshot_expiration`: object
  - `max_snapshot_age`: string **required** — Specifies the maximum age for snapshots.
  - `min_snapshots_to_keep`: integer **required** — Specifies the minimum number of snapshots to retain. Defaults to 100.
  - `next_eligible_at`: string — Earliest time when the scheduler can claim this operation. Null when disabled.
  - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

## POST /accounts/{account_id}/basin-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs/{configuration_type}/queue

Queue table maintenance

operationId: `basin-queue-table-maintenance`

**Request** (application/json)

- `request_id`: string

**Response** 202 → `result`

- `message`: string **required**
- `queued`: boolean **required**
- `request_id`: string

## GET /accounts/{account_id}/basin-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-runs

List table maintenance runs

operationId: `basin-list-table-maintenance-runs` · query: `page_size`, `page_token`

**Response** 200 → `result`

- `next_page_token`: string **required**
- `runs`: object[] **required**
  [array of]
  - `completed_at`: string
  - `configuration_type`: string **required** enum: `compaction`, `snapshot_expiration`
  - `customer_message`: string
  - `duration_ms`: integer
  - `operation_results`: object[] **required**
    [array of]
    - `duration_ms`: integer **required**
    - `error_code`: integer
    - `metrics`: object
    - `operation`: string **required** enum: `rewrite_manifests`, `compaction`, `snapshot_expiration`
    - `status`: string **required** enum: `succeeded`, `failed`, `skipped`, `not_run`
  - `outcome`: string
  - `primary_error_code`: integer
  - `request_id`: string — The request ID supplied when this run was queued via the manual queue endpoint, so customers can locate their manually-triggered run in this
  - `run_id`: integer **required**
  - `started_at`: string **required**
  - `status`: string **required** enum: `running`, `succeeded`, `failed`, `interrupted`, `timed_out`, `cancelled`

## GET /accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs

Get table maintenance configuration

operationId: `get-table-maintenance-config`

**Response** 200 → `result`

- `maintenance_config`: object **required** — Configures maintenance for the table.
  - `compaction`: object — Configures compaction settings for table optimization.
    - `next_eligible_at`: string — Earliest time when the scheduler can claim this operation. Null when disabled.
    - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
    - `target_size_mb`: string **required** enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
  - `interval`: any
  - `snapshot_expiration`: object
    - `max_snapshot_age`: string **required** — Specifies the maximum age for snapshots.
    - `min_snapshots_to_keep`: integer **required** — Specifies the minimum number of snapshots to retain. Defaults to 100.
    - `next_eligible_at`: string — Earliest time when the scheduler can claim this operation. Null when disabled.
    - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

## POST /accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs

Update table maintenance configuration

operationId: `update-table-maintenance-config`

**Request** (application/json)

- `compaction`: object — Updates table compaction configuration; all fields are optional.
  - `state`: string enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
  - `target_size_mb`: string enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
- `snapshot_expiration`: object — Updates snapshot expiration configuration (all fields optional).
  - `max_snapshot_age`: string — Updates the maximum age for snapshots optionally.
  - `min_snapshots_to_keep`: integer — Updates the minimum number of snapshots to retain optionally.
  - `state`: string enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

**Response** 200 → `result`

- `compaction`: object — Configures compaction settings for table optimization.
  - `next_eligible_at`: string — Earliest time when the scheduler can claim this operation. Null when disabled.
  - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
  - `target_size_mb`: string **required** enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
- `interval`: any
- `snapshot_expiration`: object
  - `max_snapshot_age`: string **required** — Specifies the maximum age for snapshots.
  - `min_snapshots_to_keep`: integer **required** — Specifies the minimum number of snapshots to retain. Defaults to 100.
  - `next_eligible_at`: string — Earliest time when the scheduler can claim this operation. Null when disabled.
  - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

## POST /accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs/{configuration_type}/queue

Queue table maintenance

operationId: `queue-table-maintenance`

**Request** (application/json)

- `request_id`: string

**Response** 202 → `result`

- `message`: string **required**
- `queued`: boolean **required**
- `request_id`: string

## GET /accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-runs

List table maintenance runs

operationId: `list-table-maintenance-runs` · query: `page_size`, `page_token`

**Response** 200 → `result`

- `next_page_token`: string **required**
- `runs`: object[] **required**
  [array of]
  - `completed_at`: string
  - `configuration_type`: string **required** enum: `compaction`, `snapshot_expiration`
  - `customer_message`: string
  - `duration_ms`: integer
  - `operation_results`: object[] **required**
    [array of]
    - `duration_ms`: integer **required**
    - `error_code`: integer
    - `metrics`: object
    - `operation`: string **required** enum: `rewrite_manifests`, `compaction`, `snapshot_expiration`
    - `status`: string **required** enum: `succeeded`, `failed`, `skipped`, `not_run`
  - `outcome`: string
  - `primary_error_code`: integer
  - `request_id`: string — The request ID supplied when this run was queued via the manual queue endpoint, so customers can locate their manually-triggered run in this
  - `run_id`: integer **required**
  - `started_at`: string **required**
  - `status`: string **required** enum: `running`, `succeeded`, `failed`, `interrupted`, `timed_out`, `cancelled`
