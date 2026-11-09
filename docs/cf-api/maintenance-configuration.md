# Maintenance Configuration

4 endpoints.

## GET /accounts/{account_id}/basin-catalog/{bucket_name}/maintenance-configs

Get catalog maintenance configuration

operationId: `basin-get-maintenance-config`

**Response** 200 → `result`

- `credential_status`: string **required** enum: `present`, `absent` — Shows the credential configuration status.
- `maintenance_config`: object **required** — Configures maintenance for the catalog.
  - `compaction`: object — Configures compaction for catalog maintenance.
    - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
    - `target_size_mb`: string **required** enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
  - `interval`: string — Scheduling interval between normal table maintenance runs.
  - `snapshot_expiration`: object — Configures snapshot expiration settings.
    - `max_snapshot_age`: string **required** — Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
    - `min_snapshots_to_keep`: integer **required** — Specifies the minimum number of snapshots to retain. Defaults to 100.
    - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

## POST /accounts/{account_id}/basin-catalog/{bucket_name}/maintenance-configs

Update catalog maintenance configuration

operationId: `basin-update-maintenance-config`

**Request** (application/json)

- `compaction`: object — Updates compaction configuration (all fields optional).
  - `state`: string enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
  - `target_size_mb`: string enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
- `snapshot_expiration`: object — Updates snapshot expiration configuration (all fields optional).
  - `max_snapshot_age`: string — Updates the maximum age for snapshots optionally.
  - `min_snapshots_to_keep`: integer — Updates the minimum number of snapshots to retain optionally.
  - `state`: string enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

**Response** 200 → `result`

- `compaction`: object — Configures compaction for catalog maintenance.
  - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
  - `target_size_mb`: string **required** enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
- `interval`: string — Scheduling interval between normal table maintenance runs.
- `snapshot_expiration`: object — Configures snapshot expiration settings.
  - `max_snapshot_age`: string **required** — Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
  - `min_snapshots_to_keep`: integer **required** — Specifies the minimum number of snapshots to retain. Defaults to 100.
  - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

## GET /accounts/{account_id}/r2-catalog/{bucket_name}/maintenance-configs

Get catalog maintenance configuration

operationId: `get-maintenance-config`

**Response** 200 → `result`

- `credential_status`: string **required** enum: `present`, `absent` — Shows the credential configuration status.
- `maintenance_config`: object **required** — Configures maintenance for the catalog.
  - `compaction`: object — Configures compaction for catalog maintenance.
    - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
    - `target_size_mb`: string **required** enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
  - `interval`: string — Scheduling interval between normal table maintenance runs.
  - `snapshot_expiration`: object — Configures snapshot expiration settings.
    - `max_snapshot_age`: string **required** — Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
    - `min_snapshots_to_keep`: integer **required** — Specifies the minimum number of snapshots to retain. Defaults to 100.
    - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

## POST /accounts/{account_id}/r2-catalog/{bucket_name}/maintenance-configs

Update catalog maintenance configuration

operationId: `update-maintenance-config`

**Request** (application/json)

- `compaction`: object — Updates compaction configuration (all fields optional).
  - `state`: string enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
  - `target_size_mb`: string enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
- `snapshot_expiration`: object — Updates snapshot expiration configuration (all fields optional).
  - `max_snapshot_age`: string — Updates the maximum age for snapshots optionally.
  - `min_snapshots_to_keep`: integer — Updates the minimum number of snapshots to retain optionally.
  - `state`: string enum: `enabled`, `disabled` — Specifies the state of maintenance operations.

**Response** 200 → `result`

- `compaction`: object — Configures compaction for catalog maintenance.
  - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
  - `target_size_mb`: string **required** enum: `64`, `128`, `256`, `512` — Sets the target file size for compaction in megabytes. Defaults to "128".
- `interval`: string — Scheduling interval between normal table maintenance runs.
- `snapshot_expiration`: object — Configures snapshot expiration settings.
  - `max_snapshot_age`: string **required** — Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
  - `min_snapshots_to_keep`: integer **required** — Specifies the minimum number of snapshots to retain. Defaults to 100.
  - `state`: string **required** enum: `enabled`, `disabled` — Specifies the state of maintenance operations.
