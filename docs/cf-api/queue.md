# Queue

25 endpoints.

## GET /accounts/{account_id}/event_subscriptions/subscriptions

List Event Subscriptions

operationId: `subscriptions-list` · query: `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/event_subscriptions/subscriptions

Create Event Subscription

operationId: `subscriptions-create`

## DELETE /accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}

Delete Event Subscription

operationId: `subscriptions-delete`

## GET /accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}

Get Event Subscription

operationId: `subscriptions-get`

## PATCH /accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}

Update Event Subscription

operationId: `subscriptions-patch`

## GET /accounts/{account_id}/queues

List Queues

operationId: `queues-list`

## POST /accounts/{account_id}/queues

Create Queue

operationId: `queues-create`

## DELETE /accounts/{account_id}/queues/{queue_id}

Delete Queue

operationId: `queues-delete`

## GET /accounts/{account_id}/queues/{queue_id}

Get Queue

operationId: `queues-get`

## PATCH /accounts/{account_id}/queues/{queue_id}

Update Queue

operationId: `queues-update-partial`

## PUT /accounts/{account_id}/queues/{queue_id}

Update Queue

operationId: `queues-update`

## GET /accounts/{account_id}/queues/{queue_id}/consumers

List Queue Consumers

operationId: `queues-list-consumers`

## POST /accounts/{account_id}/queues/{queue_id}/consumers

Create a Queue Consumer

operationId: `queues-create-consumer`

## DELETE /accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}

Delete Queue Consumer

operationId: `queues-delete-consumer`

## GET /accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}

Get Queue Consumer

operationId: `queues-get-consumer`

## PUT /accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}

Update Queue Consumer

operationId: `queues-update-consumer`

## POST /accounts/{account_id}/queues/{queue_id}/messages

Push Message

operationId: `queues-push-message`

## POST /accounts/{account_id}/queues/{queue_id}/messages/ack

Acknowledge + Retry Queue Messages

operationId: `queues-ack-messages`

## POST /accounts/{account_id}/queues/{queue_id}/messages/batch

Push Message Batch

operationId: `queues-push-messages`

## POST /accounts/{account_id}/queues/{queue_id}/messages/preview

Preview Queue Messages

operationId: `queues-preview-messages`

## POST /accounts/{account_id}/queues/{queue_id}/messages/preview/ack

Delete Previewed Queue Messages

operationId: `queues-ack-preview-messages`

## POST /accounts/{account_id}/queues/{queue_id}/messages/pull

Pull Queue Messages

operationId: `queues-pull-messages`

## GET /accounts/{account_id}/queues/{queue_id}/metrics

Get Queue Metrics

operationId: `queues-get-metrics`

## GET /accounts/{account_id}/queues/{queue_id}/purge

Get Queue Purge Status

operationId: `queues-purge-get`

## POST /accounts/{account_id}/queues/{queue_id}/purge

Purge Queue

operationId: `queues-purge`
