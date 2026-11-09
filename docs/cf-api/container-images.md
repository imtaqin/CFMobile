# Container Images

1 endpoints.

## POST /accounts/{account_id}/containers/image-preparations

Prepare a container image

operationId: `prepareContainerImage`

**Request** (application/json)

- `image`: string **required** — Image url.

**Response** 200 → `result`

- `artifact_digest`: string — Digest of the prepared runtime artifact when status is ready.
- `image`: string **required** — Image url.
- `reason`: string — Human-readable pending or terminal error detail.
- `status`: string **required** enum: `pending`, `ready`, `error` — Current durable preparation state for a container image.
