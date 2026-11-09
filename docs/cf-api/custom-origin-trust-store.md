# Custom Origin Trust Store

4 endpoints.

## GET /zones/{zone_id}/acm/custom_trust_store

List Custom Origin Trust Store Details

operationId: `custom-origin-trust-store-list-details` · query: `page`, `per_page`, `limit`, `offset`

**Response** 200 → `result`

[array of]
- `certificate`: string **required** — The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.
- `expires_on`: string **required** — When the certificate expires.
- `id`: string **required** — Certificate identifier tag.
- `issuer`: string **required** — The certificate authority that issued the certificate.
- `signature`: string **required** — The type of hash used for the certificate.
- `status`: string **required** enum: `initializing`, `pending_deployment`, `active`, `pending_deletion`, `deleted`, `expired` — Status of the zone's custom SSL.
- `updated_at`: string — When the certificate was last modified. Only returned when uploading a certificate.
- `uploaded_on`: string **required** — When the certificate was uploaded to Cloudflare.

## POST /zones/{zone_id}/acm/custom_trust_store

Upload Custom Origin Trust Store

operationId: `custom-origin-trust-store-create`

**Request** (application/json)

- `certificate`: string **required** — The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

**Response** 200 → `result`

- `certificate`: string **required** — The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.
- `expires_on`: string **required** — When the certificate expires.
- `id`: string **required** — Certificate identifier tag.
- `issuer`: string **required** — The certificate authority that issued the certificate.
- `signature`: string **required** — The type of hash used for the certificate.
- `status`: string **required** enum: `initializing`, `pending_deployment`, `active`, `pending_deletion`, `deleted`, `expired` — Status of the zone's custom SSL.
- `updated_at`: string — When the certificate was last modified. Only returned when uploading a certificate.
- `uploaded_on`: string **required** — When the certificate was uploaded to Cloudflare.

## DELETE /zones/{zone_id}/acm/custom_trust_store/{custom_origin_trust_store_id}

Delete Custom Origin Trust Store

operationId: `custom-origin-trust-store-delete`

**Response** 200 → `result`

- `id`: string — Certificate identifier tag.

## GET /zones/{zone_id}/acm/custom_trust_store/{custom_origin_trust_store_id}

Custom Origin Trust Store Details

operationId: `custom-origin-trust-store-details`

**Response** 200 → `result`

- `certificate`: string **required** — The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.
- `expires_on`: string **required** — When the certificate expires.
- `id`: string **required** — Certificate identifier tag.
- `issuer`: string **required** — The certificate authority that issued the certificate.
- `signature`: string **required** — The type of hash used for the certificate.
- `status`: string **required** enum: `initializing`, `pending_deployment`, `active`, `pending_deletion`, `deleted`, `expired` — Status of the zone's custom SSL.
- `updated_at`: string — When the certificate was last modified. Only returned when uploading a certificate.
- `uploaded_on`: string **required** — When the certificate was uploaded to Cloudflare.
