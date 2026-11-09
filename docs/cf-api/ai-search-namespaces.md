# AI Search Namespaces

6 endpoints.

## GET /accounts/{account_id}/ai-search/namespaces

List namespaces

operationId: `ai-search-list-namespaces` · query: `page`, `per_page`, `search`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `description`: string — Optional description for the namespace. Max 256 characters.
- `name`: string **required**
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `instances_allowed`: string[] default: `` — Instance IDs exposed through the namespace public endpoint. Empty means nothing is searchable. Every ID must reference an existing instance 
    [array]
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.

## POST /accounts/{account_id}/ai-search/namespaces

Create a namespace

operationId: `ai-search-create-namespace`

**Request** (application/json)

- `description`: string — Optional description for the namespace. Max 256 characters.
- `name`: string **required**
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `instances_allowed`: string[] default: `` — Instance IDs exposed through the namespace public endpoint. Empty means nothing is searchable. Every ID must reference an existing instance 
    [array]
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.

**Response** 201 → `result`

- `created_at`: string **required**
- `description`: string — Optional description for the namespace. Max 256 characters.
- `name`: string **required**
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `instances_allowed`: string[] default: `` — Instance IDs exposed through the namespace public endpoint. Empty means nothing is searchable. Every ID must reference an existing instance 
    [array]
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.

## DELETE /accounts/{account_id}/ai-search/namespaces/{name}

Delete a namespace

operationId: `ai-search-delete-namespace`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/ai-search/namespaces/{name}

Get a namespace

operationId: `ai-search-fetch-namespace`

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string — Optional description for the namespace. Max 256 characters.
- `name`: string **required**
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `instances_allowed`: string[] default: `` — Instance IDs exposed through the namespace public endpoint. Empty means nothing is searchable. Every ID must reference an existing instance 
    [array]
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.

## PUT /accounts/{account_id}/ai-search/namespaces/{name}

Update a namespace

operationId: `ai-search-update-namespace`

**Request** (application/json)

- `description`: string — Optional description for the namespace. Max 256 characters.
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `instances_allowed`: string[] default: `` — Instance IDs exposed through the namespace public endpoint. Empty means nothing is searchable. Every ID must reference an existing instance 
    [array]
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string — Optional description for the namespace. Max 256 characters.
- `name`: string **required**
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `instances_allowed`: string[] default: `` — Instance IDs exposed through the namespace public endpoint. Empty means nothing is searchable. Every ID must reference an existing instance 
    [array]
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.

## PATCH /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}

Move an instance to a different namespace.

operationId: `ai-search-move-instance`

**Request** (application/json)

- `new_namespace`: string **required** — Target namespace to move the instance into.

**Response** 200 → `result`

object
