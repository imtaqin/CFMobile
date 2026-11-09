# Query run

1 endpoints.

## POST /accounts/{account_id}/workers/observability/telemetry/query

Run a query

operationId: `telemetry.query`

**Request** (application/json)

- `chart`: boolean — When true, includes time-series data in the response.
- `chartType`: string enum: `timeseries_and_aggregate`, `timeseries`, `aggregate`, `distribution` — Controls the SQL shape and response payload for the 'calculations' view. Omitted or 'timeseries_and_aggregate': current behaviour — both the
- `compare`: boolean — When true, includes a comparison dataset from the previous time period of equal length.
- `distributionScale`: string enum: `log`, `linear` — Value-axis bucketing for chartType 'distribution'. Omitted or 'log': geometric buckets, best for heavy-tailed latency. 'linear': fixed-width
- `dry`: boolean default: `false` — When true, executes the query without persisting the results. Useful for validation or previewing.
- `granularity`: number — Number of time-series buckets. Only used when view is 'calculations'. Omit to let the system auto-detect an appropriate granularity.
- `ignoreSeries`: boolean default: `false` — When true, omits time-series data from the response and returns only aggregated values. Reduces response size when series are not needed.
- `limit`: number default: `50` — Maximum number of events to return when view is 'events'. Also controls the number of group-by rows when view is 'calculations'.
- `offset`: string — Cursor for pagination in event, trace, invocation, and agent views. Pass the $metadata.id of the last event, the trace cursor, or AgentRun.i
- `offsetBy`: number — Numeric offset for paginating grouped/pattern results (top-N lists). Use together with limit. Not used by cursor-based pagination.
- `offsetDirection`: string — Pagination direction: 'next' for forward, 'prev' for backward.
- `parameters`: object — Query parameters defining what data to retrieve — filters, calculations, group-bys, and ordering. In practice this should always be provided
  - `calculations`: object[] — Aggregation calculations to compute (e.g. count, avg, p99). Each calculation produces aggregate values and optional time-series data.
    [array of]
    - `alias`: string — Custom label for this calculation in the results. Useful for distinguishing multiple calculations.
    - `key`: string — Field name to calculate over. Must exist in the data. Verify with the keys endpoint. Required for every operator except `count`, which aggre
    - `keyType`: string enum: `string`, `number`, `boolean` — Data type of the key. Required when key is provided to ensure correct aggregation.
    - `operator`: string **required** enum: `count`, `COUNT` — Aggregation operator to apply. Examples: count, avg, sum, min, max, median, p90, p95, p99, uniq, stddev, variance.
  - `datasets`: string[] — Datasets to query. Leave empty to query all available datasets.
    [array]
  - `filterCombination`: string enum: `and`, `or`, `AND`, `OR` — Logical operator for combining top-level filters: 'and' (all must match) or 'or' (any must match). Defaults to 'and'.
  - `filters`: object[] — Filters to narrow query results. Use the keys and values endpoints to discover available fields before building filters. Supports nested gro
    [array of]
    - `filterCombination`: string **required** enum: `and`, `or`, `AND`, `OR`
    - `filters`: object[] **required**
    - `kind`: string **required** enum: `group`
    - `filterCombination`: string **required** enum: `and`, `or`, `AND`, `OR` — Logical operator for combining child filters: 'and' (all must match) or 'or' (any must match).
    - `filters`: object[] **required** — Child filter nodes. Each can be a leaf filter or another nested group.
    - `kind`: string **required** enum: `group` — Discriminator indicating this is a nested filter group.
  - `groupBys`: object[] — Fields to group calculation results by. Only applicable when the query view is 'calculations'. Produces per-group aggregate values.
    [array of]
    - `type`: string **required** enum: `string`, `number`, `boolean` — Data type of the group-by field.
    - `value`: string **required** — Field name to group results by (e.g. $metadata.service, $metadata.statusCode).
  - `havings`: object[] — Post-aggregation filters applied to calculation results. Use to filter groups after aggregation (e.g. only groups where count > 100).
    [array of]
    - `key`: string **required** — Calculation alias or operator to filter on after aggregation.
    - `operation`: string **required** enum: `eq`, `neq`, `gt`, `gte`, `lt`, `lte` — Numeric comparison operator: eq, neq, gt, gte, lt, lte.
    - `value`: number **required** — Threshold value to compare the calculation result against.
  - `limit`: integer — Maximum number of group-by rows to return in calculation results. A value of 10 is a sensible default for most use cases.
  - `needle`: object — Full-text search expression applied across all event fields. Matches events containing the specified text.
    - `isRegex`: boolean — When true, treats the value as a regular expression (RE2 syntax).
    - `matchCase`: boolean — When true, performs a case-sensitive search. Defaults to case-insensitive.
    - `value`: any **required** — The text or pattern to search for.
  - `orderBy`: object — Ordering for grouped calculation results. Only effective when a group-by is present.
    - `order`: string enum: `asc`, `desc` — Sort direction: 'asc' for ascending, 'desc' for descending.
    - `value`: string **required** — Alias of the calculation to order results by. Must match the alias (or operator) of a calculation in the query.
- `queryId`: string **required** — Identifier for the query. When parameters are omitted, this ID is used to load a previously saved query's parameters. When providing paramet
- `timeframe`: object **required** — Timeframe for the query using Unix timestamps in milliseconds. 'from' must be earlier than 'to'. Narrower timeframes produce faster response
  - `from`: integer **required** — Start timestamp for the query timeframe. Unix timestamp in milliseconds
  - `to`: integer **required** — End timestamp for the query timeframe. Unix timestamp in milliseconds
- `view`: string enum: `traces`, `events`, `calculations`, `invocations`, `requests`, `agents` default: `calculations` — Controls the shape of the response. 'events': individual log lines matching the query. 'calculations': aggregated metrics (count, avg, p99, 

**Response** 200 → `result`

- `agents`: object[] — Agent run summaries. Present when the query view is 'agents'. Each entry represents one trace containing at least one agent invocation.
  [array of]
  - `agentId`: string — ID from the earliest agent invocation that provides one.
  - `agentName`: string — Name from the earliest agent invocation that provides one.
  - `conversationId`: string — Conversation ID from the earliest invocation that provides one.
  - `errors`: string[] **required** — Distinct errors reported by spans in the run.
    [array]
  - `id`: string **required** — Stable pagination cursor for this agent run.
  - `inputTokens`: number — Input tokens summed across chat spans in the run's trace; informational, not billing data.
  - `models`: string[] **required** — Distinct models reported by chat spans across the run's trace.
    [array]
  - `outputTokens`: number — Output tokens summed across chat spans in the run's trace; informational, not billing data.
  - `providers`: string[] **required** — Distinct GenAI providers reported by chat spans in the run.
    [array]
  - `services`: string[] **required** — Worker services represented in the run's trace.
    [array]
  - `spans`: number **required** — Number of spans in the run's trace.
  - `status`: string **required** enum: `completed`, `error` — Observed run status.
  - `traceDurationMs`: number **required** — Total trace duration in milliseconds.
  - `traceEndMs`: number **required** — End of the run's trace as a Unix epoch in milliseconds.
  - `traceId`: string **required** — Trace identifier for this agent run.
  - `traceStartMs`: number **required** — Start of the run's trace as a Unix epoch in milliseconds.
- `calculations`: object[] — Aggregated calculation results. Present when the query view is 'calculations'. Contains computed metrics (count, avg, p99, etc.) with option
  [array of]
  - `aggregates`: object[] **required**
    [array of]
    - `count`: number **required** — Estimated number of matching events: the sum of the sample intervals of the stored events. It equals the number of stored events when sample
    - `groups`: object[]
    - `interval`: number **required** — Deprecated alias of sampleInterval. Always has the same value; use sampleInterval instead.
    - `sampleInterval`: number **required** — Average sample interval of the matched events. Each stored event has a sample interval of 1 / (the sampling rate applied when it was ingeste
    - `value`: number **required** — Result of the calculation. count, sum, avg, median, and percentiles are weighted by each event's sample interval
  - `alias`: string
  - `calculation`: string **required**
  - `series`: object[] **required**
    [array of]
    - `data`: object[] **required**
    - `time`: string **required**
- `compare`: object[] — Comparison calculation results from the previous time period. Present when the compare option is enabled. Same structure as calculations.
  [array of]
  - `aggregates`: object[] **required**
    [array of]
    - `count`: number **required** — Estimated number of matching events: the sum of the sample intervals of the stored events. It equals the number of stored events when sample
    - `groups`: object[]
    - `interval`: number **required** — Deprecated alias of sampleInterval. Always has the same value; use sampleInterval instead.
    - `sampleInterval`: number **required** — Average sample interval of the matched events. Each stored event has a sample interval of 1 / (the sampling rate applied when it was ingeste
    - `value`: number **required** — Result of the calculation. count, sum, avg, median, and percentiles are weighted by each event's sample interval
  - `alias`: string
  - `calculation`: string **required**
  - `series`: object[] **required**
    [array of]
    - `data`: object[] **required**
    - `time`: string **required**
- `distribution`: object — Bucketed 2D histogram of a numeric field over time. Present when chartType is 'distribution'.
  - `bins`: string[] **required** — Time-bucket labels (ISO-8601 strings), one per matrix column.
    [array]
  - `bucketBoundaries`: number[] **required** — Raw bucket edges in the value's native unit, length buckets.length + 1. Used for the colour scale and percentile mapping.
    [array]
  - `bucketMode`: string **required** enum: `log`, `linear` — Bucketing scheme used to derive the boundaries. 'log' produces geometric edges; 'linear' produces fixed-width edges.
  - `buckets`: string[] **required** — Value-range labels, one per matrix row (e.g. '50–100ms').
    [array]
  - `matrix`: array[] **required** — Sampling-corrected counts. matrix[bucketIdx][binIdx] is the estimated number of events in value-bucket 'bucketIdx' during time-bin 'binIdx'.
    [array of]
    [array]
- `events`: object — Individual event results. Present when the query view is 'events'. Contains the matching log lines and their metadata.
  - `count`: number — Total number of events matching the query (may exceed the number returned due to limits).
  - `events`: object[] — List of individual telemetry events matching the query.
    [array of]
    - `$containers`: object — Cloudflare Containers event information that enriches your logs for identifying and debugging issues.
    - `$metadata`: object **required** — Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.
    - `$workers`: any — Cloudflare Workers event information that enriches your logs for identifying and debugging issues.
    - `dataset`: string **required** — The dataset this event belongs to (e.g. cloudflare-workers).
    - `source`: any **required** — Raw log payload. May be a string or a structured object depending on how the log was emitted.
    - `timestamp`: integer **required** — Event timestamp as a Unix epoch in milliseconds.
  - `fields`: object[] — List of fields discovered in the matched events. Useful for building dynamic UIs.
    [array of]
    - `key`: string **required** — Field name present in the matched events.
    - `type`: string **required** — Data type of the field (string, number, or boolean).
  - `series`: object[] — Time-series data for the matched events, bucketed by the query granularity.
    [array of]
    - `data`: object[] **required**
    - `time`: string **required**
- `invocations`: object — Events grouped by invocation (request ID). Present when the query view is 'invocations'. Each key is a request ID mapping to all events from
- `run`: object **required** — Represents a single execution of a query against Workers Observability data, including the query definition, execution status, and performan
  - `accountId`: string **required** — Cloudflare account ID that owns this query run.
  - `created`: string — ISO-8601 timestamp when the query run was created.
  - `dry`: boolean **required** — Whether this was a dry run (results not persisted).
  - `granularity`: number **required** — Number of time-series buckets used for the query. Higher values produce more detailed series data.
  - `id`: string **required** — Unique identifier for this query run.
  - `query`: any **required** — A saved query definition with its parameters, metadata, and ownership information.
  - `statistics`: object — Query performance statistics from the database (does not include network latency).
    - `abr_level`: number — The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1
    - `bytes_read`: number **required** — Number of uncompressed bytes read from the table.
    - `elapsed`: number **required** — Time in seconds for the query to run.
    - `rows_read`: number **required** — Number of rows scanned from the table.
  - `status`: string **required** enum: `STARTED`, `COMPLETED` — Current execution status of the query run.
  - `timeframe`: object **required** — Time range for the query execution. 'from' must be earlier than 'to'. No fractional milliseconds.
    - `from`: integer **required** — Start timestamp for the query timeframe. Unix timestamp in milliseconds
    - `to`: integer **required** — End timestamp for the query timeframe. Unix timestamp in milliseconds
  - `updated`: string — ISO-8601 timestamp when the query run was last updated.
  - `userId`: string **required** — ID of the user who initiated the query run.
- `statistics`: object **required** — Query performance statistics from the database. Includes execution time, rows scanned, and bytes read. Does not include network latency.
  - `abr_level`: number — The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1
  - `bytes_read`: number **required** — Number of uncompressed bytes read from the table.
  - `elapsed`: number **required** — Time in seconds for the query to run.
  - `rows_read`: number **required** — Number of rows scanned from the table.
- `traces`: object[] — Trace summaries matching the query. Present when the query view is 'traces'. Each entry represents a distributed trace with its spans, durat
  [array of]
  - `errors`: string[] — Error messages encountered during the trace, if any.
    [array]
  - `rootSpanName`: string **required** — Name of the root span that initiated the trace.
  - `rootTransactionName`: string **required** — Logical transaction name for the root span.
  - `service`: string[] **required** — List of Worker services involved in the trace.
    [array]
  - `spans`: number **required** — Total number of spans in the trace.
  - `traceDurationMs`: number **required** — Total duration of the trace in milliseconds.
  - `traceEndMs`: number **required** — Trace end time as a Unix epoch in milliseconds.
  - `traceId`: string **required** — Unique identifier for the distributed trace.
  - `traceStartMs`: number **required** — Trace start time as a Unix epoch in milliseconds.
