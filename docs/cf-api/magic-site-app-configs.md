# Magic Site App Configs

5 endpoints.

## GET /accounts/{account_id}/magic/sites/{site_id}/app_configs

List App Configs

operationId: `magic-site-app-configs-list-app-configs`

**Response** 200 → `result`

[array of]
object

## POST /accounts/{account_id}/magic/sites/{site_id}/app_configs

Create a new App Config

operationId: `magic-site-app-configs-add-app-config`

**Request** (application/json)

(one of 2 variants; showing the first)
- `account_app_id`: string **required** — Magic account app ID.
(one of 2 variants; showing the first)
object
- `breakout`: boolean — Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.
- `preferred_wans`: string[] — WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).
  [array]
- `priority`: integer — Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

**Response** 201 → `result`

object

## DELETE /accounts/{account_id}/magic/sites/{site_id}/app_configs/{app_config_id}

Delete App Config

operationId: `magic-site-app-configs-delete-app-config`

**Response** 200 → `result`

object

## PATCH /accounts/{account_id}/magic/sites/{site_id}/app_configs/{app_config_id}

Update an App Config

operationId: `magic-site-app-configs-patch-app-config`

**Request** (application/json)

- `account_app_id`: string — Magic account app ID.
- `breakout`: boolean — Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.
- `managed_app_id`: string — Managed app ID.
- `preferred_wans`: string[] — WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).
  [array]
- `priority`: integer — Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/magic/sites/{site_id}/app_configs/{app_config_id}

Update an App Config

operationId: `magic-site-app-configs-update-app-config`

**Request** (application/json)

- `account_app_id`: string — Magic account app ID.
- `breakout`: boolean — Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.
- `managed_app_id`: string — Managed app ID.
- `preferred_wans`: string[] — WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).
  [array]
- `priority`: integer — Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

**Response** 200 → `result`

object
