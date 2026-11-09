# Access identity providers

12 endpoints.

## GET /accounts/{account_id}/access/identity_providers

List Access identity providers

operationId: `access-identity-providers-list-access-identity-providers` · query: `scim_enabled`, `page`, `per_page`

**Response** 200 → `result`

[array of]
(one of 17 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `read_only`: boolean — Indicates that the identity provider is immutable and cannot be updated or deleted via the API.
- `saml_certificate_set`: any — The SAML encryption certificate set details, including current and previous certificates.
- `saml_certificate_set_id`: string — The UID of the SAML encryption certificate set assigned to this Identity Provider.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose th
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: object

## POST /accounts/{account_id}/access/identity_providers

Add an Access identity provider

operationId: `access-identity-providers-add-an-access-identity-provider`

**Request** (application/json)

(one of 17 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `read_only`: boolean — Indicates that the identity provider is immutable and cannot be updated or deleted via the API.
- `saml_certificate_set`: any — The SAML encryption certificate set details, including current and previous certificates.
- `saml_certificate_set_id`: string — The UID of the SAML encryption certificate set assigned to this Identity Provider.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose th
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: object

**Response** 201 → `result`

(one of 17 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `read_only`: boolean — Indicates that the identity provider is immutable and cannot be updated or deleted via the API.
- `saml_certificate_set`: any — The SAML encryption certificate set details, including current and previous certificates.
- `saml_certificate_set_id`: string — The UID of the SAML encryption certificate set assigned to this Identity Provider.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose th
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: object

## DELETE /accounts/{account_id}/access/identity_providers/{identity_provider_id}

Delete an Access identity provider

operationId: `access-identity-providers-delete-an-access-identity-provider`

**Response** 202 → `result`

- `id`: string — UUID.

## GET /accounts/{account_id}/access/identity_providers/{identity_provider_id}

Get an Access identity provider

operationId: `access-identity-providers-get-an-access-identity-provider`

**Response** 200 → `result`

(one of 17 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `read_only`: boolean — Indicates that the identity provider is immutable and cannot be updated or deleted via the API.
- `saml_certificate_set`: any — The SAML encryption certificate set details, including current and previous certificates.
- `saml_certificate_set_id`: string — The UID of the SAML encryption certificate set assigned to this Identity Provider.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose th
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: object

## PUT /accounts/{account_id}/access/identity_providers/{identity_provider_id}

Update an Access identity provider

operationId: `access-identity-providers-update-an-access-identity-provider`

**Request** (application/json)

(one of 17 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `read_only`: boolean — Indicates that the identity provider is immutable and cannot be updated or deleted via the API.
- `saml_certificate_set`: any — The SAML encryption certificate set details, including current and previous certificates.
- `saml_certificate_set_id`: string — The UID of the SAML encryption certificate set assigned to this Identity Provider.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose th
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: object

**Response** 200 → `result`

(one of 17 variants; showing the first)
- `config`: object **required** — The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer doc
- `id`: string — UUID.
- `name`: string **required** — The name of the identity provider, shown to users on the login page.
- `read_only`: boolean — Indicates that the identity provider is immutable and cannot be updated or deleted via the API.
- `saml_certificate_set`: any — The SAML encryption certificate set details, including current and previous certificates.
- `saml_certificate_set_id`: string — The UID of the SAML encryption certificate set assigned to this Identity Provider.
- `scim_config`: object — The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.
  - `enabled`: boolean default: `false` — A flag to enable or disable SCIM for the identity provider.
  - `identity_update_behavior`: string enum: `automatic`, `reauth`, `no_action` default: `no_action` — Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and
  - `scim_base_url`: string — The base URL of Cloudflare's SCIM V2.0 API endpoint.
  - `seat_deprovision`: boolean default: `false` — A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user
  - `secret`: string — A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose th
  - `user_deprovision`: boolean default: `false` — A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.
- `type`: string **required** enum: `onetimepin`, `azureAD`, `saml`, `centrify`, `facebook`, `github`, `google-apps`, `google` — The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.clo
- `config`: object

## POST /accounts/{account_id}/access/identity_providers/{identity_provider_id}/saml_certificate

Create SAML encryption certificate for Identity Provider

operationId: `access-identity-providers-create-saml-certificate-for-identity-provider`

**Response** 200 → `result`

- `created_at`: string **required** — Timestamp when the certificate set was created
- `current_certificate`: any — The currently active certificate used for encrypting SAML assertions
- `previous_certificate`: object — The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_
- `uid`: string **required** — Unique identifier for the certificate set
- `updated_at`: string **required** — Timestamp when the certificate set was last updated (e.g., during rotation)

## GET /accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/groups

List SCIM Group resources

operationId: `access-identity-providers-list-scim-group-resources` · query: `cf_resource_id`, `idp_resource_id`, `name`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `displayName`: string — The display name of the SCIM Group resource.
- `externalId`: string — The IdP-generated Id of the SCIM resource.
- `id`: string — The unique Cloudflare-generated Id of the SCIM resource.
- `meta`: object — The metadata of the SCIM resource.
  - `created`: string — The timestamp of when the SCIM resource was created.
  - `lastModified`: string — The timestamp of when the SCIM resource was last modified.
- `schemas`: string[] — The list of URIs which indicate the attributes contained within a SCIM resource.
  [array]

## DELETE /accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/groups/{group_id}

Delete a SCIM Group resource

operationId: `access-identity-providers-delete-scim-group-resource`

## GET /accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/groups/{group_id}

Get a SCIM Group resource

operationId: `access-identity-providers-get-scim-group-resource`

**Response** 200 → `result`

- `displayName`: string — The display name of the SCIM Group resource.
- `externalId`: string — The IdP-generated Id of the SCIM resource.
- `id`: string — The unique Cloudflare-generated Id of the SCIM resource.
- `members`: object[] — The direct members of the SCIM Group resource.
  [array of]
  - `$ref`: string — The URI of the member resource.
  - `display`: string — The display name of the member resource.
  - `type`: string enum: `User`, `Group` — The SCIM resource type of the member.
  - `value`: string **required** — The unique Cloudflare-generated Id of the member resource.
- `meta`: object — The metadata of the SCIM resource.
  - `created`: string — The timestamp of when the SCIM resource was created.
  - `lastModified`: string — The timestamp of when the SCIM resource was last modified.
- `schemas`: string[] — The list of URIs which indicate the attributes contained within a SCIM resource.
  [array]

## GET /accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/users

List SCIM User resources

operationId: `access-identity-providers-list-scim-user-resources` · query: `cf_resource_id`, `idp_resource_id`, `username`, `email`, `name`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `active`: boolean — Determines the status of the SCIM User resource.
- `displayName`: string — The name of the SCIM User resource.
- `emails`: object[]
  [array of]
  - `primary`: boolean — Indicates if the email address is the primary email belonging to the SCIM User resource.
  - `type`: string — Indicates the type of the email address.
  - `value`: string — The email address of the SCIM User resource.
- `externalId`: string — The IdP-generated Id of the SCIM resource.
- `id`: string — The unique Cloudflare-generated Id of the SCIM resource.
- `meta`: object — The metadata of the SCIM resource.
  - `created`: string — The timestamp of when the SCIM resource was created.
  - `lastModified`: string — The timestamp of when the SCIM resource was last modified.
- `schemas`: string[] — The list of URIs which indicate the attributes contained within a SCIM resource.
  [array]

## DELETE /accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/users/{user_id}

Delete a SCIM User resource

operationId: `access-identity-providers-delete-scim-user-resource`

## GET /accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/users/{user_id}

Get a SCIM User resource

operationId: `access-identity-providers-get-scim-user-resource`

**Response** 200 → `result`

- `active`: boolean — Determines the status of the SCIM User resource.
- `displayName`: string — The name of the SCIM User resource.
- `emails`: object[]
  [array of]
  - `primary`: boolean — Indicates if the email address is the primary email belonging to the SCIM User resource.
  - `type`: string — Indicates the type of the email address.
  - `value`: string — The email address of the SCIM User resource.
- `externalId`: string — The IdP-generated Id of the SCIM resource.
- `id`: string — The unique Cloudflare-generated Id of the SCIM resource.
- `meta`: object — The metadata of the SCIM resource.
  - `created`: string — The timestamp of when the SCIM resource was created.
  - `lastModified`: string — The timestamp of when the SCIM resource was last modified.
- `schemas`: string[] — The list of URIs which indicate the attributes contained within a SCIM resource.
  [array]
