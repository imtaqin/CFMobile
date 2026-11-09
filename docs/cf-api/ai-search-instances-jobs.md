# AI Search Instances Jobs

10 endpoints.

## GET /accounts/{account_id}/ai-search/instances/{id}/jobs

List Jobs

operationId: `ai-search-instance-list-jobs` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `description`: string
- `end_reason`: string
- `ended_at`: string
- `id`: string **required**
- `last_seen_at`: string
- `source`: string **required** enum: `user`, `schedule`
- `started_at`: string

## POST /accounts/{account_id}/ai-search/instances/{id}/jobs

Create new job

operationId: `ai-search-instance-create-job`

**Request** (application/json)

- `description`: string

**Response** 200 → `result`

- `description`: string
- `end_reason`: string
- `ended_at`: string
- `id`: string **required**
- `last_seen_at`: string
- `source`: string **required** enum: `user`, `schedule`
- `started_at`: string

## GET /accounts/{account_id}/ai-search/instances/{id}/jobs/{job_id}

Get a Job Details

operationId: `ai-search-instance-get-job`

**Response** 200 → `result`

- `description`: string
- `end_reason`: string
- `ended_at`: string
- `id`: string **required**
- `last_seen_at`: string
- `source`: string **required** enum: `user`, `schedule`
- `started_at`: string

## PATCH /accounts/{account_id}/ai-search/instances/{id}/jobs/{job_id}

Cancel an indexing job.

operationId: `ai-search-instance-change-job-status`

**Request** (application/json)

- `action`: string **required** enum: `cancel`

**Response** 200 → `result`

- `description`: string
- `end_reason`: string
- `ended_at`: string
- `id`: string **required**
- `last_seen_at`: string
- `source`: string **required** enum: `user`, `schedule`
- `started_at`: string

## GET /accounts/{account_id}/ai-search/instances/{id}/jobs/{job_id}/logs

List Job Logs

operationId: `ai-search-instance-list-job-logs` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: number **required**
- `id`: integer **required**
- `message`: string **required**
- `message_type`: integer **required**

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/jobs

List Jobs

operationId: `ai-search-namespace-instance-list-jobs` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `description`: string
- `end_reason`: string
- `ended_at`: string
- `id`: string **required**
- `last_seen_at`: string
- `source`: string **required** enum: `user`, `schedule`
- `started_at`: string

## POST /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/jobs

Create new job

operationId: `ai-search-namespace-instance-create-job`

**Request** (application/json)

- `description`: string

**Response** 200 → `result`

- `description`: string
- `end_reason`: string
- `ended_at`: string
- `id`: string **required**
- `last_seen_at`: string
- `source`: string **required** enum: `user`, `schedule`
- `started_at`: string

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/jobs/{job_id}

Get a Job Details

operationId: `ai-search-namespace-instance-get-job`

**Response** 200 → `result`

- `description`: string
- `end_reason`: string
- `ended_at`: string
- `id`: string **required**
- `last_seen_at`: string
- `source`: string **required** enum: `user`, `schedule`
- `started_at`: string

## PATCH /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/jobs/{job_id}

Cancel an indexing job.

operationId: `ai-search-namespace-instance-change-job-status`

**Request** (application/json)

- `action`: string **required** enum: `cancel`

**Response** 200 → `result`

- `description`: string
- `end_reason`: string
- `ended_at`: string
- `id`: string **required**
- `last_seen_at`: string
- `source`: string **required** enum: `user`, `schedule`
- `started_at`: string

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/jobs/{job_id}/logs

List Job Logs

operationId: `ai-search-namespace-instance-list-job-logs` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: number **required**
- `id`: integer **required**
- `message`: string **required**
- `message_type`: integer **required**
