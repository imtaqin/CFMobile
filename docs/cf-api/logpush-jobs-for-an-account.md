# Logpush jobs for an account

12 endpoints.

## GET /accounts/{account_id}/logpush/datasets/{dataset_id}/fields

List fields

operationId: `get-accounts-account_id-logpush-datasets-dataset_id-fields`

## GET /accounts/{account_id}/logpush/datasets/{dataset_id}/jobs

List Logpush jobs for a dataset

operationId: `get-accounts-account_id-logpush-datasets-dataset_id-jobs`

## GET /accounts/{account_id}/logpush/jobs

List Logpush jobs

operationId: `get-accounts-account_id-logpush-jobs`

## POST /accounts/{account_id}/logpush/jobs

Create Logpush job

operationId: `post-accounts-account_id-logpush-jobs`

## DELETE /accounts/{account_id}/logpush/jobs/{job_id}

Delete Logpush job

operationId: `delete-accounts-account_id-logpush-jobs-job_id`

## GET /accounts/{account_id}/logpush/jobs/{job_id}

Get Logpush job details

operationId: `get-accounts-account_id-logpush-jobs-job_id`

## PUT /accounts/{account_id}/logpush/jobs/{job_id}

Update Logpush job

operationId: `put-accounts-account_id-logpush-jobs-job_id`

## POST /accounts/{account_id}/logpush/ownership

Get ownership challenge

operationId: `post-accounts-account_id-logpush-ownership`

## POST /accounts/{account_id}/logpush/ownership/validate

Validate ownership challenge

operationId: `post-accounts-account_id-logpush-ownership-validate`

## POST /accounts/{account_id}/logpush/validate/destination

Validate destination

operationId: `delete-accounts-account_id-logpush-validate-destination`

## POST /accounts/{account_id}/logpush/validate/destination/exists

Check destination exists

operationId: `delete-accounts-account_id-logpush-validate-destination-exists`

## POST /accounts/{account_id}/logpush/validate/origin

Validate origin

operationId: `post-accounts-account_id-logpush-validate-origin`
