# Account User Group Members

5 endpoints.

## GET /accounts/{account_id}/iam/user_groups/{user_group_id}/members

List User Group Members

operationId: `account-user-group-member-list` · query: `page`, `per_page`, `fuzzyEmail`, `direction`

## POST /accounts/{account_id}/iam/user_groups/{user_group_id}/members

Add User Group Members

operationId: `account-user-group-member-create`

## PUT /accounts/{account_id}/iam/user_groups/{user_group_id}/members

Update User Group Members

operationId: `account-user-group-members-update`

## DELETE /accounts/{account_id}/iam/user_groups/{user_group_id}/members/{member_id}

Remove User Group Member

operationId: `account-user-group-member-delete`

## GET /accounts/{account_id}/iam/user_groups/{user_group_id}/members/{member_id}

Get User Group Member

operationId: `account-user-group-member-get`
