# Webhooks

7 endpoints.

## GET /accounts/{account_id}/realtime/kit/{app_id}/webhooks

Fetch all webhooks details

operationId: `getAllWebhooks`

## POST /accounts/{account_id}/realtime/kit/{app_id}/webhooks

Add a webhook

operationId: `addWebhook`

## DELETE /accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}

Delete a webhook

operationId: `deleteWebhook`

## GET /accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}

Fetch details of a webhook

operationId: `getWebhook`

## PATCH /accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}

Edit a webhook

operationId: `editWebhook`

## PUT /accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}

Replace a webhook

operationId: `replaceWebhook`

## GET /accounts/{account_id}/realtime/kit/{app_id}/webhooks/all

Fetch all supported webhook events

operationId: `getAllWebhookEvents`
