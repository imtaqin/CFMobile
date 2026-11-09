# MCP Portal Servers

6 endpoints.

## GET /accounts/{account_id}/access/ai-controls/mcp/servers

List MCP Servers

operationId: `mcp-portals-api-list-servers` · query: `page`, `per_page`, `search`

**Response** 200 → `result`

[array of]
- `auth_config_summary`: object — Safe subset of auth_credentials surfaced to the dashboard. Includes auth_mode (dcr|manual), has_client_secret, client_secret_version, and th
  - `auth_mode`: string enum: `dcr`, `manual`
  - `client_secret_version`: number
  - `config`: object
    - `authorization_endpoint`: string
    - `issuer`: string
    - `resource`: string
    - `revocation_endpoint`: string
    - `token_endpoint`: string
  - `has_client_secret`: boolean
  - `registration_info`: object
    - `client_id`: string
    - `redirect_uris`: string[]
    - `scope`: string
    - `token_endpoint_auth_method`: string
- `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
- `authentication_status`: string enum: `not_required`, `required`, `connected`, `stale`, `manual` — Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative 
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP server.
- `error`: string
- `error_details`: object
  - `cause`: string — Underlying error message
  - `is_upstream`: boolean — True = MCP server returned an error. False = couldn't reach the server
  - `mcp_code`: number — MCP protocol error code
  - `retryable`: boolean — Whether the error is transient and worth retrying
  - `status_code`: number — HTTP status code from the server
- `hostname`: string **required** — URL of the upstream MCP endpoint.
- `id`: string **required** — Unique identifier for the MCP server.
- `is_shared_oauth_callback_enabled`: boolean default: `false` — When true, per-user authorization uses the shared Cloudflare callback URL as the 'redirect_uri' instead of the portal callback URL. The defa
- `last_successful_sync`: string
- `last_synced`: string
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP server.
- `prompts`: object[] **required**
  [array]
- `registered_at`: string — Timestamp of the most recent successful admin OAuth registration.
- `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
- `status`: string enum: `waiting`, `ready`, `stale`, `error` default: `waiting` — Current sync state of the server
- `tools`: object[] **required**
  [array]
- `updated_prompts`: object[] — Server-wide prompt capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.
- `updated_tools`: object[] — Server-wide tool capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.

## POST /accounts/{account_id}/access/ai-controls/mcp/servers

Create a new MCP Server

operationId: `mcp-portals-api-create-servers`

**Request** (application/json)

- `auth_credentials`: string — Credential configuration for the upstream MCP server. For auth_type "bearer", either a raw token string (e.g. "sk-abc123"), which is wrapped
- `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
- `client_secret`: string — Provides 'client_secret' for a pre-registered OAuth client. This field is accepted on create or update only when 'auth_credentials.auth_mode
- `description`: string — Optional description of the MCP server.
- `hostname`: string **required** — URL of the upstream MCP endpoint.
- `id`: string **required** — Unique identifier for the MCP server.
- `is_shared_oauth_callback_enabled`: boolean default: `false` — When true, per-user authorization uses the shared Cloudflare callback URL as the 'redirect_uri' instead of the portal callback URL. The defa
- `name`: string **required** — Display name for the MCP server.
- `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
- `updated_prompts`: object[] — Server-wide prompt capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.
- `updated_tools`: object[] — Server-wide tool capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.

**Response** 201 → `result`

- `auth_config_summary`: object — Safe subset of auth_credentials surfaced to the dashboard. Includes auth_mode (dcr|manual), has_client_secret, client_secret_version, and th
  - `auth_mode`: string enum: `dcr`, `manual`
  - `client_secret_version`: number
  - `config`: object
    - `authorization_endpoint`: string
    - `issuer`: string
    - `resource`: string
    - `revocation_endpoint`: string
    - `token_endpoint`: string
  - `has_client_secret`: boolean
  - `registration_info`: object
    - `client_id`: string
    - `redirect_uris`: string[]
    - `scope`: string
    - `token_endpoint_auth_method`: string
- `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
- `authentication_status`: string enum: `not_required`, `required`, `connected`, `stale`, `manual` — Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative 
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP server.
- `error`: string
- `error_details`: object
  - `cause`: string — Underlying error message
  - `is_upstream`: boolean — True = MCP server returned an error. False = couldn't reach the server
  - `mcp_code`: number — MCP protocol error code
  - `retryable`: boolean — Whether the error is transient and worth retrying
  - `status_code`: number — HTTP status code from the server
- `hostname`: string **required** — URL of the upstream MCP endpoint.
- `id`: string **required** — Unique identifier for the MCP server.
- `is_shared_oauth_callback_enabled`: boolean default: `false` — When true, per-user authorization uses the shared Cloudflare callback URL as the 'redirect_uri' instead of the portal callback URL. The defa
- `last_successful_sync`: string
- `last_synced`: string
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP server.
- `prompts`: object[] **required**
  [array]
- `registered_at`: string — Timestamp of the most recent successful admin OAuth registration.
- `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
- `status`: string enum: `waiting`, `ready`, `stale`, `error` default: `waiting` — Current sync state of the server
- `tools`: object[] **required**
  [array]
- `updated_prompts`: object[] — Server-wide prompt capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.
- `updated_tools`: object[] — Server-wide tool capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.

## DELETE /accounts/{account_id}/access/ai-controls/mcp/servers/{id}

Delete an MCP Server

operationId: `mcp-portals-api-delete-servers`

**Response** 200 → `result`

- `auth_config_summary`: object — Safe subset of auth_credentials surfaced to the dashboard. Includes auth_mode (dcr|manual), has_client_secret, client_secret_version, and th
  - `auth_mode`: string enum: `dcr`, `manual`
  - `client_secret_version`: number
  - `config`: object
    - `authorization_endpoint`: string
    - `issuer`: string
    - `resource`: string
    - `revocation_endpoint`: string
    - `token_endpoint`: string
  - `has_client_secret`: boolean
  - `registration_info`: object
    - `client_id`: string
    - `redirect_uris`: string[]
    - `scope`: string
    - `token_endpoint_auth_method`: string
- `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
- `authentication_status`: string enum: `not_required`, `required`, `connected`, `stale`, `manual` — Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative 
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP server.
- `error`: string
- `error_details`: object
  - `cause`: string — Underlying error message
  - `is_upstream`: boolean — True = MCP server returned an error. False = couldn't reach the server
  - `mcp_code`: number — MCP protocol error code
  - `retryable`: boolean — Whether the error is transient and worth retrying
  - `status_code`: number — HTTP status code from the server
- `hostname`: string **required** — URL of the upstream MCP endpoint.
- `id`: string **required** — Unique identifier for the MCP server.
- `is_shared_oauth_callback_enabled`: boolean default: `false` — When true, per-user authorization uses the shared Cloudflare callback URL as the 'redirect_uri' instead of the portal callback URL. The defa
- `last_successful_sync`: string
- `last_synced`: string
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP server.
- `prompts`: object[] **required**
  [array]
- `registered_at`: string — Timestamp of the most recent successful admin OAuth registration.
- `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
- `status`: string enum: `waiting`, `ready`, `stale`, `error` default: `waiting` — Current sync state of the server
- `tools`: object[] **required**
  [array]
- `updated_prompts`: object[] — Server-wide prompt capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.
- `updated_tools`: object[] — Server-wide tool capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.

## GET /accounts/{account_id}/access/ai-controls/mcp/servers/{id}

Read the details of an MCP Server

operationId: `mcp-portals-api-fetch-servers`

**Response** 200 → `result`

- `auth_config_summary`: object — Safe subset of auth_credentials surfaced to the dashboard. Includes auth_mode (dcr|manual), has_client_secret, client_secret_version, and th
  - `auth_mode`: string enum: `dcr`, `manual`
  - `client_secret_version`: number
  - `config`: object
    - `authorization_endpoint`: string
    - `issuer`: string
    - `resource`: string
    - `revocation_endpoint`: string
    - `token_endpoint`: string
  - `has_client_secret`: boolean
  - `registration_info`: object
    - `client_id`: string
    - `redirect_uris`: string[]
    - `scope`: string
    - `token_endpoint_auth_method`: string
- `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
- `authentication_status`: string enum: `not_required`, `required`, `connected`, `stale`, `manual` — Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative 
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP server.
- `error`: string
- `error_details`: object
  - `cause`: string — Underlying error message
  - `is_upstream`: boolean — True = MCP server returned an error. False = couldn't reach the server
  - `mcp_code`: number — MCP protocol error code
  - `retryable`: boolean — Whether the error is transient and worth retrying
  - `status_code`: number — HTTP status code from the server
- `hostname`: string **required** — URL of the upstream MCP endpoint.
- `id`: string **required** — Unique identifier for the MCP server.
- `is_shared_oauth_callback_enabled`: boolean default: `false` — When true, per-user authorization uses the shared Cloudflare callback URL as the 'redirect_uri' instead of the portal callback URL. The defa
- `last_successful_sync`: string
- `last_synced`: string
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP server.
- `prompts`: object[] **required**
  [array]
- `registered_at`: string — Timestamp of the most recent successful admin OAuth registration.
- `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
- `status`: string enum: `waiting`, `ready`, `stale`, `error` default: `waiting` — Current sync state of the server
- `tools`: object[] **required**
  [array]
- `updated_prompts`: object[] — Server-wide prompt capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.
- `updated_tools`: object[] — Server-wide tool capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.

## PUT /accounts/{account_id}/access/ai-controls/mcp/servers/{id}

Update an MCP Server

operationId: `mcp-portals-api-update-servers`

**Request** (application/json)

- `auth_credentials`: string — Credential configuration for the upstream MCP server. For auth_type "bearer", either a raw token string (e.g. "sk-abc123"), which is wrapped
- `client_secret`: string — Provides 'client_secret' for a pre-registered OAuth client. This field is accepted on create or update only when 'auth_credentials.auth_mode
- `description`: string — Optional description of the MCP server.
- `is_shared_oauth_callback_enabled`: boolean default: `false` — When true, per-user authorization uses the shared Cloudflare callback URL as the 'redirect_uri' instead of the portal callback URL. The defa
- `name`: string — Display name for the MCP server.
- `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
- `updated_prompts`: object[] — Server-wide prompt capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.
- `updated_tools`: object[] — Server-wide tool capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.

**Response** 200 → `result`

- `auth_config_summary`: object — Safe subset of auth_credentials surfaced to the dashboard. Includes auth_mode (dcr|manual), has_client_secret, client_secret_version, and th
  - `auth_mode`: string enum: `dcr`, `manual`
  - `client_secret_version`: number
  - `config`: object
    - `authorization_endpoint`: string
    - `issuer`: string
    - `resource`: string
    - `revocation_endpoint`: string
    - `token_endpoint`: string
  - `has_client_secret`: boolean
  - `registration_info`: object
    - `client_id`: string
    - `redirect_uris`: string[]
    - `scope`: string
    - `token_endpoint_auth_method`: string
- `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
- `authentication_status`: string enum: `not_required`, `required`, `connected`, `stale`, `manual` — Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative 
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP server.
- `error`: string
- `error_details`: object
  - `cause`: string — Underlying error message
  - `is_upstream`: boolean — True = MCP server returned an error. False = couldn't reach the server
  - `mcp_code`: number — MCP protocol error code
  - `retryable`: boolean — Whether the error is transient and worth retrying
  - `status_code`: number — HTTP status code from the server
- `hostname`: string **required** — URL of the upstream MCP endpoint.
- `id`: string **required** — Unique identifier for the MCP server.
- `is_shared_oauth_callback_enabled`: boolean default: `false` — When true, per-user authorization uses the shared Cloudflare callback URL as the 'redirect_uri' instead of the portal callback URL. The defa
- `last_successful_sync`: string
- `last_synced`: string
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP server.
- `prompts`: object[] **required**
  [array]
- `registered_at`: string — Timestamp of the most recent successful admin OAuth registration.
- `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
- `status`: string enum: `waiting`, `ready`, `stale`, `error` default: `waiting` — Current sync state of the server
- `tools`: object[] **required**
  [array]
- `updated_prompts`: object[] — Server-wide prompt capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.
- `updated_tools`: object[] — Server-wide tool capability overrides.
  [array of]
  - `alias`: string — Custom name exposed for the capability.
  - `description`: string — Custom description exposed for the capability.
  - `enabled`: boolean — Whether the capability is available through the MCP server.
  - `name`: string **required** — Name of the tool or prompt capability to override.

## POST /accounts/{account_id}/access/ai-controls/mcp/servers/{id}/sync

Sync MCP Server Capabilities

operationId: `mcp-portals-api-sync-server`

**Response** 200 → `result`

- `error`: string
- `error_details`: object
  - `cause`: string — Underlying error message
  - `is_upstream`: boolean — True = MCP server returned an error. False = couldn't reach the server
  - `mcp_code`: number — MCP protocol error code
  - `retryable`: boolean — Whether the error is transient and worth retrying
  - `status_code`: number — HTTP status code from the server
- `status`: string enum: `waiting`, `ready`, `stale`, `error`
