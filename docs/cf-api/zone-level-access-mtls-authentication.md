# Zone-Level Access mTLS authentication

7 endpoints.

## GET /zones/{zone_id}/access/certificates

List mTLS certificates

operationId: `zone-level-access-mtls-authentication-list-mtls-certificates`

**Response** 200 → `result`

[array of]
- `associated_hostnames`: string[] — The hostnames of the applications that will use this certificate.
  [array]
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — The MD5 fingerprint of the certificate.
- `id`: string — The ID of the application that will use this certificate.
- `name`: string — The name of the certificate.
- `updated_at`: string

## POST /zones/{zone_id}/access/certificates

Add an mTLS certificate

operationId: `zone-level-access-mtls-authentication-add-an-mtls-certificate`

**Request** (application/json)

- `associated_hostnames`: string[] — The hostnames of the applications that will use this certificate.
  [array]
- `certificate`: string **required** — The certificate content.
- `name`: string **required** — The name of the certificate.

**Response** 201 → `result`

- `associated_hostnames`: string[] — The hostnames of the applications that will use this certificate.
  [array]
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — The MD5 fingerprint of the certificate.
- `id`: string — The ID of the application that will use this certificate.
- `name`: string — The name of the certificate.
- `updated_at`: string

## DELETE /zones/{zone_id}/access/certificates/{certificate_id}

Delete an mTLS certificate

operationId: `zone-level-access-mtls-authentication-delete-an-mtls-certificate`

**Response** 200 → `result`

- `id`: string — UUID.

## GET /zones/{zone_id}/access/certificates/{certificate_id}

Get an mTLS certificate

operationId: `zone-level-access-mtls-authentication-get-an-mtls-certificate`

**Response** 200 → `result`

- `associated_hostnames`: string[] — The hostnames of the applications that will use this certificate.
  [array]
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — The MD5 fingerprint of the certificate.
- `id`: string — The ID of the application that will use this certificate.
- `name`: string — The name of the certificate.
- `updated_at`: string

## PUT /zones/{zone_id}/access/certificates/{certificate_id}

Update an mTLS certificate

operationId: `zone-level-access-mtls-authentication-update-an-mtls-certificate`

**Request** (application/json)

- `associated_hostnames`: string[] **required** — The hostnames of the applications that will use this certificate.
  [array]
- `name`: string — The name of the certificate.

**Response** 200 → `result`

- `associated_hostnames`: string[] — The hostnames of the applications that will use this certificate.
  [array]
- `created_at`: string
- `expires_on`: string
- `fingerprint`: string — The MD5 fingerprint of the certificate.
- `id`: string — The ID of the application that will use this certificate.
- `name`: string — The name of the certificate.
- `updated_at`: string

## GET /zones/{zone_id}/access/certificates/settings

List all mTLS hostname settings

operationId: `zone-level-access-mtls-authentication-list-mtls-certificates-hostname-settings`

**Response** 200 → `result`

[array of]
- `china_network`: boolean **required** — Request client certificates for this hostname in China. Can only be set to true if this zone is china network enabled.
- `client_certificate_forwarding`: boolean **required** — Client Certificate Forwarding is a feature that takes the client cert provided by the eyeball to the edge, and forwards it to the origin as 
- `hostname`: string **required** — The hostname that these settings apply to.

## PUT /zones/{zone_id}/access/certificates/settings

Update an mTLS certificate's hostname settings

operationId: `zone-level-access-mtls-authentication-update-an-mtls-certificate-settings`

**Request** (application/json)

- `settings`: object[] **required**
  [array of]
  - `china_network`: boolean **required** — Request client certificates for this hostname in China. Can only be set to true if this zone is china network enabled.
  - `client_certificate_forwarding`: boolean **required** — Client Certificate Forwarding is a feature that takes the client cert provided by the eyeball to the edge, and forwards it to the origin as 
  - `hostname`: string **required** — The hostname that these settings apply to.

**Response** 202 → `result`

[array of]
- `china_network`: boolean **required** — Request client certificates for this hostname in China. Can only be set to true if this zone is china network enabled.
- `client_certificate_forwarding`: boolean **required** — Client Certificate Forwarding is a feature that takes the client cert provided by the eyeball to the edge, and forwards it to the origin as 
- `hostname`: string **required** — The hostname that these settings apply to.
