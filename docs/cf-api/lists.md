# Lists

11 endpoints.

## GET /accounts/{account_id}/rules/lists

Get lists

operationId: `lists-get-lists`

## POST /accounts/{account_id}/rules/lists

Create a list

operationId: `lists-create-a-list`

## DELETE /accounts/{account_id}/rules/lists/{list_id}

Delete a list

operationId: `lists-delete-a-list`

## GET /accounts/{account_id}/rules/lists/{list_id}

Get a list

operationId: `lists-get-a-list`

## PUT /accounts/{account_id}/rules/lists/{list_id}

Update a list

operationId: `lists-update-a-list`

## DELETE /accounts/{account_id}/rules/lists/{list_id}/items

Delete list items

operationId: `lists-delete-list-items`

## GET /accounts/{account_id}/rules/lists/{list_id}/items

Get list items

operationId: `lists-get-list-items` · query: `cursor`, `per_page`, `search`

## POST /accounts/{account_id}/rules/lists/{list_id}/items

Create list items

operationId: `lists-create-list-items`

## PUT /accounts/{account_id}/rules/lists/{list_id}/items

Update all list items

operationId: `lists-update-all-list-items`

## GET /accounts/{account_id}/rules/lists/{list_id}/items/{item_id}

Get a list item

operationId: `lists-get-a-list-item`

## GET /accounts/{account_id}/rules/lists/bulk_operations/{operation_id}

Get bulk operation status

operationId: `lists-get-bulk-operation-status`
