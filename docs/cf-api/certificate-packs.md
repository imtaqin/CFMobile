# Certificate Packs

6 endpoints.

## GET /zones/{zone_id}/ssl/certificate_packs

List Certificate Packs

operationId: `certificate-packs-list-certificate-packs` · query: `page`, `per_page`, `status`, `deploy`

**Response** 200 → `result`

[array of]
- `certificate_authority`: string enum: `google`, `lets_encrypt`, `ssl_com` — Certificate Authority selected for the order.  For information on any certificate authority specific details or restrictions [see this page 
- `certificates`: object[] **required** — Array of certificates in this pack.
  [array of]
  - `bundle_method`: string — Certificate bundle method.
  - `expires_on`: string — When the certificate from the authority expires.
  - `geo_restrictions`: object — Specify the region where your private key can be held locally.
    - `label`: string enum: `us`, `eu`, `highest_security`
  - `hosts`: string[] **required** — Hostnames covered by this certificate.
    [array]
  - `id`: string **required** — Certificate identifier.
  - `issuer`: string — The certificate authority that issued the certificate.
  - `modified_on`: string — When the certificate was last modified.
  - `priority`: number — The order/priority in which the certificate will be used.
  - `signature`: string — The type of hash used for the certificate.
  - `status`: string **required** — Certificate status.
  - `uploaded_on`: string — When the certificate was uploaded to Cloudflare.
  - `zone_id`: string — Identifier.
- `cloudflare_branding`: boolean — Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to tr
- `dcv_delegation_records`: object[] — DCV Delegation records for domain validation.
  [array of]
  - `cname`: string — The CNAME record hostname for DCV delegation.
  - `cname_target`: string — The CNAME record target value for DCV delegation.
  - `emails`: string[] — The set of email addresses that the certificate authority (CA) will use to complete domain validation.
    [array]
  - `http_body`: string — The content that the certificate authority (CA) will expect to find at the http_url during the domain validation.
  - `http_url`: string — The url that will be checked during domain validation.
  - `status`: string — Status of the validation record.
  - `txt_name`: string — The hostname that the certificate authority (CA) will check for a TXT record during domain validation .
  - `txt_value`: string — The TXT record that the certificate authority (CA) will check during domain validation.
- `hosts`: string[] **required** — Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may 
  [array]
- `id`: string **required** — The unique identifier for a certificate_pack.
- `primary_certificate`: string — Identifier of the primary certificate in a pack.
- `status`: string **required** enum: `initializing`, `pending_validation`, `deleted`, `pending_issuance`, `pending_deployment`, `pending_deletion`, `pending_expiration`, `expired` — Status of certificate pack.
- `type`: string **required** enum: `mh_custom`, `managed_hostname`, `sni_custom`, `universal`, `advanced`, `total_tls`, `keyless`, `legacy_custom` — Type of certificate pack.
- `validation_errors`: object[] — Domain validation errors that have been received by the certificate authority (CA).
  [array of]
  - `message`: string — A domain validation error.
- `validation_method`: string enum: `txt`, `http`, `email` — Validation Method selected for the order.
- `validation_records`: object[] — Certificates' validation records.
  [array of]
  - `cname`: string — The CNAME record hostname for DCV delegation.
  - `cname_target`: string — The CNAME record target value for DCV delegation.
  - `emails`: string[] — The set of email addresses that the certificate authority (CA) will use to complete domain validation.
    [array]
  - `http_body`: string — The content that the certificate authority (CA) will expect to find at the http_url during the domain validation.
  - `http_url`: string — The url that will be checked during domain validation.
  - `status`: string — Status of the validation record.
  - `txt_name`: string — The hostname that the certificate authority (CA) will check for a TXT record during domain validation .
  - `txt_value`: string — The TXT record that the certificate authority (CA) will check during domain validation.
- `validity_days`: integer enum: `14`, `30`, `90`, `365` — Validity Days selected for the order.

## DELETE /zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}

Delete Advanced Certificate Manager Certificate Pack

operationId: `certificate-packs-delete-advanced-certificate-manager-certificate-pack`

**Response** 200 → `result`

- `id`: string — The unique identifier for a certificate_pack.

## GET /zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}

Get Certificate Pack

operationId: `certificate-packs-get-certificate-pack`

**Response** 200 → `result`

- `certificate_authority`: string enum: `google`, `lets_encrypt`, `ssl_com` — Certificate Authority selected for the order.  For information on any certificate authority specific details or restrictions [see this page 
- `certificates`: object[] **required** — Array of certificates in this pack.
  [array of]
  - `bundle_method`: string — Certificate bundle method.
  - `expires_on`: string — When the certificate from the authority expires.
  - `geo_restrictions`: object — Specify the region where your private key can be held locally.
    - `label`: string enum: `us`, `eu`, `highest_security`
  - `hosts`: string[] **required** — Hostnames covered by this certificate.
    [array]
  - `id`: string **required** — Certificate identifier.
  - `issuer`: string — The certificate authority that issued the certificate.
  - `modified_on`: string — When the certificate was last modified.
  - `priority`: number — The order/priority in which the certificate will be used.
  - `signature`: string — The type of hash used for the certificate.
  - `status`: string **required** — Certificate status.
  - `uploaded_on`: string — When the certificate was uploaded to Cloudflare.
  - `zone_id`: string — Identifier.
- `cloudflare_branding`: boolean — Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to tr
- `dcv_delegation_records`: object[] — DCV Delegation records for domain validation.
  [array of]
  - `cname`: string — The CNAME record hostname for DCV delegation.
  - `cname_target`: string — The CNAME record target value for DCV delegation.
  - `emails`: string[] — The set of email addresses that the certificate authority (CA) will use to complete domain validation.
    [array]
  - `http_body`: string — The content that the certificate authority (CA) will expect to find at the http_url during the domain validation.
  - `http_url`: string — The url that will be checked during domain validation.
  - `status`: string — Status of the validation record.
  - `txt_name`: string — The hostname that the certificate authority (CA) will check for a TXT record during domain validation .
  - `txt_value`: string — The TXT record that the certificate authority (CA) will check during domain validation.
- `hosts`: string[] **required** — Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may 
  [array]
- `id`: string **required** — The unique identifier for a certificate_pack.
- `primary_certificate`: string — Identifier of the primary certificate in a pack.
- `status`: string **required** enum: `initializing`, `pending_validation`, `deleted`, `pending_issuance`, `pending_deployment`, `pending_deletion`, `pending_expiration`, `expired` — Status of certificate pack.
- `type`: string **required** enum: `mh_custom`, `managed_hostname`, `sni_custom`, `universal`, `advanced`, `total_tls`, `keyless`, `legacy_custom` — Type of certificate pack.
- `validation_errors`: object[] — Domain validation errors that have been received by the certificate authority (CA).
  [array of]
  - `message`: string — A domain validation error.
- `validation_method`: string enum: `txt`, `http`, `email` — Validation Method selected for the order.
- `validation_records`: object[] — Certificates' validation records.
  [array of]
  - `cname`: string — The CNAME record hostname for DCV delegation.
  - `cname_target`: string — The CNAME record target value for DCV delegation.
  - `emails`: string[] — The set of email addresses that the certificate authority (CA) will use to complete domain validation.
    [array]
  - `http_body`: string — The content that the certificate authority (CA) will expect to find at the http_url during the domain validation.
  - `http_url`: string — The url that will be checked during domain validation.
  - `status`: string — Status of the validation record.
  - `txt_name`: string — The hostname that the certificate authority (CA) will check for a TXT record during domain validation .
  - `txt_value`: string — The TXT record that the certificate authority (CA) will check during domain validation.
- `validity_days`: integer enum: `14`, `30`, `90`, `365` — Validity Days selected for the order.

## PATCH /zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}

Restart Validation or Update Advanced Certificate Manager Certificate Pack

operationId: `certificate-packs-restart-validation-for-advanced-certificate-manager-certificate-pack`

**Request** (application/json)

- `cloudflare_branding`: boolean — Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to tr

**Response** 200 → `result`

- `certificate_authority`: string enum: `google`, `lets_encrypt`, `ssl_com` — Certificate Authority selected for the order.  For information on any certificate authority specific details or restrictions [see this page 
- `certificates`: object[] **required** — Array of certificates in this pack.
  [array of]
  - `bundle_method`: string — Certificate bundle method.
  - `expires_on`: string — When the certificate from the authority expires.
  - `geo_restrictions`: object — Specify the region where your private key can be held locally.
    - `label`: string enum: `us`, `eu`, `highest_security`
  - `hosts`: string[] **required** — Hostnames covered by this certificate.
    [array]
  - `id`: string **required** — Certificate identifier.
  - `issuer`: string — The certificate authority that issued the certificate.
  - `modified_on`: string — When the certificate was last modified.
  - `priority`: number — The order/priority in which the certificate will be used.
  - `signature`: string — The type of hash used for the certificate.
  - `status`: string **required** — Certificate status.
  - `uploaded_on`: string — When the certificate was uploaded to Cloudflare.
  - `zone_id`: string — Identifier.
- `cloudflare_branding`: boolean — Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to tr
- `dcv_delegation_records`: object[] — DCV Delegation records for domain validation.
  [array of]
  - `cname`: string — The CNAME record hostname for DCV delegation.
  - `cname_target`: string — The CNAME record target value for DCV delegation.
  - `emails`: string[] — The set of email addresses that the certificate authority (CA) will use to complete domain validation.
    [array]
  - `http_body`: string — The content that the certificate authority (CA) will expect to find at the http_url during the domain validation.
  - `http_url`: string — The url that will be checked during domain validation.
  - `status`: string — Status of the validation record.
  - `txt_name`: string — The hostname that the certificate authority (CA) will check for a TXT record during domain validation .
  - `txt_value`: string — The TXT record that the certificate authority (CA) will check during domain validation.
- `hosts`: string[] **required** — Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may 
  [array]
- `id`: string **required** — The unique identifier for a certificate_pack.
- `primary_certificate`: string — Identifier of the primary certificate in a pack.
- `status`: string **required** enum: `initializing`, `pending_validation`, `deleted`, `pending_issuance`, `pending_deployment`, `pending_deletion`, `pending_expiration`, `expired` — Status of certificate pack.
- `type`: string **required** enum: `mh_custom`, `managed_hostname`, `sni_custom`, `universal`, `advanced`, `total_tls`, `keyless`, `legacy_custom` — Type of certificate pack.
- `validation_errors`: object[] — Domain validation errors that have been received by the certificate authority (CA).
  [array of]
  - `message`: string — A domain validation error.
- `validation_method`: string enum: `txt`, `http`, `email` — Validation Method selected for the order.
- `validation_records`: object[] — Certificates' validation records.
  [array of]
  - `cname`: string — The CNAME record hostname for DCV delegation.
  - `cname_target`: string — The CNAME record target value for DCV delegation.
  - `emails`: string[] — The set of email addresses that the certificate authority (CA) will use to complete domain validation.
    [array]
  - `http_body`: string — The content that the certificate authority (CA) will expect to find at the http_url during the domain validation.
  - `http_url`: string — The url that will be checked during domain validation.
  - `status`: string — Status of the validation record.
  - `txt_name`: string — The hostname that the certificate authority (CA) will check for a TXT record during domain validation .
  - `txt_value`: string — The TXT record that the certificate authority (CA) will check during domain validation.
- `validity_days`: integer enum: `14`, `30`, `90`, `365` — Validity Days selected for the order.

## POST /zones/{zone_id}/ssl/certificate_packs/order

Order Advanced Certificate Manager Certificate Pack

operationId: `certificate-packs-order-advanced-certificate-manager-certificate-pack`

**Request** (application/json)

- `certificate_authority`: string **required** enum: `google`, `lets_encrypt`, `ssl_com` — Certificate Authority selected for the order.  For information on any certificate authority specific details or restrictions [see this page 
- `cloudflare_branding`: boolean — Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to tr
- `hosts`: string[] **required** — Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may 
  [array]
- `type`: string **required** enum: `advanced` — Type of certificate pack.
- `validation_method`: string **required** enum: `txt`, `http`, `email` — Validation Method selected for the order.
- `validity_days`: integer **required** enum: `14`, `30`, `90`, `365` — Validity Days selected for the order.

**Response** 200 → `result`

- `certificate_authority`: string enum: `google`, `lets_encrypt`, `ssl_com` — Certificate Authority selected for the order.  For information on any certificate authority specific details or restrictions [see this page 
- `hosts`: string[] **required** — Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may 
  [array]
- `id`: string **required** — The unique identifier for a certificate_pack.
- `status`: string **required** enum: `initializing`, `pending_validation`, `deleted`, `pending_issuance`, `pending_deployment`, `pending_deletion`, `pending_expiration`, `expired` — Status of certificate pack.
- `type`: string **required** enum: `mh_custom`, `managed_hostname`, `sni_custom`, `universal`, `advanced`, `total_tls`, `keyless`, `legacy_custom` — Type of certificate pack.
- `validation_method`: string enum: `txt`, `http`, `email` — Validation Method selected for the order.
- `validity_days`: integer enum: `14`, `30`, `90`, `365` — Validity Days selected for the order.

## GET /zones/{zone_id}/ssl/certificate_packs/quota

Get Certificate Pack Quotas

operationId: `certificate-packs-get-certificate-pack-quotas`

**Response** 200 → `result`

- `advanced`: object
  - `allocated`: integer — Quantity Allocated.
  - `used`: integer — Quantity Used.
