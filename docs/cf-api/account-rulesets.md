# Account Rulesets

16 endpoints.

## GET /accounts/{account_id}/rulesets

List account rulesets

operationId: `listAccountRulesets` · query: `cursor`, `per_page`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## POST /accounts/{account_id}/rulesets

Create an account ruleset

operationId: `createAccountRuleset` · query: `dry_run`

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

## DELETE /accounts/{account_id}/rulesets/{ruleset_id}

Delete an account ruleset

operationId: `deleteAccountRuleset` · query: `dry_run`

## GET /accounts/{account_id}/rulesets/{ruleset_id}

Get an account ruleset

operationId: `getAccountRuleset`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## PUT /accounts/{account_id}/rulesets/{ruleset_id}

Update an account ruleset

operationId: `updateAccountRuleset` · query: `dry_run`

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

## POST /accounts/{account_id}/rulesets/{ruleset_id}/rules

Create an account ruleset rule

operationId: `createAccountRulesetRule` · query: `dry_run`

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

## DELETE /accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id}

Delete an account ruleset rule

operationId: `deleteAccountRulesetRule` · query: `dry_run`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## PATCH /accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id}

Update an account ruleset rule

operationId: `updateAccountRulesetRule` · query: `dry_run`

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

## GET /accounts/{account_id}/rulesets/{ruleset_id}/versions

List an account ruleset's versions

operationId: `listAccountRulesetVersions`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## DELETE /accounts/{account_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

Delete an account ruleset version

operationId: `deleteAccountRulesetVersion` · query: `dry_run`

## GET /accounts/{account_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

Get an account ruleset version

operationId: `getAccountRulesetVersion`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## GET /accounts/{account_id}/rulesets/{ruleset_id}/versions/{ruleset_version}/by_tag/{rule_tag}

List an account ruleset version's rules by tag

operationId: `listAccountRulesetVersionRulesByTag`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## GET /accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint

Get an account entry point ruleset

operationId: `getAccountEntrypointRuleset`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## PUT /accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint

Update an account entry point ruleset

operationId: `updateAccountEntrypointRuleset` · query: `dry_run`

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

## GET /accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions

List an account entry point ruleset's versions

operationId: `listAccountEntrypointRulesetVersions`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## GET /accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}

Get an account entry point ruleset version

operationId: `getAccountEntrypointRulesetVersion`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object
