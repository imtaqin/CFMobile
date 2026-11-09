# Changelog

1 endpoints.

## GET /accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}/changelog

List flag changelog entries

operationId: `flagship_get_flag_changelog` · query: `limit`, `cursor`

**Response** 200 → `result`

[array of]
(one of 3 variants; showing the first)
- `after`: object **required**
  - `default_variation`: string **required** — Variation the API serves when the flag is off, or when it's on but no rule matches the context. Must be a key in `variations`.
  - `description`: string — Optional operator-facing description. It does not affect flag evaluation.
  - `enabled`: boolean **required** — When false, the flag bypasses all rules and always serves `default_variation`.
  - `key`: string **required** — Unique identifier for the flag within an app. Used in all evaluation and SDK calls.
  - `metadata`: object — Key-value metadata associated with the flag. Returned only when the flag has metadata.
  - `rules`: object[] **required** — Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variat
    [array of]
    - `conditions`: object[] **required** — Conditions the context must satisfy for this rule to match. An empty array matches all contexts.
    - `priority`: integer **required** — Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag's rules.
    - `rollout`: object
    - `serve_variation`: string **required** — Variation the API serves when this rule matches. Must be a key in `variations`.
  - `type`: string **required** enum: `boolean`, `string`, `number`, `json` — Server-inferred value type shared by all of the flag's variations.
  - `updated_at`: string
  - `updated_by`: string
  - `variations`: object **required** — Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value st
- `event`: string **required** enum: `create`
- `flag_key`: string **required**
