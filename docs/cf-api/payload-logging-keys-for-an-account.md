# Payload logging keys for an account

3 endpoints.

## DELETE /accounts/{account_id}/firewall/payload_logging/key

Delete the payload logging key

operationId: `payload-logging-keys-for-an-account-delete-the-payload-logging-key`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/firewall/payload_logging/key

Get the payload logging key

operationId: `payload-logging-keys-for-an-account-get-the-payload-logging-key`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/firewall/payload_logging/key

Set the payload logging key

operationId: `payload-logging-keys-for-an-account-set-the-payload-logging-key`

**Request** (application/json)

- `public_key`: string **required** — Defines the X25519 public key, as standard base64 of exactly 32 bytes, that encrypts matched payloads. Cloudflare stores only the public key

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
