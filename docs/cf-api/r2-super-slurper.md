# R2 Super Slurper

12 endpoints.

## GET /accounts/{account_id}/slurper/jobs

List jobs

operationId: `slurper-list-jobs` · query: `limit`, `offset`

## POST /accounts/{account_id}/slurper/jobs

Create a job

operationId: `slurper-create-job`

## DELETE /accounts/{account_id}/slurper/jobs/{job_id}

Delete a job

operationId: `slurper-delete-job`

## GET /accounts/{account_id}/slurper/jobs/{job_id}

Get job details

operationId: `slurper-get-job`

## PUT /accounts/{account_id}/slurper/jobs/{job_id}/abort

Abort a job

operationId: `slurper-abort-job`

## GET /accounts/{account_id}/slurper/jobs/{job_id}/logs

Get job logs

operationId: `slurper-get-job-logs` · query: `limit`, `offset`

## PUT /accounts/{account_id}/slurper/jobs/{job_id}/pause

Pause a job

operationId: `slurper-pause-job`

## GET /accounts/{account_id}/slurper/jobs/{job_id}/progress

Get job progress

operationId: `slurper-get-job-progress`

## PUT /accounts/{account_id}/slurper/jobs/{job_id}/resume

Resume a job

operationId: `slurper-resume-job`

## PUT /accounts/{account_id}/slurper/jobs/abortAll

Abort all jobs

operationId: `slurper-abort-all-jobs`

## PUT /accounts/{account_id}/slurper/source/connectivity-precheck

Check source connectivity

operationId: `slurper-check-source-connectivity`

## PUT /accounts/{account_id}/slurper/target/connectivity-precheck

Check target connectivity

operationId: `slurper-check-target-connectivity`
