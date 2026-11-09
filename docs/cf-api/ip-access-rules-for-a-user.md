# IP Access rules for a user

5 endpoints.

## GET /user/firewall/access_rules/rules

List IP Access rules

operationId: `ip-access-rules-for-a-user-list-ip-access-rules` · query: `mode`, `configuration.target`, `configuration.value`, `notes`, `match`, `page`, `per_page`, `order`, `direction`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /user/firewall/access_rules/rules

Create an IP Access rule

operationId: `ip-access-rules-for-a-user-create-an-ip-access-rule`

**Request** (application/json)

- `configuration`: object **required** — The rule configuration.
- `mode`: any **required**
- `notes`: any default: ``

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /user/firewall/access_rules/rules/{rule_id}

Delete an IP Access rule

operationId: `ip-access-rules-for-a-user-delete-an-ip-access-rule`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /user/firewall/access_rules/rules/{rule_id}

Get an IP Access rule

operationId: `ip-access-rules-for-a-user-get-an-ip-access-rule`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /user/firewall/access_rules/rules/{rule_id}

Update an IP Access rule

operationId: `ip-access-rules-for-a-user-update-an-ip-access-rule`

**Request** (application/json)

- `mode`: any
- `notes`: string — An informative summary of the rule, typically used as a reminder or explanation.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
