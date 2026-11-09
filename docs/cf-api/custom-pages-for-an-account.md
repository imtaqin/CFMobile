# Custom pages for an account

4 endpoints.

## GET /accounts/{account_id}/custom_pages

List custom pages

operationId: `custom-pages-for-an-account-list-custom-pages`

**Response** 200 → `result`

[array of]
- `created_on`: string
- `description`: string
- `id`: string
- `modified_on`: string
- `preview_target`: string
- `required_tokens`: string[]
  [array]
- `state`: string enum: `default`, `customized` — The custom page state.
- `url`: string default: `` — The URL associated with the custom page.

## GET /accounts/{account_id}/custom_pages/{identifier}

Get a custom page

operationId: `custom-pages-for-an-account-get-a-custom-page`

**Response** 200 → `result`

- `created_on`: string
- `description`: string
- `id`: string
- `modified_on`: string
- `preview_target`: string
- `required_tokens`: string[]
  [array]
- `state`: string enum: `default`, `customized` — The custom page state.
- `url`: string default: `` — The URL associated with the custom page.

## PUT /accounts/{account_id}/custom_pages/{identifier}

Update a custom page

operationId: `custom-pages-for-an-account-update-a-custom-page`

**Request** (application/json)

- `state`: string **required** enum: `default`, `customized` — The custom page state.
- `url`: string **required** default: `` — The URL associated with the custom page.

**Response** 200 → `result`

- `created_on`: string
- `description`: string
- `id`: string
- `modified_on`: string
- `preview_target`: string
- `required_tokens`: string[]
  [array]
- `state`: string enum: `default`, `customized` — The custom page state.
- `url`: string default: `` — The URL associated with the custom page.

## POST /accounts/{account_id}/custom_pages/preview_tokens

Create a preview token

operationId: `custom-pages-for-an-account-create-preview-token`

**Request** (application/json)

- `act`: string **required** — The preview action type. Required for request parsing but not used in token generation. Typically set to "preview".
- `target`: string **required** — The target custom page type to preview (e.g. "block:waf"). Encoded as the "endpoint" claim in the resulting JWT.
- `url`: string **required** — The URL of the custom page content to preview. Encoded as the "zone" claim in the resulting JWT.

**Response** 200 → `result`

- `cep_jwt`: string **required** — A signed JWT token used to authenticate the preview request.
