# Override Codes

1 endpoints.

## POST /accounts/{account_id}/devices/override_codes

Generate an uninstall protection override code

operationId: `create-override-code`

**Request** (application/json)

- `device_id`: string — Physical device ID. Required when scope is device and forbidden when scope is account.
- `duration_hours`: integer **required** — Number of hours for which the override code should remain valid.
- `scope`: string **required** enum: `account`, `device` — Whether the code applies to every device in the account or one physical device.
- `type`: string **required** enum: `uninstall_protection` — The feature that the override code applies to.

**Response** 200 → `result`

- `code`: string **required** — Uninstall protection override code.
