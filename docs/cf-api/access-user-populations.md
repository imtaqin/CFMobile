# Access user populations

5 endpoints.

## GET /accounts/{account_id}/access/user_populations

List user populations

operationId: `access-user-populations-list-user-populations` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: any **required**
- `id`: string **required** — UUID.
- `name`: string **required** — The name of the user population. Leading and trailing whitespace is trimmed before validation. After trimming, the name must contain at leas
- `updated_at`: any **required**

## POST /accounts/{account_id}/access/user_populations

Create a user population

operationId: `access-user-populations-create-user-population`

**Request** (application/json)

- `name`: string **required** — The name of the user population. Leading and trailing whitespace is trimmed before validation. After trimming, the name must contain at leas

**Response** 201 → `result`

- `created_at`: any **required**
- `id`: string **required** — UUID.
- `name`: string **required** — The name of the user population. Leading and trailing whitespace is trimmed before validation. After trimming, the name must contain at leas
- `updated_at`: any **required**

## DELETE /accounts/{account_id}/access/user_populations/{user_population_id}

Delete a user population

operationId: `access-user-populations-delete-user-population`

**Response** 202 → `result`

- `id`: string — UUID.

## GET /accounts/{account_id}/access/user_populations/{user_population_id}

Get a user population

operationId: `access-user-populations-get-user-population`

**Response** 200 → `result`

- `created_at`: any **required**
- `id`: string **required** — UUID.
- `name`: string **required** — The name of the user population. Leading and trailing whitespace is trimmed before validation. After trimming, the name must contain at leas
- `updated_at`: any **required**

## PUT /accounts/{account_id}/access/user_populations/{user_population_id}

Update a user population

operationId: `access-user-populations-update-user-population`

**Request** (application/json)

- `name`: string **required** — The name of the user population. Leading and trailing whitespace is trimmed before validation. After trimming, the name must contain at leas

**Response** 200 → `result`

- `created_at`: any **required**
- `id`: string **required** — UUID.
- `name`: string **required** — The name of the user population. Leading and trailing whitespace is trimmed before validation. After trimming, the name must contain at leas
- `updated_at`: any **required**
