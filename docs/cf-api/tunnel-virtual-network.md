# Tunnel Virtual Network

5 endpoints.

## GET /accounts/{account_id}/teamnet/virtual_networks

List virtual networks

operationId: `tunnel-virtual-network-list-virtual-networks` · query: `id`, `name`, `is_default`, `is_default_network`, `is_deleted`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/teamnet/virtual_networks

Create a virtual network

operationId: `tunnel-virtual-network-create-a-virtual-network`

**Request** (application/json)

- `comment`: string default: `` — Optional remark describing the virtual network.
- `is_default`: boolean — If `true`, this virtual network is the default for the account.
- `is_default_network`: boolean default: `false` — If `true`, this virtual network is the default for the account.
- `name`: string **required** — A user-friendly name for the virtual network.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}

Delete a virtual network

operationId: `tunnel-virtual-network-delete`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}

Get a virtual network

operationId: `tunnel-virtual-network-get`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}

Update a virtual network

operationId: `tunnel-virtual-network-update`

**Request** (application/json)

- `comment`: string default: `` — Optional remark describing the virtual network.
- `is_default_network`: boolean default: `false` — If `true`, this virtual network is the default for the account.
- `name`: string — A user-friendly name for the virtual network.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
