# Account Permission Groups

2 endpoints.

## GET /accounts/{account_id}/iam/permission_groups

List Account Permission Groups

operationId: `account-permission-group-list` · query: `id`, `name`, `label`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `id`: string **required** — Identifier of the permission group.
- `meta`: object — Attributes associated to the permission group.
  - `category`: string — A category used to group permission groups.
  - `deprecated`: string — Indicates whether the permission group is deprecated.
  - `description`: string — Additional information about the permission group.
  - `editable`: string — Indicates whether the permission group can be edited.
  - `eol_at`: string — The planned end-of-life date and time, when provided.
  - `label`: string — A label identifying the permission group.
  - `scopes`: string — The scope associated with the permission group.
  - `visibility`: string — Indicates the permission group's availability or visibility.
- `name`: string — Name of the permission group.

## GET /accounts/{account_id}/iam/permission_groups/{permission_group_id}

Permission Group Details

operationId: `account-permission-group-details`

**Response** 200 → `result`

- `id`: string **required** — Identifier of the permission group.
- `meta`: object — Attributes associated to the permission group.
  - `category`: string — A category used to group permission groups.
  - `deprecated`: string — Indicates whether the permission group is deprecated.
  - `description`: string — Additional information about the permission group.
  - `editable`: string — Indicates whether the permission group can be edited.
  - `eol_at`: string — The planned end-of-life date and time, when provided.
  - `label`: string — A label identifying the permission group.
  - `scopes`: string — The scope associated with the permission group.
  - `visibility`: string — Indicates the permission group's availability or visibility.
- `name`: string — Name of the permission group.
