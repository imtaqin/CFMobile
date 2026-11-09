# Magic Interconnects

4 endpoints.

## GET /accounts/{account_id}/magic/cf_interconnects

List interconnects

operationId: `magic-interconnects-list-interconnects`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/magic/cf_interconnects

Update multiple interconnects

operationId: `magic-interconnects-update-multiple-interconnects`

**Request** (application/json)

object

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/magic/cf_interconnects/{cf_interconnect_id}

List interconnect Details

operationId: `magic-interconnects-list-interconnect-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/magic/cf_interconnects/{cf_interconnect_id}

Update interconnect

operationId: `magic-interconnects-update-interconnect`

**Request** (application/json)

- `automatic_return_routing`: boolean default: `false` — True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag t
- `bgp`: object
  - `as_no`: integer — Deprecated. Use customer_asn.
  - `cloudflare_endpoint`: string — Read-only for v1.5; derived from interface_address.
  - `customer_asn`: integer — ASN used on the customer end of the BGP session.
  - `customer_endpoint`: string — Read-only for v1.5; derived from interface_address.
  - `export_filter_id`: string — ID of the BGP filter profile applied to routes advertised to the customer.
  - `extra_prefixes`: string[] — IPv4 prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic
    [array]
  - `import_filter_id`: string — ID of the BGP filter profile applied to routes received from the customer.
  - `md5_key`: string — MD5 key to use for session authentication.
- `description`: string — An optional description of the interconnect.
- `gre`: any
- `health_check`: any
- `interface_address`: string — The IPv4 interface address for the interconnect. For MPLS Interconnects,
- `interface_address6`: string — A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the add
- `mtu`: integer default: `1476` — The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.
- `name`: string — The name of the interconnect. The name cannot share a name with other tunnels.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
