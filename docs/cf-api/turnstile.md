# Turnstile

6 endpoints.

## GET /accounts/{account_id}/challenges/widgets

List Turnstile Widgets

operationId: `accounts-turnstile-widgets-list` · query: `page`, `per_page`, `order`, `direction`, `filter`

**Response** 200 → `result`

[array of]
- `bot_fight_mode`: boolean **required** — If bot_fight_mode is set to `true`, Cloudflare issues computationally
- `clearance_level`: string **required** enum: `no_clearance`, `jschallenge`, `managed`, `interactive` — If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,
- `created_on`: string **required** — When the widget was created.
- `deployed_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin that created this widget, recorded at creation time and
- `domains`: string[] **required**
  [array]
- `ephemeral_id`: boolean **required** — Return the Ephemeral ID in /siteverify (ENT only).
- `last_modified_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin of the most recent mutation (create, update, delete, or
- `mode`: string **required** enum: `non-interactive`, `invisible`, `managed` — Widget Mode
- `modified_on`: string **required** — When the widget was modified.
- `name`: string **required** — Human readable widget name. Not unique. Cloudflare suggests that you
- `offlabel`: boolean **required** — Do not show any Cloudflare branding on the widget (ENT only).
- `region`: string **required** enum: `world`, `china` default: `world` — Region where this widget can be used. This cannot be changed after creation.
- `sitekey`: string **required** — Unique identifier for a Turnstile widget.

## POST /accounts/{account_id}/challenges/widgets

Create a Turnstile Widget

operationId: `accounts-turnstile-widget-create` · query: `page`, `per_page`, `order`, `direction`, `filter`

**Request** (application/json)

- `bot_fight_mode`: boolean — If bot_fight_mode is set to `true`, Cloudflare issues computationally
- `clearance_level`: string enum: `no_clearance`, `jschallenge`, `managed`, `interactive` — If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,
- `domains`: string[] **required**
  [array]
- `ephemeral_id`: boolean — Return the Ephemeral ID in /siteverify (ENT only).
- `mode`: any **required**
- `name`: string **required** — Human readable widget name. Not unique. Cloudflare suggests that you
- `offlabel`: boolean — Do not show any Cloudflare branding on the widget (ENT only).
- `region`: string enum: `world`, `china` default: `world` — Region where this widget can be used. This cannot be changed after creation.

**Response** 200 → `result`

- `bot_fight_mode`: boolean **required** — If bot_fight_mode is set to `true`, Cloudflare issues computationally
- `clearance_level`: string **required** enum: `no_clearance`, `jschallenge`, `managed`, `interactive` — If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,
- `created_on`: string **required** — When the widget was created.
- `deployed_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin that created this widget, recorded at creation time and
- `domains`: string[] **required**
  [array]
- `ephemeral_id`: boolean **required** — Return the Ephemeral ID in /siteverify (ENT only).
- `last_modified_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin of the most recent mutation (create, update, delete, or
- `mode`: string **required** enum: `non-interactive`, `invisible`, `managed` — Widget Mode
- `modified_on`: string **required** — When the widget was modified.
- `name`: string **required** — Human readable widget name. Not unique. Cloudflare suggests that you
- `offlabel`: boolean **required** — Do not show any Cloudflare branding on the widget (ENT only).
- `region`: string **required** enum: `world`, `china` default: `world` — Region where this widget can be used. This cannot be changed after creation.
- `secret`: string **required** — Secret key for this widget.
- `sitekey`: string **required** — Unique identifier for a Turnstile widget.

## DELETE /accounts/{account_id}/challenges/widgets/{sitekey}

Delete a Turnstile Widget

operationId: `accounts-turnstile-widget-delete`

**Response** 200 → `result`

- `bot_fight_mode`: boolean **required** — If bot_fight_mode is set to `true`, Cloudflare issues computationally
- `clearance_level`: string **required** enum: `no_clearance`, `jschallenge`, `managed`, `interactive` — If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,
- `created_on`: string **required** — When the widget was created.
- `deployed_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin that created this widget, recorded at creation time and
- `domains`: string[] **required**
  [array]
- `ephemeral_id`: boolean **required** — Return the Ephemeral ID in /siteverify (ENT only).
- `last_modified_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin of the most recent mutation (create, update, delete, or
- `mode`: string **required** enum: `non-interactive`, `invisible`, `managed` — Widget Mode
- `modified_on`: string **required** — When the widget was modified.
- `name`: string **required** — Human readable widget name. Not unique. Cloudflare suggests that you
- `offlabel`: boolean **required** — Do not show any Cloudflare branding on the widget (ENT only).
- `region`: string **required** enum: `world`, `china` default: `world` — Region where this widget can be used. This cannot be changed after creation.
- `secret`: string **required** — Secret key for this widget.
- `sitekey`: string **required** — Unique identifier for a Turnstile widget.

## GET /accounts/{account_id}/challenges/widgets/{sitekey}

Turnstile Widget Details

operationId: `accounts-turnstile-widget-get`

**Response** 200 → `result`

- `bot_fight_mode`: boolean **required** — If bot_fight_mode is set to `true`, Cloudflare issues computationally
- `clearance_level`: string **required** enum: `no_clearance`, `jschallenge`, `managed`, `interactive` — If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,
- `created_on`: string **required** — When the widget was created.
- `deployed_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin that created this widget, recorded at creation time and
- `domains`: string[] **required**
  [array]
- `ephemeral_id`: boolean **required** — Return the Ephemeral ID in /siteverify (ENT only).
- `last_modified_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin of the most recent mutation (create, update, delete, or
- `mode`: string **required** enum: `non-interactive`, `invisible`, `managed` — Widget Mode
- `modified_on`: string **required** — When the widget was modified.
- `name`: string **required** — Human readable widget name. Not unique. Cloudflare suggests that you
- `offlabel`: boolean **required** — Do not show any Cloudflare branding on the widget (ENT only).
- `region`: string **required** enum: `world`, `china` default: `world` — Region where this widget can be used. This cannot be changed after creation.
- `secret`: string **required** — Secret key for this widget.
- `sitekey`: string **required** — Unique identifier for a Turnstile widget.

## PUT /accounts/{account_id}/challenges/widgets/{sitekey}

Update a Turnstile Widget

operationId: `accounts-turnstile-widget-update`

**Request** (application/json)

- `bot_fight_mode`: boolean — If bot_fight_mode is set to `true`, Cloudflare issues computationally
- `clearance_level`: string enum: `no_clearance`, `jschallenge`, `managed`, `interactive` — If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,
- `domains`: string[] **required**
  [array]
- `ephemeral_id`: boolean — Return the Ephemeral ID in /siteverify (ENT only).
- `mode`: any **required**
- `name`: string **required** — Human readable widget name. Not unique. Cloudflare suggests that you
- `offlabel`: boolean — Do not show any Cloudflare branding on the widget (ENT only).
- `region`: string enum: `world`, `china` default: `world` — Region where this widget can be used. This cannot be changed after creation.

**Response** 200 → `result`

- `bot_fight_mode`: boolean **required** — If bot_fight_mode is set to `true`, Cloudflare issues computationally
- `clearance_level`: string **required** enum: `no_clearance`, `jschallenge`, `managed`, `interactive` — If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,
- `created_on`: string **required** — When the widget was created.
- `deployed_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin that created this widget, recorded at creation time and
- `domains`: string[] **required**
  [array]
- `ephemeral_id`: boolean **required** — Return the Ephemeral ID in /siteverify (ENT only).
- `last_modified_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin of the most recent mutation (create, update, delete, or
- `mode`: string **required** enum: `non-interactive`, `invisible`, `managed` — Widget Mode
- `modified_on`: string **required** — When the widget was modified.
- `name`: string **required** — Human readable widget name. Not unique. Cloudflare suggests that you
- `offlabel`: boolean **required** — Do not show any Cloudflare branding on the widget (ENT only).
- `region`: string **required** enum: `world`, `china` default: `world` — Region where this widget can be used. This cannot be changed after creation.
- `secret`: string **required** — Secret key for this widget.
- `sitekey`: string **required** — Unique identifier for a Turnstile widget.

## POST /accounts/{account_id}/challenges/widgets/{sitekey}/rotate_secret

Rotate Secret for a Turnstile Widget

operationId: `accounts-turnstile-widget-rotate-secret`

**Request** (application/json)

- `invalidate_immediately`: boolean default: `false` — If `invalidate_immediately` is set to `false`, the previous secret will

**Response** 200 → `result`

- `bot_fight_mode`: boolean **required** — If bot_fight_mode is set to `true`, Cloudflare issues computationally
- `clearance_level`: string **required** enum: `no_clearance`, `jschallenge`, `managed`, `interactive` — If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,
- `created_on`: string **required** — When the widget was created.
- `deployed_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin that created this widget, recorded at creation time and
- `domains`: string[] **required**
  [array]
- `ephemeral_id`: boolean **required** — Return the Ephemeral ID in /siteverify (ENT only).
- `last_modified_via`: string enum: `wrangler`, `dashboard`, `spin`, `api`, `unknown` — Origin of the most recent mutation (create, update, delete, or
- `mode`: string **required** enum: `non-interactive`, `invisible`, `managed` — Widget Mode
- `modified_on`: string **required** — When the widget was modified.
- `name`: string **required** — Human readable widget name. Not unique. Cloudflare suggests that you
- `offlabel`: boolean **required** — Do not show any Cloudflare branding on the widget (ENT only).
- `region`: string **required** enum: `world`, `china` default: `world` — Region where this widget can be used. This cannot be changed after creation.
- `secret`: string **required** — Secret key for this widget.
- `sitekey`: string **required** — Unique identifier for a Turnstile widget.
