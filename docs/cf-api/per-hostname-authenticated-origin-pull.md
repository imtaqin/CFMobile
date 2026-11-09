# Per-hostname Authenticated Origin Pull

7 endpoints.

## GET /zones/{zone_id}/origin_tls_client_auth/hostnames

List Hostname Associations

operationId: `per-hostname-authenticated-origin-pull-list-hostname-associations` · query: `page`, `per_page`, `status`

**Response** 200 → `result`

[array of]
- `cert_id`: string — Certificate identifier tag.
- `created_at`: string — The time when the certificate was created.
- `enabled`: boolean — Indicates whether hostname-level authenticated origin pulls is enabled. A null value voids the association.
- `hostname`: string — The hostname on the origin for which the client certificate uploaded will be used.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate or the association.
- `updated_at`: string — The time when the certificate was updated.

## PUT /zones/{zone_id}/origin_tls_client_auth/hostnames

Enable or Disable a Hostname for Client Authentication

operationId: `per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication`

**Request** (application/json)

- `config`: any **required**

**Response** 200 → `result`

[array of]
- `cert_id`: string — Certificate identifier tag.
- `cert_status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate or the association.
- `cert_updated_at`: string — The time when the certificate was updated.
- `cert_uploaded_on`: string — The time when the certificate was uploaded.
- `certificate`: string — The hostname certificate.
- `created_at`: string — The time when the certificate was created.
- `enabled`: boolean — Indicates whether hostname-level authenticated origin pulls is enabled. A null value voids the association.
- `expires_on`: string — The date when the certificate expires.
- `hostname`: string — The hostname on the origin for which the client certificate uploaded will be used.
- `issuer`: string — The certificate authority that issued the certificate.
- `serial_number`: string — The serial number on the uploaded certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate or the association.
- `updated_at`: string — The time when the certificate was updated.

## GET /zones/{zone_id}/origin_tls_client_auth/hostnames/{hostname}

Get the Hostname Status for Client Authentication

operationId: `per-hostname-authenticated-origin-pull-get-the-hostname-status-for-client-authentication`

**Response** 200 → `result`

- `cert_id`: string — Certificate identifier tag.
- `cert_status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate or the association.
- `cert_updated_at`: string — The time when the certificate was updated.
- `cert_uploaded_on`: string — The time when the certificate was uploaded.
- `certificate`: string — The hostname certificate.
- `created_at`: string — The time when the certificate was created.
- `enabled`: boolean — Indicates whether hostname-level authenticated origin pulls is enabled. A null value voids the association.
- `expires_on`: string — The date when the certificate expires.
- `hostname`: string — The hostname on the origin for which the client certificate uploaded will be used.
- `issuer`: string — The certificate authority that issued the certificate.
- `serial_number`: string — The serial number on the uploaded certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate or the association.
- `updated_at`: string — The time when the certificate was updated.

## GET /zones/{zone_id}/origin_tls_client_auth/hostnames/certificates

List Certificates

operationId: `per-hostname-authenticated-origin-pull-list-certificates`

**Response** 200 → `result`

[array of]
- `certificate`: string — The hostname certificate.
- `expires_on`: string — The date when the certificate expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `serial_number`: string — The serial number on the uploaded certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate or the association.
- `uploaded_on`: string — The time when the certificate was uploaded.

## POST /zones/{zone_id}/origin_tls_client_auth/hostnames/certificates

Upload a Hostname Client Certificate

operationId: `per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate`

**Request** (application/json)

- `certificate`: string **required** — The hostname certificate.
- `private_key`: string **required** — The hostname certificate's private key.

**Response** 200 → `result`

- `certificate`: string — The hostname certificate.
- `expires_on`: string — The date when the certificate expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `serial_number`: string — The serial number on the uploaded certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate or the association.
- `uploaded_on`: string — The time when the certificate was uploaded.

## DELETE /zones/{zone_id}/origin_tls_client_auth/hostnames/certificates/{certificate_id}

Delete Hostname Client Certificate

operationId: `per-hostname-authenticated-origin-pull-delete-hostname-client-certificate`

**Response** 200 → `result`

- `certificate`: string — The hostname certificate.
- `expires_on`: string — The date when the certificate expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `serial_number`: string — The serial number on the uploaded certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate or the association.
- `uploaded_on`: string — The time when the certificate was uploaded.

## GET /zones/{zone_id}/origin_tls_client_auth/hostnames/certificates/{certificate_id}

Get the Hostname Client Certificate

operationId: `per-hostname-authenticated-origin-pull-get-the-hostname-client-certificate`

**Response** 200 → `result`

- `certificate`: string — The hostname certificate.
- `expires_on`: string — The date when the certificate expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `serial_number`: string — The serial number on the uploaded certificate.
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `initializing`, `pending_deployment`, `pending_deletion`, `active`, `deleted`, `deployment_timed_out`, `deletion_timed_out` — Status of the certificate or the association.
- `uploaded_on`: string — The time when the certificate was uploaded.
