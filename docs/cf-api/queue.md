# Queue

28 endpoints.

## GET /accounts/{account_id}/event_subscriptions/subscriptions

List Event Subscriptions

operationId: `subscriptions-list` · query: `page`, `per_page`, `order`, `direction`

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — When the subscription was created
- `destination`: object **required** — Destination configuration for the subscription
- `enabled`: boolean **required** — Whether the subscription is active
- `events`: string[] **required** — List of event types this subscription handles
  [array]
- `id`: string **required** — Unique identifier for the subscription
- `modified_at`: string **required** — When the subscription was last modified
- `name`: string **required** — Name of the subscription
- `source`: object **required** — Source configuration for the subscription

## POST /accounts/{account_id}/event_subscriptions/subscriptions

Create Event Subscription

operationId: `subscriptions-create`

**Request** (application/json)

- `destination`: object — Destination configuration for the subscription
- `enabled`: boolean — Whether the subscription is active
- `events`: string[] — List of event types this subscription handles
  [array]
- `name`: string — Name of the subscription
- `source`: object — Source configuration for the subscription

**Response** 200 → `result`

- `created_at`: string **required** — When the subscription was created
- `destination`: object **required** — Destination configuration for the subscription
- `enabled`: boolean **required** — Whether the subscription is active
- `events`: string[] **required** — List of event types this subscription handles
  [array]
- `id`: string **required** — Unique identifier for the subscription
- `modified_at`: string **required** — When the subscription was last modified
- `name`: string **required** — Name of the subscription
- `source`: object **required** — Source configuration for the subscription

## DELETE /accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}

Delete Event Subscription

operationId: `subscriptions-delete`

**Response** 200 → `result`

- `created_at`: string **required** — When the subscription was created
- `destination`: object **required** — Destination configuration for the subscription
- `enabled`: boolean **required** — Whether the subscription is active
- `events`: string[] **required** — List of event types this subscription handles
  [array]
- `id`: string **required** — Unique identifier for the subscription
- `modified_at`: string **required** — When the subscription was last modified
- `name`: string **required** — Name of the subscription
- `source`: object **required** — Source configuration for the subscription

## GET /accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}

Get Event Subscription

operationId: `subscriptions-get`

**Response** 200 → `result`

- `created_at`: string **required** — When the subscription was created
- `destination`: object **required** — Destination configuration for the subscription
- `enabled`: boolean **required** — Whether the subscription is active
- `events`: string[] **required** — List of event types this subscription handles
  [array]
- `id`: string **required** — Unique identifier for the subscription
- `modified_at`: string **required** — When the subscription was last modified
- `name`: string **required** — Name of the subscription
- `source`: object **required** — Source configuration for the subscription

## PATCH /accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}

Update Event Subscription

operationId: `subscriptions-patch`

**Request** (application/json)

- `destination`: object — Destination configuration for the subscription
- `enabled`: boolean — Whether the subscription is active
- `events`: string[] — List of event types this subscription handles
  [array]
- `name`: string — Name of the subscription

**Response** 200 → `result`

- `created_at`: string **required** — When the subscription was created
- `destination`: object **required** — Destination configuration for the subscription
- `enabled`: boolean **required** — Whether the subscription is active
- `events`: string[] **required** — List of event types this subscription handles
  [array]
- `id`: string **required** — Unique identifier for the subscription
- `modified_at`: string **required** — When the subscription was last modified
- `name`: string **required** — Name of the subscription
- `source`: object **required** — Source configuration for the subscription

## GET /accounts/{account_id}/queues

List Queues

operationId: `queues-list`

**Response** 200 → `result`

[array of]
- `consumers`: object[]
  [array of]
  - `consumer_id`: string — A Resource identifier.
  - `created_on`: string
  - `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
  - `queue_name`: string
  - `script_name`: string — Name of a Worker
  - `settings`: object
    - `batch_size`: number — The maximum number of messages to include in a batch.
    - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
    - `max_retries`: number — The maximum number of retries
    - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
    - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
  - `type`: string enum: `worker`
- `consumers_total_count`: number
- `created_on`: string
- `jurisdiction`: string enum: `eu`, `us`, `fedramp`
- `modified_on`: string
- `producers`: object[]
  [array of]
  - `script`: string
  - `type`: string enum: `worker`
- `producers_total_count`: number
- `queue_id`: string
- `queue_name`: string
- `settings`: object
  - `delivery_delay`: number — Number of seconds to delay delivery of all messages to consumers.
  - `delivery_paused`: boolean — Indicates if message delivery to consumers is currently paused.
  - `message_retention_period`: number — Number of seconds after which an unconsumed message will be delayed.

## POST /accounts/{account_id}/queues

Create Queue

operationId: `queues-create`

**Request** (application/json)

- `jurisdiction`: string enum: `eu`, `us`, `fedramp`
- `queue_name`: string **required**

**Response** 200 → `result`

- `consumers`: object[]
  [array of]
  - `consumer_id`: string — A Resource identifier.
  - `created_on`: string
  - `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
  - `queue_name`: string
  - `script_name`: string — Name of a Worker
  - `settings`: object
    - `batch_size`: number — The maximum number of messages to include in a batch.
    - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
    - `max_retries`: number — The maximum number of retries
    - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
    - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
  - `type`: string enum: `worker`
- `consumers_total_count`: number
- `created_on`: string
- `jurisdiction`: string enum: `eu`, `us`, `fedramp`
- `modified_on`: string
- `producers`: object[]
  [array of]
  - `script`: string
  - `type`: string enum: `worker`
- `producers_total_count`: number
- `queue_id`: string
- `queue_name`: string
- `settings`: object
  - `delivery_delay`: number — Number of seconds to delay delivery of all messages to consumers.
  - `delivery_paused`: boolean — Indicates if message delivery to consumers is currently paused.
  - `message_retention_period`: number — Number of seconds after which an unconsumed message will be delayed.

## DELETE /accounts/{account_id}/queues/{queue_id}

Delete Queue

operationId: `queues-delete`

**Response** 200 → `result`

- `errors`: object[]
  [array of]
  - `code`: integer **required**
  - `message`: string **required**
- `messages`: string[]
  [array]
- `success`: boolean enum: `true` — Indicates if the API call was successful or not.

## GET /accounts/{account_id}/queues/{queue_id}

Get Queue

operationId: `queues-get`

**Response** 200 → `result`

- `consumers`: object[]
  [array of]
  - `consumer_id`: string — A Resource identifier.
  - `created_on`: string
  - `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
  - `queue_name`: string
  - `script_name`: string — Name of a Worker
  - `settings`: object
    - `batch_size`: number — The maximum number of messages to include in a batch.
    - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
    - `max_retries`: number — The maximum number of retries
    - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
    - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
  - `type`: string enum: `worker`
- `consumers_total_count`: number
- `created_on`: string
- `jurisdiction`: string enum: `eu`, `us`, `fedramp`
- `modified_on`: string
- `producers`: object[]
  [array of]
  - `script`: string
  - `type`: string enum: `worker`
- `producers_total_count`: number
- `queue_id`: string
- `queue_name`: string
- `settings`: object
  - `delivery_delay`: number — Number of seconds to delay delivery of all messages to consumers.
  - `delivery_paused`: boolean — Indicates if message delivery to consumers is currently paused.
  - `message_retention_period`: number — Number of seconds after which an unconsumed message will be delayed.

## PATCH /accounts/{account_id}/queues/{queue_id}

Update Queue

operationId: `queues-update-partial`

**Request** (application/json)

- `consumers`: object[]
  [array of]
  - `consumer_id`: string — A Resource identifier.
  - `created_on`: string
  - `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
  - `queue_name`: string
  - `script_name`: string — Name of a Worker
  - `settings`: object
    - `batch_size`: number — The maximum number of messages to include in a batch.
    - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
    - `max_retries`: number — The maximum number of retries
    - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
    - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
  - `type`: string enum: `worker`
- `consumers_total_count`: number
- `created_on`: string
- `jurisdiction`: string enum: `eu`, `us`, `fedramp`
- `modified_on`: string
- `producers`: object[]
  [array of]
  - `script`: string
  - `type`: string enum: `worker`
- `producers_total_count`: number
- `queue_id`: string
- `queue_name`: string
- `settings`: object
  - `delivery_delay`: number — Number of seconds to delay delivery of all messages to consumers.
  - `delivery_paused`: boolean — Indicates if message delivery to consumers is currently paused.
  - `message_retention_period`: number — Number of seconds after which an unconsumed message will be delayed.

**Response** 200 → `result`

- `consumers`: object[]
  [array of]
  - `consumer_id`: string — A Resource identifier.
  - `created_on`: string
  - `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
  - `queue_name`: string
  - `script_name`: string — Name of a Worker
  - `settings`: object
    - `batch_size`: number — The maximum number of messages to include in a batch.
    - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
    - `max_retries`: number — The maximum number of retries
    - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
    - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
  - `type`: string enum: `worker`
- `consumers_total_count`: number
- `created_on`: string
- `jurisdiction`: string enum: `eu`, `us`, `fedramp`
- `modified_on`: string
- `producers`: object[]
  [array of]
  - `script`: string
  - `type`: string enum: `worker`
- `producers_total_count`: number
- `queue_id`: string
- `queue_name`: string
- `settings`: object
  - `delivery_delay`: number — Number of seconds to delay delivery of all messages to consumers.
  - `delivery_paused`: boolean — Indicates if message delivery to consumers is currently paused.
  - `message_retention_period`: number — Number of seconds after which an unconsumed message will be delayed.

## PUT /accounts/{account_id}/queues/{queue_id}

Update Queue

operationId: `queues-update`

**Request** (application/json)

- `consumers`: object[]
  [array of]
  - `consumer_id`: string — A Resource identifier.
  - `created_on`: string
  - `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
  - `queue_name`: string
  - `script_name`: string — Name of a Worker
  - `settings`: object
    - `batch_size`: number — The maximum number of messages to include in a batch.
    - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
    - `max_retries`: number — The maximum number of retries
    - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
    - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
  - `type`: string enum: `worker`
- `consumers_total_count`: number
- `created_on`: string
- `jurisdiction`: string enum: `eu`, `us`, `fedramp`
- `modified_on`: string
- `producers`: object[]
  [array of]
  - `script`: string
  - `type`: string enum: `worker`
- `producers_total_count`: number
- `queue_id`: string
- `queue_name`: string
- `settings`: object
  - `delivery_delay`: number — Number of seconds to delay delivery of all messages to consumers.
  - `delivery_paused`: boolean — Indicates if message delivery to consumers is currently paused.
  - `message_retention_period`: number — Number of seconds after which an unconsumed message will be delayed.

**Response** 200 → `result`

- `consumers`: object[]
  [array of]
  - `consumer_id`: string — A Resource identifier.
  - `created_on`: string
  - `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
  - `queue_name`: string
  - `script_name`: string — Name of a Worker
  - `settings`: object
    - `batch_size`: number — The maximum number of messages to include in a batch.
    - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
    - `max_retries`: number — The maximum number of retries
    - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
    - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
  - `type`: string enum: `worker`
- `consumers_total_count`: number
- `created_on`: string
- `jurisdiction`: string enum: `eu`, `us`, `fedramp`
- `modified_on`: string
- `producers`: object[]
  [array of]
  - `script`: string
  - `type`: string enum: `worker`
- `producers_total_count`: number
- `queue_id`: string
- `queue_name`: string
- `settings`: object
  - `delivery_delay`: number — Number of seconds to delay delivery of all messages to consumers.
  - `delivery_paused`: boolean — Indicates if message delivery to consumers is currently paused.
  - `message_retention_period`: number — Number of seconds after which an unconsumed message will be delayed.

## GET /accounts/{account_id}/queues/{queue_id}/consumers

List Queue Consumers

operationId: `queues-list-consumers`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `consumer_id`: string — A Resource identifier.
- `created_on`: string
- `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
- `queue_name`: string
- `script_name`: string — Name of a Worker
- `settings`: object
  - `batch_size`: number — The maximum number of messages to include in a batch.
  - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
  - `max_retries`: number — The maximum number of retries
  - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
  - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
- `type`: string enum: `worker`

## POST /accounts/{account_id}/queues/{queue_id}/consumers

Create a Queue Consumer

operationId: `queues-create-consumer`

**Request** (application/json)

(one of 2 variants; showing the first)
- `dead_letter_queue`: string
- `script_name`: string **required** — Name of a Worker
- `settings`: object
  - `batch_size`: number — The maximum number of messages to include in a batch.
  - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
  - `max_retries`: number — The maximum number of retries
  - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
  - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
- `type`: string **required** enum: `worker`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `consumer_id`: string — A Resource identifier.
- `created_on`: string
- `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
- `queue_name`: string
- `script_name`: string — Name of a Worker
- `settings`: object
  - `batch_size`: number — The maximum number of messages to include in a batch.
  - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
  - `max_retries`: number — The maximum number of retries
  - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
  - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
- `type`: string enum: `worker`

## DELETE /accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}

Delete Queue Consumer

operationId: `queues-delete-consumer`

**Response** 200 → `result`

- `errors`: object[]
  [array of]
  - `code`: integer **required**
  - `message`: string **required**
- `messages`: string[]
  [array]
- `success`: boolean enum: `true` — Indicates if the API call was successful or not.

## GET /accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}

Get Queue Consumer

operationId: `queues-get-consumer`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `consumer_id`: string — A Resource identifier.
- `created_on`: string
- `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
- `queue_name`: string
- `script_name`: string — Name of a Worker
- `settings`: object
  - `batch_size`: number — The maximum number of messages to include in a batch.
  - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
  - `max_retries`: number — The maximum number of retries
  - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
  - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
- `type`: string enum: `worker`

## PUT /accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}

Update Queue Consumer

operationId: `queues-update-consumer`

**Request** (application/json)

(one of 2 variants; showing the first)
- `dead_letter_queue`: string
- `script_name`: string **required** — Name of a Worker
- `settings`: object
  - `batch_size`: number — The maximum number of messages to include in a batch.
  - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
  - `max_retries`: number — The maximum number of retries
  - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
  - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
- `type`: string **required** enum: `worker`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `consumer_id`: string — A Resource identifier.
- `created_on`: string
- `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
- `queue_name`: string
- `script_name`: string — Name of a Worker
- `settings`: object
  - `batch_size`: number — The maximum number of messages to include in a batch.
  - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
  - `max_retries`: number — The maximum number of retries
  - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
  - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
- `type`: string enum: `worker`

## POST /accounts/{account_id}/queues/{queue_id}/messages

Push Message

operationId: `queues-push-message`

**Request** (application/json)

- `delay_seconds`: number — The number of seconds to wait for attempting to deliver this message to consumers
(one of 2 variants; showing the first)
- `body`: string
- `content_type`: string enum: `text`

**Response** 200 → `result`

- `metadata`: object
  - `metrics`: object — Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.
    - `backlog_bytes`: number **required** — The size in bytes of unacknowledged messages in the queue.
    - `backlog_count`: number **required** — The number of unacknowledged messages in the queue.
    - `oldest_message_timestamp_ms`: number **required** — Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

## POST /accounts/{account_id}/queues/{queue_id}/messages/ack

Acknowledge + Retry Queue Messages

operationId: `queues-ack-messages`

**Request** (application/json)

- `acks`: object[]
  [array of]
  - `lease_id`: string — An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this m
- `retries`: object[]
  [array of]
  - `delay_seconds`: number — The number of seconds to delay before making the message available for another attempt.
  - `lease_id`: string — An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this m

**Response** 200 → `result`

- `ackCount`: number — The number of messages that were succesfully acknowledged.
- `retryCount`: number — The number of messages that were succesfully retried.
- `warnings`: object — Map of lease IDs to warning messages encountered during acknowledgement.

## POST /accounts/{account_id}/queues/{queue_id}/messages/batch

Push Message Batch

operationId: `queues-push-messages`

**Request** (application/json)

- `delay_seconds`: number — The number of seconds to wait for attempting to deliver this batch to consumers
- `messages`: object[]
  [array of]
  - `delay_seconds`: number — The number of seconds to wait for attempting to deliver this message to consumers
  - `body`: string
  - `content_type`: string enum: `text`

**Response** 200 → `result`

- `metadata`: object
  - `metrics`: object — Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.
    - `backlog_bytes`: number **required** — The size in bytes of unacknowledged messages in the queue.
    - `backlog_count`: number **required** — The number of unacknowledged messages in the queue.
    - `oldest_message_timestamp_ms`: number **required** — Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

## POST /accounts/{account_id}/queues/{queue_id}/messages/extend

Extend Message Leases

operationId: `queues-extend-messages`

**Request** (application/json)

- `extend`: object[]
  [array of]
  - `lease_id`: string — An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this m
- `visibility_timeout_ms`: number — The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

**Response** 200 → `result`

- `extendCount`: number — The number of message leases that were succesfully extended.
- `warnings`: object — Map of lease IDs to warning messages encountered during extensions.

## POST /accounts/{account_id}/queues/{queue_id}/messages/peek

Peek Queue Messages

operationId: `queues-peek-messages`

**Request** (application/json)

- `batch_size`: number — The maximum number of messages to include in a batch.

**Response** 200 → `result`

- `messages`: object[]
  [array of]
  - `attempts`: number
  - `body`: string
  - `id`: string
  - `metadata`: object
  - `ref`: string — An opaque reference to a peeked message. You must hold on to this value and use it to purge the message.
  - `timestamp_ms`: number

## POST /accounts/{account_id}/queues/{queue_id}/messages/preview

Preview Queue Messages

operationId: `queues-preview-messages`

**Request** (application/json)

- `batch_size`: number — The maximum number of messages to include in a batch.

**Response** 200 → `result`

- `messages`: object[]
  [array of]
  - `attempts`: number
  - `body`: string
  - `id`: string
  - `lease_id`: string — An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this m
  - `metadata`: object
  - `timestamp_ms`: number

## POST /accounts/{account_id}/queues/{queue_id}/messages/preview/ack

Delete Previewed Queue Messages

operationId: `queues-ack-preview-messages`

**Request** (application/json)

- `acks`: object[]
  [array of]
  - `lease_id`: string — An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this m
- `retries`: object[]
  [array of]
  - `delay_seconds`: number — The number of seconds to delay before making the message available for another attempt.
  - `lease_id`: string — An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this m

**Response** 200 → `result`

- `warnings`: object — Map of lease IDs to warning messages encountered during acknowledgement.

## POST /accounts/{account_id}/queues/{queue_id}/messages/pull

Pull Queue Messages

operationId: `queues-pull-messages`

**Request** (application/json)

- `batch_size`: number — The maximum number of messages to include in a batch.
- `visibility_timeout_ms`: number — The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

**Response** 200 → `result`

- `message_backlog_count`: number — The number of unacknowledged messages in the queue.
- `messages`: object[]
  [array of]
  - `attempts`: number
  - `body`: string
  - `id`: string
  - `lease_id`: string — An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this m
  - `metadata`: object
  - `timestamp_ms`: number
- `metadata`: object
  - `metrics`: object — Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.
    - `backlog_bytes`: number **required** — The size in bytes of unacknowledged messages in the queue.
    - `backlog_count`: number **required** — The number of unacknowledged messages in the queue.
    - `oldest_message_timestamp_ms`: number **required** — Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

## POST /accounts/{account_id}/queues/{queue_id}/messages/purge

Purge Peeked Queue Messages

operationId: `queues-purge-messages`

**Request** (application/json)

- `refs`: object[] **required**
  [array of]
  - `ref`: string **required** — An opaque reference to a peeked message. You must hold on to this value and use it to purge the message.

**Response** 200 → `result`

- `errors`: object[] — Errors encountered while purging messages.
  [array of]
  - `message`: string
- `warnings`: object — Map of refs to warning messages encountered during purge.

## GET /accounts/{account_id}/queues/{queue_id}/metrics

Get Queue Metrics

operationId: `queues-get-metrics`

**Response** 200 → `result`

- `backlog_bytes`: number **required** — The size in bytes of unacknowledged messages in the queue.
- `backlog_count`: number **required** — The number of unacknowledged messages in the queue.
- `oldest_message_timestamp_ms`: number **required** — Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

## GET /accounts/{account_id}/queues/{queue_id}/purge

Get Queue Purge Status

operationId: `queues-purge-get`

**Response** 200 → `result`

- `completed`: string — Indicates if the last purge operation completed successfully.
- `started_at`: string — Timestamp when the last purge operation started.

## POST /accounts/{account_id}/queues/{queue_id}/purge

Purge Queue

operationId: `queues-purge`

**Request** (application/json)

- `delete_messages_permanently`: boolean — Confirms that all messages will be permanently deleted.

**Response** 200 → `result`

- `consumers`: object[]
  [array of]
  - `consumer_id`: string — A Resource identifier.
  - `created_on`: string
  - `dead_letter_queue`: string — Name of the dead letter queue, or empty string if not configured
  - `queue_name`: string
  - `script_name`: string — Name of a Worker
  - `settings`: object
    - `batch_size`: number — The maximum number of messages to include in a batch.
    - `max_concurrency`: number — Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (re
    - `max_retries`: number — The maximum number of retries
    - `max_wait_time_ms`: number — The number of milliseconds to wait for a batch to fill up before attempting to deliver it
    - `retry_delay`: number — The number of seconds to delay before making the message available for another attempt.
  - `type`: string enum: `worker`
- `consumers_total_count`: number
- `created_on`: string
- `jurisdiction`: string enum: `eu`, `us`, `fedramp`
- `modified_on`: string
- `producers`: object[]
  [array of]
  - `script`: string
  - `type`: string enum: `worker`
- `producers_total_count`: number
- `queue_id`: string
- `queue_name`: string
- `settings`: object
  - `delivery_delay`: number — Number of seconds to delay delivery of all messages to consumers.
  - `delivery_paused`: boolean — Indicates if message delivery to consumers is currently paused.
  - `message_retention_period`: number — Number of seconds after which an unconsumed message will be delayed.
