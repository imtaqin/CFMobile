# Origin CA

4 endpoints.

## GET /certificates

List Certificates

operationId: `origin-ca-list-certificates` · query: `zone_id`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `certificate`: string — The Origin CA certificate. Will be newline-encoded.
- `csr`: string — The Certificate Signing Request (CSR). Must be newline-encoded.
- `expires_on`: string — When the certificate will expire.
- `hostnames`: string[] — Array of hostnames or wildcard names bound to the certificate.
  [array]
- `id`: string — The x509 serial number of the Origin CA certificate.
- `request_type`: string enum: `origin-rsa`, `origin-ecc`, `keyless-certificate` — Signature type desired on certificate ("origin-rsa" (rsa), "origin-ecc" (ecdsa), or "keyless-certificate" (for Keyless SSL servers).
- `requested_validity`: any — The number of days for which the certificate was requested to be valid. Only returned in the Create Certificate response, where it echoes th
- `revoked_at`: string — When the certificate was revoked.

## POST /certificates

Create Certificate

operationId: `origin-ca-create-certificate`

**Request** (application/json)

- `csr`: string **required** — The Certificate Signing Request (CSR). Must be newline-encoded.
- `hostnames`: string[] **required** — Array of hostnames or wildcard names bound to the certificate.
  [array]
- `request_type`: string **required** enum: `origin-rsa`, `origin-ecc`, `keyless-certificate` — Signature type desired on certificate ("origin-rsa" (rsa), "origin-ecc" (ecdsa), or "keyless-certificate" (for Keyless SSL servers).
- `requested_validity`: any default: `5475` — The number of days for which the certificate should be valid.
- `zone_id`: string — Identifier of the zone whose keyless servers the certificate is for. Required when `request_type` is `keyless-certificate`; ignored otherwis

**Response** 200 → `result`

- `certificate`: string — The Origin CA certificate. Will be newline-encoded.
- `csr`: string — The Certificate Signing Request (CSR). Must be newline-encoded.
- `expires_on`: string — When the certificate will expire.
- `hostnames`: string[] — Array of hostnames or wildcard names bound to the certificate.
  [array]
- `id`: string — The x509 serial number of the Origin CA certificate.
- `request_type`: string enum: `origin-rsa`, `origin-ecc`, `keyless-certificate` — Signature type desired on certificate ("origin-rsa" (rsa), "origin-ecc" (ecdsa), or "keyless-certificate" (for Keyless SSL servers).
- `requested_validity`: any — The number of days for which the certificate was requested to be valid. Only returned in the Create Certificate response, where it echoes th
- `revoked_at`: string — When the certificate was revoked.

## DELETE /certificates/{certificate_id}

Revoke Certificate

operationId: `origin-ca-revoke-certificate`

**Response** 200 → `result`

- `id`: string — The x509 serial number of the Origin CA certificate.
- `revoked_at`: string — When the certificate was revoked.

## GET /certificates/{certificate_id}

Get Certificate

operationId: `origin-ca-get-certificate`

**Response** 200 → `result`

- `certificate`: string — The Origin CA certificate. Will be newline-encoded.
- `csr`: string — The Certificate Signing Request (CSR). Must be newline-encoded.
- `expires_on`: string — When the certificate will expire.
- `hostnames`: string[] — Array of hostnames or wildcard names bound to the certificate.
  [array]
- `id`: string — The x509 serial number of the Origin CA certificate.
- `request_type`: string enum: `origin-rsa`, `origin-ecc`, `keyless-certificate` — Signature type desired on certificate ("origin-rsa" (rsa), "origin-ecc" (ecdsa), or "keyless-certificate" (for Keyless SSL servers).
- `requested_validity`: any — The number of days for which the certificate was requested to be valid. Only returned in the Create Certificate response, where it echoes th
- `revoked_at`: string — When the certificate was revoked.
