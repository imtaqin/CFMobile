# Worker Deployments

4 endpoints.

## GET /accounts/{account_id}/workers/scripts/{script_name}/deployments

List Worker Deployments

operationId: `worker-deployments-list-deployments` · query: `since`, `until`, `page`, `per_page`

**Response** 200 → `result`

- `deployments`: object[] **required**
  [array of]
  - `annotations`: object — Metadata attached to the deployment.
    - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
    - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
  - `author_email`: string
  - `code_update_strategy`: any — Choose whether to apply Durable Object code updates immediately or defer them. When omitted, the default strategy applies.
  - `created_on`: string **required**
  - `id`: string **required**
  - `source`: string **required**
  - `strategy`: string **required** enum: `percentage` — Strategy for routing traffic across the listed versions. `percentage` splits traffic according to each version's `percentage`.
  - `versions`: object[] **required** — Worker versions included in this deployment. Each object must contain a `version_id` UUID and a `percentage`; percentages across all objects
    [array of]
    - `percentage`: number **required** — Percentage of traffic served by this version.
    - `version_id`: string **required** — Identifier of the Worker Version.

## POST /accounts/{account_id}/workers/scripts/{script_name}/deployments

Create Worker Deployment

operationId: `worker-deployments-create-deployment` · query: `force`

**Request** (application/json)

- `annotations`: object — Metadata attached to the deployment.
  - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
  - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
- `author_email`: string
- `code_update_strategy`: any — Choose whether to apply Durable Object code updates immediately or defer them. When omitted, the default strategy applies.
- `created_on`: string **required**
- `id`: string **required**
- `source`: string **required**
- `strategy`: string **required** enum: `percentage` — Strategy for routing traffic across the listed versions. `percentage` splits traffic according to each version's `percentage`.
- `versions`: object[] **required** — Worker versions included in this deployment. Each object must contain a `version_id` UUID and a `percentage`; percentages across all objects
  [array of]
  - `percentage`: number **required** — Percentage of traffic served by this version.
  - `version_id`: string **required** — Identifier of the Worker Version.

**Response** 200 → `result`

- `annotations`: object — Metadata attached to the deployment.
  - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
  - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
- `author_email`: string
- `code_update_strategy`: any — Choose whether to apply Durable Object code updates immediately or defer them. When omitted, the default strategy applies.
- `created_on`: string **required**
- `id`: string **required**
- `source`: string **required**
- `strategy`: string **required** enum: `percentage` — Strategy for routing traffic across the listed versions. `percentage` splits traffic according to each version's `percentage`.
- `versions`: object[] **required** — Worker versions included in this deployment. Each object must contain a `version_id` UUID and a `percentage`; percentages across all objects
  [array of]
  - `percentage`: number **required** — Percentage of traffic served by this version.
  - `version_id`: string **required** — Identifier of the Worker Version.

## DELETE /accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}

Delete Worker Deployment

operationId: `worker-deployments-delete-deployment`

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

## GET /accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}

Get Worker Deployment

operationId: `worker-deployments-get-deployment`

**Response** 200 → `result`

- `annotations`: object — Metadata attached to the deployment.
  - `workers/message`: string — Human-readable message about the deployment. Truncated to 1000 bytes if longer.
  - `workers/triggered_by`: string — Operation that triggered the creation of the deployment.
- `author_email`: string
- `code_update_strategy`: any — Choose whether to apply Durable Object code updates immediately or defer them. When omitted, the default strategy applies.
- `created_on`: string **required**
- `id`: string **required**
- `source`: string **required**
- `strategy`: string **required** enum: `percentage` — Strategy for routing traffic across the listed versions. `percentage` splits traffic according to each version's `percentage`.
- `versions`: object[] **required** — Worker versions included in this deployment. Each object must contain a `version_id` UUID and a `percentage`; percentages across all objects
  [array of]
  - `percentage`: number **required** — Percentage of traffic served by this version.
  - `version_id`: string **required** — Identifier of the Worker Version.
