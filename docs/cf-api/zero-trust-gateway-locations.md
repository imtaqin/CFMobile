# Zero Trust Gateway locations

5 endpoints.

## GET /accounts/{account_id}/gateway/locations

List Zero Trust Gateway locations

operationId: `zero-trust-gateway-locations-list-zero-trust-gateway-locations` · query: `filter`, `search`, `order_by`, `direction`

**Response** 200 → `result`

[array of]
- `client_default`: boolean default: `false` — Indicate whether this location is the default location.
- `created_at`: string
- `dns64_enabled`: boolean default: `false` — Enable DNS64 synthesis for DNS queries matched to this location. When updating a location, omitting this field resets it to false.
- `dns_destination_ips_id`: string default: `0e4a32c6-6fb8-4858-9296-98f51631e8e6` — Indicate the identifier of the pair of IPv4 addresses assigned to this location.
- `dns_destination_ipv6_block_id`: string — Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BY
- `doh_subdomain`: string — Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.
- `ecs_support`: boolean default: `false` — Indicate whether the location must resolve EDNS queries.
- `endpoints`: object — Configure the destination endpoints for this location.
  - `doh`: object **required**
    - `enabled`: boolean — Indicate whether the DOH endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
    - `require_token`: boolean — Specify whether the DOH endpoint requires user identity authentication.
  - `dot`: object **required**
    - `enabled`: boolean — Indicate whether the DOT endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
  - `ipv4`: object **required**
    - `enabled`: boolean — Indicate whether the IPv4 endpoint is enabled for this location.
  - `ipv6`: object **required**
    - `enabled`: boolean — Indicate whether the IPV6 endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The li
- `id`: string
- `ip`: string — Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as reques
- `ipv4_destination`: string — Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.
- `ipv4_destination_backup`: string — Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.
- `max_ttl`: object default: `[object Object]` — Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update res
  - `mode`: string **required** enum: `inherit`, `override`, `disabled` — `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.
  - `ttl_secs`: integer — Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `dis
- `name`: string — Specify the location name.
- `networks`: object[] — Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv
  [array of]
  - `network`: string **required** — Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.
- `updated_at`: string

## POST /accounts/{account_id}/gateway/locations

Create a Zero Trust Gateway location

operationId: `zero-trust-gateway-locations-create-zero-trust-gateway-location`

**Request** (application/json)

- `client_default`: boolean default: `false` — Indicate whether this location is the default location.
- `dns64_enabled`: boolean default: `false` — Enable DNS64 synthesis for DNS queries matched to this location. When updating a location, omitting this field resets it to false.
- `dns_destination_ips_id`: string — Specify the identifier of the pair of IPv4 addresses assigned to this location. When creating a location, if this field is absent or set to 
- `ecs_support`: boolean default: `false` — Indicate whether the location must resolve EDNS queries.
- `endpoints`: object — Configure the destination endpoints for this location.
  - `doh`: object **required**
    - `enabled`: boolean — Indicate whether the DOH endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
    - `require_token`: boolean — Specify whether the DOH endpoint requires user identity authentication.
  - `dot`: object **required**
    - `enabled`: boolean — Indicate whether the DOT endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
  - `ipv4`: object **required**
    - `enabled`: boolean — Indicate whether the IPv4 endpoint is enabled for this location.
  - `ipv6`: object **required**
    - `enabled`: boolean — Indicate whether the IPV6 endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The li
- `max_ttl`: object default: `[object Object]` — Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update res
  - `mode`: string **required** enum: `inherit`, `override`, `disabled` — `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.
  - `ttl_secs`: integer — Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `dis
- `name`: string **required** — Specify the location name.
- `networks`: object[] — Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv
  [array of]
  - `network`: string **required** — Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

**Response** 200 → `result`

- `client_default`: boolean default: `false` — Indicate whether this location is the default location.
- `created_at`: string
- `dns64_enabled`: boolean default: `false` — Enable DNS64 synthesis for DNS queries matched to this location. When updating a location, omitting this field resets it to false.
- `dns_destination_ips_id`: string default: `0e4a32c6-6fb8-4858-9296-98f51631e8e6` — Indicate the identifier of the pair of IPv4 addresses assigned to this location.
- `dns_destination_ipv6_block_id`: string — Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BY
- `doh_subdomain`: string — Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.
- `ecs_support`: boolean default: `false` — Indicate whether the location must resolve EDNS queries.
- `endpoints`: object — Configure the destination endpoints for this location.
  - `doh`: object **required**
    - `enabled`: boolean — Indicate whether the DOH endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
    - `require_token`: boolean — Specify whether the DOH endpoint requires user identity authentication.
  - `dot`: object **required**
    - `enabled`: boolean — Indicate whether the DOT endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
  - `ipv4`: object **required**
    - `enabled`: boolean — Indicate whether the IPv4 endpoint is enabled for this location.
  - `ipv6`: object **required**
    - `enabled`: boolean — Indicate whether the IPV6 endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The li
- `id`: string
- `ip`: string — Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as reques
- `ipv4_destination`: string — Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.
- `ipv4_destination_backup`: string — Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.
- `max_ttl`: object default: `[object Object]` — Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update res
  - `mode`: string **required** enum: `inherit`, `override`, `disabled` — `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.
  - `ttl_secs`: integer — Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `dis
- `name`: string — Specify the location name.
- `networks`: object[] — Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv
  [array of]
  - `network`: string **required** — Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.
- `updated_at`: string

## DELETE /accounts/{account_id}/gateway/locations/{location_id}

Delete a Zero Trust Gateway location

operationId: `zero-trust-gateway-locations-delete-zero-trust-gateway-location`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/gateway/locations/{location_id}

Get Zero Trust Gateway location details

operationId: `zero-trust-gateway-locations-zero-trust-gateway-location-details`

**Response** 200 → `result`

- `client_default`: boolean default: `false` — Indicate whether this location is the default location.
- `created_at`: string
- `dns64_enabled`: boolean default: `false` — Enable DNS64 synthesis for DNS queries matched to this location. When updating a location, omitting this field resets it to false.
- `dns_destination_ips_id`: string default: `0e4a32c6-6fb8-4858-9296-98f51631e8e6` — Indicate the identifier of the pair of IPv4 addresses assigned to this location.
- `dns_destination_ipv6_block_id`: string — Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BY
- `doh_subdomain`: string — Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.
- `ecs_support`: boolean default: `false` — Indicate whether the location must resolve EDNS queries.
- `endpoints`: object — Configure the destination endpoints for this location.
  - `doh`: object **required**
    - `enabled`: boolean — Indicate whether the DOH endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
    - `require_token`: boolean — Specify whether the DOH endpoint requires user identity authentication.
  - `dot`: object **required**
    - `enabled`: boolean — Indicate whether the DOT endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
  - `ipv4`: object **required**
    - `enabled`: boolean — Indicate whether the IPv4 endpoint is enabled for this location.
  - `ipv6`: object **required**
    - `enabled`: boolean — Indicate whether the IPV6 endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The li
- `id`: string
- `ip`: string — Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as reques
- `ipv4_destination`: string — Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.
- `ipv4_destination_backup`: string — Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.
- `max_ttl`: object default: `[object Object]` — Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update res
  - `mode`: string **required** enum: `inherit`, `override`, `disabled` — `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.
  - `ttl_secs`: integer — Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `dis
- `name`: string — Specify the location name.
- `networks`: object[] — Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv
  [array of]
  - `network`: string **required** — Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.
- `updated_at`: string

## PUT /accounts/{account_id}/gateway/locations/{location_id}

Update a Zero Trust Gateway location

operationId: `zero-trust-gateway-locations-update-zero-trust-gateway-location`

**Request** (application/json)

- `client_default`: boolean default: `false` — Indicate whether this location is the default location.
- `dns64_enabled`: boolean default: `false` — Enable DNS64 synthesis for DNS queries matched to this location. When updating a location, omitting this field resets it to false.
- `dns_destination_ips_id`: string — Specify the identifier of the pair of IPv4 addresses assigned to this location. When creating a location, if this field is absent or set to 
- `ecs_support`: boolean default: `false` — Indicate whether the location must resolve EDNS queries.
- `endpoints`: object — Configure the destination endpoints for this location.
  - `doh`: object **required**
    - `enabled`: boolean — Indicate whether the DOH endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
    - `require_token`: boolean — Specify whether the DOH endpoint requires user identity authentication.
  - `dot`: object **required**
    - `enabled`: boolean — Indicate whether the DOT endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
  - `ipv4`: object **required**
    - `enabled`: boolean — Indicate whether the IPv4 endpoint is enabled for this location.
  - `ipv6`: object **required**
    - `enabled`: boolean — Indicate whether the IPV6 endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The li
- `max_ttl`: object default: `[object Object]` — Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update res
  - `mode`: string **required** enum: `inherit`, `override`, `disabled` — `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.
  - `ttl_secs`: integer — Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `dis
- `name`: string **required** — Specify the location name.
- `networks`: object[] — Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv
  [array of]
  - `network`: string **required** — Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

**Response** 200 → `result`

- `client_default`: boolean default: `false` — Indicate whether this location is the default location.
- `created_at`: string
- `dns64_enabled`: boolean default: `false` — Enable DNS64 synthesis for DNS queries matched to this location. When updating a location, omitting this field resets it to false.
- `dns_destination_ips_id`: string default: `0e4a32c6-6fb8-4858-9296-98f51631e8e6` — Indicate the identifier of the pair of IPv4 addresses assigned to this location.
- `dns_destination_ipv6_block_id`: string — Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BY
- `doh_subdomain`: string — Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.
- `ecs_support`: boolean default: `false` — Indicate whether the location must resolve EDNS queries.
- `endpoints`: object — Configure the destination endpoints for this location.
  - `doh`: object **required**
    - `enabled`: boolean — Indicate whether the DOH endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
    - `require_token`: boolean — Specify whether the DOH endpoint requires user identity authentication.
  - `dot`: object **required**
    - `enabled`: boolean — Indicate whether the DOT endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list
  - `ipv4`: object **required**
    - `enabled`: boolean — Indicate whether the IPv4 endpoint is enabled for this location.
  - `ipv6`: object **required**
    - `enabled`: boolean — Indicate whether the IPV6 endpoint is enabled for this location.
    - `networks`: object[] — Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The li
- `id`: string
- `ip`: string — Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as reques
- `ipv4_destination`: string — Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.
- `ipv4_destination_backup`: string — Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.
- `max_ttl`: object default: `[object Object]` — Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update res
  - `mode`: string **required** enum: `inherit`, `override`, `disabled` — `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.
  - `ttl_secs`: integer — Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `dis
- `name`: string — Specify the location name.
- `networks`: object[] — Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv
  [array of]
  - `network`: string **required** — Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.
- `updated_at`: string
