# DEX Notifications

3 endpoints.

## GET /accounts/{account_id}/dex/notifications

List notification history

operationId: `list-dex-notifications` · query: `page`, `per_page`, `search`, `from`, `to`, `scope`, `status`

**Response** 200 → `result`

- `notifications`: object[] **required** — Notification sendouts ordered from newest to oldest.
  [array of]
  - `created_at`: any **required** — Time at which the notification sendout was created.
  - `id`: any **required** — Unique identifier for the notification sendout.
  - `message`: string **required** — Plain-text notification message.
  - `outcome_counts`: any — Weighted delivery outcome counts derived from sampled delivery events.
  - `recipient_count`: integer — Number of targeted device registrations. Omitted for account-wide notifications.
  - `scope`: string **required** enum: `account`, `device` — Whether the notification was sent account-wide or to selected device registrations.
  - `status`: string **required** enum: `pending`, `sent`, `failed` — Dispatch status indicating whether the notification was accepted for delivery, not a device delivery outcome.
  - `support_url`: string — URL supplied to recipients for additional information.
  - `title`: string **required** — Plain-text notification title.

## POST /accounts/{account_id}/dex/notifications

Create a notification

operationId: `create-dex-notification`

**Request** (application/json)

- `message`: string **required** — Plain-text notification message.
- `registration_ids`: string[] — Device registration IDs to notify. Omit to send an account-wide notification.
  [array]
- `support_url`: string — URL supplied to recipients for additional information. Required when registration_ids is set.
- `title`: string **required** — Plain-text notification title.

**Response** 201 → `result`

- `created_at`: any **required** — Time at which the notification sendout was created.
- `id`: any **required** — Unique identifier for the notification sendout.
- `message`: string **required** — Plain-text notification message.
- `outcome_counts`: any — Weighted delivery outcome counts derived from sampled delivery events.
- `recipient_count`: integer — Number of targeted device registrations. Omitted for account-wide notifications.
- `scope`: string **required** enum: `account`, `device` — Whether the notification was sent account-wide or to selected device registrations.
- `status`: string **required** enum: `pending`, `sent`, `failed` — Dispatch status indicating whether the notification was accepted for delivery, not a device delivery outcome.
- `support_url`: string — URL supplied to recipients for additional information.
- `title`: string **required** — Plain-text notification title.

## GET /accounts/{account_id}/dex/notifications/{notification_id}/outcomes

List notification outcomes

operationId: `list-dex-notification-outcomes` · query: `per_page`, `cursor`, `outcome`

**Response** 200 → `result`

- `outcomes`: object[] **required** — Observed notification outcomes ordered from newest to oldest.
  [array of]
  - `duration_ms`: integer **required** — Active notification duration in milliseconds. Expired outcomes report zero.
  - `registration_id`: string **required** — Registration ID of the device that produced the outcome.
  - `sample_interval`: integer **required** — Sampling interval for this event. Values above one indicate a sampled result.
  - `status`: string **required** enum: `delivered`, `failed`, `expired` — Observed notification delivery status.
  - `timestamp`: any **required** — Time when the outcome was observed.
