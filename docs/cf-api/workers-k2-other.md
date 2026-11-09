# workers_k2_other

15 endpoints.

## GET /accounts/{account_id}/k2/streams

List K2 streams

operationId: `getV4AccountsByAccount_idK2Streams` · query: `name`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `endpoint`: string **required** — Indicates the base HTTP endpoint for producing and consuming records.
- `http`: object **required** — Configures the HTTP endpoint. Disabling HTTP keeps `authentication` and `cors`, so enabling it again restores them.
  - `authentication`: boolean — Indicates whether the HTTP endpoint requires an API token with K2 produce permission. When false, the endpoint accepts unauthenticated recor
  - `cors`: object
    - `origins`: string[] — Allows browser requests from these HTTP or HTTPS origins. Use a wildcard only as the sole origin. An empty list blocks cross-origin browser 
  - `enabled`: boolean **required** — Indicates whether the HTTP endpoint accepts records.
- `id`: string **required** — Specifies the public ID of the K2 stream.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the K2 stream.
- `retention_seconds`: integer **required** — Shows the configured record retention period from 1 hour (3600 seconds) to 30 days (2592000 seconds), inclusive.
- `worker_binding`: object **required**
  - `enabled`: boolean **required** — Indicates whether Workers bindings can produce records to the stream.

## POST /accounts/{account_id}/k2/streams

Create K2 stream

operationId: `postV4AccountsByAccount_idK2Streams`

**Request** (application/json)

- `http`: any default: `[object Object]`
- `name`: string **required** — Specifies the name of the K2 stream.
- `retention_seconds`: integer default: `604800` — Sets the record retention period from 1 hour (3600 seconds) to 30 days (2592000 seconds), inclusive.
- `worker_binding`: any default: `[object Object]`

**Response** 200 → `result`

- `created_at`: string **required**
- `endpoint`: string **required** — Indicates the base HTTP endpoint for producing and consuming records.
- `http`: object **required** — Configures the HTTP endpoint. Disabling HTTP keeps `authentication` and `cors`, so enabling it again restores them.
  - `authentication`: boolean — Indicates whether the HTTP endpoint requires an API token with K2 produce permission. When false, the endpoint accepts unauthenticated recor
  - `cors`: object
    - `origins`: string[] — Allows browser requests from these HTTP or HTTPS origins. Use a wildcard only as the sole origin. An empty list blocks cross-origin browser 
  - `enabled`: boolean **required** — Indicates whether the HTTP endpoint accepts records.
- `id`: string **required** — Specifies the public ID of the K2 stream.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the K2 stream.
- `retention_seconds`: integer **required** — Shows the configured record retention period from 1 hour (3600 seconds) to 30 days (2592000 seconds), inclusive.
- `worker_binding`: object **required**
  - `enabled`: boolean **required** — Indicates whether Workers bindings can produce records to the stream.

## DELETE /accounts/{account_id}/k2/streams/{stream_id}

Delete K2 stream

operationId: `deleteV4AccountsByAccount_idK2StreamsByStream_id`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/k2/streams/{stream_id}

Get K2 stream

operationId: `getV4AccountsByAccount_idK2StreamsByStream_id`

**Response** 200 → `result`

- `created_at`: string **required**
- `endpoint`: string **required** — Indicates the base HTTP endpoint for producing and consuming records.
- `http`: object **required** — Configures the HTTP endpoint. Disabling HTTP keeps `authentication` and `cors`, so enabling it again restores them.
  - `authentication`: boolean — Indicates whether the HTTP endpoint requires an API token with K2 produce permission. When false, the endpoint accepts unauthenticated recor
  - `cors`: object
    - `origins`: string[] — Allows browser requests from these HTTP or HTTPS origins. Use a wildcard only as the sole origin. An empty list blocks cross-origin browser 
  - `enabled`: boolean **required** — Indicates whether the HTTP endpoint accepts records.
- `id`: string **required** — Specifies the public ID of the K2 stream.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the K2 stream.
- `retention_seconds`: integer **required** — Shows the configured record retention period from 1 hour (3600 seconds) to 30 days (2592000 seconds), inclusive.
- `worker_binding`: object **required**
  - `enabled`: boolean **required** — Indicates whether Workers bindings can produce records to the stream.

## PATCH /accounts/{account_id}/k2/streams/{stream_id}

Update K2 stream

operationId: `patchV4AccountsByAccount_idK2StreamsByStream_id`

**Request** (application/json)

- `http`: object — Configures the HTTP endpoint. Disabling HTTP keeps `authentication` and `cors`, so enabling it again restores them.
  - `authentication`: boolean — Indicates whether the HTTP endpoint requires an API token with K2 produce permission. When false, the endpoint accepts unauthenticated recor
  - `cors`: object
    - `origins`: string[] — Allows browser requests from these HTTP or HTTPS origins. Use a wildcard only as the sole origin. An empty list blocks cross-origin browser 
  - `enabled`: boolean **required** — Indicates whether the HTTP endpoint accepts records.
- `retention_seconds`: integer — Sets the record retention period from 1 hour (3600 seconds) to 30 days (2592000 seconds), inclusive.
- `worker_binding`: object
  - `enabled`: boolean **required** — Indicates whether Workers bindings can produce records to the stream.

**Response** 200 → `result`

- `created_at`: string **required**
- `endpoint`: string **required** — Indicates the base HTTP endpoint for producing and consuming records.
- `http`: object **required** — Configures the HTTP endpoint. Disabling HTTP keeps `authentication` and `cors`, so enabling it again restores them.
  - `authentication`: boolean — Indicates whether the HTTP endpoint requires an API token with K2 produce permission. When false, the endpoint accepts unauthenticated recor
  - `cors`: object
    - `origins`: string[] — Allows browser requests from these HTTP or HTTPS origins. Use a wildcard only as the sole origin. An empty list blocks cross-origin browser 
  - `enabled`: boolean **required** — Indicates whether the HTTP endpoint accepts records.
- `id`: string **required** — Specifies the public ID of the K2 stream.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the K2 stream.
- `retention_seconds`: integer **required** — Shows the configured record retention period from 1 hour (3600 seconds) to 30 days (2592000 seconds), inclusive.
- `worker_binding`: object **required**
  - `enabled`: boolean **required** — Indicates whether Workers bindings can produce records to the stream.

## GET /accounts/{account_id}/k2/streams/{stream_id}/subscriptions

List subscriptions with consumer lag

operationId: `getV4AccountsByAccount_idK2StreamsByStream_idSubscriptions`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `id`: string **required**
- `lag`: object **required**
  - `records`: string **required** — Decimal-string distance from the subscription's committed position to the observed exclusive stream tail, in records. Includes in-flight rec
  - `status`: string **required** enum: `available`, `unsupported`, `unavailable` — Unsupported means the subscription or stream topology cannot be measured; unavailable means a required observation failed or was inconsisten
- `modified_at`: string **required**
- `name`: string **required**
- `start_at`: object **required**
  - `type`: string **required** enum: `earliest`, `latest`

## POST /produce

Produce records

operationId: `postK2Produce`

**Request** (application/json)

- `records`: object[] **required**
  [array of]
  - `content`: string **required** — The record payload, encoded as standard base64. Empty content is valid.
  - `headers`: object — Metadata about the record, as string keys and values.

**Response** 200 → `result`

- `success`: boolean **required** enum: `true`

## GET /subscriptions

List subscriptions

operationId: `getK2Subscriptions` · query: `name`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `id`: string **required** — Specifies the ID of the subscription.
- `modified_at`: string **required**
- `name`: string **required**
- `start_at`: object **required**
  - `type`: string **required** enum: `earliest`, `latest`

## POST /subscriptions

Create subscription

operationId: `postK2Subscriptions`

**Request** (application/json)

- `name`: string **required** — Specifies the name of the subscription. Creating a subscription with an existing name returns the existing subscription.
- `start_at`: object **required**
  - `type`: string **required** enum: `earliest`, `latest` — Starts at the oldest retained record or at the end of the stream.

**Response** 200 → `result`

- `id`: string **required** — Specifies the ID of the subscription.

## DELETE /subscriptions/{subscription_id}

Delete subscription

operationId: `deleteK2SubscriptionsBySubscription_id`

**Response** 200 → `result`

- `id`: string **required** — Specifies the ID of the subscription.

## GET /subscriptions/{subscription_id}

Get subscription

operationId: `getK2SubscriptionsBySubscription_id`

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required** — Specifies the ID of the subscription.
- `modified_at`: string **required**
- `name`: string **required**
- `start_at`: object **required**
  - `type`: string **required** enum: `earliest`, `latest`

## POST /subscriptions/{subscription_id}/batches/{batch_id}/ack

Acknowledge batch

operationId: `postK2SubscriptionsBySubscription_idBatchesByBatch_idAck`

**Request** (application/json)

- `worker_id`: string **required** — Identifies the consumer process. Each worker holds at most one batch at a time.

**Response** 200 → `result`

object

## POST /subscriptions/{subscription_id}/batches/{batch_id}/extend

Extend batch lease

operationId: `postK2SubscriptionsBySubscription_idBatchesByBatch_idExtend`

**Request** (application/json)

- `worker_id`: string **required** — Identifies the consumer process. Each worker holds at most one batch at a time.

**Response** 200 → `result`

- `leased_until_ms`: integer **required** — Shows the new lease expiry, in epoch milliseconds.

## POST /subscriptions/{subscription_id}/batches/{batch_id}/nack

Release batch

operationId: `postK2SubscriptionsBySubscription_idBatchesByBatch_idNack`

**Request** (application/json)

- `worker_id`: string **required** — Identifies the consumer process. Each worker holds at most one batch at a time.

**Response** 200 → `result`

object

## POST /subscriptions/{subscription_id}/consume

Consume records

operationId: `postK2SubscriptionsBySubscription_idConsume`

**Request** (application/json)

- `max_records`: integer **required** — Sets the maximum number of records to return.
- `worker_id`: string **required** — Identifies the consumer process. Each worker holds at most one batch at a time.

**Response** 200 → `result`

- `batch_id`: string **required** — Identifies the delivered batch for ACK, NACK, and extend. Null when the response contains no records.
- `leased_until_ms`: integer **required** — Shows when the lease on the batch expires, in epoch milliseconds. ACK or NACK the batch before then. Null when the response contains no reco
- `records`: object[] **required**
  [array of]
  - `content`: string **required** — The record payload, encoded as standard base64.
  - `headers`: object — Lists the metadata the producer attached to the record. Omitted when the record carries none.
  - `timestamp_ms`: integer **required** — Shows when K2 received the record, in epoch milliseconds.
