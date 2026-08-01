# Tag

6 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/tags/{tag_uuid}/indicators

List indicators related to a tag within a dataset (deprecated)

operationId: `get_DatasetTagIndicatorsList` · query: `page`, `pageSize`, `indicatorType`, `relatedEvent`, `search`

## GET /accounts/{account_id}/cloudforce-one/events/tags

Lists all tags (SoT)

operationId: `get_TagList` · query: `page`, `pageSize`, `search`, `categoryUuid`, `filters`, `cache`

## DELETE /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}

Deletes a tag (SoT)

operationId: `delete_TagDelete`

## PATCH /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}

Updates a tag (SoT)

operationId: `patch_TagUpdate`

## GET /accounts/{account_id}/cloudforce-one/events/tags/{tag_uuid}/indicators

List indicators related to a tag

operationId: `get_TagIndicatorsList` · query: `datasetIds`, `page`, `pageSize`, `indicatorType`, `relatedEvent`, `search`

## POST /accounts/{account_id}/cloudforce-one/events/tags/create

Creates a new tag

operationId: `post_TagCreate`
