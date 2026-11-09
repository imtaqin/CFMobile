# Custom Hostname for a Zone

8 endpoints.

## GET /zones/{zone_id}/custom_hostnames

List Custom Hostnames

operationId: `custom-hostname-for-a-zone-list-custom-hostnames` · query: `hostname`, `hostname.exact`, `hostname.startsWith`, `hostname.contain`, `id`, `page`, `per_page`, `order`, `direction`, `ssl_status`, `hostname_status`, `certificate_authority`, `wildcard`, `custom_origin_server`, `ssl`

**Response** 200 → `result`

[array of]
- `created_at`: string — This is the time the hostname was created.
- `custom_metadata`: object — Unique key/value metadata for this hostname. These are per-hostname (customer) settings.
- `custom_origin_server`: string — a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.
- `custom_origin_sni`: string — A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom orig
- `hostname`: string — The custom hostname that will point to your hostname via CNAME.
- `id`: string — Custom hostname identifier tag.
- `ownership_verification`: object — This is a record which can be placed to activate a hostname.
- `ownership_verification_http`: object — This presents the token to be served by the given http url to activate a hostname.
- `ssl`: object — SSL properties for the custom hostname.
- `status`: string enum: `active`, `pending`, `active_redeploying`, `moved`, `pending_deletion`, `deleted`, `pending_blocked`, `pending_migration` — Status of the hostname's activation.
- `verification_errors`: string[] — These are errors that were encountered while trying to activate a hostname.
  [array]

## POST /zones/{zone_id}/custom_hostnames

Create Custom Hostname

operationId: `custom-hostname-for-a-zone-create-custom-hostname`

**Request** (application/json)

- `custom_metadata`: object — Unique key/value metadata for this hostname. These are per-hostname (customer) settings.
- `custom_origin_server`: string — a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.
- `custom_origin_sni`: string — A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom orig
- `hostname`: string **required** — The custom hostname that will point to your hostname via CNAME.
- `ssl`: object — SSL properties used when creating the custom hostname.

**Response** 200 → `result`

- `created_at`: string — This is the time the hostname was created.
- `custom_metadata`: object — Unique key/value metadata for this hostname. These are per-hostname (customer) settings.
- `custom_origin_server`: string — a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.
- `custom_origin_sni`: string — A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom orig
- `hostname`: string — The custom hostname that will point to your hostname via CNAME.
- `id`: string — Custom hostname identifier tag.
- `ownership_verification`: object — This is a record which can be placed to activate a hostname.
- `ownership_verification_http`: object — This presents the token to be served by the given http url to activate a hostname.
- `ssl`: object — SSL properties for the custom hostname.
- `status`: string enum: `active`, `pending`, `active_redeploying`, `moved`, `pending_deletion`, `deleted`, `pending_blocked`, `pending_migration` — Status of the hostname's activation.
- `verification_errors`: string[] — These are errors that were encountered while trying to activate a hostname.
  [array]

## DELETE /zones/{zone_id}/custom_hostnames/{custom_hostname_id}

Delete Custom Hostname (and any issued SSL certificates)

operationId: `custom-hostname-for-a-zone-delete-custom-hostname-(-and-any-issued-ssl-certificates)`

**Response** 200 → `result`

- `id`: string — Custom hostname identifier tag.

## GET /zones/{zone_id}/custom_hostnames/{custom_hostname_id}

Custom Hostname Details

operationId: `custom-hostname-for-a-zone-custom-hostname-details`

**Response** 200 → `result`

- `created_at`: string — This is the time the hostname was created.
- `custom_metadata`: object — Unique key/value metadata for this hostname. These are per-hostname (customer) settings.
- `custom_origin_server`: string — a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.
- `custom_origin_sni`: string — A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom orig
- `hostname`: string — The custom hostname that will point to your hostname via CNAME.
- `id`: string — Custom hostname identifier tag.
- `ownership_verification`: object — This is a record which can be placed to activate a hostname.
- `ownership_verification_http`: object — This presents the token to be served by the given http url to activate a hostname.
- `ssl`: object — SSL properties for the custom hostname.
- `status`: string enum: `active`, `pending`, `active_redeploying`, `moved`, `pending_deletion`, `deleted`, `pending_blocked`, `pending_migration` — Status of the hostname's activation.
- `verification_errors`: string[] — These are errors that were encountered while trying to activate a hostname.
  [array]

## PATCH /zones/{zone_id}/custom_hostnames/{custom_hostname_id}

Edit Custom Hostname

operationId: `custom-hostname-for-a-zone-edit-custom-hostname`

**Request** (application/json)

- `custom_metadata`: object — Unique key/value metadata for this hostname. These are per-hostname (customer) settings.
- `custom_origin_server`: string — a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.
- `custom_origin_sni`: string — A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom orig
- `ssl`: object — SSL properties used when creating the custom hostname.

**Response** 200 → `result`

- `created_at`: string — This is the time the hostname was created.
- `custom_metadata`: object — Unique key/value metadata for this hostname. These are per-hostname (customer) settings.
- `custom_origin_server`: string — a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.
- `custom_origin_sni`: string — A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom orig
- `hostname`: string — The custom hostname that will point to your hostname via CNAME.
- `id`: string — Custom hostname identifier tag.
- `ownership_verification`: object — This is a record which can be placed to activate a hostname.
- `ownership_verification_http`: object — This presents the token to be served by the given http url to activate a hostname.
- `ssl`: object — SSL properties for the custom hostname.
- `status`: string enum: `active`, `pending`, `active_redeploying`, `moved`, `pending_deletion`, `deleted`, `pending_blocked`, `pending_migration` — Status of the hostname's activation.
- `verification_errors`: string[] — These are errors that were encountered while trying to activate a hostname.
  [array]

## DELETE /zones/{zone_id}/custom_hostnames/{custom_hostname_id}/certificate_pack/{certificate_pack_id}/certificates/{certificate_id}

Delete Single Certificate And Key For Custom Hostname

operationId: `custom-hostname-for-a-zone-delete_single_certificate_and_key_in_a_custom_hostname`

**Response** 202 → `result`

- `id`: string — Custom hostname identifier tag.

## PUT /zones/{zone_id}/custom_hostnames/{custom_hostname_id}/certificate_pack/{certificate_pack_id}/certificates/{certificate_id}

Replace Custom Certificate and Custom Key In Custom Hostname

operationId: `custom-hostname-for-a-zone-edit-custom-certificate-custom-hostname`

**Request** (application/json)

- `custom_certificate`: string **required** — If a custom uploaded certificate is used.
- `custom_key`: string **required** — The key for a custom uploaded certificate.

**Response** 202 → `result`

- `created_at`: string — This is the time the hostname was created.
- `custom_metadata`: object — Unique key/value metadata for this hostname. These are per-hostname (customer) settings.
- `custom_origin_server`: string — a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.
- `custom_origin_sni`: string — A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom orig
- `hostname`: string — The custom hostname that will point to your hostname via CNAME.
- `id`: string — Custom hostname identifier tag.
- `ownership_verification`: object — This is a record which can be placed to activate a hostname.
- `ownership_verification_http`: object — This presents the token to be served by the given http url to activate a hostname.
- `ssl`: object — SSL properties for the custom hostname.
- `status`: string enum: `active`, `pending`, `active_redeploying`, `moved`, `pending_deletion`, `deleted`, `pending_blocked`, `pending_migration` — Status of the hostname's activation.
- `verification_errors`: string[] — These are errors that were encountered while trying to activate a hostname.
  [array]

## GET /zones/{zone_id}/custom_hostnames/quota

Get Custom Hostname Quota

operationId: `custom-hostname-for-a-zone-get-custom-hostname-quota`

**Response** 200 → `result`

- `allocated`: integer **required** — The allocated custom hostname quota.
- `exceeded`: boolean **required** — Whether the current usage has exceeded the allocated quota.
- `hard_cap`: integer **required** — The maximum number of custom hostnames allowed before create requests are rejected.
- `used`: integer **required** — The number of custom hostnames currently in use.
