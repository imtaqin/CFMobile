# Device Posture Integrations

5 endpoints.

## GET /accounts/{account_id}/devices/posture/integration

List posture integrations

operationId: `device-posture-integrations-list-device-posture-integrations`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/devices/posture/integration

Create posture integration

operationId: `device-posture-integrations-create-device-posture-integration`

**Request** (application/json)

- `config`: any **required**
- `interval`: string **required** — The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).
- `name`: string **required** — The name of the device posture integration.
- `type`: string **required** enum: `workspace_one`, `crowdstrike_s2s`, `uptycs`, `intune`, `kolide`, `tanium_s2s`, `sentinelone_s2s`, `custom_s2s` — The type of device posture integration.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/devices/posture/integration/{integration_id}

Delete posture integration

operationId: `device-posture-integrations-delete-device-posture-integration`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/posture/integration/{integration_id}

Get posture integration

operationId: `device-posture-integrations-device-posture-integration-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/devices/posture/integration/{integration_id}

Update posture integration

operationId: `device-posture-integrations-update-device-posture-integration`

**Request** (application/json)

- `config`: any
- `interval`: string — The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).
- `name`: string — The name of the device posture integration.
- `type`: string enum: `workspace_one`, `crowdstrike_s2s`, `uptycs`, `intune`, `kolide`, `tanium_s2s`, `sentinelone_s2s`, `custom_s2s` — The type of device posture integration.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
