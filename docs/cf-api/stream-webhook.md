# Stream Webhook

3 endpoints.

## DELETE /accounts/{account_id}/stream/webhook

Delete webhooks

operationId: `stream-webhook-delete-webhooks`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/stream/webhook

View webhook

operationId: `stream-webhook-view-webhooks`

**Response** 200 → `result`

- `modified`: string — The date and time the webhook was last modified.
- `notificationUrl`: string — The URL where webhooks will be sent.
- `notification_url`: string — The URL where webhooks will be sent.
- `secret`: string — The secret used to verify webhook signatures.

## PUT /accounts/{account_id}/stream/webhook

Create VOD webhooks

operationId: `stream-webhook-create-webhooks`

**Request** (application/json)

(one of 2 variants; showing the first)
object

**Response** 200 → `result`

- `modified`: string — The date and time the webhook was last modified.
- `notificationUrl`: string — The URL where webhooks will be sent.
- `notification_url`: string — The URL where webhooks will be sent.
- `secret`: string — The secret used to verify webhook signatures.
