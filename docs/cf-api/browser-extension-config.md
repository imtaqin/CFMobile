# Browser Extension Config

6 endpoints.

## DELETE /accounts/{account_id}/browser-extension/config

Delete browser extension configuration

operationId: `accounts-browser-extension-config-delete`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/browser-extension/config

Get browser extension configuration

operationId: `accounts-browser-extension-config-get`

**Response** 200 → `result`

- `min_extension_version`: string — Minimum required browser extension version.
- `team_domain`: string **required** — Team domain for the browser extension.
- `created_at`: string **required** — ISO 8601 timestamp of when the configuration was created.
- `updated_at`: string **required** — ISO 8601 timestamp of the last configuration update.

## POST /accounts/{account_id}/browser-extension/config

Create browser extension configuration

operationId: `accounts-browser-extension-config-post`

**Request** (application/json)

- `config`: any **required**

**Response** 200 → `result`

- `min_extension_version`: string — Minimum required browser extension version.
- `team_domain`: string **required** — Team domain for the browser extension.
- `created_at`: string **required** — ISO 8601 timestamp of when the configuration was created.
- `updated_at`: string **required** — ISO 8601 timestamp of the last configuration update.

## PUT /accounts/{account_id}/browser-extension/config

Update browser extension configuration

operationId: `accounts-browser-extension-config-put`

**Request** (application/json)

- `config`: any **required**

**Response** 200 → `result`

- `min_extension_version`: string — Minimum required browser extension version.
- `team_domain`: string **required** — Team domain for the browser extension.
- `created_at`: string **required** — ISO 8601 timestamp of when the configuration was created.
- `updated_at`: string **required** — ISO 8601 timestamp of the last configuration update.

## POST /accounts/{account_id}/browser-extension/config/logs/extension-events/search

Search browser extension event logs

operationId: `accounts-browser-extension-config-extension-events-search`

**Request** (application/json)

- `fields`: string[]
  [array]
- `filters`: object[]
  [array of]
  - `field`: string **required** enum: `timestamp`, `durationMs`, `eventName`, `action`, `userEmail`, `registrationId`, `eventId`, `policyId`
  - `op`: string **required** enum: `eq`, `neq`, `in`, `notIn`, `contains`, `notContains`, `includes`, `notIncludes`
  - `value`: any **required**
- `from`: string **required**
- `includeTotal`: boolean default: `false`
- `limit`: integer default: `50`
- `page`: integer default: `1`
- `to`: string **required**

**Response** 200 → `result`

[array of]
- `action`: string
- `durationMs`: number
- `eventId`: string — Client-generated event ID. Use it to fetch a detection's trace.
- `eventName`: string
- `inventoryExtensionId`: string
- `inventoryExtensionName`: string
- `inventoryExtensionVersion`: string
- `matchedDlpProfiles`: string[]
  [array]
- `policyId`: string
- `registrationId`: string
- `timestamp`: string
- `url`: string
- `userEmail`: string

## POST /accounts/{account_id}/browser-extension/config/logs/extension-events/timeseries

Query browser extension event timeseries

operationId: `accounts-browser-extension-config-extension-events-timeseries`

**Request** (application/json)

- `filters`: object[]
  [array of]
  - `field`: string **required** enum: `timestamp`, `durationMs`, `eventName`, `action`, `userEmail`, `registrationId`, `eventId`, `policyId`
  - `op`: string **required** enum: `eq`, `neq`, `in`, `notIn`, `contains`, `notContains`, `includes`, `notIncludes`
  - `value`: any **required**
- `from`: string **required** — Start of the query range (inclusive).
- `groupBy`: string[] default: `eventName` — Fields to group each bucket by. Each requested field is returned on every slot.
  [array]
- `resolution`: string — Bucket size, for example `15 minutes`, `1 hours`, or `1 days`. Defaults to
- `stats`: string[] default: `eventsTotal`
  [array]
- `to`: string **required** — End of the query range (exclusive). The range must not exceed 30 days.

**Response** 200 → `result`

- `resolution`: string **required** — Bucket size used for the query.
- `slots`: object[] **required**
  [array of]
  - `action`: string — Present when `action` is in `groupBy`.
  - `eventName`: string — Present when `eventName` is in `groupBy`.
  - `eventsTotal`: integer **required**
  - `timestamp`: string **required** — Start of the time bucket.
