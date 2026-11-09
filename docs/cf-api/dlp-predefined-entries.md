# DLP Predefined Entries

2 endpoints.

## POST /accounts/{account_id}/dlp/entries/predefined

Create predefined entry

operationId: `dlp-entries-create-predefined-entry`

**Request** (application/json)

- `enabled`: boolean **required**
- `entry_id`: string **required**
- `profile_id`: string — This field is not used as the owning profile.

**Response** 200 → `result`

- `confidence`: object **required**
  - `ai_context_available`: boolean **required** — Indicates whether this entry has AI remote service validation.
  - `available`: boolean **required** — Indicates whether this entry has any form of validation that is not an AI remote service.
- `deprecated`: boolean — Whether this entry is deprecated for new use. This is computed from the static catalog and
- `enabled`: boolean **required**
- `id`: string **required**
- `name`: string **required**
- `profile_id`: string
- `variant`: any

## DELETE /accounts/{account_id}/dlp/entries/predefined/{entry_id}

Delete predefined entry

operationId: `dlp-entries-delete-predefined-entry`

**Response** 200 → `result`

object
