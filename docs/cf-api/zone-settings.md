# Zone Settings

29 endpoints.

## GET /zones/{zone_id}/settings

Get all zone settings

operationId: `zone-settings-get-all-zone-settings`

**Response** 200 → `result`

[array of]
(one of 67 variants; showing the first)
- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string **required** — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: any **required** — Current value of the zone setting.
- `id`: string enum: `0rtt` — ID of the zone setting.
- `value`: string enum: `on`, `off` default: `off` — Value of the 0-RTT setting.

## PATCH /zones/{zone_id}/settings

Edit multiple zone settings

operationId: `zone-settings-edit-zone-settings-info`

**Request** (application/json)

[array of]
(one of 65 variants; showing the first)
- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string **required** — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: any **required** — Current value of the zone setting.
- `id`: string enum: `0rtt` — ID of the zone setting.
- `value`: string enum: `on`, `off` default: `off` — Value of the 0-RTT setting.

**Response** 200 → `result`

[array of]
(one of 67 variants; showing the first)
- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string **required** — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: any **required** — Current value of the zone setting.
- `id`: string enum: `0rtt` — ID of the zone setting.
- `value`: string enum: `on`, `off` default: `off` — Value of the 0-RTT setting.

## GET /zones/{zone_id}/settings/{setting_id}

Get zone setting

operationId: `zone-settings-get-single-setting`

**Response** 200 → `result`

(one of 68 variants; showing the first)
- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string **required** — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: any **required** — Current value of the zone setting.
- `id`: string enum: `0rtt` — ID of the zone setting.
- `value`: string enum: `on`, `off` default: `off` — Value of the 0-RTT setting.

## PATCH /zones/{zone_id}/settings/{setting_id}

Edit zone setting

operationId: `zone-settings-edit-single-setting`

**Request** (application/json)

(one of 2 variants; showing the first)
- `enabled`: boolean default: `false` — ssl-recommender enrollment setting.

**Response** 200 → `result`

(one of 68 variants; showing the first)
- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string **required** — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: any **required** — Current value of the zone setting.
- `id`: string enum: `0rtt` — ID of the zone setting.
- `value`: string enum: `on`, `off` default: `off` — Value of the 0-RTT setting.

## DELETE /zones/{zone_id}/settings/aegis

Delete aegis setting

operationId: `zone-cache-settings-delete-aegis-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.

## GET /zones/{zone_id}/settings/aegis

Get aegis setting

operationId: `zone-cache-settings-get-aegis-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PATCH /zones/{zone_id}/settings/aegis

Change aegis setting

operationId: `zone-cache-settings-change-aegis-setting`

**Request** (application/json)

- `value`: object **required** — Value of the zone setting.
  - `enabled`: boolean — Whether the feature is enabled or not.
  - `pool_id`: string — Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## GET /zones/{zone_id}/settings/automatic_platform_optimization

Get Automatic Platform Optimization setting

operationId: `zone-settings-get-automatic-platform-optimization-setting`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `automatic_platform_optimization` — ID of the zone setting.
- `value`: any — Configuration for Automatic Platform Optimization (APO) for WordPress.

## PATCH /zones/{zone_id}/settings/automatic_platform_optimization

Change Automatic Platform Optimization setting

operationId: `zone-settings-change-automatic-platform-optimization-setting`

**Request** (application/json)

- `value`: any **required** — Configuration for Automatic Platform Optimization (APO) for WordPress.

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `automatic_platform_optimization` — ID of the zone setting.
- `value`: any — Configuration for Automatic Platform Optimization (APO) for WordPress.

## GET /zones/{zone_id}/settings/binary_ast

Get Binary AST setting

operationId: `zone-settings-get-binary-ast-setting`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `binary_ast` — ID of the zone setting.
- `value`: string enum: `off`, `on`, `latest` — Controls Binary AST behavior:

## PATCH /zones/{zone_id}/settings/binary_ast

Change Binary AST setting

operationId: `zone-settings-change-binary-ast-setting`

**Request** (application/json)

- `value`: string **required** enum: `off`, `on`, `latest` — Controls Binary AST behavior:

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `binary_ast` — ID of the zone setting.
- `value`: string enum: `off`, `on`, `latest` — Controls Binary AST behavior:

## GET /zones/{zone_id}/settings/fonts

Get Cloudflare Fonts setting

operationId: `zone-settings-get-fonts-setting`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `fonts` — ID of the zone setting.
- `value`: string enum: `on`, `off` default: `off` — Whether the feature is enabled or disabled.

## PATCH /zones/{zone_id}/settings/fonts

Change Cloudflare Fonts setting

operationId: `zone-settings-change-fonts-setting`

**Request** (application/json)

- `value`: string **required** enum: `on`, `off` default: `off` — Whether the feature is enabled or disabled.

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `fonts` — ID of the zone setting.
- `value`: string enum: `on`, `off` default: `off` — Whether the feature is enabled or disabled.

## GET /zones/{zone_id}/settings/h2_prioritization

Get HTTP/2 Prioritization setting

operationId: `zone-settings-get-h2-prioritization-setting`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `h2_prioritization` — ID of the zone setting.
- `value`: string enum: `off`, `on`, `custom` — Controls HTTP/2 Prioritization behavior:

## PATCH /zones/{zone_id}/settings/h2_prioritization

Change HTTP/2 Prioritization setting

operationId: `zone-settings-change-h2-prioritization-setting`

**Request** (application/json)

- `value`: string **required** enum: `off`, `on`, `custom` — Controls HTTP/2 Prioritization behavior:

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `h2_prioritization` — ID of the zone setting.
- `value`: string enum: `off`, `on`, `custom` — Controls HTTP/2 Prioritization behavior:

## GET /zones/{zone_id}/settings/image_resizing

Get Image Transformations setting

operationId: `zone-settings-get-image-resizing-setting`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `image_resizing` — ID of the zone setting.
- `value`: string enum: `off`, `on`, `open`, `latest` — Controls Image Resizing behavior:

## PATCH /zones/{zone_id}/settings/image_resizing

Change Image Transformations setting

operationId: `zone-settings-change-image-resizing-setting`

**Request** (application/json)

- `value`: string **required** enum: `off`, `on`, `open`, `latest` — Controls Image Resizing behavior:

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `image_resizing` — ID of the zone setting.
- `value`: string enum: `off`, `on`, `open`, `latest` — Controls Image Resizing behavior:

## GET /zones/{zone_id}/settings/origin_h2_max_streams

Get Origin H2 Max Streams Setting

operationId: `zone-cache-settings-get-origin-h2-max-streams-setting`

**Response** 200 → `result`

- `id`: string **required** — Identifier of the zone setting.
- `modified_on`: string — Last time this setting was modified.
- `id`: string enum: `origin_h2_max_streams` — Value of the zone setting.
- `value`: integer — Value of the Origin H2 Max Streams Setting.

## PATCH /zones/{zone_id}/settings/origin_h2_max_streams

Change Origin H2 Max Streams Setting

operationId: `zone-cache-settings-change-origin-h2-max-streams-setting`

**Request** (application/json)

- `value`: integer **required** — Value of the Origin H2 Max Streams Setting.

**Response** 200 → `result`

- `id`: string **required** — Identifier of the zone setting.
- `modified_on`: string — Last time this setting was modified.
- `id`: string enum: `origin_h2_max_streams` — Value of the zone setting.
- `value`: integer — Value of the Origin H2 Max Streams Setting.

## GET /zones/{zone_id}/settings/origin_max_http_version

Get Origin Max HTTP Version Setting

operationId: `zone-cache-settings-get-origin-max-http-version-setting`

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## PATCH /zones/{zone_id}/settings/origin_max_http_version

Change Origin Max HTTP Version Setting

operationId: `zone-cache-settings-change-origin-max-http-version-setting`

**Request** (application/json)

- `value`: string **required** enum: `2`, `1` — Value of the Origin Max HTTP Version Setting.

**Response** 200 → `result`

- `editable`: boolean **required** — Whether the setting is editable.
- `id`: string **required** — The identifier of the caching setting.
- `modified_on`: string — The time when the setting was last modified.
- `value`: any **required** — The value of the setting.

## GET /zones/{zone_id}/settings/speed_brain

Get Cloudflare Speed Brain setting

operationId: `zone-settings-get-speed-brain-setting`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `value`: string — Whether the feature is enabled or disabled.

## PATCH /zones/{zone_id}/settings/speed_brain

Change Cloudflare Speed Brain setting

operationId: `zone-settings-change-speed-brain-setting`

**Request** (application/json)

- `value`: string **required** enum: `on`, `off` — Whether the feature is enabled or disabled.

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `value`: string — Whether the feature is enabled or disabled.

## GET /zones/{zone_id}/settings/transformations_allowed_origins

Get Image Transformations Allowed Origins setting

operationId: `zone-settings-get-transformations-allowed-origins-setting`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `image_resizing_allowed_origins` — ID of the zone setting.
- `value`: string — Comma-separated list of allowed origin domains for image and video transformations.

## PATCH /zones/{zone_id}/settings/transformations_allowed_origins

Change Image Transformations Allowed Origins setting

operationId: `zone-settings-change-transformations-allowed-origins-setting`

**Request** (application/json)

- `value`: string **required** — Comma-separated list of allowed origin domains for image and video transformations.

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `image_resizing_allowed_origins` — ID of the zone setting.
- `value`: string — Comma-separated list of allowed origin domains for image and video transformations.

## GET /zones/{zone_id}/settings/transformations_c2pa

Get Image Transformations C2PA setting

operationId: `zone-settings-get-transformations-c2pa-setting`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `image_resizing_c2pa` — ID of the zone setting.
- `value`: string enum: `off`, `on` — Whether C2PA signing is enabled for image transformations.

## PATCH /zones/{zone_id}/settings/transformations_c2pa

Change Image Transformations C2PA setting

operationId: `zone-settings-change-transformations-c2pa-setting`

**Request** (application/json)

- `value`: string **required** enum: `off`, `on` — Whether C2PA signing is enabled for image transformations.

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `image_resizing_c2pa` — ID of the zone setting.
- `value`: string enum: `off`, `on` — Whether C2PA signing is enabled for image transformations.

## GET /zones/{zone_id}/settings/transformations_config

Get Transformations configuration

operationId: `zone-settings-get-transformations-config`

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `transformations_config` — ID of the zone setting.
- `value`: object — Combined configuration value for Transformations. All fields are optional on PATCH;
  - `allowed_origins`: string — Comma-separated list of allowed origin domains for image and video transformations.
  - `c2pa`: string enum: `off`, `on` — Whether C2PA signing is enabled for image transformations.
  - `transformations`: string enum: `off`, `on`, `open`, `latest` — Controls Image Transformations behavior:

## PATCH /zones/{zone_id}/settings/transformations_config

Change Transformations configuration

operationId: `zone-settings-change-transformations-config`

**Request** (application/json)

- `value`: object **required** — Combined configuration value for Transformations. All fields are optional on PATCH;
  - `allowed_origins`: string — Comma-separated list of allowed origin domains for image and video transformations.
  - `c2pa`: string enum: `off`, `on` — Whether C2PA signing is enabled for image transformations.
  - `transformations`: string enum: `off`, `on`, `open`, `latest` — Controls Image Transformations behavior:

**Response** 200 → `result`

- `editable`: boolean enum: `true`, `false` — Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).
- `id`: string — Identifier of the zone setting.
- `modified_on`: string — last time this setting was modified.
- `value`: string enum: `on`, `off` — Current value of the zone setting.
- `id`: string enum: `transformations_config` — ID of the zone setting.
- `value`: object — Combined configuration value for Transformations. All fields are optional on PATCH;
  - `allowed_origins`: string — Comma-separated list of allowed origin domains for image and video transformations.
  - `c2pa`: string enum: `off`, `on` — Whether C2PA signing is enabled for image transformations.
  - `transformations`: string enum: `off`, `on`, `open`, `latest` — Controls Image Transformations behavior:
