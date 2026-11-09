# Observability

7 endpoints.

## GET /accounts/{account_id}/observability/usage/limit

Get usage limit status

operationId: `observability.usage_limit.get`

**Response** 200 → `result`

- `limit`: object **required** — The plan's daily limit.
  - `daily`: number **required** — The plan's daily limit, in events or bytes as given by unit, counted from 00:00 UTC.
  - `unit`: string **required** enum: `events`, `bytes` — The unit the daily limit is counted in.
- `plan`: string **required** enum: `free`, `paid` — free: the account has no Workers Paid or Enterprise plan. paid: it has one of them.
- `resets_at`: string **required** — When a limited free account is expected to start keeping events again, at the daily limit reset. Not guaranteed if the account was limited f
- `sample_rate`: number **required** — Share of the account's events being kept, from 0 to 1.
- `status`: string **required** enum: `normal`, `limited`, `restricted` — Whether telemetry is being dropped, and why. More values may be added; treat unknown values like normal.

## DELETE /zones/{zone_id}/observability/tracing/rules

Delete zone trace rules

operationId: `zone.observability.tracing.rules.delete`

**Response** 200 → `result`

- `rules`: object[] **required** — Trace rules in evaluation order.
  [array of]
  - `action`: string **required** enum: `set_trace_settings`
  - `action_parameters`: object **required**
    - `sampling_ratio`: number **required** — The ratio of requests sampled for tracing, from 0 to 1.
  - `description`: string **required**
  - `enabled`: boolean **required**
  - `expression`: string **required** — A Rules language expression that selects requests.

## GET /zones/{zone_id}/observability/tracing/rules

View zone trace rules

operationId: `zone.observability.tracing.rules.get`

**Response** 200 → `result`

- `rules`: object[] **required** — Trace rules in evaluation order.
  [array of]
  - `action`: string **required** enum: `set_trace_settings`
  - `action_parameters`: object **required**
    - `sampling_ratio`: number **required** — The ratio of requests sampled for tracing, from 0 to 1.
  - `description`: string **required**
  - `enabled`: boolean **required**
  - `expression`: string **required** — A Rules language expression that selects requests.

## PUT /zones/{zone_id}/observability/tracing/rules

Replace zone trace rules

operationId: `zone.observability.tracing.rules.update`

**Request** (application/json)

- `rules`: object[] **required** — Trace rules in evaluation order.
  [array of]
  - `action`: string **required** enum: `set_trace_settings`
  - `action_parameters`: object **required**
    - `sampling_ratio`: number **required** — The ratio of requests sampled for tracing, from 0 to 1.
  - `description`: string **required**
  - `enabled`: boolean **required**
  - `expression`: string **required** — A Rules language expression that selects requests.

**Response** 200 → `result`

- `rules`: object[] **required** — Trace rules in evaluation order.
  [array of]
  - `action`: string **required** enum: `set_trace_settings`
  - `action_parameters`: object **required**
    - `sampling_ratio`: number **required** — The ratio of requests sampled for tracing, from 0 to 1.
  - `description`: string **required**
  - `enabled`: boolean **required**
  - `expression`: string **required** — A Rules language expression that selects requests.

## DELETE /zones/{zone_id}/observability/tracing/settings

Reset zone tracing settings

operationId: `zone.observability.tracing.settings.delete`

**Response** 200 → `result`

- `destinations`: string[] **required** — Up to 100 OpenTelemetry destination identifiers that receive traces.
  [array]
- `enabled`: boolean **required** — Whether Cloudflare Traces is enabled for the zone.
- `forward_context`: boolean **required** — Whether trace context is sent externally or across a zone boundary.
- `persist`: boolean **required** — Whether traces are persisted in Cloudflare.
- `propagation_policy`: string **required** enum: `accept`, `authenticated`, `reject` — When inbound trace context may be continued. Authenticated propagation is not supported yet.
- `sampling_ratio`: number **required** — The ratio of requests sampled for tracing, from 0 to 1.

## GET /zones/{zone_id}/observability/tracing/settings

View zone tracing settings

operationId: `zone.observability.tracing.settings.get`

**Response** 200 → `result`

- `destinations`: string[] **required** — Up to 100 OpenTelemetry destination identifiers that receive traces.
  [array]
- `enabled`: boolean **required** — Whether Cloudflare Traces is enabled for the zone.
- `forward_context`: boolean **required** — Whether trace context is sent externally or across a zone boundary.
- `persist`: boolean **required** — Whether traces are persisted in Cloudflare.
- `propagation_policy`: string **required** enum: `accept`, `authenticated`, `reject` — When inbound trace context may be continued. Authenticated propagation is not supported yet.
- `sampling_ratio`: number **required** — The ratio of requests sampled for tracing, from 0 to 1.

## PATCH /zones/{zone_id}/observability/tracing/settings

Update zone tracing settings

operationId: `zone.observability.tracing.settings.update`

**Request** (application/json)

- `destinations`: string[] — Up to 100 OpenTelemetry destination identifiers that receive traces.
  [array]
- `enabled`: boolean — Whether Cloudflare Traces is enabled for the zone.
- `forward_context`: boolean — Whether trace context is sent externally or across a zone boundary.
- `persist`: boolean — Whether traces are persisted in Cloudflare.
- `propagation_policy`: string enum: `accept`, `authenticated`, `reject` — When inbound trace context may be continued. Authenticated propagation is not supported yet.
- `sampling_ratio`: number — The ratio of requests sampled for tracing, from 0 to 1.

**Response** 200 → `result`

- `destinations`: string[] **required** — Up to 100 OpenTelemetry destination identifiers that receive traces.
  [array]
- `enabled`: boolean **required** — Whether Cloudflare Traces is enabled for the zone.
- `forward_context`: boolean **required** — Whether trace context is sent externally or across a zone boundary.
- `persist`: boolean **required** — Whether traces are persisted in Cloudflare.
- `propagation_policy`: string **required** enum: `accept`, `authenticated`, `reject` — When inbound trace context may be continued. Authenticated propagation is not supported yet.
- `sampling_ratio`: number **required** — The ratio of requests sampled for tracing, from 0 to 1.
