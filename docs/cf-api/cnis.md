# CNIs

5 endpoints.

## GET /accounts/{account_id}/cni/cnis

List existing CNI objects

operationId: `list_cnis` · query: `slot`, `tunnel_id`, `cursor`, `limit`

**Response** 200 → `result`

- `items`: object[] **required**
  [array of]
  - `account`: string **required** — Customer account tag
  - `bgp`: object
    - `customer_asn`: integer **required** — ASN used on the customer end of the BGP session
    - `extra_prefixes`: string[] **required** — Extra set of static prefixes to advertise to the customer's end of the session
    - `md5_key`: string — MD5 key to use for session authentication.
  - `bgp_mode`: string enum: `dynamic_route_exchange`, `advertise_only` — The BGP mode for a CNI.
  - `cust_ip`: string **required** — Customer end of the point-to-point link
  - `id`: string **required**
  - `interconnect`: string **required** — Interconnect identifier hosting this CNI
  - `magic`: object **required**
    - `conduit_name`: string **required**
    - `description`: string **required**
    - `mtu`: integer **required**
  - `p2p_ip`: string **required** — Cloudflare end of the point-to-point link
- `next`: integer

## POST /accounts/{account_id}/cni/cnis

Create a new CNI object

operationId: `create_cni`

**Request** (application/json)

- `account`: string **required** — Customer account tag
- `bgp`: object
  - `customer_asn`: integer **required** — ASN used on the customer end of the BGP session
  - `extra_prefixes`: string[] **required** — Extra set of static prefixes to advertise to the customer's end of the session
    [array]
  - `md5_key`: string — MD5 key to use for session authentication.
- `interconnect`: string **required**
- `magic`: object **required**
  - `conduit_name`: string **required**
  - `description`: string **required**
  - `mtu`: integer **required**

**Response** 200 → `result`

- `account`: string **required** — Customer account tag
- `bgp`: object
  - `customer_asn`: integer **required** — ASN used on the customer end of the BGP session
  - `extra_prefixes`: string[] **required** — Extra set of static prefixes to advertise to the customer's end of the session
    [array]
  - `md5_key`: string — MD5 key to use for session authentication.
- `bgp_mode`: string enum: `dynamic_route_exchange`, `advertise_only` — The BGP mode for a CNI.
- `cust_ip`: string **required** — Customer end of the point-to-point link
- `id`: string **required**
- `interconnect`: string **required** — Interconnect identifier hosting this CNI
- `magic`: object **required**
  - `conduit_name`: string **required**
  - `description`: string **required**
  - `mtu`: integer **required**
- `p2p_ip`: string **required** — Cloudflare end of the point-to-point link

## DELETE /accounts/{account_id}/cni/cnis/{cni}

Delete a specified CNI object

operationId: `delete_cni`

## GET /accounts/{account_id}/cni/cnis/{cni}

Get information about a CNI object

operationId: `get_cni`

**Response** 200 → `result`

- `account`: string **required** — Customer account tag
- `bgp`: object
  - `customer_asn`: integer **required** — ASN used on the customer end of the BGP session
  - `extra_prefixes`: string[] **required** — Extra set of static prefixes to advertise to the customer's end of the session
    [array]
  - `md5_key`: string — MD5 key to use for session authentication.
- `bgp_mode`: string enum: `dynamic_route_exchange`, `advertise_only` — The BGP mode for a CNI.
- `cust_ip`: string **required** — Customer end of the point-to-point link
- `id`: string **required**
- `interconnect`: string **required** — Interconnect identifier hosting this CNI
- `magic`: object **required**
  - `conduit_name`: string **required**
  - `description`: string **required**
  - `mtu`: integer **required**
- `p2p_ip`: string **required** — Cloudflare end of the point-to-point link

## PUT /accounts/{account_id}/cni/cnis/{cni}

Modify stored information about a CNI object

operationId: `update_cni`

**Request** (application/json)

- `account`: string **required** — Customer account tag
- `bgp`: object
  - `customer_asn`: integer **required** — ASN used on the customer end of the BGP session
  - `extra_prefixes`: string[] **required** — Extra set of static prefixes to advertise to the customer's end of the session
    [array]
  - `md5_key`: string — MD5 key to use for session authentication.
- `bgp_mode`: string enum: `dynamic_route_exchange`, `advertise_only` — The BGP mode for a CNI.
- `cust_ip`: string **required** — Customer end of the point-to-point link
- `id`: string **required**
- `interconnect`: string **required** — Interconnect identifier hosting this CNI
- `magic`: object **required**
  - `conduit_name`: string **required**
  - `description`: string **required**
  - `mtu`: integer **required**
- `p2p_ip`: string **required** — Cloudflare end of the point-to-point link

**Response** 200 → `result`

- `account`: string **required** — Customer account tag
- `bgp`: object
  - `customer_asn`: integer **required** — ASN used on the customer end of the BGP session
  - `extra_prefixes`: string[] **required** — Extra set of static prefixes to advertise to the customer's end of the session
    [array]
  - `md5_key`: string — MD5 key to use for session authentication.
- `bgp_mode`: string enum: `dynamic_route_exchange`, `advertise_only` — The BGP mode for a CNI.
- `cust_ip`: string **required** — Customer end of the point-to-point link
- `id`: string **required**
- `interconnect`: string **required** — Interconnect identifier hosting this CNI
- `magic`: object **required**
  - `conduit_name`: string **required**
  - `description`: string **required**
  - `mtu`: integer **required**
- `p2p_ip`: string **required** — Cloudflare end of the point-to-point link
