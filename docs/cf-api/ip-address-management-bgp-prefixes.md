# IP Address Management BGP Prefixes

5 endpoints.

## GET /accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes

List BGP Prefixes

operationId: `ip-address-management-prefixes-list-bgp-prefixes`

**Response** 200 → `result`

[array of]
- `asn`: integer — Autonomous System Number (ASN) the prefix will be advertised under.
- `asn_prepend_count`: integer default: `0` — Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute
- `auto_advertise_withdraw`: boolean default: `false` — Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Clou
- `bgp_signal_opts`: object
  - `enabled`: boolean — Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal
  - `modified_at`: string — Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `id`: string — Identifier of BGP Prefix.
- `modified_at`: string
- `on_demand`: object
  - `advertised`: boolean — Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.
  - `advertised_modified_at`: string — Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.
  - `on_demand_enabled`: boolean — Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.
  - `on_demand_locked`: boolean — Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

## POST /accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes

Create BGP Prefix

operationId: `ip-address-management-prefixes-create-bgp-prefix`

**Request** (application/json)

- `cidr`: string **required** — IP Prefix in Classless Inter-Domain Routing format.

**Response** 201 → `result`

- `asn`: integer — Autonomous System Number (ASN) the prefix will be advertised under.
- `asn_prepend_count`: integer default: `0` — Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute
- `auto_advertise_withdraw`: boolean default: `false` — Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Clou
- `bgp_signal_opts`: object
  - `enabled`: boolean — Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal
  - `modified_at`: string — Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `id`: string — Identifier of BGP Prefix.
- `modified_at`: string
- `on_demand`: object
  - `advertised`: boolean — Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.
  - `advertised_modified_at`: string — Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.
  - `on_demand_enabled`: boolean — Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.
  - `on_demand_locked`: boolean — Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

## DELETE /accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}

Delete BGP Prefix

operationId: `ip-address-management-prefixes-delete-bgp-prefix`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}

Fetch BGP Prefix

operationId: `ip-address-management-prefixes-fetch-bgp-prefix`

**Response** 200 → `result`

- `asn`: integer — Autonomous System Number (ASN) the prefix will be advertised under.
- `asn_prepend_count`: integer default: `0` — Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute
- `auto_advertise_withdraw`: boolean default: `false` — Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Clou
- `bgp_signal_opts`: object
  - `enabled`: boolean — Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal
  - `modified_at`: string — Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `id`: string — Identifier of BGP Prefix.
- `modified_at`: string
- `on_demand`: object
  - `advertised`: boolean — Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.
  - `advertised_modified_at`: string — Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.
  - `on_demand_enabled`: boolean — Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.
  - `on_demand_locked`: boolean — Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

## PATCH /accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}

Update BGP Prefix

operationId: `ip-address-management-prefixes-update-bgp-prefix`

**Request** (application/json)

- `asn_prepend_count`: integer default: `0` — Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute
- `auto_advertise_withdraw`: boolean default: `false` — Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Clou
- `on_demand`: object
  - `advertised`: boolean

**Response** 200 → `result`

- `asn`: integer — Autonomous System Number (ASN) the prefix will be advertised under.
- `asn_prepend_count`: integer default: `0` — Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute
- `auto_advertise_withdraw`: boolean default: `false` — Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Clou
- `bgp_signal_opts`: object
  - `enabled`: boolean — Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal
  - `modified_at`: string — Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `id`: string — Identifier of BGP Prefix.
- `modified_at`: string
- `on_demand`: object
  - `advertised`: boolean — Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.
  - `advertised_modified_at`: string — Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.
  - `on_demand_enabled`: boolean — Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.
  - `on_demand_locked`: boolean — Whether the advertisement status of the prefix is locked, meaning it cannot be changed.
