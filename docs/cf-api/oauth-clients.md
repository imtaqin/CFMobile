# OAuth Clients

8 endpoints.

## GET /accounts/{account_id}/oauth_clients

List OAuth Clients

operationId: `oauth-clients-list`

**Response** 200 → `result`

[array of]
- `allowed_cors_origins`: string[] — Array of allowed CORS origins.
  [array]
- `client_name`: string — Human-readable name of the OAuth client.
- `client_uri`: string — URL of the home page of the client.
- `grant_types`: string[] — Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.
  [array]
- `logo_uri`: string — URL of the client's logo.
- `optional_scopes`: string[] — Scopes that the authorizing user may decline during consent. Each value must also appear in `scopes`. The scopes `openid`, `offline`, and `o
  [array]
- `policy_uri`: string — URL that points to a privacy policy document.
- `post_logout_redirect_uris`: string[] — Array of allowed post-logout redirect URIs.
  [array]
- `redirect_uris`: string[] — Array of allowed redirect URIs for the client.
  [array]
- `response_types`: string[] — Array of OAuth response types the client is allowed to use.
  [array]
- `scopes`: string[] — Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against 
  [array]
- `token_endpoint_auth_method`: string enum: `none`, `client_secret_basic`, `client_secret_post` — The authentication method the client uses at the token endpoint.
- `tos_uri`: string — URL that points to a terms of service document.
- `client_id`: any **required**
- `client_uri_verification`: object — Client URI domain control verification state.
  - `status`: string enum: `pending`, `in_progress`, `verified`, `failed` — Current verification status for the client URI host.
  - `text`: string — Exact TXT record value that must be added to DNS to prove ownership of the client URI host.
- `created_at`: string — Timestamp when the OAuth client was created.
- `has_rotated_secret`: boolean — Indicates whether the client has a rotated secret that has not yet been deleted.
- `promoted_at`: string — Timestamp when the OAuth client was promoted to public visibility.
- `updated_at`: string — Timestamp when the OAuth client was last updated.
- `visibility`: string **required** enum: `public`, `private` — Visibility of the OAuth client.

## POST /accounts/{account_id}/oauth_clients

Create OAuth Client

operationId: `oauth-clients-create`

**Request** (application/json)

- `allowed_cors_origins`: string[] — Array of allowed CORS origins.
  [array]
- `client_name`: string — Human-readable name of the OAuth client.
- `client_uri`: string — URL of the home page of the client.
- `grant_types`: string[] — Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.
  [array]
- `logo_uri`: string — URL of the client's logo.
- `optional_scopes`: string[] — Scopes that the authorizing user may decline during consent. Each value must also appear in `scopes`. The scopes `openid`, `offline`, and `o
  [array]
- `policy_uri`: string — URL that points to a privacy policy document.
- `post_logout_redirect_uris`: string[] — Array of allowed post-logout redirect URIs.
  [array]
- `redirect_uris`: string[] — Array of allowed redirect URIs for the client.
  [array]
- `response_types`: string[] — Array of OAuth response types the client is allowed to use.
  [array]
- `scopes`: string[] — Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against 
  [array]
- `token_endpoint_auth_method`: string enum: `none`, `client_secret_basic`, `client_secret_post` — The authentication method the client uses at the token endpoint.
- `tos_uri`: string — URL that points to a terms of service document.
object

**Response** 200 → `result`

- `allowed_cors_origins`: string[] — Array of allowed CORS origins.
  [array]
- `client_name`: string — Human-readable name of the OAuth client.
- `client_uri`: string — URL of the home page of the client.
- `grant_types`: string[] — Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.
  [array]
- `logo_uri`: string — URL of the client's logo.
- `optional_scopes`: string[] — Scopes that the authorizing user may decline during consent. Each value must also appear in `scopes`. The scopes `openid`, `offline`, and `o
  [array]
- `policy_uri`: string — URL that points to a privacy policy document.
- `post_logout_redirect_uris`: string[] — Array of allowed post-logout redirect URIs.
  [array]
- `redirect_uris`: string[] — Array of allowed redirect URIs for the client.
  [array]
- `response_types`: string[] — Array of OAuth response types the client is allowed to use.
  [array]
- `scopes`: string[] — Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against 
  [array]
- `token_endpoint_auth_method`: string enum: `none`, `client_secret_basic`, `client_secret_post` — The authentication method the client uses at the token endpoint.
- `tos_uri`: string — URL that points to a terms of service document.
- `client_id`: any **required**
- `client_uri_verification`: object — Client URI domain control verification state.
  - `status`: string enum: `pending`, `in_progress`, `verified`, `failed` — Current verification status for the client URI host.
  - `text`: string — Exact TXT record value that must be added to DNS to prove ownership of the client URI host.
- `created_at`: string — Timestamp when the OAuth client was created.
- `has_rotated_secret`: boolean — Indicates whether the client has a rotated secret that has not yet been deleted.
- `promoted_at`: string — Timestamp when the OAuth client was promoted to public visibility.
- `updated_at`: string — Timestamp when the OAuth client was last updated.
- `visibility`: string **required** enum: `public`, `private` — Visibility of the OAuth client.
- `client_secret`: string — The client secret. This is the only time the secret is returned in a response.

## DELETE /accounts/{account_id}/oauth_clients/{oauth_client_id}

Delete OAuth Client

operationId: `oauth-clients-delete`

**Response** 200 → `result`

- `id`: string **required** — Identifier

## GET /accounts/{account_id}/oauth_clients/{oauth_client_id}

OAuth Client Details

operationId: `oauth-clients-get`

**Response** 200 → `result`

- `allowed_cors_origins`: string[] — Array of allowed CORS origins.
  [array]
- `client_name`: string — Human-readable name of the OAuth client.
- `client_uri`: string — URL of the home page of the client.
- `grant_types`: string[] — Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.
  [array]
- `logo_uri`: string — URL of the client's logo.
- `optional_scopes`: string[] — Scopes that the authorizing user may decline during consent. Each value must also appear in `scopes`. The scopes `openid`, `offline`, and `o
  [array]
- `policy_uri`: string — URL that points to a privacy policy document.
- `post_logout_redirect_uris`: string[] — Array of allowed post-logout redirect URIs.
  [array]
- `redirect_uris`: string[] — Array of allowed redirect URIs for the client.
  [array]
- `response_types`: string[] — Array of OAuth response types the client is allowed to use.
  [array]
- `scopes`: string[] — Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against 
  [array]
- `token_endpoint_auth_method`: string enum: `none`, `client_secret_basic`, `client_secret_post` — The authentication method the client uses at the token endpoint.
- `tos_uri`: string — URL that points to a terms of service document.
- `client_id`: any **required**
- `client_uri_verification`: object — Client URI domain control verification state.
  - `status`: string enum: `pending`, `in_progress`, `verified`, `failed` — Current verification status for the client URI host.
  - `text`: string — Exact TXT record value that must be added to DNS to prove ownership of the client URI host.
- `created_at`: string — Timestamp when the OAuth client was created.
- `has_rotated_secret`: boolean — Indicates whether the client has a rotated secret that has not yet been deleted.
- `promoted_at`: string — Timestamp when the OAuth client was promoted to public visibility.
- `updated_at`: string — Timestamp when the OAuth client was last updated.
- `visibility`: string **required** enum: `public`, `private` — Visibility of the OAuth client.

## PATCH /accounts/{account_id}/oauth_clients/{oauth_client_id}

Update OAuth Client

operationId: `oauth-clients-update`

**Request** (application/json)

- `allowed_cors_origins`: string[] — Array of allowed CORS origins.
  [array]
- `client_name`: string — Human-readable name of the OAuth client.
- `client_uri`: string — URL of the home page of the client.
- `grant_types`: string[] — Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.
  [array]
- `logo_uri`: string — URL of the client's logo.
- `optional_scopes`: string[] — Scopes that the authorizing user may decline during consent. Each value must also appear in `scopes`. The scopes `openid`, `offline`, and `o
  [array]
- `policy_uri`: string — URL that points to a privacy policy document.
- `post_logout_redirect_uris`: string[] — Array of allowed post-logout redirect URIs.
  [array]
- `redirect_uris`: string[] — Array of allowed redirect URIs for the client.
  [array]
- `response_types`: string[] — Array of OAuth response types the client is allowed to use.
  [array]
- `scopes`: string[] — Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against 
  [array]
- `token_endpoint_auth_method`: string enum: `none`, `client_secret_basic`, `client_secret_post` — The authentication method the client uses at the token endpoint.
- `tos_uri`: string — URL that points to a terms of service document.
- `visibility`: string enum: `public` — Promote the OAuth client from private to public visibility. Only `public` is accepted; demotion to `private` is not supported. Promotion req

**Response** 200 → `result`

- `allowed_cors_origins`: string[] — Array of allowed CORS origins.
  [array]
- `client_name`: string — Human-readable name of the OAuth client.
- `client_uri`: string — URL of the home page of the client.
- `grant_types`: string[] — Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.
  [array]
- `logo_uri`: string — URL of the client's logo.
- `optional_scopes`: string[] — Scopes that the authorizing user may decline during consent. Each value must also appear in `scopes`. The scopes `openid`, `offline`, and `o
  [array]
- `policy_uri`: string — URL that points to a privacy policy document.
- `post_logout_redirect_uris`: string[] — Array of allowed post-logout redirect URIs.
  [array]
- `redirect_uris`: string[] — Array of allowed redirect URIs for the client.
  [array]
- `response_types`: string[] — Array of OAuth response types the client is allowed to use.
  [array]
- `scopes`: string[] — Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against 
  [array]
- `token_endpoint_auth_method`: string enum: `none`, `client_secret_basic`, `client_secret_post` — The authentication method the client uses at the token endpoint.
- `tos_uri`: string — URL that points to a terms of service document.
- `client_id`: any **required**
- `client_uri_verification`: object — Client URI domain control verification state.
  - `status`: string enum: `pending`, `in_progress`, `verified`, `failed` — Current verification status for the client URI host.
  - `text`: string — Exact TXT record value that must be added to DNS to prove ownership of the client URI host.
- `created_at`: string — Timestamp when the OAuth client was created.
- `has_rotated_secret`: boolean — Indicates whether the client has a rotated secret that has not yet been deleted.
- `promoted_at`: string — Timestamp when the OAuth client was promoted to public visibility.
- `updated_at`: string — Timestamp when the OAuth client was last updated.
- `visibility`: string **required** enum: `public`, `private` — Visibility of the OAuth client.

## DELETE /accounts/{account_id}/oauth_clients/{oauth_client_id}/rotate_secret

Delete Rotated OAuth Client Secret

operationId: `oauth-clients-delete-rotated-secret`

**Response** 200 → `result`

- `id`: string **required** — Identifier

## POST /accounts/{account_id}/oauth_clients/{oauth_client_id}/rotate_secret

Rotate OAuth Client Secret

operationId: `oauth-clients-rotate-secret`

**Response** 200 → `result`

- `client_secret`: string — The new client secret.

## GET /oauth/scopes

List OAuth Scopes

operationId: `oauth-scopes-list`

**Response** 200 → `result`

[array of]
- `category`: string — Category for grouping scopes in the UI.
- `id`: string **required** — The scope label to use in the scopes array when creating or updating an OAuth client.
- `name`: string **required** — Human-readable name of the OAuth scope.
- `scopes`: string[] — The underlying resource scopes (Bach scopes) that define which resources this OAuth scope can act upon.
  [array]
