# Access policy tester

3 endpoints.

## POST /accounts/{account_id}/access/policy-tests

Start Access policy test

operationId: `access-policy-tests`

## GET /accounts/{account_id}/access/policy-tests/{policy_test_id}

Get the current status of a given Access policy test

operationId: `access-policy-tests-get-an-update`

## GET /accounts/{account_id}/access/policy-tests/{policy_test_id}/users

Get an Access policy test users page

operationId: `access-policy-tests-get-a-user-page` · query: `per_page`, `status`
