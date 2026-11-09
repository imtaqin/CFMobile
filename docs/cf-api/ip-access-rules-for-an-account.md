# IP Access rules for an account

5 endpoints.

## GET /accounts/{account_id}/firewall/access_rules/rules

List IP Access rules

operationId: `ip-access-rules-for-an-account-list-ip-access-rules` · query: `mode`, `configuration.target`, `configuration.value`, `notes`, `match`, `page`, `per_page`, `order`, `direction`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/firewall/access_rules/rules

Create an IP Access rule

operationId: `ip-access-rules-for-an-account-create-an-ip-access-rule`

**Request** (application/json)

- `configuration`: object **required** — The rule configuration.
- `mode`: any **required**
- `notes`: any default: ``

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/firewall/access_rules/rules/{rule_id}

Delete an IP Access rule

operationId: `ip-access-rules-for-an-account-delete-an-ip-access-rule`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/firewall/access_rules/rules/{rule_id}

Get an IP Access rule

operationId: `ip-access-rules-for-an-account-get-an-ip-access-rule`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/firewall/access_rules/rules/{rule_id}

Update an IP Access rule

operationId: `ip-access-rules-for-an-account-update-an-ip-access-rule`

**Request** (application/json)

- `allowed_modes`: string[] **required** — The available actions that a rule can apply to a matched request.
  [array]
- `configuration`: object **required** — The rule configuration.
- `created_on`: string — The timestamp of when the rule was created.
- `id`: string **required** — The unique identifier of the IP Access rule.
- `mode`: any **required**
- `modified_on`: string — The timestamp of when the rule was last modified.
- `notes`: string — An informative summary of the rule, typically used as a reminder or explanation.
- `scope`: object — All zones owned by the user will have the rule applied.
  - `email`: string — The contact email address of the user.
  - `id`: string — Defines an identifier.
  - `type`: string enum: `user`, `organization` — Defines the scope of the rule.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
