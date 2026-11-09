# Zone-Level Authenticated Origin Pulls

6 endpoints.

## GET /zones/{zone_id}/origin_tls_client_auth

List Certificates

operationId: `zone-level-authenticated-origin-pulls-list-certificates`

**Response** 200 → `result`

[array of]
- `certificate`: string — The zone's leaf certificate.
- `expires_on`: string — When the certificate from the authority expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate activation.
- `uploaded_on`: string — This is the time the certificate was uploaded.

## POST /zones/{zone_id}/origin_tls_client_auth

Upload Certificate

operationId: `zone-level-authenticated-origin-pulls-upload-certificate`

**Request** (application/json)

- `certificate`: string **required** — The zone's leaf certificate.
- `private_key`: string **required** — The zone's private key.

**Response** 200 → `result`

- `certificate`: string — The zone's leaf certificate.
- `expires_on`: string — When the certificate from the authority expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate activation.
- `uploaded_on`: string — This is the time the certificate was uploaded.

## DELETE /zones/{zone_id}/origin_tls_client_auth/{certificate_id}

Delete Certificate

operationId: `zone-level-authenticated-origin-pulls-delete-certificate`

**Response** 200 → `result`

- `certificate`: string — The zone's leaf certificate.
- `expires_on`: string — When the certificate from the authority expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate activation.
- `uploaded_on`: string — This is the time the certificate was uploaded.

## GET /zones/{zone_id}/origin_tls_client_auth/{certificate_id}

Get Certificate Details

operationId: `zone-level-authenticated-origin-pulls-get-certificate-details`

**Response** 200 → `result`

- `certificate`: string — The zone's leaf certificate.
- `expires_on`: string — When the certificate from the authority expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate activation.
- `uploaded_on`: string — This is the time the certificate was uploaded.

## GET /zones/{zone_id}/origin_tls_client_auth/settings

Get Enablement Setting for Zone

operationId: `zone-level-authenticated-origin-pulls-get-enablement-setting-for-zone`

**Response** 200 → `result`

- `enabled`: boolean — Indicates whether zone-level authenticated origin pulls is enabled.

## PUT /zones/{zone_id}/origin_tls_client_auth/settings

Set Enablement for Zone

operationId: `zone-level-authenticated-origin-pulls-set-enablement-for-zone`

**Request** (application/json)

- `enabled`: boolean **required** — Indicates whether zone-level authenticated origin pulls is enabled.

**Response** 200 → `result`

- `enabled`: boolean — Indicates whether zone-level authenticated origin pulls is enabled.
