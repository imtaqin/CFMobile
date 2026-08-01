# DLP Data Tags

5 endpoints.

## GET /accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags

Retrieve all data tags in a data tag category

operationId: `dlp-data-tags-list`

## POST /accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags

Creates a new data tag.

operationId: `dlp-data-tags-create`

## DELETE /accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags/{tag_id}

Delete a single data tag.

operationId: `dlp-data-tags-delete`

## GET /accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags/{tag_id}

Retrieve a specific data tag.

operationId: `dlp-data-tags-read`

## PUT /accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags/{tag_id}

Update the attributes of a single data tag.

operationId: `dlp-data-tags-update`
