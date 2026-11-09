# api

4 endpoints.

## POST /v1/verify

Request domain connect validation

operationId: `postVerify`

**Request** (application/json)

- `domain`: string
- `hash`: string
- `sig`: string

## GET /v2/{domain}/settings

Provide settings if domain is served by Cloudflare

operationId: `getDomainSettings`

**Response** 200 → `result`

object

## GET /v2/domainTemplates/providers/{provider}/services/{service}

Serve a provider template

operationId: `getProviderTemplate` · query: `dump`

**Response** 200 → `result`

object

## GET /v2/provconf/{provider}/{service}/{account}

Serve a provider configuration

operationId: `getProviderConfiguration`

**Response** 200 → `result`

- `logo`: string
- `template`: object
- `template_spec`: object
  - `accountTags`: string[]
    [array]
  - `proxied`: boolean
  - `status`: integer
