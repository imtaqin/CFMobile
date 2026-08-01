# AI Search Instances Jobs

10 endpoints.

## GET /accounts/{account_id}/ai-search/instances/{id}/jobs

List Jobs

operationId: `ai-search-instance-list-jobs` · query: `page`, `per_page`

## POST /accounts/{account_id}/ai-search/instances/{id}/jobs

Create new job

operationId: `ai-search-instance-create-job`

## GET /accounts/{account_id}/ai-search/instances/{id}/jobs/{job_id}

Get a Job Details

operationId: `ai-search-instance-get-job`

## PATCH /accounts/{account_id}/ai-search/instances/{id}/jobs/{job_id}

Cancel an indexing job.

operationId: `ai-search-instance-change-job-status`

## GET /accounts/{account_id}/ai-search/instances/{id}/jobs/{job_id}/logs

List Job Logs

operationId: `ai-search-instance-list-job-logs` · query: `page`, `per_page`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs

List Jobs

operationId: `ai-search-namespace-instance-list-jobs` · query: `page`, `per_page`

## POST /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs

Create new job

operationId: `ai-search-namespace-instance-create-job`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs/{job_id}

Get a Job Details

operationId: `ai-search-namespace-instance-get-job`

## PATCH /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs/{job_id}

Cancel an indexing job.

operationId: `ai-search-namespace-instance-change-job-status`

## GET /accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs/{job_id}/logs

List Job Logs

operationId: `ai-search-namespace-instance-list-job-logs` · query: `page`, `per_page`
