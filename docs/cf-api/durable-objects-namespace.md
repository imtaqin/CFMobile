# Durable Objects Namespace

3 endpoints.

## GET /accounts/{account_id}/workers/durable_objects/namespaces

List Durable Object Namespaces

operationId: `durable-objects-namespace-list-namespaces` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `class`: string
- `id`: string
- `name`: string
- `script`: string
- `use_sqlite`: boolean

## GET /accounts/{account_id}/workers/durable_objects/namespaces/{id}/objects

List Objects in a Durable Object namespace

operationId: `durable-objects-namespace-list-objects` · query: `limit`, `cursor`

**Response** 200 → `result`

[array of]
- `hasStoredData`: boolean — Whether the Durable Object has stored data.
- `id`: string — ID of the Durable Object.

## POST /accounts/{account_id}/workers/durable_objects/namespaces/{id}/query/v2

Query a Durable Object

operationId: `durable-objects-namespace-query`

**Request** (application/json)

(one of 2 variants; showing the first)
- `durable_object_id`: string **required**
- `queries`: object[] **required**
  [array of]
  - `params`: object[] — Values bound to the `?` placeholders in `sql`, in order.
    [array]
  - `sql`: string **required**

**Response** 200 → `result`

- `error`: string — The error that stopped the queries. Omitted when every query succeeds.
- `results`: object[] **required** — One entry per query, in request order.
  [array of]
  - `columns`: string[] **required**
    [array]
  - `meta`: object **required**
    - `rows_read`: number
    - `rows_written`: number
  - `rows`: array[] **required** — Each row lists its values in column order.
    [array of]
    [array]
