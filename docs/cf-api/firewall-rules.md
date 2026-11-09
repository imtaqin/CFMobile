# Firewall rules

9 endpoints.

## DELETE /zones/{zone_id}/firewall/rules

Delete firewall rules

operationId: `firewall-rules-delete-firewall-rules`

**Request** (application/json)

- `id`: string **required** — The unique identifier of the firewall rule.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/firewall/rules

List firewall rules

operationId: `firewall-rules-list-firewall-rules` · query: `description`, `action`, `page`, `per_page`, `id`, `paused`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /zones/{zone_id}/firewall/rules

Update priority of firewall rules

operationId: `firewall-rules-update-priority-of-firewall-rules`

**Request** (application/json)

- `id`: string **required** — The unique identifier of the firewall rule.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/firewall/rules

Create firewall rules

operationId: `firewall-rules-create-firewall-rules`

**Request** (application/json)

- `action`: object **required** — The action to perform when the threshold of matched traffic within the configured period is exceeded.
- `filter`: object **required**
  - `description`: string — An informative summary of the filter.
  - `expression`: string — The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressi
  - `id`: string — The unique identifier of the filter.
  - `paused`: boolean — When true, indicates that the filter is currently paused.
  - `ref`: string — A short reference tag. Allows you to select related filters.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/firewall/rules

Update firewall rules

operationId: `firewall-rules-update-firewall-rules`

**Request** (application/json)

- `id`: string **required** — The unique identifier of the firewall rule.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /zones/{zone_id}/firewall/rules/{rule_id}

Delete a firewall rule

operationId: `firewall-rules-delete-a-firewall-rule`

**Request** (application/json)

- `delete_filter_if_unused`: boolean — When true, indicates that Cloudflare should also delete the associated filter if there are no other firewall rules referencing the filter.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/firewall/rules/{rule_id}

Get a firewall rule

operationId: `firewall-rules-get-a-firewall-rule` · query: `id`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /zones/{zone_id}/firewall/rules/{rule_id}

Update priority of a firewall rule

operationId: `firewall-rules-update-priority-of-a-firewall-rule`

**Request** (application/json)

- `id`: string **required** — The unique identifier of the resource.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/firewall/rules/{rule_id}

Update a firewall rule

operationId: `firewall-rules-update-a-firewall-rule`

**Request** (application/json)

- `action`: object **required** — The action to perform when the threshold of matched traffic within the configured period is exceeded.
- `filter`: object **required**
  - `description`: string — An informative summary of the filter.
  - `expression`: string — The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressi
  - `id`: string — The unique identifier of the filter.
  - `paused`: boolean — When true, indicates that the filter is currently paused.
  - `ref`: string — A short reference tag. Allows you to select related filters.
- `id`: string **required** — The unique identifier of the resource.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
