# Radar Quality

6 endpoints.

## GET /radar/quality/iqi/summary

Get Internet Quality Index (IQI) summary

operationId: `radar-get-quality-index-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `metric`, `format`

**Response** 200 → `result`

- `meta`: object **required** — Metadata for the results.
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
- `summary_0`: object **required**
  - `p25`: string **required** — A numeric string.
  - `p50`: string **required** — A numeric string.
  - `p75`: string **required** — A numeric string.

## GET /radar/quality/iqi/timeseries_groups

Get Internet Quality Index (IQI) time series

operationId: `radar-get-quality-index-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `interpolation`, `metric`, `format`

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

## GET /radar/quality/speed/histogram

Get speed tests histogram

operationId: `radar-get-quality-speed-histogram` · query: `name`, `dateEnd`, `asn`, `location`, `continent`, `bucketSize`, `metricGroup`, `format`

**Response** 200 → `result`

- `histogram_0`: object **required**
  - `bandwidthDownload`: string[] **required**
    [array]
  - `bandwidthUpload`: string[] **required**
    [array]
  - `bucketMin`: string[] **required**
    [array]
- `meta`: object **required** — Metadata for the results.
  - `bucketSize`: integer **required** — The width for every bucket in the histogram.
  - `confidenceInfo`: object **required**
    - `annotations`: object[] **required**
    - `level`: integer **required** — Provides an indication of how much confidence Cloudflare has in the data.
  - `dateRange`: object[] **required**
    [array of]
    - `endTime`: string **required** — Adjusted end of date range.
    - `startTime`: string **required** — Adjusted start of date range.
  - `lastUpdated`: string **required** — Timestamp of the last dataset update.
  - `normalization`: string **required** enum: `PERCENTAGE`, `MIN0_MAX`, `MIN_MAX`, `RAW_VALUES`, `PERCENTAGE_CHANGE`, `ROLLING_AVERAGE`, `OVERLAPPED_PERCENTAGE`, `RATIO` — Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization
  - `totalTests`: integer[] **required**
    [array]
  - `units`: object[] **required** — Measurement units for the results.
    [array of]
    - `name`: string **required**
    - `value`: string **required**

## GET /radar/quality/speed/summary

Get speed tests summary

operationId: `radar-get-quality-speed-summary` · query: `name`, `dateEnd`, `asn`, `location`, `continent`, `format`

**Response** 200 → `result`

- `meta`: object **required** — Metadata for the results.
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
- `summary_0`: object **required**
  - `bandwidthDownload`: string **required** — A numeric string.
  - `bandwidthUpload`: string **required** — A numeric string.
  - `jitterIdle`: string **required** — A numeric string.
  - `jitterLoaded`: string **required** — A numeric string.
  - `latencyIdle`: string **required** — A numeric string.
  - `latencyLoaded`: string **required** — A numeric string.
  - `packetLoss`: string **required** — A numeric string.

## GET /radar/quality/speed/top/ases

Get top ASes by speed test results

operationId: `radar-get-quality-speed-top-ases` · query: `limit`, `name`, `dateEnd`, `asn`, `location`, `continent`, `orderBy`, `reverse`, `format`

**Response** 200 → `result`

- `meta`: object **required** — Metadata for the results.
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
- `top_0`: object[] **required**
  [array of]
  - `bandwidthDownload`: string **required** — A numeric string.
  - `bandwidthUpload`: string **required** — A numeric string.
  - `clientASN`: integer **required**
  - `clientASName`: string **required**
  - `jitterIdle`: string **required** — A numeric string.
  - `jitterLoaded`: string **required** — A numeric string.
  - `latencyIdle`: string **required** — A numeric string.
  - `latencyLoaded`: string **required** — A numeric string.
  - `numTests`: integer **required**
  - `rankPower`: number **required**

## GET /radar/quality/speed/top/locations

Get top locations by speed test results

operationId: `radar-get-quality-speed-top-locations` · query: `limit`, `name`, `dateEnd`, `asn`, `location`, `continent`, `orderBy`, `reverse`, `format`

**Response** 200 → `result`

- `meta`: object **required** — Metadata for the results.
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
- `top_0`: object[] **required**
  [array of]
  - `bandwidthDownload`: string **required** — A numeric string.
  - `bandwidthUpload`: string **required** — A numeric string.
  - `clientCountryAlpha2`: string **required**
  - `clientCountryName`: string **required**
  - `jitterIdle`: string **required** — A numeric string.
  - `jitterLoaded`: string **required** — A numeric string.
  - `latencyIdle`: string **required** — A numeric string.
  - `latencyLoaded`: string **required** — A numeric string.
  - `numTests`: integer **required**
  - `rankPower`: number **required**
