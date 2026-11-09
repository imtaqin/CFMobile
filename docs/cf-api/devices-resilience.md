# Devices Resilience

2 endpoints.

## GET /accounts/{account_id}/devices/resilience/disconnect

Get Global Disconnect

operationId: `devices-resilience-retrieve-global-warp-override`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/devices/resilience/disconnect

Set Global Disconnect

operationId: `devices-resilience-set-global-warp-override`

**Request** (application/json)

- `disconnect`: boolean **required** — Disconnects all devices on the account using Global WARP override.
- `justification`: string — Reasoning for setting the Global WARP override state. This will be surfaced in the audit log.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
