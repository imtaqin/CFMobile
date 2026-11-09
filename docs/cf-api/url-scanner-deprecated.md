# URL Scanner (Deprecated)

6 endpoints.

## GET /accounts/{account_id}/urlscanner/response/{response_id}

Get raw response

operationId: `urlscanner-get-response-text`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/urlscanner/scan

Search URL scans

operationId: `urlscanner-search-scans` · query: `scan_id`, `limit`, `next_cursor`, `date_start`, `date_end`, `url`, `hostname`, `path`, `ip`, `hash`, `page_url`, `page_hostname`, `page_path`, `page_asn`, `page_ip`, `account_scans`, `is_malicious`

**Response** 200 → `result`

- `tasks`: object[] **required**
  [array of]
  - `country`: string **required** — Alpha-2 country code
  - `success`: boolean **required** — Whether scan was successful or not
  - `time`: string **required** — When scan was submitted (UTC)
  - `url`: string **required** — Scan url (after redirects)
  - `uuid`: string **required** — Scan id
  - `visibility`: string **required** enum: `public`, `unlisted` — Submitted visibility status.

## POST /accounts/{account_id}/urlscanner/scan

Create URL Scan

operationId: `urlscanner-create-scan`

**Request** (application/json)

- `country`: string enum: `AE`, `AL`, `AM`, `AO`, `AR`, `AT`, `AU`, `AZ` — Country to geo egress from
- `customHeaders`: object — Set custom headers.
- `screenshotsResolutions`: string[] default: `desktop` — Take multiple screenshots targeting different device types.
  [array]
- `url`: string **required**
- `visibility`: string enum: `Public`, `Unlisted` default: `Public` — The option `Public` means it will be included in listings like recent scans and search results. `Unlisted` means it will not be included in 

**Response** 200 → `result`

- `time`: string **required** — Time when url was submitted for scanning.
- `url`: string **required** — Canonical form of submitted URL. Use this if you want to later search by URL.
- `uuid`: string **required** — Scan ID.
- `visibility`: string **required** enum: `public`, `unlisted` — Submitted visibility status.

## GET /accounts/{account_id}/urlscanner/scan/{scan_id}

Get URL scan

operationId: `urlscanner-get-scan` · query: `full`

**Response** 200 → `result`

- `scan`: object **required**
  - `asns`: object — Dictionary of Autonomous System Numbers where ASN's are the keys
    - `asn`: object — ASN's contacted
  - `certificates`: object[] **required**
    [array of]
    - `issuer`: string **required**
    - `subjectName`: string **required**
    - `validFrom`: number **required**
    - `validTo`: number **required**
  - `domains`: object
    - `example.com`: object
  - `geo`: object **required**
    - `continents`: string[] **required**
    - `locations`: string[] **required**
  - `ips`: object
    - `ip`: object
  - `links`: object
    - `link`: object
  - `meta`: object **required**
    - `processors`: object **required**
  - `page`: object **required**
    - `asn`: string **required**
    - `asnLocationAlpha2`: string **required**
    - `asnname`: string **required**
    - `console`: object[] **required**
    - `cookies`: object[] **required**
    - `country`: string **required**
    - `countryLocationAlpha2`: string **required**
    - `domain`: string **required**
    - `headers`: object[] **required**
    - `ip`: string **required**
    - `js`: object **required**
    - `securityViolations`: object[] **required**
    - `status`: number **required**
    - `subdivision1Name`: string **required**
    - `subdivision2name`: string **required**
    - `url`: string **required**
  - `performance`: object[] **required**
    [array of]
    - `connectEnd`: number **required**
    - `connectStart`: number **required**
    - `decodedBodySize`: number **required**
    - `domComplete`: number **required**
    - `domContentLoadedEventEnd`: number **required**
    - `domContentLoadedEventStart`: number **required**
    - `domInteractive`: number **required**
    - `domainLookupEnd`: number **required**
    - `domainLookupStart`: number **required**
    - `duration`: number **required**
    - `encodedBodySize`: number **required**
    - `entryType`: string **required**
    - `fetchStart`: number **required**
    - `initiatorType`: string **required**
    - `loadEventEnd`: number **required**
    - `loadEventStart`: number **required**
    - `name`: string **required**
    - `nextHopProtocol`: string **required**
    - `redirectCount`: number **required**
    - `redirectEnd`: number **required**
    - `redirectStart`: number **required**
    - `requestStart`: number **required**
    - `responseEnd`: number **required**
    - `responseStart`: number **required**
    - `secureConnectionStart`: number **required**
    - `startTime`: number **required**
    - `transferSize`: number **required**
    - `type`: string **required**
    - `unloadEventEnd`: number **required**
    - `unloadEventStart`: number **required**
    - `workerStart`: number **required**
  - `task`: object **required**
    - `clientLocation`: string **required** — Submitter location
    - `clientType`: string **required** enum: `Site`, `Automatic`, `Api`
    - `effectiveUrl`: string **required** — URL of the primary request, after all HTTP redirects
    - `errors`: object[] **required**
    - `scannedFrom`: object **required**
    - `status`: string **required** enum: `Queued`, `InProgress`, `InPostProcessing`, `Finished`
    - `success`: boolean **required**
    - `time`: string **required**
    - `timeEnd`: string **required**
    - `url`: string **required** — Submitted URL
    - `uuid`: string **required** — Scan ID
    - `visibility`: string **required** enum: `Public`, `Unlisted`
  - `verdicts`: object **required**
    - `overall`: object **required**

## GET /accounts/{account_id}/urlscanner/scan/{scan_id}/har

Get URL scan's HAR

operationId: `urlscanner-get-scan-har`

**Response** 200 → `result`

- `har`: object **required**
  - `log`: object **required**
    - `creator`: object **required**
    - `entries`: object[] **required**
    - `pages`: object[] **required**
    - `version`: string **required**

## GET /accounts/{account_id}/urlscanner/scan/{scan_id}/screenshot

Get screenshot

operationId: `urlscanner-get-scan-screenshot` · query: `resolution`

**Response** 200 → `result`

string
