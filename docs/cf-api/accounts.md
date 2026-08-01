# Accounts

10 endpoints.

## GET /accounts

List Accounts

operationId: `accounts-list-accounts` · query: `name`, `page`, `per_page`, `direction`

## POST /accounts

Create an account

operationId: `account-creation`

## DELETE /accounts/{account_id}

Delete a specific account

operationId: `account-deletion`

## GET /accounts/{account_id}

Account Details

operationId: `accounts-account-details`

## PUT /accounts/{account_id}

Update Account

operationId: `accounts-update-account`

## POST /accounts/{account_id}/move

Move account

operationId: `Accounts_moveAccounts`

## GET /accounts/{account_id}/organizations

List account organizations

operationId: `Accounts_listAccountOrganizations`

## GET /accounts/{account_id}/profile

Get account profile

operationId: `Accounts_getAccountProfile`

## PUT /accounts/{account_id}/profile

Modify account profile

operationId: `Accounts_modifyAccountProfile`

## POST /accounts/move

Batch move accounts

operationId: `Accounts_batchMoveAccounts`
