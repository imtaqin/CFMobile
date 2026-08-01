# Zero Trust Subnets

8 endpoints.

## GET /accounts/{account_id}/zerotrust/subnets

List Subnets

operationId: `zero-trust-networks-subnets-list` · query: `name`, `comment`, `network`, `existed_at`, `address_family`, `is_default_network`, `is_deleted`, `sort_order`, `subnet_types`, `per_page`, `page`

## PATCH /accounts/{account_id}/zerotrust/subnets/cloudflare_source/{address_family}

Update Cloudflare Source Subnet

operationId: `zero-trust-networks-subnet-update-cloudflare-source`

## GET /accounts/{account_id}/zerotrust/subnets/initial_resolved_ip/{address_family}

Get Gateway Ephemeral Subnet

operationId: `zero-trust-networks-subnet-get-gateway-ephemeral`

## PUT /accounts/{account_id}/zerotrust/subnets/initial_resolved_ip/{address_family}

Update Gateway Ephemeral Subnet

operationId: `zero-trust-networks-subnet-update-gateway-ephemeral`

## POST /accounts/{account_id}/zerotrust/subnets/warp

Create WARP IP subnet

operationId: `zero-trust-networks-subnet-create-warp`

## DELETE /accounts/{account_id}/zerotrust/subnets/warp/{subnet_id}

Delete WARP IP subnet

operationId: `zero-trust-networks-subnet-delete-warp`

## GET /accounts/{account_id}/zerotrust/subnets/warp/{subnet_id}

Get WARP IP subnet

operationId: `zero-trust-networks-subnet-get-warp`

## PATCH /accounts/{account_id}/zerotrust/subnets/warp/{subnet_id}

Update WARP IP subnet

operationId: `zero-trust-networks-subnet-update-warp`
