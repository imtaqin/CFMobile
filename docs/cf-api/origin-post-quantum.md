# Origin Post-Quantum

2 endpoints.

## GET /zones/{zone_id}/cache/origin_post_quantum_encryption

Get Origin Post-Quantum Encryption setting

operationId: `zone-cache-settings-get-origin-post-quantum-encryption-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PUT /zones/{zone_id}/cache/origin_post_quantum_encryption

Change Origin Post-Quantum Encryption setting

operationId: `zone-cache-settings-change-origin-post-quantum-encryption-setting`

**Request** (application/json)

- `value`: string **required** enum: `preferred`, `supported`, `off` default: `supported` — Value of the Origin Post Quantum Encryption Setting.

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.
