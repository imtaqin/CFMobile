# Access identity providers

8 endpoints.

## GET /accounts/{account_id}/access/identity_providers

List Access identity providers

operationId: `access-identity-providers-list-access-identity-providers` · query: `scim_enabled`, `per_page`

## POST /accounts/{account_id}/access/identity_providers

Add an Access identity provider

operationId: `access-identity-providers-add-an-access-identity-provider`

## DELETE /accounts/{account_id}/access/identity_providers/{identity_provider_id}

Delete an Access identity provider

operationId: `access-identity-providers-delete-an-access-identity-provider`

## GET /accounts/{account_id}/access/identity_providers/{identity_provider_id}

Get an Access identity provider

operationId: `access-identity-providers-get-an-access-identity-provider`

## PUT /accounts/{account_id}/access/identity_providers/{identity_provider_id}

Update an Access identity provider

operationId: `access-identity-providers-update-an-access-identity-provider`

## POST /accounts/{account_id}/access/identity_providers/{identity_provider_id}/saml_certificate

Create SAML encryption certificate for Identity Provider

operationId: `access-identity-providers-create-saml-certificate-for-identity-provider`

## GET /accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/groups

List SCIM Group resources

operationId: `access-identity-providers-list-scim-group-resources` · query: `cf_resource_id`, `idp_resource_id`, `name`, `per_page`

## GET /accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/users

List SCIM User resources

operationId: `access-identity-providers-list-scim-user-resources` · query: `cf_resource_id`, `idp_resource_id`, `username`, `email`, `name`, `per_page`
