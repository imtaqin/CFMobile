# AI Security for Apps

4 endpoints.

## GET /zones/{zone_id}/ai-security/custom-topics

Get the AI Security for Apps custom topics of a zone.

operationId: `ai-security-custom-topics-get`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/ai-security/custom-topics

Update the AI Security for Apps custom topics of a zone.

operationId: `ai-security-custom-topics-put`

**Request** (application/json)

- `topics`: object[] — Custom topic categories for AI Security for Apps content detection.
  [array of]
  - `label`: string **required** — Unique label identifier. Must contain only lowercase letters (a–z), digits (0–9), and hyphens.
  - `topic`: string **required** — Description of the topic category. Must contain 2–50 UTF-8 bytes. Text in any language is supported, including spaces, numbers, punctuation,

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/ai-security/settings

Get the AI Security for Apps status for a zone.

operationId: `ai-security-settings-get`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/ai-security/settings

Update the AI Security for Apps status for a zone.

operationId: `ai-security-settings-put`

**Request** (application/json)

- `enabled`: boolean — Whether AI Security for Apps is enabled on the zone.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
