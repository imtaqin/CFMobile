# Account Members

5 endpoints.

## GET /accounts/{account_id}/members

List Members

operationId: `account-members-list-members` · query: `order`, `status`, `page`, `per_page`, `direction`

**Response** 200 → `result`

[array of]
- `email`: string — The contact email address of the user.
- `id`: string — Membership identifier tag.
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
- `roles`: object[] — Roles assigned to this Member.
  [array of]
  - `description`: string **required** — Description of role's permissions.
  - `id`: string **required** — Role identifier tag.
  - `name`: string **required** — Role name.
  - `permissions`: any **required**
- `status`: string enum: `accepted`, `pending` — A member's status in the account.
- `user`: object — Details of the user associated to the membership.
  - `email`: string **required** — The contact email address of the user.
  - `first_name`: string — User's first name
  - `id`: string — Identifier
  - `last_name`: string — User's last name
  - `two_factor_authentication_enabled`: boolean default: `false` — Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

## POST /accounts/{account_id}/members

Add Member

operationId: `account-members-add-member`

**Request** (application/json)

(one of 2 variants; showing the first)
- `email`: string **required** — The contact email address of the user.
- `roles`: string[] **required** — Array of roles associated with this member.
  [array]
- `status`: string enum: `accepted`, `pending` — Status of the member invitation. If not provided during creation, defaults to 'pending'.

**Response** 200 → `result`

- `email`: string — The contact email address of the user.
- `id`: string — Membership identifier tag.
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
- `roles`: object[] — Roles assigned to this Member.
  [array of]
  - `description`: string **required** — Description of role's permissions.
  - `id`: string **required** — Role identifier tag.
  - `name`: string **required** — Role name.
  - `permissions`: any **required**
- `status`: string enum: `accepted`, `pending` — A member's status in the account.
- `user`: object — Details of the user associated to the membership.
  - `email`: string **required** — The contact email address of the user.
  - `first_name`: string — User's first name
  - `id`: string — Identifier
  - `last_name`: string — User's last name
  - `two_factor_authentication_enabled`: boolean default: `false` — Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

## DELETE /accounts/{account_id}/members/{member_id}

Remove Member

operationId: `account-members-remove-member`

**Response** 200 → `result`

- `id`: string **required** — Identifier

## GET /accounts/{account_id}/members/{member_id}

Member Details

operationId: `account-members-member-details`

**Response** 200 → `result`

- `email`: string — The contact email address of the user.
- `id`: string — Membership identifier tag.
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
- `roles`: object[] — Roles assigned to this Member.
  [array of]
  - `description`: string **required** — Description of role's permissions.
  - `id`: string **required** — Role identifier tag.
  - `name`: string **required** — Role name.
  - `permissions`: any **required**
- `status`: string enum: `accepted`, `pending` — A member's status in the account.
- `user`: object — Details of the user associated to the membership.
  - `email`: string **required** — The contact email address of the user.
  - `first_name`: string — User's first name
  - `id`: string — Identifier
  - `last_name`: string — User's last name
  - `two_factor_authentication_enabled`: boolean default: `false` — Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

## PUT /accounts/{account_id}/members/{member_id}

Update Member

operationId: `account-members-update-member`

**Request** (application/json)

(one of 2 variants; showing the first)
- `id`: string — Membership identifier tag.
- `roles`: object[] — Roles assigned to this member.
  [array of]
  - `description`: string **required** — Description of role's permissions.
  - `id`: string **required** — Role identifier tag.
  - `name`: string **required** — Role name.
  - `permissions`: any **required**
- `status`: string enum: `accepted`, `pending` — A member's status in the account.
- `user`: object — Details of the user associated to the membership.
  - `email`: string **required** — The contact email address of the user.
  - `first_name`: string — User's first name
  - `id`: string — Identifier
  - `last_name`: string — User's last name
  - `two_factor_authentication_enabled`: boolean default: `false` — Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

**Response** 200 → `result`

- `email`: string — The contact email address of the user.
- `id`: string — Membership identifier tag.
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
- `roles`: object[] — Roles assigned to this Member.
  [array of]
  - `description`: string **required** — Description of role's permissions.
  - `id`: string **required** — Role identifier tag.
  - `name`: string **required** — Role name.
  - `permissions`: any **required**
- `status`: string enum: `accepted`, `pending` — A member's status in the account.
- `user`: object — Details of the user associated to the membership.
  - `email`: string **required** — The contact email address of the user.
  - `first_name`: string — User's first name
  - `id`: string — Identifier
  - `last_name`: string — User's last name
  - `two_factor_authentication_enabled`: boolean default: `false` — Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.
