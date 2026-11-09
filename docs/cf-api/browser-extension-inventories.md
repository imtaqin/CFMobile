# Browser Extension Inventories

2 endpoints.

## GET /accounts/{account_id}/browser-extension/config/inventories

List browser extension inventories

operationId: `accounts-browser-extension-inventories-list` · query: `cursor`, `per_page`

**Response** 200 → `result`

[array of]
- `account_id`: string **required** — Cloudflare account internal ID.
- `created_at`: string **required** — When the device state row was created.
- `installed_extensions`: object[] **required**
  [array of]
  - `enabled`: boolean **required** — Whether the extension is enabled.
  - `hostPermissions`: string[] **required** — Browser extension host permissions (URL patterns).
    [array]
  - `id`: string **required** — Browser extension ID.
  - `installType`: string **required** enum: `development`, `normal`, `admin`, `sideload`, `other` — How the extension was installed.
  - `name`: string **required** — Browser extension display name.
  - `permissions`: string[] **required** — Browser extension API permissions.
    [array]
  - `version`: string **required** — Browser extension version string.
- `observed_at`: string **required** — When the browser extension took the inventory snapshot.
- `physical_device_id`: string — Physical device ID from trusted device identity.
- `registration_id`: string **required** — Browser extension registration ID.
- `updated_at`: string **required** — When the device state row was last updated.

## GET /accounts/{account_id}/browser-extension/config/inventories/{registration_id}

Get a single browser extension inventory

operationId: `accounts-browser-extension-inventories-get`

**Response** 200 → `result`

- `account_id`: string **required** — Cloudflare account internal ID.
- `created_at`: string **required** — When the device state row was created.
- `installed_extensions`: object[] **required**
  [array of]
  - `enabled`: boolean **required** — Whether the extension is enabled.
  - `hostPermissions`: string[] **required** — Browser extension host permissions (URL patterns).
    [array]
  - `id`: string **required** — Browser extension ID.
  - `installType`: string **required** enum: `development`, `normal`, `admin`, `sideload`, `other` — How the extension was installed.
  - `name`: string **required** — Browser extension display name.
  - `permissions`: string[] **required** — Browser extension API permissions.
    [array]
  - `version`: string **required** — Browser extension version string.
- `observed_at`: string **required** — When the browser extension took the inventory snapshot.
- `physical_device_id`: string — Physical device ID from trusted device identity.
- `registration_id`: string **required** — Browser extension registration ID.
- `updated_at`: string **required** — When the device state row was last updated.
