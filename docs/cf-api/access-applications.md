# Access applications

9 endpoints.

## GET /accounts/{account_id}/access/apps

List Access applications

operationId: `access-applications-list-access-applications` · query: `name`, `domain`, `aud`, `target_attributes`, `exact`, `search`, `page`, `per_page`

**Response** 200 → `result`

[array of]
(one of 14 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: any
- `id`: string — UUID.
- `updated_at`: any
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `destinations`: object[] — Public hostname and Workers destinations secured by Access.
  [array of]
  - `overrides`: object[] — Rules that override how Access handles requests to this destination. Each rule can make a matching path public, bypassing Access authenticat
    [array of]
    - `behavior`: string **required** enum: `public` — The behavior to apply to matching requests.
    - `path_pattern`: string **required** — The request path pattern to match. Wildcards (`*`) are supported, but each path segment may have at most one wildcard. Unlike the `uri` in p
  - `type`: string enum: `public`
  - `uri`: string **required** — The public hostname and optional path to secure.
- `domain`: string — The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.
- `name`: string — The name of the application.
- `oauth_configuration`: any **required**
- `self_hosted_domains`: string[] default: `` — List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 2
  [array]
- `type`: any **required**
- `user_populations`: string[] **required** — The single user population associated with this application.
  [array]

## POST /accounts/{account_id}/access/apps

Add an Access application

operationId: `access-applications-add-an-application`

**Request** (application/json)

(one of 14 variants; showing the first)
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `destinations`: object[] — Public hostname and Workers destinations secured by Access.
  [array of]
  - `overrides`: object[] — Rules that override how Access handles requests to this destination. Each rule can make a matching path public, bypassing Access authenticat
    [array of]
    - `behavior`: string **required** enum: `public` — The behavior to apply to matching requests.
    - `path_pattern`: string **required** — The request path pattern to match. Wildcards (`*`) are supported, but each path segment may have at most one wildcard. Unlike the `uri` in p
  - `type`: string enum: `public`
  - `uri`: string **required** — The public hostname and optional path to secure.
- `domain`: string — The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.
- `name`: string — The name of the application.
- `oauth_configuration`: any **required**
- `self_hosted_domains`: string[] default: `` — List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 2
  [array]
- `type`: any **required**
- `user_populations`: string[] **required** — The single user population associated with this application.
  [array]

**Response** 201 → `result`

(one of 14 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: any
- `id`: string — UUID.
- `updated_at`: any
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `destinations`: object[] — Public hostname and Workers destinations secured by Access.
  [array of]
  - `overrides`: object[] — Rules that override how Access handles requests to this destination. Each rule can make a matching path public, bypassing Access authenticat
    [array of]
    - `behavior`: string **required** enum: `public` — The behavior to apply to matching requests.
    - `path_pattern`: string **required** — The request path pattern to match. Wildcards (`*`) are supported, but each path segment may have at most one wildcard. Unlike the `uri` in p
  - `type`: string enum: `public`
  - `uri`: string **required** — The public hostname and optional path to secure.
- `domain`: string — The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.
- `name`: string — The name of the application.
- `oauth_configuration`: any **required**
- `self_hosted_domains`: string[] default: `` — List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 2
  [array]
- `type`: any **required**
- `user_populations`: string[] **required** — The single user population associated with this application.
  [array]

## DELETE /accounts/{account_id}/access/apps/{app_id}

Delete an Access application

operationId: `access-applications-delete-an-access-application`

**Response** 202 → `result`

- `id`: string — UUID.

## GET /accounts/{account_id}/access/apps/{app_id}

Get an Access application

operationId: `access-applications-get-an-access-application`

**Response** 200 → `result`

(one of 14 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: any
- `id`: string — UUID.
- `updated_at`: any
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `destinations`: object[] — Public hostname and Workers destinations secured by Access.
  [array of]
  - `overrides`: object[] — Rules that override how Access handles requests to this destination. Each rule can make a matching path public, bypassing Access authenticat
    [array of]
    - `behavior`: string **required** enum: `public` — The behavior to apply to matching requests.
    - `path_pattern`: string **required** — The request path pattern to match. Wildcards (`*`) are supported, but each path segment may have at most one wildcard. Unlike the `uri` in p
  - `type`: string enum: `public`
  - `uri`: string **required** — The public hostname and optional path to secure.
- `domain`: string — The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.
- `name`: string — The name of the application.
- `oauth_configuration`: any **required**
- `self_hosted_domains`: string[] default: `` — List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 2
  [array]
- `type`: any **required**
- `user_populations`: string[] **required** — The single user population associated with this application.
  [array]

## PUT /accounts/{account_id}/access/apps/{app_id}

Update an Access application

operationId: `access-applications-update-an-access-application`

**Request** (application/json)

(one of 14 variants; showing the first)
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `destinations`: object[] — Public hostname and Workers destinations secured by Access.
  [array of]
  - `overrides`: object[] — Rules that override how Access handles requests to this destination. Each rule can make a matching path public, bypassing Access authenticat
    [array of]
    - `behavior`: string **required** enum: `public` — The behavior to apply to matching requests.
    - `path_pattern`: string **required** — The request path pattern to match. Wildcards (`*`) are supported, but each path segment may have at most one wildcard. Unlike the `uri` in p
  - `type`: string enum: `public`
  - `uri`: string **required** — The public hostname and optional path to secure.
- `domain`: string — The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.
- `name`: string — The name of the application.
- `oauth_configuration`: any **required**
- `self_hosted_domains`: string[] default: `` — List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 2
  [array]
- `type`: any **required**
- `user_populations`: string[] **required** — The single user population associated with this application.
  [array]

**Response** 200 → `result`

(one of 14 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: any
- `id`: string — UUID.
- `updated_at`: any
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `destinations`: object[] — Public hostname and Workers destinations secured by Access.
  [array of]
  - `overrides`: object[] — Rules that override how Access handles requests to this destination. Each rule can make a matching path public, bypassing Access authenticat
    [array of]
    - `behavior`: string **required** enum: `public` — The behavior to apply to matching requests.
    - `path_pattern`: string **required** — The request path pattern to match. Wildcards (`*`) are supported, but each path segment may have at most one wildcard. Unlike the `uri` in p
  - `type`: string enum: `public`
  - `uri`: string **required** — The public hostname and optional path to secure.
- `domain`: string — The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.
- `name`: string — The name of the application.
- `oauth_configuration`: any **required**
- `self_hosted_domains`: string[] default: `` — List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 2
  [array]
- `type`: any **required**
- `user_populations`: string[] **required** — The single user population associated with this application.
  [array]

## POST /accounts/{account_id}/access/apps/{app_id}/revoke_tokens

Revoke application tokens

operationId: `access-applications-revoke-service-tokens`

**Response** 202 → `result`

object

## PATCH /accounts/{account_id}/access/apps/{app_id}/settings

Update Access application settings

operationId: `access-applications-patch-update-access-application-settings`

**Request** (application/json)

- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.

**Response** 202 → `result`

- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.

## PUT /accounts/{account_id}/access/apps/{app_id}/settings

Update Access application settings

operationId: `access-applications-put-update-access-application-settings`

**Request** (application/json)

- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.

**Response** 202 → `result`

- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.

## GET /accounts/{account_id}/access/apps/{app_id}/user_policy_checks

Test Access policies

operationId: `access-applications-test-access-policies`

**Response** 200 → `result`

- `app_state`: object
  - `app_uid`: string — UUID.
  - `aud`: string
  - `hostname`: string
  - `name`: string
  - `policies`: object[]
    [array]
  - `status`: string
- `user_identity`: object
  - `account_id`: string
  - `device_sessions`: object
  - `email`: string
  - `geo`: object
    - `country`: string
  - `iat`: integer
  - `id`: string
  - `is_gateway`: boolean
  - `is_warp`: boolean
  - `name`: string
  - `user_uuid`: string — UUID.
  - `version`: integer
