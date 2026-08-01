# exports

6 endpoints.

## POST /accounts/{account_id}/data-security/posture/content/export

Create a content export

operationId: `CreateContentExport`

## GET /accounts/{account_id}/data-security/posture/exports

List all export jobs

operationId: `ListExportJobs` · query: `status`

## GET /accounts/{account_id}/data-security/posture/exports/{id}

Get a single export job

operationId: `GetExportJob`

## POST /accounts/{account_id}/data-security/posture/findings/{storage_namespace_id}/instances/export

Create a finding instances export

operationId: `CreateFindingInstancesExportCSV`

## POST /accounts/{account_id}/data-security/posture/findings/export

Create new findings export request

operationId: `CreateFindingExportCSV`

## POST /accounts/{account_id}/data-security/posture/remediations/jobs/export

Create a remediation jobs export

operationId: `CreateRemediationJobsExportCSV`
