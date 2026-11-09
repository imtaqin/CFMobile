# AI Gateway Custom Domains

4 endpoints.

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/custom-domains

List custom domains

operationId: `aig-config-list-custom-domain` · query: `page`, `per_page`, `status`, `search`

**Response** 200 → `result`

[array of]
- `created_at`: integer **required** — epoch milliseconds
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `hostname`: string **required** — Custom hostname that you own, such as `ai.example.com`.
- `modified_at`: integer **required** — epoch milliseconds
- `ssl_hostname_id`: string **required**
- `status`: string **required** enum: `initializing`, `pending_dcv`, `active`, `blocked`, `error`

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/custom-domains

Create a custom domain for a gateway

operationId: `aig-config-create-custom-domain`

**Request** (application/json)

- `domain`: string **required** — Custom hostname that you own, such as `ai.example.com`.
- `minTLS`: string enum: `1.0`, `1.1`, `1.2`, `1.3`
- `zone_id`: string **required** — ID of the Cloudflare zone that contains the custom hostname.

**Response** 200 → `result`

- `cname_target`: string **required**
- `created_at`: integer **required** — epoch milliseconds
- `gateway_id`: string **required**
- `hostname`: string **required**
- `modified_at`: integer **required** — epoch milliseconds
- `status`: string **required** enum: `initializing`, `pending_dcv`, `active`, `blocked`, `error`

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/custom-domains/{hostname}

Delete a custom domain

operationId: `aig-config-delete-custom-domain`

**Response** 200 → `result`

- `created_at`: integer **required** — epoch milliseconds
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `hostname`: string **required** — Custom hostname that you own, such as `ai.example.com`.
- `modified_at`: integer **required** — epoch milliseconds
- `ssl_hostname_id`: string **required**
- `status`: string **required** enum: `initializing`, `pending_dcv`, `active`, `blocked`, `error`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/custom-domains/{hostname}

Get a custom domain

operationId: `aig-config-fetch-custom-domain`

**Response** 200 → `result`

- `created_at`: integer **required** — epoch milliseconds
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `hostname`: string **required** — Custom hostname that you own, such as `ai.example.com`.
- `modified_at`: integer **required** — epoch milliseconds
- `ssl_hostname_id`: string **required**
- `status`: string **required** enum: `initializing`, `pending_dcv`, `active`, `blocked`, `error`
