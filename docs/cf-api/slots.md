# Slots

2 endpoints.

## GET /accounts/{account_id}/cni/slots

Retrieve a list of all slots matching the specified parameters

operationId: `list_slots` · query: `address_contains`, `site`, `speed`, `occupied`, `cursor`, `limit`

**Response** 200 → `result`

- `items`: object[] **required**
  [array of]
  - `account`: string — Customer account tag
  - `ccr_device_name`: string
  - `facility`: object **required**
    - `address`: string[] **required**
    - `name`: string **required**
  - `id`: string **required** — Slot ID
  - `occupied`: boolean **required** — Whether the slot is occupied or not
  - `site`: string **required**
  - `speed`: string **required**
- `next`: integer

## GET /accounts/{account_id}/cni/slots/{slot}

Get information about the specified slot

operationId: `get_slot`

**Response** 200 → `result`

- `account`: string — Customer account tag
- `ccr_device_name`: string
- `facility`: object **required**
  - `address`: string[] **required**
    [array]
  - `name`: string **required**
- `id`: string **required** — Slot ID
- `occupied`: boolean **required** — Whether the slot is occupied or not
- `site`: string **required**
- `speed`: string **required**
