# User's Account Memberships

5 endpoints.

## GET /memberships

List Memberships

operationId: `user'-s-account-memberships-list-memberships` · query: `account.name`, `page`, `per_page`, `order`, `direction`, `name`, `status`

**Response** 200 → `result`

[array of]
- `account`: any
- `api_access_enabled`: boolean — Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.
- `id`: string — Membership identifier tag.
- `permissions`: any — All access permissions for the user at the account.
- `roles`: string[] — List of role names the membership has for this account.
  [array]
- `status`: string enum: `accepted`, `pending`, `rejected` — Status of this membership.

## DELETE /memberships/{membership_id}

Delete Membership

operationId: `user'-s-account-memberships-delete-membership`

**Response** 200 → `result`

- `id`: string — Membership identifier tag.

## GET /memberships/{membership_id}

Membership Details

operationId: `user'-s-account-memberships-membership-details`

**Response** 200 → `result`

- `account`: any
- `api_access_enabled`: boolean — Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.
- `id`: string — Membership identifier tag.
- `permissions`: any — All access permissions for the user at the account.
- `policies`: object[] — Access policy for the membership
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
- `roles`: string[] — List of role names the membership has for this account.
  [array]
- `status`: string enum: `accepted`, `pending`, `rejected` — Status of this membership.

## PUT /memberships/{membership_id}

Update Membership

operationId: `user'-s-account-memberships-update-membership`

**Request** (application/json)

- `status`: string **required** enum: `accepted`, `rejected` — Whether to accept or reject this account invitation.

**Response** 200 → `result`

- `account`: any
- `api_access_enabled`: boolean — Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.
- `id`: string — Membership identifier tag.
- `permissions`: any — All access permissions for the user at the account.
- `policies`: object[] — Access policy for the membership
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
- `roles`: string[] — List of role names the membership has for this account.
  [array]
- `status`: string enum: `accepted`, `pending`, `rejected` — Status of this membership.

## GET /user/memberships/{membership_id}

Get User Membership

operationId: `user-memberships-get`

**Response** 200 → `result`

- `account`: any
- `api_access_enabled`: boolean — Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.
- `id`: string — Membership identifier tag.
- `permissions`: any — All access permissions for the user at the account.
- `policies`: object[] — Access policy for the membership
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
- `roles`: string[] — List of role names the membership has for this account.
  [array]
- `status`: string enum: `accepted`, `pending`, `rejected` — Status of this membership.
