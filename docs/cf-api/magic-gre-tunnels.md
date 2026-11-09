# Magic GRE tunnels

6 endpoints.

## GET /accounts/{account_id}/magic/gre_tunnels

List GRE tunnels

operationId: `magic-gre-tunnels-list-gre-tunnels`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/magic/gre_tunnels

Create a GRE tunnel

operationId: `magic-gre-tunnels-create-gre-tunnels`

**Request** (application/json)

- `automatic_return_routing`: boolean default: `false` — True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag t
- `bgp`: object
  - `customer_asn`: integer **required** — ASN used on the customer end of the BGP session
  - `export_filter_id`: string — ID of the BGP filter profile applied to routes advertised to the customer.
  - `extra_prefixes`: string[] — Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.
    [array]
  - `import_filter_id`: string — ID of the BGP filter profile applied to routes received from the customer.
  - `md5_key`: string — MD5 key to use for session authentication.
- `cloudflare_gre_endpoint`: string **required** — The IP address assigned to the Cloudflare side of the GRE tunnel.
- `customer_gre_endpoint`: string **required** — The IP address assigned to the customer side of the GRE tunnel.
- `description`: string — An optional description of the GRE tunnel.
- `health_check`: any
- `interface_address`: string **required** — A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private I
- `interface_address6`: string — A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the add
- `mtu`: integer default: `1476` — Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.
- `name`: string **required** — The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with an
- `ttl`: integer default: `64` — Time To Live (TTL) in number of hops of the GRE tunnel.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/magic/gre_tunnels

Update multiple GRE tunnels

operationId: `magic-gre-tunnels-update-multiple-gre-tunnels`

**Request** (application/json)

object

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/magic/gre_tunnels/{gre_tunnel_id}

Delete GRE Tunnel

operationId: `magic-gre-tunnels-delete-gre-tunnel`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/magic/gre_tunnels/{gre_tunnel_id}

List GRE Tunnel Details

operationId: `magic-gre-tunnels-list-gre-tunnel-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/magic/gre_tunnels/{gre_tunnel_id}

Update GRE Tunnel

operationId: `magic-gre-tunnels-update-gre-tunnel`

**Request** (application/json)

- `automatic_return_routing`: boolean default: `false` — True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag t
- `cloudflare_gre_endpoint`: string **required** — The IP address assigned to the Cloudflare side of the GRE tunnel.
- `customer_gre_endpoint`: string **required** — The IP address assigned to the customer side of the GRE tunnel.
- `description`: string — An optional description of the GRE tunnel.
- `health_check`: any
- `interface_address`: string **required** — A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private I
- `interface_address6`: string — A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the add
- `mtu`: integer default: `1476` — Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.
- `name`: string **required** — The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with an
- `ttl`: integer default: `64` — Time To Live (TTL) in number of hops of the GRE tunnel.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
