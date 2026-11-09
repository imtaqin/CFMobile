# ppu_pricing

5 endpoints.

## GET /accounts/{account_id}/pay-per-use/proposals

List pay-per-use price proposals

operationId: `pay-per-crawl.listPPUProposals` · query: `page`, `per_page`

**Response** 200 → `result`

- `proposals`: object[] **required**
  [array of]
  - `created_at`: string **required**
  - `non_billable_since`: string **required** — When the proposing publisher zone was classified for local-only, non-billable settlement. Null for billable zones.
  - `price_id`: integer **required** — Use this value to accept or reject this specific pending proposal.
  - `price_usd_microcents`: integer **required**
  - `zone_name`: string

## POST /accounts/{account_id}/pay-per-use/proposals

Decide a pay-per-use price proposal

operationId: `pay-per-crawl.postPPUProposalDecision`

**Request** (application/json)

- `action`: string **required** enum: `accept`, `reject`
- `price_id`: integer **required** — Pending pay-per-use price id returned in the operator proposal queue.

**Response** 200 → `result`

- `created_at`: string **required**
- `effective_at`: string — The first accepted price is effective from the start of the current UTC day. A replacement becomes effective at the start of the next UTC da
- `expires_at`: string — The exclusive per-agreement expiration timestamp. Publisher opt-out schedules it for the start of the next UTC month. When an active price i
- `price_usd_microcents`: integer **required** — Price in microcents. 1 USD = 100,000,000 microcents.
- `status`: string **required** enum: `proposed`, `accepted`, `rejected`

## GET /zones/{zone_id}/pay-per-use/operators

List pay-per-use operators

operationId: `pay-per-crawl.listPPUOperators` · query: `page`, `per_page`

**Response** 200 → `result`

- `operators`: object[] **required**
  [array of]
  - `current_price`: any — Accepted price active at the current time.
  - `default_price_usd_microcents`: integer **required**
  - `name`: string **required**
  - `non_billable_since`: string **required** — When this operator was classified for local-only, non-billable settlement. Null for billable operators. Always matches the requesting zone's
  - `operator_id`: string **required** — Stable pay-per-use operator identifier.
  - `proposed_price`: any — Price proposal awaiting operator acceptance.
  - `scheduled_price`: any — Accepted replacement with a future effective_at.

## DELETE /zones/{zone_id}/pay-per-use/operators/{operator_id}/price

Opt out of a pay-per-use operator price

operationId: `pay-per-crawl.deletePPUPublisherPrice`

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

## POST /zones/{zone_id}/pay-per-use/operators/{operator_id}/price

Set a pay-per-use operator price

operationId: `pay-per-crawl.postPPUPublisherPriceAction`

**Request** (application/json)

(one of 4 variants; showing the first)
- `action`: string **required** enum: `propose`
- `price_usd_microcents`: integer **required** — Price in microcents. Must be a multiple of 100,000 ($0.001) between $0.001 and $9,999.999.

**Response** 200 → `result`

- `created_at`: string **required**
- `effective_at`: string — The first accepted price is effective from the start of the current UTC day. A replacement becomes effective at the start of the next UTC da
- `expires_at`: string — The exclusive per-agreement expiration timestamp. Publisher opt-out schedules it for the start of the next UTC month. When an active price i
- `price_usd_microcents`: integer **required** — Price in microcents. 1 USD = 100,000,000 microcents.
- `status`: string **required** enum: `proposed`, `accepted`, `rejected`
