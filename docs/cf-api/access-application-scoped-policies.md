# Access application-scoped policies

6 endpoints.

## GET /accounts/{account_id}/access/apps/{app_id}/policies

List Access application policies

operationId: `access-policies-list-access-app-policies` · query: `per_page`

## POST /accounts/{account_id}/access/apps/{app_id}/policies

Create an Access application policy

operationId: `access-policies-create-an-access-policy`

## DELETE /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}

Delete an Access application policy

operationId: `access-policies-delete-an-access-policy`

## GET /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}

Get an Access application policy

operationId: `access-policies-get-an-access-policy`

## PUT /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}

Update an Access application policy

operationId: `access-policies-update-an-access-policy`

## PUT /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}/make_reusable

Convert an Access application policy to a reusable policy

operationId: `access-policies-convert-reusable`
