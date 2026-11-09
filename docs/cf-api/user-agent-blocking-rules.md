# User Agent Blocking rules

5 endpoints.

## GET /zones/{zone_id}/firewall/ua_rules

List User Agent Blocking rules

operationId: `user-agent-blocking-rules-list-user-agent-blocking-rules` · query: `page`, `description`, `per_page`, `user_agent`, `paused`

**Response** 200 → `result`

[array of]
- `configuration`: object — The configuration object for the current rule.
  - `target`: string — The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.
  - `value`: string — The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.
- `description`: string — An informative summary of the rule.
- `id`: string — The unique identifier of the User Agent Blocking rule.
- `mode`: any enum: `block`, `challenge`, `js_challenge`, `managed_challenge` — The action to apply to a matched request.
- `paused`: boolean — When true, indicates that the rule is currently paused.

## POST /zones/{zone_id}/firewall/ua_rules

Create a User Agent Blocking rule

operationId: `user-agent-blocking-rules-create-a-user-agent-blocking-rule`

**Request** (application/json)

- `configuration`: object **required**
  - `target`: string enum: `ua` — The configuration target. You must set the target to `ua` when specifying a user agent in the rule.
  - `value`: string — the user agent to exactly match
- `description`: string — An informative summary of the rule. This value is sanitized and any tags will be removed.
- `mode`: any **required**
- `paused`: boolean — When true, indicates that the rule is currently paused.

**Response** 200 → `result`

- `configuration`: object — The configuration object for the current rule.
  - `target`: string — The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.
  - `value`: string — The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.
- `description`: string — An informative summary of the rule.
- `id`: string — The unique identifier of the User Agent Blocking rule.
- `mode`: any enum: `block`, `challenge`, `js_challenge`, `managed_challenge` — The action to apply to a matched request.
- `paused`: boolean — When true, indicates that the rule is currently paused.

## DELETE /zones/{zone_id}/firewall/ua_rules/{ua_rule_id}

Delete a User Agent Blocking rule

operationId: `user-agent-blocking-rules-delete-a-user-agent-blocking-rule`

**Response** 200 → `result`

- `id`: string — The unique identifier of the User Agent Blocking rule.

## GET /zones/{zone_id}/firewall/ua_rules/{ua_rule_id}

Get a User Agent Blocking rule

operationId: `user-agent-blocking-rules-get-a-user-agent-blocking-rule`

**Response** 200 → `result`

- `configuration`: object — The configuration object for the current rule.
  - `target`: string — The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.
  - `value`: string — The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.
- `description`: string — An informative summary of the rule.
- `id`: string — The unique identifier of the User Agent Blocking rule.
- `mode`: any enum: `block`, `challenge`, `js_challenge`, `managed_challenge` — The action to apply to a matched request.
- `paused`: boolean — When true, indicates that the rule is currently paused.

## PUT /zones/{zone_id}/firewall/ua_rules/{ua_rule_id}

Update a User Agent Blocking rule

operationId: `user-agent-blocking-rules-update-a-user-agent-blocking-rule`

**Request** (application/json)

- `configuration`: object **required** — The rule configuration.
- `description`: string — An informative summary of the rule. This value is sanitized and any tags will be removed.
- `id`: string **required** — The unique identifier of the resource.
- `mode`: any **required**
- `paused`: boolean — When true, indicates that the rule is currently paused.

**Response** 200 → `result`

- `configuration`: object — The configuration object for the current rule.
  - `target`: string — The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.
  - `value`: string — The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.
- `description`: string — An informative summary of the rule.
- `id`: string — The unique identifier of the User Agent Blocking rule.
- `mode`: any enum: `block`, `challenge`, `js_challenge`, `managed_challenge` — The action to apply to a matched request.
- `paused`: boolean — When true, indicates that the rule is currently paused.
