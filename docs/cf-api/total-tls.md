# Total TLS

2 endpoints.

## GET /zones/{zone_id}/acm/total_tls

Total TLS Settings Details

operationId: `total-tls-total-tls-settings-details`

**Response** 200 → `result`

- `certificate_authority`: string enum: `google`, `lets_encrypt`, `ssl_com` — The Certificate Authority that Total TLS certificates will be issued through. Not returned in responses when Total TLS is disabled.
- `enabled`: boolean — If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.
- `validity_period`: integer enum: `90` — The validity period in days for the certificates ordered via Total TLS. Not returned when Total TLS is disabled.

## POST /zones/{zone_id}/acm/total_tls

Enable or Disable Total TLS

operationId: `total-tls-enable-or-disable-total-tls`

**Request** (application/json)

- `certificate_authority`: string enum: `google`, `lets_encrypt`, `ssl_com` — The Certificate Authority that Total TLS certificates will be issued through. Not returned in responses when Total TLS is disabled.
- `enabled`: boolean **required** — If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

**Response** 200 → `result`

- `certificate_authority`: string enum: `google`, `lets_encrypt`, `ssl_com` — The Certificate Authority that Total TLS certificates will be issued through. Not returned in responses when Total TLS is disabled.
- `enabled`: boolean — If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.
- `validity_period`: integer enum: `90` — The validity period in days for the certificates ordered via Total TLS. Not returned when Total TLS is disabled.
