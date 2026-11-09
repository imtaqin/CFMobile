# ppc_terms

4 endpoints.

## GET /accounts/{account_id}/pay-per-crawl/signature_link

Get signed pay-per-crawl terms link

operationId: `pay-per-crawl.getTermsSignatureLink`

**Response** 200 → `result`

- `link`: string

## GET /accounts/{account_id}/pay-per-crawl/terms

Get pay-per-crawl terms

operationId: `pay-per-crawl.getTerms`

**Response** 200 → `result`

- `body`: string
- `id`: string

## GET /accounts/{account_id}/pay-per-crawl/terms/signature

Get pay-per-crawl terms signature status

operationId: `pay-per-crawl.getTermsSignature` · query: `remote`

**Response** 200 → `result`

string

## POST /accounts/{account_id}/pay-per-crawl/terms/signature

Record pay-per-crawl terms activity

operationId: `pay-per-crawl.sendTermsSignatureEvent` · query: `event_type`, `vid`

**Response** 200 → `result`

- `errors`: object[]
  [array of]
  - `code`: integer
  - `documentation_url`: string
  - `error_chain`: object[]
    [array of]
    - `code`: integer
    - `documentation_url`: string
    - `error_chain`: object[]
    - `message`: string
    - `meta`: object — Meta object containing non-standard meta-information about the error.
    - `source`: object
  - `message`: string
  - `meta`: object — Meta object containing non-standard meta-information about the error.
  - `source`: object
    - `parameter`: string — Parameter is a string indicating which URI query parameter caused the error.
    - `parameter_value_index`: integer — ParameterPosition indicates position of parameter value which caused the error,
    - `pointer`: string[] — Pointer is a JSON Pointer [RFC6901] to the associated entity in the request document
- `messages`: object[]
  [array of]
  - `code`: integer
  - `documentation_url`: string
  - `error_chain`: object[]
    [array of]
    - `code`: integer
    - `documentation_url`: string
    - `error_chain`: object[]
    - `message`: string
    - `meta`: object — Meta object containing non-standard meta-information about the error.
    - `source`: object
  - `message`: string
  - `meta`: object — Meta object containing non-standard meta-information about the error.
  - `source`: object
    - `parameter`: string — Parameter is a string indicating which URI query parameter caused the error.
    - `parameter_value_index`: integer — ParameterPosition indicates position of parameter value which caused the error,
    - `pointer`: string[] — Pointer is a JSON Pointer [RFC6901] to the associated entity in the request document
- `result_info`: object
  - `count`: integer
  - `page`: integer
  - `per_page`: integer
  - `total_count`: integer
  - `total_pages`: integer — TotalPages is a pointer so that if TotalPages == 0 we return that there
- `success`: boolean
