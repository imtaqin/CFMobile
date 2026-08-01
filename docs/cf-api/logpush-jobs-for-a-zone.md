# Logpush jobs for a zone

12 endpoints.

## GET /zones/{zone_id}/logpush/datasets/{dataset_id}/fields

List fields

operationId: `get-zones-zone_id-logpush-datasets-dataset_id-fields`

## GET /zones/{zone_id}/logpush/datasets/{dataset_id}/jobs

List Logpush jobs for a dataset

operationId: `get-zones-zone_id-logpush-datasets-dataset_id-jobs`

## GET /zones/{zone_id}/logpush/jobs

List Logpush jobs

operationId: `get-zones-zone_id-logpush-jobs`

## POST /zones/{zone_id}/logpush/jobs

Create Logpush job

operationId: `post-zones-zone_id-logpush-jobs`

## DELETE /zones/{zone_id}/logpush/jobs/{job_id}

Delete Logpush job

operationId: `delete-zones-zone_id-logpush-jobs-job_id`

## GET /zones/{zone_id}/logpush/jobs/{job_id}

Get Logpush job details

operationId: `get-zones-zone_id-logpush-jobs-job_id`

## PUT /zones/{zone_id}/logpush/jobs/{job_id}

Update Logpush job

operationId: `put-zones-zone_id-logpush-jobs-job_id`

## POST /zones/{zone_id}/logpush/ownership

Get ownership challenge

operationId: `post-zones-zone_id-logpush-ownership`

## POST /zones/{zone_id}/logpush/ownership/validate

Validate ownership challenge

operationId: `post-zones-zone_id-logpush-ownership-validate`

## POST /zones/{zone_id}/logpush/validate/destination

Validate destination

operationId: `post-zones-zone_id-logpush-validate-destination`

## POST /zones/{zone_id}/logpush/validate/destination/exists

Check destination exists

operationId: `post-zones-zone_id-logpush-validate-destination-exists`

## POST /zones/{zone_id}/logpush/validate/origin

Validate origin

operationId: `post-zones-zone_id-logpush-validate-origin`
