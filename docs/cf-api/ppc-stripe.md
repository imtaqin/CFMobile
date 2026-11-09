# ppc_stripe

6 endpoints.

## DELETE /accounts/{account_id}/pay-per-crawl/crawler/stripe

Deletes the stripe config for a crawler

operationId: `pay-per-crawl.crawlerDeleteStripeConfig`

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

## GET /accounts/{account_id}/pay-per-crawl/crawler/stripe

Gets the stripe config for a crawler

operationId: `pay-per-crawl.crawlerGetStripeConfig`

**Response** 200 → `result`

- `connect_status`: string
- `stripe_account_id`: string

## POST /accounts/{account_id}/pay-per-crawl/crawler/stripe

Creates the stripe config for a crawler

operationId: `pay-per-crawl.crawlerCreateStripeConfig`

**Response** 200 → `result`

- `url`: string

## DELETE /accounts/{account_id}/pay-per-crawl/publisher/stripe

Deletes the stripe config for a publisher

operationId: `pay-per-crawl.publisherDeleteStripeConfig`

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

## GET /accounts/{account_id}/pay-per-crawl/publisher/stripe

Gets the stripe config for a publisher

operationId: `pay-per-crawl.publisherGetStripeConfig`

**Response** 200 → `result`

- `connect_status`: string
- `stripe_account_id`: string

## POST /accounts/{account_id}/pay-per-crawl/publisher/stripe

Creates the stripe config for a publisher

operationId: `pay-per-crawl.publisherCreateStripeConfig`

**Response** 200 → `result`

- `url`: string
