# Communication Preferences

2 endpoints.

## GET /user/communication_preferences

Get communication preferences

operationId: `user-communication-preferences-get`

**Response** 200 → `result`

- `created_on`: string **required** — Timestamp of the most recently created preference.
- `email`: object **required** — Email verification status for the user.
  - `hard_bounce`: boolean — True when delivery attempts to this email address fail permanently.
  - `verified`: boolean — True when the user verifies their email address.
- `language-locale`: string **required** enum: `en-US`, `es-ES`, `de-DE`, `fr-FR`, `it-IT`, `ja-JP`, `ko-KR`, `pt-BR` — The user's preferred language locale for communications.
- `preferences`: object **required** — Preference keys mapped to subscription states. Keys use human-readable slugs (e.g. "product_news", "marketing").
- `updated_on`: string **required** — Timestamp of the most recently updated preference.

## PUT /user/communication_preferences

Update communication preferences

operationId: `user-communication-preferences-update`

**Request** (application/json)

- `language-locale`: string enum: `en-US`, `es-ES`, `de-DE`, `fr-FR`, `it-IT`, `ja-JP`, `ko-KR`, `pt-BR` — The user's preferred language locale for communications. If omitted, the language locale does not change.
- `preferences`: object — Preference keys mapped to subscription states to update. Only the preferences in this map change; others remain unchanged.

**Response** 200 → `result`

- `created_on`: string **required** — Timestamp of the most recently created preference.
- `email`: object **required** — Email verification status for the user.
  - `hard_bounce`: boolean — True when delivery attempts to this email address fail permanently.
  - `verified`: boolean — True when the user verifies their email address.
- `language-locale`: string **required** enum: `en-US`, `es-ES`, `de-DE`, `fr-FR`, `it-IT`, `ja-JP`, `ko-KR`, `pt-BR` — The user's preferred language locale for communications.
- `preferences`: object **required** — Preference keys mapped to subscription states. Keys use human-readable slugs (e.g. "product_news", "marketing").
- `updated_on`: string **required** — Timestamp of the most recently updated preference.
