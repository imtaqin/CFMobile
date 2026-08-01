# Dataset

6 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/dataset

Lists all datasets in an account

operationId: `get_DatasetList` · query: `includeDeleted`

## DELETE /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}

Delete a dataset

operationId: `delete_DatasetDelete`

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}

Reads a dataset

operationId: `get_DatasetRead`

## PATCH /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}

Updates an existing dataset

operationId: `patch_DatasetUpdate`

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}

Updates an existing dataset

operationId: `post_DatasetUpdate`

## POST /accounts/{account_id}/cloudforce-one/events/dataset/create

Creates a dataset

operationId: `post_DatasetCreate`
