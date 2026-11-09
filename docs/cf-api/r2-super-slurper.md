# R2 Super Slurper

12 endpoints.

## GET /accounts/{account_id}/slurper/jobs

List jobs

operationId: `slurper-list-jobs` · query: `limit`, `offset`

**Response** 200 → `result`

[array of]
- `createdAt`: string
- `finishedAt`: string
- `id`: string
- `overwrite`: boolean
- `source`: any
- `status`: string enum: `running`, `paused`, `aborted`, `completed`
- `target`: object
  - `bucket`: string
  - `jurisdiction`: any
  - `vendor`: string enum: `r2`

## POST /accounts/{account_id}/slurper/jobs

Create a job

operationId: `slurper-create-job`

**Request** (application/json)

- `overwrite`: boolean default: `true`
- `source`: object
- `target`: object
  - `bucket`: string **required**
  - `jurisdiction`: any
  - `secret`: object **required**
    - `accessKeyId`: string **required**
    - `secretAccessKey`: string **required**
  - `vendor`: string **required** enum: `r2`

**Response** 201 → `result`

- `id`: string

## DELETE /accounts/{account_id}/slurper/jobs/{job_id}

Delete a job

operationId: `slurper-delete-job`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/slurper/jobs/{job_id}

Get job details

operationId: `slurper-get-job`

**Response** 200 → `result`

- `createdAt`: string
- `finishedAt`: string
- `id`: string
- `overwrite`: boolean
- `source`: any
- `status`: string enum: `running`, `paused`, `aborted`, `completed`
- `target`: object
  - `bucket`: string
  - `jurisdiction`: any
  - `vendor`: string enum: `r2`

## PUT /accounts/{account_id}/slurper/jobs/{job_id}/abort

Abort a job

operationId: `slurper-abort-job`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/slurper/jobs/{job_id}/logs

Get job logs

operationId: `slurper-get-job-logs` · query: `limit`, `offset`

**Response** 200 → `result`

[array of]
- `createdAt`: string
- `job`: string
- `logType`: string enum: `migrationStart`, `migrationComplete`, `migrationAbort`, `migrationError`, `migrationPause`, `migrationResume`, `migrationErrorFailedContinuation`, `importErrorRetryExhaustion`
- `message`: string
- `objectKey`: string

## PUT /accounts/{account_id}/slurper/jobs/{job_id}/pause

Pause a job

operationId: `slurper-pause-job`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/slurper/jobs/{job_id}/progress

Get job progress

operationId: `slurper-get-job-progress`

**Response** 200 → `result`

- `createdAt`: string
- `failedObjects`: integer
- `id`: string
- `objects`: integer
- `skippedObjects`: integer
- `status`: string enum: `running`, `paused`, `aborted`, `completed`
- `transferredObjects`: integer

## PUT /accounts/{account_id}/slurper/jobs/{job_id}/resume

Resume a job

operationId: `slurper-resume-job`

**Response** 200 → `result`

string

## PUT /accounts/{account_id}/slurper/jobs/abortAll

Abort all jobs

operationId: `slurper-abort-all-jobs`

**Response** 200 → `result`

string

## PUT /accounts/{account_id}/slurper/source/connectivity-precheck

Check source connectivity

operationId: `slurper-check-source-connectivity`

**Request** (application/json)

(one of 3 variants; showing the first)
- `bucket`: string **required**
- `endpoint`: string — Custom S3-compatible endpoint that must use https://.
- `keys`: string[]
  [array]
- `pathPrefix`: string
- `region`: string
- `secret`: object **required**
  - `accessKeyId`: string **required**
  - `secretAccessKey`: string **required**
- `vendor`: string **required** enum: `s3`

**Response** 200 → `result`

- `connectivityStatus`: string enum: `success`, `error`

## PUT /accounts/{account_id}/slurper/target/connectivity-precheck

Check target connectivity

operationId: `slurper-check-target-connectivity`

**Request** (application/json)

- `bucket`: string **required**
- `jurisdiction`: any
- `secret`: object **required**
  - `accessKeyId`: string **required**
  - `secretAccessKey`: string **required**
- `vendor`: string **required** enum: `r2`

**Response** 200 → `result`

- `connectivityStatus`: string enum: `success`, `error`
