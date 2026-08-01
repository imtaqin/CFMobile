# Category

9 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/categories

Lists categories across multiple datasets

operationId: `get_CategoryList` · query: `datasetIds`

## DELETE /accounts/{account_id}/cloudforce-one/events/categories/{category_id}

Deletes a category

operationId: `delete_CategoryDelete`

## GET /accounts/{account_id}/cloudforce-one/events/categories/{category_id}

Reads a category

operationId: `get_CategoryRead`

## PATCH /accounts/{account_id}/cloudforce-one/events/categories/{category_id}

Updates a category

operationId: `patch_CategoryUpdate`

## POST /accounts/{account_id}/cloudforce-one/events/categories/{category_id}

Updates a category

operationId: `post_CategoryUpdate`

## GET /accounts/{account_id}/cloudforce-one/events/categories/catalog

Lists categories

operationId: `get_CategoryListComplete`

## POST /accounts/{account_id}/cloudforce-one/events/categories/create

Creates a new category

operationId: `post_CategoryCreate`

## GET /accounts/{account_id}/resource-library/categories

List application categories

operationId: `getCategories` · query: `limit`, `offset`

## GET /accounts/{account_id}/resource-library/categories/{id}

Get application category

operationId: `getCategoryById`
