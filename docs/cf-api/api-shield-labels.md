# API Shield Labels

16 endpoints.

## GET /zones/{zone_id}/api_gateway/labels

Retrieve all labels

operationId: `api-shield-labels-get-labels`

## GET /zones/{zone_id}/api_gateway/labels/managed/{name}

Retrieve managed label

operationId: `api-shield-labels-get-managed-label`

## PUT /zones/{zone_id}/api_gateway/labels/managed/{name}/resources/operation

Replace operation(s) attached to a managed label

operationId: `api-shield-labels-replace-operations-attached-to-managed-label`

## DELETE /zones/{zone_id}/api_gateway/labels/user

Delete user labels

operationId: `api-shield-labels-delete-user-labels`

## POST /zones/{zone_id}/api_gateway/labels/user

Create user labels

operationId: `api-shield-labels-create-user-labels`

## DELETE /zones/{zone_id}/api_gateway/labels/user/{name}

Delete user label

operationId: `api-shield-delete-user-label`

## GET /zones/{zone_id}/api_gateway/labels/user/{name}

Retrieve user label

operationId: `api-shield-labels-get-user-label`

## PATCH /zones/{zone_id}/api_gateway/labels/user/{name}

Patch user label

operationId: `api-shield-patch-user-label`

## PUT /zones/{zone_id}/api_gateway/labels/user/{name}

Update user label

operationId: `api-shield-put-user-label`

## PUT /zones/{zone_id}/api_gateway/labels/user/{name}/resources/operation

Replace operation(s) attached to a user label

operationId: `api-shield-labels-replace-operations-attached-to-user-label`

## DELETE /zones/{zone_id}/api_gateway/operations/{operation_id}/labels

Remove label(s) on an operation in endpoint management

operationId: `api-shield-operations-delete-labels-from-operation`

## POST /zones/{zone_id}/api_gateway/operations/{operation_id}/labels

Attach label(s) on an operation in endpoint management

operationId: `api-shield-operations-post-labels-to-operation`

## PUT /zones/{zone_id}/api_gateway/operations/{operation_id}/labels

Replace label(s) on an operation in endpoint management

operationId: `api-shield-operations-put-labels-to-operation`

## DELETE /zones/{zone_id}/api_gateway/operations/labels

Bulk remove label(s) on operation(s) in endpoint management

operationId: `api-shield-operations-bulk-delete-labels-to-operations`

## POST /zones/{zone_id}/api_gateway/operations/labels

Bulk attach label(s) on operation(s) in endpoint management

operationId: `api-shield-operations-bulk-post-labels-to-operations`

## PUT /zones/{zone_id}/api_gateway/operations/labels

Bulk replace label(s) on operation(s) in endpoint management

operationId: `api-shield-operations-bulk-put-labels-to-operations`
