# Access custom pages

6 endpoints.

## GET /accounts/{account_id}/access/custom_pages

List custom pages

operationId: `access-custom-pages-list-custom-pages` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `app_count`: integer — Number of apps the custom page is assigned to.
- `contract_version`: integer — Contract version of the page's Liquid template. Present (>= 1) marks a sanitized template; absent or 0 marks a legacy page served verbatim.
- `created_at`: any
- `name`: string **required** — Custom page name.
- `type`: string **required** enum: `identity_denied`, `forbidden`, `login`, `interstitial` — Custom page type.
- `uid`: string — UUID.
- `updated_at`: any
- `warnings`: object[] — Advisory validation findings returned when creating or updating a template. Omitted when empty.
  [array of]
  - `message`: string **required** — Human-readable description of the finding.
  - `ref`: string — Optional pointer to the part of the template the finding refers to.
  - `tier`: string **required** — The validation tier that produced the finding (e.g. html, liquid).

## POST /accounts/{account_id}/access/custom_pages

Create a custom page

operationId: `access-custom-pages-create-a-custom-page`

**Request** (application/json)

- `app_count`: integer — Number of apps the custom page is assigned to.
- `contract_version`: integer — Contract version of the page's Liquid template. Present (>= 1) marks a sanitized template; absent or 0 marks a legacy page served verbatim.
- `created_at`: any
- `custom_html`: string **required** — Custom page HTML.
- `name`: string **required** — Custom page name.
- `type`: string **required** enum: `identity_denied`, `forbidden`, `login`, `interstitial` — Custom page type.
- `uid`: string — UUID.
- `updated_at`: any

**Response** 201 → `result`

- `app_count`: integer — Number of apps the custom page is assigned to.
- `contract_version`: integer — Contract version of the page's Liquid template. Present (>= 1) marks a sanitized template; absent or 0 marks a legacy page served verbatim.
- `created_at`: any
- `name`: string **required** — Custom page name.
- `type`: string **required** enum: `identity_denied`, `forbidden`, `login`, `interstitial` — Custom page type.
- `uid`: string — UUID.
- `updated_at`: any
- `warnings`: object[] — Advisory validation findings returned when creating or updating a template. Omitted when empty.
  [array of]
  - `message`: string **required** — Human-readable description of the finding.
  - `ref`: string — Optional pointer to the part of the template the finding refers to.
  - `tier`: string **required** — The validation tier that produced the finding (e.g. html, liquid).

## DELETE /accounts/{account_id}/access/custom_pages/{custom_page_id}

Delete a custom page

operationId: `access-custom-pages-delete-a-custom-page`

**Response** 202 → `result`

- `id`: string — UUID.

## GET /accounts/{account_id}/access/custom_pages/{custom_page_id}

Get a custom page

operationId: `access-custom-pages-get-a-custom-page`

**Response** 200 → `result`

- `app_count`: integer — Number of apps the custom page is assigned to.
- `contract_version`: integer — Contract version of the page's Liquid template. Present (>= 1) marks a sanitized template; absent or 0 marks a legacy page served verbatim.
- `created_at`: any
- `custom_html`: string **required** — Custom page HTML.
- `name`: string **required** — Custom page name.
- `type`: string **required** enum: `identity_denied`, `forbidden`, `login`, `interstitial` — Custom page type.
- `uid`: string — UUID.
- `updated_at`: any

## PUT /accounts/{account_id}/access/custom_pages/{custom_page_id}

Update a custom page

operationId: `access-custom-pages-update-a-custom-page`

**Request** (application/json)

- `app_count`: integer — Number of apps the custom page is assigned to.
- `contract_version`: integer — Contract version of the page's Liquid template. Present (>= 1) marks a sanitized template; absent or 0 marks a legacy page served verbatim.
- `created_at`: any
- `custom_html`: string **required** — Custom page HTML.
- `name`: string **required** — Custom page name.
- `type`: string **required** enum: `identity_denied`, `forbidden`, `login`, `interstitial` — Custom page type.
- `uid`: string — UUID.
- `updated_at`: any

**Response** 200 → `result`

- `app_count`: integer — Number of apps the custom page is assigned to.
- `contract_version`: integer — Contract version of the page's Liquid template. Present (>= 1) marks a sanitized template; absent or 0 marks a legacy page served verbatim.
- `created_at`: any
- `name`: string **required** — Custom page name.
- `type`: string **required** enum: `identity_denied`, `forbidden`, `login`, `interstitial` — Custom page type.
- `uid`: string — UUID.
- `updated_at`: any
- `warnings`: object[] — Advisory validation findings returned when creating or updating a template. Omitted when empty.
  [array of]
  - `message`: string **required** — Human-readable description of the finding.
  - `ref`: string — Optional pointer to the part of the template the finding refers to.
  - `tier`: string **required** — The validation tier that produced the finding (e.g. html, liquid).

## POST /accounts/{account_id}/access/custom_pages/validate

Validate a custom page template

operationId: `access-custom-pages-validate-a-custom-page-template`

**Request** (application/json)

- `template`: string **required** — The Liquid template to validate.
- `type`: string **required** enum: `identity_denied`, `forbidden`, `login`, `interstitial` — Custom page type.
- `version`: integer — Contract version to validate against; omit for the latest.

**Response** 200 → `result`

- `errors`: object[] **required** — Blocking findings; a non-empty list means the template cannot be published.
  [array of]
  - `message`: string **required** — Human-readable description of the finding.
  - `ref`: string — Optional pointer to the part of the template the finding refers to.
  - `tier`: string **required** — The validation tier that produced the finding (e.g. html, liquid).
- `page_type`: string **required** enum: `identity_denied`, `forbidden`, `login`, `interstitial` — Custom page type.
- `version`: integer **required** — The contract version the template was validated against.
- `warnings`: object[] **required** — Advisory findings that do not block publishing.
  [array of]
  - `message`: string **required** — Human-readable description of the finding.
  - `ref`: string — Optional pointer to the part of the template the finding refers to.
  - `tier`: string **required** — The validation tier that produced the finding (e.g. html, liquid).
