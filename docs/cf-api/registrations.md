# Registrations

5 endpoints.

## GET /accounts/{account_id}/devices/registrations

List registrations

operationId: `list-registrations` · query: `user.id`, `seen_after`, `seen_before`, `status`, `registration_type`, `per_page`, `search`, `sort_by`, `sort_order`, `cursor`, `id`, `device.id`, `policy.id`, `include`

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — The RFC3339 timestamp when the registration was created.
- `deleted_at`: string — The RFC3339 timestamp when the registration was deleted.
- `device`: object **required** — Device details embedded inside of a registration.
  - `client_version`: string — Version of the WARP client.
  - `id`: string **required** — The ID of the device.
  - `name`: string **required** — The name of the device.
- `id`: string **required** — The ID of the registration.
- `key`: string **required** — The public key used to connect to the Cloudflare network.
- `key_type`: string — The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.
- `last_seen_at`: string **required** — The RFC3339 timestamp when the registration was last seen.
- `policy`: object — The device settings profile assigned to this registration.
  - `default`: boolean **required** — Whether the device settings profile is the default profile for the account.
  - `deleted`: boolean **required** — Whether the device settings profile was deleted.
  - `id`: string **required** — The ID of the device settings profile.
  - `name`: string **required** — The name of the device settings profile.
  - `updated_at`: string **required** — The RFC3339 timestamp of when the device settings profile last changed for the registration.
- `registration_type`: string **required** enum: `warp`, `browser_extension` — The registration client type, derived from device_type.
- `revoked_at`: string — The RFC3339 timestamp when the registration was revoked.
- `tunnel_type`: string — Type of the tunnel - wireguard or masque.
- `updated_at`: string **required** — The RFC3339 timestamp when the registration was last updated.
- `user`: object
  - `email`: string — The contact email address of the user.
  - `id`: string — UUID.
  - `name`: string — The enrolled device user's name.
- `virtual_ipv4`: string — The virtual IPv4 address assigned to the network interface of the tunnel for this registration.
- `virtual_ipv6`: string — The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

## DELETE /accounts/{account_id}/devices/registrations/{registration_id}

Delete registration

operationId: `delete-registration`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/devices/registrations/{registration_id}

Get registration

operationId: `get-registration` · query: `include`

**Response** 200 → `result`

- `created_at`: string **required** — The RFC3339 timestamp when the registration was created.
- `deleted_at`: string — The RFC3339 timestamp when the registration was deleted.
- `device`: object **required** — Device details embedded inside of a registration.
  - `client_version`: string — Version of the WARP client.
  - `id`: string **required** — The ID of the device.
  - `name`: string **required** — The name of the device.
- `id`: string **required** — The ID of the registration.
- `key`: string **required** — The public key used to connect to the Cloudflare network.
- `key_type`: string — The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.
- `last_seen_at`: string **required** — The RFC3339 timestamp when the registration was last seen.
- `policy`: object — The device settings profile assigned to this registration.
  - `default`: boolean **required** — Whether the device settings profile is the default profile for the account.
  - `deleted`: boolean **required** — Whether the device settings profile was deleted.
  - `id`: string **required** — The ID of the device settings profile.
  - `name`: string **required** — The name of the device settings profile.
  - `updated_at`: string **required** — The RFC3339 timestamp of when the device settings profile last changed for the registration.
- `registration_type`: string **required** enum: `warp`, `browser_extension` — The registration client type, derived from device_type.
- `revoked_at`: string — The RFC3339 timestamp when the registration was revoked.
- `tunnel_type`: string — Type of the tunnel - wireguard or masque.
- `updated_at`: string **required** — The RFC3339 timestamp when the registration was last updated.
- `user`: object
  - `email`: string — The contact email address of the user.
  - `id`: string — UUID.
  - `name`: string — The enrolled device user's name.
- `virtual_ipv4`: string — The virtual IPv4 address assigned to the network interface of the tunnel for this registration.
- `virtual_ipv6`: string — The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

## POST /accounts/{account_id}/devices/registrations/revoke

Revoke registrations

operationId: `revoke-registrations` · query: `id`

**Response** 200 → `result`

object

## POST /accounts/{account_id}/devices/registrations/unrevoke

Unrevoke registrations

operationId: `unrevoke-registrations` · query: `id`

**Response** 200 → `result`

object
