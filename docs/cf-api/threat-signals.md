# Threat Signals

32 endpoints.

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles

List Threat Signals articles

operationId: `rssArticleList` · query: `cursor`, `per_page`, `feed_id`, `article_id`, `read`, `tag_id`, `tag_category_id`, `tag`, `tag_category`, `include_total`, `search`, `published_after`, `published_before`, `fetched_after`, `fetched_before`, `feed_category`, `source_type`, `tag_applied_by`, `pir_id`, `min_relevance`, `severity`, `sort`

**Response** 200 → `result`

- `articles`: object[] **required**
  [array of]
  - `dataset_id`: string **required** — Threat Events dataset identifier for the article redirect. Null when the account feeds dataset mapping is unavailable.
  - `event_id`: string **required** — Threat Events event identifier associated with this article for a UI redirect. Null when no event has been linked.
  - `feed_display_name`: string **required**
  - `feed_id`: string **required**
  - `fetched_at`: string **required**
  - `id`: string **required**
  - `link`: string **required**
  - `published_at`: string **required**
  - `read`: boolean **required**
  - `read_at`: string **required**
  - `relevance`: object **required** — Beta. The article's relevance to the account's active Priority Intelligence Requirements. Null when the article has not been scored against 
    - `band`: string **required** enum: `low`, `medium`, `high` — Beta. How relevant the article is to a Priority Intelligence Requirement: high, medium, or low. Cloudflare may change the scores behind each
    - `pir_id`: string **required** — Beta. The pir_id requested from the article list, or otherwise the account's most relevant active PIR for this article.
    - `pirs`: object[] **required** — Beta. Every active PIR the article was scored against, most relevant first. Draft and deleted PIRs are excluded.
  - `severity`: string **required** enum: `informational`, `low`, `medium`, `high`, `critical` — Beta. Intrinsic article severity band, from informational to critical, independent of any organisation or Priority Intelligence Requirement.
  - `summary`: string **required** — Persisted enrichment summary. Null until enrichment produces a summary.
  - `tags`: object[] **required**
    [array of]
    - `applied_by`: string **required** enum: `ai`, `analyst`, `system`
    - `categoryId`: string **required**
    - `uuid`: string **required**
    - `value`: string **required**
  - `title`: string **required**
- `has_more`: boolean **required**
- `next_cursor`: string **required**
- `total_count`: number **required**
- `total_count_is_exact`: boolean **required**

## PATCH /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles

Bulk update Threat Signals article read status

operationId: `rssArticleBulkMarkRead`

**Request** (application/json)

- `article_ids`: string[] **required** — Array of article UUIDs to mark (1-50).
  [array]
- `read`: boolean **required** — True to mark read, false to mark unread.

**Response** 200 → `result`

- `updated_count`: number **required**

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}

Get Threat Signals article

operationId: `rssArticleGet`

**Response** 200 → `result`

- `bullet_points`: object **required**
  - `impact`: string **required**
  - `what_happened`: string **required**
  - `who_affected`: string **required**
- `content_r2_key`: string **required**
- `feed_display_name`: string **required**
- `feed_id`: string **required**
- `fetched_at`: string **required**
- `id`: string **required**
- `indicator_extraction_status`: string **required** enum: `in_progress`, `complete`, `failed`, `unknown` — Progress of the article's indicator extraction and IOC contextualization run. complete and failed are terminal; unknown means no run has bee
- `link`: string **required**
- `metadata`: object **required**
- `published_at`: string **required**
- `read`: boolean **required**
- `read_at`: string **required**
- `relevance`: object **required** — Beta. The article's relevance to the account's active Priority Intelligence Requirements. Null when the article has not been scored against 
  - `band`: string **required** enum: `low`, `medium`, `high` — Beta. How relevant the article is to a Priority Intelligence Requirement: high, medium, or low. Cloudflare may change the scores behind each
  - `pir_id`: string **required** — Beta. The pir_id requested from the article list, or otherwise the account's most relevant active PIR for this article.
  - `pirs`: object[] **required** — Beta. Every active PIR the article was scored against, most relevant first. Draft and deleted PIRs are excluded.
    [array of]
    - `band`: string **required** enum: `low`, `medium`, `high` — Beta. How relevant the article is to a Priority Intelligence Requirement: high, medium, or low. Cloudflare may change the scores behind each
    - `pir_id`: string **required**
- `severity`: string **required** enum: `informational`, `low`, `medium`, `high`, `critical` — Beta. Intrinsic article severity band, from informational to critical, independent of any organisation or Priority Intelligence Requirement.
- `skill_version`: string
- `source_count`: number **required**
- `summary`: string **required** — Persisted enrichment summary. Null until enrichment produces a summary.
- `summary_r2_key`: string **required**
- `tag_skill_version`: string
- `tags`: object[] **required**
  [array of]
  - `applied_by`: string **required** enum: `ai`, `analyst`, `system`
  - `categoryId`: string **required**
  - `uuid`: string **required**
  - `value`: string **required**
- `title`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}

Update Threat Signals article read status

operationId: `rssArticleMarkRead`

**Request** (application/json)

- `read`: boolean **required** — True to mark the article read, false to mark unread.

**Response** 200 → `result`

- `bullet_points`: object **required**
  - `impact`: string **required**
  - `what_happened`: string **required**
  - `who_affected`: string **required**
- `content_r2_key`: string **required**
- `feed_display_name`: string **required**
- `feed_id`: string **required**
- `fetched_at`: string **required**
- `id`: string **required**
- `indicator_extraction_status`: string **required** enum: `in_progress`, `complete`, `failed`, `unknown` — Progress of the article's indicator extraction and IOC contextualization run. complete and failed are terminal; unknown means no run has bee
- `link`: string **required**
- `metadata`: object **required**
- `published_at`: string **required**
- `read`: boolean **required**
- `read_at`: string **required**
- `severity`: string **required** enum: `informational`, `low`, `medium`, `high`, `critical` — Beta. Intrinsic article severity band, from informational to critical, independent of any organisation or Priority Intelligence Requirement.
- `skill_version`: string
- `source_count`: number **required**
- `summary`: string **required** — Persisted enrichment summary. Null until enrichment produces a summary.
- `summary_r2_key`: string **required**
- `tag_skill_version`: string
- `tags`: object[] **required**
  [array of]
  - `applied_by`: string **required** enum: `ai`, `analyst`, `system`
  - `categoryId`: string **required**
  - `uuid`: string **required**
  - `value`: string **required**
- `title`: string **required**

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}/content

Get Threat Signals article content

operationId: `rssArticleContentGet` · query: `format`

**Response** 200 → `result`

string

## POST /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}/reprocess

Reprocess a Threat Signals article

operationId: `rssArticleReprocess`

**Request** (application/json)

object

**Response** 200 → `result`

- `article_id`: string **required**
- `event_id`: string **required** — The article's Threat Event ID after the run, or null when it has none or its existence could not be confirmed. An existing Event is never up
- `outcome`: string **required** enum: `completed`, `failed`, `superseded` — `completed` when every step succeeded, `failed` when at least one step failed, or `superseded` when another reprocess took over the article 
- `pending_retry`: boolean **required** — True when the article returned to pending and the next feed poll will retry it.
- `steps`: object[] **required** — Per-step result, in pipeline order.
  [array of]
  - `outcome`: string **required** enum: `completed`, `noop`, `failed`, `skipped`
  - `step`: string **required** enum: `pull`, `clean`, `extract`, `filter`, `summary`, `cves`, `ioc_context`, `tags`

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}/skills

List Threat Signals article custom skills

operationId: `rssArticleCustomSkillsList`

**Response** 200 → `result`

- `count`: integer **required** — Number of returned custom skills, capped at 20.
- `skills`: object[] **required**
  [array of]
  - `name`: string **required** — Current custom skill name.
  - `output_saved_at`: string **required** — RFC3339 time at which the stored output row was last written; null when no output is stored.
  - `output_status`: string **required** enum: `available`, `no_output` — Whether a stored output is available for this article and custom skill.
  - `output_validation_status`: string **required** enum: `valid`, `invalid_json`, `schema_invalid`, `unknown` — Validation classification for the stored output. `unknown` denotes a legacy historical validation state; null when no output is stored.
  - `skill_id`: string **required** — UUID of the active custom skill.

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}/skills/{skill_id}/output

Get Threat Signals article skill output

operationId: `rssArticleSkillOutputGet`

**Response** 200 → `result`

- `article_id`: string **required** — Article UUID that received the skill output.
- `custom_output`: any **required** — Untrusted model output: parsed JSON when the stored completion text is valid JSON, otherwise raw text. Consumers must safely render or escap
- `custom_output_parse_status`: string **required** enum: `parsed`, `invalid_json` — Whether custom_output was parsed from the stored completion text.
- `custom_output_validation_status`: string **required** enum: `valid`, `invalid_json`, `schema_invalid`, `unknown` — Non-blocking validation classification for untrusted model output. `unknown` is retained only for historical rows.
- `custom_skill_version`: string **required** — Custom Skill version that produced the output. Null when historical metadata is unavailable.
- `output_schema`: string **required** — JSON-encoded output schema. Null when historical skill metadata is unavailable.
- `skill_id`: string **required** — Custom Skill UUID that produced the output.

## POST /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}/skills/{skill_id}/run

Run and persist skill output for a Threat Signals article

operationId: `rssArticleSkillRun`

**Request** (application/json)

object

**Response** 200 → `result`

(one of 2 variants; showing the first)
(one of 3 variants; showing the first)
- `bullet_points`: object **required**
  - `impact`: string **required**
  - `what_happened`: string **required**
  - `who_affected`: string **required**
- `persisted`: boolean **required** enum: `true`
- `skill_id`: string **required** enum: `default-summary-skill`
- `skill_version`: string **required**
- `summary`: string **required**

## POST /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}/tag

Generate Threat Signals article AI tags

operationId: `rssArticleTagGenerate`

**Response** 200 → `result`

- `tag_skill_version`: string **required**
- `tags`: object[] **required** — Final hydrated assignment set; may be empty when no applicable tags are selected.
  [array of]
  - `applied_by`: string **required** enum: `ai`, `analyst`, `system`
  - `categoryId`: string **required**
  - `uuid`: string **required**
  - `value`: string **required**

## POST /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}/tags

Add tag to Threat Signals article

operationId: `rssArticleTagAdd`

**Request** (application/json)

- `tag_id`: string **required** — UUID of a tag from the account's catalog to apply to the article.

**Response** 201 → `result`

- `applied_by`: string **required** enum: `ai`, `analyst`, `system`
- `categoryId`: string **required**
- `uuid`: string **required**
- `value`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/{article_id}/tags/{tag_id}

Remove tag from Threat Signals article

operationId: `rssArticleTagRemove`

**Response** 200 → `result`

- `applied_by`: string **required** enum: `ai`, `analyst`, `system`
- `categoryId`: string **required**
- `uuid`: string **required**
- `value`: string **required**

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/relevance/aggregate

Count Threat Signals articles by relevance band

operationId: `rssArticleRelevanceAggregate` · query: `published_after`, `published_before`, `read`

**Response** 200 → `result`

- `combined`: object **required**
  - `articles`: object **required** — Beta. Number of articles in each band, each counted once, in the band of its best score across the active PIRs. Not the sum of the per-PIR c
    - `high`: integer **required**
    - `low`: integer **required**
    - `medium`: integer **required**
- `priorities`: object[] **required** — Beta. Each active PIR, including PIRs the matcher paused, ordered by ID. Drafts and deleted PIRs are excluded.
  [array of]
  - `articles`: object **required** — Beta. Number of articles in each band of their score against this PIR. Articles not scored against it are not counted.
    - `high`: integer **required**
    - `low`: integer **required**
    - `medium`: integer **required**
  - `id`: string **required** — Active Priority Intelligence Requirement ID.

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/articles/severity/aggregate

Count Threat Signals articles by severity band

operationId: `rssArticleSeverityAggregate` · query: `published_after`, `published_before`, `read`, `pir_id`, `min_relevance`

**Response** 200 → `result`

- `articles`: object **required** — Beta. Number of articles in each severity band, the band reported as the article's severity. Articles without a severity are not counted, an
  - `critical`: integer **required**
  - `high`: integer **required**
  - `informational`: integer **required**
  - `low`: integer **required**
  - `medium`: integer **required**
- `priorities`: object[] **required** — Beta. Each active PIR, including PIRs the matcher paused, ordered by ID. Drafts and deleted PIRs are excluded. An article can count toward s
  [array of]
  - `articles`: object **required** — Beta. Number of articles scored against this PIR in each severity band. With min_relevance, only articles whose relevance to this PIR is at 
    - `critical`: integer **required**
    - `high`: integer **required**
    - `informational`: integer **required**
    - `low`: integer **required**
    - `medium`: integer **required**
  - `id`: string **required** — Active Priority Intelligence Requirement ID.

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/categories

List Threat Signals feed categories

operationId: `rssFeedCategoryList`

**Response** 200 → `result`

- `categories`: object[] **required**
  [array of]
  - `description`: string **required** — Plain-language description of the category.
  - `id`: string **required** — Wire value accepted by the feed `category_id` field.
  - `name`: string **required** — Human-readable display label.

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/feeds

List Threat Signals feeds

operationId: `rssFeedList` · query: `page`, `per_page`, `limit`, `sort`, `category`, `source_type`, `enabled`, `status`

**Response** 200 → `result`

- `count`: integer **required** — Number of feeds on this page.
- `custom_feed_count`: integer **required** — The current count of custom feeds for the account.
- `custom_feed_limit`: integer **required** — The resolved custom feed limit for the account.
- `feeds`: object[] **required**
  [array of]
  - `category_id`: string **required** — Feed category identifier. Null when unset.
  - `category_name`: string **required** — Display name of the feed category. Null when unset or unresolvable.
  - `created_at`: string **required**
  - `curated_feed_id`: string **required** — Curated catalog feed this subscription was created from. Null for custom feeds.
  - `display_name`: string **required**
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `last_polled_at`: string **required**
  - `poll_interval_s`: integer **required**
  - `source_type`: string **required** — `custom` for a feed added by URL, `curated` for a curated catalog feed.
  - `status`: string **required** — Polling health: `active`, or `error` after a failed poll.
  - `subscribed_at`: string **required**
  - `title`: string **required**
  - `updated_at`: string **required**
  - `url`: string **required**
- `page`: integer **required**
- `per_page`: integer **required**
- `total_count`: integer **required**

## POST /accounts/{account_id}/cloudforce-one/v2/threat-signals/feeds

Create Threat Signals feed

operationId: `rssFeedCreate`

**Request** (application/json)

- `category_id`: string enum: `b12a0fd6-f7b9-5393-9ef3-f888d506c550`, `d5b70eaa-626f-5761-b55b-6d9590df49fb`, `3b572d2b-890d-5286-9433-f18c85079030`, `17f90d3b-37d3-5241-8ad4-7d6abbc2006c`, `c68f28e9-7e8f-5d4b-853b-f3076893a9ee`, `bb0e4a94-38ab-5c14-80a7-28cee9f4b139`, `b1ef66d9-a73c-58dc-b269-22d34dfd11f4`, `ab02a976-0a20-5c76-a553-7f6325afacfe` — One of the predefined Threat Signals feed categories; see GET /:account_id/v2/threat-signals/categories.
- `curated_feed_id`: string — UUID of a curated feed to subscribe to. Provide exactly one of url or curated_feed_id. The account must have feed creation entitlement and n
- `display_name`: string — Override the feed's display name. Null clears it; omit to keep existing or derived value.
- `enabled`: boolean default: `true` — Whether to actively poll the feed. Default true.
- `poll_interval_s`: integer default: `300` — Polling interval in seconds (60-86400). Default 300s (5 minutes).
- `title`: string — Override the feed's title. Null clears it; omit to keep existing or derived value.
- `url`: string — HTTPS RSS feed URL. Provide exactly one of url or curated_feed_id. The account must have feed creation entitlement and not exceed feed allow

**Response** 201 → `result`

- `category_id`: string **required** — Feed category identifier. Null when unset.
- `category_name`: string **required** — Display name of the feed category. Null when unset or unresolvable.
- `created_at`: string **required**
- `curated_feed_id`: string **required** — Curated catalog feed this subscription was created from. Null for custom feeds.
- `display_name`: string **required**
- `enabled`: boolean **required**
- `id`: string **required**
- `last_polled_at`: string **required**
- `poll_interval_s`: integer **required**
- `source_type`: string **required** — `custom` for a feed added by URL, `curated` for a curated catalog feed.
- `status`: string **required** — Polling health: `active`, or `error` after a failed poll.
- `subscribed_at`: string **required**
- `title`: string **required**
- `updated_at`: string **required**
- `url`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/v2/threat-signals/feeds/{feed_id}

Delete Threat Signals feed

operationId: `rssFeedDelete`

**Response** 200 → `result`

- `category_id`: string **required** — Feed category identifier. Null when unset.
- `category_name`: string **required** — Display name of the feed category. Null when unset or unresolvable.
- `created_at`: string **required**
- `curated_feed_id`: string **required** — Curated catalog feed this subscription was created from. Null for custom feeds.
- `display_name`: string **required**
- `enabled`: boolean **required**
- `id`: string **required**
- `last_polled_at`: string **required**
- `poll_interval_s`: integer **required**
- `source_type`: string **required** — `custom` for a feed added by URL, `curated` for a curated catalog feed.
- `status`: string **required** — Polling health: `active`, or `error` after a failed poll.
- `subscribed_at`: string **required**
- `title`: string **required**
- `updated_at`: string **required**
- `url`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/v2/threat-signals/feeds/{feed_id}

Update Threat Signals feed

operationId: `rssFeedUpdate`

**Request** (application/json)

- `category_id`: string enum: `b12a0fd6-f7b9-5393-9ef3-f888d506c550`, `d5b70eaa-626f-5761-b55b-6d9590df49fb`, `3b572d2b-890d-5286-9433-f18c85079030`, `17f90d3b-37d3-5241-8ad4-7d6abbc2006c`, `c68f28e9-7e8f-5d4b-853b-f3076893a9ee`, `bb0e4a94-38ab-5c14-80a7-28cee9f4b139`, `b1ef66d9-a73c-58dc-b269-22d34dfd11f4`, `ab02a976-0a20-5c76-a553-7f6325afacfe` — One of the predefined Threat Signals feed categories; see GET /:account_id/v2/threat-signals/categories.
- `display_name`: string — Override the feed's display name. Null clears it; omit to keep existing or derived value.
- `enabled`: boolean — Whether to actively poll the feed. Omit to keep current value.
- `poll_interval_s`: integer — New polling interval in seconds (60-86400). Omit to keep current value.
- `title`: string — Override the feed's title. Null clears it; omit to keep existing or derived value.

**Response** 200 → `result`

- `category_id`: string **required** — Feed category identifier. Null when unset.
- `category_name`: string **required** — Display name of the feed category. Null when unset or unresolvable.
- `created_at`: string **required**
- `curated_feed_id`: string **required** — Curated catalog feed this subscription was created from. Null for custom feeds.
- `display_name`: string **required**
- `enabled`: boolean **required**
- `id`: string **required**
- `last_polled_at`: string **required**
- `poll_interval_s`: integer **required**
- `source_type`: string **required** — `custom` for a feed added by URL, `curated` for a curated catalog feed.
- `status`: string **required** — Polling health: `active`, or `error` after a failed poll.
- `subscribed_at`: string **required**
- `title`: string **required**
- `updated_at`: string **required**
- `url`: string **required**

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/feeds/{feed_id}/raw

Get Threat Signals feed XML

operationId: `rssFeedRawGet` · query: `format`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/feeds/{feed_id}/skills

Get Threat Signals feed skills

operationId: `rssFeedSkillsGet`

**Response** 200 → `result`

- `feed_id`: string **required**
- `skills`: object[] **required**
  [array of]
  - `config`: string **required** — JSON-encoded skill configuration. Always null for default skills.
  - `created_at`: string **required**
  - `id`: string **required**
  - `is_active`: integer **required** — 1 when active, 0 when inactive.
  - `name`: string **required**
  - `output_schema`: string **required** — JSON-encoded JSON Schema the skill output must satisfy.
  - `prompt`: string **required**
  - `source`: string **required** enum: `default`, `custom` — `default` for Cloudforce One managed skills (read-only), `custom` for account skills.
  - `type`: string **required**
  - `updated_at`: string **required**

## PUT /accounts/{account_id}/cloudforce-one/v2/threat-signals/feeds/{feed_id}/skills

Set Threat Signals feed skills

operationId: `rssFeedSkillsSet`

**Request** (application/json)

- `skill_ids`: string[] **required** — Ordered array of Custom Skill UUIDs (max 20). Replaces the feed's custom skill assignments. Free accounts cannot assign custom skills. Manag
  [array]

**Response** 200 → `result`

- `feed_id`: string **required**
- `skills`: object[] **required**
  [array of]
  - `position`: integer **required** — Zero-based pipeline position.
  - `skill_id`: string **required**

## POST /accounts/{account_id}/cloudforce-one/v2/threat-signals/feeds/poll

Trigger Threat Signals feed poll

operationId: `rssFeedPoll` · query: `feed_id`

**Response** 200 → `result`

- `errors`: number **required**
- `feeds`: object[] **required**
  [array of]
  - `feed_enabled`: boolean
  - `feed_id`: string **required**
  - `status`: string **required** enum: `workflow_created`, `error`
  - `workflow_id`: string **required**
- `triggered`: number **required**

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/indicators

List Threat Signals article indicators

operationId: `rssArticleIndicatorList` · query: `feed_id`, `article_id`, `search`, `per_page`, `sort`, `include_total`, `cursor`

**Response** 200 → `result`

- `indicators`: object[] **required**
  [array of]
  - `article_id`: string **required**
  - `article_title`: string **required**
  - `dataset_id`: string **required** — Threat Events dataset identifier for navigating from this indicator. Null when the account feeds dataset mapping is unavailable.
  - `feed_display_name`: string **required**
  - `feed_id`: string **required**
  - `id`: string **required**
  - `type`: string **required**
  - `value`: string **required**
- `pagination`: object **required**
  - `count`: integer **required**
  - `cursor`: string **required**
  - `has_more`: boolean **required**
  - `page`: integer **required** — Ordinal of this cursor page; not a total-results offset.
  - `per_page`: integer **required**
  - `total_count`: integer **required**
  - `total_count_is_exact`: boolean **required**

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/search

Search Threat Signals articles using AI Search

operationId: `searchThreatSignals` · query: `query`, `max_results`, `feed_id`

**Response** 200 → `result`

- `count`: integer **required** — Number of unique article candidates returned in this response. Equal to results.length.
- `results`: object[] **required**
  [array of]
  - `article_id`: string **required**
  - `dataset_id`: string **required**
  - `event_id`: string **required**
  - `feed_id`: string **required**
  - `score`: number **required**
  - `text`: string **required**

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/skills

List Threat Signals skills

operationId: `rssSkillList` · query: `page`, `per_page`

**Response** 200 → `result`

- `count`: integer **required** — Number of skills on this page.
- `custom_skills_available`: boolean **required** — Whether Custom Skills are available to the account. False for Free Threat Signals accounts, which receive managed default skills only.
- `page`: integer **required**
- `per_page`: integer **required**
- `skills`: object[] **required**
  [array of]
  - `config`: string **required** — JSON-encoded skill configuration. Always null for default skills.
  - `created_at`: string **required**
  - `id`: string **required**
  - `is_active`: integer **required** — 1 when active, 0 when inactive.
  - `name`: string **required**
  - `output_schema`: string **required** — JSON-encoded JSON Schema the skill output must satisfy.
  - `prompt`: string **required**
  - `source`: string **required** enum: `default`, `custom` — `default` for Cloudforce One managed skills (read-only), `custom` for account skills.
  - `type`: string **required**
  - `updated_at`: string **required**
- `total_count`: integer **required**

## POST /accounts/{account_id}/cloudforce-one/v2/threat-signals/skills

Create Threat Signals skill

operationId: `rssSkillCreate`

**Request** (application/json)

- `name`: string **required** — Custom Skill name (1–100 characters).
- `output_schema`: string **required** — JSON Schema serialized as a string (max 4096 characters).
- `prompt`: string **required** — AI prompt (1–4000 characters) defining the skill's instructions.
- `type`: string enum: `summary`, `tags` default: `summary` — Optional label; does not affect execution. Defaults to "summary".

**Response** 201 → `result`

- `config`: string **required** — JSON-encoded skill configuration. Always null for default skills.
- `created_at`: string **required**
- `id`: string **required**
- `is_active`: integer **required** — 1 when active, 0 when inactive.
- `name`: string **required**
- `output_schema`: string **required** — JSON-encoded JSON Schema the skill output must satisfy.
- `prompt`: string **required**
- `source`: string **required** enum: `default`, `custom` — `default` for Cloudforce One managed skills (read-only), `custom` for account skills.
- `type`: string **required**
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/v2/threat-signals/skills/{skill_id}

Delete Threat Signals skill

operationId: `rssSkillDelete`

**Response** 200 → `result`

- `config`: string **required** — JSON-encoded skill configuration. Always null for default skills.
- `created_at`: string **required**
- `id`: string **required**
- `is_active`: integer **required** — 1 when active, 0 when inactive.
- `name`: string **required**
- `output_schema`: string **required** — JSON-encoded JSON Schema the skill output must satisfy.
- `prompt`: string **required**
- `source`: string **required** enum: `default`, `custom` — `default` for Cloudforce One managed skills (read-only), `custom` for account skills.
- `type`: string **required**
- `updated_at`: string **required**

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/skills/{skill_id}

Get Threat Signals skill

operationId: `rssSkillGet`

**Response** 200 → `result`

- `config`: string **required** — JSON-encoded skill configuration. Always null for default skills.
- `created_at`: string **required**
- `id`: string **required**
- `is_active`: integer **required** — 1 when active, 0 when inactive.
- `name`: string **required**
- `output_schema`: string **required** — JSON-encoded JSON Schema the skill output must satisfy.
- `prompt`: string **required**
- `source`: string **required** enum: `default`, `custom` — `default` for Cloudforce One managed skills (read-only), `custom` for account skills.
- `type`: string **required**
- `updated_at`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/v2/threat-signals/skills/{skill_id}

Update Threat Signals skill

operationId: `rssSkillUpdate`

**Request** (application/json)

- `config`: string — Optional skill configuration (stored but not currently interpreted).
- `is_active`: boolean — Whether the skill is active and eligible for feed assignment.
- `name`: string — Custom Skill name (1–100 characters).
- `output_schema`: string — JSON Schema serialized as a string (max 4096 characters).
- `prompt`: string — AI prompt (1–4000 characters) defining the skill's instructions.

**Response** 200 → `result`

- `config`: string **required** — JSON-encoded skill configuration. Always null for default skills.
- `created_at`: string **required**
- `id`: string **required**
- `is_active`: integer **required** — 1 when active, 0 when inactive.
- `name`: string **required**
- `output_schema`: string **required** — JSON-encoded JSON Schema the skill output must satisfy.
- `prompt`: string **required**
- `source`: string **required** enum: `default`, `custom` — `default` for Cloudforce One managed skills (read-only), `custom` for account skills.
- `type`: string **required**
- `updated_at`: string **required**

## GET /accounts/{account_id}/cloudforce-one/v2/threat-signals/skills/{skill_id}/tag-categories

Get Threat Signals skill tag categories

operationId: `rssSkillTagCategoriesGet`

**Response** 200 → `result`

- `category_uuids`: string[] **required**
  [array]
- `skill_id`: string **required** enum: `default-tagging-skill`

## PUT /accounts/{account_id}/cloudforce-one/v2/threat-signals/skills/{skill_id}/tag-categories

Replace Threat Signals skill tag categories

operationId: `rssSkillTagCategoriesReplace`

**Request** (application/json)

- `category_uuids`: string[] **required** — Up to 100 unique tag category UUIDs that the managed default tagging skill may select tags from.
  [array]

**Response** 200 → `result`

- `category_uuids`: string[] **required**
  [array]
- `skill_id`: string **required** enum: `default-tagging-skill`
