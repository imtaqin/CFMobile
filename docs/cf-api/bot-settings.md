# Bot Settings

2 endpoints.

## GET /zones/{zone_id}/bot_management

Get Zone Bot Management Config

operationId: `bot-management-for-a-zone-get-config`

**Response** 200 → `result`

(one of 4 variants; showing the first)
- `ai_agents`: object — Configure blocking behavior for supported personal AI agents.
  - `anthropic_agent`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `google_agent`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `instinct`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `muse`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `openai_agent`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
- `ai_bots_migration_opt_out`: boolean default: `false` — Temporary migration flag tracking zones opted out of AI bots managed-rule updates.
- `ai_bots_protection`: string enum: `block`, `disabled`, `only_on_ad_pages` — Enable rule to block AI Scrapers and Crawlers.
- `ai_search`: string enum: `disabled`, `block`, `only_on_ad_pages` — Configure robots.txt policy for AI search bots.
- `ai_training`: string enum: `disabled`, `disallow`, `block`, `only_on_ad_pages` — Configure robots.txt policy for AI model training bots.
- `ai_user`: string enum: `disabled`, `block`, `only_on_ad_pages` — Configure robots.txt policy for AI assistant and agent bots.
- `bot_preference_sync_enabled`: boolean default: `false` — Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone's AI Search, AI User, 
- `cf_robots_variant`: string enum: `off`, `policy_only` — Specifies the Robots Access Control License variant to use.
- `content_bots_protection`: string enum: `block`, `disabled` — Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Excep
- `crawler_protection`: string enum: `enabled`, `disabled` — Enable rule to punish AI Scrapers and Crawlers via a link maze.
- `enable_js`: boolean — Use lightweight, invisible JavaScript detections to improve Bot Management. [Learn more about JavaScript Detections](https://developers.clou
- `is_robots_txt_managed`: boolean default: `false` — Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robot
- `jsd_api_results_enabled`: boolean — Whether to use JavaScript Detection results submitted through the API for this zone.
- `using_latest_model`: boolean — A read-only field that indicates whether the zone currently is running the latest ML model.
- `fight_mode`: boolean — Whether to enable Bot Fight Mode.
- `stale_zone_configuration`: object — A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or 
  - `optimize_wordpress`: boolean — Indicates that the zone's wordpress optimization for SBFM is turned on.
  - `sbfm_definitely_automated`: string — Indicates that the zone's definitely automated requests are being blocked or challenged.
  - `sbfm_likely_automated`: string — Indicates that the zone's likely automated requests are being blocked or challenged.
  - `sbfm_static_resource_protection`: string — Indicates that the zone's static resource protection is turned on.
  - `sbfm_verified_bots`: string — Indicates that the zone's verified bot requests are being blocked.
  - `suppress_session_score`: boolean — Indicates that the zone's session score tracking is disabled.

## PUT /zones/{zone_id}/bot_management

Update Zone Bot Management Config

operationId: `bot-management-for-a-zone-update-config`

**Request** (application/json)

(one of 4 variants; showing the first)
- `ai_agents`: object — Configure blocking behavior for supported personal AI agents.
  - `anthropic_agent`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `google_agent`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `instinct`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `muse`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `openai_agent`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
- `ai_bots_migration_opt_out`: boolean default: `false` — Temporary migration flag tracking zones opted out of AI bots managed-rule updates.
- `ai_bots_protection`: string enum: `block`, `disabled`, `only_on_ad_pages` — Enable rule to block AI Scrapers and Crawlers.
- `ai_search`: string enum: `disabled`, `block`, `only_on_ad_pages` — Configure robots.txt policy for AI search bots.
- `ai_training`: string enum: `disabled`, `disallow`, `block`, `only_on_ad_pages` — Configure robots.txt policy for AI model training bots.
- `ai_user`: string enum: `disabled`, `block`, `only_on_ad_pages` — Configure robots.txt policy for AI assistant and agent bots.
- `bot_preference_sync_enabled`: boolean default: `false` — Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone's AI Search, AI User, 
- `cf_robots_variant`: string enum: `off`, `policy_only` — Specifies the Robots Access Control License variant to use.
- `content_bots_protection`: string enum: `block`, `disabled` — Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Excep
- `crawler_protection`: string enum: `enabled`, `disabled` — Enable rule to punish AI Scrapers and Crawlers via a link maze.
- `enable_js`: boolean — Use lightweight, invisible JavaScript detections to improve Bot Management. [Learn more about JavaScript Detections](https://developers.clou
- `is_robots_txt_managed`: boolean default: `false` — Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robot
- `jsd_api_results_enabled`: boolean — Whether to use JavaScript Detection results submitted through the API for this zone.
- `using_latest_model`: boolean — A read-only field that indicates whether the zone currently is running the latest ML model.
- `fight_mode`: boolean — Whether to enable Bot Fight Mode.
- `stale_zone_configuration`: object — A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or 
  - `optimize_wordpress`: boolean — Indicates that the zone's wordpress optimization for SBFM is turned on.
  - `sbfm_definitely_automated`: string — Indicates that the zone's definitely automated requests are being blocked or challenged.
  - `sbfm_likely_automated`: string — Indicates that the zone's likely automated requests are being blocked or challenged.
  - `sbfm_static_resource_protection`: string — Indicates that the zone's static resource protection is turned on.
  - `sbfm_verified_bots`: string — Indicates that the zone's verified bot requests are being blocked.
  - `suppress_session_score`: boolean — Indicates that the zone's session score tracking is disabled.

**Response** 200 → `result`

(one of 4 variants; showing the first)
- `ai_agents`: object — Configure blocking behavior for supported personal AI agents.
  - `anthropic_agent`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `google_agent`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `instinct`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `muse`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
  - `openai_agent`: string enum: `disabled`, `block`, `only_on_ad_pages` — Action to apply to one supported personal AI agent.
- `ai_bots_migration_opt_out`: boolean default: `false` — Temporary migration flag tracking zones opted out of AI bots managed-rule updates.
- `ai_bots_protection`: string enum: `block`, `disabled`, `only_on_ad_pages` — Enable rule to block AI Scrapers and Crawlers.
- `ai_search`: string enum: `disabled`, `block`, `only_on_ad_pages` — Configure robots.txt policy for AI search bots.
- `ai_training`: string enum: `disabled`, `disallow`, `block`, `only_on_ad_pages` — Configure robots.txt policy for AI model training bots.
- `ai_user`: string enum: `disabled`, `block`, `only_on_ad_pages` — Configure robots.txt policy for AI assistant and agent bots.
- `bot_preference_sync_enabled`: boolean default: `false` — Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone's AI Search, AI User, 
- `cf_robots_variant`: string enum: `off`, `policy_only` — Specifies the Robots Access Control License variant to use.
- `content_bots_protection`: string enum: `block`, `disabled` — Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Excep
- `crawler_protection`: string enum: `enabled`, `disabled` — Enable rule to punish AI Scrapers and Crawlers via a link maze.
- `enable_js`: boolean — Use lightweight, invisible JavaScript detections to improve Bot Management. [Learn more about JavaScript Detections](https://developers.clou
- `is_robots_txt_managed`: boolean default: `false` — Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robot
- `jsd_api_results_enabled`: boolean — Whether to use JavaScript Detection results submitted through the API for this zone.
- `using_latest_model`: boolean — A read-only field that indicates whether the zone currently is running the latest ML model.
- `fight_mode`: boolean — Whether to enable Bot Fight Mode.
- `stale_zone_configuration`: object — A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or 
  - `optimize_wordpress`: boolean — Indicates that the zone's wordpress optimization for SBFM is turned on.
  - `sbfm_definitely_automated`: string — Indicates that the zone's definitely automated requests are being blocked or challenged.
  - `sbfm_likely_automated`: string — Indicates that the zone's likely automated requests are being blocked or challenged.
  - `sbfm_static_resource_protection`: string — Indicates that the zone's static resource protection is turned on.
  - `sbfm_verified_bots`: string — Indicates that the zone's verified bot requests are being blocked.
  - `suppress_session_score`: boolean — Indicates that the zone's session score tracking is disabled.
