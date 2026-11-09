# Zone-Level Access identity providers

5 endpoints.

## GET /zones/{zone_id}/access/identity_providers

List Access identity providers

operationId: `zone-level-access-identity-providers-list-access-identity-providers`

**Response** 200 → `result`

[array of]
(one of 16 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests. If you lose thi
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: any

## POST /zones/{zone_id}/access/identity_providers

Add an Access identity provider

operationId: `zone-level-access-identity-providers-add-an-access-identity-provider`

**Request** (application/json)

(one of 15 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests. If you lose thi
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: any

**Response** 201 → `result`

(one of 15 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests. If you lose thi
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: any

## DELETE /zones/{zone_id}/access/identity_providers/{identity_provider_id}

Delete an Access identity provider

operationId: `zone-level-access-identity-providers-delete-an-access-identity-provider`

**Response** 202 → `result`

- `id`: string — UUID.

## GET /zones/{zone_id}/access/identity_providers/{identity_provider_id}

Get an Access identity provider

operationId: `zone-level-access-identity-providers-get-an-access-identity-provider`

**Response** 200 → `result`

(one of 15 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests. If you lose thi
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: any

## PUT /zones/{zone_id}/access/identity_providers/{identity_provider_id}

Update an Access identity provider

operationId: `zone-level-access-identity-providers-update-an-access-identity-provider`

**Request** (application/json)

(one of 15 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests. If you lose thi
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: any

**Response** 200 → `result`

(one of 15 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests. If you lose thi
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: any
