# Origin TLS

6 endpoints.

## GET /zones/{zone_id}/settings/auto_origin_tls_kex

Get Auto-Origin TLS KEX enrollment status for the given zone

operationId: `ssl-detector-auto-origin-tls-kex-get-enrollment`

**Response** 200 → `result`

- `enabled`: any **required** — Whether Auto-Origin TLS KEX selection is enabled for the zone.
- `id`: string **required**
- `modified_on`: string **required** — Last time this setting was modified.

## PATCH /zones/{zone_id}/settings/auto_origin_tls_kex

Patch Auto-Origin TLS KEX enrollment status for the given zone

operationId: `ssl-detector-auto-origin-tls-kex-patch-enrollment`

**Request** (application/json)

- `enabled`: boolean **required** — Controls enablement of Auto-Origin TLS KEX selection for the zone.

**Response** 200 → `result`

- `enabled`: any **required** — Whether Auto-Origin TLS KEX selection is enabled for the zone.
- `id`: string **required**
- `modified_on`: string **required** — Last time this setting was modified.

## DELETE /zones/{zone_id}/settings/origin_tls_compliance_modes

Delete Origin TLS Compliance Modes setting

operationId: `zone-cache-settings-delete-origin-tls-compliance-modes-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.

## GET /zones/{zone_id}/settings/origin_tls_compliance_modes

Get Origin TLS Compliance Modes setting

operationId: `zone-cache-settings-get-origin-tls-compliance-modes-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PATCH /zones/{zone_id}/settings/origin_tls_compliance_modes

Change Origin TLS Compliance Modes setting

operationId: `zone-cache-settings-change-origin-tls-compliance-modes-setting`

**Request** (application/json)

- `value`: string[] **required** — List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone'
  [array]

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PUT /zones/{zone_id}/settings/origin_tls_compliance_modes

Replace Origin TLS Compliance Modes setting

operationId: `zone-cache-settings-replace-origin-tls-compliance-modes-setting`

**Request** (application/json)

- `value`: string[] **required** — List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone'
  [array]

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.
