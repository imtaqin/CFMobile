# API Shield API Discovery

5 endpoints.

## GET /zones/{zone_id}/api_gateway/discovery

Export discovered API operations as OpenAPI schemas

operationId: `api-shield-api-discovery-retrieve-discovered-operations-on-a-zone-as-openapi`

**Response** 200 → `result`

- `schemas`: object[] **required**
  [array]
- `timestamp`: any **required**

## GET /zones/{zone_id}/api_gateway/discovery/operations

List discovered web and API operations

operationId: `api-shield-api-discovery-retrieve-discovered-operations-on-a-zone` · query: `page`, `per_page`, `host`, `method`, `endpoint`, `direction`, `order`, `diff`, `origin`, `state`

**Response** 200 → `result`

[array of]
- `features`: object
  - `traffic_stats`: object
    - `last_updated`: any **required**
    - `period_seconds`: integer **required** — The period in seconds these statistics were computed over
    - `requests`: number **required** — The average number of requests seen during this period
- `id`: any **required**
- `last_updated`: any **required**
- `origin`: string[] **required** — API discovery engine(s) that discovered this operation
  [array]
- `state`: string **required** enum: `review`, `saved`, `ignored` — State of operation in API Discovery
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.

## PATCH /zones/{zone_id}/api_gateway/discovery/operations

Edit discovered web and API operations

operationId: `api-shield-api-patch-discovered-operations`

**Request** (application/json)

object

**Response** 200 → `result`

object

## GET /zones/{zone_id}/api_gateway/discovery/operations/{discovery_id}

Get a discovered web or API operation

operationId: `api-shield-api-discovery-retrieve-discovered-operation-by-id`

**Response** 200 → `result`

[array of]
- `features`: object
  - `traffic_stats`: object
    - `last_updated`: any **required**
    - `period_seconds`: integer **required** — The period in seconds these statistics were computed over
    - `requests`: number **required** — The average number of requests seen during this period
- `id`: any **required**
- `last_updated`: any **required**
- `origin`: string[] **required** — API discovery engine(s) that discovered this operation
  [array]
- `state`: string **required** enum: `review`, `saved`, `ignored` — State of operation in API Discovery
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.

## PATCH /zones/{zone_id}/api_gateway/discovery/operations/{discovery_id}

Edit a discovered web or API operation

operationId: `api-shield-api-patch-discovered-operation`

**Request** (application/json)

- `state`: any

**Response** 200 → `result`

- `state`: string enum: `review`, `saved`, `ignored` — State of operation in API Discovery
