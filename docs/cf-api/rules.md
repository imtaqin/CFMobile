# Rules

25 endpoints.

## DELETE /accounts/{account_id}/cloudforce-one/rules

Delete all rules

operationId: `cloudforce-one-delete-all-rules`

**Response** 200 → `result`

- `deleted`: number **required**

## GET /accounts/{account_id}/cloudforce-one/rules

List rules

operationId: `cloudforce-one-list-rules` · query: `namespace`, `path`, `recursive`, `search`, `is_public`, `limit`, `offset`

**Response** 200 → `result`

- `rules`: object[] **required**
  [array of]
  - `content`: string
  - `created_at`: number **required**
  - `created_by`: string **required**
  - `description`: string **required**
  - `enabled`: boolean **required** — Whether this rule is active for dice consumers.
  - `id`: string **required**
  - `is_public`: boolean **required** — Whether this rule is visible to other internal accounts.
  - `meta`: object[] — Structured meta entries for the rule (parsed from content plus any request-supplied meta). Returned in source order.
    [array of]
    - `key`: string **required**
    - `type`: string **required** enum: `string`, `bool`, `int`
    - `value`: any **required**
  - `name`: string **required**
  - `namespaces`: string[] **required**
    [array]
  - `path`: string **required**
  - `pending_approval_id`: number **required** — ID of an open approval workflow targeting this rule, or null if none is pending.
  - `pending_change`: object **required** — Proposed update or deletion awaiting approval. The other rule fields describe the currently applied version.
    - `approval_id`: number **required**
    - `requested_at`: number **required**
    - `requested_by`: string **required**
    - `type`: string **required** enum: `update`, `delete`
  - `structured_source`: string — Original JSON payload for rules created via the structured rules API. Null for hand-written rules.
  - `updated_at`: number **required**
  - `updated_by`: string **required**
- `total`: number **required**

## POST /accounts/{account_id}/cloudforce-one/rules

Create a rule

operationId: `cloudforce-one-create-rule`

**Request** (application/json)

- `actions`: object[]
  [array of]
  - `action_config`: object **required** — Action-specific configuration parameters.
  - `action_type`: string **required** enum: `alert_gchat`, `webhook`, `logging`, `email`, `pipeline`, `remediation`, `throttle`, `delete`
  - `enabled`: boolean default: `true`
- `commit_message`: string — Human-readable justification for this change. Required for internal-account submissions; optional for customer accounts and automated sync.
- `content`: string **required**
- `description`: string — Human-readable description of the rule. Auto-extracted from YARA meta if present.
- `enabled`: boolean default: `true` — Whether this rule is active for dice consumers.
- `is_public`: boolean default: `false` — Whether this rule is visible to other internal accounts.
- `meta`: object[] — Adds YARA meta entries to the rule's meta block and stores them in rule_meta alongside content metadata. Use valid YARA identifiers for keys
  [array of]
  - `key`: string **required**
  - `value`: any **required**
- `name`: string **required**
- `namespaces`: string[] default: `` — Optional WfP deployment tags (customer rules only). Internal rules leave empty.
  [array]
- `path`: string **required**

**Response** 201 → `result`

- `content`: string **required**
- `created_at`: number **required**
- `created_by`: string **required**
- `description`: string **required**
- `enabled`: boolean **required** — Whether this rule is active for dice consumers.
- `id`: string **required**
- `is_public`: boolean **required** — Whether this rule is visible to other internal accounts.
- `meta`: object[] — Structured meta entries for the rule (parsed from content plus any request-supplied meta). Returned in source order.
  [array of]
  - `key`: string **required**
  - `type`: string **required** enum: `string`, `bool`, `int`
  - `value`: any **required**
- `name`: string **required**
- `namespaces`: string[] **required**
  [array]
- `path`: string **required**
- `pending_approval_id`: number **required** — ID of an open approval workflow targeting this rule, or null if none is pending.
- `pending_change`: object **required** — Proposed update or deletion awaiting approval. The other rule fields describe the currently applied version.
  - `approval_id`: number **required**
  - `requested_at`: number **required**
  - `requested_by`: string **required**
  - `type`: string **required** enum: `update`, `delete`
- `structured_source`: string — Original JSON payload for rules created via the structured rules API. Null for hand-written rules.
- `updated_at`: number **required**
- `updated_by`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/rules/{id}

Delete a rule

operationId: `cloudforce-one-delete-rule`

**Request** (application/json)

- `commit_message`: string — Human-readable justification for the deletion. Required for internal-account submissions; optional for customer accounts and automated sync.

**Response** 200 → `result`

- `success`: boolean **required**

## GET /accounts/{account_id}/cloudforce-one/rules/{id}

Get a rule

operationId: `cloudforce-one-get-rule`

**Response** 200 → `result`

- `content`: string
- `created_at`: number **required**
- `created_by`: string **required**
- `description`: string **required**
- `enabled`: boolean **required** — Whether this rule is active for dice consumers.
- `id`: string **required**
- `is_public`: boolean **required** — Whether this rule is visible to other internal accounts.
- `meta`: object[] — Structured meta entries for the rule (parsed from content plus any request-supplied meta). Returned in source order.
  [array of]
  - `key`: string **required**
  - `type`: string **required** enum: `string`, `bool`, `int`
  - `value`: any **required**
- `name`: string **required**
- `namespaces`: string[] **required**
  [array]
- `path`: string **required**
- `pending_approval_id`: number **required** — ID of an open approval workflow targeting this rule, or null if none is pending.
- `pending_change`: object **required** — Proposed update or deletion awaiting approval. The other rule fields describe the currently applied version.
  - `approval_id`: number **required**
  - `requested_at`: number **required**
  - `requested_by`: string **required**
  - `type`: string **required** enum: `update`, `delete`
- `structured_source`: string — Original JSON payload for rules created via the structured rules API. Null for hand-written rules.
- `updated_at`: number **required**
- `updated_by`: string **required**

## PUT /accounts/{account_id}/cloudforce-one/rules/{id}

Update a rule

operationId: `cloudforce-one-update-rule`

**Request** (application/json)

- `commit_message`: string — Human-readable justification for this change. Required for internal-account submissions; optional for customer accounts and automated sync.
- `content`: string
- `description`: string — Human-readable description of the rule. Auto-extracted from YARA meta if present.
- `enabled`: boolean — Whether this rule is active for dice consumers.
- `is_public`: boolean — Whether this rule is visible to other internal accounts.
- `meta`: object[] — Adds YARA meta entries to the rule's meta block and stores them in rule_meta alongside content metadata. Use valid YARA identifiers for keys
  [array of]
  - `key`: string **required**
  - `value`: any **required**
- `name`: string
- `namespaces`: string[]
  [array]
- `path`: string — Path change goes through approval workflow.

**Response** 200 → `result`

- `content`: string
- `created_at`: number **required**
- `created_by`: string **required**
- `description`: string **required**
- `enabled`: boolean **required** — Whether this rule is active for dice consumers.
- `id`: string **required**
- `is_public`: boolean **required** — Whether this rule is visible to other internal accounts.
- `meta`: object[] — Structured meta entries for the rule (parsed from content plus any request-supplied meta). Returned in source order.
  [array of]
  - `key`: string **required**
  - `type`: string **required** enum: `string`, `bool`, `int`
  - `value`: any **required**
- `name`: string **required**
- `namespaces`: string[] **required**
  [array]
- `path`: string **required**
- `pending_approval_id`: number **required** — ID of an open approval workflow targeting this rule, or null if none is pending.
- `pending_change`: object **required** — Proposed update or deletion awaiting approval. The other rule fields describe the currently applied version.
  - `approval_id`: number **required**
  - `requested_at`: number **required**
  - `requested_by`: string **required**
  - `type`: string **required** enum: `update`, `delete`
- `structured_source`: string — Original JSON payload for rules created via the structured rules API. Null for hand-written rules.
- `updated_at`: number **required**
- `updated_by`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/rules/exemptions

Remove patterns from exemption rules

operationId: `cloudforce-one-remove-account-exemptions`

**Request** (application/json)

- `namespace`: string[]
  [array]
- `tag_match`: string[]
  [array]
- `worker_name`: string[]
  [array]

**Response** 200 → `result`

- `namespace`: string[] **required**
  [array]
- `tag_match`: string[] **required**
  [array]
- `worker_name`: string[] **required**
  [array]

## GET /accounts/{account_id}/cloudforce-one/rules/exemptions

Get exemption rules for an account

operationId: `cloudforce-one-get-exemptions`

**Response** 200 → `result`

- `namespace`: string[] **required**
  [array]
- `tag_match`: string[] **required**
  [array]
- `worker_name`: string[] **required**
  [array]

## POST /accounts/{account_id}/cloudforce-one/rules/exemptions

Add patterns to exemption rules

operationId: `cloudforce-one-add-account-exemptions`

**Request** (application/json)

- `namespace`: string[]
  [array]
- `tag_match`: string[]
  [array]
- `worker_name`: string[]
  [array]

**Response** 200 → `result`

- `namespace`: string[] **required**
  [array]
- `tag_match`: string[] **required**
  [array]
- `worker_name`: string[] **required**
  [array]

## PUT /accounts/{account_id}/cloudforce-one/rules/exemptions

Update exemption rule patterns

operationId: `cloudforce-one-update-account-exemptions`

**Request** (application/json)

- `namespace`: object[]
  [array of]
  - `new_pattern`: string **required**
  - `old_pattern`: string **required**
- `tag_match`: object[]
  [array of]
  - `new_pattern`: string **required**
  - `old_pattern`: string **required**
- `worker_name`: object[]
  [array of]
  - `new_pattern`: string **required**
  - `old_pattern`: string **required**

**Response** 200 → `result`

- `namespace`: string[] **required**
  [array]
- `tag_match`: string[] **required**
  [array]
- `worker_name`: string[] **required**
  [array]

## GET /accounts/{account_id}/cloudforce-one/rules/managed

Get managed rules

operationId: `cloudforce-one-get-managed-rules`

**Response** 200 → `result`

- `metadata`: object **required**
  - `fetched_at`: string **required**
  - `total_rules`: number **required**
- `rules`: object[] **required**
  [array of]
  - `description`: string **required**
  - `name`: string **required**

## GET /accounts/{account_id}/cloudforce-one/rules/search

Search rules

operationId: `cloudforce-one-search-rules` · query: `namespace`, `path`, `recursive`, `search`, `is_public`, `limit`, `offset`, `query`, `mode`, `language`

**Response** 200 → `result`

- `fallback`: boolean — True when AI Search was unavailable and the response is from a fallback path.
- `interpreted`: object — Parsed natural-language interpretation of the query, when available.
  - `filters`: object — Filters applied during retrieval (account ACL plus user-supplied facets).
  - `retrieval_type`: string **required**
- `mode`: string **required** — Retrieval strategy actually used to produce results.
- `results`: object[] **required**
  [array of]
  - `content`: string
  - `created_at`: number **required**
  - `created_by`: string **required**
  - `description`: string **required**
  - `enabled`: boolean **required** — Whether this rule is active for dice consumers.
  - `id`: string **required**
  - `is_public`: boolean **required** — Whether this rule is visible to other internal accounts.
  - `meta`: object[] — Structured meta entries for the rule (parsed from content plus any request-supplied meta). Returned in source order.
    [array of]
    - `key`: string **required**
    - `type`: string **required** enum: `string`, `bool`, `int`
    - `value`: any **required**
  - `name`: string **required**
  - `namespaces`: string[] **required**
    [array]
  - `path`: string **required**
  - `pending_approval_id`: number **required** — ID of an open approval workflow targeting this rule, or null if none is pending.
  - `pending_change`: object **required** — Proposed update or deletion awaiting approval. The other rule fields describe the currently applied version.
    - `approval_id`: number **required**
    - `requested_at`: number **required**
    - `requested_by`: string **required**
    - `type`: string **required** enum: `update`, `delete`
  - `structured_source`: string — Original JSON payload for rules created via the structured rules API. Null for hand-written rules.
  - `updated_at`: number **required**
  - `updated_by`: string **required**
  - `score`: number — Relevance score in [0,1]. Present only when AI Search powers the query.
  - `scoring_details`: object — AI Search hybrid retrieval returns this per-component scoring breakdown.
    - `fusion_method`: string
    - `keyword_rank`: number
    - `keyword_score`: number
    - `reranking_score`: number
    - `vector_rank`: number
    - `vector_score`: number
- `total`: integer **required**

## GET /accounts/{account_id}/cloudforce-one/rules/stats

Get dashboard stats

operationId: `cloudforce-one-get-rule-stats`

**Response** 200 → `result`

- `pending_approvals`: number **required**
- `rules_by_namespace`: object **required**
- `total_rules`: number **required**

## GET /accounts/{account_id}/cloudforce-one/rules/structured

List email rules

operationId: `cloudforce-one-list-email-rules` · query: `limit`, `offset`, `search`

**Response** 200 → `result`

- `rules`: object[] **required**
  [array of]
  - `content`: string
  - `created_at`: number **required**
  - `created_by`: string **required**
  - `description`: string **required**
  - `enabled`: boolean **required** — Whether this rule is active for dice consumers.
  - `id`: string **required**
  - `is_public`: boolean **required** — Whether this rule is visible to other internal accounts.
  - `meta`: object[] — Structured meta entries for the rule (parsed from content plus any request-supplied meta). Returned in source order.
    [array of]
    - `key`: string **required**
    - `type`: string **required** enum: `string`, `bool`, `int`
    - `value`: any **required**
  - `name`: string **required**
  - `namespaces`: string[] **required**
    [array]
  - `path`: string **required**
  - `pending_approval_id`: number **required** — ID of an open approval workflow targeting this rule, or null if none is pending.
  - `pending_change`: object **required** — Proposed update or deletion awaiting approval. The other rule fields describe the currently applied version.
    - `approval_id`: number **required**
    - `requested_at`: number **required**
    - `requested_by`: string **required**
    - `type`: string **required** enum: `update`, `delete`
  - `structured_source`: string — Original JSON payload for rules created via the structured rules API. Null for hand-written rules.
  - `updated_at`: number **required**
  - `updated_by`: string **required**
- `total`: number **required**

## POST /accounts/{account_id}/cloudforce-one/rules/structured

Create an email rule

operationId: `cloudforce-one-create-email-rule`

**Request** (application/json)

- `condition`: object **required** — Nested condition groups support up to 10 levels of depth.
  - `conditions`: object[] **required**
    [array of]
    - `field`: string **required**
    - `operator`: string **required** enum: `==`, `!=`, `>`, `>=`, `<`, `<=`, `contains`, `matches`
    - `type`: string **required** enum: `scalar`
    - `value`: any **required**
  - `operator`: string **required** enum: `and`, `or`
  - `type`: string **required** enum: `group`
- `description`: string
- `enabled`: boolean default: `true`
- `meta`: object[]
  [array of]
  - `key`: string **required**
  - `value`: any **required**
- `name`: string **required**
- `status`: string enum: `silent`, `blocking` default: `silent` — Disposition for matching email. This emits status metadata with the selected value.
- `strings`: object[] default: ``
  [array of]
  - `identifier`: string **required**
  - `match_type`: string enum: `text`, `hex`, `regex` default: `text`
  - `modifiers`: string[] default: ``
    [array]
  - `type`: string **required** enum: `string_match`
  - `value`: string **required**

**Response** 201 → `result`

- `content`: string
- `created_at`: number **required**
- `created_by`: string **required**
- `description`: string **required**
- `enabled`: boolean **required** — Whether this rule is active for dice consumers.
- `id`: string **required**
- `is_public`: boolean **required** — Whether this rule is visible to other internal accounts.
- `meta`: object[] — Structured meta entries for the rule (parsed from content plus any request-supplied meta). Returned in source order.
  [array of]
  - `key`: string **required**
  - `type`: string **required** enum: `string`, `bool`, `int`
  - `value`: any **required**
- `name`: string **required**
- `namespaces`: string[] **required**
  [array]
- `path`: string **required**
- `pending_approval_id`: number **required** — ID of an open approval workflow targeting this rule, or null if none is pending.
- `pending_change`: object **required** — Proposed update or deletion awaiting approval. The other rule fields describe the currently applied version.
  - `approval_id`: number **required**
  - `requested_at`: number **required**
  - `requested_by`: string **required**
  - `type`: string **required** enum: `update`, `delete`
- `structured_source`: string — Original JSON payload for rules created via the structured rules API. Null for hand-written rules.
- `updated_at`: number **required**
- `updated_by`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/rules/structured/{id}

Delete an email rule

operationId: `cloudforce-one-delete-email-rule`

**Response** 200 → `result`

- `success`: boolean **required**

## GET /accounts/{account_id}/cloudforce-one/rules/structured/{id}

Get an email rule

operationId: `cloudforce-one-get-email-rule`

**Response** 200 → `result`

- `content`: string
- `created_at`: number **required**
- `created_by`: string **required**
- `description`: string **required**
- `enabled`: boolean **required** — Whether this rule is active for dice consumers.
- `id`: string **required**
- `is_public`: boolean **required** — Whether this rule is visible to other internal accounts.
- `meta`: object[] — Structured meta entries for the rule (parsed from content plus any request-supplied meta). Returned in source order.
  [array of]
  - `key`: string **required**
  - `type`: string **required** enum: `string`, `bool`, `int`
  - `value`: any **required**
- `name`: string **required**
- `namespaces`: string[] **required**
  [array]
- `path`: string **required**
- `pending_approval_id`: number **required** — ID of an open approval workflow targeting this rule, or null if none is pending.
- `pending_change`: object **required** — Proposed update or deletion awaiting approval. The other rule fields describe the currently applied version.
  - `approval_id`: number **required**
  - `requested_at`: number **required**
  - `requested_by`: string **required**
  - `type`: string **required** enum: `update`, `delete`
- `structured_source`: string — Original JSON payload for rules created via the structured rules API. Null for hand-written rules.
- `updated_at`: number **required**
- `updated_by`: string **required**

## PUT /accounts/{account_id}/cloudforce-one/rules/structured/{id}

Update an email rule

operationId: `cloudforce-one-update-email-rule`

**Request** (application/json)

- `condition`: object — Nested condition groups support up to 10 levels of depth.
  - `conditions`: object[] **required**
    [array of]
    - `field`: string **required**
    - `operator`: string **required** enum: `==`, `!=`, `>`, `>=`, `<`, `<=`, `contains`, `matches`
    - `type`: string **required** enum: `scalar`
    - `value`: any **required**
  - `operator`: string **required** enum: `and`, `or`
  - `type`: string **required** enum: `group`
- `description`: string
- `enabled`: boolean
- `meta`: object[]
  [array of]
  - `key`: string **required**
  - `value`: any **required**
- `name`: string
- `status`: string enum: `silent`, `blocking` — Disposition for matching email. This emits status metadata with the selected value.
- `strings`: object[]
  [array of]
  - `identifier`: string **required**
  - `match_type`: string enum: `text`, `hex`, `regex` default: `text`
  - `modifiers`: string[] default: ``
    [array]
  - `type`: string **required** enum: `string_match`
  - `value`: string **required**

**Response** 200 → `result`

- `content`: string
- `created_at`: number **required**
- `created_by`: string **required**
- `description`: string **required**
- `enabled`: boolean **required** — Whether this rule is active for dice consumers.
- `id`: string **required**
- `is_public`: boolean **required** — Whether this rule is visible to other internal accounts.
- `meta`: object[] — Structured meta entries for the rule (parsed from content plus any request-supplied meta). Returned in source order.
  [array of]
  - `key`: string **required**
  - `type`: string **required** enum: `string`, `bool`, `int`
  - `value`: any **required**
- `name`: string **required**
- `namespaces`: string[] **required**
  [array]
- `path`: string **required**
- `pending_approval_id`: number **required** — ID of an open approval workflow targeting this rule, or null if none is pending.
- `pending_change`: object **required** — Proposed update or deletion awaiting approval. The other rule fields describe the currently applied version.
  - `approval_id`: number **required**
  - `requested_at`: number **required**
  - `requested_by`: string **required**
  - `type`: string **required** enum: `update`, `delete`
- `structured_source`: string — Original JSON payload for rules created via the structured rules API. Null for hand-written rules.
- `updated_at`: number **required**
- `updated_by`: string **required**

## POST /accounts/{account_id}/cloudforce-one/rules/structured/{id}/test

Test an email rule

operationId: `cloudforce-one-test-email-rule`

**Request** (application/json)

- `sample_json`: string **required**

**Response** 200 → `result`

- `error`: string
- `matched`: boolean **required**
- `rules`: string[] **required**
  [array]

## PUT /accounts/{account_id}/cloudforce-one/rules/structured/approvals/{id}

Update a pending structured email rule approval

operationId: `cloudforce-one-update-pending-email-rule-approval` · query: `module`

**Request** (application/json)

- `condition`: object **required** — Nested condition groups support up to 10 levels of depth.
  - `conditions`: object[] **required**
    [array of]
    - `field`: string **required**
    - `operator`: string **required** enum: `==`, `!=`, `>`, `>=`, `<`, `<=`, `contains`, `matches`
    - `type`: string **required** enum: `scalar`
    - `value`: any **required**
  - `operator`: string **required** enum: `and`, `or`
  - `type`: string **required** enum: `group`
- `description`: string
- `enabled`: boolean default: `true`
- `meta`: object[]
  [array of]
  - `key`: string **required**
  - `value`: any **required**
- `name`: string **required**
- `status`: string enum: `silent`, `blocking` default: `silent` — Disposition for matching email. This emits status metadata with the selected value.
- `strings`: object[] default: ``
  [array of]
  - `identifier`: string **required**
  - `match_type`: string enum: `text`, `hex`, `regex` default: `text`
  - `modifiers`: string[] default: ``
    [array]
  - `type`: string **required** enum: `string_match`
  - `value`: string **required**

**Response** 200 → `result`

- `approval`: any **required**

## POST /accounts/{account_id}/cloudforce-one/rules/structured/approvals/{id}/resubmit

Revise and resubmit a rejected structured email rule approval

operationId: `cloudforce-one-resubmit-email-rule-approval` · query: `module`

**Request** (application/json)

- `condition`: object **required** — Nested condition groups support up to 10 levels of depth.
  - `conditions`: object[] **required**
    [array of]
    - `field`: string **required**
    - `operator`: string **required** enum: `==`, `!=`, `>`, `>=`, `<`, `<=`, `contains`, `matches`
    - `type`: string **required** enum: `scalar`
    - `value`: any **required**
  - `operator`: string **required** enum: `and`, `or`
  - `type`: string **required** enum: `group`
- `description`: string
- `enabled`: boolean default: `true`
- `meta`: object[]
  [array of]
  - `key`: string **required**
  - `value`: any **required**
- `name`: string **required**
- `status`: string enum: `silent`, `blocking` default: `silent` — Disposition for matching email. This emits status metadata with the selected value.
- `strings`: object[] default: ``
  [array of]
  - `identifier`: string **required**
  - `match_type`: string enum: `text`, `hex`, `regex` default: `text`
  - `modifiers`: string[] default: ``
    [array]
  - `type`: string **required** enum: `string_match`
  - `value`: string **required**

**Response** 202 → `result`

- `approval_id`: number **required**
- `message`: string **required**
- `requires_approval`: boolean **required** enum: `true`
- `revision_number`: integer **required**
- `supersedes_approval_id`: number **required**

## GET /accounts/{account_id}/cloudforce-one/rules/structured/schema

Get email rule schema

operationId: `cloudforce-one-get-email-rule-schema`

**Response** 200 → `result`

- `arrays`: object[] **required**
  [array of]
  - `counter`: string **required**
  - `fields`: object[] **required**
    [array of]
    - `name`: string **required**
    - `type`: string **required** enum: `string`, `integer`, `float`, `boolean`
  - `path`: string **required**
- `headers`: object **required**
  - `fields`: object[] **required**
    [array of]
    - `name`: string **required**
    - `type`: string **required** enum: `string`, `integer`, `float`, `boolean`
  - `path`: string **required**
- `operators`: object **required**
  - `boolean`: string[] **required**
    [array]
  - `float`: string[] **required**
    [array]
  - `integer`: string[] **required**
    [array]
  - `string`: string[] **required**
    [array]
- `scalars`: object[] **required**
  [array of]
  - `path`: string **required**
  - `type`: string **required** enum: `string`, `integer`, `float`, `boolean`
- `string_arrays`: object[] **required**
  [array of]
  - `counter`: string **required**
  - `path`: string **required**
- `structs`: object[] **required**
  [array of]
  - `fields`: object[] **required**
    [array of]
    - `name`: string **required**
    - `type`: string **required** enum: `string`, `integer`, `float`, `boolean`
  - `path`: string **required**

## POST /accounts/{account_id}/cloudforce-one/rules/structured/validate

Validate an email rule

operationId: `cloudforce-one-validate-email-rule`

**Request** (application/json)

- `condition`: object **required** — Nested condition groups support up to 10 levels of depth.
  - `conditions`: object[] **required**
    [array of]
    - `field`: string **required**
    - `operator`: string **required** enum: `==`, `!=`, `>`, `>=`, `<`, `<=`, `contains`, `matches`
    - `type`: string **required** enum: `scalar`
    - `value`: any **required**
  - `operator`: string **required** enum: `and`, `or`
  - `type`: string **required** enum: `group`
- `description`: string
- `enabled`: boolean default: `true`
- `existing_rule_id`: string — Existing rule ID to exclude from duplicate-name checks when validating an update.
- `meta`: object[]
  [array of]
  - `key`: string **required**
  - `value`: any **required**
- `name`: string **required**
- `status`: string enum: `silent`, `blocking` default: `silent` — Disposition for matching email. This emits status metadata with the selected value.
- `strings`: object[] default: ``
  [array of]
  - `identifier`: string **required**
  - `match_type`: string enum: `text`, `hex`, `regex` default: `text`
  - `modifiers`: string[] default: ``
    [array]
  - `type`: string **required** enum: `string_match`
  - `value`: string **required**

**Response** 200 → `result`

- `compiled_yara`: string
- `error`: string
- `valid`: boolean **required**

## GET /accounts/{account_id}/cloudforce-one/rules/tree

Get folder tree structure

operationId: `cloudforce-one-get-rule-tree`

**Response** 200 → `result`

- `tree`: object[] **required**
  [array of]
  - `children`: object[] **required**
    [array of]
    - `children`: object[] **required**
    - `count`: number **required**
    - `name`: string **required**
    - `path`: string **required**
  - `count`: number **required**
  - `name`: string **required**
  - `path`: string **required**

## POST /accounts/{account_id}/cloudforce-one/rules/validate

Validate rule with context

operationId: `cloudforce-one-validate-rule`

**Request** (application/json)

- `content`: string **required**
- `excludeRuleId`: string
- `name`: string **required**
- `namespaces`: string[] default: ``
  [array]
- `path`: string

**Response** 200 → `result`

- `error`: string
- `valid`: boolean **required**
