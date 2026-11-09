# Device Managed Networks

5 endpoints.

## GET /accounts/{account_id}/devices/networks

List your device managed networks

operationId: `device-managed-networks-list-device-managed-networks`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/devices/networks

Create a device managed network

operationId: `device-managed-networks-create-device-managed-network`

**Request** (application/json)

- `config`: any **required**
- `name`: string **required** — The name of the device managed network. This name must be unique.
- `type`: string **required** enum: `tls` — The type of device managed network.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/devices/networks/{network_id}

Delete a device managed network

operationId: `device-managed-networks-delete-device-managed-network`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/networks/{network_id}

Get device managed network details

operationId: `device-managed-networks-device-managed-network-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/devices/networks/{network_id}

Update a device managed network

operationId: `device-managed-networks-update-device-managed-network`

**Request** (application/json)

- `config`: any
- `name`: string — The name of the device managed network. This name must be unique.
- `type`: string enum: `tls` — The type of device managed network.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
