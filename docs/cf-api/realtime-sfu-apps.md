# Realtime SFU Apps

5 endpoints.

## GET /accounts/{account_id}/calls/apps

List apps

operationId: `calls-apps-list`

**Response** 200 → `result`

[array of]
- `created`: string **required** — The date and time the item was created.
- `modified`: string **required** — The date and time the item was last modified.
- `name`: string **required** default: `` — A short description of a Realtime SFU app, not shown to end users.
- `uid`: string **required** — A Cloudflare-generated unique identifier for a item.

## POST /accounts/{account_id}/calls/apps

Create an SFU app

operationId: `calls-apps-create-a-new-app`

**Request** (application/json)

- `name`: string default: `` — A short description of a Realtime SFU app, not shown to end users.

**Response** 201 → `result`

- `created`: string **required** — The date and time the item was created.
- `modified`: string **required** — The date and time the item was last modified.
- `name`: string **required** default: `` — A short description of a Realtime SFU app, not shown to end users.
- `secret`: string **required** — Bearer token
- `uid`: string **required** — A Cloudflare-generated unique identifier for a item.

## DELETE /accounts/{account_id}/calls/apps/{app_id}

Delete an SFU app

operationId: `calls-apps-delete-app`

**Response** 200 → `result`

- `created`: string **required** — The date and time the item was created.
- `modified`: string **required** — The date and time the item was last modified.
- `name`: string **required** default: `` — A short description of a Realtime SFU app, not shown to end users.
- `uid`: string **required** — A Cloudflare-generated unique identifier for a item.

## GET /accounts/{account_id}/calls/apps/{app_id}

Retrieve SFU app details

operationId: `calls-apps-retrieve-app-details`

**Response** 200 → `result`

- `created`: string **required** — The date and time the item was created.
- `modified`: string **required** — The date and time the item was last modified.
- `name`: string **required** default: `` — A short description of a Realtime SFU app, not shown to end users.
- `uid`: string **required** — A Cloudflare-generated unique identifier for a item.

## PUT /accounts/{account_id}/calls/apps/{app_id}

Update SFU app details

operationId: `calls-apps-update-app-details`

**Request** (application/json)

- `name`: string default: `` — A short description of a Realtime SFU app, not shown to end users.

**Response** 200 → `result`

- `created`: string **required** — The date and time the item was created.
- `modified`: string **required** — The date and time the item was last modified.
- `name`: string **required** default: `` — A short description of a Realtime SFU app, not shown to end users.
- `uid`: string **required** — A Cloudflare-generated unique identifier for a item.
