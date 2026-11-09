# Zone Cache Settings

9 endpoints.

## GET /zones/{zone_id}/cache/cache_reserve

Get Cache Reserve setting

operationId: `zone-cache-settings-get-cache-reserve-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PATCH /zones/{zone_id}/cache/cache_reserve

Change Cache Reserve setting

operationId: `zone-cache-settings-change-cache-reserve-setting`

**Request** (application/json)

- `value`: string **required** enum: `on`, `off` default: `off` — Value of the Cache Reserve zone setting.

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## GET /zones/{zone_id}/cache/cache_reserve_clear

Get Cache Reserve Clear

operationId: `zone-cache-settings-get-cache-reserve-clear`

**Response** 200 → `result`

- `id`: string **required** — Identifier of the zone setting.
- `modified_on`: string — Last time this setting was modified.
- `id`: string enum: `cache_reserve_clear` — ID of the zone setting.
- `end_ts`: string — The time that the latest Cache Reserve Clear operation completed.
- `start_ts`: string **required** — The time that the latest Cache Reserve Clear operation started.
- `state`: string **required** enum: `In-progress`, `Completed` — The current state of the Cache Reserve Clear operation.

## POST /zones/{zone_id}/cache/cache_reserve_clear

Start Cache Reserve Clear

operationId: `zone-cache-settings-start-cache-reserve-clear`

**Response** 200 → `result`

- `id`: string **required** — Identifier of the zone setting.
- `modified_on`: string — Last time this setting was modified.
- `id`: string enum: `cache_reserve_clear` — ID of the zone setting.
- `end_ts`: string — The time that the latest Cache Reserve Clear operation completed.
- `start_ts`: string **required** — The time that the latest Cache Reserve Clear operation started.
- `state`: string **required** enum: `In-progress`, `Completed` — The current state of the Cache Reserve Clear operation.

## GET /zones/{zone_id}/cache/regional_tiered_cache

Get Regional Tiered Cache setting

operationId: `zone-cache-settings-get-regional-tiered-cache-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PATCH /zones/{zone_id}/cache/regional_tiered_cache

Change Regional Tiered Cache setting

operationId: `zone-cache-settings-change-regional-tiered-cache-setting`

**Request** (application/json)

- `value`: string **required** enum: `on`, `off` default: `off` — Value of the Regional Tiered Cache zone setting.

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## DELETE /zones/{zone_id}/cache/variants

Delete variants setting

operationId: `zone-cache-settings-delete-variants-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.

## GET /zones/{zone_id}/cache/variants

Get variants setting

operationId: `zone-cache-settings-get-variants-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PATCH /zones/{zone_id}/cache/variants

Change variants setting

operationId: `zone-cache-settings-change-variants-setting`

**Request** (application/json)

- `value`: object **required** — Value of the zone setting.
  - `avif`: string[] — List of strings with the MIME types of all the variants that should be served for avif.
    [array]
  - `bmp`: string[] — List of strings with the MIME types of all the variants that should be served for bmp.
    [array]
  - `gif`: string[] — List of strings with the MIME types of all the variants that should be served for gif.
    [array]
  - `jp2`: string[] — List of strings with the MIME types of all the variants that should be served for jp2.
    [array]
  - `jpeg`: string[] — List of strings with the MIME types of all the variants that should be served for jpeg.
    [array]
  - `jpg`: string[] — List of strings with the MIME types of all the variants that should be served for jpg.
    [array]
  - `jpg2`: string[] — List of strings with the MIME types of all the variants that should be served for jpg2.
    [array]
  - `png`: string[] — List of strings with the MIME types of all the variants that should be served for png.
    [array]
  - `tif`: string[] — List of strings with the MIME types of all the variants that should be served for tif.
    [array]
  - `tiff`: string[] — List of strings with the MIME types of all the variants that should be served for tiff.
    [array]
  - `webp`: string[] — List of strings with the MIME types of all the variants that should be served for webp.
    [array]

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.
