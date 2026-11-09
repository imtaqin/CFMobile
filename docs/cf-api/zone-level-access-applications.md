# Zone-Level Access applications

9 endpoints.

## GET /zones/{zone_id}/access/apps

List Access Applications

operationId: `zone-level-access-applications-list-access-applications`

**Response** 200 → `result`

[array of]
(one of 8 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: string
- `id`: string — UUID.
- `scim_config`: object — Configuration for provisioning to this application via SCIM. This is currently in closed beta.
  - `authentication`: any
  - `deactivate_on_delete`: boolean — If false, we propagate DELETE requests to the target application for SCIM resources. If true, we only set `active` to false on the SCIM reso
  - `enabled`: boolean — Whether SCIM provisioning is turned on for this application.
  - `idp_uid`: string **required** — The UID of the IdP to use as the source for SCIM resources to provision to this application.
  - `mappings`: object[] — A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to b
    [array of]
    - `enabled`: boolean — Whether or not this mapping is enabled.
    - `filter`: string — A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned 
    - `operations`: object — Whether or not this mapping applies to creates, updates, or deletes.
    - `schema`: string **required** — Which SCIM resource type this mapping applies to.
    - `strictness`: string enum: `strict`, `passthrough` — The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ 
    - `transform_jsonata`: string — A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.
  - `remote_uri`: string **required** — The base URI for the application's SCIM-compatible API.
- `updated_at`: string
- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `app_launcher_visible`: boolean default: `true` — Displays the application in the App Launcher.
- `auto_redirect_to_identity`: boolean default: `false` — When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idp
- `cors_headers`: object
  - `allow_all_headers`: boolean — Allows all HTTP request headers.
  - `allow_all_methods`: boolean — Allows all HTTP request methods.
  - `allow_all_origins`: boolean — Allows all origins.
  - `allow_credentials`: boolean — When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.
  - `allowed_headers`: string[] — Allowed HTTP request headers.
    [array]
  - `allowed_methods`: string[] — Allowed HTTP request methods.
    [array]
  - `allowed_origins`: string[] — Allowed origins.
    [array]
  - `max_age`: number — The maximum number of seconds the results of a preflight request can be cached.
- `custom_deny_message`: string — The custom error message shown to a user when they are denied access to the application.
- `custom_deny_url`: string — The custom URL a user is redirected to when they are denied access to the application.
- `domain`: string **required** — The domain and path that Access will secure.
- `eager_redirect_cookie_setting`: boolean default: `true` — Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain,
- `enable_binding_cookie`: boolean default: `false` — Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.
- `http_only_cookie_attribute`: boolean default: `true` — Enables the HttpOnly cookie attribute, which increases security against XSS attacks.
- `logo_url`: string — The image URL for the logo shown in the App Launcher dashboard.
- `name`: string — The name of the application.
- `options_preflight_bypass`: boolean default: `false` — Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.
- `same_site_cookie_attribute`: string — Sets the SameSite cookie setting, which provides increased security against CSRF attacks.
- `service_auth_401_redirect`: boolean — Returns a 401 status code when the request is blocked by a Service Auth policy.
- `session_duration`: string default: `24h` — The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.
- `type`: string **required** — The application type.
- `use_clientless_isolation_app_launcher_url`: boolean default: `false` — Determines if users can access this application via a clientless browser isolation URL.

## POST /zones/{zone_id}/access/apps

Add an Access application

operationId: `zone-level-access-applications-add-a-bookmark-application`

**Request** (application/json)

(one of 8 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: string
- `id`: string — UUID.
- `scim_config`: object — Configuration for provisioning to this application via SCIM. This is currently in closed beta.
  - `authentication`: any
  - `deactivate_on_delete`: boolean — If false, we propagate DELETE requests to the target application for SCIM resources. If true, we only set `active` to false on the SCIM reso
  - `enabled`: boolean — Whether SCIM provisioning is turned on for this application.
  - `idp_uid`: string **required** — The UID of the IdP to use as the source for SCIM resources to provision to this application.
  - `mappings`: object[] — A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to b
    [array of]
    - `enabled`: boolean — Whether or not this mapping is enabled.
    - `filter`: string — A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned 
    - `operations`: object — Whether or not this mapping applies to creates, updates, or deletes.
    - `schema`: string **required** — Which SCIM resource type this mapping applies to.
    - `strictness`: string enum: `strict`, `passthrough` — The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ 
    - `transform_jsonata`: string — A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.
  - `remote_uri`: string **required** — The base URI for the application's SCIM-compatible API.
- `updated_at`: string
- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `app_launcher_visible`: boolean default: `true` — Displays the application in the App Launcher.
- `auto_redirect_to_identity`: boolean default: `false` — When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idp
- `cors_headers`: object
  - `allow_all_headers`: boolean — Allows all HTTP request headers.
  - `allow_all_methods`: boolean — Allows all HTTP request methods.
  - `allow_all_origins`: boolean — Allows all origins.
  - `allow_credentials`: boolean — When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.
  - `allowed_headers`: string[] — Allowed HTTP request headers.
    [array]
  - `allowed_methods`: string[] — Allowed HTTP request methods.
    [array]
  - `allowed_origins`: string[] — Allowed origins.
    [array]
  - `max_age`: number — The maximum number of seconds the results of a preflight request can be cached.
- `custom_deny_message`: string — The custom error message shown to a user when they are denied access to the application.
- `custom_deny_url`: string — The custom URL a user is redirected to when they are denied access to the application.
- `domain`: string **required** — The domain and path that Access will secure.
- `eager_redirect_cookie_setting`: boolean default: `true` — Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain,
- `enable_binding_cookie`: boolean default: `false` — Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.
- `http_only_cookie_attribute`: boolean default: `true` — Enables the HttpOnly cookie attribute, which increases security against XSS attacks.
- `logo_url`: string — The image URL for the logo shown in the App Launcher dashboard.
- `name`: string — The name of the application.
- `options_preflight_bypass`: boolean default: `false` — Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.
- `same_site_cookie_attribute`: string — Sets the SameSite cookie setting, which provides increased security against CSRF attacks.
- `service_auth_401_redirect`: boolean — Returns a 401 status code when the request is blocked by a Service Auth policy.
- `session_duration`: string default: `24h` — The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.
- `type`: string **required** — The application type.
- `use_clientless_isolation_app_launcher_url`: boolean default: `false` — Determines if users can access this application via a clientless browser isolation URL.

**Response** 201 → `result`

(one of 8 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: string
- `id`: string — UUID.
- `scim_config`: object — Configuration for provisioning to this application via SCIM. This is currently in closed beta.
  - `authentication`: any
  - `deactivate_on_delete`: boolean — If false, we propagate DELETE requests to the target application for SCIM resources. If true, we only set `active` to false on the SCIM reso
  - `enabled`: boolean — Whether SCIM provisioning is turned on for this application.
  - `idp_uid`: string **required** — The UID of the IdP to use as the source for SCIM resources to provision to this application.
  - `mappings`: object[] — A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to b
    [array of]
    - `enabled`: boolean — Whether or not this mapping is enabled.
    - `filter`: string — A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned 
    - `operations`: object — Whether or not this mapping applies to creates, updates, or deletes.
    - `schema`: string **required** — Which SCIM resource type this mapping applies to.
    - `strictness`: string enum: `strict`, `passthrough` — The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ 
    - `transform_jsonata`: string — A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.
  - `remote_uri`: string **required** — The base URI for the application's SCIM-compatible API.
- `updated_at`: string
- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `app_launcher_visible`: boolean default: `true` — Displays the application in the App Launcher.
- `auto_redirect_to_identity`: boolean default: `false` — When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idp
- `cors_headers`: object
  - `allow_all_headers`: boolean — Allows all HTTP request headers.
  - `allow_all_methods`: boolean — Allows all HTTP request methods.
  - `allow_all_origins`: boolean — Allows all origins.
  - `allow_credentials`: boolean — When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.
  - `allowed_headers`: string[] — Allowed HTTP request headers.
    [array]
  - `allowed_methods`: string[] — Allowed HTTP request methods.
    [array]
  - `allowed_origins`: string[] — Allowed origins.
    [array]
  - `max_age`: number — The maximum number of seconds the results of a preflight request can be cached.
- `custom_deny_message`: string — The custom error message shown to a user when they are denied access to the application.
- `custom_deny_url`: string — The custom URL a user is redirected to when they are denied access to the application.
- `domain`: string **required** — The domain and path that Access will secure.
- `eager_redirect_cookie_setting`: boolean default: `true` — Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain,
- `enable_binding_cookie`: boolean default: `false` — Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.
- `http_only_cookie_attribute`: boolean default: `true` — Enables the HttpOnly cookie attribute, which increases security against XSS attacks.
- `logo_url`: string — The image URL for the logo shown in the App Launcher dashboard.
- `name`: string — The name of the application.
- `options_preflight_bypass`: boolean default: `false` — Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.
- `same_site_cookie_attribute`: string — Sets the SameSite cookie setting, which provides increased security against CSRF attacks.
- `service_auth_401_redirect`: boolean — Returns a 401 status code when the request is blocked by a Service Auth policy.
- `session_duration`: string default: `24h` — The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.
- `type`: string **required** — The application type.
- `use_clientless_isolation_app_launcher_url`: boolean default: `false` — Determines if users can access this application via a clientless browser isolation URL.

## DELETE /zones/{zone_id}/access/apps/{app_id}

Delete an Access application

operationId: `zone-level-access-applications-delete-an-access-application`

**Response** 202 → `result`

- `id`: string — UUID.

## GET /zones/{zone_id}/access/apps/{app_id}

Get an Access application

operationId: `zone-level-access-applications-get-an-access-application`

**Response** 200 → `result`

(one of 8 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: string
- `id`: string — UUID.
- `scim_config`: object — Configuration for provisioning to this application via SCIM. This is currently in closed beta.
  - `authentication`: any
  - `deactivate_on_delete`: boolean — If false, we propagate DELETE requests to the target application for SCIM resources. If true, we only set `active` to false on the SCIM reso
  - `enabled`: boolean — Whether SCIM provisioning is turned on for this application.
  - `idp_uid`: string **required** — The UID of the IdP to use as the source for SCIM resources to provision to this application.
  - `mappings`: object[] — A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to b
    [array of]
    - `enabled`: boolean — Whether or not this mapping is enabled.
    - `filter`: string — A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned 
    - `operations`: object — Whether or not this mapping applies to creates, updates, or deletes.
    - `schema`: string **required** — Which SCIM resource type this mapping applies to.
    - `strictness`: string enum: `strict`, `passthrough` — The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ 
    - `transform_jsonata`: string — A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.
  - `remote_uri`: string **required** — The base URI for the application's SCIM-compatible API.
- `updated_at`: string
- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `app_launcher_visible`: boolean default: `true` — Displays the application in the App Launcher.
- `auto_redirect_to_identity`: boolean default: `false` — When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idp
- `cors_headers`: object
  - `allow_all_headers`: boolean — Allows all HTTP request headers.
  - `allow_all_methods`: boolean — Allows all HTTP request methods.
  - `allow_all_origins`: boolean — Allows all origins.
  - `allow_credentials`: boolean — When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.
  - `allowed_headers`: string[] — Allowed HTTP request headers.
    [array]
  - `allowed_methods`: string[] — Allowed HTTP request methods.
    [array]
  - `allowed_origins`: string[] — Allowed origins.
    [array]
  - `max_age`: number — The maximum number of seconds the results of a preflight request can be cached.
- `custom_deny_message`: string — The custom error message shown to a user when they are denied access to the application.
- `custom_deny_url`: string — The custom URL a user is redirected to when they are denied access to the application.
- `domain`: string **required** — The domain and path that Access will secure.
- `eager_redirect_cookie_setting`: boolean default: `true` — Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain,
- `enable_binding_cookie`: boolean default: `false` — Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.
- `http_only_cookie_attribute`: boolean default: `true` — Enables the HttpOnly cookie attribute, which increases security against XSS attacks.
- `logo_url`: string — The image URL for the logo shown in the App Launcher dashboard.
- `name`: string — The name of the application.
- `options_preflight_bypass`: boolean default: `false` — Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.
- `same_site_cookie_attribute`: string — Sets the SameSite cookie setting, which provides increased security against CSRF attacks.
- `service_auth_401_redirect`: boolean — Returns a 401 status code when the request is blocked by a Service Auth policy.
- `session_duration`: string default: `24h` — The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.
- `type`: string **required** — The application type.
- `use_clientless_isolation_app_launcher_url`: boolean default: `false` — Determines if users can access this application via a clientless browser isolation URL.

## PUT /zones/{zone_id}/access/apps/{app_id}

Update an Access application

operationId: `zone-level-access-applications-update-a-bookmark-application`

**Request** (application/json)

(one of 8 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: string
- `id`: string — UUID.
- `scim_config`: object — Configuration for provisioning to this application via SCIM. This is currently in closed beta.
  - `authentication`: any
  - `deactivate_on_delete`: boolean — If false, we propagate DELETE requests to the target application for SCIM resources. If true, we only set `active` to false on the SCIM reso
  - `enabled`: boolean — Whether SCIM provisioning is turned on for this application.
  - `idp_uid`: string **required** — The UID of the IdP to use as the source for SCIM resources to provision to this application.
  - `mappings`: object[] — A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to b
    [array of]
    - `enabled`: boolean — Whether or not this mapping is enabled.
    - `filter`: string — A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned 
    - `operations`: object — Whether or not this mapping applies to creates, updates, or deletes.
    - `schema`: string **required** — Which SCIM resource type this mapping applies to.
    - `strictness`: string enum: `strict`, `passthrough` — The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ 
    - `transform_jsonata`: string — A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.
  - `remote_uri`: string **required** — The base URI for the application's SCIM-compatible API.
- `updated_at`: string
- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `app_launcher_visible`: boolean default: `true` — Displays the application in the App Launcher.
- `auto_redirect_to_identity`: boolean default: `false` — When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idp
- `cors_headers`: object
  - `allow_all_headers`: boolean — Allows all HTTP request headers.
  - `allow_all_methods`: boolean — Allows all HTTP request methods.
  - `allow_all_origins`: boolean — Allows all origins.
  - `allow_credentials`: boolean — When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.
  - `allowed_headers`: string[] — Allowed HTTP request headers.
    [array]
  - `allowed_methods`: string[] — Allowed HTTP request methods.
    [array]
  - `allowed_origins`: string[] — Allowed origins.
    [array]
  - `max_age`: number — The maximum number of seconds the results of a preflight request can be cached.
- `custom_deny_message`: string — The custom error message shown to a user when they are denied access to the application.
- `custom_deny_url`: string — The custom URL a user is redirected to when they are denied access to the application.
- `domain`: string **required** — The domain and path that Access will secure.
- `eager_redirect_cookie_setting`: boolean default: `true` — Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain,
- `enable_binding_cookie`: boolean default: `false` — Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.
- `http_only_cookie_attribute`: boolean default: `true` — Enables the HttpOnly cookie attribute, which increases security against XSS attacks.
- `logo_url`: string — The image URL for the logo shown in the App Launcher dashboard.
- `name`: string — The name of the application.
- `options_preflight_bypass`: boolean default: `false` — Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.
- `same_site_cookie_attribute`: string — Sets the SameSite cookie setting, which provides increased security against CSRF attacks.
- `service_auth_401_redirect`: boolean — Returns a 401 status code when the request is blocked by a Service Auth policy.
- `session_duration`: string default: `24h` — The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.
- `type`: string **required** — The application type.
- `use_clientless_isolation_app_launcher_url`: boolean default: `false` — Determines if users can access this application via a clientless browser isolation URL.

**Response** 200 → `result`

(one of 8 variants; showing the first)
- `aud`: string — Audience tag.
- `created_at`: string
- `id`: string — UUID.
- `scim_config`: object — Configuration for provisioning to this application via SCIM. This is currently in closed beta.
  - `authentication`: any
  - `deactivate_on_delete`: boolean — If false, we propagate DELETE requests to the target application for SCIM resources. If true, we only set `active` to false on the SCIM reso
  - `enabled`: boolean — Whether SCIM provisioning is turned on for this application.
  - `idp_uid`: string **required** — The UID of the IdP to use as the source for SCIM resources to provision to this application.
  - `mappings`: object[] — A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to b
    [array of]
    - `enabled`: boolean — Whether or not this mapping is enabled.
    - `filter`: string — A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned 
    - `operations`: object — Whether or not this mapping applies to creates, updates, or deletes.
    - `schema`: string **required** — Which SCIM resource type this mapping applies to.
    - `strictness`: string enum: `strict`, `passthrough` — The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ 
    - `transform_jsonata`: string — A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.
  - `remote_uri`: string **required** — The base URI for the application's SCIM-compatible API.
- `updated_at`: string
- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `allowed_idps`: string[] — The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.
  [array]
- `app_launcher_visible`: boolean default: `true` — Displays the application in the App Launcher.
- `auto_redirect_to_identity`: boolean default: `false` — When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idp
- `cors_headers`: object
  - `allow_all_headers`: boolean — Allows all HTTP request headers.
  - `allow_all_methods`: boolean — Allows all HTTP request methods.
  - `allow_all_origins`: boolean — Allows all origins.
  - `allow_credentials`: boolean — When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.
  - `allowed_headers`: string[] — Allowed HTTP request headers.
    [array]
  - `allowed_methods`: string[] — Allowed HTTP request methods.
    [array]
  - `allowed_origins`: string[] — Allowed origins.
    [array]
  - `max_age`: number — The maximum number of seconds the results of a preflight request can be cached.
- `custom_deny_message`: string — The custom error message shown to a user when they are denied access to the application.
- `custom_deny_url`: string — The custom URL a user is redirected to when they are denied access to the application.
- `domain`: string **required** — The domain and path that Access will secure.
- `eager_redirect_cookie_setting`: boolean default: `true` — Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain,
- `enable_binding_cookie`: boolean default: `false` — Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.
- `http_only_cookie_attribute`: boolean default: `true` — Enables the HttpOnly cookie attribute, which increases security against XSS attacks.
- `logo_url`: string — The image URL for the logo shown in the App Launcher dashboard.
- `name`: string — The name of the application.
- `options_preflight_bypass`: boolean default: `false` — Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.
- `same_site_cookie_attribute`: string — Sets the SameSite cookie setting, which provides increased security against CSRF attacks.
- `service_auth_401_redirect`: boolean — Returns a 401 status code when the request is blocked by a Service Auth policy.
- `session_duration`: string default: `24h` — The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.
- `type`: string **required** — The application type.
- `use_clientless_isolation_app_launcher_url`: boolean default: `false` — Determines if users can access this application via a clientless browser isolation URL.

## POST /zones/{zone_id}/access/apps/{app_id}/revoke_tokens

Revoke application tokens

operationId: `zone-level-access-applications-revoke-service-tokens`

**Response** 202 → `result`

object

## PATCH /zones/{zone_id}/access/apps/{app_id}/settings

Update application settings

operationId: `zone-level-access-applications-patch-update-access-application-settings`

**Request** (application/json)

- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.

**Response** 202 → `result`

- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.

## PUT /zones/{zone_id}/access/apps/{app_id}/settings

Update application settings

operationId: `zone-level-access-applications-put-update-access-application-settings`

**Request** (application/json)

- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.

**Response** 202 → `result`

- `allow_iframe`: boolean — Enables loading application content in an iFrame.
- `skip_interstitial`: boolean — Enables automatic authentication through cloudflared.

## GET /zones/{zone_id}/access/apps/{app_id}/user_policy_checks

Test Access policies

operationId: `zone-level-access-applications-test-access-policies`

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
