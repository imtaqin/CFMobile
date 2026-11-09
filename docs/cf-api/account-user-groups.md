# Account User Groups

5 endpoints.

## GET /accounts/{account_id}/iam/user_groups

List User Groups

operationId: `account-user-group-list` · query: `id`, `name`, `fuzzyName`, `page`, `per_page`, `direction`

**Response** 200 → `result`

[array of]
- `created_on`: string **required** — Timestamp for the creation of the user group
- `id`: string **required** — Identifier of the user group.
- `modified_on`: string **required** — Last time the user group was modified.
- `name`: string **required** — Name of the user group.
- `policies`: object[] — Policies attached to the User group
  [array of]
  - `access`: string enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string — Policy identifier.
  - `permission_groups`: object[] — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resource_groups`: object[] — A list of resource groups that the policy applies to.
    [array of]
    - `id`: string **required** — Identifier of the resource group.
    - `meta`: object — Attributes associated to the resource group.
    - `name`: string — Name of the resource group.
    - `scope`: any **required** — The scope associated to the resource group

## POST /accounts/{account_id}/iam/user_groups

Create User Group

operationId: `account-user-group-create`

**Request** (application/json)

- `name`: string **required** — Name of the User group.
- `policies`: object[] — Policies attached to the User group
  [array of]
  - `access`: string **required** enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `permission_groups`: object[] **required** — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: any **required** — Permission Group identifier tag.
  - `resource_groups`: object[] **required** — A set of resource groups that are specified to the policy.
    [array of]
    - `id`: any **required** — Resource Group identifier tag.

**Response** 200 → `result`

- `created_on`: string **required** — Timestamp for the creation of the user group
- `id`: string **required** — Identifier of the user group.
- `modified_on`: string **required** — Last time the user group was modified.
- `name`: string **required** — Name of the user group.
- `policies`: object[] — Policies attached to the User group
  [array of]
  - `access`: string enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string — Policy identifier.
  - `permission_groups`: object[] — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resource_groups`: object[] — A list of resource groups that the policy applies to.
    [array of]
    - `id`: string **required** — Identifier of the resource group.
    - `meta`: object — Attributes associated to the resource group.
    - `name`: string — Name of the resource group.
    - `scope`: any **required** — The scope associated to the resource group

## DELETE /accounts/{account_id}/iam/user_groups/{user_group_id}

Remove User Group

operationId: `account-user-group-delete`

**Response** 200 → `result`

- `id`: string **required** — Identifier

## GET /accounts/{account_id}/iam/user_groups/{user_group_id}

User Group Details

operationId: `account-user-group-details`

**Response** 200 → `result`

- `created_on`: string **required** — Timestamp for the creation of the user group
- `id`: string **required** — Identifier of the user group.
- `modified_on`: string **required** — Last time the user group was modified.
- `name`: string **required** — Name of the user group.
- `policies`: object[] — Policies attached to the User group
  [array of]
  - `access`: string enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string — Policy identifier.
  - `permission_groups`: object[] — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resource_groups`: object[] — A list of resource groups that the policy applies to.
    [array of]
    - `id`: string **required** — Identifier of the resource group.
    - `meta`: object — Attributes associated to the resource group.
    - `name`: string — Name of the resource group.
    - `scope`: any **required** — The scope associated to the resource group

## PUT /accounts/{account_id}/iam/user_groups/{user_group_id}

Update User Group

operationId: `account-user-group-update`

**Request** (application/json)

- `name`: string — Name of the User group.
- `policies`: object[] — Policies attached to the User group
  [array of]
  - `id`: string **required** — Policy identifier.
  - `access`: string **required** enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `permission_groups`: object[] **required** — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: any **required** — Permission Group identifier tag.
  - `resource_groups`: object[] **required** — A set of resource groups that are specified to the policy.
    [array of]
    - `id`: any **required** — Resource Group identifier tag.

**Response** 200 → `result`

- `created_on`: string **required** — Timestamp for the creation of the user group
- `id`: string **required** — Identifier of the user group.
- `modified_on`: string **required** — Last time the user group was modified.
- `name`: string **required** — Name of the user group.
- `policies`: object[] — Policies attached to the User group
  [array of]
  - `access`: string enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string — Policy identifier.
  - `permission_groups`: object[] — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resource_groups`: object[] — A list of resource groups that the policy applies to.
    [array of]
    - `id`: string **required** — Identifier of the resource group.
    - `meta`: object — Attributes associated to the resource group.
    - `name`: string — Name of the resource group.
    - `scope`: any **required** — The scope associated to the resource group
