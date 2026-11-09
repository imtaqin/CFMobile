# Zero Trust certificates

6 endpoints.

## GET /accounts/{account_id}/gateway/certificates

List Zero Trust certificates

operationId: `zero-trust-certificates-list-zero-trust-certificates`

**Response** 200 → `result`

[array of]
- `binding_status`: string enum: `pending_deployment`, `available`, `pending_deletion`, `inactive` — Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'avai
- `certificate`: string — Provide the CA certificate (read-only).
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — Provide the SHA256 fingerprint of the certificate (read-only).
- `id`: string — Identify the certificate with a UUID.
- `in_use`: boolean — Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, 
- `issuer_org`: string — Indicate the organization that issued the certificate (read-only).
- `issuer_raw`: string — Provide the entire issuer field of the certificate (read-only).
- `region`: string — Indicate the read-only region the certificate authority's key material is pinned to. Omitted for certificates that were created without a re
- `type`: string enum: `custom`, `gateway_managed` — Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.
- `updated_at`: string
- `uploaded_on`: string

## POST /accounts/{account_id}/gateway/certificates

Create Zero Trust certificate

operationId: `zero-trust-certificates-create-zero-trust-certificate`

**Request** (application/json)

- `validity_period_days`: integer — Sets the certificate validity period in days (range: 1-10,950 days / ~30 years). Defaults to 1,825 days (5 years). **Important**: This field

**Response** 200 → `result`

- `binding_status`: string enum: `pending_deployment`, `available`, `pending_deletion`, `inactive` — Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'avai
- `certificate`: string — Provide the CA certificate (read-only).
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — Provide the SHA256 fingerprint of the certificate (read-only).
- `id`: string — Identify the certificate with a UUID.
- `in_use`: boolean — Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, 
- `issuer_org`: string — Indicate the organization that issued the certificate (read-only).
- `issuer_raw`: string — Provide the entire issuer field of the certificate (read-only).
- `region`: string — Indicate the read-only region the certificate authority's key material is pinned to. Omitted for certificates that were created without a re
- `type`: string enum: `custom`, `gateway_managed` — Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.
- `updated_at`: string
- `uploaded_on`: string

## DELETE /accounts/{account_id}/gateway/certificates/{certificate_id}

Delete Zero Trust certificate

operationId: `zero-trust-certificates-delete-zero-trust-certificate`

**Response** 200 → `result`

- `binding_status`: string enum: `pending_deployment`, `available`, `pending_deletion`, `inactive` — Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'avai
- `certificate`: string — Provide the CA certificate (read-only).
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — Provide the SHA256 fingerprint of the certificate (read-only).
- `id`: string — Identify the certificate with a UUID.
- `in_use`: boolean — Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, 
- `issuer_org`: string — Indicate the organization that issued the certificate (read-only).
- `issuer_raw`: string — Provide the entire issuer field of the certificate (read-only).
- `region`: string — Indicate the read-only region the certificate authority's key material is pinned to. Omitted for certificates that were created without a re
- `type`: string enum: `custom`, `gateway_managed` — Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.
- `updated_at`: string
- `uploaded_on`: string

## GET /accounts/{account_id}/gateway/certificates/{certificate_id}

Get Zero Trust certificate details

operationId: `zero-trust-certificates-zero-trust-certificate-details`

**Response** 200 → `result`

- `binding_status`: string enum: `pending_deployment`, `available`, `pending_deletion`, `inactive` — Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'avai
- `certificate`: string — Provide the CA certificate (read-only).
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — Provide the SHA256 fingerprint of the certificate (read-only).
- `id`: string — Identify the certificate with a UUID.
- `in_use`: boolean — Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, 
- `issuer_org`: string — Indicate the organization that issued the certificate (read-only).
- `issuer_raw`: string — Provide the entire issuer field of the certificate (read-only).
- `region`: string — Indicate the read-only region the certificate authority's key material is pinned to. Omitted for certificates that were created without a re
- `type`: string enum: `custom`, `gateway_managed` — Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.
- `updated_at`: string
- `uploaded_on`: string

## POST /accounts/{account_id}/gateway/certificates/{certificate_id}/activate

Activate a Zero Trust certificate

operationId: `zero-trust-certificates-activate-zero-trust-certificate`

**Response** 202 → `result`

- `binding_status`: string enum: `pending_deployment`, `available`, `pending_deletion`, `inactive` — Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'avai
- `certificate`: string — Provide the CA certificate (read-only).
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — Provide the SHA256 fingerprint of the certificate (read-only).
- `id`: string — Identify the certificate with a UUID.
- `in_use`: boolean — Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, 
- `issuer_org`: string — Indicate the organization that issued the certificate (read-only).
- `issuer_raw`: string — Provide the entire issuer field of the certificate (read-only).
- `region`: string — Indicate the read-only region the certificate authority's key material is pinned to. Omitted for certificates that were created without a re
- `type`: string enum: `custom`, `gateway_managed` — Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.
- `updated_at`: string
- `uploaded_on`: string

## POST /accounts/{account_id}/gateway/certificates/{certificate_id}/deactivate

Deactivate a Zero Trust certificate

operationId: `zero-trust-certificates-deactivate-zero-trust-certificate`

**Response** 201 → `result`

- `binding_status`: string enum: `pending_deployment`, `available`, `pending_deletion`, `inactive` — Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'avai
- `certificate`: string — Provide the CA certificate (read-only).
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — Provide the SHA256 fingerprint of the certificate (read-only).
- `id`: string — Identify the certificate with a UUID.
- `in_use`: boolean — Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, 
- `issuer_org`: string — Indicate the organization that issued the certificate (read-only).
- `issuer_raw`: string — Provide the entire issuer field of the certificate (read-only).
- `region`: string — Indicate the read-only region the certificate authority's key material is pinned to. Omitted for certificates that were created without a re
- `type`: string enum: `custom`, `gateway_managed` — Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.
- `updated_at`: string
- `uploaded_on`: string
