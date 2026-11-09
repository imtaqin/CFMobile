# DLP Entries

7 endpoints.

## GET /accounts/{account_id}/dlp/entries

List all entries

operationId: `dlp-entries-list-all-entries`

**Response** 200 → `result`

[array of]
(one of 7 variants; showing the first)
- `created_at`: string **required**
- `description`: string
- `enabled`: boolean **required**
- `id`: string **required**
- `name`: string **required**
- `pattern`: object **required**
  - `regex`: string **required**
  - `validation`: any
- `profile_id`: string
- `updated_at`: string **required**
- `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
  [array]
- `type`: string **required** enum: `custom`
- `upload_status`: any

## POST /accounts/{account_id}/dlp/entries

Create custom entry

operationId: `dlp-entries-create-entry`

**Request** (application/json)

- `description`: string
- `enabled`: boolean **required**
- `name`: string **required**
- `pattern`: object **required**
  - `regex`: string **required**
  - `validation`: any
- `profile_id`: string
- `validator_ids`: string[] — Validators the new entry should reference, by id, at most 10.
  [array]

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string
- `enabled`: boolean **required**
- `id`: string **required**
- `name`: string **required**
- `pattern`: object **required**
  - `regex`: string **required**
  - `validation`: any
- `profile_id`: string
- `updated_at`: string **required**
- `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
  [array]

## DELETE /accounts/{account_id}/dlp/entries/{entry_id}

Delete custom entry

operationId: `dlp-entries-delete-entry`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/dlp/entries/{entry_id}

Get DLP Entry

operationId: `dlp-entries-get-dlp-entry`

**Response** 200 → `result`

(one of 7 variants; showing the first)
- `created_at`: string **required**
- `description`: string
- `enabled`: boolean **required**
- `id`: string **required**
- `name`: string **required**
- `pattern`: object **required**
  - `regex`: string **required**
  - `validation`: any
- `profile_id`: string
- `updated_at`: string **required**
- `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
  [array]
- `type`: string **required** enum: `custom`
- `upload_status`: any
- `profiles`: object[] **required**
  [array of]
  - `id`: string **required**
  - `name`: string **required**

## PUT /accounts/{account_id}/dlp/entries/{entry_id}

Update entry

operationId: `dlp-entries-update-entry`

**Request** (application/json)

(one of 3 variants; showing the first)
- `description`: string
- `name`: string **required**
- `pattern`: object **required**
  - `regex`: string **required**
  - `validation`: any
- `type`: string **required** enum: `custom`
- `validator_ids`: string[] — Validators this entry should reference, by id, at most 10. Replaces the current set.
  [array]
- `enabled`: boolean **required**

**Response** 200 → `result`

(one of 7 variants; showing the first)
- `created_at`: string **required**
- `description`: string
- `enabled`: boolean **required**
- `id`: string **required**
- `name`: string **required**
- `pattern`: object **required**
  - `regex`: string **required**
  - `validation`: any
- `profile_id`: string
- `updated_at`: string **required**
- `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
  [array]
- `type`: string **required** enum: `custom`

## PUT /accounts/{account_id}/dlp/entries/custom/{entry_id}

Update custom entry

operationId: `dlp-entries-update-custom-entry`

**Request** (application/json)

- `description`: string
- `name`: string **required**
- `pattern`: object **required**
  - `regex`: string **required**
  - `validation`: any
- `validator_ids`: string[] — Validators this entry should reference, by id, at most 10. Replaces the current set.
  [array]
- `enabled`: boolean **required**

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string
- `enabled`: boolean **required**
- `id`: string **required**
- `name`: string **required**
- `pattern`: object **required**
  - `regex`: string **required**
  - `validation`: any
- `profile_id`: string
- `updated_at`: string **required**
- `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
  [array]

## PUT /accounts/{account_id}/dlp/entries/predefined/{entry_id}

Update predefined entry

operationId: `dlp-entries-update-predefined-entry`

**Request** (application/json)

- `enabled`: boolean **required**

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
