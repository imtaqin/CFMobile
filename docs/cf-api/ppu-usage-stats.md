# ppu_usage_stats

2 endpoints.

## GET /accounts/{account_id}/pay-per-use/usage-stats

Get pay-per-use usage statistics

operationId: `pay-per-crawl.getPPUUsageStats` · query: `since`, `until`, `page`, `per_page`

**Response** 200 → `result`

- `buyers`: object[] **required** — Range-wide usage and gross value totals for the current buyer page, ordered by buyer name and operator ID.
  [array of]
  - `operator_id`: string **required** — Stable identifier for the buyer.
  - `operator_name`: string **required**
  - `total_price_usd_microcents`: integer **required** — Full gross value attributed to this buyer over the resolved range before the publisher revenue share.
  - `usage_count`: integer **required** — Number of reported usage events attributed to this buyer over the resolved range.
- `data`: object[] **required** — Sparse time-series data for buyers on the current page.
  [array of]
  - `operator_id`: string **required** — Stable identifier for the buyer represented by this data point.
  - `operator_name`: string **required**
  - `period_start`: string **required** — Inclusive start of the UTC hour or day represented by this data point.
  - `total_price_usd_microcents`: integer **required** — Full gross value of this data point in USD microcents before the publisher revenue share.
  - `usage_count`: integer **required**
- `interval`: string **required** enum: `hour`, `day` — UTC aggregation interval selected from the requested range duration.
- `last_updated_at`: string **required** — Time the latest included usage-report rollup run finished, or null before the first run completes.
- `since`: string **required** — Inclusive beginning of the resolved range after UTC interval alignment.
- `totals`: object **required**
  - `total_price_usd_microcents`: integer **required** — Full gross value of reported usage in USD microcents before the publisher revenue share. 1 USD = 100,000,000 microcents.
  - `usage_count`: integer **required** — Number of reported usage events in the selected window.
- `until`: string **required** — Exclusive end of the resolved range after UTC interval alignment.

## GET /zones/{zone_id}/pay-per-use/usage-stats

Get pay-per-use usage statistics for a zone

operationId: `pay-per-crawl.getPPUZoneUsageStats` · query: `since`, `until`, `page`, `per_page`

**Response** 200 → `result`

- `buyers`: object[] **required** — Range-wide usage and gross value totals for the current buyer page, ordered by buyer name and operator ID.
  [array of]
  - `operator_id`: string **required** — Stable identifier for the buyer.
  - `operator_name`: string **required**
  - `total_price_usd_microcents`: integer **required** — Full gross value attributed to this buyer over the resolved range before the publisher revenue share.
  - `usage_count`: integer **required** — Number of reported usage events attributed to this buyer over the resolved range.
- `data`: object[] **required** — Sparse time-series data for buyers on the current page.
  [array of]
  - `operator_id`: string **required** — Stable identifier for the buyer represented by this data point.
  - `operator_name`: string **required**
  - `period_start`: string **required** — Inclusive start of the UTC hour or day represented by this data point.
  - `total_price_usd_microcents`: integer **required** — Full gross value of this data point in USD microcents before the publisher revenue share.
  - `usage_count`: integer **required**
- `interval`: string **required** enum: `hour`, `day` — UTC aggregation interval selected from the requested range duration.
- `last_updated_at`: string **required** — Time the latest included usage-report rollup run finished, or null before the first run completes.
- `since`: string **required** — Inclusive beginning of the resolved range after UTC interval alignment.
- `totals`: object **required**
  - `total_price_usd_microcents`: integer **required** — Full gross value of reported usage in USD microcents before the publisher revenue share. 1 USD = 100,000,000 microcents.
  - `usage_count`: integer **required** — Number of reported usage events in the selected window.
- `until`: string **required** — Exclusive end of the resolved range after UTC interval alignment.
