# Spectrum Analytics

4 endpoints.

## GET /user/spectrum_analytics/zones/report

Get zones bandwidth report

operationId: `spectrum-analytics-get-zones-report` · query: `since`, `until`, `cdn_traffic`

**Response** 200 → `result`

[array of]
- `totals`: object **required**
  - `bandwidth`: object **required**
    - `all`: number **required** — Sum of ingress and egress bytes transferred.
    - `egress`: number **required** — Sum of egress bytes transferred.
    - `ingress`: number **required** — Sum of ingress bytes transferred.
- `zone_id`: string **required** — Identifier.

## GET /zones/{zone_id}/spectrum/analytics/aggregate/current

Get current aggregated analytics

operationId: `spectrum-aggregate-analytics-get-current-aggregated-analytics` · query: `appID`, `colo_name`

**Response** 200 → `result`

[array of]
- `appID`: any **required**
- `bytesEgress`: number **required** — Number of bytes sent.
- `bytesIngress`: number **required** — Number of bytes received.
- `connections`: number **required** — Number of connections.
- `durationAvg`: number **required** — Average duration of connections.

## GET /zones/{zone_id}/spectrum/analytics/events/bytime

Get analytics by time

operationId: `spectrum-analytics-(-by-time)-get-analytics-by-time` · query: `dimensions`, `sort`, `until`, `metrics`, `filters`, `since`, `time_delta`

**Response** 200 → `result`

- `data`: object[] **required** — List of columns returned by the analytics query.
  [array of]
  - `dimensions`: string[]
    [array]
  - `metrics`: any
- `data_lag`: number **required** — Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.
- `max`: any **required** — Maximum result for each selected metrics across all data.
- `min`: any **required** — Minimum result for each selected metrics across all data.
- `query`: object **required**
  - `dimensions`: string[] — Can be used to break down the data by given attributes. Options are:
    [array]
  - `filters`: string — Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all t
  - `limit`: number — Limit number of returned metrics.
  - `metrics`: string[] — One or more metrics to compute. Options are:
    [array]
  - `since`: any
  - `sort`: string[] — The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.
    [array]
  - `until`: any
- `rows`: number **required** — Total number of rows in the result.
- `time_intervals`: array[] — List of time interval buckets: [start, end].
  [array of]
  [array]
- `totals`: any **required** — Total result for each selected metrics across all data.

## GET /zones/{zone_id}/spectrum/analytics/events/summary

Get analytics summary

operationId: `spectrum-analytics-(-summary)-get-analytics-summary` · query: `dimensions`, `sort`, `until`, `metrics`, `filters`, `since`

**Response** 200 → `result`

- `data`: object[] **required** — List of columns returned by the analytics query.
  [array of]
  - `dimensions`: string[]
    [array]
  - `metrics`: any
- `data_lag`: number **required** — Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.
- `max`: any **required** — Maximum result for each selected metrics across all data.
- `min`: any **required** — Minimum result for each selected metrics across all data.
- `query`: object **required**
  - `dimensions`: string[] — Can be used to break down the data by given attributes. Options are:
    [array]
  - `filters`: string — Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all t
  - `limit`: number — Limit number of returned metrics.
  - `metrics`: string[] — One or more metrics to compute. Options are:
    [array]
  - `since`: any
  - `sort`: string[] — The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.
    [array]
  - `until`: any
- `rows`: number **required** — Total number of rows in the result.
- `time_intervals`: array[] — List of time interval buckets: [start, end].
  [array of]
  [array]
- `totals`: any **required** — Total result for each selected metrics across all data.
