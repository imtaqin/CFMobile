# NEL Settings

2 endpoints.

## GET /zones/{zone_id}/settings/nel

Get NEL setting

operationId: `nel-settings-get`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable. This is false when the zone's plan does not include NEL or the NEL product feature is not enabled.
- `id`: string **required** enum: `nel` — Zone setting identifier.
- `modified_on`: string **required** — When the setting was last modified. A zero value (0001-01-01T00:00:00Z) indicates the setting has never been explicitly set and is using the
- `value`: object **required** — The NEL configuration value.
  - `enabled`: boolean **required** — Whether Network Error Logging is enabled for the zone. When enabled, browsers report network errors to Cloudflare's NEL endpoint.

## PATCH /zones/{zone_id}/settings/nel

Edit NEL setting

operationId: `nel-settings-edit`

**Request** (application/json)

- `value`: object **required** — The NEL configuration value.
  - `enabled`: boolean **required** — Whether Network Error Logging is enabled for the zone. When enabled, browsers report network errors to Cloudflare's NEL endpoint.

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable. This is false when the zone's plan does not include NEL or the NEL product feature is not enabled.
- `id`: string **required** enum: `nel` — Zone setting identifier.
- `modified_on`: string **required** — When the setting was last modified. A zero value (0001-01-01T00:00:00Z) indicates the setting has never been explicitly set and is using the
- `value`: object **required** — The NEL configuration value.
  - `enabled`: boolean **required** — Whether Network Error Logging is enabled for the zone. When enabled, browsers report network errors to Cloudflare's NEL endpoint.
