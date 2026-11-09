# Usage

1 endpoints.

## GET /accounts/{account_id}/workers/observability/usage

Get event count

operationId: `usage.get` · query: `from`, `to`, `tz`

**Response** 200 → `result`

- `breakdown`: object[] **required** — Event counts and sizes grouped by dataset and service, bucketed by day.
  [array of]
  - `bin`: string **required** — UTC timestamp for the start of the bucket. Bucket boundaries follow the requested tz.
  - `count`: number **required** — ABR-adjusted event count for this bucket.
  - `dataset`: string **required** — Dataset name (e.g. 'workers', 'queues').
  - `eventSize`: number **required** — ABR-adjusted total event size in bytes for this bucket.
  - `service`: string **required** — Worker or service name that produced the events.
- `events`: number **required** — Total ABR-adjusted event count for the period — sum of all breakdown bins.
