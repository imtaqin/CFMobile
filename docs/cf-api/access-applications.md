# Access applications

9 endpoints.

## GET /accounts/{account_id}/access/apps

List Access applications

operationId: `access-applications-list-access-applications` · query: `name`, `domain`, `aud`, `target_attributes`, `exact`, `search`

## POST /accounts/{account_id}/access/apps

Add an Access application

operationId: `access-applications-add-an-application`

## DELETE /accounts/{account_id}/access/apps/{app_id}

Delete an Access application

operationId: `access-applications-delete-an-access-application`

## GET /accounts/{account_id}/access/apps/{app_id}

Get an Access application

operationId: `access-applications-get-an-access-application`

## PUT /accounts/{account_id}/access/apps/{app_id}

Update an Access application

operationId: `access-applications-update-an-access-application`

## POST /accounts/{account_id}/access/apps/{app_id}/revoke_tokens

Revoke application tokens

operationId: `access-applications-revoke-service-tokens`

## PATCH /accounts/{account_id}/access/apps/{app_id}/settings

Update Access application settings

operationId: `access-applications-patch-update-access-application-settings`

## PUT /accounts/{account_id}/access/apps/{app_id}/settings

Update Access application settings

operationId: `access-applications-put-update-access-application-settings`

## GET /accounts/{account_id}/access/apps/{app_id}/user_policy_checks

Test Access policies

operationId: `access-applications-test-access-policies`
