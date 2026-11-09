# Email Sending suppressions

14 endpoints.

## GET /accounts/{account_id}/email/sending/suppression

List account email suppressions

operationId: `get_publicListSuppressionSending` · query: `page`, `per_page`, `order`, `direction`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `email`: string **required**
- `expires_at`: string **required**
- `id`: string **required**
- `reason`: string **required**
- `zones`: string[] default: ``
  [array]

## POST /accounts/{account_id}/email/sending/suppression

Create account email suppression

operationId: `post_publicNewSuppressionSending`

**Request** (application/json)

- `email`: string **required**
- `expires_at`: string

**Response** 200 → `result`

- `id`: string **required**

## DELETE /accounts/{account_id}/email/sending/suppression/{suppression_id}

Delete account email suppression

operationId: `delete_publicDeleteSuppressionSending`

**Response** 200 → `result`

- `success`: boolean **required**

## GET /accounts/{account_id}/email/sending/suppression/{suppression_id}

Get account email suppression

operationId: `get_publicGetSuppressionSending`

**Response** 200 → `result`

- `created_at`: string **required**
- `email`: string **required**
- `expires_at`: string **required**
- `id`: string **required**
- `reason`: string **required**
- `zones`: string[] default: ``
  [array]

## GET /accounts/{account_id}/email/sending/suppressions

List account Email Sending suppressions

operationId: `get_publicListSendingSuppressions` · query: `per_page`, `cursor`, `email`, `search`, `reason`, `scope_type`, `scope_value`

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — When the suppression was created.
- `email`: string **required** — The suppressed email address.
- `expires_at`: string **required** — When the suppression expires. Null for a permanent suppression.
- `id`: string **required** — Unique identifier for this suppression.
- `note`: string — Advisory note for this suppression, if any.
- `read_only`: boolean **required** — Whether clients may mutate this suppression. This is determined by the server and must not be inferred from `reason`.
- `reason`: string **required** — Why the address is suppressed: `manual`, `complaint`, `hard_bounce`, `soft_bounce`, or `policy`.
- `scope`: any — Where the suppression applies: `account` for every sending domain of the account, or `sending_domain` for one envelope MAIL FROM domain.

## POST /accounts/{account_id}/email/sending/suppressions

Create account Email Sending suppression

operationId: `post_publicCreateSendingSuppression`

**Request** (application/json)

- `email`: string **required** — The email address to suppress.
- `expires_at`: string — Expiration timestamp for the suppression. Omit or set to null for a permanent suppression that never expires.
- `note`: string — Advisory note for this suppression. Not enforced or validated beyond length.
- `scope`: any — Where the suppression applies. Omit for `{ "type": "account" }`, which blocks the recipient for every sending domain of the account.

**Response** 200 → `result`

- `id`: string **required** — The suppression's identifier.
- `scope`: any — Where the suppression applies: `account` for every sending domain of the account, or `sending_domain` for one envelope MAIL FROM domain.

## DELETE /accounts/{account_id}/email/sending/suppressions/{suppression_id}

Delete account Email Sending suppression

operationId: `delete_publicDeleteSendingSuppression`

**Response** 200 → `result`

- `id`: string **required** — The suppression's identifier.
- `scope`: any — Where the suppression applies: `account` for every sending domain of the account, or `sending_domain` for one envelope MAIL FROM domain.

## GET /accounts/{account_id}/email/sending/suppressions/{suppression_id}

Get account Email Sending suppression

operationId: `get_publicGetSendingSuppression`

**Response** 200 → `result`

- `created_at`: string **required** — When the suppression was created.
- `email`: string **required** — The suppressed email address.
- `expires_at`: string **required** — When the suppression expires. Null for a permanent suppression.
- `id`: string **required** — Unique identifier for this suppression.
- `note`: string — Advisory note for this suppression, if any.
- `read_only`: boolean **required** — Whether clients may mutate this suppression. This is determined by the server and must not be inferred from `reason`.
- `reason`: string **required** — Why the address is suppressed: `manual`, `complaint`, `hard_bounce`, `soft_bounce`, or `policy`.
- `scope`: any — Where the suppression applies: `account` for every sending domain of the account, or `sending_domain` for one envelope MAIL FROM domain.

## PATCH /accounts/{account_id}/email/sending/suppressions/{suppression_id}

Update account Email Sending suppression

operationId: `patch_publicUpdateSendingSuppression`

**Request** (application/json)

- `expires_at`: string — New expiry. Send `null` to make the suppression permanent; omit to leave it unchanged.
- `note`: string — Replacement advisory note. Send an empty string to clear it; omit to leave it unchanged.
- `scope`: object — Not editable. Scope is fixed when the suppression is created; any value returns 400 with code `scope_immutable`. Delete and recreate the sup

**Response** 200 → `result`

- `created_at`: string **required** — When the suppression was created.
- `email`: string **required** — The suppressed email address.
- `expires_at`: string **required** — When the suppression expires. Null for a permanent suppression.
- `id`: string **required** — Unique identifier for this suppression.
- `note`: string — Advisory note for this suppression, if any.
- `read_only`: boolean **required** — Whether clients may mutate this suppression. This is determined by the server and must not be inferred from `reason`.
- `reason`: string **required** — Why the address is suppressed: `manual`, `complaint`, `hard_bounce`, `soft_bounce`, or `policy`.
- `scope`: any — Where the suppression applies: `account` for every sending domain of the account, or `sending_domain` for one envelope MAIL FROM domain.

## POST /accounts/{account_id}/email/sending/suppressions/bulk

Bulk import account Email Sending suppressions

operationId: `post_publicBulkCreateSendingSuppressions`

**Request** (application/json)

- `items`: object[] **required** — Suppressions to import. Items with the same email address and scope are deduplicated before processing.
  [array of]
  - `email`: string **required** — The email address to suppress.
  - `expires_at`: string — Expiration timestamp for the suppression. Omit or set to null for a permanent suppression that never expires.
  - `note`: string — Advisory note for this suppression. Not enforced or validated beyond length.
  - `scope`: any — Where the suppression applies. Omit for `{ "type": "account" }`, which blocks the recipient for every sending domain of the account.

**Response** 200 → `result`

- `deduplicated`: integer **required** — Number of items dropped because their email address and scope repeated an earlier item in this request. Counted once and excluded from `item
- `errors`: integer **required** — Number of items that failed to import due to an unexpected error.
- `invalid`: integer **required** — Number of items with an invalid email address or sending domain.
- `items`: object[] **required** — Per-item results, in the same order as the request body.
  [array of]
  - `email`: string — The submitted email address for this item.
  - `error`: string — Human-readable error message. Present when `status` is `invalid`, `error`, or `skipped`.
  - `id`: string — The created or promoted suppression's identifier. Present when `status` is `processed`.
  - `index`: integer **required** — Zero-based index of this item in the request body.
  - `scope`: any — Where the suppression applies: `account` for every sending domain of the account, or `sending_domain` for one envelope MAIL FROM domain.
  - `status`: string **required** enum: `processed`, `invalid`, `error`, `skipped` — Outcome for this item.
- `processed`: integer **required** — Number of items successfully created or promoted.
- `skipped`: integer **required** — Number of items skipped because the existing suppression is not customer-managed (for example, a read-only policy suppression).
- `total`: integer **required** — Total number of items in the request body, including duplicates.

## GET /zones/{zone_id}/email/sending/suppression

List zone email suppressions

operationId: `get_publicListSuppressionZoneSending` · query: `page`, `per_page`, `order`, `direction`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `email`: string **required**
- `expires_at`: string **required**
- `id`: string **required**
- `reason`: string **required**
- `zones`: string[] default: ``
  [array]

## POST /zones/{zone_id}/email/sending/suppression

Create zone email suppression

operationId: `post_publicNewSuppressionZoneSending`

**Request** (application/json)

- `email`: string **required**
- `expires_at`: string

**Response** 200 → `result`

- `id`: string **required**

## DELETE /zones/{zone_id}/email/sending/suppression/{suppression_id}

Delete zone email suppression

operationId: `delete_publicDeleteSuppressionZoneSending`

**Response** 200 → `result`

- `success`: boolean **required**

## GET /zones/{zone_id}/email/sending/suppression/{suppression_id}

Get zone email suppression

operationId: `get_publicGetSuppressionZoneSending`

**Response** 200 → `result`

- `created_at`: string **required**
- `email`: string **required**
- `expires_at`: string **required**
- `id`: string **required**
- `reason`: string **required**
- `zones`: string[] default: ``
  [array]
