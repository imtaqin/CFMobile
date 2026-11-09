# Magic Site LANs

6 endpoints.

## GET /accounts/{account_id}/magic/sites/{site_id}/lans

List Site LANs

operationId: `magic-site-lans-list-lans`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/magic/sites/{site_id}/lans

Create a new Site LAN

operationId: `magic-site-lans-create-lan`

**Request** (application/json)

- `bond_id`: integer
- `ha_link`: boolean — mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.
- `is_breakout`: boolean — mark true to use this LAN for source-based breakout traffic
- `is_prioritized`: boolean — mark true to use this LAN for source-based prioritized traffic
- `name`: string
- `nat`: object
  - `static_prefix`: string — A valid CIDR notation representing an IP range.
- `physport`: integer
- `remote_subnets`: object[]
  [array of]
  - `local_alias_prefix`: string **required** — A valid CIDR notation representing an IP range.
  - `remote_prefix`: string **required** — A valid CIDR notation representing an IP range.
- `routed_subnets`: object[]
  [array of]
  - `nat`: object
    - `static_prefix`: string — A valid CIDR notation representing an IP range.
  - `next_hop`: string **required** — A valid IPv4 address.
  - `prefix`: string **required** — A valid CIDR notation representing an IP range.
- `static_addressing`: object — If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availabi
  - `address`: string **required** — A valid CIDR notation representing an IP range.
  - `dhcp_relay`: object
    - `server_addresses`: string[] — List of DHCP server IPs.
  - `dhcp_server`: object
    - `dhcp_options`: object[] — Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.
    - `dhcp_pool_end`: string — A valid IPv4 address.
    - `dhcp_pool_start`: string — A valid IPv4 address.
    - `dns_server`: any
    - `dns_servers`: string[]
    - `reservations`: object — Mapping of MAC addresses to IP addresses
  - `secondary_address`: string — A valid CIDR notation representing an IP range.
  - `virtual_address`: string — A valid CIDR notation representing an IP range.
- `vlan_tag`: integer — VLAN ID. Use zero for untagged.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}

Delete Site LAN

operationId: `magic-site-lans-delete-lan`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}

Site LAN Details

operationId: `magic-site-lans-lan-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}

Patch Site LAN

operationId: `magic-site-lans-patch-lan`

**Request** (application/json)

- `bond_id`: integer
- `ha_link`: boolean — mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.
- `is_breakout`: boolean — mark true to use this LAN for source-based breakout traffic
- `is_prioritized`: boolean — mark true to use this LAN for source-based prioritized traffic
- `name`: string
- `nat`: object
  - `static_prefix`: string — A valid CIDR notation representing an IP range.
- `physport`: integer
- `remote_subnets`: object[]
  [array of]
  - `local_alias_prefix`: string **required** — A valid CIDR notation representing an IP range.
  - `remote_prefix`: string **required** — A valid CIDR notation representing an IP range.
- `routed_subnets`: object[]
  [array of]
  - `nat`: object
    - `static_prefix`: string — A valid CIDR notation representing an IP range.
  - `next_hop`: string **required** — A valid IPv4 address.
  - `prefix`: string **required** — A valid CIDR notation representing an IP range.
- `static_addressing`: object — If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availabi
  - `address`: string **required** — A valid CIDR notation representing an IP range.
  - `dhcp_relay`: object
    - `server_addresses`: string[] — List of DHCP server IPs.
  - `dhcp_server`: object
    - `dhcp_options`: object[] — Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.
    - `dhcp_pool_end`: string — A valid IPv4 address.
    - `dhcp_pool_start`: string — A valid IPv4 address.
    - `dns_server`: any
    - `dns_servers`: string[]
    - `reservations`: object — Mapping of MAC addresses to IP addresses
  - `secondary_address`: string — A valid CIDR notation representing an IP range.
  - `virtual_address`: string — A valid CIDR notation representing an IP range.
- `vlan_tag`: integer — VLAN ID. Use zero for untagged.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}

Update Site LAN

operationId: `magic-site-lans-update-lan`

**Request** (application/json)

- `bond_id`: integer
- `ha_link`: boolean — mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.
- `is_breakout`: boolean — mark true to use this LAN for source-based breakout traffic
- `is_prioritized`: boolean — mark true to use this LAN for source-based prioritized traffic
- `name`: string
- `nat`: object
  - `static_prefix`: string — A valid CIDR notation representing an IP range.
- `physport`: integer
- `remote_subnets`: object[]
  [array of]
  - `local_alias_prefix`: string **required** — A valid CIDR notation representing an IP range.
  - `remote_prefix`: string **required** — A valid CIDR notation representing an IP range.
- `routed_subnets`: object[]
  [array of]
  - `nat`: object
    - `static_prefix`: string — A valid CIDR notation representing an IP range.
  - `next_hop`: string **required** — A valid IPv4 address.
  - `prefix`: string **required** — A valid CIDR notation representing an IP range.
- `static_addressing`: object — If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availabi
  - `address`: string **required** — A valid CIDR notation representing an IP range.
  - `dhcp_relay`: object
    - `server_addresses`: string[] — List of DHCP server IPs.
  - `dhcp_server`: object
    - `dhcp_options`: object[] — Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.
    - `dhcp_pool_end`: string — A valid IPv4 address.
    - `dhcp_pool_start`: string — A valid IPv4 address.
    - `dns_server`: any
    - `dns_servers`: string[]
    - `reservations`: object — Mapping of MAC addresses to IP addresses
  - `secondary_address`: string — A valid CIDR notation representing an IP range.
  - `virtual_address`: string — A valid CIDR notation representing an IP range.
- `vlan_tag`: integer — VLAN ID. Use zero for untagged.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
