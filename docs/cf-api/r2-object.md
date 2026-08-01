# R2 Object

5 endpoints.

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/objects

Delete Objects

operationId: `r2-delete-objects` · query: `prefix`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/objects

List Objects

operationId: `r2-list-objects` · query: `per_page`, `prefix`, `delimiter`, `cursor`, `start_after`

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}

Delete Object

operationId: `r2-delete-object`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}

Get Object

operationId: `r2-get-object`

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}

Upload Object

operationId: `r2-put-object`
