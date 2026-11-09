# Radar Domains Ranking

3 endpoints.

## GET /radar/ranking/domain/{domain}

Get domain rank details

operationId: `radar-get-ranking-domain-details` · query: `limit`, `rankingType`, `name`, `includeTopLocations`, `date`, `format`

**Response** 200 → `result`

- `details_0`: object **required**
  - `bucket`: string — Only available in POPULAR ranking for the most recent ranking.
  - `categories`: object[] **required**
    [array of]
    - `id`: integer **required**
    - `name`: string **required**
    - `superCategoryId`: integer **required**
  - `rank`: integer
  - `top_locations`: object[]
    [array of]
    - `locationCode`: string **required**
    - `locationName`: string **required**
    - `rank`: integer **required**
- `meta`: object **required**
  - `dateRange`: object[] **required**
    [array of]
    - `endTime`: string **required** — Adjusted end of date range.
    - `startTime`: string **required** — Adjusted start of date range.

## GET /radar/ranking/timeseries_groups

Get domains rank time series

operationId: `radar-get-ranking-domain-timeseries` · query: `limit`, `rankingType`, `name`, `location`, `domains`, `domainCategory`, `dateRange`, `dateStart`, `dateEnd`, `format`

**Response** 200 → `result`

- `meta`: object **required** — Metadata for the results.
  - `aggInterval`: string **required** enum: `FIFTEEN_MINUTES`, `ONE_HOUR`, `ONE_DAY`, `ONE_WEEK`, `ONE_MONTH` — Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflar
  - `confidenceInfo`: object **required**
    - `annotations`: object[] **required**
    - `level`: integer **required** — Provides an indication of how much confidence Cloudflare has in the data.
  - `dateRange`: object[] **required**
    [array of]
    - `endTime`: string **required** — Adjusted end of date range.
    - `startTime`: string **required** — Adjusted start of date range.
  - `lastUpdated`: string **required** — Timestamp of the last dataset update.
  - `normalization`: string **required** enum: `PERCENTAGE`, `MIN0_MAX`, `MIN_MAX`, `RAW_VALUES`, `PERCENTAGE_CHANGE`, `ROLLING_AVERAGE`, `OVERLAPPED_PERCENTAGE`, `RATIO` — Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization
  - `units`: object[] **required** — Measurement units for the results.
    [array of]
    - `name`: string **required**
    - `value`: string **required**
- `serie_0`: object **required**
  - `timestamps`: string[] **required**
    [array]

## GET /radar/ranking/top

Get top or trending domains

operationId: `radar-get-ranking-top-domains` · query: `limit`, `name`, `location`, `domainCategory`, `date`, `rankingType`, `format`

**Response** 200 → `result`

- `meta`: object **required**
  - `confidenceInfo`: object **required**
    - `annotations`: object[] **required**
    - `level`: integer **required** — Provides an indication of how much confidence Cloudflare has in the data.
  - `dateRange`: object[] **required**
    [array of]
    - `endTime`: string **required** — Adjusted end of date range.
    - `startTime`: string **required** — Adjusted start of date range.
  - `lastUpdated`: string **required** — Timestamp of the last dataset update.
  - `normalization`: string **required** enum: `PERCENTAGE`, `MIN0_MAX`, `MIN_MAX`, `RAW_VALUES`, `PERCENTAGE_CHANGE`, `ROLLING_AVERAGE`, `OVERLAPPED_PERCENTAGE`, `RATIO` — Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization
  - `top_0`: object **required**
    - `date`: string **required**
  - `units`: object[] **required** — Measurement units for the results.
    [array of]
    - `name`: string **required**
    - `value`: string **required**
- `top_0`: object[] **required**
  [array of]
  - `categories`: object[] **required**
    [array of]
    - `id`: integer **required**
    - `name`: string **required**
    - `superCategoryId`: integer **required**
  - `domain`: string **required**
  - `pctRankChange`: number — Only available in TRENDING rankings.
  - `rank`: integer **required**
