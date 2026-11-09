# Evaluation

2 endpoints.

## GET /accounts/{account_id}/flagship/apps/{app_id}/evaluate

Evaluate flag from query context

operationId: `flagship_evaluate_flag` · query: `flagKey`, `targetingKey`

**Response** 200 → `result`

- `flagKey`: string **required** — Key of the evaluated flag.
- `metadata`: object — Key-value metadata associated with the flag. Returned only when the flag has metadata.
- `reason`: string **required** enum: `STATIC`, `TARGETING_MATCH`, `DEFAULT`, `DISABLED`, `SPLIT` — Reason the evaluator selected this variation.
- `value`: any
- `variant`: string **required** — Name of the variation that supplied the resolved value.

## POST /accounts/{account_id}/flagship/apps/{app_id}/evaluate

Evaluate flag with JSON context

operationId: `flagship_evaluate_flag_post`

**Request** (application/json)

- `context`: object default: `[object Object]` — Evaluation attributes keyed by name. Values may be any JSON value; the context supports up to 100 entries, nesting depth of 10, 10,000 value
- `flagKey`: string **required** — Key of the flag to evaluate within the app.

**Response** 200 → `result`

- `flagKey`: string **required** — Key of the evaluated flag.
- `metadata`: object — Key-value metadata associated with the flag. Returned only when the flag has metadata.
- `reason`: string **required** enum: `STATIC`, `TARGETING_MATCH`, `DEFAULT`, `DISABLED`, `SPLIT` — Reason the evaluator selected this variation.
- `value`: any
- `variant`: string **required** — Name of the variation that supplied the resolved value.
