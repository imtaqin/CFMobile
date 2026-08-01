# Request for Information (RFI)

17 endpoints.

## POST /accounts/{account_id}/cloudforce-one/requests

List Requests

operationId: `cloudforce-one-request-list`

## DELETE /accounts/{account_id}/cloudforce-one/requests/{request_id}

Delete a Request

operationId: `cloudforce-one-request-delete`

## GET /accounts/{account_id}/cloudforce-one/requests/{request_id}

Get a Request

operationId: `cloudforce-one-request-get`

## PUT /accounts/{account_id}/cloudforce-one/requests/{request_id}

Update a Request

operationId: `cloudforce-one-request-update`

## POST /accounts/{account_id}/cloudforce-one/requests/{request_id}/asset

List Request Assets

operationId: `cloudforce-one-request-asset-list`

## DELETE /accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}

Delete a Request Asset

operationId: `cloudforce-one-request-asset-delete`

## GET /accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}

Get a Request Asset

operationId: `cloudforce-one-request-asset-get`

## PUT /accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}

Update a Request Asset

operationId: `cloudforce-one-request-asset-update`

## POST /accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/new

Create a New Request Asset

operationId: `cloudforce-one-request-asset-new`

## POST /accounts/{account_id}/cloudforce-one/requests/{request_id}/message

List Request Messages

operationId: `cloudforce-one-request-message-list`

## DELETE /accounts/{account_id}/cloudforce-one/requests/{request_id}/message/{message_id}

Delete a Request Message

operationId: `cloudforce-one-request-message-delete`

## PUT /accounts/{account_id}/cloudforce-one/requests/{request_id}/message/{message_id}

Update a Request Message

operationId: `cloudforce-one-request-message-update`

## POST /accounts/{account_id}/cloudforce-one/requests/{request_id}/message/new

Create a New Request Message

operationId: `cloudforce-one-request-message-new`

## GET /accounts/{account_id}/cloudforce-one/requests/constants

Get Request Priority, Status, and TLP constants

operationId: `cloudforce-one-request-constants`

## POST /accounts/{account_id}/cloudforce-one/requests/new

Create a New Request.

operationId: `cloudforce-one-request-new`

## GET /accounts/{account_id}/cloudforce-one/requests/quota

Get Request Quota

operationId: `cloudforce-one-request-quota`

## GET /accounts/{account_id}/cloudforce-one/requests/types

Get Request Types

operationId: `cloudforce-one-request-types`
