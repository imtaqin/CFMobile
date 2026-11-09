# Physical Devices

6 endpoints.

## GET /accounts/{account_id}/devices/physical-devices

List devices

operationId: `list-devices` · query: `cursor`, `sort_by`, `sort_order`, `last_seen_user.email`, `seen_after`, `seen_before`, `per_page`, `search`, `active_registrations`, `has_registration_type`, `id`, `tag`, `last_seen_registration.policy.id`, `include`

**Response** 200 → `result`

[array of]
- `active_registrations`: integer **required** — The number of active registrations for the device. Active registrations are those which haven't been revoked or deleted.
- `client_version`: string — Version of the WARP client.
- `created_at`: string **required** — The RFC3339 timestamp when the device was created.
- `deleted_at`: string — The RFC3339 timestamp when the device was deleted.
- `device_type`: string — The device operating system.
- `hardware_id`: string — A string that uniquely identifies the hardware or virtual machine (VM).
- `id`: string **required** — The unique ID of the device.
- `last_seen_at`: string **required** — The RFC3339 timestamp when the device was last seen.
- `last_seen_registration`: object — The last seen registration for the device.
- `last_seen_user`: object — The last user to use the WARP device.
- `mac_address`: string — The device MAC address.
- `manufacturer`: string — The device manufacturer.
- `model`: string — The model name of the device.
- `multiuser`: boolean — True if this device is in [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm
- `name`: string **required** — The name of the device.
- `os_version`: string — The device operating system version number.
- `os_version_extra`: string — Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Li
- `public_ip`: string — **Deprecated**: IP information is provided by DEX - see https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresou
- `serial_number`: string — The device serial number.
- `tags`: object **required** — Tags assigned to the device. An empty object if the device has no tags.
- `updated_at`: string **required** — The RFC3339 timestamp when the device was last updated.

## DELETE /accounts/{account_id}/devices/physical-devices/{device_id}

Delete device

operationId: `delete-device`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/devices/physical-devices/{device_id}

Get device

operationId: `get-device` · query: `include`

**Response** 200 → `result`

- `active_registrations`: integer **required** — The number of active registrations for the device. Active registrations are those which haven't been revoked or deleted.
- `client_version`: string — Version of the WARP client.
- `created_at`: string **required** — The RFC3339 timestamp when the device was created.
- `deleted_at`: string — The RFC3339 timestamp when the device was deleted.
- `device_type`: string — The device operating system.
- `hardware_id`: string — A string that uniquely identifies the hardware or virtual machine (VM).
- `id`: string **required** — The unique ID of the device.
- `last_seen_at`: string **required** — The RFC3339 timestamp when the device was last seen.
- `last_seen_registration`: object — The last seen registration for the device.
- `last_seen_user`: object — The last user to use the WARP device.
- `mac_address`: string — The device MAC address.
- `manufacturer`: string — The device manufacturer.
- `model`: string — The model name of the device.
- `multiuser`: boolean — True if this device is in [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm
- `name`: string **required** — The name of the device.
- `os_version`: string — The device operating system version number.
- `os_version_extra`: string — Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Li
- `public_ip`: string — **Deprecated**: IP information is provided by DEX - see https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresou
- `serial_number`: string — The device serial number.
- `tags`: object **required** — Tags assigned to the device. An empty object if the device has no tags.
- `updated_at`: string **required** — The RFC3339 timestamp when the device was last updated.

## PATCH /accounts/{account_id}/devices/physical-devices/{device_id}

Update device

operationId: `patch-device`

**Request** (application/json)

- `tags`: object — Replaces all tags assigned to the physical device. An empty object removes all tags.

**Response** 200 → `result`

- `active_registrations`: integer **required** — The number of active registrations for the device. Active registrations are those which haven't been revoked or deleted.
- `client_version`: string — Version of the WARP client.
- `created_at`: string **required** — The RFC3339 timestamp when the device was created.
- `deleted_at`: string — The RFC3339 timestamp when the device was deleted.
- `device_type`: string — The device operating system.
- `hardware_id`: string — A string that uniquely identifies the hardware or virtual machine (VM).
- `id`: string **required** — The unique ID of the device.
- `last_seen_at`: string **required** — The RFC3339 timestamp when the device was last seen.
- `last_seen_registration`: object — The last seen registration for the device.
- `last_seen_user`: object — The last user to use the WARP device.
- `mac_address`: string — The device MAC address.
- `manufacturer`: string — The device manufacturer.
- `model`: string — The model name of the device.
- `multiuser`: boolean — True if this device is in [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm
- `name`: string **required** — The name of the device.
- `os_version`: string — The device operating system version number.
- `os_version_extra`: string — Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Li
- `public_ip`: string — **Deprecated**: IP information is provided by DEX - see https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresou
- `serial_number`: string — The device serial number.
- `tags`: object **required** — Tags assigned to the device. An empty object if the device has no tags.
- `updated_at`: string **required** — The RFC3339 timestamp when the device was last updated.

## POST /accounts/{account_id}/devices/physical-devices/{device_id}/revoke

Revoke device registrations

operationId: `revoke-device`

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/devices/registrations

Delete registrations

operationId: `delete-registrations` · query: `id`

**Response** 200 → `result`

object
