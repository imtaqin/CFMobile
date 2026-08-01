# AutoRAG Jobs

3 endpoints.

## GET /accounts/{account_id}/autorag/rags/{id}/jobs

List Jobs

operationId: `autorag-config-list-jobs` · query: `page`, `per_page`

## GET /accounts/{account_id}/autorag/rags/{id}/jobs/{job_id}

Get a Job Details

operationId: `autorag-config-get-job`

## GET /accounts/{account_id}/autorag/rags/{id}/jobs/{job_id}/logs

List Job Logs

operationId: `autorag-config-list-job-logs` · query: `page`, `per_page`
