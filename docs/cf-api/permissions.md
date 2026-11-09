# Permissions

4 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/permissions

List dataset permissions

operationId: `get_PermissionList`

**Response** 200 → `result`

[array of]
- `createdAt`: string **required**
- `resourceId`: string — The resource ID this permission applies to account_id or group_id
- `resourceType`: string **required** enum: `dataset`
- `role`: string **required** enum: `read`, `write`
- `subjectId`: string **required**
- `subjectType`: string **required** enum: `account`, `group`
- `updatedAt`: string **required**
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/permissions

Grant access to a dataset

operationId: `post_PermissionCreate`

**Request** (application/json)

- `role`: string **required** enum: `read`, `write`
- `subjectId`: string **required**
- `subjectType`: string **required** enum: `account`, `group`

**Response** 200 → `result`

- `createdAt`: string **required**
- `resourceId`: string — The resource ID this permission applies to account_id or group_id
- `resourceType`: string **required** enum: `dataset`
- `role`: string **required** enum: `read`, `write`
- `subjectId`: string **required**
- `subjectType`: string **required** enum: `account`, `group`
- `updatedAt`: string **required**
- `uuid`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/permissions/{grant_id}

Revoke access to a dataset

operationId: `delete_PermissionDelete`

**Response** 200 → `result`

- `message`: string
- `success`: boolean

## PUT /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/permissions/{grant_id}

Change a dataset permission

operationId: `put_PermissionUpdate`

**Request** (application/json)

- `role`: string **required** enum: `read`, `write`

**Response** 200 → `result`

- `message`: string
- `success`: boolean
