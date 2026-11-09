# Infrastructure Access Targets

9 endpoints.

## GET /accounts/{account_id}/infrastructure/targets

List all targets

operationId: `infra-targets-list` · query: `hostname`, `hostname_contains`, `virtual_network_id`, `ip_v4`, `ip_v6`, `created_before`, `created_after`, `modified_before`, `modified_after`, `ips`, `target_ids`, `ip_like`, `ipv4_start`, `ipv4_end`, `ipv6_start`, `ipv6_end`, `tag`, `page`, `per_page`, `order`, `direction`

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — Date and time at which the target was created
- `hostname`: string **required** — A non-unique field that refers to a target
- `id`: string **required** — Target identifier
- `ip`: object **required** — The IPv4/IPv6 address that identifies where to reach a target
  - `ipv4`: object — The target's IPv4 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
  - `ipv6`: object — The target's IPv6 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
- `modified_at`: string **required** — Date and time at which the target was modified
- `tags`: object — Tags assigned to the target. Empty when no tags are assigned.

## POST /accounts/{account_id}/infrastructure/targets

Create new target

operationId: `infra-targets-post`

**Request** (application/json)

- `hostname`: string **required** — A non-unique field that refers to a target. Case insensitive, maximum
- `ip`: object **required** — The IPv4/IPv6 address that identifies where to reach a target
  - `ipv4`: object — The target's IPv4 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
  - `ipv6`: object — The target's IPv6 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
- `tags`: object — Optional tags to associate with the target. Keys and values are

**Response** 200 → `result`

- `created_at`: string **required** — Date and time at which the target was created
- `hostname`: string **required** — A non-unique field that refers to a target
- `id`: string **required** — Target identifier
- `ip`: object **required** — The IPv4/IPv6 address that identifies where to reach a target
  - `ipv4`: object — The target's IPv4 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
  - `ipv6`: object — The target's IPv6 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
- `modified_at`: string **required** — Date and time at which the target was modified
- `tags`: object — Tags assigned to the target. Empty when no tags are assigned.

## DELETE /accounts/{account_id}/infrastructure/targets/{target_id}

Delete target

operationId: `infra-targets-delete`

## GET /accounts/{account_id}/infrastructure/targets/{target_id}

Get target

operationId: `infra-targets-get`

**Response** 200 → `result`

- `created_at`: string **required** — Date and time at which the target was created
- `hostname`: string **required** — A non-unique field that refers to a target
- `id`: string **required** — Target identifier
- `ip`: object **required** — The IPv4/IPv6 address that identifies where to reach a target
  - `ipv4`: object — The target's IPv4 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
  - `ipv6`: object — The target's IPv6 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
- `modified_at`: string **required** — Date and time at which the target was modified
- `tags`: object — Tags assigned to the target. Empty when no tags are assigned.

## PUT /accounts/{account_id}/infrastructure/targets/{target_id}

Update target

operationId: `infra-targets-put`

**Request** (application/json)

- `hostname`: string **required** — A non-unique field that refers to a target. Case insensitive, maximum
- `ip`: object **required** — The IPv4/IPv6 address that identifies where to reach a target
  - `ipv4`: object — The target's IPv4 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
  - `ipv6`: object — The target's IPv6 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
- `tags`: object — Optional tags to associate with the target. Keys and values are

**Response** 200 → `result`

- `created_at`: string **required** — Date and time at which the target was created
- `hostname`: string **required** — A non-unique field that refers to a target
- `id`: string **required** — Target identifier
- `ip`: object **required** — The IPv4/IPv6 address that identifies where to reach a target
  - `ipv4`: object — The target's IPv4 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
  - `ipv6`: object — The target's IPv6 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
- `modified_at`: string **required** — Date and time at which the target was modified
- `tags`: object — Tags assigned to the target. Empty when no tags are assigned.

## DELETE /accounts/{account_id}/infrastructure/targets/batch

Delete targets (Deprecated)

operationId: `infra-targets-delete-batch`

**Request** (application/json)

- `target_ids`: string[] **required** — List of target IDs to bulk delete
  [array]

## PUT /accounts/{account_id}/infrastructure/targets/batch

Create new targets

operationId: `infra-targets-put-batch`

**Request** (application/json)

[array of]
- `hostname`: string **required** — A non-unique field that refers to a target. Case insensitive, maximum
- `ip`: object **required** — The IPv4/IPv6 address that identifies where to reach a target
  - `ipv4`: object — The target's IPv4 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
  - `ipv6`: object — The target's IPv6 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
- `tags`: object — Optional tags to associate with the target. Keys and values are

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — Date and time at which the target was created
- `hostname`: string **required** — A non-unique field that refers to a target
- `id`: string **required** — Target identifier
- `ip`: object **required** — The IPv4/IPv6 address that identifies where to reach a target
  - `ipv4`: object — The target's IPv4 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
  - `ipv6`: object — The target's IPv6 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
- `modified_at`: string **required** — Date and time at which the target was modified
- `tags`: object — Tags assigned to the target. Empty when no tags are assigned.

## POST /accounts/{account_id}/infrastructure/targets/batch_delete

Delete targets

operationId: `infra-targets-delete-batch-post`

**Request** (application/json)

- `target_ids`: string[] **required** — List of target IDs to bulk delete
  [array]

## POST /accounts/{account_id}/infrastructure/targets/batch_tags

Replace tags on existing targets

operationId: `infra-targets-post-batch-tags`

**Request** (application/json)

- `items`: object[] **required**
  [array of]
  - `tags`: object **required**
  - `target_id`: string **required** — Target identifier

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — Date and time at which the target was created
- `hostname`: string **required** — A non-unique field that refers to a target
- `id`: string **required** — Target identifier
- `ip`: object **required** — The IPv4/IPv6 address that identifies where to reach a target
  - `ipv4`: object — The target's IPv4 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
  - `ipv6`: object — The target's IPv6 address
    - `ip_addr`: string — IP address of the target
    - `virtual_network_id`: string — (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.
- `modified_at`: string **required** — Date and time at which the target was modified
- `tags`: object — Tags assigned to the target. Empty when no tags are assigned.
