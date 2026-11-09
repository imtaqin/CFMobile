# Tiered Caching

2 endpoints.

## GET /zones/{zone_id}/argo/tiered_caching

Get Tiered Cache

operationId: `tiered-caching-get-tiered-caching-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PATCH /zones/{zone_id}/argo/tiered_caching

Update Tiered Cache

operationId: `tiered-caching-patch-tiered-caching-setting`

**Request** (application/json)

- `value`: string **required** enum: `on`, `off` — Enables or disables Tiered Cache.

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.
