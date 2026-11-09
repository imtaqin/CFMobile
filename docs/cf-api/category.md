# Category

13 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/categories

List event categories used in datasets

operationId: `get_CategoryList` · query: `datasetIds`

**Response** 200 → `result`

[array of]
- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string
- `uuid`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/categories/{category_id}

Delete an event category (legacy)

operationId: `delete_LegacyCategoryDelete`

**Response** 200 → `result`

- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/categories/{category_id}

Get an event category (legacy)

operationId: `get_LegacyCategoryRead`

**Response** 200 → `result`

- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string
- `uuid`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/events/categories/{category_id}

Update an event category (legacy)

operationId: `patch_LegacyCategoryUpdate`

**Request** (application/json)

- `killChain`: number
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string
- `shortname`: string

**Response** 200 → `result`

- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/categories/{category_id}

Update an event category (legacy)

operationId: `post_LegacyCategoryUpdate`

**Request** (application/json)

- `killChain`: number
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string
- `shortname`: string

**Response** 200 → `result`

- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string
- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/categories/catalog

List all event categories

operationId: `get_CategoryListComplete`

**Response** 200 → `result`

[array of]
- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/categories/create

Create an event category

operationId: `post_CategoryCreate`

**Request** (application/json)

- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string

**Response** 200 → `result`

- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string
- `uuid`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/event-categories/by-id/{category_id}

Delete an event category

operationId: `delete_CategoryDelete`

**Response** 200 → `result`

- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/event-categories/by-id/{category_id}

Get an event category

operationId: `get_CategoryRead`

**Response** 200 → `result`

- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string
- `uuid`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/events/event-categories/by-id/{category_id}

Update an event category

operationId: `patch_CategoryUpdate`

**Request** (application/json)

- `killChain`: number
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string
- `shortname`: string

**Response** 200 → `result`

- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/event-categories/by-id/{category_id}

Update an event category

operationId: `post_CategoryUpdate`

**Request** (application/json)

- `killChain`: number
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string
- `shortname`: string

**Response** 200 → `result`

- `killChain`: number **required**
- `mitreAttack`: string[]
  [array]
- `mitreCapec`: string[]
  [array]
- `name`: string **required**
- `shortname`: string
- `uuid`: string **required**

## GET /accounts/{account_id}/resource-library/categories

List application categories

operationId: `getResourceLibraryCategories` · query: `limit`, `offset`, `cursor`

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — Returns the category creation time.
- `description`: string **required** — Returns the category description.
- `id`: integer **required** — Numeric identifier for an application category.
- `name`: string **required** — Returns the category name.

## GET /accounts/{account_id}/resource-library/categories/{id}

Get application category

operationId: `getResourceLibraryCategoryById`

**Response** 200 → `result`

- `created_at`: string **required** — Returns the category creation time.
- `description`: string **required** — Returns the category description.
- `id`: integer **required** — Numeric identifier for an application category.
- `name`: string **required** — Returns the category name.
