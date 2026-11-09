# Argo Smart Routing

4 endpoints.

## GET /accounts/{account_id}/argo/count_zones_enabled

Get count of zones with Argo Smart Routing enabled for account

operationId: `argo-smart-routing-get-count-zones-enabled-for-account`

**Response** 200 → `result`

integer

## GET /user/argo/count_zones_enabled

Get count of zones with Argo Smart Routing enabled for user

operationId: `argo-smart-routing-get-count-zones-enabled-for-user`

**Response** 200 → `result`

integer

## GET /zones/{zone_id}/argo/smart_routing

Get Argo Smart Routing setting

operationId: `argo-smart-routing-get-argo-smart-routing-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Specifies if the setting is editable.
- `id`: string **required** — Specifies the identifier of the Argo Smart Routing setting.
- `modified_on`: string — Specifies the time when the setting was last modified.
- `value`: string **required** enum: `on`, `off` — Specifies the enablement value of Argo Smart Routing.

## PATCH /zones/{zone_id}/argo/smart_routing

Patch Argo Smart Routing setting

operationId: `argo-smart-routing-patch-argo-smart-routing-setting`

**Request** (application/json)

- `value`: string **required** enum: `on`, `off` — Specifies the enablement value of Argo Smart Routing.

**Response** 200 → `result`

- `editable`: boolean **required** — Specifies if the setting is editable.
- `id`: string **required** — Specifies the identifier of the Argo Smart Routing setting.
- `modified_on`: string — Specifies the time when the setting was last modified.
- `value`: string **required** enum: `on`, `off` — Specifies the enablement value of Argo Smart Routing.
