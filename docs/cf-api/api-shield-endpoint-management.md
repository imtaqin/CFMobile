# API Shield Endpoint Management

7 endpoints.

## DELETE /zones/{zone_id}/api_gateway/operations

Delete web or API operations

operationId: `api-shield-endpoint-management-delete-multiple-operations`

**Request** (application/json)

[array of]
- `operation_id`: any **required**

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /zones/{zone_id}/api_gateway/operations

List web and API operations

operationId: `api-shield-endpoint-management-retrieve-information-about-all-operations-on-a-zone` · query: `page`, `per_page`, `order`, `direction`, `host`, `method`, `endpoint`, `feature`

**Response** 200 → `result`

[array of]
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `features`: object

## POST /zones/{zone_id}/api_gateway/operations

Create web or API operations

operationId: `api-shield-endpoint-management-add-operations-to-a-zone`

**Request** (application/json)

[array of]
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.

**Response** 200 → `result`

[array of]
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `features`: object

## DELETE /zones/{zone_id}/api_gateway/operations/{operation_id}

Delete a web or API operation

operationId: `api-shield-endpoint-management-delete-an-operation`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /zones/{zone_id}/api_gateway/operations/{operation_id}

Get a web or API operation

operationId: `api-shield-endpoint-management-retrieve-information-about-an-operation` · query: `feature`, `with_schemas`

**Response** 200 → `result`

- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `features`: object
- `schemas`: object — OpenAPI JSON schemas for an operation, including both user-uploaded and Cloudflare-learned schemas.
  - `learned`: object — An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifi
    - `parameters`: object[] — OpenAPI parameter objects describing path, query, header, or cookie parameters.
    - `requestBody`: object — OpenAPI request body object describing the expected request payload.
  - `uploaded`: object — An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifi
    - `parameters`: object[] — OpenAPI parameter objects describing path, query, header, or cookie parameters.
    - `requestBody`: object — OpenAPI request body object describing the expected request payload.

## POST /zones/{zone_id}/api_gateway/operations/item

Create a web or API operation

operationId: `api-shield-endpoint-management-add-operation-to-a-zone`

**Request** (application/json)

- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.

**Response** 200 → `result`

- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `features`: object
- `schemas`: object — OpenAPI JSON schemas for an operation, including both user-uploaded and Cloudflare-learned schemas.
  - `learned`: object — An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifi
    - `parameters`: object[] — OpenAPI parameter objects describing path, query, header, or cookie parameters.
    - `requestBody`: object — OpenAPI request body object describing the expected request payload.
  - `uploaded`: object — An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifi
    - `parameters`: object[] — OpenAPI parameter objects describing path, query, header, or cookie parameters.
    - `requestBody`: object — OpenAPI request body object describing the expected request payload.

## GET /zones/{zone_id}/api_gateway/schemas

Export web and API operations as OpenAPI schemas

operationId: `api-shield-endpoint-management-retrieve-operations-and-features-as-open-api-schemas` · query: `host`, `feature`, `include_schema_kind`

**Response** 200 → `result`

- `schemas`: object[]
  [array]
- `timestamp`: string
