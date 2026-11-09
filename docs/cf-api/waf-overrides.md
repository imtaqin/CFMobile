# WAF overrides

5 endpoints.

## GET /zones/{zone_id}/firewall/waf/overrides

List WAF overrides

operationId: `waf-overrides-list-waf-overrides` · query: `page`, `per_page`

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`

## POST /zones/{zone_id}/firewall/waf/overrides

Create a WAF override

operationId: `waf-overrides-create-a-waf-override`

**Request** (application/json)

- `urls`: string[] **required** — The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can onl
  [array]

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`

## DELETE /zones/{zone_id}/firewall/waf/overrides/{overrides_id}

Delete a WAF override

operationId: `waf-overrides-delete-a-waf-override`

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`

## GET /zones/{zone_id}/firewall/waf/overrides/{overrides_id}

Get a WAF override

operationId: `waf-overrides-get-a-waf-override`

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`

## PUT /zones/{zone_id}/firewall/waf/overrides/{overrides_id}

Update WAF override

operationId: `waf-overrides-update-waf-override`

**Request** (application/json)

- `id`: string **required** — Defines an identifier.
- `rewrite_action`: object **required** — Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.
  - `block`: any enum: `challenge`, `block`, `simulate`, `disable`, `default` — The WAF rule action to apply.
  - `challenge`: any enum: `challenge`, `block`, `simulate`, `disable`, `default` — The WAF rule action to apply.
  - `default`: any enum: `challenge`, `block`, `simulate`, `disable`, `default` — The WAF rule action to apply.
  - `disable`: any enum: `challenge`, `block`, `simulate`, `disable`, `default` — The WAF rule action to apply.
  - `simulate`: any enum: `challenge`, `block`, `simulate`, `disable`, `default` — The WAF rule action to apply.
- `rules`: object **required** — An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value
- `urls`: string[] **required** — The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can onl
  [array]

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`
