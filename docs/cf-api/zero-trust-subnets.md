# Zero Trust Subnets

9 endpoints.

## GET /accounts/{account_id}/zerotrust/subnets

List Subnets

operationId: `zero-trust-networks-subnets-list` · query: `name`, `comment`, `network`, `existed_at`, `address_family`, `is_default_network`, `is_deleted`, `sort_order`, `subnet_types`, `per_page`, `page`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/zerotrust/subnets/cloudflare_source/{address_family}

Get Cloudflare Source Subnet

operationId: `zero-trust-networks-subnet-get-cloudflare-source`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/zerotrust/subnets/cloudflare_source/{address_family}

Update Cloudflare Source Subnet

operationId: `zero-trust-networks-subnet-update-cloudflare-source`

**Request** (application/json)

- `comment`: string default: `` — An optional description of the subnet.
- `name`: string — A user-friendly name for the subnet.
- `network`: string — The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/zerotrust/subnets/initial_resolved_ip/{address_family}

Get Initial Resolved IP Subnet

operationId: `zero-trust-networks-subnet-get-initial-resolved-ip`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/zerotrust/subnets/initial_resolved_ip/{address_family}

Update Initial Resolved IP Subnet

operationId: `zero-trust-networks-subnet-update-initial-resolved-ip`

**Request** (application/json)

- `comment`: string default: `` — An optional description of the subnet.
- `name`: string — A user-friendly name for the subnet.
- `network`: string — The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/zerotrust/subnets/warp

Create WARP IP subnet

operationId: `zero-trust-networks-subnet-create-warp`

**Request** (application/json)

- `comment`: string default: `` — An optional description of the subnet.
- `is_default_network`: boolean default: `false` — If `true`, this is the default subnet for the account. There can only be one default subnet per account.
- `name`: string **required** — A user-friendly name for the subnet.
- `network`: string **required** — The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/zerotrust/subnets/warp/{subnet_id}

Delete WARP IP subnet

operationId: `zero-trust-networks-subnet-delete-warp`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/zerotrust/subnets/warp/{subnet_id}

Get WARP IP subnet

operationId: `zero-trust-networks-subnet-get-warp`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/zerotrust/subnets/warp/{subnet_id}

Update WARP IP subnet

operationId: `zero-trust-networks-subnet-update-warp`

**Request** (application/json)

- `comment`: string default: `` — An optional description of the subnet.
- `is_default_network`: boolean default: `false` — If `true`, this is the default subnet for the account. There can only be one default subnet per account.
- `name`: string — A user-friendly name for the subnet.
- `network`: string — The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
