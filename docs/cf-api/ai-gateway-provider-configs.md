# AI Gateway Provider Configs

5 endpoints.

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/provider_configs

List provider keys

operationId: `aig-config-list-providers` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `alias`: string **required**
- `default_config`: boolean **required**
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `last_used_at`: string — UTC date (YYYY-MM-DD) the gateway last selected this key to authenticate a request to the provider, whether or not the request succeeded. Up
- `modified_at`: string **required**
- `provider_slug`: string **required**
- `rate_limit`: number
- `rate_limit_period`: number default: `60`
- `secret_id`: string **required**
- `secret_preview`: string **required**

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/provider_configs

Store a provider key

operationId: `aig-config-create-providers`

**Request** (application/json)

- `alias`: string **required**
- `default_config`: boolean **required**
- `provider_slug`: string **required**
- `rate_limit`: number
- `rate_limit_period`: number default: `60`
- `secret`: string — Provider API key to store in the Secrets Store configured on the gateway.
- `secret_id`: string

**Response** 200 → `result`

- `alias`: string **required**
- `default_config`: boolean **required**
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `last_used_at`: string — UTC date (YYYY-MM-DD) the gateway last selected this key to authenticate a request to the provider, whether or not the request succeeded. Up
- `modified_at`: string **required**
- `provider_slug`: string **required**
- `rate_limit`: number
- `rate_limit_period`: number default: `60`
- `secret_id`: string **required**
- `secret_preview`: string **required**

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/provider_configs/{id}

Delete a provider key

operationId: `aig-config-delete-providers`

**Response** 200 → `result`

- `alias`: string **required**
- `default_config`: boolean **required**
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `last_used_at`: string — UTC date (YYYY-MM-DD) the gateway last selected this key to authenticate a request to the provider, whether or not the request succeeded. Up
- `modified_at`: string **required**
- `provider_slug`: string **required**
- `rate_limit`: number
- `rate_limit_period`: number default: `60`
- `secret_id`: string **required**
- `secret_preview`: string **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/provider_configs/{id}

Get a provider key

operationId: `aig-config-fetch-providers`

**Response** 200 → `result`

- `alias`: string **required**
- `default_config`: boolean **required**
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `last_used_at`: string — UTC date (YYYY-MM-DD) the gateway last selected this key to authenticate a request to the provider, whether or not the request succeeded. Up
- `modified_at`: string **required**
- `provider_slug`: string **required**
- `rate_limit`: number
- `rate_limit_period`: number default: `60`
- `secret_id`: string **required**
- `secret_preview`: string **required**

## PUT /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/provider_configs/{id}

Rotate a provider key

operationId: `aig-config-update-providers`

**Request** (application/json)

- `secret`: string **required** — Provider API key to store in the Secrets Store configured on the gateway.

**Response** 200 → `result`

- `alias`: string **required**
- `default_config`: boolean **required**
- `gateway_id`: string **required** — Unique identifier of the AI Gateway within the account.
- `id`: string **required**
- `last_used_at`: string — UTC date (YYYY-MM-DD) the gateway last selected this key to authenticate a request to the provider, whether or not the request succeeded. Up
- `modified_at`: string **required**
- `provider_slug`: string **required**
- `rate_limit`: number
- `rate_limit_period`: number default: `60`
- `secret_id`: string **required**
- `secret_preview`: string **required**
