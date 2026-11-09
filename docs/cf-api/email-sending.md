# Email Sending

5 endpoints.

## GET /accounts/{account_id}/email/sending/limits

Get sending limits

operationId: `email-sending-get-sending-limits`

**Response** 200 → `result`

- `quota`: object — The resolved daily sending quota for the account. Null when the quota is not yet available.
  - `unit`: string enum: `day`, `hour` — The time period for the quota.
  - `value`: integer — The quota limit.
- `recipient_mode`: string enum: `arbitrary`, `verified_only` — Which recipients the account can send to, derived from the account's Email Sending entitlement. arbitrary: any recipient. verified_only: onl
- `usage`: object — The account's current daily sending usage. Null when there is no resolved quota or usage is temporarily unavailable.
  - `over_quota`: boolean — Whether the account has exceeded its daily sending quota.
  - `resets_at`: string — When the current daily quota window resets. Null when there is no active window.
  - `sent`: integer — Emails sent against the daily quota in the current window.

## GET /accounts/{account_id}/email/sending/messages/{message_id}

Fetch an email message

operationId: `email-sending-get-email-message`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/email/sending/reputation

Get account reputation

operationId: `email-sending-get-reputation`

**Response** 200 → `result`

- `active_policy`: any **required** — The reputation policy thresholds currently applied to the account.
- `evaluated_at`: string **required** — When the account's reputation was last evaluated. Null when the account has never been evaluated.
- `grace_started_at`: string **required** — When the current At Risk suspension grace period started. This can be later than status_since if the grace period was restarted. Null outsid
- `status`: string **required** enum: `healthy`, `warning`, `at_risk`, `suspended` — The account's current reputation status.
- `status_since`: string **required** — When the account most recently transitioned into its current status. Null if the account has been Healthy since it was first tracked and has

## POST /accounts/{account_id}/email/sending/send

Send an email

operationId: `email-sending-account-send-builder`

**Request** (application/json)

(one of 3 variants; showing the first)
object
(one of 2 variants; showing the first)
object

**Response** 200 → `result`

- `delivered`: string[] **required** — Email addresses to which the message was delivered immediately.
  [array]
- `message_id`: string **required** — Message ID of the sent email.
- `permanent_bounces`: string[] **required** — Email addresses that permanently bounced.
  [array]
- `queued`: string[] **required** — Email addresses for which delivery was queued for later.
  [array]
- `suppressed_recipients`: string[] **required** — Email addresses dropped because they are on the suppression list. Returned when suppressed-recipient dropping is enabled for the sending sub
  [array]

## POST /accounts/{account_id}/email/sending/send_raw

Send a raw MIME email

operationId: `email-sending-account-send-raw-message`

**Request** (application/json)

- `from`: string **required** — Sender email address.
- `mime_message`: string **required** — The full MIME-encoded email message. Should include standard RFC 5322 headers such as From, To, Subject, and Content-Type. The from and reci
- `recipients`: string[] **required** — List of recipient email addresses.
  [array]

**Response** 200 → `result`

- `delivered`: string[] **required** — Email addresses to which the message was delivered immediately.
  [array]
- `message_id`: string **required** — Message ID of the sent email.
- `permanent_bounces`: string[] **required** — Email addresses that permanently bounced.
  [array]
- `queued`: string[] **required** — Email addresses for which delivery was queued for later.
  [array]
- `suppressed_recipients`: string[] **required** — Email addresses dropped because they are on the suppression list. Returned when suppressed-recipient dropping is enabled for the sending sub
  [array]
