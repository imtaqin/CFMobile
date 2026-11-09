# AI Search Instances

17 endpoints.

## GET /accounts/{account_id}/ai-search/instances

List AI Search instances.

operationId: `ai-search-list-instances` · query: `page`, `per_page`, `search`, `hostname`, `namespace`, `order_by`, `order_by_direction`

**Response** 200 → `result`

[array of]
- `ai_gateway_id`: string **required**
- `ai_search_model`: string **required**
- `cache`: boolean **required**
- `cache_threshold`: string **required** enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`, `null`
- `cache_ttl`: any **required**
- `chunk`: boolean **required**
- `chunk_overlap`: number **required**
- `chunk_size`: number **required**
- `created_at`: string **required**
- `created_by`: string **required**
- `custom_metadata`: object[] **required**
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string **required**
- `enable`: boolean **required**
- `engine_version`: number **required**
- `fusion_method`: string **required** enum: `max`, `rrf`
- `hybrid_search_enabled`: boolean **required**
- `id`: string **required**
- `index_method`: object **required**
  - `keyword`: boolean **required**
  - `vector`: boolean **required**
- `indexing_options`: object **required**
  - `keyword_tokenizer`: string enum: `porter`, `trigram`
  - `use_ocr`: boolean
- `last_activity`: string **required**
- `max_num_results`: number **required**
- `metadata`: object **required**
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string **required**
- `namespace`: string **required**
- `paused`: boolean **required**
- `public_endpoint_id`: string **required**
- `public_endpoint_params`: object **required**
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean
  - `custom_domains`: string[]
    [array]
  - `default_domain_enabled`: boolean
  - `enabled`: boolean
  - `mcp`: object
    - `description`: string
    - `disabled`: boolean
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean
- `reranking`: boolean **required**
- `reranking_model`: string **required**
- `retrieval_options`: object **required**
  - `boost_by`: object[]
    [array of]
    - `dataType`: string enum: `number`, `datetime`, `text`, `boolean`
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists`
    - `field`: string **required**
  - `keyword_match_mode`: string enum: `and`, `or`
- `rewrite_model`: string **required**
- `rewrite_query`: boolean **required**
- `score_threshold`: number **required**
- `source`: string **required**
- `source_params`: object **required**
  - `exclude_items`: string[]
    [array]
  - `include_items`: string[]
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string
  - `web_crawler`: object
    - `discover_options`: object
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover`
- `status`: string **required**
- `summarization`: boolean **required**
- `summarization_model`: string **required**
- `sync_interval`: any **required**
- `system_prompt_ai_search`: string **required**
- `system_prompt_index_summarization`: string **required**
- `system_prompt_rewrite_query`: string **required**
- `token_id`: string **required**
- `type`: string **required** enum: `r2`, `web-crawler`, `null`

## POST /accounts/{account_id}/ai-search/instances

Create an AI Search instance.

operationId: `ai-search-create-instance`

**Request** (application/json)

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk`: boolean default: `true`
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

**Response** 201 → `result`

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `created_at`: string **required**
- `created_by`: string
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `enable`: boolean
- `engine_version`: number
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `last_activity`: string
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string
- `namespace`: string
- `paused`: boolean
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `status`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

## DELETE /accounts/{account_id}/ai-search/instances/{id}

Delete an AI Search instance.

operationId: `ai-search-delete-instance`

**Response** 200 → `result`

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `created_at`: string **required**
- `created_by`: string
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `enable`: boolean
- `engine_version`: number
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `last_activity`: string
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string
- `namespace`: string
- `paused`: boolean
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `status`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

## GET /accounts/{account_id}/ai-search/instances/{id}

Get an AI Search instance.

operationId: `ai-search-fetch-instance`

**Response** 200 → `result`

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `created_at`: string **required**
- `created_by`: string
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `enable`: boolean
- `engine_version`: number
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `last_activity`: string
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string
- `namespace`: string
- `paused`: boolean
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `status`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

## PUT /accounts/{account_id}/ai-search/instances/{id}

Update an AI Search instance.

operationId: `ai-search-update-instance`

**Request** (application/json)

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk`: boolean default: `true`
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `paused`: boolean
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `summarization`: boolean default: `false`
- `summarization_model`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `system_prompt_ai_search`: string
- `system_prompt_index_summarization`: string
- `system_prompt_rewrite_query`: string
- `token_id`: string

**Response** 200 → `result`

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `created_at`: string **required**
- `created_by`: string
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `enable`: boolean
- `engine_version`: number
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `last_activity`: string
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string
- `namespace`: string
- `paused`: boolean
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `status`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

## POST /accounts/{account_id}/ai-search/instances/{id}/chat/completions

Chat Completions

operationId: `ai-search-instance-chat-completion`

**Request** (application/json)

- `ai_search_options`: object
  - `cache`: object
    - `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`
    - `enabled`: boolean
  - `custom_metadata`: object — Metadata added to AI Gateway logs for requests this operation triggers. Accepts up to 2 string, number, or boolean entries. Reserved keys: '
  - `query_rewrite`: object
    - `enabled`: boolean
    - `model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
    - `rewrite_prompt`: string
  - `reranking`: object
    - `enabled`: boolean
    - `match_threshold`: number default: `0.4`
    - `model`: string
  - `retrieval`: object
    - `boost_by`: object[] — Metadata fields to boost search results by. Overrides the instance-level boost_by config. Direction defaults to 'asc' for numeric/datetime f
    - `context_expansion`: integer default: `0`
    - `filters`: object
    - `fusion_method`: string enum: `max`, `rrf`
    - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
    - `match_threshold`: number — Minimum similarity score a chunk must reach to be returned. When omitted, falls back to the instance-level score_threshold, then to 0.4.
    - `max_num_results`: integer — Maximum number of results to return. When omitted, falls back to the instance-level max_num_results, then to 10.
    - `retrieval_type`: string enum: `vector`, `keyword`, `hybrid`
    - `return_on_failure`: boolean default: `true`
- `messages`: object[] **required**
  [array of]
  - `content`: any **required**
  - `role`: string **required** enum: `system`, `developer`, `user`, `assistant`, `tool`
- `model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `stream`: boolean

**Response** 200 → `result`

- `choices`: object[] **required**
  [array of]
  - `index`: integer
  - `message`: object **required**
    - `content`: any **required**
    - `role`: string **required** enum: `system`, `developer`, `user`, `assistant`, `tool`
- `chunks`: object[] **required**
  [array of]
  - `id`: string **required**
  - `item`: object
    - `key`: string **required**
    - `metadata`: object
    - `timestamp`: number
  - `media_end_ms`: integer — Audio/video transcript chunks only: end, in milliseconds from the start of the media (whole seconds), of the last transcript section the mat
  - `media_start_ms`: integer — Audio/video transcript chunks only: start, in milliseconds from the start of the media (whole seconds), of the transcript section the matche
  - `score`: number **required**
  - `scoring_details`: object
    - `fusion_method`: string enum: `rrf`, `max`
    - `keyword_rank`: number
    - `keyword_score`: number
    - `reranking_score`: number
    - `vector_rank`: number
    - `vector_score`: number
  - `source_media_type`: string enum: `audio`, `video` — Audio/video transcript chunks only: type of the source media file. Omitted for all other chunks.
  - `text`: string **required**
  - `type`: string **required**
- `id`: string
- `model`: string
- `object`: string

## POST /accounts/{account_id}/ai-search/instances/{id}/search

Search

operationId: `ai-search-instance-search`

**Request** (application/json)

- `ai_search_options`: object
  - `cache`: object
    - `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`
    - `enabled`: boolean
  - `custom_metadata`: object — Metadata added to AI Gateway logs for requests this operation triggers. Accepts up to 2 string, number, or boolean entries. Reserved keys: '
  - `query_rewrite`: object
    - `enabled`: boolean
    - `model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
    - `rewrite_prompt`: string
  - `reranking`: object
    - `enabled`: boolean
    - `match_threshold`: number default: `0.4`
    - `model`: string
  - `retrieval`: object
    - `boost_by`: object[] — Metadata fields to boost search results by. Overrides the instance-level boost_by config. Direction defaults to 'asc' for numeric/datetime f
    - `context_expansion`: integer default: `0`
    - `filters`: object
    - `fusion_method`: string enum: `max`, `rrf`
    - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
    - `match_threshold`: number — Minimum similarity score a chunk must reach to be returned. When omitted, falls back to the instance-level score_threshold, then to 0.4.
    - `max_num_results`: integer — Maximum number of results to return. When omitted, falls back to the instance-level max_num_results, then to 10.
    - `retrieval_type`: string enum: `vector`, `keyword`, `hybrid`
    - `return_on_failure`: boolean default: `true`
- `messages`: object[] — OpenAI-compatible message array. For multimodal queries, set the last user message's `content` to an array of typed parts: `[{type:'text', t
  [array of]
  - `content`: any **required**
  - `role`: string **required** enum: `system`, `developer`, `user`, `assistant`, `tool`
- `query`: string — A simple text query string. Alternative to 'messages' — provide either this or 'messages', not both.

**Response** 200 → `result`

- `chunks`: object[] **required**
  [array of]
  - `id`: string **required**
  - `item`: object
    - `key`: string **required**
    - `metadata`: object
    - `timestamp`: number
  - `media_end_ms`: integer — Audio/video transcript chunks only: end, in milliseconds from the start of the media (whole seconds), of the last transcript section the mat
  - `media_start_ms`: integer — Audio/video transcript chunks only: start, in milliseconds from the start of the media (whole seconds), of the transcript section the matche
  - `score`: number **required**
  - `scoring_details`: object
    - `fusion_method`: string enum: `rrf`, `max`
    - `keyword_rank`: number
    - `keyword_score`: number
    - `reranking_score`: number
    - `vector_rank`: number
    - `vector_score`: number
  - `source_media_type`: string enum: `audio`, `video` — Audio/video transcript chunks only: type of the source media file. Omitted for all other chunks.
  - `text`: string **required**
  - `type`: string **required**
- `query_kind`: string **required** enum: `text`, `image`, `multimodal`
- `search_query`: string

## GET /accounts/{account_id}/ai-search/instances/{id}/stats

Get instance statistics.

operationId: `ai-search-stats`

**Response** 200 → `result`

- `completed`: integer
- `degraded`: boolean — True when the API cannot compute status counts (e.g. the legacy stats query exceeded the D1 statement-size limit). The response omits counts
- `engine`: object — Engine-specific metadata. Present only for managed (v3) instances.
  - `r2`: object — R2 bucket storage usage in bytes.
    - `metadataSizeBytes`: integer **required**
    - `objectCount`: integer **required**
    - `payloadSizeBytes`: integer **required**
  - `vectorize`: object — Vectorize index metadata (dimensions, vector count).
    - `dimensions`: integer **required**
    - `vectorsCount`: integer **required**
- `error`: integer
- `file_embed_errors`: object
- `index_source_errors`: object
- `last_activity`: string
- `outdated`: integer
- `queued`: integer
- `running`: integer
- `skipped`: integer

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances

List AI Search instances.

operationId: `ai-search-namespace-list-instances` · query: `page`, `per_page`, `search`, `hostname`, `order_by`, `order_by_direction`

**Response** 200 → `result`

[array of]
- `ai_gateway_id`: string **required**
- `ai_search_model`: string **required**
- `cache`: boolean **required**
- `cache_threshold`: string **required** enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`, `null`
- `cache_ttl`: any **required**
- `chunk`: boolean **required**
- `chunk_overlap`: number **required**
- `chunk_size`: number **required**
- `created_at`: string **required**
- `created_by`: string **required**
- `custom_metadata`: object[] **required**
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string **required**
- `enable`: boolean **required**
- `engine_version`: number **required**
- `fusion_method`: string **required** enum: `max`, `rrf`
- `hybrid_search_enabled`: boolean **required**
- `id`: string **required**
- `index_method`: object **required**
  - `keyword`: boolean **required**
  - `vector`: boolean **required**
- `indexing_options`: object **required**
  - `keyword_tokenizer`: string enum: `porter`, `trigram`
  - `use_ocr`: boolean
- `last_activity`: string **required**
- `max_num_results`: number **required**
- `metadata`: object **required**
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string **required**
- `namespace`: string **required**
- `paused`: boolean **required**
- `public_endpoint_id`: string **required**
- `public_endpoint_params`: object **required**
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean
  - `custom_domains`: string[]
    [array]
  - `default_domain_enabled`: boolean
  - `enabled`: boolean
  - `mcp`: object
    - `description`: string
    - `disabled`: boolean
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean
- `reranking`: boolean **required**
- `reranking_model`: string **required**
- `retrieval_options`: object **required**
  - `boost_by`: object[]
    [array of]
    - `dataType`: string enum: `number`, `datetime`, `text`, `boolean`
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists`
    - `field`: string **required**
  - `keyword_match_mode`: string enum: `and`, `or`
- `rewrite_model`: string **required**
- `rewrite_query`: boolean **required**
- `score_threshold`: number **required**
- `source`: string **required**
- `source_params`: object **required**
  - `exclude_items`: string[]
    [array]
  - `include_items`: string[]
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string
  - `web_crawler`: object
    - `discover_options`: object
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover`
- `status`: string **required**
- `summarization`: boolean **required**
- `summarization_model`: string **required**
- `sync_interval`: any **required**
- `system_prompt_ai_search`: string **required**
- `system_prompt_index_summarization`: string **required**
- `system_prompt_rewrite_query`: string **required**
- `token_id`: string **required**
- `type`: string **required** enum: `r2`, `web-crawler`, `null`

## POST /accounts/{account_id}/ai-search/namespaces/{namespace}/instances

Create an AI Search instance.

operationId: `ai-search-namespace-create-instance`

**Request** (application/json)

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk`: boolean default: `true`
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

**Response** 201 → `result`

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `created_at`: string **required**
- `created_by`: string
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `enable`: boolean
- `engine_version`: number
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `last_activity`: string
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string
- `namespace`: string
- `paused`: boolean
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `status`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

## DELETE /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}

Delete an AI Search instance.

operationId: `ai-search-namespace-delete-instance`

**Response** 200 → `result`

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `created_at`: string **required**
- `created_by`: string
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `enable`: boolean
- `engine_version`: number
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `last_activity`: string
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string
- `namespace`: string
- `paused`: boolean
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `status`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}

Get an AI Search instance.

operationId: `ai-search-namespace-fetch-instance`

**Response** 200 → `result`

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `created_at`: string **required**
- `created_by`: string
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `enable`: boolean
- `engine_version`: number
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `last_activity`: string
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string
- `namespace`: string
- `paused`: boolean
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `status`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

## PUT /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}

Update an AI Search instance.

operationId: `ai-search-namespace-update-instance`

**Request** (application/json)

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk`: boolean default: `true`
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `paused`: boolean
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `summarization`: boolean default: `false`
- `summarization_model`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `system_prompt_ai_search`: string
- `system_prompt_index_summarization`: string
- `system_prompt_rewrite_query`: string
- `token_id`: string

**Response** 200 → `result`

- `ai_gateway_id`: string
- `ai_search_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `cache`: boolean default: `true`
- `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes` default: `close_enough`
- `cache_ttl`: any default: `172800` — Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (4
- `chunk_overlap`: integer default: `10`
- `chunk_size`: integer
- `created_at`: string **required**
- `created_by`: string
- `custom_metadata`: object[]
  [array of]
  - `data_type`: string **required** enum: `text`, `number`, `boolean`, `datetime`
  - `field_name`: string **required**
- `embedding_model`: string
- `enable`: boolean
- `engine_version`: number
- `fusion_method`: string enum: `max`, `rrf` default: `rrf`
- `hybrid_search_enabled`: boolean — Deprecated — use index_method instead. Defaults to true for new instances; set false to create a vector-only instance.
- `id`: string **required** — AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.
- `index_method`: object — Controls which storage backends indexing uses. Defaults to vector and keyword indexing for new instances. When set, both vector and keyword 
  - `keyword`: boolean **required** — Enable keyword (BM25) storage backend.
  - `vector`: boolean **required** — Enable vector (embedding) storage backend.
- `indexing_options`: object
  - `keyword_tokenizer`: string enum: `porter`, `trigram` default: `porter` — Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries)
  - `use_ocr`: boolean default: `false` — Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.
- `last_activity`: string
- `max_num_results`: integer default: `10`
- `metadata`: object
  - `created_from_aisearch_wizard`: boolean
  - `created_from_emdash_plugin`: object
    - `type`: string **required** enum: `native`, `rest`
    - `version`: string **required**
  - `worker_domain`: string
- `modified_at`: string **required**
- `modified_by`: string
- `namespace`: string
- `paused`: boolean
- `public_endpoint_id`: string
- `public_endpoint_params`: object
  - `authorized_hosts`: string[]
    [array]
  - `chat_completions_endpoint`: object
    - `disabled`: boolean default: `false` — Disable chat completions endpoint for this public endpoint.
  - `custom_domains`: string[] — Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only
    [array]
  - `default_domain_enabled`: boolean default: `true` — When false, the instance is reachable only via a registered custom domain and the default <public_endpoint_id>.search.ai.cloudflare.com host
  - `enabled`: boolean default: `false`
  - `mcp`: object
    - `description`: string default: `Finds exactly what you're looking for`
    - `disabled`: boolean default: `false` — Disable MCP endpoint for this public endpoint.
  - `rate_limit`: object
    - `period_ms`: integer
    - `requests`: integer
    - `technique`: string enum: `fixed`, `sliding`
  - `search_endpoint`: object
    - `disabled`: boolean default: `false` — Disable search endpoint for this public endpoint.
- `reranking`: boolean default: `false`
- `reranking_model`: string
- `retrieval_options`: object
  - `boost_by`: object[] — Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for
    [array of]
    - `direction`: string enum: `asc`, `desc`, `exists`, `not_exists` — Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that 
    - `field`: string **required** — Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support a
  - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
- `rewrite_model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `rewrite_query`: boolean default: `false`
- `score_threshold`: number — Minimum similarity score a chunk must reach to be returned. Defaults to 0.4.
- `source`: string
- `source_params`: object
  - `exclude_items`: string[] — List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admi
    [array]
  - `include_items`: string[] — List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog
    [array]
  - `prefix`: string
  - `r2_jurisdiction`: string default: `default`
  - `web_crawler`: object default: `[object Object]`
    - `discover_options`: object — Options for parse_type 'discover', where Browser Run discovers URLs through link following and sitemaps. Ignored for 'sitemap'.
    - `parse_options`: object
    - `parse_type`: string enum: `sitemap`, `discover` default: `sitemap` — How the crawler finds URLs. 'sitemap' reads XML sitemaps; 'discover' follows links recursively and requires the source to belong to a Verifi
- `status`: string
- `sync_interval`: any — Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200
- `token_id`: string
- `type`: string enum: `r2`, `web-crawler`, `null` — Source type. When omitted or null with a non-blank source, HTTP(S) URLs infer web-crawler and existing R2 bucket names infer r2. A missing o

## POST /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/chat/completions

Chat Completions

operationId: `ai-search-namespace-instance-chat-completion`

**Request** (application/json)

- `ai_search_options`: object
  - `cache`: object
    - `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`
    - `enabled`: boolean
  - `custom_metadata`: object — Metadata added to AI Gateway logs for requests this operation triggers. Accepts up to 2 string, number, or boolean entries. Reserved keys: '
  - `query_rewrite`: object
    - `enabled`: boolean
    - `model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
    - `rewrite_prompt`: string
  - `reranking`: object
    - `enabled`: boolean
    - `match_threshold`: number default: `0.4`
    - `model`: string
  - `retrieval`: object
    - `boost_by`: object[] — Metadata fields to boost search results by. Overrides the instance-level boost_by config. Direction defaults to 'asc' for numeric/datetime f
    - `context_expansion`: integer default: `0`
    - `filters`: object
    - `fusion_method`: string enum: `max`, `rrf`
    - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
    - `match_threshold`: number — Minimum similarity score a chunk must reach to be returned. When omitted, falls back to the instance-level score_threshold, then to 0.4.
    - `max_num_results`: integer — Maximum number of results to return. When omitted, falls back to the instance-level max_num_results, then to 10.
    - `retrieval_type`: string enum: `vector`, `keyword`, `hybrid`
    - `return_on_failure`: boolean default: `true`
- `messages`: object[] **required**
  [array of]
  - `content`: any **required**
  - `role`: string **required** enum: `system`, `developer`, `user`, `assistant`, `tool`
- `model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
- `stream`: boolean

**Response** 200 → `result`

- `choices`: object[] **required**
  [array of]
  - `index`: integer
  - `message`: object **required**
    - `content`: any **required**
    - `role`: string **required** enum: `system`, `developer`, `user`, `assistant`, `tool`
- `chunks`: object[] **required**
  [array of]
  - `id`: string **required**
  - `item`: object
    - `key`: string **required**
    - `metadata`: object
    - `timestamp`: number
  - `media_end_ms`: integer — Audio/video transcript chunks only: end, in milliseconds from the start of the media (whole seconds), of the last transcript section the mat
  - `media_start_ms`: integer — Audio/video transcript chunks only: start, in milliseconds from the start of the media (whole seconds), of the transcript section the matche
  - `score`: number **required**
  - `scoring_details`: object
    - `fusion_method`: string enum: `rrf`, `max`
    - `keyword_rank`: number
    - `keyword_score`: number
    - `reranking_score`: number
    - `vector_rank`: number
    - `vector_score`: number
  - `source_media_type`: string enum: `audio`, `video` — Audio/video transcript chunks only: type of the source media file. Omitted for all other chunks.
  - `text`: string **required**
  - `type`: string **required**
- `id`: string
- `model`: string
- `object`: string

## POST /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/purge_cache

Purge search cache.

operationId: `ai-search-namespace-purge-instance-cache`

**Response** 200 → `result`

- `success`: boolean **required**

## POST /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/search

Search

operationId: `ai-search-namespace-instance-search`

**Request** (application/json)

- `ai_search_options`: object
  - `cache`: object
    - `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`
    - `enabled`: boolean
  - `custom_metadata`: object — Metadata added to AI Gateway logs for requests this operation triggers. Accepts up to 2 string, number, or boolean entries. Reserved keys: '
  - `query_rewrite`: object
    - `enabled`: boolean
    - `model`: string — A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or defa
    - `rewrite_prompt`: string
  - `reranking`: object
    - `enabled`: boolean
    - `match_threshold`: number default: `0.4`
    - `model`: string
  - `retrieval`: object
    - `boost_by`: object[] — Metadata fields to boost search results by. Overrides the instance-level boost_by config. Direction defaults to 'asc' for numeric/datetime f
    - `context_expansion`: integer default: `0`
    - `filters`: object
    - `fusion_method`: string enum: `max`, `rrf`
    - `keyword_match_mode`: string enum: `and`, `or` — Controls which documents become candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includ
    - `match_threshold`: number — Minimum similarity score a chunk must reach to be returned. When omitted, falls back to the instance-level score_threshold, then to 0.4.
    - `max_num_results`: integer — Maximum number of results to return. When omitted, falls back to the instance-level max_num_results, then to 10.
    - `retrieval_type`: string enum: `vector`, `keyword`, `hybrid`
    - `return_on_failure`: boolean default: `true`
- `messages`: object[] — OpenAI-compatible message array. For multimodal queries, set the last user message's `content` to an array of typed parts: `[{type:'text', t
  [array of]
  - `content`: any **required**
  - `role`: string **required** enum: `system`, `developer`, `user`, `assistant`, `tool`
- `query`: string — A simple text query string. Alternative to 'messages' — provide either this or 'messages', not both.

**Response** 200 → `result`

- `chunks`: object[] **required**
  [array of]
  - `id`: string **required**
  - `item`: object
    - `key`: string **required**
    - `metadata`: object
    - `timestamp`: number
  - `media_end_ms`: integer — Audio/video transcript chunks only: end, in milliseconds from the start of the media (whole seconds), of the last transcript section the mat
  - `media_start_ms`: integer — Audio/video transcript chunks only: start, in milliseconds from the start of the media (whole seconds), of the transcript section the matche
  - `score`: number **required**
  - `scoring_details`: object
    - `fusion_method`: string enum: `rrf`, `max`
    - `keyword_rank`: number
    - `keyword_score`: number
    - `reranking_score`: number
    - `vector_rank`: number
    - `vector_score`: number
  - `source_media_type`: string enum: `audio`, `video` — Audio/video transcript chunks only: type of the source media file. Omitted for all other chunks.
  - `text`: string **required**
  - `type`: string **required**
- `query_kind`: string **required** enum: `text`, `image`, `multimodal`
- `search_query`: string

## GET /accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}/stats

Get instance statistics.

operationId: `ai-search-namespace-stats`

**Response** 200 → `result`

- `completed`: integer
- `degraded`: boolean — True when the API cannot compute status counts (e.g. the legacy stats query exceeded the D1 statement-size limit). The response omits counts
- `engine`: object — Engine-specific metadata. Present only for managed (v3) instances.
  - `r2`: object — R2 bucket storage usage in bytes.
    - `metadataSizeBytes`: integer **required**
    - `objectCount`: integer **required**
    - `payloadSizeBytes`: integer **required**
  - `vectorize`: object — Vectorize index metadata (dimensions, vector count).
    - `dimensions`: integer **required**
    - `vectorsCount`: integer **required**
- `error`: integer
- `file_embed_errors`: object
- `index_source_errors`: object
- `last_activity`: string
- `outdated`: integer
- `queued`: integer
- `running`: integer
- `skipped`: integer
