# Registrar Transfer

2 endpoints.

## POST /accounts/{account_id}/registrar/registrations/{domain_name}/transfer-in

Initiate Transfer

operationId: `registrar-domain-transfer-in-create`

**Request** (application/json)

- `auth_code`: string — The EPP/authorization code from your current registrar, base64-encoded
- `auto_renew`: boolean default: `false` — Enable or disable automatic renewal after transfer. Defaults to `false` if omitted.
- `contact_extensions`: object — Registry-specific contact extension values for the registrant.
- `contacts`: object
- `privacy_mode`: string enum: `off`, `redaction` — WHOIS privacy mode to apply after transfer completes. Defaults to

**Response** 202 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar/registrations/{domain_name}/transfer-in-status

Get Transfer Status

operationId: `registrar-domain-transfer-get-status`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
