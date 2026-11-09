# Smart Tiered Cache

4 endpoints.

## DELETE /zones/{zone_id}/cache/tiered_cache_smart_topology_enable

Delete Smart Tiered Cache setting

operationId: `smart-tiered-cache-delete-smart-tiered-cache-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.

## GET /zones/{zone_id}/cache/tiered_cache_smart_topology_enable

Get Smart Tiered Cache setting

operationId: `smart-tiered-cache-get-smart-tiered-cache-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PATCH /zones/{zone_id}/cache/tiered_cache_smart_topology_enable

Patch Smart Tiered Cache setting

operationId: `smart-tiered-cache-patch-smart-tiered-cache-setting`

**Request** (application/json)

- `value`: string **required** enum: `on`, `off` — Enable or disable the Smart Tiered Cache.

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## POST /zones/{zone_id}/cache/tiered_cache_smart_topology_enable

Create Smart Tiered Cache setting

operationId: `smart-tiered-cache-create-smart-tiered-cache-setting`

**Request** (application/json)

- `value`: string **required** enum: `on`, `off` — Enable or disable the Smart Tiered Cache.

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.
