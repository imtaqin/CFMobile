# mTLS Certificate Management

5 endpoints.

## GET /accounts/{account_id}/mtls_certificates

List mTLS certificates

operationId: `m-tls-certificate-management-list-m-tls-certificates` · query: `type`

**Response** 200 → `result`

[array of]
- `ca`: boolean — Indicates whether the certificate is a CA or leaf certificate.
- `certificates`: string — The uploaded root CA certificate.
- `expires_on`: string — When the certificate expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `name`: string — Optional unique name for the certificate. Only used for human readability.
- `serial_number`: string — The certificate serial number.
- `signature`: string — The type of hash used for the certificate.
- `type`: string enum: `custom`, `gateway_managed`, `access_managed` — The type of the certificate, indicating how it was created and who manages it.
- `uploaded_on`: string — This is the time the certificate was uploaded.

## POST /accounts/{account_id}/mtls_certificates

Upload mTLS certificate

operationId: `m-tls-certificate-management-upload-m-tls-certificate`

**Request** (application/json)

- `ca`: boolean **required** — Indicates whether the certificate is a CA or leaf certificate.
- `certificates`: string **required** — The uploaded root CA certificate.
- `name`: string — Optional unique name for the certificate. Only used for human readability.
- `private_key`: string — The private key for the certificate. This field is only needed for specific use cases such as using a custom certificate with Zero Trust's b

**Response** 200 → `result`

- `ca`: boolean — Indicates whether the certificate is a CA or leaf certificate.
- `certificates`: string — The uploaded root CA certificate.
- `expires_on`: string — When the certificate expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `name`: string — Optional unique name for the certificate. Only used for human readability.
- `serial_number`: string — The certificate serial number.
- `signature`: string — The type of hash used for the certificate.
- `type`: string enum: `custom`, `gateway_managed`, `access_managed` — The type of the certificate, indicating how it was created and who manages it.
- `updated_at`: string — This is the time the certificate was updated.
- `uploaded_on`: string — This is the time the certificate was uploaded.

## DELETE /accounts/{account_id}/mtls_certificates/{mtls_certificate_id}

Delete mTLS certificate

operationId: `m-tls-certificate-management-delete-m-tls-certificate`

**Response** 200 → `result`

- `ca`: boolean — Indicates whether the certificate is a CA or leaf certificate.
- `certificates`: string — The uploaded root CA certificate.
- `expires_on`: string — When the certificate expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `name`: string — Optional unique name for the certificate. Only used for human readability.
- `serial_number`: string — The certificate serial number.
- `signature`: string — The type of hash used for the certificate.
- `type`: string enum: `custom`, `gateway_managed`, `access_managed` — The type of the certificate, indicating how it was created and who manages it.
- `uploaded_on`: string — This is the time the certificate was uploaded.

## GET /accounts/{account_id}/mtls_certificates/{mtls_certificate_id}

Get mTLS certificate

operationId: `m-tls-certificate-management-get-m-tls-certificate`

**Response** 200 → `result`

- `ca`: boolean — Indicates whether the certificate is a CA or leaf certificate.
- `certificates`: string — The uploaded root CA certificate.
- `expires_on`: string — When the certificate expires.
- `id`: string — Certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `name`: string — Optional unique name for the certificate. Only used for human readability.
- `serial_number`: string — The certificate serial number.
- `signature`: string — The type of hash used for the certificate.
- `type`: string enum: `custom`, `gateway_managed`, `access_managed` — The type of the certificate, indicating how it was created and who manages it.
- `uploaded_on`: string — This is the time the certificate was uploaded.

## GET /accounts/{account_id}/mtls_certificates/{mtls_certificate_id}/associations

List mTLS certificate associations

operationId: `m-tls-certificate-management-list-m-tls-certificate-associations`

**Response** 200 → `result`

[array of]
- `service`: string — The service using the certificate.
- `status`: string — Certificate deployment status for the given service.
