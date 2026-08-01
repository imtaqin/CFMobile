# Resource Sharing

16 endpoints.

## GET /accounts/{account_id}/shares

List account shares

operationId: `shares-list`

## POST /accounts/{account_id}/shares

Create a new share

operationId: `share-create`

## DELETE /accounts/{account_id}/shares/{share_id}

Delete a share

operationId: `share-delete`

## GET /accounts/{account_id}/shares/{share_id}

Get account share by ID

operationId: `shares-get-by-id`

## PUT /accounts/{account_id}/shares/{share_id}

Update a share

operationId: `share-update`

## GET /accounts/{account_id}/shares/{share_id}/recipients

List share recipients by share ID

operationId: `share-recipients-list`

## POST /accounts/{account_id}/shares/{share_id}/recipients

Create a new share recipient

operationId: `share-recipient-create`

## PUT /accounts/{account_id}/shares/{share_id}/recipients

Update a share's recipients

operationId: `share-recipients-update`

## DELETE /accounts/{account_id}/shares/{share_id}/recipients/{recipient_id}

Delete a share recipient

operationId: `share-recipient-delete`

## GET /accounts/{account_id}/shares/{share_id}/recipients/{recipient_id}

Get share recipient by ID

operationId: `share-recipients-get-by-id`

## GET /accounts/{account_id}/shares/{share_id}/resources

List share resources by share ID

operationId: `share-resources-list`

## POST /accounts/{account_id}/shares/{share_id}/resources

Create a new share resource

operationId: `share-resource-create`

## DELETE /accounts/{account_id}/shares/{share_id}/resources/{share_resource_id}

Delete a share resource

operationId: `share-resource-delete`

## GET /accounts/{account_id}/shares/{share_id}/resources/{share_resource_id}

Get share resource by ID

operationId: `share-resources-get-by-id`

## PUT /accounts/{account_id}/shares/{share_id}/resources/{share_resource_id}

Update a share resource

operationId: `share-resource-update`

## GET /organizations/{organization_id}/shares

List organization shares

operationId: `organization-shares-list`
