# IP Access rules for a zone

4 endpoints.

## GET /zones/{zone_id}/firewall/access_rules/rules

List IP Access rules

operationId: `ip-access-rules-for-a-zone-list-ip-access-rules` · query: `mode`, `configuration.target`, `configuration.value`, `notes`, `match`, `page`, `per_page`, `order`, `direction`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/firewall/access_rules/rules

Create an IP Access rule

operationId: `ip-access-rules-for-a-zone-create-an-ip-access-rule`

**Request** (application/json)

- `configuration`: object **required** — The rule configuration.
- `mode`: any **required**
- `notes`: any default: ``

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /zones/{zone_id}/firewall/access_rules/rules/{rule_id}

Delete an IP Access rule

operationId: `ip-access-rules-for-a-zone-delete-an-ip-access-rule`

**Request** (application/json)

- `cascade`: string enum: `none`, `basic`, `aggressive` default: `none` — The level to attempt to delete similar rules defined for other zones with the same owner. The default value is `none`, which will only delet

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /zones/{zone_id}/firewall/access_rules/rules/{rule_id}

Update an IP Access rule

operationId: `ip-access-rules-for-a-zone-update-an-ip-access-rule`

**Request** (application/json)

- `mode`: any
- `notes`: string — An informative summary of the rule, typically used as a reminder or explanation.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
