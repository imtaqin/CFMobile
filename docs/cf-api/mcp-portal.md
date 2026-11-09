# MCP Portal

6 endpoints.

## GET /accounts/{account_id}/access/ai-controls/mcp/portals

List MCP Portals

operationId: `mcp-portals-api-list-portals` · query: `page`, `per_page`, `search`

**Response** 200 → `result`

[array of]
- `allow_code_mode`: boolean — Deprecated: use `code_mode` for new integrations. `true` maps to any non-off Code Mode policy; `false` maps to `code_mode: off`. If both fie
- `code_mode`: string enum: `off`, `opt_in`, `default_on`, `enforced` — Code Mode policy for this portal. `off`: Code Mode is unavailable; query parameters are ignored. `opt_in`: Code Mode is off by default; clie
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP portal.
- `hostname`: string **required** — Hostname where the MCP portal is available.
- `id`: string **required** — Unique identifier for the MCP portal.
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP portal.
- `secure_web_gateway`: boolean default: `false` — Route outbound MCP traffic through Zero Trust Secure Web Gateway.
- `servers`: object[] **required**
  [array of]
  - `auth_config_summary`: object — Safe subset of auth_credentials surfaced to the dashboard. Includes auth_mode (dcr|manual), has_client_secret, client_secret_version, and th
    - `auth_mode`: string enum: `dcr`, `manual`
    - `client_secret_version`: number
    - `config`: object
    - `has_client_secret`: boolean
    - `registration_info`: object
  - `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
  - `authentication_status`: string enum: `not_required`, `required`, `connected`, `stale`, `manual` — Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative 
  - `created_at`: string
  - `created_by`: string
  - `default_disabled`: boolean — Hide this server's tools and prompts by default. To expose specific capabilities, set enabled: true for them in updated_tools or updated_pro
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
  - `on_behalf`: boolean
  - `prompts`: object[] **required**
    [array]
  - `registered_at`: string — Timestamp of the most recent successful admin OAuth registration.
  - `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
  - `server_id`: string **required** — Unique identifier for the MCP server.
  - `status`: string enum: `waiting`, `ready`, `stale`, `error` default: `waiting` — Current sync state of the server
  - `tools`: object[] **required**
    [array]
  - `updated_prompts`: object[]
    [array of]
    - `enabled`: boolean
    - `name`: string **required**
    - `portal_alias`: string
    - `portal_description`: string
    - `server_alias`: string
    - `server_description`: string
  - `updated_tools`: object[]
    [array of]
    - `enabled`: boolean
    - `name`: string **required**
    - `portal_alias`: string
    - `portal_description`: string
    - `server_alias`: string
    - `server_description`: string

## POST /accounts/{account_id}/access/ai-controls/mcp/portals

Create a new MCP Portal

operationId: `mcp-portals-api-create-portals`

**Request** (application/json)

- `allow_code_mode`: boolean — Deprecated: use `code_mode` for new integrations. `true` maps to any non-off Code Mode policy; `false` maps to `code_mode: off`. If both fie
- `code_mode`: string enum: `off`, `opt_in`, `default_on`, `enforced` — Code Mode policy for this portal. `off`: Code Mode is unavailable; query parameters are ignored. `opt_in`: Code Mode is off by default; clie
- `description`: string — Optional description of the MCP portal.
- `hostname`: string **required** — Hostname where the MCP portal is available.
- `id`: string **required** — Unique identifier for the MCP portal.
- `name`: string **required** — Display name for the MCP portal.
- `secure_web_gateway`: boolean default: `false` — Route outbound MCP traffic through Zero Trust Secure Web Gateway.
- `servers`: object[] — MCP servers attached to the portal and their portal-specific settings.
  [array of]
  - `default_disabled`: boolean — Hide this server's tools and prompts by default. To expose specific capabilities, set enabled: true for them in this server entry's updated_
  - `on_behalf`: boolean — Use end-user OAuth credentials when connecting this server to the portal.
  - `server_id`: string **required** — Unique identifier for the MCP server.
  - `updated_prompts`: object[] — Portal-specific prompt overrides.
    [array of]
    - `alias`: string — Custom name exposed for the capability.
    - `description`: string — Custom description exposed for the capability.
    - `enabled`: boolean — Whether the capability is available through the MCP server.
    - `name`: string **required** — Name of the tool or prompt capability to override.
  - `updated_tools`: object[] — Portal-specific tool overrides.
    [array of]
    - `alias`: string — Custom name exposed for the capability.
    - `description`: string — Custom description exposed for the capability.
    - `enabled`: boolean — Whether the capability is available through the MCP server.
    - `name`: string **required** — Name of the tool or prompt capability to override.

**Response** 201 → `result`

- `allow_code_mode`: boolean — Deprecated: use `code_mode` for new integrations. `true` maps to any non-off Code Mode policy; `false` maps to `code_mode: off`. If both fie
- `code_mode`: string enum: `off`, `opt_in`, `default_on`, `enforced` — Code Mode policy for this portal. `off`: Code Mode is unavailable; query parameters are ignored. `opt_in`: Code Mode is off by default; clie
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP portal.
- `hostname`: string **required** — Hostname where the MCP portal is available.
- `id`: string **required** — Unique identifier for the MCP portal.
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP portal.
- `secure_web_gateway`: boolean default: `false` — Route outbound MCP traffic through Zero Trust Secure Web Gateway.
- `servers`: object[] **required**
  [array of]
  - `auth_config_summary`: object — Safe subset of auth_credentials surfaced to the dashboard. Includes auth_mode (dcr|manual), has_client_secret, client_secret_version, and th
    - `auth_mode`: string enum: `dcr`, `manual`
    - `client_secret_version`: number
    - `config`: object
    - `has_client_secret`: boolean
    - `registration_info`: object
  - `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
  - `authentication_status`: string enum: `not_required`, `required`, `connected`, `stale`, `manual` — Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative 
  - `created_at`: string
  - `created_by`: string
  - `default_disabled`: boolean — Hide this server's tools and prompts by default. To expose specific capabilities, set enabled: true for them in updated_tools or updated_pro
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
  - `on_behalf`: boolean
  - `prompts`: object[] **required**
    [array]
  - `registered_at`: string — Timestamp of the most recent successful admin OAuth registration.
  - `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
  - `server_id`: string **required** — Unique identifier for the MCP server.
  - `status`: string enum: `waiting`, `ready`, `stale`, `error` default: `waiting` — Current sync state of the server
  - `tools`: object[] **required**
    [array]
  - `updated_prompts`: object[]
    [array of]
    - `enabled`: boolean
    - `name`: string **required**
    - `portal_alias`: string
    - `portal_description`: string
    - `server_alias`: string
    - `server_description`: string
  - `updated_tools`: object[]
    [array of]
    - `enabled`: boolean
    - `name`: string **required**
    - `portal_alias`: string
    - `portal_description`: string
    - `server_alias`: string
    - `server_description`: string

## DELETE /accounts/{account_id}/access/ai-controls/mcp/portals/{id}

Delete an MCP Portal

operationId: `mcp-portals-api-delete-portals`

**Response** 200 → `result`

- `allow_code_mode`: boolean — Deprecated: use `code_mode` for new integrations. `true` maps to any non-off Code Mode policy; `false` maps to `code_mode: off`. If both fie
- `code_mode`: string enum: `off`, `opt_in`, `default_on`, `enforced` — Code Mode policy for this portal. `off`: Code Mode is unavailable; query parameters are ignored. `opt_in`: Code Mode is off by default; clie
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP portal.
- `hostname`: string **required** — Hostname where the MCP portal is available.
- `id`: string **required** — Unique identifier for the MCP portal.
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP portal.
- `secure_web_gateway`: boolean default: `false` — Route outbound MCP traffic through Zero Trust Secure Web Gateway.

## GET /accounts/{account_id}/access/ai-controls/mcp/portals/{id}

Read details of an MCP Portal

operationId: `mcp-portals-api-fetch-gateways`

**Response** 200 → `result`

- `allow_code_mode`: boolean — Deprecated: use `code_mode` for new integrations. `true` maps to any non-off Code Mode policy; `false` maps to `code_mode: off`. If both fie
- `code_mode`: string enum: `off`, `opt_in`, `default_on`, `enforced` — Code Mode policy for this portal. `off`: Code Mode is unavailable; query parameters are ignored. `opt_in`: Code Mode is off by default; clie
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP portal.
- `hostname`: string **required** — Hostname where the MCP portal is available.
- `id`: string **required** — Unique identifier for the MCP portal.
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP portal.
- `secure_web_gateway`: boolean default: `false` — Route outbound MCP traffic through Zero Trust Secure Web Gateway.
- `servers`: object[] **required**
  [array of]
  - `auth_config_summary`: object — Safe subset of auth_credentials surfaced to the dashboard. Includes auth_mode (dcr|manual), has_client_secret, client_secret_version, and th
    - `auth_mode`: string enum: `dcr`, `manual`
    - `client_secret_version`: number
    - `config`: object
    - `has_client_secret`: boolean
    - `registration_info`: object
  - `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
  - `authentication_status`: string enum: `not_required`, `required`, `connected`, `stale`, `manual` — Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative 
  - `created_at`: string
  - `created_by`: string
  - `default_disabled`: boolean — Hide this server's tools and prompts by default. To expose specific capabilities, set enabled: true for them in updated_tools or updated_pro
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
  - `on_behalf`: boolean
  - `prompts`: object[] **required**
    [array]
  - `registered_at`: string — Timestamp of the most recent successful admin OAuth registration.
  - `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
  - `server_id`: string **required** — Unique identifier for the MCP server.
  - `status`: string enum: `waiting`, `ready`, `stale`, `error` default: `waiting` — Current sync state of the server
  - `tools`: object[] **required**
    [array]
  - `updated_prompts`: object[]
    [array of]
    - `enabled`: boolean
    - `name`: string **required**
    - `portal_alias`: string
    - `portal_description`: string
    - `server_alias`: string
    - `server_description`: string
  - `updated_tools`: object[]
    [array of]
    - `enabled`: boolean
    - `name`: string **required**
    - `portal_alias`: string
    - `portal_description`: string
    - `server_alias`: string
    - `server_description`: string

## PUT /accounts/{account_id}/access/ai-controls/mcp/portals/{id}

Update an MCP Portal

operationId: `mcp-portals-api-update-portals`

**Request** (application/json)

- `allow_code_mode`: boolean — Deprecated: use `code_mode` for new integrations. `true` maps to any non-off Code Mode policy; `false` maps to `code_mode: off`. If both fie
- `code_mode`: string enum: `off`, `opt_in`, `default_on`, `enforced` — Code Mode policy for this portal. `off`: Code Mode is unavailable; query parameters are ignored. `opt_in`: Code Mode is off by default; clie
- `description`: string — Optional description of the MCP portal.
- `hostname`: string — Hostname where the MCP portal is available.
- `name`: string — Display name for the MCP portal.
- `secure_web_gateway`: boolean default: `false` — Route outbound MCP traffic through Zero Trust Secure Web Gateway.
- `servers`: object[] — MCP servers attached to the portal and their portal-specific settings.
  [array of]
  - `default_disabled`: boolean — Hide this server's tools and prompts by default. To expose specific capabilities, set enabled: true for them in this server entry's updated_
  - `on_behalf`: boolean — Use end-user OAuth credentials when connecting this server to the portal.
  - `server_id`: string **required** — Unique identifier for the MCP server.
  - `updated_prompts`: object[] — Portal-specific prompt overrides.
    [array of]
    - `alias`: string — Custom name exposed for the capability.
    - `description`: string — Custom description exposed for the capability.
    - `enabled`: boolean — Whether the capability is available through the MCP server.
    - `name`: string **required** — Name of the tool or prompt capability to override.
  - `updated_tools`: object[] — Portal-specific tool overrides.
    [array of]
    - `alias`: string — Custom name exposed for the capability.
    - `description`: string — Custom description exposed for the capability.
    - `enabled`: boolean — Whether the capability is available through the MCP server.
    - `name`: string **required** — Name of the tool or prompt capability to override.

**Response** 200 → `result`

- `allow_code_mode`: boolean — Deprecated: use `code_mode` for new integrations. `true` maps to any non-off Code Mode policy; `false` maps to `code_mode: off`. If both fie
- `code_mode`: string enum: `off`, `opt_in`, `default_on`, `enforced` — Code Mode policy for this portal. `off`: Code Mode is unavailable; query parameters are ignored. `opt_in`: Code Mode is off by default; clie
- `created_at`: string
- `created_by`: string
- `description`: string — Optional description of the MCP portal.
- `hostname`: string **required** — Hostname where the MCP portal is available.
- `id`: string **required** — Unique identifier for the MCP portal.
- `modified_at`: string
- `modified_by`: string
- `name`: string **required** — Display name for the MCP portal.
- `secure_web_gateway`: boolean default: `false` — Route outbound MCP traffic through Zero Trust Secure Web Gateway.
- `servers`: object[] **required**
  [array of]
  - `auth_config_summary`: object — Safe subset of auth_credentials surfaced to the dashboard. Includes auth_mode (dcr|manual), has_client_secret, client_secret_version, and th
    - `auth_mode`: string enum: `dcr`, `manual`
    - `client_secret_version`: number
    - `config`: object
    - `has_client_secret`: boolean
    - `registration_info`: object
  - `auth_type`: string **required** enum: `oauth`, `bearer`, `unauthenticated` — Authentication method used to connect to the upstream MCP server.
  - `authentication_status`: string enum: `not_required`, `required`, `connected`, `stale`, `manual` — Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative 
  - `created_at`: string
  - `created_by`: string
  - `default_disabled`: boolean — Hide this server's tools and prompts by default. To expose specific capabilities, set enabled: true for them in updated_tools or updated_pro
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
  - `on_behalf`: boolean
  - `prompts`: object[] **required**
    [array]
  - `registered_at`: string — Timestamp of the most recent successful admin OAuth registration.
  - `secure_web_gateway`: boolean default: `false` — Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.
  - `server_id`: string **required** — Unique identifier for the MCP server.
  - `status`: string enum: `waiting`, `ready`, `stale`, `error` default: `waiting` — Current sync state of the server
  - `tools`: object[] **required**
    [array]
  - `updated_prompts`: object[]
    [array of]
    - `enabled`: boolean
    - `name`: string **required**
    - `portal_alias`: string
    - `portal_description`: string
    - `server_alias`: string
    - `server_description`: string
  - `updated_tools`: object[]
    [array of]
    - `enabled`: boolean
    - `name`: string **required**
    - `portal_alias`: string
    - `portal_description`: string
    - `server_alias`: string
    - `server_description`: string

## GET /accounts/{account_id}/access/ai-controls/mcp/portals/{portal_id}/servers/{server_id}/effective-redirect-uri

Resolve an MCP server OAuth redirect URI

operationId: `mcp-portals-api-effective-redirect-uri`

**Response** 200 → `result`

- `redirect_uri`: string **required**
- `source`: string **required** enum: `per_portal`, `shared_mcp22`
