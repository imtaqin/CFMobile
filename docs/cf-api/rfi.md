# RFI

4 endpoints.

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}

List RFIs

operationId: `get_RequestList` · query: `page`, `pageSize`, `status`, `search`, `createdBy`, `assignee`, `requestType`, `priority`, `tlp`, `id`, `readableId`, `summary`, `accountId`, `metadata`, `orderBy`, `order`

**Response** 200 → `result`

[array of]
- `accountId`: string **required** — Account ID
- `createdAt`: string **required** — ISO timestamp
- `createdBy`: string **required** — Creator email
- `description`: string **required** — RFI description
- `id`: string **required** — RFI UUID
- `priority_id`: integer — Raw stored Threat Intelligence priority. Values 64, 128, and 192 are authoritative; clients display null, 32, 255, and unsupported values as
- `projectType`: string **required** — Project type
- `status`: string **required** — RFI status
- `title`: string **required** — RFI title
- `updatedAt`: string **required** — ISO timestamp

## POST /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}

Creates a new RFI

operationId: `post_RequestCreate`

**Request** (application/json)

- `description`: string — RFI description (optional). Defaults to an empty string when omitted.
- `eventId`: string — Optional related event ID
- `metadata`: object — Optional metadata fields specific to the RFI type
- `priority`: string enum: `low`, `routine`, `high`, `urgent`, `unknown`, `medium`, `critical` — RFI priority. Four-level projects use `low`, `routine`, `high`, `urgent`; existing projects retain legacy `low`->routine compatibility. `med
- `request_type`: string — Optional request type for the request
- `subtypeId`: string — Optional subtype ID
- `title`: string — RFI title (optional). When omitted, the server generates a summary from the request type and readable ID.
- `tlp`: string enum: `clear`, `green`, `amber`, `amber-strict`, `red`, `purple`, `white`, `amber+strict` — Traffic Light Protocol level. Canonical values are `clear`, `green`, `amber`, `amber-strict`, `red`, `purple`. `white` and `amber+strict` ar

**Response** 201 → `result`

- `account`: object **required**
  - `anniversary`: string **required** — Account anniversary
  - `id`: string **required** — Account UUID
  - `name`: string **required** — Account name
- `assignee`: string **required** — Assignee email
- `completed`: string **required** — Completion timestamp
- `created`: string **required** — Creation timestamp
- `id`: string **required** — RFI UUID
- `investigation_id`: string **required** — Linked Casefiles case UUID. Null until an analyst links a case to the request.
- `is_free_request`: boolean **required** — Whether this is a free request
- `message_tokens`: number **required** — Total message tokens
- `priority`: string **required** enum: `unknown`, `low`, `routine`, `medium`, `high`, `urgent`, `critical` — Request priority
- `priority_id`: integer — Raw stored Threat Intelligence priority. Values 64, 128, and 192 are authoritative; clients display null, 32, 255, and unsupported values as
- `readable_id`: string **required** — Human-readable ID
- `release_entitlements`: string **required** — Release entitlements
- `report_id`: string **required** — Report UUID
- `request`: object **required**
  - `category`: string **required** — Request category
  - `message_tokens`: number **required** — Message tokens used
  - `name`: string **required** — Request type name
  - `request_tokens`: number **required** — Request tokens used
  - `response_tokens`: number **required** — Response tokens used
  - `result`: string **required** — Expected result type
  - `source`: string **required** — Request source
- `status`: string **required** enum: `draft`, `submitted`, `accepted`, `in_progress`, `awaiting_customer`, `awaiting_external`, `response_needed`, `completed` — RFI status. Project-specific dashboard surfaces may return a narrowed customer-facing vocabulary.
- `summary`: string **required** — RFI summary
- `tlp`: string **required** enum: `clear`, `green`, `amber`, `red` — TLP classification
- `tokens`: number **required** — Total tokens used
- `updated`: string **required** — Last update timestamp

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/{request_id}

Get an RFI by ID

operationId: `get_RequestRead`

**Response** 200 → `result`

- `account`: object **required**
  - `anniversary`: string **required** — Account anniversary
  - `id`: string **required** — Account UUID
  - `name`: string **required** — Account name
- `assignee`: string **required** — Assignee email
- `completed`: string **required** — Completion timestamp
- `created`: string **required** — Creation timestamp
- `id`: string **required** — RFI UUID
- `investigation_id`: string **required** — Linked Casefiles case UUID. Null until an analyst links a case to the request.
- `is_free_request`: boolean **required** — Whether this is a free request
- `message_tokens`: number **required** — Total message tokens
- `priority`: string **required** enum: `unknown`, `low`, `routine`, `medium`, `high`, `urgent`, `critical` — Request priority
- `priority_id`: integer — Raw stored Threat Intelligence priority. Values 64, 128, and 192 are authoritative; clients display null, 32, 255, and unsupported values as
- `readable_id`: string **required** — Human-readable ID
- `release_entitlements`: string **required** — Release entitlements
- `report_id`: string **required** — Report UUID
- `request`: object **required**
  - `category`: string **required** — Request category
  - `message_tokens`: number **required** — Message tokens used
  - `name`: string **required** — Request type name
  - `request_tokens`: number **required** — Request tokens used
  - `response_tokens`: number **required** — Response tokens used
  - `result`: string **required** — Expected result type
  - `source`: string **required** — Request source
- `status`: string **required** enum: `draft`, `submitted`, `accepted`, `in_progress`, `awaiting_customer`, `awaiting_external`, `response_needed`, `completed` — RFI status. Project-specific dashboard surfaces may return a narrowed customer-facing vocabulary.
- `summary`: string **required** — RFI summary
- `tlp`: string **required** enum: `clear`, `green`, `amber`, `red` — TLP classification
- `tokens`: number **required** — Total tokens used
- `updated`: string **required** — Last update timestamp

## PUT /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/{request_id}

Update an RFI

operationId: `put_RequestUpdate`

**Request** (application/json)

- `description`: string — RFI description
- `eventId`: string — Optional related event ID
- `priority`: string enum: `low`, `routine`, `high`, `urgent`, `unknown`, `medium`, `critical` — RFI priority. Four-level projects use a distinct `low` level; existing projects retain legacy `low`->routine compatibility. `medium`, `criti
- `request_type`: string — Request type. May only be changed while the request is still open; changing it recalculates the request's token cost.
- `subtypeId`: string — Optional subtype ID
- `summary`: string — RFI summary
- `title`: string — RFI title (alias for summary field)
- `tlp`: string enum: `clear`, `green`, `amber`, `amber-strict`, `red`, `purple`, `white`, `amber+strict` — Traffic Light Protocol level. `white` and `amber+strict` are accepted input aliases; responses always use the canonical spelling.

**Response** 200 → `result`

- `account`: object **required**
  - `anniversary`: string **required** — Account anniversary
  - `id`: string **required** — Account UUID
  - `name`: string **required** — Account name
- `assignee`: string **required** — Assignee email
- `completed`: string **required** — Completion timestamp
- `created`: string **required** — Creation timestamp
- `id`: string **required** — RFI UUID
- `investigation_id`: string **required** — Linked Casefiles case UUID. Null until an analyst links a case to the request.
- `is_free_request`: boolean **required** — Whether this is a free request
- `message_tokens`: number **required** — Total message tokens
- `priority`: string **required** enum: `unknown`, `low`, `routine`, `medium`, `high`, `urgent`, `critical` — Request priority
- `priority_id`: integer — Raw stored Threat Intelligence priority. Values 64, 128, and 192 are authoritative; clients display null, 32, 255, and unsupported values as
- `readable_id`: string **required** — Human-readable ID
- `release_entitlements`: string **required** — Release entitlements
- `report_id`: string **required** — Report UUID
- `request`: object **required**
  - `category`: string **required** — Request category
  - `message_tokens`: number **required** — Message tokens used
  - `name`: string **required** — Request type name
  - `request_tokens`: number **required** — Request tokens used
  - `response_tokens`: number **required** — Response tokens used
  - `result`: string **required** — Expected result type
  - `source`: string **required** — Request source
- `status`: string **required** enum: `draft`, `submitted`, `accepted`, `in_progress`, `awaiting_customer`, `awaiting_external`, `response_needed`, `completed` — RFI status. Project-specific dashboard surfaces may return a narrowed customer-facing vocabulary.
- `summary`: string **required** — RFI summary
- `tlp`: string **required** enum: `clear`, `green`, `amber`, `red` — TLP classification
- `tokens`: number **required** — Total tokens used
- `updated`: string **required** — Last update timestamp
