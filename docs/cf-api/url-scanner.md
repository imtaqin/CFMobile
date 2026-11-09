# URL Scanner

8 endpoints.

## POST /accounts/{account_id}/urlscanner/v2/bulk

Bulk create URL Scans

operationId: `urlscanner-create-scan-bulk-v2`

**Request** (application/json)

[array of]
- `agentReadiness`: boolean — Enable agent readiness checks.
- `customHeaders`: object — Set custom headers.
- `customagent`: string
- `referer`: string
- `screenshotsResolutions`: string[] default: `desktop` — Take multiple screenshots targeting different device types.
  [array]
- `url`: string **required**
- `visibility`: string enum: `Public`, `Unlisted` default: `Public` — The option `Public` means it will be included in listings like recent scans and search results. `Unlisted` means it will not be included in 

**Response** 200 → `result`

[array of]
- `api`: string **required** — URL to api report.
- `options`: object
  - `useragent`: string
- `result`: string **required** — URL to report.
- `url`: string **required** — Submitted URL
- `uuid`: string **required** — Scan ID.
- `visibility`: string **required** enum: `public`, `unlisted` — Submitted visibility status.

## GET /accounts/{account_id}/urlscanner/v2/dom/{scan_id}

Get URL scan's DOM

operationId: `urlscanner-get-scan-dom-v2`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/urlscanner/v2/har/{scan_id}

Get URL scan's HAR

operationId: `urlscanner-get-scan-har-v2`

**Response** 200 → `result`

- `log`: object **required**
  - `creator`: object **required**
    - `comment`: string **required**
    - `name`: string **required**
    - `version`: string **required**
  - `entries`: object[] **required**
    [array of]
    - `_initialPriority`: string **required**
    - `_initiator_type`: string **required**
    - `_priority`: string **required**
    - `_requestId`: string **required**
    - `_requestTime`: number **required**
    - `_resourceType`: string **required**
    - `cache`: object **required**
    - `connection`: string **required**
    - `pageref`: string **required**
    - `request`: object **required**
    - `response`: object **required**
    - `serverIPAddress`: string **required**
    - `startedDateTime`: string **required**
    - `time`: number **required**
  - `pages`: object[] **required**
    [array of]
    - `id`: string **required**
    - `pageTimings`: object **required**
    - `startedDateTime`: string **required**
    - `title`: string **required**
  - `version`: string **required**

## GET /accounts/{account_id}/urlscanner/v2/responses/{response_id}

Get raw response

operationId: `urlscanner-get-response-v2`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/urlscanner/v2/result/{scan_id}

Get URL scan

operationId: `urlscanner-get-scan-v2`

**Response** 200 → `result`

- `data`: object **required**
  - `console`: object[] **required**
    [array of]
    - `message`: object **required**
  - `cookies`: object[] **required**
    [array of]
    - `domain`: string **required**
    - `expires`: number **required**
    - `httpOnly`: boolean **required**
    - `name`: string **required**
    - `path`: string **required**
    - `priority`: string **required**
    - `sameParty`: boolean **required**
    - `secure`: boolean **required**
    - `session`: boolean **required**
    - `size`: number **required**
    - `sourcePort`: number **required**
    - `sourceScheme`: string **required**
    - `value`: string **required**
  - `globals`: object[] **required**
    [array of]
    - `prop`: string **required**
    - `type`: string **required**
  - `links`: object[] **required**
    [array of]
    - `href`: string **required**
    - `text`: string **required**
  - `performance`: object[] **required**
    [array of]
    - `duration`: number **required**
    - `entryType`: string **required**
    - `name`: string **required**
    - `startTime`: number **required**
  - `requests`: object[] **required**
    [array of]
    - `request`: object **required**
    - `requests`: object[]
    - `response`: object **required**
- `lists`: object **required**
  - `asns`: string[] **required**
    [array]
  - `certificates`: object[] **required**
    [array of]
    - `issuer`: string **required**
    - `subjectName`: string **required**
    - `validFrom`: number **required**
    - `validTo`: number **required**
  - `continents`: string[] **required**
    [array]
  - `countries`: string[] **required**
    [array]
  - `domains`: string[] **required**
    [array]
  - `hashes`: string[] **required**
    [array]
  - `ips`: string[] **required**
    [array]
  - `linkDomains`: string[] **required**
    [array]
  - `servers`: string[] **required**
    [array]
  - `urls`: string[] **required**
    [array]
- `meta`: object **required**
  - `processors`: object **required**
    - `agentReadiness`: object
    - `asn`: object **required**
    - `dns`: object **required**
    - `domainCategories`: object **required**
    - `geoip`: object **required**
    - `phishing`: object **required**
    - `phishing_v2`: object
    - `radarRank`: object **required**
    - `robotsTxt`: object
    - `urlCategories`: object
    - `wappa`: object **required**
- `page`: object **required**
  - `apexDomain`: string **required**
  - `asn`: string **required**
  - `asnname`: string **required**
  - `city`: string **required**
  - `country`: string **required**
  - `domain`: string **required**
  - `ip`: string **required**
  - `mimeType`: string **required**
  - `screenshot`: object
    - `dhash`: string **required**
    - `mm3Hash`: number **required**
    - `name`: string **required**
    - `phash`: string **required**
  - `server`: string **required**
  - `status`: string **required**
  - `title`: string **required**
  - `tlsAgeDays`: number **required**
  - `tlsIssuer`: string **required**
  - `tlsValidDays`: number **required**
  - `tlsValidFrom`: string **required**
  - `url`: string **required**
- `scanner`: object **required**
  - `colo`: string **required**
  - `country`: string **required**
- `stats`: object **required**
  - `IPv6Percentage`: number **required**
  - `domainStats`: object[] **required**
    [array of]
    - `count`: number **required**
    - `countries`: string[] **required**
    - `domain`: string **required**
    - `encodedSize`: number **required**
    - `index`: number **required**
    - `initiators`: string[] **required**
    - `ips`: string[] **required**
    - `redirects`: number **required**
    - `size`: number **required**
  - `ipStats`: object[] **required**
    [array of]
    - `asn`: object **required**
    - `count`: number
    - `countries`: string[] **required**
    - `domains`: string[] **required**
    - `encodedSize`: number **required**
    - `geoip`: object **required**
    - `index`: number **required**
    - `ip`: string **required**
    - `ipv6`: boolean **required**
    - `redirects`: number **required**
    - `requests`: number **required**
    - `size`: number **required**
  - `malicious`: number **required**
  - `protocolStats`: object[] **required**
    [array of]
    - `count`: number **required**
    - `countries`: string[] **required**
    - `encodedSize`: number **required**
    - `ips`: string[] **required**
    - `protocol`: string **required**
    - `size`: number **required**
  - `resourceStats`: object[] **required**
    [array of]
    - `compression`: number **required**
    - `count`: number **required**
    - `countries`: string[] **required**
    - `encodedSize`: number **required**
    - `ips`: string[] **required**
    - `percentage`: number **required**
    - `size`: number **required**
    - `type`: string **required**
  - `securePercentage`: number **required**
  - `secureRequests`: number **required**
  - `serverStats`: object[] **required**
    [array of]
    - `count`: number **required**
    - `countries`: string[] **required**
    - `encodedSize`: number **required**
    - `ips`: string[] **required**
    - `server`: string **required**
    - `size`: number **required**
  - `tlsStats`: object[] **required**
    [array of]
    - `count`: number **required**
    - `countries`: string[] **required**
    - `encodedSize`: number **required**
    - `ips`: string[] **required**
    - `protocols`: object **required**
    - `securityState`: string **required**
    - `size`: number **required**
  - `totalLinks`: number **required**
  - `uniqASNs`: number **required**
  - `uniqCountries`: number **required**
- `task`: object **required**
  - `apexDomain`: string **required**
  - `domURL`: string **required**
  - `domain`: string **required**
  - `method`: string **required**
  - `options`: object **required**
    - `customHeaders`: object — Custom headers set.
    - `screenshotsResolutions`: string[]
  - `reportURL`: string **required**
  - `screenshotURL`: string **required**
  - `source`: string **required**
  - `success`: boolean **required**
  - `time`: string **required**
  - `url`: string **required**
  - `uuid`: string **required**
  - `visibility`: string **required**
- `verdicts`: object **required**
  - `overall`: object **required**
    - `categories`: string[] **required**
    - `hasVerdicts`: boolean **required**
    - `malicious`: boolean **required**
    - `tags`: string[] **required**

## POST /accounts/{account_id}/urlscanner/v2/scan

Create URL Scan

operationId: `urlscanner-create-scan-v2`

**Request** (application/json)

- `agentReadiness`: boolean — Enable agent readiness checks.
- `country`: string enum: `AE`, `AL`, `AM`, `AO`, `AR`, `AT`, `AU`, `AZ` — Country to geo egress from
- `customHeaders`: object — Set custom headers.
- `customagent`: string
- `referer`: string
- `screenshotsResolutions`: string[] default: `desktop` — Take multiple screenshots targeting different device types.
  [array]
- `url`: string **required**
- `visibility`: string enum: `Public`, `Unlisted` default: `Public` — The option `Public` means it will be included in listings like recent scans and search results. `Unlisted` means it will not be included in 

**Response** 200 → `result`

string

## GET /accounts/{account_id}/urlscanner/v2/screenshots/{scan_id}.png

Get screenshot

operationId: `urlscanner-get-scan-screenshot-v2` · query: `resolution`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/urlscanner/v2/search

Search URL scans

operationId: `urlscanner-search-scans-v2` · query: `size`, `q`

**Response** 200 → `result`

- `results`: object[] **required**
  [array of]
  - `_id`: string **required**
  - `page`: object **required**
    - `asn`: string **required**
    - `country`: string **required**
    - `ip`: string **required**
    - `url`: string **required**
  - `result`: string **required**
  - `stats`: object **required**
    - `dataLength`: number **required**
    - `requests`: number **required**
    - `uniqCountries`: number **required**
    - `uniqIPs`: number **required**
  - `task`: object **required**
    - `time`: string **required**
    - `url`: string **required**
    - `uuid`: string **required**
    - `visibility`: string **required**
  - `verdicts`: object **required**
    - `malicious`: boolean **required**
