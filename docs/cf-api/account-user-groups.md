# Account User Groups

5 endpoints.

## GET /accounts/{account_id}/iam/user_groups

List User Groups

operationId: `account-user-group-list` · query: `id`, `name`, `fuzzyName`, `page`, `per_page`, `direction`

## POST /accounts/{account_id}/iam/user_groups

Create User Group

operationId: `account-user-group-create`

## DELETE /accounts/{account_id}/iam/user_groups/{user_group_id}

Remove User Group

operationId: `account-user-group-delete`

## GET /accounts/{account_id}/iam/user_groups/{user_group_id}

User Group Details

operationId: `account-user-group-details`

## PUT /accounts/{account_id}/iam/user_groups/{user_group_id}

Update User Group

operationId: `account-user-group-update`
