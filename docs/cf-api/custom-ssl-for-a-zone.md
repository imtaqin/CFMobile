# Custom SSL for a Zone

6 endpoints.

## GET /zones/{zone_id}/custom_certificates

List SSL Configurations

operationId: `custom-ssl-for-a-zone-list-ssl-configurations` · query: `page`, `per_page`, `match`, `status`

**Response** 200 → `result`

[array of]
- `bundle_method`: string enum: `ubiquitous`, `optimal`, `force` default: `ubiquitous` — A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An opt
- `custom_csr_id`: string — The identifier for the Custom CSR that was used.
- `expires_on`: string — When the certificate from the authority expires.
- `geo_restrictions`: object — Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center wil
  - `label`: string enum: `us`, `eu`, `highest_security`
- `hosts`: string[]
  [array]
- `id`: string **required** — Custom certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `keyless_server`: object
- `modified_on`: string — When the certificate was last modified.
- `policy_restrictions`: string — The policy restrictions returned by the API. This field is returned in responses
- `priority`: number — The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `active`, `expired`, `deleted`, `pending`, `initializing` — Status of the zone's custom SSL.
- `uploaded_on`: string — When the certificate was uploaded to Cloudflare.
- `zone_id`: string **required** — Identifier.

## POST /zones/{zone_id}/custom_certificates

Create SSL Configuration

operationId: `custom-ssl-for-a-zone-create-ssl-configuration`

**Request** (application/json)

- `bundle_method`: string enum: `ubiquitous`, `optimal`, `force` default: `ubiquitous` — A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An opt
- `certificate`: string **required** — The zone's SSL certificate or certificate and the intermediate(s).
- `custom_csr_id`: string — The identifier for the Custom CSR that was used.
- `deploy`: string enum: `staging`, `production` default: `production` — The environment to deploy the certificate to, defaults to production.
- `geo_restrictions`: object — Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center wil
  - `label`: string enum: `us`, `eu`, `highest_security`
- `policy`: string — Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center wil
- `private_key`: string — The zone's private key. Not required if custom_csr_id is provided, in which case the private key is retrieved from the CSR record held by Cl
- `type`: string enum: `legacy_custom`, `sni_custom` default: `legacy_custom` — The type 'legacy_custom' enables support for legacy clients which do not include SNI in the TLS handshake.

**Response** 200 → `result`

- `bundle_method`: string enum: `ubiquitous`, `optimal`, `force` default: `ubiquitous` — A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An opt
- `custom_csr_id`: string — The identifier for the Custom CSR that was used.
- `expires_on`: string — When the certificate from the authority expires.
- `geo_restrictions`: object — Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center wil
  - `label`: string enum: `us`, `eu`, `highest_security`
- `hosts`: string[]
  [array]
- `id`: string **required** — Custom certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `keyless_server`: object
- `modified_on`: string — When the certificate was last modified.
- `policy_restrictions`: string — The policy restrictions returned by the API. This field is returned in responses
- `priority`: number — The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `active`, `expired`, `deleted`, `pending`, `initializing` — Status of the zone's custom SSL.
- `uploaded_on`: string — When the certificate was uploaded to Cloudflare.
- `zone_id`: string **required** — Identifier.

## DELETE /zones/{zone_id}/custom_certificates/{custom_certificate_id}

Delete SSL Configuration

operationId: `custom-ssl-for-a-zone-delete-ssl-configuration`

**Response** 200 → `result`

- `id`: string — Custom certificate identifier tag.

## GET /zones/{zone_id}/custom_certificates/{custom_certificate_id}

SSL Configuration Details

operationId: `custom-ssl-for-a-zone-ssl-configuration-details`

**Response** 200 → `result`

- `bundle_method`: string enum: `ubiquitous`, `optimal`, `force` default: `ubiquitous` — A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An opt
- `custom_csr_id`: string — The identifier for the Custom CSR that was used.
- `expires_on`: string — When the certificate from the authority expires.
- `geo_restrictions`: object — Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center wil
  - `label`: string enum: `us`, `eu`, `highest_security`
- `hosts`: string[]
  [array]
- `id`: string **required** — Custom certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `keyless_server`: object
- `modified_on`: string — When the certificate was last modified.
- `policy_restrictions`: string — The policy restrictions returned by the API. This field is returned in responses
- `priority`: number — The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `active`, `expired`, `deleted`, `pending`, `initializing` — Status of the zone's custom SSL.
- `uploaded_on`: string — When the certificate was uploaded to Cloudflare.
- `zone_id`: string **required** — Identifier.

## PATCH /zones/{zone_id}/custom_certificates/{custom_certificate_id}

Edit SSL Configuration

operationId: `custom-ssl-for-a-zone-edit-ssl-configuration`

**Request** (application/json)

- `bundle_method`: string enum: `ubiquitous`, `optimal`, `force` default: `ubiquitous` — A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An opt
- `certificate`: string — The zone's SSL certificate or certificate and the intermediate(s).
- `custom_csr_id`: string — The identifier for the Custom CSR that was used.
- `deploy`: string enum: `staging`, `production` default: `production` — The environment to deploy the certificate to, defaults to production.
- `geo_restrictions`: object — Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center wil
  - `label`: string enum: `us`, `eu`, `highest_security`
- `policy`: string — Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center wil
- `private_key`: string — The zone's private key. Not required if custom_csr_id is provided, in which case the private key is retrieved from the CSR record held by Cl

**Response** 200 → `result`

- `bundle_method`: string enum: `ubiquitous`, `optimal`, `force` default: `ubiquitous` — A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An opt
- `custom_csr_id`: string — The identifier for the Custom CSR that was used.
- `expires_on`: string — When the certificate from the authority expires.
- `geo_restrictions`: object — Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center wil
  - `label`: string enum: `us`, `eu`, `highest_security`
- `hosts`: string[]
  [array]
- `id`: string **required** — Custom certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `keyless_server`: object
- `modified_on`: string — When the certificate was last modified.
- `policy_restrictions`: string — The policy restrictions returned by the API. This field is returned in responses
- `priority`: number — The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `active`, `expired`, `deleted`, `pending`, `initializing` — Status of the zone's custom SSL.
- `uploaded_on`: string — When the certificate was uploaded to Cloudflare.
- `zone_id`: string **required** — Identifier.

## PUT /zones/{zone_id}/custom_certificates/prioritize

Re-prioritize SSL Certificates

operationId: `custom-ssl-for-a-zone-re-prioritize-ssl-certificates`

**Request** (application/json)

- `certificates`: object[] **required** — Array of ordered certificates.
  [array of]
  - `id`: string — Custom certificate identifier tag.
  - `priority`: number — The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom

**Response** 200 → `result`

[array of]
- `bundle_method`: string enum: `ubiquitous`, `optimal`, `force` default: `ubiquitous` — A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An opt
- `custom_csr_id`: string — The identifier for the Custom CSR that was used.
- `expires_on`: string — When the certificate from the authority expires.
- `geo_restrictions`: object — Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center wil
  - `label`: string enum: `us`, `eu`, `highest_security`
- `hosts`: string[]
  [array]
- `id`: string **required** — Custom certificate identifier tag.
- `issuer`: string — The certificate authority that issued the certificate.
- `keyless_server`: object
- `modified_on`: string — When the certificate was last modified.
- `policy_restrictions`: string — The policy restrictions returned by the API. This field is returned in responses
- `priority`: number — The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom
- `signature`: string — The type of hash used for the certificate.
- `status`: string enum: `active`, `expired`, `deleted`, `pending`, `initializing` — Status of the zone's custom SSL.
- `uploaded_on`: string — When the certificate was uploaded to Cloudflare.
- `zone_id`: string **required** — Identifier.
