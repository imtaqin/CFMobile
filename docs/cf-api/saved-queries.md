# Saved Queries

5 endpoints.

## GET /accounts/{account_id}/workers/observability/queries

List queries

operationId: `queries.list` · query: `page`, `perPage`, `order`, `orderBy`

**Response** 200 → `result`

[array of]
- `adhoc`: boolean **required** — If the query wasn't explcitly saved
- `created`: string **required**
- `createdBy`: string **required**
- `description`: string **required**
- `id`: string **required**
- `name`: string **required** — Query name
- `parameters`: object **required**
  - `calculations`: object[] — Create Calculations to compute as part of the query.
    [array of]
    - `alias`: string
    - `key`: string
    - `keyType`: string enum: `string`, `number`, `boolean`
    - `operator`: string **required** enum: `count`, `COUNT`
  - `datasets`: string[] — Set the Datasets to query. Leave it empty to query all the datasets.
    [array]
  - `filterCombination`: string enum: `and`, `or`, `AND`, `OR` — Set a Flag to describe how to combine the filters on the query.
  - `filters`: object[] — Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.
    [array of]
    - `filterCombination`: string **required** enum: `and`, `or`, `AND`, `OR`
    - `filters`: object[] **required**
    - `kind`: string **required** enum: `group`
  - `groupBys`: object[] — Define how to group the results of the query.
    [array of]
    - `type`: string **required** enum: `string`, `number`, `boolean`
    - `value`: string **required**
  - `havings`: object[] — Configure the Having clauses that filter on calculations in the query result.
    [array of]
    - `key`: string **required**
    - `operation`: string **required** enum: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`
    - `value`: number **required**
  - `limit`: integer — Set a limit on the number of results / records returned by the query
  - `needle`: object — Define an expression to search using full-text search.
    - `isRegex`: boolean
    - `matchCase`: boolean
    - `value`: any **required**
  - `orderBy`: object — Configure the order of the results returned by the query.
    - `order`: string enum: `asc`, `desc` — Set the order of the results
    - `value`: string **required** — Configure which Calculation to order the results by.
- `updated`: string **required**
- `updatedBy`: string **required**

## POST /accounts/{account_id}/workers/observability/queries

Save query

operationId: `queries.post`

**Request** (application/json)

- `description`: string **required**
- `name`: string **required** — Query name
- `parameters`: object **required**
  - `calculations`: object[] — Create Calculations to compute as part of the query.
    [array of]
    - `alias`: string
    - `key`: string
    - `keyType`: string enum: `string`, `number`, `boolean`
    - `operator`: string **required** enum: `count`, `COUNT`
  - `datasets`: string[] — Set the Datasets to query. Leave it empty to query all the datasets.
    [array]
  - `filterCombination`: string enum: `and`, `or`, `AND`, `OR` — Set a Flag to describe how to combine the filters on the query.
  - `filters`: object[] — Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.
    [array of]
    - `filterCombination`: string **required** enum: `and`, `or`, `AND`, `OR`
    - `filters`: object[] **required**
    - `kind`: string **required** enum: `group`
  - `groupBys`: object[] — Define how to group the results of the query.
    [array of]
    - `type`: string **required** enum: `string`, `number`, `boolean`
    - `value`: string **required**
  - `havings`: object[] — Configure the Having clauses that filter on calculations in the query result.
    [array of]
    - `key`: string **required**
    - `operation`: string **required** enum: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`
    - `value`: number **required**
  - `limit`: integer — Set a limit on the number of results / records returned by the query
  - `needle`: object — Define an expression to search using full-text search.
    - `isRegex`: boolean
    - `matchCase`: boolean
    - `value`: any **required**
  - `orderBy`: object — Configure the order of the results returned by the query.
    - `order`: string enum: `asc`, `desc` — Set the order of the results
    - `value`: string **required** — Configure which Calculation to order the results by.

**Response** 200 → `result`

- `adhoc`: boolean **required** — If the query wasn't explcitly saved
- `created`: string **required**
- `createdBy`: string **required**
- `description`: string **required**
- `id`: string **required**
- `name`: string **required** — Query name
- `parameters`: object **required**
  - `calculations`: object[] — Create Calculations to compute as part of the query.
    [array of]
    - `alias`: string
    - `key`: string
    - `keyType`: string enum: `string`, `number`, `boolean`
    - `operator`: string **required** enum: `count`, `COUNT`
  - `datasets`: string[] — Set the Datasets to query. Leave it empty to query all the datasets.
    [array]
  - `filterCombination`: string enum: `and`, `or`, `AND`, `OR` — Set a Flag to describe how to combine the filters on the query.
  - `filters`: object[] — Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.
    [array of]
    - `filterCombination`: string **required** enum: `and`, `or`, `AND`, `OR`
    - `filters`: object[] **required**
    - `kind`: string **required** enum: `group`
  - `groupBys`: object[] — Define how to group the results of the query.
    [array of]
    - `type`: string **required** enum: `string`, `number`, `boolean`
    - `value`: string **required**
  - `havings`: object[] — Configure the Having clauses that filter on calculations in the query result.
    [array of]
    - `key`: string **required**
    - `operation`: string **required** enum: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`
    - `value`: number **required**
  - `limit`: integer — Set a limit on the number of results / records returned by the query
  - `needle`: object — Define an expression to search using full-text search.
    - `isRegex`: boolean
    - `matchCase`: boolean
    - `value`: any **required**
  - `orderBy`: object — Configure the order of the results returned by the query.
    - `order`: string enum: `asc`, `desc` — Set the order of the results
    - `value`: string **required** — Configure which Calculation to order the results by.
- `updated`: string **required**
- `updatedBy`: string **required**

## DELETE /accounts/{account_id}/workers/observability/queries/{queryId}

Delete query

operationId: `queries.delete`

**Response** 200 → `result`

- `adhoc`: boolean **required** — If the query wasn't explcitly saved
- `created`: string **required**
- `createdBy`: string **required**
- `description`: string **required**
- `id`: string **required**
- `name`: string **required** — Query name
- `parameters`: object **required**
  - `calculations`: object[] — Create Calculations to compute as part of the query.
    [array of]
    - `alias`: string
    - `key`: string
    - `keyType`: string enum: `string`, `number`, `boolean`
    - `operator`: string **required** enum: `count`, `COUNT`
  - `datasets`: string[] — Set the Datasets to query. Leave it empty to query all the datasets.
    [array]
  - `filterCombination`: string enum: `and`, `or`, `AND`, `OR` — Set a Flag to describe how to combine the filters on the query.
  - `filters`: object[] — Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.
    [array of]
    - `filterCombination`: string **required** enum: `and`, `or`, `AND`, `OR`
    - `filters`: object[] **required**
    - `kind`: string **required** enum: `group`
  - `groupBys`: object[] — Define how to group the results of the query.
    [array of]
    - `type`: string **required** enum: `string`, `number`, `boolean`
    - `value`: string **required**
  - `havings`: object[] — Configure the Having clauses that filter on calculations in the query result.
    [array of]
    - `key`: string **required**
    - `operation`: string **required** enum: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`
    - `value`: number **required**
  - `limit`: integer — Set a limit on the number of results / records returned by the query
  - `needle`: object — Define an expression to search using full-text search.
    - `isRegex`: boolean
    - `matchCase`: boolean
    - `value`: any **required**
  - `orderBy`: object — Configure the order of the results returned by the query.
    - `order`: string enum: `asc`, `desc` — Set the order of the results
    - `value`: string **required** — Configure which Calculation to order the results by.
- `updated`: string **required**
- `updatedBy`: string **required**

## GET /accounts/{account_id}/workers/observability/queries/{queryId}

Get query

operationId: `queries.get`

**Response** 200 → `result`

- `adhoc`: boolean **required** — If the query wasn't explcitly saved
- `created`: string **required**
- `createdBy`: string **required**
- `description`: string **required**
- `id`: string **required**
- `name`: string **required** — Query name
- `parameters`: object **required**
  - `calculations`: object[] — Create Calculations to compute as part of the query.
    [array of]
    - `alias`: string
    - `key`: string
    - `keyType`: string enum: `string`, `number`, `boolean`
    - `operator`: string **required** enum: `count`, `COUNT`
  - `datasets`: string[] — Set the Datasets to query. Leave it empty to query all the datasets.
    [array]
  - `filterCombination`: string enum: `and`, `or`, `AND`, `OR` — Set a Flag to describe how to combine the filters on the query.
  - `filters`: object[] — Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.
    [array of]
    - `filterCombination`: string **required** enum: `and`, `or`, `AND`, `OR`
    - `filters`: object[] **required**
    - `kind`: string **required** enum: `group`
  - `groupBys`: object[] — Define how to group the results of the query.
    [array of]
    - `type`: string **required** enum: `string`, `number`, `boolean`
    - `value`: string **required**
  - `havings`: object[] — Configure the Having clauses that filter on calculations in the query result.
    [array of]
    - `key`: string **required**
    - `operation`: string **required** enum: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`
    - `value`: number **required**
  - `limit`: integer — Set a limit on the number of results / records returned by the query
  - `needle`: object — Define an expression to search using full-text search.
    - `isRegex`: boolean
    - `matchCase`: boolean
    - `value`: any **required**
  - `orderBy`: object — Configure the order of the results returned by the query.
    - `order`: string enum: `asc`, `desc` — Set the order of the results
    - `value`: string **required** — Configure which Calculation to order the results by.
- `updated`: string **required**
- `updatedBy`: string **required**

## PATCH /accounts/{account_id}/workers/observability/queries/{queryId}

Update query

operationId: `queries.patch`

**Request** (application/json)

- `description`: string **required**
- `name`: string **required** — Query name
- `parameters`: object **required**
  - `calculations`: object[] — Create Calculations to compute as part of the query.
    [array of]
    - `alias`: string
    - `key`: string
    - `keyType`: string enum: `string`, `number`, `boolean`
    - `operator`: string **required** enum: `count`, `COUNT`
  - `datasets`: string[] — Set the Datasets to query. Leave it empty to query all the datasets.
    [array]
  - `filterCombination`: string enum: `and`, `or`, `AND`, `OR` — Set a Flag to describe how to combine the filters on the query.
  - `filters`: object[] — Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.
    [array of]
    - `filterCombination`: string **required** enum: `and`, `or`, `AND`, `OR`
    - `filters`: object[] **required**
    - `kind`: string **required** enum: `group`
  - `groupBys`: object[] — Define how to group the results of the query.
    [array of]
    - `type`: string **required** enum: `string`, `number`, `boolean`
    - `value`: string **required**
  - `havings`: object[] — Configure the Having clauses that filter on calculations in the query result.
    [array of]
    - `key`: string **required**
    - `operation`: string **required** enum: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`
    - `value`: number **required**
  - `limit`: integer — Set a limit on the number of results / records returned by the query
  - `needle`: object — Define an expression to search using full-text search.
    - `isRegex`: boolean
    - `matchCase`: boolean
    - `value`: any **required**
  - `orderBy`: object — Configure the order of the results returned by the query.
    - `order`: string enum: `asc`, `desc` — Set the order of the results
    - `value`: string **required** — Configure which Calculation to order the results by.

**Response** 200 → `result`

- `adhoc`: boolean **required** — If the query wasn't explcitly saved
- `created`: string **required**
- `createdBy`: string **required**
- `description`: string **required**
- `id`: string **required**
- `name`: string **required** — Query name
- `parameters`: object **required**
  - `calculations`: object[] — Create Calculations to compute as part of the query.
    [array of]
    - `alias`: string
    - `key`: string
    - `keyType`: string enum: `string`, `number`, `boolean`
    - `operator`: string **required** enum: `count`, `COUNT`
  - `datasets`: string[] — Set the Datasets to query. Leave it empty to query all the datasets.
    [array]
  - `filterCombination`: string enum: `and`, `or`, `AND`, `OR` — Set a Flag to describe how to combine the filters on the query.
  - `filters`: object[] — Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.
    [array of]
    - `filterCombination`: string **required** enum: `and`, `or`, `AND`, `OR`
    - `filters`: object[] **required**
    - `kind`: string **required** enum: `group`
  - `groupBys`: object[] — Define how to group the results of the query.
    [array of]
    - `type`: string **required** enum: `string`, `number`, `boolean`
    - `value`: string **required**
  - `havings`: object[] — Configure the Having clauses that filter on calculations in the query result.
    [array of]
    - `key`: string **required**
    - `operation`: string **required** enum: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`
    - `value`: number **required**
  - `limit`: integer — Set a limit on the number of results / records returned by the query
  - `needle`: object — Define an expression to search using full-text search.
    - `isRegex`: boolean
    - `matchCase`: boolean
    - `value`: any **required**
  - `orderBy`: object — Configure the order of the results returned by the query.
    - `order`: string enum: `asc`, `desc` — Set the order of the results
    - `value`: string **required** — Configure which Calculation to order the results by.
- `updated`: string **required**
- `updatedBy`: string **required**
