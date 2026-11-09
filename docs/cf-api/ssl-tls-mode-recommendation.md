# SSL/TLS Mode Recommendation

1 endpoints.

## GET /zones/{zone_id}/ssl/recommendation

SSL/TLS Recommendation

operationId: `ssl/-tls-mode-recommendation-ssl/-tls-recommendation`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether this setting can be updated or not.
- `id`: string **required**
- `modified_on`: string **required** — Last time this setting was modified.
- `next_scheduled_scan`: string — Next time this zone will be scanned by the Automatic SSL/TLS.
- `value`: string **required** enum: `auto`, `custom` — Current setting of the automatic SSL/TLS.
