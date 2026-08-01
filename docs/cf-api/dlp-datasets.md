# DLP Datasets

9 endpoints.

## GET /accounts/{account_id}/dlp/datasets

Fetch all datasets

operationId: `dlp-datasets-read-all`

## POST /accounts/{account_id}/dlp/datasets

Create a new dataset

operationId: `dlp-datasets-create`

## DELETE /accounts/{account_id}/dlp/datasets/{dataset_id}

Delete a dataset

operationId: `dlp-datasets-delete`

## GET /accounts/{account_id}/dlp/datasets/{dataset_id}

Fetch a specific dataset

operationId: `dlp-datasets-read`

## PUT /accounts/{account_id}/dlp/datasets/{dataset_id}

Update details about a dataset

operationId: `dlp-datasets-update`

## POST /accounts/{account_id}/dlp/datasets/{dataset_id}/upload

Prepare to upload a new version of a dataset

operationId: `dlp-datasets-create-version`

## POST /accounts/{account_id}/dlp/datasets/{dataset_id}/upload/{version}

Upload a new version of a dataset

operationId: `dlp-datasets-upload-version`

## POST /accounts/{account_id}/dlp/datasets/{dataset_id}/versions/{version}

Sets the column information for a multi-column upload

operationId: `dlp-datasets-define-columns`

## POST /accounts/{account_id}/dlp/datasets/{dataset_id}/versions/{version}/entries/{entry_id}

Upload a new version of a multi-column dataset

operationId: `dlp-datasets-upload-dataset-column`
