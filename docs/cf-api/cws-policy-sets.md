# CWS Policy Sets

5 endpoints.

## GET /accounts/{account_id}/cws/policy-sets

List policy sets

operationId: `cws-list-policy-sets` · query: `cursor`, `per_page`, `order`, `direction`, `name`, `deployment_id`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `exclude_workload_ids`: string[] **required** — IDs of workloads that exclude matching requests. Exclusions take precedence.
  [array]
- `id`: string **required** — Server-assigned UUID
- `include_workload_ids`: string[] **required** — IDs of workloads that include matching requests. Empty includes all requests before exclusions.
  [array]
- `name`: string **required** — Human-readable name; unique per account
- `policies`: object[] **required** — Member policies and their per-membership enforcement mode
  [array of]
  - `enforce`: boolean **required** — Whether this policy should enforce when it matches. False keeps the policy attached for non-enforcing evaluation.
  - `policy_id`: string **required** — ID of the member policy
- `tags`: object **required** — Tags attached to this policy set
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/policy-sets

Create a new policy set

operationId: `cws-create-policy-set`

**Request** (application/json)

- `description`: string — Optional free-form description.
- `exclude_workload_ids`: string[] default: `` — Workload IDs that exclude matching requests. Exclusions take precedence.
  [array]
- `include_workload_ids`: string[] default: `` — Workload IDs that include matching requests. Empty or omitted includes all requests before exclusions.
  [array]
- `name`: string **required** — Name of the policy set
- `policies`: object[] **required** — Policies to include with per-membership enforcement mode
  [array of]
  - `enforce`: boolean default: `true` — Whether this policy should enforce when it matches. Defaults to true; false keeps the policy attached for non-enforcing evaluation.
  - `policy_id`: string **required** — ID of the member policy
- `tags`: object — Tags to attach. Keys are limited to 256 UTF-8 bytes and values to 1024 UTF-8 bytes.

**Response** 201 → `result`

- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `exclude_workload_ids`: string[] **required** — IDs of workloads that exclude matching requests. Exclusions take precedence.
  [array]
- `id`: string **required** — Server-assigned UUID
- `include_workload_ids`: string[] **required** — IDs of workloads that include matching requests. Empty includes all requests before exclusions.
  [array]
- `name`: string **required** — Human-readable name; unique per account
- `policies`: object[] **required** — Member policies and their per-membership enforcement mode
  [array of]
  - `enforce`: boolean **required** — Whether this policy should enforce when it matches. False keeps the policy attached for non-enforcing evaluation.
  - `policy_id`: string **required** — ID of the member policy
- `tags`: object **required** — Tags attached to this policy set
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cws/policy-sets/{policy_set_id}

Delete a policy set

operationId: `cws-delete-policy-set`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/policy-sets/{policy_set_id}

Get a policy set by ID

operationId: `cws-get-policy-set`

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `exclude_workload_ids`: string[] **required** — IDs of workloads that exclude matching requests. Exclusions take precedence.
  [array]
- `id`: string **required** — Server-assigned UUID
- `include_workload_ids`: string[] **required** — IDs of workloads that include matching requests. Empty includes all requests before exclusions.
  [array]
- `name`: string **required** — Human-readable name; unique per account
- `policies`: object[] **required** — Member policies and their per-membership enforcement mode
  [array of]
  - `enforce`: boolean **required** — Whether this policy should enforce when it matches. False keeps the policy attached for non-enforcing evaluation.
  - `policy_id`: string **required** — ID of the member policy
- `tags`: object **required** — Tags attached to this policy set
- `updated_at`: string **required**

## PUT /accounts/{account_id}/cws/policy-sets/{policy_set_id}

Update a policy set

operationId: `cws-update-policy-set`

**Request** (application/json)

- `description`: string — Optional free-form description.
- `exclude_workload_ids`: string[] default: `` — Replacement set of excluded workload IDs. Exclusions take precedence.
  [array]
- `include_workload_ids`: string[] default: `` — Replacement set of included workload IDs. Empty or omitted includes all requests before exclusions.
  [array]
- `name`: string **required** — Name of the policy set
- `policies`: object[] **required** — Replacement set of policies with per-membership enforcement mode
  [array of]
  - `enforce`: boolean default: `true` — Whether this policy should enforce when it matches. Defaults to true; false keeps the policy attached for non-enforcing evaluation.
  - `policy_id`: string **required** — ID of the member policy
- `tags`: object — Replacement tag set. Omit or use {} to clear. Keys are limited to 256 UTF-8 bytes and values to 1024 UTF-8 bytes.

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `exclude_workload_ids`: string[] **required** — IDs of workloads that exclude matching requests. Exclusions take precedence.
  [array]
- `id`: string **required** — Server-assigned UUID
- `include_workload_ids`: string[] **required** — IDs of workloads that include matching requests. Empty includes all requests before exclusions.
  [array]
- `name`: string **required** — Human-readable name; unique per account
- `policies`: object[] **required** — Member policies and their per-membership enforcement mode
  [array of]
  - `enforce`: boolean **required** — Whether this policy should enforce when it matches. False keeps the policy attached for non-enforcing evaluation.
  - `policy_id`: string **required** — ID of the member policy
- `tags`: object **required** — Tags attached to this policy set
- `updated_at`: string **required**
