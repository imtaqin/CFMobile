# ppu_configuration

7 endpoints.

## GET /accounts/{account_id}/pay-per-use/operator/configuration

Get pay-per-use operator configuration

operationId: `pay-per-crawl.getPPUOperatorConfiguration`

**Response** 200 → `result`

- `default_price_usd_microcents`: integer **required** — Default price in microcents. 1 USD = 100,000,000 microcents. Must be a multiple of 100,000 ($0.001) between $0.001 and $9,999.999.
- `enabled`: boolean **required**
- `name`: string **required**
- `non_billable_since`: string **required** — When this operator was classified for local-only, non-billable settlement. Null for billable operators. Immutable.

## PATCH /accounts/{account_id}/pay-per-use/operator/configuration

Update pay-per-use operator configuration

operationId: `pay-per-crawl.patchPPUOperatorConfiguration`

**Request** (application/json)

- `default_price_usd_microcents`: integer — Default price in microcents. 1 USD = 100,000,000 microcents. Must be a multiple of 100,000 ($0.001) between $0.001 and $9,999.999.
- `enabled`: boolean
- `name`: string

**Response** 200 → `result`

- `default_price_usd_microcents`: integer **required** — Default price in microcents. 1 USD = 100,000,000 microcents. Must be a multiple of 100,000 ($0.001) between $0.001 and $9,999.999.
- `enabled`: boolean **required**
- `name`: string **required**

## PUT /accounts/{account_id}/pay-per-use/operator/configuration

Set pay-per-use operator configuration

operationId: `pay-per-crawl.putPPUOperatorConfiguration`

**Request** (application/json)

- `default_price_usd_microcents`: integer **required** — Default price in microcents. 1 USD = 100,000,000 microcents. Must be a multiple of 100,000 ($0.001) between $0.001 and $9,999.999.
- `enabled`: boolean **required**
- `name`: string **required**

**Response** 200 → `result`

- `default_price_usd_microcents`: integer **required** — Default price in microcents. 1 USD = 100,000,000 microcents. Must be a multiple of 100,000 ($0.001) between $0.001 and $9,999.999.
- `enabled`: boolean **required**
- `name`: string **required**

## PATCH /accounts/{account_id}/pay-per-use/zones_can_be_enabled

Set pay-per-use zone eligibility

operationId: `pay-per-crawl.setPPUZonesCanBeEnabled`

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

## GET /zones/{zone_id}/pay-per-use/can_be_enabled

Get pay-per-use zone eligibility

operationId: `pay-per-crawl.getPPUZoneCanBeEnabled`

**Response** 200 → `result`

- `can_be_enabled`: boolean **required**
- `disabled_at`: string **required** — The start of the current disabled period after an enabled zone is disabled directly or by eligibility revocation. Null before the first disa
- `enabled`: boolean **required**
- `expires_at`: string **required** — The exclusive end of the zone-level grace period. Existing agreements remain usable until this time while the zone is disabled. Null while e
- `id`: string **required**
- `non_billable_since`: string **required** — When this zone was classified for local-only, non-billable settlement. Null for billable or unconfigured zones. Immutable.

## GET /zones/{zone_id}/pay-per-use/configuration

Get pay-per-use zone configuration

operationId: `pay-per-crawl.getPPUZoneConfiguration`

**Response** 200 → `result`

- `can_be_enabled`: boolean **required**
- `disabled_at`: string **required** — The start of the current disabled period after an enabled zone is disabled directly or by eligibility revocation. Null before the first disa
- `enabled`: boolean **required**
- `expires_at`: string **required** — The exclusive end of the zone-level grace period. Existing agreements remain usable until this time while the zone is disabled. Null while e
- `non_billable_since`: string **required** — When this zone was classified for local-only, non-billable settlement. Null for billable or unconfigured zones. Immutable.

## PATCH /zones/{zone_id}/pay-per-use/configuration

Update pay-per-use zone configuration

operationId: `pay-per-crawl.patchPPUZoneConfiguration`

**Request** (application/json)

- `enabled`: boolean

**Response** 200 → `result`

- `can_be_enabled`: boolean **required**
- `disabled_at`: string **required** — The start of the current disabled period after an enabled zone is disabled directly or by eligibility revocation. Null before the first disa
- `enabled`: boolean **required**
- `expires_at`: string **required** — The exclusive end of the zone-level grace period. Existing agreements remain usable until this time while the zone is disabled. Null while e
