# Dashboard - Users

1 endpoints.

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/user/me

Get current user profile

operationId: `get_UserGetSelf`

**Response** 200 → `result`

- `display_name`: string — User display name
- `id`: string **required** — Unique user ID
