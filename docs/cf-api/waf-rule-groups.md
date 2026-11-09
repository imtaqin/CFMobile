# WAF rule groups

3 endpoints.

## GET /zones/{zone_id}/firewall/waf/packages/{package_id}/groups

List WAF rule groups

operationId: `waf-rule-groups-list-waf-rule-groups` · query: `mode`, `page`, `per_page`, `order`, `direction`, `match`, `name`, `rules_count`

**Response** 200 → `result`

[array of]
- `description`: string — Defines an informative summary of what the rule group does.
- `id`: string — Defines the unique identifier of the rule group.
- `modified_rules_count`: number default: `0` — Defines the number of rules within the group that have been modified from their default configuration.
- `name`: string — Defines the name of the rule group.
- `package_id`: string — Defines the unique identifier of a WAF package.
- `rules_count`: number default: `0` — Defines the number of rules in the current rule group.
- `allowed_modes`: string[] — Defines the available states for the rule group.
  [array]
- `mode`: string enum: `on`, `off` default: `on` — Defines the state of the rules contained in the rule group. When `on`, the rules in the group are configurable/usable.

## GET /zones/{zone_id}/firewall/waf/packages/{package_id}/groups/{group_id}

Get a WAF rule group

operationId: `waf-rule-groups-get-a-waf-rule-group`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PATCH /zones/{zone_id}/firewall/waf/packages/{package_id}/groups/{group_id}

Update a WAF rule group

operationId: `waf-rule-groups-update-a-waf-rule-group`

**Request** (application/json)

- `mode`: any

**Response** 200 → `result`

(one of 2 variants; showing the first)
object
