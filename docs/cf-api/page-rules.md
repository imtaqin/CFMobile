# Page Rules

6 endpoints.

## GET /zones/{zone_id}/pagerules

List Page Rules

operationId: `page-rules-list-page-rules` · query: `order`, `direction`, `match`, `status`

**Response** 200 → `result`

[array of]
- `actions`: object[] **required** — The set of actions to perform if the targets of this rule match the
  [array of]
  - `id`: string enum: `always_use_https` — If enabled, any `http://`` URL is converted to `https://` through a
- `created_on`: string **required** — The timestamp of when the Page Rule was created.
- `id`: string **required** — Identifier.
- `modified_on`: string **required** — The timestamp of when the Page Rule was last modified.
- `priority`: integer **required** default: `1` — The priority of the rule, used to define which Page Rule is processed
- `status`: string **required** enum: `active`, `disabled` default: `disabled` — The status of the Page Rule.
- `targets`: object[] **required** — The rule targets to evaluate on each request.
  [array of]
  - `constraint`: object — The constraint of a target.
  - `target`: string enum: `url` — A target based on the URL of the request.

## POST /zones/{zone_id}/pagerules

Create a Page Rule

operationId: `page-rules-create-a-page-rule`

**Request** (application/json)

- `actions`: object[] **required** — The set of actions to perform if the targets of this rule match the
  [array of]
  - `id`: string enum: `always_use_https` — If enabled, any `http://`` URL is converted to `https://` through a
- `priority`: integer default: `1` — The priority of the rule, used to define which Page Rule is processed
- `status`: string enum: `active`, `disabled` default: `disabled` — The status of the Page Rule.
- `targets`: object[] **required** — The rule targets to evaluate on each request.
  [array of]
  - `constraint`: object — The constraint of a target.
  - `target`: string enum: `url` — A target based on the URL of the request.

**Response** 200 → `result`

- `actions`: object[] **required** — The set of actions to perform if the targets of this rule match the
  [array of]
  - `id`: string enum: `always_use_https` — If enabled, any `http://`` URL is converted to `https://` through a
- `created_on`: string **required** — The timestamp of when the Page Rule was created.
- `id`: string **required** — Identifier.
- `modified_on`: string **required** — The timestamp of when the Page Rule was last modified.
- `priority`: integer **required** default: `1` — The priority of the rule, used to define which Page Rule is processed
- `status`: string **required** enum: `active`, `disabled` default: `disabled` — The status of the Page Rule.
- `targets`: object[] **required** — The rule targets to evaluate on each request.
  [array of]
  - `constraint`: object — The constraint of a target.
  - `target`: string enum: `url` — A target based on the URL of the request.

## DELETE /zones/{zone_id}/pagerules/{pagerule_id}

Delete a Page Rule

operationId: `page-rules-delete-a-page-rule`

**Response** 200 → `result`

- `id`: string **required** — Identifier.

## GET /zones/{zone_id}/pagerules/{pagerule_id}

Get a Page Rule

operationId: `page-rules-get-a-page-rule`

**Response** 200 → `result`

- `actions`: object[] **required** — The set of actions to perform if the targets of this rule match the
  [array of]
  - `id`: string enum: `always_use_https` — If enabled, any `http://`` URL is converted to `https://` through a
- `created_on`: string **required** — The timestamp of when the Page Rule was created.
- `id`: string **required** — Identifier.
- `modified_on`: string **required** — The timestamp of when the Page Rule was last modified.
- `priority`: integer **required** default: `1` — The priority of the rule, used to define which Page Rule is processed
- `status`: string **required** enum: `active`, `disabled` default: `disabled` — The status of the Page Rule.
- `targets`: object[] **required** — The rule targets to evaluate on each request.
  [array of]
  - `constraint`: object — The constraint of a target.
  - `target`: string enum: `url` — A target based on the URL of the request.

## PATCH /zones/{zone_id}/pagerules/{pagerule_id}

Edit a Page Rule

operationId: `page-rules-edit-a-page-rule`

**Request** (application/json)

- `actions`: object[] — The set of actions to perform if the targets of this rule match the
  [array of]
  - `id`: string enum: `always_use_https` — If enabled, any `http://`` URL is converted to `https://` through a
- `priority`: integer default: `1` — The priority of the rule, used to define which Page Rule is processed
- `status`: string enum: `active`, `disabled` default: `disabled` — The status of the Page Rule.
- `targets`: object[] — The rule targets to evaluate on each request.
  [array of]
  - `constraint`: object — The constraint of a target.
  - `target`: string enum: `url` — A target based on the URL of the request.

**Response** 200 → `result`

- `actions`: object[] **required** — The set of actions to perform if the targets of this rule match the
  [array of]
  - `id`: string enum: `always_use_https` — If enabled, any `http://`` URL is converted to `https://` through a
- `created_on`: string **required** — The timestamp of when the Page Rule was created.
- `id`: string **required** — Identifier.
- `modified_on`: string **required** — The timestamp of when the Page Rule was last modified.
- `priority`: integer **required** default: `1` — The priority of the rule, used to define which Page Rule is processed
- `status`: string **required** enum: `active`, `disabled` default: `disabled` — The status of the Page Rule.
- `targets`: object[] **required** — The rule targets to evaluate on each request.
  [array of]
  - `constraint`: object — The constraint of a target.
  - `target`: string enum: `url` — A target based on the URL of the request.

## PUT /zones/{zone_id}/pagerules/{pagerule_id}

Update a Page Rule

operationId: `page-rules-update-a-page-rule`

**Request** (application/json)

- `actions`: object[] **required** — The set of actions to perform if the targets of this rule match the
  [array of]
  - `id`: string enum: `always_use_https` — If enabled, any `http://`` URL is converted to `https://` through a
- `priority`: integer default: `1` — The priority of the rule, used to define which Page Rule is processed
- `status`: string enum: `active`, `disabled` default: `disabled` — The status of the Page Rule.
- `targets`: object[] **required** — The rule targets to evaluate on each request.
  [array of]
  - `constraint`: object — The constraint of a target.
  - `target`: string enum: `url` — A target based on the URL of the request.

**Response** 200 → `result`

- `actions`: object[] **required** — The set of actions to perform if the targets of this rule match the
  [array of]
  - `id`: string enum: `always_use_https` — If enabled, any `http://`` URL is converted to `https://` through a
- `created_on`: string **required** — The timestamp of when the Page Rule was created.
- `id`: string **required** — Identifier.
- `modified_on`: string **required** — The timestamp of when the Page Rule was last modified.
- `priority`: integer **required** default: `1` — The priority of the rule, used to define which Page Rule is processed
- `status`: string **required** enum: `active`, `disabled` default: `disabled` — The status of the Page Rule.
- `targets`: object[] **required** — The rule targets to evaluate on each request.
  [array of]
  - `constraint`: object — The constraint of a target.
  - `target`: string enum: `url` — A target based on the URL of the request.
