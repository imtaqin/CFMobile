# Account Resource Groups

5 endpoints.

## GET /accounts/{account_id}/iam/resource_groups

List Resource Groups

operationId: `account-resource-group-list` · query: `id`, `name`

## POST /accounts/{account_id}/iam/resource_groups

Create Resource Group

operationId: `account-resource-group-create`

## DELETE /accounts/{account_id}/iam/resource_groups/{resource_group_id}

Remove Resource Group

operationId: `account-resource-group-delete`

## GET /accounts/{account_id}/iam/resource_groups/{resource_group_id}

Resource Group Details

operationId: `account-resource-group-details`

## PUT /accounts/{account_id}/iam/resource_groups/{resource_group_id}

Update Resource Group

operationId: `account-resource-group-update`
