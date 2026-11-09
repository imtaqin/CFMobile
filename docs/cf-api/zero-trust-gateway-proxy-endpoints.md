# Zero Trust Gateway proxy endpoints

5 endpoints.

## GET /accounts/{account_id}/gateway/proxy_endpoints

List proxy endpoints

operationId: `zero-trust-gateway-proxy-endpoints-list-proxy-endpoints` · query: `filter`, `search`, `order_by`, `direction`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `created_at`: string
- `id`: string
- `ips`: string[] **required** — Specify the list of CIDRs to restrict ingress connections.
  [array]
- `kind`: string enum: `ip` — The proxy endpoint kind
- `name`: string **required** — Specify the name of the proxy endpoint.
- `subdomain`: string — Specify the subdomain to use as the destination in the proxy client.
- `updated_at`: string

## POST /accounts/{account_id}/gateway/proxy_endpoints

Create a proxy endpoint

operationId: `zero-trust-gateway-proxy-endpoints-create-proxy-endpoint`

**Request** (application/json)

(one of 2 variants; showing the first)
- `kind`: string enum: `ip` — The proxy endpoint kind
- `name`: string **required** — Specify the name of the proxy endpoint.

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_at`: string
- `id`: string
- `ips`: string[] **required** — Specify the list of CIDRs to restrict ingress connections.
  [array]
- `kind`: string enum: `ip` — The proxy endpoint kind
- `name`: string **required** — Specify the name of the proxy endpoint.
- `subdomain`: string — Specify the subdomain to use as the destination in the proxy client.
- `updated_at`: string

## DELETE /accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}

Delete a proxy endpoint

operationId: `zero-trust-gateway-proxy-endpoints-delete-proxy-endpoint`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}

Get a proxy endpoint

operationId: `zero-trust-gateway-proxy-endpoints-proxy-endpoint-details`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_at`: string
- `id`: string
- `ips`: string[] **required** — Specify the list of CIDRs to restrict ingress connections.
  [array]
- `kind`: string enum: `ip` — The proxy endpoint kind
- `name`: string **required** — Specify the name of the proxy endpoint.
- `subdomain`: string — Specify the subdomain to use as the destination in the proxy client.
- `updated_at`: string

## PATCH /accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}

Update a proxy endpoint

operationId: `zero-trust-gateway-proxy-endpoints-update-proxy-endpoint`

**Request** (application/json)

- `ips`: string[] — Specify the list of CIDRs to restrict ingress connections.
  [array]
- `name`: string — Specify the name of the proxy endpoint.

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_at`: string
- `id`: string
- `ips`: string[] **required** — Specify the list of CIDRs to restrict ingress connections.
  [array]
- `kind`: string enum: `ip` — The proxy endpoint kind
- `name`: string **required** — Specify the name of the proxy endpoint.
- `subdomain`: string — Specify the subdomain to use as the destination in the proxy client.
- `updated_at`: string
