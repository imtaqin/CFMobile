# Apps

9 endpoints.

## GET /accounts/{account_id}/flagship/apps

List apps

operationId: `flagship_list_apps`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required**
- `updated_at`: string **required**
- `updated_by`: string **required** — Email of the actor who last modified the app, or `unknown` when unavailable.

## POST /accounts/{account_id}/flagship/apps

Create app

operationId: `flagship_create_app`

**Request** (application/json)

- `name`: string **required** — Name of the Flagship app (1–64 letters, numbers, hyphens, or underscores).

**Response** 201 → `result`

- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required**
- `updated_at`: string **required**
- `updated_by`: string **required** — Email of the actor who last modified the app, or `unknown` when unavailable.

## DELETE /accounts/{account_id}/flagship/apps/{app_id}

Delete app

operationId: `flagship_delete_app`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/flagship/apps/{app_id}

Get app

operationId: `flagship_get_app`

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required**
- `updated_at`: string **required**
- `updated_by`: string **required** — Email of the actor who last modified the app, or `unknown` when unavailable.

## PUT /accounts/{account_id}/flagship/apps/{app_id}

Update app

operationId: `flagship_update_app`

**Request** (application/json)

- `name`: string — Name of the Flagship app (1–64 letters, numbers, hyphens, or underscores).

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required**
- `updated_at`: string **required**
- `updated_by`: string **required** — Email of the actor who last modified the app, or `unknown` when unavailable.

## GET /accounts/{account_id}/realtime/kit/apps

Fetch all apps

operationId: `get_apps` · query: `page_no`, `per_page`, `search`, `sort_order`

**Response** 200 → `result`

- `data`: object[]
  [array of]
  - `created_at`: string
  - `id`: string
  - `name`: string
- `paging`: object
  - `end_offset`: number
  - `start_offset`: number
  - `total_count`: number
- `success`: boolean

## POST /accounts/{account_id}/realtime/kit/apps

Create App

operationId: `create_app`

**Request** (application/json)

- `name`: string **required**

**Response** 200 → `result`

- `data`: object
  - `app`: object
    - `created_at`: string
    - `id`: string
    - `name`: string
- `success`: boolean

## GET /accounts/{account_id}/realtime/kit/apps/{app_id}

Fetch app details

operationId: `get_app`

**Response** 200 → `result`

- `data`: object
  - `created_at`: string
  - `id`: string
  - `name`: string
- `success`: boolean

## PATCH /accounts/{account_id}/realtime/kit/apps/{app_id}

Update an app

operationId: `update_app`

**Request** (application/json)

- `name`: string **required** — The app name. Leading and trailing whitespace is removed, and the name must contain at least one non-whitespace character.

**Response** 200 → `result`

- `data`: object **required**
  - `cf_account_tag`: string
  - `created_at`: string
  - `id`: string
  - `is_org_on_kv`: boolean
  - `name`: string
- `success`: boolean **required** enum: `true`
