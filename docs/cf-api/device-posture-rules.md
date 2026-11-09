# Device posture rules

5 endpoints.

## GET /accounts/{account_id}/devices/posture

List posture rules

operationId: `device-posture-rules-list-device-posture-rules`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/devices/posture

Create posture rule

operationId: `device-posture-rules-create-device-posture-rule`

**Request** (application/json)

- `description`: string — The description of the device posture rule.
- `expiration`: string — Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP cl
- `input`: object — The value to be checked against.
- `match`: object[] — The conditions that the client must match to run the rule.
  [array of]
  - `platform`: string enum: `windows`, `mac`, `linux`, `android`, `ios`, `chromeos`
- `name`: string **required** — The name of the device posture rule.
- `schedule`: string — Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.
- `type`: string **required** enum: `file`, `application`, `tanium`, `gateway`, `warp`, `disk_encryption`, `serial_number`, `sentinelone` — The type of device posture rule.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/devices/posture/{rule_id}

Delete posture rule

operationId: `device-posture-rules-delete-device-posture-rule`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/posture/{rule_id}

Get posture rule

operationId: `device-posture-rules-device-posture-rules-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/devices/posture/{rule_id}

Update posture rule

operationId: `device-posture-rules-update-device-posture-rule`

**Request** (application/json)

- `description`: string — The description of the device posture rule.
- `expiration`: string — Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP cl
- `input`: object — The value to be checked against.
- `match`: object[] — The conditions that the client must match to run the rule.
  [array of]
  - `platform`: string enum: `windows`, `mac`, `linux`, `android`, `ios`, `chromeos`
- `name`: string **required** — The name of the device posture rule.
- `schedule`: string — Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.
- `type`: string **required** enum: `file`, `application`, `tanium`, `gateway`, `warp`, `disk_encryption`, `serial_number`, `sentinelone` — The type of device posture rule.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
