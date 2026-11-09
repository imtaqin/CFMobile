# ppc_config

6 endpoints.

## PATCH /accounts/{account_id}/pay-per-crawl/zones_can_be_enabled

Set can_be_enabled setting on zones

operationId: `pay-per-crawl.setZonesCanBeEnabled`

**Request** (application/json)

- `zones`: object[] **required**
  [array of]
  - `can_be_enabled`: boolean
  - `id`: string **required**

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

## POST /accounts/{account_id}/pay-per-crawl/zones_can_be_enabled/query

Gets the can_be_enabled zone setting

operationId: `pay-per-crawl.queryZonesCanBeEnabled`

**Request** (application/json)

- `zones`: string[]
  [array]

**Response** 200 → `result`

- `zones`: object[]
  [array of]
  - `can_be_enabled`: boolean
  - `enabled`: boolean
  - `id`: string

## GET /zones/{zone_id}/pay-per-crawl/can_be_enabled

Get pay-per-crawl zone eligibility

operationId: `pay-per-crawl.getZoneCanBeEnabled`

**Response** 200 → `result`

- `can_be_enabled`: boolean
- `enabled`: boolean
- `id`: string

## GET /zones/{zone_id}/pay-per-crawl/configuration

Get the pay-per-crawl config

operationId: `pay-per-crawl.getConfig`

**Response** 200 → `result`

- `bot_overrides`: object
- `enabled`: boolean
- `price_usd_microcents`: integer — Price in microcents 1 USD = 100,000,000 microcents. Must be 0 or a multiple of 100,000 $0.001. Range: $0.001–$9,999.999.

## PATCH /zones/{zone_id}/pay-per-crawl/configuration

Changes pay-per-crawl config for a zone

operationId: `pay-per-crawl.patchConfig`

**Request** (application/json)

- `bot_overrides`: object
- `enabled`: boolean
- `price_usd_microcents`: integer — Price in microcents 1 USD = 100,000,000 microcents. Must be 0 or a multiple of 100,000 $0.001. Range: $0.001–$9,999.999.

**Response** 200 → `result`

- `bot_overrides`: object
- `enabled`: boolean
- `price_usd_microcents`: integer — Price in microcents 1 USD = 100,000,000 microcents. Must be 0 or a multiple of 100,000 $0.001. Range: $0.001–$9,999.999.

## POST /zones/{zone_id}/pay-per-crawl/configuration

Creates pay-per-crawl config for a zone

operationId: `pay-per-crawl.createConfig`

**Request** (application/json)

- `bot_overrides`: object
- `enabled`: boolean
- `price_usd_microcents`: integer — Price in microcents 1 USD = 100,000,000 microcents. Must be 0 or a multiple of 100,000 $0.001. Range: $0.001–$9,999.999.
object

**Response** 200 → `result`

- `bot_overrides`: object
- `enabled`: boolean
- `price_usd_microcents`: integer — Price in microcents 1 USD = 100,000,000 microcents. Must be 0 or a multiple of 100,000 $0.001. Range: $0.001–$9,999.999.
