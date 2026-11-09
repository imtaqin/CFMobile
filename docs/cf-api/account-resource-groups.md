# Account Resource Groups

5 endpoints.

## GET /accounts/{account_id}/iam/resource_groups

List Resource Groups

operationId: `account-resource-group-list` · query: `id`, `name`

**Response** 200 → `result`

[array of]
- `id`: string **required** — Identifier of the resource group.
- `meta`: object — Attributes associated to the resource group.
  - `key`: string
  - `value`: string
- `name`: string — Name of the resource group.
- `scope`: any **required** — The scope associated to the resource group

## POST /accounts/{account_id}/iam/resource_groups

Create Resource Group

operationId: `account-resource-group-create`

**Request** (application/json)

- `name`: string **required** — Name of the resource group
- `scope`: any **required** — The scope associated to the resource group

**Response** 200 → `result`

- `id`: string **required** — Identifier of the resource group.
- `meta`: object — Attributes associated to the resource group.
  - `key`: string
  - `value`: string
- `name`: string — Name of the resource group.
- `scope`: any **required** — The scope associated to the resource group

## DELETE /accounts/{account_id}/iam/resource_groups/{resource_group_id}

Remove Resource Group

operationId: `account-resource-group-delete`

**Response** 200 → `result`

- `id`: string **required** — Identifier

## GET /accounts/{account_id}/iam/resource_groups/{resource_group_id}

Resource Group Details

operationId: `account-resource-group-details`

**Response** 200 → `result`

- `id`: string **required** — Identifier of the resource group.
- `meta`: object — Attributes associated to the resource group.
  - `key`: string
  - `value`: string
- `name`: string — Name of the resource group.
- `scope`: any **required** — The scope associated to the resource group

## PUT /accounts/{account_id}/iam/resource_groups/{resource_group_id}

Update Resource Group

operationId: `account-resource-group-update`

**Request** (application/json)

- `name`: string — Name of the resource group
- `scope`: any — The scope associated to the resource group

**Response** 200 → `result`

- `id`: string **required** — Identifier of the resource group.
- `meta`: object — Attributes associated to the resource group.
  - `key`: string
  - `value`: string
- `name`: string — Name of the resource group.
- `scope`: any **required** — The scope associated to the resource group
