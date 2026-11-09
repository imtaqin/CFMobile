# Account Settings

3 endpoints.

## GET /accounts/{account_id}/settings/transformations

List Image Resizing configurations for account

operationId: `account-settings-list-transformations`

**Response** 200 → `result`

[array of]
- `cf_zone_tag`: string — Zone tag identifier.
- `editable`: boolean — Whether this setting can be modified.
- `id`: string — Feature identifier.
- `modified_on`: string — When this setting was last modified.
- `value`: string — Current value of the feature setting.

## GET /accounts/{account_id}/settings/ut-billing

Get Unique Transformations billing setting

operationId: `account-settings-get-ut-billing-setting`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `ut_billing` — ID of the account setting.
- `value`: string enum: `on` — Enables Unique Transformations billing for the account.

## PATCH /accounts/{account_id}/settings/ut-billing

Change Unique Transformations billing setting

operationId: `account-settings-change-ut-billing-setting`

**Request** (application/json)

- `value`: string **required** enum: `on` — Enables Unique Transformations billing for the account.

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `ut_billing` — ID of the account setting.
- `value`: string enum: `on` — Enables Unique Transformations billing for the account.
