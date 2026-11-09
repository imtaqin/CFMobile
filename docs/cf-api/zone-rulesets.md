# Zone Rulesets

16 endpoints.

## GET /zones/{zone_id}/rulesets

List zone rulesets

operationId: `listZoneRulesets` · query: `cursor`, `per_page`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## POST /zones/{zone_id}/rulesets

Create a zone ruleset

operationId: `createZoneRuleset` · query: `dry_run`

**Request** (application/json)

- `description`: string default: `` — An informative description of the ruleset.
- `id`: any **required**
- `last_updated`: string **required** — The timestamp of when the ruleset was last modified.
- `name`: string — The human-readable name of the ruleset.
- `version`: any **required**
- `kind`: string enum: `managed`, `custom`, `root`, `zone` — The kind of the ruleset.
- `phase`: string enum: `ddos_l4`, `ddos_l7`, `http_config_settings`, `http_custom_errors`, `http_log_custom_fields`, `http_ratelimit`, `http_request_cache_settings`, `http_request_dynamic_redirect` — The phase of the ruleset.
- `rules`: object[] default: `` — The list of rules in the ruleset.
  [array of]
  - `action`: string — The action to perform when the rule matches.
  - `action_parameters`: object default: `[object Object]` — The parameters configuring the rule's action.
  - `categories`: string[] — The categories of the rule.
    [array]
  - `description`: string default: `` — An informative description of the rule.
  - `enabled`: any
  - `exposed_credential_check`: object — Configuration for exposed credential checking.
    - `password_expression`: string **required** — An expression that selects the password used in the credentials check.
    - `username_expression`: string **required** — An expression that selects the user ID used in the credentials check.
  - `expression`: string — The expression defining which traffic will match the rule.
  - `id`: string — The unique ID of the rule.
  - `last_updated`: string **required** — The timestamp of when the rule was last modified.
  - `logging`: object — An object configuring the rule's logging behavior.
    - `enabled`: boolean **required** — Whether to generate a log when the rule matches.
  - `ratelimit`: object — An object configuring the rule's rate limit behavior.
    - `characteristics`: string[] **required** — Characteristics of the request on which the rate limit counter will be incremented.
    - `counting_expression`: string — An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.
    - `mitigation_timeout`: integer — Period of time in seconds after which the action will be disabled following its first execution.
    - `period`: integer **required** — Period in seconds over which the counter is being incremented.
    - `requests_per_period`: integer — The threshold of requests per period after which the action will be executed for the first time.
    - `requests_to_origin`: boolean default: `false` — Whether counting is only performed when an origin is reached.
    - `score_per_period`: integer — The score threshold per period for which the action will be executed the first time.
    - `score_response_header_name`: string — A response header name provided by the origin, which contains the score to increment rate limit counter with.
  - `ref`: string — The reference of the rule (the rule's ID by default).
  - `version`: string **required** — The version of the rule.
  - `action`: string enum: `block`
  - `action_parameters`: object
    - `response`: object — The response to show when the block is applied.
  - `description`: string

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## DELETE /zones/{zone_id}/rulesets/{ruleset_id}

Delete a zone ruleset

operationId: `deleteZoneRuleset` · query: `dry_run`

## GET /zones/{zone_id}/rulesets/{ruleset_id}

Get a zone ruleset

operationId: `getZoneRuleset`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## PUT /zones/{zone_id}/rulesets/{ruleset_id}

Update a zone ruleset

operationId: `updateZoneRuleset` · query: `dry_run`

**Request** (application/json)

- `description`: string default: `` — An informative description of the ruleset.
- `id`: any **required**
- `last_updated`: string **required** — The timestamp of when the ruleset was last modified.
- `name`: string — The human-readable name of the ruleset.
- `version`: any **required**
- `kind`: string enum: `managed`, `custom`, `root`, `zone` — The kind of the ruleset.
- `phase`: string enum: `ddos_l4`, `ddos_l7`, `http_config_settings`, `http_custom_errors`, `http_log_custom_fields`, `http_ratelimit`, `http_request_cache_settings`, `http_request_dynamic_redirect` — The phase of the ruleset.
- `rules`: object[] default: `` — The list of rules in the ruleset.
  [array of]
  - `action`: string — The action to perform when the rule matches.
  - `action_parameters`: object default: `[object Object]` — The parameters configuring the rule's action.
  - `categories`: string[] — The categories of the rule.
    [array]
  - `description`: string default: `` — An informative description of the rule.
  - `enabled`: any
  - `exposed_credential_check`: object — Configuration for exposed credential checking.
    - `password_expression`: string **required** — An expression that selects the password used in the credentials check.
    - `username_expression`: string **required** — An expression that selects the user ID used in the credentials check.
  - `expression`: string — The expression defining which traffic will match the rule.
  - `id`: string — The unique ID of the rule.
  - `last_updated`: string **required** — The timestamp of when the rule was last modified.
  - `logging`: object — An object configuring the rule's logging behavior.
    - `enabled`: boolean **required** — Whether to generate a log when the rule matches.
  - `ratelimit`: object — An object configuring the rule's rate limit behavior.
    - `characteristics`: string[] **required** — Characteristics of the request on which the rate limit counter will be incremented.
    - `counting_expression`: string — An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.
    - `mitigation_timeout`: integer — Period of time in seconds after which the action will be disabled following its first execution.
    - `period`: integer **required** — Period in seconds over which the counter is being incremented.
    - `requests_per_period`: integer — The threshold of requests per period after which the action will be executed for the first time.
    - `requests_to_origin`: boolean default: `false` — Whether counting is only performed when an origin is reached.
    - `score_per_period`: integer — The score threshold per period for which the action will be executed the first time.
    - `score_response_header_name`: string — A response header name provided by the origin, which contains the score to increment rate limit counter with.
  - `ref`: string — The reference of the rule (the rule's ID by default).
  - `version`: string **required** — The version of the rule.
  - `action`: string enum: `block`
  - `action_parameters`: object
    - `response`: object — The response to show when the block is applied.
  - `description`: string

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## POST /zones/{zone_id}/rulesets/{ruleset_id}/rules

Create a zone ruleset rule

operationId: `createZoneRulesetRule` · query: `dry_run`

**Request** (application/json)

(one of 21 variants; showing the first)
- `action`: string — The action to perform when the rule matches.
- `action_parameters`: object default: `[object Object]` — The parameters configuring the rule's action.
- `categories`: string[] — The categories of the rule.
  [array]
- `description`: string default: `` — An informative description of the rule.
- `enabled`: any
- `exposed_credential_check`: object — Configuration for exposed credential checking.
  - `password_expression`: string **required** — An expression that selects the password used in the credentials check.
  - `username_expression`: string **required** — An expression that selects the user ID used in the credentials check.
- `expression`: string — The expression defining which traffic will match the rule.
- `id`: string — The unique ID of the rule.
- `last_updated`: string **required** — The timestamp of when the rule was last modified.
- `logging`: object — An object configuring the rule's logging behavior.
  - `enabled`: boolean **required** — Whether to generate a log when the rule matches.
- `ratelimit`: object — An object configuring the rule's rate limit behavior.
  - `characteristics`: string[] **required** — Characteristics of the request on which the rate limit counter will be incremented.
    [array]
  - `counting_expression`: string — An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.
  - `mitigation_timeout`: integer — Period of time in seconds after which the action will be disabled following its first execution.
  - `period`: integer **required** — Period in seconds over which the counter is being incremented.
  - `requests_per_period`: integer — The threshold of requests per period after which the action will be executed for the first time.
  - `requests_to_origin`: boolean default: `false` — Whether counting is only performed when an origin is reached.
  - `score_per_period`: integer — The score threshold per period for which the action will be executed the first time.
  - `score_response_header_name`: string — A response header name provided by the origin, which contains the score to increment rate limit counter with.
- `ref`: string — The reference of the rule (the rule's ID by default).
- `version`: string **required** — The version of the rule.
- `action`: string enum: `block`
- `action_parameters`: object
  - `response`: object — The response to show when the block is applied.
    - `content`: string **required** — The content to return.
    - `content_type`: string **required** — The type of the content to return.
    - `status_code`: integer **required** — The status code to return.
- `description`: string
- `position`: any

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## DELETE /zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id}

Delete a zone ruleset rule

operationId: `deleteZoneRulesetRule` · query: `dry_run`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## PATCH /zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id}

Update a zone ruleset rule

operationId: `updateZoneRulesetRule` · query: `dry_run`

**Request** (application/json)

(one of 21 variants; showing the first)
- `action`: string — The action to perform when the rule matches.
- `action_parameters`: object default: `[object Object]` — The parameters configuring the rule's action.
- `categories`: string[] — The categories of the rule.
  [array]
- `description`: string default: `` — An informative description of the rule.
- `enabled`: any
- `exposed_credential_check`: object — Configuration for exposed credential checking.
  - `password_expression`: string **required** — An expression that selects the password used in the credentials check.
  - `username_expression`: string **required** — An expression that selects the user ID used in the credentials check.
- `expression`: string — The expression defining which traffic will match the rule.
- `id`: string — The unique ID of the rule.
- `last_updated`: string **required** — The timestamp of when the rule was last modified.
- `logging`: object — An object configuring the rule's logging behavior.
  - `enabled`: boolean **required** — Whether to generate a log when the rule matches.
- `ratelimit`: object — An object configuring the rule's rate limit behavior.
  - `characteristics`: string[] **required** — Characteristics of the request on which the rate limit counter will be incremented.
    [array]
  - `counting_expression`: string — An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.
  - `mitigation_timeout`: integer — Period of time in seconds after which the action will be disabled following its first execution.
  - `period`: integer **required** — Period in seconds over which the counter is being incremented.
  - `requests_per_period`: integer — The threshold of requests per period after which the action will be executed for the first time.
  - `requests_to_origin`: boolean default: `false` — Whether counting is only performed when an origin is reached.
  - `score_per_period`: integer — The score threshold per period for which the action will be executed the first time.
  - `score_response_header_name`: string — A response header name provided by the origin, which contains the score to increment rate limit counter with.
- `ref`: string — The reference of the rule (the rule's ID by default).
- `version`: string **required** — The version of the rule.
- `action`: string enum: `block`
- `action_parameters`: object
  - `response`: object — The response to show when the block is applied.
    - `content`: string **required** — The content to return.
    - `content_type`: string **required** — The type of the content to return.
    - `status_code`: integer **required** — The status code to return.
- `description`: string
- `position`: any

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## GET /zones/{zone_id}/rulesets/{ruleset_id}/versions

List a zone ruleset's versions

operationId: `listZoneRulesetVersions`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## DELETE /zones/{zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

Delete a zone ruleset version

operationId: `deleteZoneRulesetVersion` · query: `dry_run`

## GET /zones/{zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

Get a zone ruleset version

operationId: `getZoneRulesetVersion`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## GET /zones/{zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}/by_tag/{rule_tag}

List a zone ruleset version's rules by tag

operationId: `listZoneRulesetVersionRulesByTag`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## GET /zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint

Get a zone entry point ruleset

operationId: `getZoneEntrypointRuleset`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## PUT /zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint

Update a zone entry point ruleset

operationId: `updateZoneEntrypointRuleset` · query: `dry_run`

**Request** (application/json)

- `description`: string default: `` — An informative description of the ruleset.
- `id`: any **required**
- `last_updated`: string **required** — The timestamp of when the ruleset was last modified.
- `name`: string — The human-readable name of the ruleset.
- `version`: any **required**
- `rules`: object[] default: `` — The list of rules in the ruleset.
  [array of]
  - `action`: string — The action to perform when the rule matches.
  - `action_parameters`: object default: `[object Object]` — The parameters configuring the rule's action.
  - `categories`: string[] — The categories of the rule.
    [array]
  - `description`: string default: `` — An informative description of the rule.
  - `enabled`: any
  - `exposed_credential_check`: object — Configuration for exposed credential checking.
    - `password_expression`: string **required** — An expression that selects the password used in the credentials check.
    - `username_expression`: string **required** — An expression that selects the user ID used in the credentials check.
  - `expression`: string — The expression defining which traffic will match the rule.
  - `id`: string — The unique ID of the rule.
  - `last_updated`: string **required** — The timestamp of when the rule was last modified.
  - `logging`: object — An object configuring the rule's logging behavior.
    - `enabled`: boolean **required** — Whether to generate a log when the rule matches.
  - `ratelimit`: object — An object configuring the rule's rate limit behavior.
    - `characteristics`: string[] **required** — Characteristics of the request on which the rate limit counter will be incremented.
    - `counting_expression`: string — An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.
    - `mitigation_timeout`: integer — Period of time in seconds after which the action will be disabled following its first execution.
    - `period`: integer **required** — Period in seconds over which the counter is being incremented.
    - `requests_per_period`: integer — The threshold of requests per period after which the action will be executed for the first time.
    - `requests_to_origin`: boolean default: `false` — Whether counting is only performed when an origin is reached.
    - `score_per_period`: integer — The score threshold per period for which the action will be executed the first time.
    - `score_response_header_name`: string — A response header name provided by the origin, which contains the score to increment rate limit counter with.
  - `ref`: string — The reference of the rule (the rule's ID by default).
  - `version`: string **required** — The version of the rule.
  - `action`: string enum: `block`
  - `action_parameters`: object
    - `response`: object — The response to show when the block is applied.
  - `description`: string

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## GET /zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions

List a zone entry point ruleset's versions

operationId: `listZoneEntrypointRulesetVersions`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## GET /zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}

Get a zone entry point ruleset version

operationId: `getZoneEntrypointRulesetVersion`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object
