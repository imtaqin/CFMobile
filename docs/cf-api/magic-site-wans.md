# Magic Site WANs

6 endpoints.

## GET /accounts/{account_id}/magic/sites/{site_id}/wans

List Site WANs

operationId: `magic-site-wans-list-wans`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/magic/sites/{site_id}/wans

Create a new Site WAN

operationId: `magic-site-wans-create-wan`

**Request** (application/json)

- `health_check_rate`: string enum: `low`, `mid`, `high` default: `mid` — Magic WAN health check rate for tunnels created on this link. The default value is `mid`.
- `load_balance_inner_flows`: boolean default: `true`
- `name`: string
- `physport`: integer **required**
- `priority`: integer
- `provisioned_download_kbps`: integer — Provisioned download rate of the WAN circuit in kilobits per second.
- `provisioned_upload_kbps`: integer — Provisioned upload rate of the WAN circuit in kilobits per second.
- `static_addressing`: object — Static addressing configuration for a WAN. Omit to use DHCP. Submit secondary_address when the site is in high availability mode.
  - `address`: string **required** — A valid CIDR notation representing an IP range.
  - `gateway_address`: string **required** — A valid IPv4 address.
  - `secondary_address`: string — A valid CIDR notation representing an IP range.
  - `secondary_gateway_address`: string — Gateway address for the secondary connector of a high availability site.
- `vlan_tag`: integer — VLAN ID. Use zero for untagged.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}

Delete Site WAN

operationId: `magic-site-wans-delete-wan`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}

Site WAN Details

operationId: `magic-site-wans-wan-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}

Patch Site WAN

operationId: `magic-site-wans-patch-wan`

**Request** (application/json)

- `health_check_rate`: string enum: `low`, `mid`, `high` — Magic WAN health check rate for tunnels created on this link.
- `load_balance_inner_flows`: boolean
- `name`: string
- `physport`: integer
- `priority`: integer
- `provisioned_download_kbps`: integer — Provisioned download rate of the WAN circuit in kilobits per second. Set to null to remove it.
- `provisioned_upload_kbps`: integer — Provisioned upload rate of the WAN circuit in kilobits per second. Set to null to remove it.
- `static_addressing`: object — Static addressing configuration. PATCH updates only the fields provided, and PUT replaces the configuration.
  - `address`: string — A valid CIDR notation representing an IP range.
  - `gateway_address`: string — A valid IPv4 address.
  - `secondary_address`: string — A valid CIDR notation representing an IP range.
  - `secondary_gateway_address`: string — Gateway address for the secondary connector of a high availability site. Set to null to remove it.
- `vlan_tag`: integer — VLAN ID. Use zero for untagged.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}

Update Site WAN

operationId: `magic-site-wans-update-wan`

**Request** (application/json)

- `health_check_rate`: string enum: `low`, `mid`, `high` — Magic WAN health check rate for tunnels created on this link.
- `load_balance_inner_flows`: boolean
- `name`: string
- `physport`: integer
- `priority`: integer
- `provisioned_download_kbps`: integer — Provisioned download rate of the WAN circuit in kilobits per second. Set to null to remove it.
- `provisioned_upload_kbps`: integer — Provisioned upload rate of the WAN circuit in kilobits per second. Set to null to remove it.
- `static_addressing`: object — Static addressing configuration. PATCH updates only the fields provided, and PUT replaces the configuration.
  - `address`: string — A valid CIDR notation representing an IP range.
  - `gateway_address`: string — A valid IPv4 address.
  - `secondary_address`: string — A valid CIDR notation representing an IP range.
  - `secondary_gateway_address`: string — Gateway address for the secondary connector of a high availability site. Set to null to remove it.
- `vlan_tag`: integer — VLAN ID. Use zero for untagged.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
