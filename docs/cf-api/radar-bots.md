# Radar Bots

5 endpoints.

## GET /radar/bots

List bots

operationId: `radar-get-bots` · query: `limit`, `offset`, `botCategory`, `botOperator`, `kind`, `botVerificationStatus`, `format`

**Response** 200 → `result`

- `bots`: object[] **required**
  [array of]
  - `accessLevel`: string **required** — Who can operate the bot: DIRECT bots reach origins under their own identity, while INTERMEDIARY bots forward requests on behalf of another a
  - `categories`: string[] **required** — The categories of the bot.
    [array]
  - `category`: string **required** — The category of the bot. Deprecated: use `categories`.
  - `contentUse`: string **required** — How the bot uses the content it fetches (e.g., immediate, reference or full).
  - `description`: string **required** — A summary for the bot (e.g., purpose).
  - `kind`: string **required** — The kind of the bot.
  - `name`: string **required** — The name of the bot.
  - `operator`: string **required** — The organization that owns and operates the bot.
  - `slug`: string **required** — A kebab-case identifier derived from the bot name.
  - `userAgentPatterns`: string[] **required**
    [array]

## GET /radar/bots/{bot_slug}

Get bot details

operationId: `radar-get-bot-details` · query: `format`

**Response** 200 → `result`

- `bot`: object **required**
  - `accessLevel`: string **required** — Who can operate the bot: DIRECT bots reach origins under their own identity, while INTERMEDIARY bots forward requests on behalf of another a
  - `categories`: string[] **required** — The categories of the bot.
    [array]
  - `category`: string **required** — The category of the bot. Deprecated: use `categories`.
  - `contentUse`: string **required** — How the bot uses the content it fetches (e.g., immediate, reference or full).
  - `description`: string **required** — A summary for the bot (e.g., purpose).
  - `documentationUrl`: string **required** — The link to the bot documentation.
  - `kind`: string **required** — The kind of the bot.
  - `name`: string **required** — The name of the bot.
  - `operator`: string **required** — The organization that owns and operates the bot.
  - `operatorUrl`: string **required** — The link to the bot documentation. Deprecated: use `documentationUrl`.
  - `operatorWebsiteUrl`: string **required** — The link to the operator's website.
  - `signatureAgentUrl`: string — The URL of the agent's [Web Bot Auth](https://blog.cloudflare.com/web-bot-auth/) resource. Null for bots not verified via request signature.
  - `slug`: string **required** — A kebab-case identifier derived from the bot name.
  - `userAgentPatterns`: string[] **required**
    [array]
  - `userAgents`: string[] **required**
    [array]

## GET /radar/bots/summary/{dimension}

Get bots HTTP requests distribution by dimension

operationId: `radar-get-bots-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `limitPerGroup`, `bot`, `botOperator`, `botCategory`, `botKind`, `botVerificationStatus`, `format`

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

## GET /radar/bots/timeseries

Get bots HTTP requests time series

operationId: `radar-get-bots-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `bot`, `botOperator`, `botCategory`, `botKind`, `botVerificationStatus`, `format`

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

## GET /radar/bots/timeseries_groups/{dimension}

Get time series distribution of bots HTTP requests by dimension.

operationId: `radar-get-bots-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `limitPerGroup`, `bot`, `botOperator`, `botCategory`, `botKind`, `botVerificationStatus`, `format`

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
