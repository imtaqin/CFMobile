# Flags

6 endpoints.

## GET /accounts/{account_id}/flagship/apps/{app_id}/flags

List flags

operationId: `flagship_list_flags` · query: `limit`, `cursor`

**Response** 200 → `result`

[array of]
- `default_variation`: string **required** — Variation the API serves when the flag is off, or when it's on but no rule matches the context. Must be a key in `variations`.
- `description`: string — Optional operator-facing description. It does not affect flag evaluation.
- `enabled`: boolean **required** — When false, the flag bypasses all rules and always serves `default_variation`.
- `key`: string **required** — Unique identifier for the flag within an app. Used in all evaluation and SDK calls.
- `metadata`: object — Key-value metadata associated with the flag. Returned only when the flag has metadata.
- `rules`: object[] **required** — Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variat
  [array of]
  - `conditions`: object[] **required** — Conditions the context must satisfy for this rule to match. An empty array matches all contexts.
    [array of]
    - `attribute`: string **required**
    - `operator`: string **required** enum: `equals`, `not_equals`, `greater_than`, `less_than`, `greater_than_or_equals`, `less_than_or_equals`, `contains`, `starts_with`
    - `value`: any **required**
  - `priority`: integer **required** — Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag's rules.
  - `rollout`: object
    - `attribute`: string — Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.
    - `percentage`: number **required** — Percentage of matching traffic (0–100, up to 2 decimal places) served this variation. For multi-way splits, use cumulative upper bounds acro
  - `serve_variation`: string **required** — Variation the API serves when this rule matches. Must be a key in `variations`.
- `type`: string **required** enum: `boolean`, `string`, `number`, `json` — Server-inferred value type shared by all of the flag's variations.
- `updated_at`: string
- `updated_by`: string
- `variations`: object **required** — Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value st

## POST /accounts/{account_id}/flagship/apps/{app_id}/flags

Create flag

operationId: `flagship_create_flag`

**Request** (application/json)

- `default_variation`: string **required** — Variation the API serves when the flag is off, or when it's on but no rule matches the context. Must be a key in `variations`.
- `description`: string — Optional operator-facing description. It does not affect flag evaluation.
- `enabled`: boolean **required** — When false, the flag bypasses all rules and always serves `default_variation`.
- `key`: string **required** — Unique identifier for the flag within an app. Used in all evaluation and SDK calls.
- `metadata`: object — Key-value metadata associated with the flag. `null` or an empty object clears existing metadata; omission semantics depend on the endpoint (
- `rules`: object[] **required** — Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variat
  [array of]
  - `conditions`: object[] **required** — Conditions the context must satisfy for this rule to match. An empty array matches all contexts.
    [array of]
    - `attribute`: string **required**
    - `operator`: string **required** enum: `equals`, `not_equals`, `greater_than`, `less_than`, `greater_than_or_equals`, `less_than_or_equals`, `contains`, `starts_with`
    - `value`: any **required**
  - `priority`: integer **required** — Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag's rules.
  - `rollout`: object
    - `attribute`: string — Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.
    - `percentage`: number **required** — Percentage of matching traffic (0–100, up to 2 decimal places) served this variation. For multi-way splits, use cumulative upper bounds acro
  - `serve_variation`: string **required** — Variation the API serves when this rule matches. Must be a key in `variations`.
- `type`: string enum: `boolean`, `string`, `number`, `json` — Deprecated compatibility field. Omit it; the API ignores this value and infers the type from the flag's variations.
- `variations`: object **required** — Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value st

**Response** 201 → `result`

- `default_variation`: string **required** — Variation the API serves when the flag is off, or when it's on but no rule matches the context. Must be a key in `variations`.
- `description`: string — Optional operator-facing description. It does not affect flag evaluation.
- `enabled`: boolean **required** — When false, the flag bypasses all rules and always serves `default_variation`.
- `key`: string **required** — Unique identifier for the flag within an app. Used in all evaluation and SDK calls.
- `metadata`: object — Key-value metadata associated with the flag. Returned only when the flag has metadata.
- `rules`: object[] **required** — Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variat
  [array of]
  - `conditions`: object[] **required** — Conditions the context must satisfy for this rule to match. An empty array matches all contexts.
    [array of]
    - `attribute`: string **required**
    - `operator`: string **required** enum: `equals`, `not_equals`, `greater_than`, `less_than`, `greater_than_or_equals`, `less_than_or_equals`, `contains`, `starts_with`
    - `value`: any **required**
  - `priority`: integer **required** — Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag's rules.
  - `rollout`: object
    - `attribute`: string — Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.
    - `percentage`: number **required** — Percentage of matching traffic (0–100, up to 2 decimal places) served this variation. For multi-way splits, use cumulative upper bounds acro
  - `serve_variation`: string **required** — Variation the API serves when this rule matches. Must be a key in `variations`.
- `type`: string **required** enum: `boolean`, `string`, `number`, `json` — Server-inferred value type shared by all of the flag's variations.
- `updated_at`: string
- `updated_by`: string
- `variations`: object **required** — Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value st

## DELETE /accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}

Delete flag

operationId: `flagship_delete_flag`

**Response** 200 → `result`

- `key`: string **required**

## GET /accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}

Get flag

operationId: `flagship_get_flag`

**Response** 200 → `result`

- `default_variation`: string **required** — Variation the API serves when the flag is off, or when it's on but no rule matches the context. Must be a key in `variations`.
- `description`: string — Optional operator-facing description. It does not affect flag evaluation.
- `enabled`: boolean **required** — When false, the flag bypasses all rules and always serves `default_variation`.
- `key`: string **required** — Unique identifier for the flag within an app. Used in all evaluation and SDK calls.
- `metadata`: object — Key-value metadata associated with the flag. Returned only when the flag has metadata.
- `rules`: object[] **required** — Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variat
  [array of]
  - `conditions`: object[] **required** — Conditions the context must satisfy for this rule to match. An empty array matches all contexts.
    [array of]
    - `attribute`: string **required**
    - `operator`: string **required** enum: `equals`, `not_equals`, `greater_than`, `less_than`, `greater_than_or_equals`, `less_than_or_equals`, `contains`, `starts_with`
    - `value`: any **required**
  - `priority`: integer **required** — Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag's rules.
  - `rollout`: object
    - `attribute`: string — Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.
    - `percentage`: number **required** — Percentage of matching traffic (0–100, up to 2 decimal places) served this variation. For multi-way splits, use cumulative upper bounds acro
  - `serve_variation`: string **required** — Variation the API serves when this rule matches. Must be a key in `variations`.
- `type`: string **required** enum: `boolean`, `string`, `number`, `json` — Server-inferred value type shared by all of the flag's variations.
- `updated_at`: string
- `updated_by`: string
- `variations`: object **required** — Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value st

## PATCH /accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}

Partially update flag

operationId: `flagship_patch_flag`

**Request** (application/json)

- `default_variation`: string — Variation the API serves when the flag is off, or when it's on but no rule matches the context. Must be a key in `variations`.
- `description`: string — Optional operator-facing description. It does not affect flag evaluation.
- `enabled`: boolean — When false, the flag bypasses all rules and always serves `default_variation`.
- `metadata`: object — Key-value metadata associated with the flag. `null` or an empty object clears existing metadata; omission semantics depend on the endpoint (

**Response** 200 → `result`

- `default_variation`: string **required** — Variation the API serves when the flag is off, or when it's on but no rule matches the context. Must be a key in `variations`.
- `description`: string — Optional operator-facing description. It does not affect flag evaluation.
- `enabled`: boolean **required** — When false, the flag bypasses all rules and always serves `default_variation`.
- `key`: string **required** — Unique identifier for the flag within an app. Used in all evaluation and SDK calls.
- `metadata`: object — Key-value metadata associated with the flag. Returned only when the flag has metadata.
- `rules`: object[] **required** — Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variat
  [array of]
  - `conditions`: object[] **required** — Conditions the context must satisfy for this rule to match. An empty array matches all contexts.
    [array of]
    - `attribute`: string **required**
    - `operator`: string **required** enum: `equals`, `not_equals`, `greater_than`, `less_than`, `greater_than_or_equals`, `less_than_or_equals`, `contains`, `starts_with`
    - `value`: any **required**
  - `priority`: integer **required** — Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag's rules.
  - `rollout`: object
    - `attribute`: string — Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.
    - `percentage`: number **required** — Percentage of matching traffic (0–100, up to 2 decimal places) served this variation. For multi-way splits, use cumulative upper bounds acro
  - `serve_variation`: string **required** — Variation the API serves when this rule matches. Must be a key in `variations`.
- `type`: string **required** enum: `boolean`, `string`, `number`, `json` — Server-inferred value type shared by all of the flag's variations.
- `updated_at`: string
- `updated_by`: string
- `variations`: object **required** — Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value st

## PUT /accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}

Update flag

operationId: `flagship_update_flag`

**Request** (application/json)

- `default_variation`: string **required** — Variation the API serves when the flag is off, or when it's on but no rule matches the context. Must be a key in `variations`.
- `description`: string — Optional operator-facing description. It does not affect flag evaluation.
- `enabled`: boolean **required** — When false, the flag bypasses all rules and always serves `default_variation`.
- `key`: string **required** — Unique identifier for the flag within an app. Used in all evaluation and SDK calls.
- `metadata`: object — Key-value metadata associated with the flag. `null` or an empty object clears existing metadata; omission semantics depend on the endpoint (
- `rules`: object[] **required** — Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variat
  [array of]
  - `conditions`: object[] **required** — Conditions the context must satisfy for this rule to match. An empty array matches all contexts.
    [array of]
    - `attribute`: string **required**
    - `operator`: string **required** enum: `equals`, `not_equals`, `greater_than`, `less_than`, `greater_than_or_equals`, `less_than_or_equals`, `contains`, `starts_with`
    - `value`: any **required**
  - `priority`: integer **required** — Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag's rules.
  - `rollout`: object
    - `attribute`: string — Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.
    - `percentage`: number **required** — Percentage of matching traffic (0–100, up to 2 decimal places) served this variation. For multi-way splits, use cumulative upper bounds acro
  - `serve_variation`: string **required** — Variation the API serves when this rule matches. Must be a key in `variations`.
- `type`: string enum: `boolean`, `string`, `number`, `json` — Deprecated compatibility field. Omit it; the API ignores this value and infers the type from the flag's variations.
- `variations`: object **required** — Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value st

**Response** 200 → `result`

- `default_variation`: string **required** — Variation the API serves when the flag is off, or when it's on but no rule matches the context. Must be a key in `variations`.
- `description`: string — Optional operator-facing description. It does not affect flag evaluation.
- `enabled`: boolean **required** — When false, the flag bypasses all rules and always serves `default_variation`.
- `key`: string **required** — Unique identifier for the flag within an app. Used in all evaluation and SDK calls.
- `metadata`: object — Key-value metadata associated with the flag. Returned only when the flag has metadata.
- `rules`: object[] **required** — Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variat
  [array of]
  - `conditions`: object[] **required** — Conditions the context must satisfy for this rule to match. An empty array matches all contexts.
    [array of]
    - `attribute`: string **required**
    - `operator`: string **required** enum: `equals`, `not_equals`, `greater_than`, `less_than`, `greater_than_or_equals`, `less_than_or_equals`, `contains`, `starts_with`
    - `value`: any **required**
  - `priority`: integer **required** — Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag's rules.
  - `rollout`: object
    - `attribute`: string — Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.
    - `percentage`: number **required** — Percentage of matching traffic (0–100, up to 2 decimal places) served this variation. For multi-way splits, use cumulative upper bounds acro
  - `serve_variation`: string **required** — Variation the API serves when this rule matches. Must be a key in `variations`.
- `type`: string **required** enum: `boolean`, `string`, `number`, `json` — Server-inferred value type shared by all of the flag's variations.
- `updated_at`: string
- `updated_by`: string
- `variations`: object **required** — Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value st
