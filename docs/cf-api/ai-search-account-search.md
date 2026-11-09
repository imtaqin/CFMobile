# AI Search Account Search

2 endpoints.

## POST /accounts/{account_id}/ai-search/namespaces/{name}/chat/completions

Multi-Instance Chat Completions

operationId: `ai-search-namespace-multi-instance-chat-completion`

**Request** (application/json)

- `ai_search_options`: object **required**
  - `cache`: object
    - `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`
    - `enabled`: boolean
  - `custom_metadata`: object — Metadata added to AI Gateway logs for requests this operation triggers. Accepts up to 2 string, number, or boolean entries. Reserved keys: '
  - `instance_ids`: string[] **required**
    [array]
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
    - `match_threshold`: number — Minimum score a chunk must reach to be returned. When omitted, each instance's chunks are filtered by that instance's score_threshold, cappe
    - `max_num_results`: integer — Maximum number of merged results to return. When omitted, defaults to the first instance's max_num_results, then 10.
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
  - `instance_id`: string **required**
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
- `errors`: object[]
  [array of]
  - `instance_id`: string **required**
  - `message`: string **required**
- `id`: string
- `model`: string
- `object`: string

## POST /accounts/{account_id}/ai-search/namespaces/{name}/search

Multi-Instance Search

operationId: `ai-search-namespace-multi-instance-search`

**Request** (application/json)

- `ai_search_options`: object **required**
  - `cache`: object
    - `cache_threshold`: string enum: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`
    - `enabled`: boolean
  - `custom_metadata`: object — Metadata added to AI Gateway logs for requests this operation triggers. Accepts up to 2 string, number, or boolean entries. Reserved keys: '
  - `instance_ids`: string[] **required**
    [array]
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
    - `match_threshold`: number — Minimum score a chunk must reach to be returned. When omitted, each instance's chunks are filtered by that instance's score_threshold, cappe
    - `max_num_results`: integer — Maximum number of merged results to return. When omitted, defaults to the sum of the searched instances' max_num_results (each falling back 
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
  - `instance_id`: string **required**
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
- `errors`: object[]
  [array of]
  - `instance_id`: string **required**
  - `message`: string **required**
- `query_kind`: string **required** enum: `text`, `image`, `multimodal`
- `search_query`: string
