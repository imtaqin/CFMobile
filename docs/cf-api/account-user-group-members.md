# Account User Group Members

5 endpoints.

## GET /accounts/{account_id}/iam/user_groups/{user_group_id}/members

List User Group Members

operationId: `account-user-group-member-list` · query: `page`, `per_page`, `fuzzyEmail`, `direction`

**Response** 200 → `result`

[array of]
- `email`: string — The contact email address of the user.
- `id`: string **required** — Account member identifier.
- `status`: string enum: `accepted`, `pending` — The member's status in the account.

## POST /accounts/{account_id}/iam/user_groups/{user_group_id}/members

Add User Group Members

operationId: `account-user-group-member-create`

**Request** (application/json)

[array of]
- `id`: any **required** — The identifier of an existing account Member.

**Response** 200 → `result`

[array of]
- `email`: string — The contact email address of the user.
- `id`: string **required** — Account member identifier.
- `status`: string enum: `accepted`, `pending` — The member's status in the account.

## PUT /accounts/{account_id}/iam/user_groups/{user_group_id}/members

Update User Group Members

operationId: `account-user-group-members-update`

**Request** (application/json)

[array of]
- `id`: any **required** — The identifier of an existing account Member.

**Response** 200 → `result`

[array of]
- `email`: string — The contact email address of the user.
- `id`: string **required** — Account member identifier.
- `status`: string enum: `accepted`, `pending` — The member's status in the account.

## DELETE /accounts/{account_id}/iam/user_groups/{user_group_id}/members/{member_id}

Remove User Group Member

operationId: `account-user-group-member-delete`

**Response** 200 → `result`

- `email`: string — The contact email address of the user.
- `id`: string **required** — Account member identifier.
- `status`: string enum: `accepted`, `pending` — The member's status in the account.

## GET /accounts/{account_id}/iam/user_groups/{user_group_id}/members/{member_id}

Get User Group Member

operationId: `account-user-group-member-get`

**Response** 200 → `result`

- `created_at`: string — When the member was added to the user group.
- `email`: string — The contact email address of the user.
- `id`: string **required** — Account member identifier.
- `status`: string enum: `accepted`, `pending` — The member's status in the account.
- `user`: object — Details of the user associated with this membership.
  - `email`: string — The contact email address of the user.
  - `first_name`: string — User's first name.
  - `id`: string — User identifier tag.
  - `last_name`: string — User's last name.
