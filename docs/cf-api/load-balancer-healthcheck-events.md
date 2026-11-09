# Load Balancer Healthcheck Events

1 endpoints.

## GET /user/load_balancing_analytics/events

List Healthcheck Events

operationId: `load-balancer-healthcheck-events-list-healthcheck-events` · query: `until`, `pool_name`, `origin_healthy`, `pool_id`, `since`, `origin_name`, `pool_healthy`

**Response** 200 → `result`

[array of]
- `id`: integer default: `1`
- `origins`: object[]
  [array of]
  - `address`: string — The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the ori
  - `changed`: boolean — Whether the origin has changed health status.
  - `enabled`: boolean default: `true` — Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. 
  - `failure_reason`: string — Failure reason for un-healthy origin health check.
  - `healthy`: boolean default: `true` — If true, filter events where the origin status is healthy. If false, filter events where the origin status is unhealthy.
  - `ip`: string — The IP address (IPv4 or IPv6) of the origin.
  - `name`: string — A human-identifiable name for the origin.
- `pool`: object
- `timestamp`: string
