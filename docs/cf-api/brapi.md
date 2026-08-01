# brapi

27 endpoints.

## POST /accounts/{account_id}/browser-rendering/accessibilityTree

Get accessibility tree page

operationId: `brapi-post_AccessibilityTree` · query: `cacheTTL`

## POST /accounts/{account_id}/browser-rendering/content

Get HTML content.

operationId: `brapi-post_Content` · query: `cacheTTL`

## POST /accounts/{account_id}/browser-rendering/crawl

Crawl websites.

operationId: `brapi-post_Crawl` · query: `cacheTTL`

## DELETE /accounts/{account_id}/browser-rendering/crawl/{job_id}

Cancel a crawl job.

operationId: `brapi-delete_CancelCrawl`

## GET /accounts/{account_id}/browser-rendering/crawl/{job_id}

Get crawl result.

operationId: `brapi-get_CrawlResult` · query: `cacheTTL`, `status`, `cursor`, `limit`

## GET /accounts/{account_id}/browser-rendering/devtools/browser

Acquire and connect to browser session.

operationId: `brapi-get_DevtoolsBrowserAcquire` · query: `keep_alive`, `lab`, `recording`

## POST /accounts/{account_id}/browser-rendering/devtools/browser

Get a browser session ID.

operationId: `brapi-post_DevtoolsAcquire` · query: `keep_alive`, `lab`, `targets`, `liveViewUrlExpiresInMs`, `recording`

## DELETE /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}

Close browser session.

operationId: `brapi-delete_DevtoolsBrowserDelete`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}

Connect to browser session.

operationId: `brapi-get_DevtoolsBrowser` · query: `keep_alive`, `lab`, `recording`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json

List targets.

operationId: `brapi-get_DevtoolsJson` · query: `liveViewUrlExpiresInMs`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/activate/{target_id}

Activate a browser target.

operationId: `brapi-get_DevtoolsJsonActivate`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/close/{target_id}

Close a browser target.

operationId: `brapi-get_DevtoolsJsonClose`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/list

List targets.

operationId: `brapi-get_DevtoolsJsonList` · query: `liveViewUrlExpiresInMs`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/list/{target_id}

Get a target by ID.

operationId: `brapi-get_DevtoolsJsonTarget`

## PUT /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/new

Open a new browser tab.

operationId: `brapi-put_DevtoolsJsonNew` · query: `url`, `liveViewUrlExpiresInMs`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/protocol

Get Chrome DevTools Protocol schema.

operationId: `brapi-get_DevtoolsJsonProtocol`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/version

Get browser version metadata.

operationId: `brapi-get_DevtoolsJsonVersion`

## GET /accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/page/{target_id}

Connect to a specific Chrome DevTools page.

operationId: `brapi-get_DevtoolsPage`

## GET /accounts/{account_id}/browser-rendering/devtools/session

List sessions.

operationId: `brapi-get_DevtoolsSessionList` · query: `limit`, `offset`

## GET /accounts/{account_id}/browser-rendering/devtools/session/{session_id}

Get session details.

operationId: `brapi-get_DevtoolsSessionDetails`

## POST /accounts/{account_id}/browser-rendering/json

Get json.

operationId: `brapi-post_Json` · query: `cacheTTL`

## POST /accounts/{account_id}/browser-rendering/links

Get Links.

operationId: `brapi-post_Links` · query: `cacheTTL`

## POST /accounts/{account_id}/browser-rendering/markdown

Get markdown.

operationId: `brapi-post_Markdown` · query: `cacheTTL`

## POST /accounts/{account_id}/browser-rendering/pdf

Get PDF.

operationId: `brapi-post_Pdf` · query: `cacheTTL`

## POST /accounts/{account_id}/browser-rendering/scrape

Scrape elements.

operationId: `brapi-post_Scrape` · query: `cacheTTL`

## POST /accounts/{account_id}/browser-rendering/screenshot

Get screenshot.

operationId: `brapi-post_Screenshot` · query: `cacheTTL`

## POST /accounts/{account_id}/browser-rendering/snapshot

Get HTML content and screenshot.

operationId: `brapi-post_Snapshot` · query: `cacheTTL`
