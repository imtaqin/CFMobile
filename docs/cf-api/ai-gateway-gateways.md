# AI Gateway Gateways

6 endpoints.

## GET /accounts/{account_id}/ai-gateway/gateways

List gateways

operationId: `aig-config-list-gateway` · query: `page`, `per_page`, `search`

**Response** 200 → `result`

[array of]
- `authentication`: boolean — Require authentication for gateway access. New gateways must have authentication enabled. Once enabled, authentication cannot be disabled.
- `byok_only`: boolean — Requires customer-provided provider credentials and prevents fallback to Unified Billing.
- `cache_invalidate_on_update`: boolean **required**
- `cache_ttl`: integer **required**
- `collect_logs`: boolean **required**
- `created_at`: string **required**
- `dlp`: any
- `fedramp_level`: string enum: `fedramp-medium`, `fedramp-high` — FedRAMP compliance level: fedramp-medium or fedramp-high.
- `fedramp_mode`: string enum: `prefer`, `require` — FedRAMP enforcement mode. "prefer" prioritizes compliant connectors but allows fallback. "require" strictly filters.
- `guardrails`: object
  - `prompt`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
  - `response`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
- `id`: string **required** — Unique identifier of the AI Gateway within the account.
- `is_default`: boolean
- `log_classification`: boolean
- `log_management`: integer
- `log_management_strategy`: string enum: `STOP_INSERTING`, `DELETE_OLDEST`
- `logpush`: boolean
- `logpush_public_key`: string
- `modified_at`: string **required**
- `otel`: object[]
  [array of]
  - `authorization`: string
  - `content_type`: string enum: `json`, `protobuf` default: `json`
  - `headers`: object **required**
  - `url`: string **required**
- `rate_limiting_interval`: integer **required**
- `rate_limiting_limit`: integer **required**
- `rate_limiting_technique`: string enum: `fixed`, `sliding`
- `retry_backoff`: string enum: `constant`, `linear`, `exponential` — Backoff strategy for retry delays
- `retry_delay`: integer — Delay between retry attempts in milliseconds (0-60000)
- `retry_max_attempts`: integer — Maximum number of retry attempts for failed requests (1-5)
- `spend_limits`: object
  - `enabled`: boolean default: `false`
  - `rules`: object[] default: ``
    [array of]
    - `enabled`: boolean default: `true`
    - `id`: string default: `00000000`
    - `limit`: number **required**
    - `limitType`: string **required** enum: `cost`
    - `metadata`: object
    - `model`: object
    - `provider`: object
    - `technique`: string enum: `fixed`, `sliding` default: `sliding`
    - `window`: integer **required**
- `store_id`: string — Secrets Store used by this gateway. Omit on update to keep the current store. Cannot be cleared while stored keys or secret references depen
- `stripe`: object
  - `authorization`: string **required**
  - `usage_events`: object[] **required**
    [array of]
    - `payload`: string **required**
- `workers_ai_billing_mode`: string enum: `postpaid`, `unified` default: `postpaid` — Controls how Workers AI inference calls routed through this gateway are billed. 'postpaid' bills the account directly through Workers AI; 'u
- `zdr`: boolean

## POST /accounts/{account_id}/ai-gateway/gateways

Create a gateway

operationId: `aig-config-create-gateway`

**Request** (application/json)

- `authentication`: boolean — Require authentication for gateway access. New gateways must have authentication enabled. Once enabled, authentication cannot be disabled.
- `byok_only`: boolean — Requires customer-provided provider credentials and prevents fallback to Unified Billing.
- `cache_invalidate_on_update`: boolean **required**
- `cache_ttl`: integer **required**
- `collect_logs`: boolean **required**
- `dlp`: any
- `guardrails`: object
  - `prompt`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
  - `response`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
- `id`: string **required** — Unique identifier of the AI Gateway within the account.
- `log_classification`: boolean
- `log_management`: integer
- `log_management_strategy`: string enum: `STOP_INSERTING`, `DELETE_OLDEST`
- `logpush`: boolean
- `logpush_public_key`: string
- `otel`: object[]
  [array of]
  - `authorization`: string
  - `content_type`: string enum: `json`, `protobuf` default: `json`
  - `headers`: object **required**
  - `url`: string **required**
- `rate_limiting_interval`: integer **required**
- `rate_limiting_limit`: integer **required**
- `rate_limiting_technique`: string enum: `fixed`, `sliding`
- `retry_backoff`: string enum: `constant`, `linear`, `exponential` — Backoff strategy for retry delays
- `retry_delay`: integer — Delay between retry attempts in milliseconds (0-60000)
- `retry_max_attempts`: integer — Maximum number of retry attempts for failed requests (1-5)
- `spend_limits`: object
  - `enabled`: boolean default: `false`
  - `rules`: object[] default: ``
    [array of]
    - `enabled`: boolean default: `true`
    - `id`: string default: `00000000`
    - `limit`: number **required**
    - `limitType`: string **required** enum: `cost`
    - `metadata`: object
    - `model`: object
    - `provider`: object
    - `technique`: string enum: `fixed`, `sliding` default: `sliding`
    - `window`: integer **required**
- `store_id`: string — Secrets Store used by this gateway. Omit on update to keep the current store. Cannot be cleared while stored keys or secret references depen
- `stripe`: object
  - `authorization`: string **required**
  - `usage_events`: object[] **required**
    [array of]
    - `payload`: string **required**
- `workers_ai_billing_mode`: string enum: `postpaid`, `unified` default: `postpaid` — Controls how Workers AI inference calls routed through this gateway are billed. 'postpaid' bills the account directly through Workers AI; 'u
- `zdr`: boolean

**Response** 200 → `result`

- `authentication`: boolean — Require authentication for gateway access. New gateways must have authentication enabled. Once enabled, authentication cannot be disabled.
- `byok_only`: boolean — Requires customer-provided provider credentials and prevents fallback to Unified Billing.
- `cache_invalidate_on_update`: boolean **required**
- `cache_ttl`: integer **required**
- `collect_logs`: boolean **required**
- `created_at`: string **required**
- `dlp`: any
- `fedramp_level`: string enum: `fedramp-medium`, `fedramp-high` — FedRAMP compliance level: fedramp-medium or fedramp-high.
- `fedramp_mode`: string enum: `prefer`, `require` — FedRAMP enforcement mode. "prefer" prioritizes compliant connectors but allows fallback. "require" strictly filters.
- `guardrails`: object
  - `prompt`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
  - `response`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
- `id`: string **required** — Unique identifier of the AI Gateway within the account.
- `is_default`: boolean
- `log_classification`: boolean
- `log_management`: integer
- `log_management_strategy`: string enum: `STOP_INSERTING`, `DELETE_OLDEST`
- `logpush`: boolean
- `logpush_public_key`: string
- `modified_at`: string **required**
- `otel`: object[]
  [array of]
  - `authorization`: string
  - `content_type`: string enum: `json`, `protobuf` default: `json`
  - `headers`: object **required**
  - `url`: string **required**
- `rate_limiting_interval`: integer **required**
- `rate_limiting_limit`: integer **required**
- `rate_limiting_technique`: string enum: `fixed`, `sliding`
- `retry_backoff`: string enum: `constant`, `linear`, `exponential` — Backoff strategy for retry delays
- `retry_delay`: integer — Delay between retry attempts in milliseconds (0-60000)
- `retry_max_attempts`: integer — Maximum number of retry attempts for failed requests (1-5)
- `spend_limits`: object
  - `enabled`: boolean default: `false`
  - `rules`: object[] default: ``
    [array of]
    - `enabled`: boolean default: `true`
    - `id`: string default: `00000000`
    - `limit`: number **required**
    - `limitType`: string **required** enum: `cost`
    - `metadata`: object
    - `model`: object
    - `provider`: object
    - `technique`: string enum: `fixed`, `sliding` default: `sliding`
    - `window`: integer **required**
- `store_id`: string — Secrets Store used by this gateway. Omit on update to keep the current store. Cannot be cleared while stored keys or secret references depen
- `stripe`: object
  - `authorization`: string **required**
  - `usage_events`: object[] **required**
    [array of]
    - `payload`: string **required**
- `workers_ai_billing_mode`: string enum: `postpaid`, `unified` default: `postpaid` — Controls how Workers AI inference calls routed through this gateway are billed. 'postpaid' bills the account directly through Workers AI; 'u
- `zdr`: boolean

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/url/{provider}

Get Gateway URL

operationId: `aig-config-get-gateway-url`

**Response** 200 → `result`

string

## DELETE /accounts/{account_id}/ai-gateway/gateways/{id}

Delete a gateway

operationId: `aig-config-delete-gateway`

**Response** 200 → `result`

- `authentication`: boolean — Require authentication for gateway access. New gateways must have authentication enabled. Once enabled, authentication cannot be disabled.
- `byok_only`: boolean — Requires customer-provided provider credentials and prevents fallback to Unified Billing.
- `cache_invalidate_on_update`: boolean **required**
- `cache_ttl`: integer **required**
- `collect_logs`: boolean **required**
- `created_at`: string **required**
- `dlp`: any
- `fedramp_level`: string enum: `fedramp-medium`, `fedramp-high` — FedRAMP compliance level: fedramp-medium or fedramp-high.
- `fedramp_mode`: string enum: `prefer`, `require` — FedRAMP enforcement mode. "prefer" prioritizes compliant connectors but allows fallback. "require" strictly filters.
- `guardrails`: object
  - `prompt`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
  - `response`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
- `id`: string **required** — Unique identifier of the AI Gateway within the account.
- `is_default`: boolean
- `log_classification`: boolean
- `log_management`: integer
- `log_management_strategy`: string enum: `STOP_INSERTING`, `DELETE_OLDEST`
- `logpush`: boolean
- `logpush_public_key`: string
- `modified_at`: string **required**
- `otel`: object[]
  [array of]
  - `authorization`: string
  - `content_type`: string enum: `json`, `protobuf` default: `json`
  - `headers`: object **required**
  - `url`: string **required**
- `rate_limiting_interval`: integer **required**
- `rate_limiting_limit`: integer **required**
- `rate_limiting_technique`: string enum: `fixed`, `sliding`
- `retry_backoff`: string enum: `constant`, `linear`, `exponential` — Backoff strategy for retry delays
- `retry_delay`: integer — Delay between retry attempts in milliseconds (0-60000)
- `retry_max_attempts`: integer — Maximum number of retry attempts for failed requests (1-5)
- `spend_limits`: object
  - `enabled`: boolean default: `false`
  - `rules`: object[] default: ``
    [array of]
    - `enabled`: boolean default: `true`
    - `id`: string default: `00000000`
    - `limit`: number **required**
    - `limitType`: string **required** enum: `cost`
    - `metadata`: object
    - `model`: object
    - `provider`: object
    - `technique`: string enum: `fixed`, `sliding` default: `sliding`
    - `window`: integer **required**
- `store_id`: string — Secrets Store used by this gateway. Omit on update to keep the current store. Cannot be cleared while stored keys or secret references depen
- `stripe`: object
  - `authorization`: string **required**
  - `usage_events`: object[] **required**
    [array of]
    - `payload`: string **required**
- `workers_ai_billing_mode`: string enum: `postpaid`, `unified` default: `postpaid` — Controls how Workers AI inference calls routed through this gateway are billed. 'postpaid' bills the account directly through Workers AI; 'u
- `zdr`: boolean

## GET /accounts/{account_id}/ai-gateway/gateways/{id}

Get a gateway

operationId: `aig-config-fetch-gateway`

**Response** 200 → `result`

- `authentication`: boolean — Require authentication for gateway access. New gateways must have authentication enabled. Once enabled, authentication cannot be disabled.
- `byok_only`: boolean — Requires customer-provided provider credentials and prevents fallback to Unified Billing.
- `cache_invalidate_on_update`: boolean **required**
- `cache_ttl`: integer **required**
- `collect_logs`: boolean **required**
- `created_at`: string **required**
- `dlp`: any
- `fedramp_level`: string enum: `fedramp-medium`, `fedramp-high` — FedRAMP compliance level: fedramp-medium or fedramp-high.
- `fedramp_mode`: string enum: `prefer`, `require` — FedRAMP enforcement mode. "prefer" prioritizes compliant connectors but allows fallback. "require" strictly filters.
- `guardrails`: object
  - `prompt`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
  - `response`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
- `id`: string **required** — Unique identifier of the AI Gateway within the account.
- `is_default`: boolean
- `log_classification`: boolean
- `log_management`: integer
- `log_management_strategy`: string enum: `STOP_INSERTING`, `DELETE_OLDEST`
- `logpush`: boolean
- `logpush_public_key`: string
- `modified_at`: string **required**
- `otel`: object[]
  [array of]
  - `authorization`: string
  - `content_type`: string enum: `json`, `protobuf` default: `json`
  - `headers`: object **required**
  - `url`: string **required**
- `rate_limiting_interval`: integer **required**
- `rate_limiting_limit`: integer **required**
- `rate_limiting_technique`: string enum: `fixed`, `sliding`
- `retry_backoff`: string enum: `constant`, `linear`, `exponential` — Backoff strategy for retry delays
- `retry_delay`: integer — Delay between retry attempts in milliseconds (0-60000)
- `retry_max_attempts`: integer — Maximum number of retry attempts for failed requests (1-5)
- `spend_limits`: object
  - `enabled`: boolean default: `false`
  - `rules`: object[] default: ``
    [array of]
    - `enabled`: boolean default: `true`
    - `id`: string default: `00000000`
    - `limit`: number **required**
    - `limitType`: string **required** enum: `cost`
    - `metadata`: object
    - `model`: object
    - `provider`: object
    - `technique`: string enum: `fixed`, `sliding` default: `sliding`
    - `window`: integer **required**
- `store_id`: string — Secrets Store used by this gateway. Omit on update to keep the current store. Cannot be cleared while stored keys or secret references depen
- `stripe`: object
  - `authorization`: string **required**
  - `usage_events`: object[] **required**
    [array of]
    - `payload`: string **required**
- `workers_ai_billing_mode`: string enum: `postpaid`, `unified` default: `postpaid` — Controls how Workers AI inference calls routed through this gateway are billed. 'postpaid' bills the account directly through Workers AI; 'u
- `zdr`: boolean

## PUT /accounts/{account_id}/ai-gateway/gateways/{id}

Update a gateway

operationId: `aig-config-update-gateway`

**Request** (application/json)

- `authentication`: boolean — Require authentication for gateway access. New gateways must have authentication enabled. Once enabled, authentication cannot be disabled.
- `byok_only`: boolean — Requires customer-provided provider credentials and prevents fallback to Unified Billing.
- `cache_invalidate_on_update`: boolean **required**
- `cache_ttl`: integer **required**
- `collect_logs`: boolean **required**
- `dlp`: any
- `guardrails`: object
  - `prompt`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
  - `response`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
- `log_classification`: boolean
- `log_management`: integer
- `log_management_strategy`: string enum: `STOP_INSERTING`, `DELETE_OLDEST`
- `logpush`: boolean
- `logpush_public_key`: string
- `otel`: object[]
  [array of]
  - `authorization`: string
  - `content_type`: string enum: `json`, `protobuf` default: `json`
  - `headers`: object **required**
  - `url`: string **required**
- `rate_limiting_interval`: integer **required**
- `rate_limiting_limit`: integer **required**
- `rate_limiting_technique`: string enum: `fixed`, `sliding`
- `retry_backoff`: string enum: `constant`, `linear`, `exponential` — Backoff strategy for retry delays
- `retry_delay`: integer — Delay between retry attempts in milliseconds (0-60000)
- `retry_max_attempts`: integer — Maximum number of retry attempts for failed requests (1-5)
- `spend_limits`: object
  - `enabled`: boolean default: `false`
  - `rules`: object[] default: ``
    [array of]
    - `enabled`: boolean default: `true`
    - `id`: string default: `00000000`
    - `limit`: number **required**
    - `limitType`: string **required** enum: `cost`
    - `metadata`: object
    - `model`: object
    - `provider`: object
    - `technique`: string enum: `fixed`, `sliding` default: `sliding`
    - `window`: integer **required**
- `store_id`: string — Secrets Store used by this gateway. Omit on update to keep the current store. Cannot be cleared while stored keys or secret references depen
- `stripe`: object
  - `authorization`: string **required**
  - `usage_events`: object[] **required**
    [array of]
    - `payload`: string **required**
- `workers_ai_billing_mode`: string enum: `postpaid`, `unified` — Controls how Workers AI inference calls routed through this gateway are billed. 'postpaid' bills the account directly through Workers AI; 'u
- `zdr`: boolean

**Response** 200 → `result`

- `authentication`: boolean — Require authentication for gateway access. New gateways must have authentication enabled. Once enabled, authentication cannot be disabled.
- `byok_only`: boolean — Requires customer-provided provider credentials and prevents fallback to Unified Billing.
- `cache_invalidate_on_update`: boolean **required**
- `cache_ttl`: integer **required**
- `collect_logs`: boolean **required**
- `created_at`: string **required**
- `dlp`: any
- `fedramp_level`: string enum: `fedramp-medium`, `fedramp-high` — FedRAMP compliance level: fedramp-medium or fedramp-high.
- `fedramp_mode`: string enum: `prefer`, `require` — FedRAMP enforcement mode. "prefer" prioritizes compliant connectors but allows fallback. "require" strictly filters.
- `guardrails`: object
  - `prompt`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
  - `response`: object **required**
    - `P1`: string enum: `FLAG`, `BLOCK`
    - `S1`: string enum: `FLAG`, `BLOCK`
    - `S10`: string enum: `FLAG`, `BLOCK`
    - `S11`: string enum: `FLAG`, `BLOCK`
    - `S12`: string enum: `FLAG`, `BLOCK`
    - `S13`: string enum: `FLAG`, `BLOCK`
    - `S14`: string enum: `FLAG`, `BLOCK`
    - `S2`: string enum: `FLAG`, `BLOCK`
    - `S3`: string enum: `FLAG`, `BLOCK`
    - `S4`: string enum: `FLAG`, `BLOCK`
    - `S5`: string enum: `FLAG`, `BLOCK`
    - `S6`: string enum: `FLAG`, `BLOCK`
    - `S7`: string enum: `FLAG`, `BLOCK`
    - `S8`: string enum: `FLAG`, `BLOCK`
    - `S9`: string enum: `FLAG`, `BLOCK`
- `id`: string **required** — Unique identifier of the AI Gateway within the account.
- `is_default`: boolean
- `log_classification`: boolean
- `log_management`: integer
- `log_management_strategy`: string enum: `STOP_INSERTING`, `DELETE_OLDEST`
- `logpush`: boolean
- `logpush_public_key`: string
- `modified_at`: string **required**
- `otel`: object[]
  [array of]
  - `authorization`: string
  - `content_type`: string enum: `json`, `protobuf` default: `json`
  - `headers`: object **required**
  - `url`: string **required**
- `rate_limiting_interval`: integer **required**
- `rate_limiting_limit`: integer **required**
- `rate_limiting_technique`: string enum: `fixed`, `sliding`
- `retry_backoff`: string enum: `constant`, `linear`, `exponential` — Backoff strategy for retry delays
- `retry_delay`: integer — Delay between retry attempts in milliseconds (0-60000)
- `retry_max_attempts`: integer — Maximum number of retry attempts for failed requests (1-5)
- `spend_limits`: object
  - `enabled`: boolean default: `false`
  - `rules`: object[] default: ``
    [array of]
    - `enabled`: boolean default: `true`
    - `id`: string default: `00000000`
    - `limit`: number **required**
    - `limitType`: string **required** enum: `cost`
    - `metadata`: object
    - `model`: object
    - `provider`: object
    - `technique`: string enum: `fixed`, `sliding` default: `sliding`
    - `window`: integer **required**
- `store_id`: string — Secrets Store used by this gateway. Omit on update to keep the current store. Cannot be cleared while stored keys or secret references depen
- `stripe`: object
  - `authorization`: string **required**
  - `usage_events`: object[] **required**
    [array of]
    - `payload`: string **required**
- `workers_ai_billing_mode`: string enum: `postpaid`, `unified` default: `postpaid` — Controls how Workers AI inference calls routed through this gateway are billed. 'postpaid' bills the account directly through Workers AI; 'u
- `zdr`: boolean
