# SSO

6 endpoints.

## GET /accounts/{account_id}/sso_connectors

Get all SSO connectors

operationId: `get-all-sso-connectors`

## POST /accounts/{account_id}/sso_connectors

Initialize new SSO connector

operationId: `init-new-sso-connector`

## DELETE /accounts/{account_id}/sso_connectors/{sso_connector_id}

Delete SSO connector

operationId: `delete-sso-connector`

## GET /accounts/{account_id}/sso_connectors/{sso_connector_id}

Get single SSO connector

operationId: `get-sso-connector`

## PATCH /accounts/{account_id}/sso_connectors/{sso_connector_id}

Update SSO connector state

operationId: `update-sso-connector-state`

## POST /accounts/{account_id}/sso_connectors/{sso_connector_id}/begin_verification

Begin SSO connector verification

operationId: `begin-sso-connector-verification`
