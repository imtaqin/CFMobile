# brapi

27 endpoints.

## POST /accounts/{account_id}/browser-rendering/accessibilityTree

Get accessibility tree page

operationId: `brapi-post_AccessibilityTree` · query: `cacheTTL`, `browser`

**Request** (application/json)

(one of 2 variants; showing the first)
- `html`: string
- `url`: string **required**

**Response** 200 → `result`

- `accessibilityTree`: any **required**

## POST /accounts/{account_id}/browser-rendering/content

Get HTML content.

operationId: `brapi-post_Content` · query: `cacheTTL`, `browser`

**Request** (application/json)

(one of 2 variants; showing the first)
- `html`: string
- `url`: string **required**

**Response** 200 → `result`

string

## POST /accounts/{account_id}/browser-rendering/crawl

Crawl websites.

operationId: `brapi-post_Crawl` · query: `cacheTTL`

**Request** (application/json)

(one of 2 variants; showing the first)
- `actionTimeout`: number — The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, o
- `addScriptTag`: object[] — Adds a script element into the page with the desired URL or content.
  [array of]
  - `content`: string
  - `id`: string
  - `type`: string
  - `url`: string
- `addStyleTag`: object[] — Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.
  [array of]
  - `content`: string
  - `url`: string
- `allowRequestPattern`: string[] — Only allow requests that match the provided regex patterns, eg. '/^.*\.(css)'. Reject rules are applied first.
  [array]
- `allowResourceTypes`: object[] — Only allow requests that match the provided resource types, eg. 'image' or 'script'. Reject rules are applied first.
  [array]
- `authenticate`: object — Provide credentials for HTTP authentication.
  - `password`: string **required**
  - `username`: string **required**
- `bestAttempt`: boolean — Attempt to proceed when 'awaited' events fail or timeout.
- `browser`: string enum: `kitesurf` — Rendering backend for this crawl. Set to `kitesurf` to render pages with Kitesurf (beta). Only valid when `render` is `true`.
- `contentUse`: any default: `full` — Intended content use level to respect the `use` Content-Signal directive in robots.txt. Levels (least to most permissive): 'reference', 'ful
- `cookies`: object[] — Check [options](https://pptr.dev/api/puppeteer.page.setcookie).
  [array of]
  - `domain`: string
  - `expires`: number
  - `httpOnly`: boolean
  - `name`: string **required** — Cookie name.
  - `partitionKey`: string
  - `path`: string
  - `priority`: any
  - `sameParty`: boolean
  - `sameSite`: any
  - `secure`: boolean
  - `sourcePort`: number
  - `sourceScheme`: any
  - `url`: string
  - `value`: string **required**
- `crawlPurposes`: object[] default: `search,ai-input,ai-train` — List of crawl purposes to respect Content-Signal directives in robots.txt. Allowed values: 'search', 'ai-input', 'ai-train'. Learn more: htt
  [array]
- `depth`: number default: `100000` — Maximum number of levels deep the crawler will traverse from the starting URL.
- `emulateMediaType`: string
- `formats`: object[] default: `html` — Formats to return. Default is `html`.
  [array]
- `gotoOptions`: object default: `[object Object]` — Check [options](https://pptr.dev/api/puppeteer.gotooptions).
  - `referer`: string
  - `referrerPolicy`: string
  - `timeout`: number default: `30000`
  - `waitUntil`: any default: `domcontentloaded`
- `jsonOptions`: object — Options for JSON extraction.
  - `custom_ai`: object[] — Optional list of custom AI models to use for the request. The models will be tried in the order provided, and in case a model returns an err
    [array of]
    - `authorization`: string — Authorization token for the AI model: `Bearer <token>`. Not needed for workers-ai models.
    - `model`: string **required** — AI model to use for the request. Must be formed as `<provider>/<model_name>`, e.g. `workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast`.
  - `prompt`: string
  - `response_format`: object
    - `json_schema`: object — Schema for the response format. More information here: https://developers.cloudflare.com/workers-ai/json-mode/
    - `type`: string **required**
- `limit`: number default: `10` — Maximum number of URLs to crawl.
- `maxAge`: number default: `86400` — Maximum age of a resource that can be returned from cache in seconds. Default is 1 day.
- `modifiedSince`: integer — Unix timestamp (seconds since epoch) indicating to only crawl pages that were modified since this time. For sitemap URLs with a lastmod fiel
- `options`: object default: `[object Object]` — Additional options for the crawler.
  - `excludePatterns`: string[] — Exclude links matching the provided wildcard patterns in the crawl job. Example: 'https://example.com/privacy/**'.
    [array]
  - `includeExternalLinks`: boolean default: `false` — Include external links in the crawl job. If set to true, includeSubdomains is ignored.
  - `includePatterns`: string[] — Include only links matching the provided wildcard patterns in the crawl job. Include patterns are evaluated before exclude patterns. URLs th
    [array]
  - `includeSubdomains`: boolean default: `false` — Include links to subdomains in the crawl job. This option is ignored if includeExternalLinks is true.
- `rejectRequestPattern`: string[] — Block undesired requests that match the provided regex patterns, eg. '/^.*\.(css)'.
  [array]
- `rejectResourceTypes`: object[] — Block undesired requests that match the provided resource types, eg. 'image' or 'script'.
  [array]
- `render`: boolean enum: `true` default: `true` — Whether to render the page or fetch static content. True by default.
- `setExtraHTTPHeaders`: object
- `setJavaScriptEnabled`: boolean
- `source`: any default: `all` — Source of links to crawl. 'sitemaps' - only crawl URLs from sitemaps, 'links' - only crawl URLs scraped from pages, 'all' - crawl both sitem
- `url`: string **required** — URL to navigate to, eg. `https://example.com`.
- `viewport`: object default: `[object Object]` — Check [options](https://pptr.dev/api/puppeteer.page.setviewport).
  - `deviceScaleFactor`: number
  - `hasTouch`: boolean
  - `height`: number **required**
  - `isLandscape`: boolean
  - `isMobile`: boolean
  - `width`: number **required**
- `waitForSelector`: object — Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).
  - `hidden`: boolean enum: `true`
  - `selector`: string **required**
  - `timeout`: number
  - `visible`: boolean enum: `true`
- `waitForTimeout`: number — Waits for a specified timeout before continuing.

**Response** 200 → `result`

string

## DELETE /accounts/{account_id}/browser-rendering/crawl/{job_id}

Cancel a crawl job.

operationId: `brapi-delete_CancelCrawl`

**Response** 200 → `result`

- `job_id`: string **required** — The ID of the cancelled job.
- `message`: string **required** — Cancellation confirmation message.

## GET /accounts/{account_id}/browser-rendering/crawl/{job_id}

Get crawl result.

operationId: `brapi-get_CrawlResult` · query: `cacheTTL`, `status`, `cursor`, `limit`

**Response** 200 → `result`

- `browserSecondsUsed`: number **required** — Total seconds spent in browser so far.
- `cursor`: string — Cursor for pagination.
- `finished`: number **required** — Total number of URLs that have been crawled so far.
- `id`: string **required** — Crawl job ID.
- `records`: object[] **required** — List of crawl job records.
  [array of]
  - `html`: string — HTML content of the crawled URL.
  - `json`: object — JSON of the content of the crawled URL.
  - `markdown`: string — Markdown of the content of the crawled URL.
  - `metadata`: object — Absent for urls that never reached a fetch.
    - `lastModified`: string — Value of the Last-Modified response header, when provided by the origin.
    - `og:description`: string — Open Graph description of the crawled page.
    - `og:image`: string — Open Graph image of the crawled page.
    - `og:site_name`: string — Open Graph site name of the crawled page.
    - `og:title`: string — Open Graph title of the crawled page.
    - `og:type`: string — Open Graph type of the crawled page.
    - `status`: number **required** — HTTP status code of the crawled page.
    - `title`: string — Title of the crawled page.
    - `url`: string **required** — Final URL of the crawled page.
  - `outcome`: string enum: `success`, `robots_disallowed`, `crawl_purpose_disallowed`, `content_use_disallowed`, `connection_error`, `timeout`, `browser_unavailable`, `format_generation_error` — Result of processing the URL. Absent for older records.
  - `status`: string **required** enum: `queued`, `errored`, `completed`, `disallowed`, `skipped`, `cancelled` — Current status of the crawled URL.
  - `url`: string **required** — Crawled URL.
- `robots`: object[] **required** — Robots.txt state for the first 50 origins encountered by the crawl.
  [array of]
  - `origin`: string **required** — Origin whose robots.txt was checked.
  - `state`: string **required** enum: `available`, `absent`, `fetch_failed` — Whether usable robots.txt rules were available.
  - `status`: number — HTTP status that established the current robots.txt state. Absent when no HTTP response was received.
- `skipped`: number **required** — Total number of URLs that were skipped due to include/exclude/subdomain filters. Skipped URLs are included in records but are not counted to
- `status`: string **required** — Current crawl job status.
- `total`: number **required** — Total current number of URLs in the crawl job.

## POST /accounts/{account_id}/browser-rendering/devtools/browser

Get a browser session ID.

operationId: `brapi-post_DevtoolsAcquire` · query: `keep_alive`, `lab`, `targets`, `liveViewUrlExpiresInMs`, `recording`

**Request** (application/json)

- `guardrails`: object
  - `allowedDomainSets`: string[] — Max 4 entries: curated preset names (common-cdns) and/or https URLs of newline-separated hostname lists.
    [array]
  - `allowedDomains`: string[] — Hostname patterns, max 50. Supports exact hosts (example.com) or a single * wildcard anywhere. Prefer *.example.com (subdomain wildcard) ove
    [array]

**Response** 200 → `result`

- `sessionId`: string **required** — Browser session ID.
- `webSocketDebuggerUrl`: string — WebSocket URL for the session.

## DELETE /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}

Close browser session.

operationId: `brapi-delete_DevtoolsBrowserDelete`

**Response** 200 → `result`

- `status`: string **required** enum: `closing`, `closed`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json

List targets.

operationId: `brapi-get_DevtoolsJson` · query: `liveViewUrlExpiresInMs`

**Response** 200 → `result`

[array of]
- `description`: string — Target description.
- `devtoolsFrontendUrl`: string — DevTools frontend URL.
- `id`: string **required** — Target ID.
- `title`: string — Title of the target.
- `type`: string **required** — Target type (page, background_page, worker, etc.).
- `url`: string **required** — URL of the target.
- `webSocketDebuggerUrl`: string — WebSocket URL for debugging this target.

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/activate/{target_id}

Activate a browser target.

operationId: `brapi-get_DevtoolsJsonActivate`

**Response** 200 → `result`

- `message`: string **required** — Target activated.

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/close/{target_id}

Close a browser target.

operationId: `brapi-get_DevtoolsJsonClose`

**Response** 200 → `result`

- `message`: string **required** — Target is closing.

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/list

List targets.

operationId: `brapi-get_DevtoolsJsonList` · query: `liveViewUrlExpiresInMs`

**Response** 200 → `result`

[array of]
- `description`: string — Target description.
- `devtoolsFrontendUrl`: string — DevTools frontend URL.
- `id`: string **required** — Target ID.
- `title`: string — Title of the target.
- `type`: string **required** — Target type (page, background_page, worker, etc.).
- `url`: string **required** — URL of the target.
- `webSocketDebuggerUrl`: string — WebSocket URL for debugging this target.

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/list/{target_id}

Get a target by ID.

operationId: `brapi-get_DevtoolsJsonTarget`

**Response** 200 → `result`

- `description`: string — Target description.
- `devtoolsFrontendUrl`: string — DevTools frontend URL.
- `id`: string **required** — Target ID.
- `title`: string — Title of the target.
- `type`: string **required** — Target type (page, background_page, worker, etc.).
- `url`: string **required** — URL of the target.
- `webSocketDebuggerUrl`: string — WebSocket URL for debugging this target.

## PUT /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/new

Open a new browser tab.

operationId: `brapi-put_DevtoolsJsonNew` · query: `url`, `liveViewUrlExpiresInMs`

**Response** 200 → `result`

- `description`: string — Target description.
- `devtoolsFrontendUrl`: string — DevTools frontend URL.
- `id`: string **required** — Target ID.
- `title`: string — Title of the target.
- `type`: string **required** — Target type (page, background_page, worker, etc.).
- `url`: string **required** — URL of the target.
- `webSocketDebuggerUrl`: string — WebSocket URL for debugging this target.

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/protocol

Get Chrome DevTools Protocol schema.

operationId: `brapi-get_DevtoolsJsonProtocol`

**Response** 200 → `result`

- `domains`: object[] **required** — List of protocol domains.
  [array of]
  - `commands`: object[] — Available commands.
    [array]
  - `dependencies`: string[] — Domain dependencies.
    [array]
  - `domain`: string **required** — Domain name.
  - `events`: object[] — Available events.
    [array]
  - `experimental`: boolean — Whether this domain is experimental.
  - `types`: object[] — Type definitions.
    [array]
- `version`: object — Protocol version.
  - `major`: string **required** — Major version.
  - `minor`: string **required** — Minor version.

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/version

Get browser version metadata.

operationId: `brapi-get_DevtoolsJsonVersion`

**Response** 200 → `result`

- `Browser`: string **required** — Browser name and version.
- `Protocol-Version`: string **required** — Chrome DevTools Protocol version.
- `User-Agent`: string **required** — User agent string.
- `V8-Version`: string **required** — V8 JavaScript engine version.
- `WebKit-Version`: string **required** — WebKit version.
- `webSocketDebuggerUrl`: string **required** — WebSocket URL for debugging the browser.

## POST /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/live_view

Mint live view URLs for a browser session

operationId: `brapi-post_DevtoolsLiveView`

**Request** (application/json)

- `expiresInMs`: number default: `300000` — How long the live view URLs remain valid, in milliseconds. Default: 5 minutes. Max: 60 minutes.
- `guardrails`: object — Connection guardrails. Use `{ mode: 'readonly' }` to generate a view-only link.
  - `mode`: string **required** enum: `readonly`
- `mode`: string enum: `devtools`, `tab`, `full` default: `devtools` — UI mode: 'devtools' (Chrome DevTools), 'tab' (single tab view), 'full' (multi-tab browser)
- `targetId`: string — Target ID (page) to connect to. If omitted, auto-resolves to the first active page.

**Response** 200 → `result`

- `devtoolsFrontendUrl`: string **required** — URL to open the live view in a browser
- `id`: string **required** — Target ID
- `options`: object **required**
  - `guardrails`: object — Connection guardrails applied to this link
    - `mode`: string **required** enum: `readonly`
  - `mode`: string **required** enum: `devtools`, `tab`, `full` — UI mode for the live view
- `webSocketDebuggerUrl`: string **required** — WebSocket URL for CDP connection

## GET /accounts/{account_id}/browser-rendering/devtools/session

List sessions.

operationId: `brapi-get_DevtoolsSessionList` · query: `limit`, `offset`

**Response** 200 → `result`

[array of]
- `closeReason`: number — Reason code for session closure.
- `closeReasonText`: string — Human-readable close reason.
- `connectionEndTime`: number — Connection end time.
- `connectionId`: string — Connection ID.
- `connectionStartTime`: number — Connection start time.
- `devtoolsFrontendUrl`: string — DevTools frontend URL.
- `endTime`: number — Session end time.
- `lastUpdated`: number — Last updated timestamp.
- `sessionId`: string **required** — Session ID.
- `startTime`: number — Session start time.
- `webSocketDebuggerUrl`: string — WebSocket URL for debugging this target.

## GET /accounts/{account_id}/browser-rendering/devtools/session/{session_id}

Get session details.

operationId: `brapi-get_DevtoolsSessionDetails`

**Response** 200 → `result`

- `closeReason`: number — Reason code for session closure.
- `closeReasonText`: string — Human-readable close reason.
- `connectionEndTime`: number — Connection end time.
- `connectionId`: string — Connection ID.
- `connectionStartTime`: number — Connection start time.
- `devtoolsFrontendUrl`: string — DevTools frontend URL.
- `endTime`: number — Session end time.
- `lastUpdated`: number — Last updated timestamp.
- `sessionId`: string **required** — Session ID.
- `startTime`: number — Session start time.
- `webSocketDebuggerUrl`: string — WebSocket URL for debugging this target.

## POST /accounts/{account_id}/browser-rendering/json

Get json.

operationId: `brapi-post_Json` · query: `cacheTTL`, `browser`

**Request** (application/json)

(one of 2 variants; showing the first)
- `html`: string
- `url`: string **required**

**Response** 200 → `result`

object

## POST /accounts/{account_id}/browser-rendering/links

Get Links.

operationId: `brapi-post_Links` · query: `cacheTTL`, `browser`

**Request** (application/json)

(one of 2 variants; showing the first)
- `html`: string
- `url`: string **required**

**Response** 200 → `result`

[array of]
string

## POST /accounts/{account_id}/browser-rendering/markdown

Get markdown.

operationId: `brapi-post_Markdown` · query: `cacheTTL`, `browser`

**Request** (application/json)

(one of 2 variants; showing the first)
- `html`: string
- `url`: string **required**

**Response** 200 → `result`

string

## POST /accounts/{account_id}/browser-rendering/pdf

Get PDF.

operationId: `brapi-post_Pdf` · query: `cacheTTL`, `browser`

**Request** (application/json)

(one of 2 variants; showing the first)
- `html`: string
- `url`: string **required**

**Response** 200 → `result`

string

## GET /accounts/{account_id}/browser-rendering/recording/{session_id}

Get recording data.

operationId: `brapi-get_Recording`

**Response** 200 → `result`

- `duration`: number **required** — Recording duration in milliseconds.
- `events`: object **required** — Recording events by target ID.
- `sessionId`: string **required** — Session ID.

## GET /accounts/{account_id}/browser-rendering/recording/{session_id}/network

Get network recording data.

operationId: `brapi-get_RecordingNetwork` · query: `format`, `target`

**Response** 200 → `result`

object

## POST /accounts/{account_id}/browser-rendering/scrape

Scrape elements.

operationId: `brapi-post_Scrape` · query: `cacheTTL`, `browser`

**Request** (application/json)

(one of 2 variants; showing the first)
- `html`: string
- `url`: string **required**

**Response** 200 → `result`

[array of]
- `results`: object **required**
  - `attributes`: object[] **required**
    [array of]
    - `name`: string **required** — Attribute name.
    - `value`: string **required** — Attribute value.
  - `height`: number **required** — Element height.
  - `html`: string **required** — HTML content.
  - `left`: number **required** — Element left.
  - `text`: string **required** — Text content.
  - `top`: number **required** — Element top.
  - `width`: number **required** — Element width.
- `selector`: string **required** — Selector.

## POST /accounts/{account_id}/browser-rendering/screenshot

Get screenshot.

operationId: `brapi-post_Screenshot` · query: `cacheTTL`, `browser`

**Request** (application/json)

(one of 2 variants; showing the first)
- `html`: string
- `url`: string **required**

**Response** 200 → `result`

- `errors`: object[]
  [array of]
  - `code`: number **required** — Error code.
  - `message`: string **required** — Error message.
- `success`: boolean **required** — Response status.

## POST /accounts/{account_id}/browser-rendering/snapshot

Get HTML content and screenshot.

operationId: `brapi-post_Snapshot` · query: `cacheTTL`, `browser`

**Request** (application/json)

(one of 2 variants; showing the first)
- `html`: string
- `url`: string **required**

**Response** 200 → `result`

- `accessibilityTree`: object — Accessibility tree node
  - `autocomplete`: string
  - `checked`: any
  - `children`: object[]
    [array of]
    - `autocomplete`: string
    - `checked`: any
    - `children`: object[]
    - `description`: string
    - `disabled`: boolean
    - `expanded`: boolean
    - `focused`: boolean
    - `haspopup`: string
    - `invalid`: string
    - `keyshortcuts`: string
    - `level`: number
    - `modal`: boolean
    - `multiline`: boolean
    - `multiselectable`: boolean
    - `name`: string
    - `orientation`: string
    - `pressed`: any
    - `readonly`: boolean
    - `required`: boolean
    - `role`: string **required**
    - `roledescription`: string
    - `selected`: boolean
    - `value`: any
    - `valuemax`: number
    - `valuemin`: number
    - `valuetext`: string
  - `description`: string
  - `disabled`: boolean
  - `expanded`: boolean
  - `focused`: boolean
  - `haspopup`: string
  - `invalid`: string
  - `keyshortcuts`: string
  - `level`: number
  - `modal`: boolean
  - `multiline`: boolean
  - `multiselectable`: boolean
  - `name`: string
  - `orientation`: string
  - `pressed`: any
  - `readonly`: boolean
  - `required`: boolean
  - `role`: string **required**
  - `roledescription`: string
  - `selected`: boolean
  - `value`: any
  - `valuemax`: number
  - `valuemin`: number
  - `valuetext`: string
- `content`: string — HTML content.
- `markdown`: string — Markdown content. Prefixed with YAML frontmatter (e.g. `title`) when the page provides that metadata.
- `screenshot`: string — Base64 encoded image.
