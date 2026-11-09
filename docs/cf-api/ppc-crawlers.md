# ppc_crawlers

1 endpoints.

## GET /accounts/{account_id}/pay-per-crawl/crawlers

List pay-per-crawl crawlers

operationId: `pay-per-crawl.listCrawlers`

**Response** 200 → `result`

- `crawlers`: object[]
  [array of]
  - `bot_management`: boolean
  - `category`: string
  - `category_id`: integer
  - `heuristic_id`: integer
  - `info_url`: string
  - `managed`: boolean
  - `name`: string
  - `onboarded`: boolean
  - `operator`: string
  - `slug`: string
  - `testing_id`: string
  - `user_agent`: string
  - `verified_id`: integer
  - `visible`: boolean
  - `wba_id`: string
