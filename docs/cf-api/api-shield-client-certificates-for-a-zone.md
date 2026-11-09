# API Shield Client Certificates for a Zone

7 endpoints.

## GET /zones/{zone_id}/certificate_authorities/hostname_associations

List Hostname Associations

operationId: `client-certificate-for-a-zone-list-hostname-associations` · query: `mtls_certificate_id`

**Response** 200 → `result`

- `hostnames`: string[] — Hostnames are returned in lowercase punycode, in no particular order. Null when there are no associations.
  [array]

## PUT /zones/{zone_id}/certificate_authorities/hostname_associations

Replace Hostname Associations

operationId: `client-certificate-for-a-zone-put-hostname-associations`

**Request** (application/json)

- `hostnames`: string[] — Unordered set of hostnames. Hostnames are stored as lowercase punycode.
  [array]
- `mtls_certificate_id`: string — The UUID for a certificate that was uploaded to the mTLS Certificate Management endpoint. If no mtls_certificate_id is given, the hostnames 

**Response** 200 → `result`

- `hostnames`: string[] — Hostnames are returned in lowercase punycode, in no particular order. Null when there are no associations.
  [array]

## GET /zones/{zone_id}/client_certificates

List Client Certificates

operationId: `client-certificate-for-a-zone-list-client-certificates` · query: `status`, `page`, `per_page`, `limit`, `offset`

**Response** 200 → `result`

[array of]
- `certificate`: string — The Client Certificate PEM.
- `certificate_authority`: object — Certificate Authority used to issue the Client Certificate.
  - `id`: string
  - `name`: string
- `common_name`: string — Common Name of the Client Certificate.
- `country`: string — Country, provided by the CSR.
- `csr`: string — The Certificate Signing Request (CSR). Must be newline-encoded.
- `expires_on`: string — Date that the Client Certificate expires.
- `fingerprint_sha256`: string — Unique identifier of the Client Certificate.
- `id`: string — Client Certificate Tag
- `issued_on`: string — Date that the Client Certificate was issued by the Certificate Authority.
- `location`: string — Location, provided by the CSR.
- `organization`: string — Organization, provided by the CSR.
- `organizational_unit`: string — Organizational Unit, provided by the CSR.
- `serial_number`: string — The serial number on the created Client Certificate.
- `signature`: string — The type of hash used for the Client Certificate..
- `ski`: string — Subject Key Identifier.
- `state`: string — State, provided by the CSR.
- `status`: string enum: `active`, `pending_reactivation`, `pending_revocation`, `revoked` — Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transiti
- `validity_days`: integer — The number of days the Client Certificate will be valid after the issued_on date.

## POST /zones/{zone_id}/client_certificates

Create Client Certificate

operationId: `client-certificate-for-a-zone-create-client-certificate`

**Request** (application/json)

- `csr`: string **required** — The Certificate Signing Request (CSR). Must be newline-encoded.
- `validity_days`: integer **required** — The number of days the Client Certificate will be valid after the issued_on date.

**Response** 200 → `result`

- `certificate`: string — The Client Certificate PEM.
- `certificate_authority`: object — Certificate Authority used to issue the Client Certificate.
  - `id`: string
  - `name`: string
- `common_name`: string — Common Name of the Client Certificate.
- `country`: string — Country, provided by the CSR.
- `csr`: string — The Certificate Signing Request (CSR). Must be newline-encoded.
- `expires_on`: string — Date that the Client Certificate expires.
- `fingerprint_sha256`: string — Unique identifier of the Client Certificate.
- `id`: string — Client Certificate Tag
- `issued_on`: string — Date that the Client Certificate was issued by the Certificate Authority.
- `location`: string — Location, provided by the CSR.
- `organization`: string — Organization, provided by the CSR.
- `organizational_unit`: string — Organizational Unit, provided by the CSR.
- `serial_number`: string — The serial number on the created Client Certificate.
- `signature`: string — The type of hash used for the Client Certificate..
- `ski`: string — Subject Key Identifier.
- `state`: string — State, provided by the CSR.
- `status`: string enum: `active`, `pending_reactivation`, `pending_revocation`, `revoked` — Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transiti
- `validity_days`: integer — The number of days the Client Certificate will be valid after the issued_on date.

## DELETE /zones/{zone_id}/client_certificates/{client_certificate_id}

Revoke Client Certificate

operationId: `client-certificate-for-a-zone-delete-client-certificate`

**Response** 200 → `result`

- `certificate`: string — The Client Certificate PEM.
- `certificate_authority`: object — Certificate Authority used to issue the Client Certificate.
  - `id`: string
  - `name`: string
- `common_name`: string — Common Name of the Client Certificate.
- `country`: string — Country, provided by the CSR.
- `csr`: string — The Certificate Signing Request (CSR). Must be newline-encoded.
- `expires_on`: string — Date that the Client Certificate expires.
- `fingerprint_sha256`: string — Unique identifier of the Client Certificate.
- `id`: string — Client Certificate Tag
- `issued_on`: string — Date that the Client Certificate was issued by the Certificate Authority.
- `location`: string — Location, provided by the CSR.
- `organization`: string — Organization, provided by the CSR.
- `organizational_unit`: string — Organizational Unit, provided by the CSR.
- `serial_number`: string — The serial number on the created Client Certificate.
- `signature`: string — The type of hash used for the Client Certificate..
- `ski`: string — Subject Key Identifier.
- `state`: string — State, provided by the CSR.
- `status`: string enum: `active`, `pending_reactivation`, `pending_revocation`, `revoked` — Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transiti
- `validity_days`: integer — The number of days the Client Certificate will be valid after the issued_on date.

## GET /zones/{zone_id}/client_certificates/{client_certificate_id}

Client Certificate Details

operationId: `client-certificate-for-a-zone-client-certificate-details`

**Response** 200 → `result`

- `certificate`: string — The Client Certificate PEM.
- `certificate_authority`: object — Certificate Authority used to issue the Client Certificate.
  - `id`: string
  - `name`: string
- `common_name`: string — Common Name of the Client Certificate.
- `country`: string — Country, provided by the CSR.
- `csr`: string — The Certificate Signing Request (CSR). Must be newline-encoded.
- `expires_on`: string — Date that the Client Certificate expires.
- `fingerprint_sha256`: string — Unique identifier of the Client Certificate.
- `id`: string — Client Certificate Tag
- `issued_on`: string — Date that the Client Certificate was issued by the Certificate Authority.
- `location`: string — Location, provided by the CSR.
- `organization`: string — Organization, provided by the CSR.
- `organizational_unit`: string — Organizational Unit, provided by the CSR.
- `serial_number`: string — The serial number on the created Client Certificate.
- `signature`: string — The type of hash used for the Client Certificate..
- `ski`: string — Subject Key Identifier.
- `state`: string — State, provided by the CSR.
- `status`: string enum: `active`, `pending_reactivation`, `pending_revocation`, `revoked` — Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transiti
- `validity_days`: integer — The number of days the Client Certificate will be valid after the issued_on date.

## PATCH /zones/{zone_id}/client_certificates/{client_certificate_id}

Reactivate Client Certificate

operationId: `client-certificate-for-a-zone-edit-client-certificate`

**Request** (application/json)

- `reactivate`: boolean

**Response** 200 → `result`

- `certificate`: string — The Client Certificate PEM.
- `certificate_authority`: object — Certificate Authority used to issue the Client Certificate.
  - `id`: string
  - `name`: string
- `common_name`: string — Common Name of the Client Certificate.
- `country`: string — Country, provided by the CSR.
- `csr`: string — The Certificate Signing Request (CSR). Must be newline-encoded.
- `expires_on`: string — Date that the Client Certificate expires.
- `fingerprint_sha256`: string — Unique identifier of the Client Certificate.
- `id`: string — Client Certificate Tag
- `issued_on`: string — Date that the Client Certificate was issued by the Certificate Authority.
- `location`: string — Location, provided by the CSR.
- `organization`: string — Organization, provided by the CSR.
- `organizational_unit`: string — Organizational Unit, provided by the CSR.
- `serial_number`: string — The serial number on the created Client Certificate.
- `signature`: string — The type of hash used for the Client Certificate..
- `ski`: string — Subject Key Identifier.
- `state`: string — State, provided by the CSR.
- `status`: string enum: `active`, `pending_reactivation`, `pending_revocation`, `revoked` — Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transiti
- `validity_days`: integer — The number of days the Client Certificate will be valid after the issued_on date.
