# Email Routing routing rules

9 endpoints.

## GET /accounts/{account_id}/email/routing/rules

List account routing rules

operationId: `email-routing-routing-rules-list-account-routing-rules` · query: `page`, `per_page`, `enabled`

**Response** 200 → `result`

[array of]
- `actions`: object[] — List actions patterns.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of supported action.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `id`: string — Routing rule identifier.
- `matchers`: object[] — Matching patterns to forward to your actions.
  [array of]
  - `field`: string enum: `to` — Field for type matcher.
  - `type`: string **required** enum: `all`, `literal` — Type of matcher.
  - `value`: string — Value for matcher.
- `name`: string — Routing rule name.
- `priority`: number default: `0` — Priority of the routing rule.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;
- `tag`: string — Routing rule tag. (Deprecated, replaced by routing rule identifier)
- `zone`: object — Zone information for the routing rule.
  - `name`: string — Zone name.
  - `tag`: string — Zone tag.

## POST /accounts/{account_id}/email/routing/rules/plan

Plan account routing rule changes

operationId: `email-routing-routing-rules-plan-account-routing-rules`

**Request** (application/json)

- `catch_all_rules`: object[] — Desired catch-all Email Routing rules managed by the deploying Worker.
  [array of]
  - `rule`: object **required**
    - `actions`: object[] **required** — List actions for the catch-all routing rule.
    - `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
    - `matchers`: object[] **required** — List of matchers for the catch-all routing rule.
  - `target`: string **required** — Catch-all target to plan for, using the `*@domain` shape.
- `owner_worker_tag`: string **required** — Public tag (script_tag) of the Worker that owns this rule. Required when
- `rules`: object[] — Desired normal Email Routing rules managed by the deploying Worker.
  [array of]
  - `actions`: object[] **required** — List actions patterns.
    [array of]
    - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of supported action.
    - `value`: string[] — List of values for the action. Currently limited to a single value.
  - `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
  - `matchers`: object[] **required** — Matching patterns to forward to your actions.
    [array of]
    - `field`: string enum: `to` — Field for type matcher.
    - `type`: string **required** enum: `all`, `literal` — Type of matcher.
    - `value`: string — Value for matcher.

**Response** 200 → `result`

- `zones`: object[] — Per-zone diff between the desired rules and the account's current Email Routing rules.
  [array of]
  - `changes`: object[] — Rule changes planned for this zone.
    [array of]
    - `remote`: object
    - `target`: string — Canonical recipient address or catch-all target.
    - `type`: string enum: `added`, `updated`, `deleted`, `conflict` — Planned change type.
  - `zone_id`: string — Identifier.
  - `zone_name`: string — Zone name.

## GET /zones/{zone_id}/email/routing/rules

List routing rules

operationId: `email-routing-routing-rules-list-routing-rules` · query: `page`, `per_page`, `enabled`

**Response** 200 → `result`

[array of]
- `actions`: object[] — List actions patterns.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of supported action.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `id`: string — Routing rule identifier.
- `matchers`: object[] — Matching patterns to forward to your actions.
  [array of]
  - `field`: string enum: `to` — Field for type matcher.
  - `type`: string **required** enum: `all`, `literal` — Type of matcher.
  - `value`: string — Value for matcher.
- `name`: string — Routing rule name.
- `priority`: number default: `0` — Priority of the routing rule.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;
- `tag`: string — Routing rule tag. (Deprecated, replaced by routing rule identifier)

## POST /zones/{zone_id}/email/routing/rules

Create routing rule

operationId: `email-routing-routing-rules-create-routing-rule`

**Request** (application/json)

- `actions`: object[] **required** — List actions patterns.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of supported action.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `matchers`: object[] **required** — Matching patterns to forward to your actions.
  [array of]
  - `field`: string enum: `to` — Field for type matcher.
  - `type`: string **required** enum: `all`, `literal` — Type of matcher.
  - `value`: string — Value for matcher.
- `name`: string — Routing rule name.
- `owner_worker_tag`: string — Public tag (script_tag) of the Worker that owns this rule. Required when
- `priority`: number default: `0` — Priority of the routing rule.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;

**Response** 200 → `result`

- `actions`: object[] — List actions patterns.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of supported action.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `id`: string — Routing rule identifier.
- `matchers`: object[] — Matching patterns to forward to your actions.
  [array of]
  - `field`: string enum: `to` — Field for type matcher.
  - `type`: string **required** enum: `all`, `literal` — Type of matcher.
  - `value`: string — Value for matcher.
- `name`: string — Routing rule name.
- `priority`: number default: `0` — Priority of the routing rule.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;
- `tag`: string — Routing rule tag. (Deprecated, replaced by routing rule identifier)

## DELETE /zones/{zone_id}/email/routing/rules/{rule_identifier}

Delete routing rule

operationId: `email-routing-routing-rules-delete-routing-rule`

**Response** 200 → `result`

- `actions`: object[] — List actions patterns.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of supported action.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `id`: string — Routing rule identifier.
- `matchers`: object[] — Matching patterns to forward to your actions.
  [array of]
  - `field`: string enum: `to` — Field for type matcher.
  - `type`: string **required** enum: `all`, `literal` — Type of matcher.
  - `value`: string — Value for matcher.
- `name`: string — Routing rule name.
- `priority`: number default: `0` — Priority of the routing rule.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;
- `tag`: string — Routing rule tag. (Deprecated, replaced by routing rule identifier)

## GET /zones/{zone_id}/email/routing/rules/{rule_identifier}

Get routing rule

operationId: `email-routing-routing-rules-get-routing-rule`

**Response** 200 → `result`

- `actions`: object[] — List actions patterns.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of supported action.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `id`: string — Routing rule identifier.
- `matchers`: object[] — Matching patterns to forward to your actions.
  [array of]
  - `field`: string enum: `to` — Field for type matcher.
  - `type`: string **required** enum: `all`, `literal` — Type of matcher.
  - `value`: string — Value for matcher.
- `name`: string — Routing rule name.
- `priority`: number default: `0` — Priority of the routing rule.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;
- `tag`: string — Routing rule tag. (Deprecated, replaced by routing rule identifier)

## PUT /zones/{zone_id}/email/routing/rules/{rule_identifier}

Update routing rule

operationId: `email-routing-routing-rules-update-routing-rule`

**Request** (application/json)

- `actions`: object[] **required** — List actions patterns.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of supported action.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `matchers`: object[] **required** — Matching patterns to forward to your actions.
  [array of]
  - `field`: string enum: `to` — Field for type matcher.
  - `type`: string **required** enum: `all`, `literal` — Type of matcher.
  - `value`: string — Value for matcher.
- `name`: string — Routing rule name.
- `owner_worker_tag`: string — Public tag (script_tag) of the Worker that owns this rule. Required when
- `priority`: number default: `0` — Priority of the routing rule.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;

**Response** 200 → `result`

- `actions`: object[] — List actions patterns.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of supported action.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `id`: string — Routing rule identifier.
- `matchers`: object[] — Matching patterns to forward to your actions.
  [array of]
  - `field`: string enum: `to` — Field for type matcher.
  - `type`: string **required** enum: `all`, `literal` — Type of matcher.
  - `value`: string — Value for matcher.
- `name`: string — Routing rule name.
- `priority`: number default: `0` — Priority of the routing rule.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;
- `tag`: string — Routing rule tag. (Deprecated, replaced by routing rule identifier)

## GET /zones/{zone_id}/email/routing/rules/catch_all

Get catch-all rule

operationId: `email-routing-routing-rules-get-catch-all-rule`

**Response** 200 → `result`

- `actions`: object[] — List actions for the catch-all routing rule.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of action for catch-all rule.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `id`: string — Routing rule identifier.
- `matchers`: object[] — List of matchers for the catch-all routing rule.
  [array of]
  - `type`: string **required** enum: `all` — Type of matcher. Default is 'all'.
- `name`: string — Routing rule name.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;
- `tag`: string — Routing rule tag. (Deprecated, replaced by routing rule identifier)

## PUT /zones/{zone_id}/email/routing/rules/catch_all

Update catch-all rule

operationId: `email-routing-routing-rules-update-catch-all-rule`

**Request** (application/json)

- `actions`: object[] **required** — List actions for the catch-all routing rule.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of action for catch-all rule.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `matchers`: object[] **required** — List of matchers for the catch-all routing rule.
  [array of]
  - `type`: string **required** enum: `all` — Type of matcher. Default is 'all'.
- `name`: string — Routing rule name.
- `owner_worker_tag`: string — Public tag (script_tag) of the Worker that owns this rule. Required when
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;

**Response** 200 → `result`

- `actions`: object[] — List actions for the catch-all routing rule.
  [array of]
  - `type`: string **required** enum: `drop`, `forward`, `worker` — Type of action for catch-all rule.
  - `value`: string[] — List of values for the action. Currently limited to a single value.
    [array]
- `enabled`: boolean enum: `true`, `false` default: `true` — Routing rule status.
- `id`: string — Routing rule identifier.
- `matchers`: object[] — List of matchers for the catch-all routing rule.
  [array of]
  - `type`: string **required** enum: `all` — Type of matcher. Default is 'all'.
- `name`: string — Routing rule name.
- `source`: string enum: `api`, `wrangler` default: `api` — Who manages the rule. `api` covers dashboard, generic API, and Terraform;
- `tag`: string — Routing rule tag. (Deprecated, replaced by routing rule identifier)
