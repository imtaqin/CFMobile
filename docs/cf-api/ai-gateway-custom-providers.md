# AI Gateway Custom Providers

5 endpoints.

## GET /accounts/{account_id}/ai-gateway/custom-providers

List custom providers

operationId: `aig-config-list-account-provider` · query: `page`, `per_page`, `beta`, `enable`, `search`

**Response** 200 → `result`

[array of]
- `base_url`: string **required**
- `beta`: boolean
- `created_at`: string **required**
- `curl_example`: string
- `description`: string
- `enable`: boolean
- `headers`: string — JSON object of extra HTTP headers that AI Gateway sends to the provider. Values can contain credentials.
- `id`: string **required**
- `js_example`: string
- `link`: string
- `logo`: string
- `modified_at`: string **required**
- `name`: string **required**
- `position`: integer
- `slug`: string **required**

## POST /accounts/{account_id}/ai-gateway/custom-providers

Create a custom provider

operationId: `aig-config-create-account-provider`

**Request** (application/json)

- `base_url`: string **required**
- `beta`: boolean
- `curl_example`: string
- `description`: string
- `enable`: boolean
- `headers`: string — JSON object of extra HTTP headers that AI Gateway sends to the provider. Values can contain credentials.
- `js_example`: string
- `link`: string
- `name`: string **required**
- `position`: integer
- `slug`: string **required**

**Response** 200 → `result`

- `base_url`: string **required**
- `beta`: boolean
- `created_at`: string **required**
- `curl_example`: string
- `description`: string
- `enable`: boolean
- `headers`: string — JSON object of extra HTTP headers that AI Gateway sends to the provider. Values can contain credentials.
- `id`: string **required**
- `js_example`: string
- `link`: string
- `logo`: string
- `modified_at`: string **required**
- `name`: string **required**
- `position`: integer
- `slug`: string **required**

## DELETE /accounts/{account_id}/ai-gateway/custom-providers/{id}

Delete a custom provider

operationId: `aig-config-delete-account-provider`

**Response** 200 → `result`

- `base_url`: string **required**
- `beta`: boolean
- `created_at`: string **required**
- `curl_example`: string
- `description`: string
- `enable`: boolean
- `headers`: string — JSON object of extra HTTP headers that AI Gateway sends to the provider. Values can contain credentials.
- `id`: string **required**
- `js_example`: string
- `link`: string
- `logo`: string
- `modified_at`: string **required**
- `name`: string **required**
- `position`: integer
- `slug`: string **required**

## GET /accounts/{account_id}/ai-gateway/custom-providers/{id}

Get a custom provider

operationId: `aig-config-fetch-account-provider`

**Response** 200 → `result`

- `base_url`: string **required**
- `beta`: boolean
- `created_at`: string **required**
- `curl_example`: string
- `description`: string
- `enable`: boolean
- `headers`: string — JSON object of extra HTTP headers that AI Gateway sends to the provider. Values can contain credentials.
- `id`: string **required**
- `js_example`: string
- `link`: string
- `logo`: string
- `modified_at`: string **required**
- `name`: string **required**
- `position`: integer
- `slug`: string **required**

## PATCH /accounts/{account_id}/ai-gateway/custom-providers/{id}

Update a custom provider

operationId: `aig-config-update-account-provider`

**Request** (application/json)

- `base_url`: string
- `beta`: boolean
- `curl_example`: string
- `description`: string
- `enable`: boolean
- `headers`: string — JSON object of extra HTTP headers that AI Gateway sends to the provider. Values can contain credentials.
- `js_example`: string
- `link`: string
- `logo`: string
- `name`: string
- `position`: integer
- `slug`: string

**Response** 200 → `result`

- `base_url`: string **required**
- `beta`: boolean
- `created_at`: string **required**
- `curl_example`: string
- `description`: string
- `enable`: boolean
- `headers`: string — JSON object of extra HTTP headers that AI Gateway sends to the provider. Values can contain credentials.
- `id`: string **required**
- `js_example`: string
- `link`: string
- `logo`: string
- `modified_at`: string **required**
- `name`: string **required**
- `position`: integer
- `slug`: string **required**
