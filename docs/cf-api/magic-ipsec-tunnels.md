# Magic IPsec tunnels

8 endpoints.

## GET /accounts/{account_id}/magic/ipsec_tunnels

List IPsec tunnels

operationId: `magic-ipsec-tunnels-list-ipsec-tunnels`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/magic/ipsec_tunnels

Create an IPsec tunnel

operationId: `magic-ipsec-tunnels-create-ipsec-tunnels`

**Request** (application/json)

- `automatic_return_routing`: boolean default: `false` — True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag t
- `bgp`: object
  - `customer_asn`: integer **required** — ASN used on the customer end of the BGP session
  - `export_filter_id`: string — ID of the BGP filter profile applied to routes advertised to the customer.
  - `extra_prefixes`: string[] — Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.
    [array]
  - `import_filter_id`: string — ID of the BGP filter profile applied to routes received from the customer.
  - `md5_key`: string — MD5 key to use for session authentication.
- `cloudflare_endpoint`: string **required** — The IP address assigned to the Cloudflare side of the IPsec tunnel.
- `custom_remote_identities`: object
  - `fqdn_id`: string — A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
- `customer_endpoint`: string — The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.
- `description`: string — An optional description forthe IPsec tunnel.
- `health_check`: any
- `interface_address`: string **required** — A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private I
- `interface_address6`: string — A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the add
- `name`: string **required** — The name of the IPsec tunnel. The name cannot share a name with other tunnels.
- `psk`: string — A randomly generated or provided string for use in the IPsec tunnel.
- `replay_protection`: boolean default: `false` — If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/magic/ipsec_tunnels

Update multiple IPsec tunnels

operationId: `magic-ipsec-tunnels-update-multiple-ipsec-tunnels`

**Request** (application/json)

object

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}

Delete IPsec Tunnel

operationId: `magic-ipsec-tunnels-delete-ipsec-tunnel`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}

List IPsec tunnel details

operationId: `magic-ipsec-tunnels-list-ipsec-tunnel-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}

Update IPsec Tunnel

operationId: `magic-ipsec-tunnels-update-ipsec-tunnel`

**Request** (application/json)

- `automatic_return_routing`: boolean default: `false` — True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag t
- `bgp`: object
  - `customer_asn`: integer **required** — ASN used on the customer end of the BGP session
  - `export_filter_id`: string — ID of the BGP filter profile applied to routes advertised to the customer.
  - `extra_prefixes`: string[] — Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.
    [array]
  - `import_filter_id`: string — ID of the BGP filter profile applied to routes received from the customer.
  - `md5_key`: string — MD5 key to use for session authentication.
- `cloudflare_endpoint`: string **required** — The IP address assigned to the Cloudflare side of the IPsec tunnel.
- `custom_remote_identities`: object
  - `fqdn_id`: string — A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
- `customer_endpoint`: string — The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.
- `description`: string — An optional description forthe IPsec tunnel.
- `health_check`: any
- `interface_address`: string **required** — A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private I
- `interface_address6`: string — A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the add
- `name`: string **required** — The name of the IPsec tunnel. The name cannot share a name with other tunnels.
- `psk`: string — A randomly generated or provided string for use in the IPsec tunnel.
- `replay_protection`: boolean default: `false` — If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}/psk_generate

Generate Pre-Shared Key (PSK) for IPsec tunnels

operationId: `magic-ipsec-tunnels-generate-pre-shared-key-(-psk)-for-ipsec-tunnels`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/magic/ipsec_tunnels/psk

Set Pre-Shared Keys (PSK) for IPsec tunnels

operationId: `magic-ipsec-tunnels-set-pre-shared-keys-for-ipsec-tunnels` · query: `validate_only`

**Request** (application/json)

- `psks`: object[] **required** — List of tunnel ID and PSK pairs.
  [array of]
  - `id`: any **required** — The ID of the IPsec tunnel.
  - `psk`: string **required** — A randomly generated or provided string for use in the IPsec tunnel.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
