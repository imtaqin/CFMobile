# Groups

8 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/dataset/-/groups

List account groups

operationId: `get_GroupList`

**Response** 200 → `result`

[array of]
- `createdAt`: string **required**
- `description`: string **required**
- `name`: string **required**
- `updatedAt`: string **required**
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/dataset/-/groups

Create an account group

operationId: `post_GroupCreate`

**Request** (application/json)

- `description`: string **required**
- `name`: string **required**

**Response** 200 → `result`

- `createdAt`: string **required**
- `description`: string **required**
- `name`: string **required**
- `updatedAt`: string **required**
- `uuid`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/dataset/-/groups/{group_id}

Delete an account group

operationId: `delete_GroupDelete`

**Response** 200 → `result`

- `message`: string
- `success`: boolean

## GET /accounts/{account_id}/cloudforce-one/events/dataset/-/groups/{group_id}

Get an account group

operationId: `get_GroupRead`

**Response** 200 → `result`

- `createdAt`: string **required**
- `description`: string **required**
- `members`: object[] **required**
  [array of]
  - `accountId`: string **required**
  - `accountTag`: string
  - `createdAt`: string
  - `updatedAt`: string
  - `uuid`: string **required**
- `name`: string **required**
- `updatedAt`: string **required**
- `uuid`: string **required**

## PUT /accounts/{account_id}/cloudforce-one/events/dataset/-/groups/{group_id}

Update an account group

operationId: `put_GroupUpdate`

**Request** (application/json)

- `description`: string **required**
- `name`: string **required**

**Response** 200 → `result`

- `createdAt`: string **required**
- `description`: string **required**
- `name`: string **required**
- `updatedAt`: string **required**
- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/dataset/-/groups/{group_id}/members

List group members

operationId: `get_GroupMemberList`

**Response** 200 → `result`

[array of]
- `accountId`: string **required**
- `accountTag`: string
- `createdAt`: string
- `updatedAt`: string
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/dataset/-/groups/{group_id}/members

Add an account to a group

operationId: `post_GroupMemberCreate`

**Request** (application/json)

- `accountId`: string
- `accountTag`: string

**Response** 200 → `result`

- `accountId`: string **required**
- `accountTag`: string
- `createdAt`: string
- `updatedAt`: string
- `uuid`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/dataset/-/groups/{group_id}/members/{member_id}

Remove an account from a group

operationId: `delete_GroupMemberDelete`

**Response** 200 → `result`

- `message`: string
- `success`: boolean
