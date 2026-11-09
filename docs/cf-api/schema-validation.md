# Schema Validation

7 endpoints.

## GET /zones/{zone_id}/schema_validation/schemas

List all uploaded schemas

operationId: `schema-validation-list-schemas-paginated` · query: `page`, `per_page`, `omit_source`, `validation_enabled`

**Response** 200 → `result`

[array of]
- `created_at`: any **required**
- `kind`: string **required** enum: `openapi_v3` — The kind of the schema
- `name`: string **required** — A human-readable name for the schema
- `schema_id`: string **required**
- `source`: string **required** — The raw schema, e.g., the OpenAPI schema, either as JSON or YAML
- `validation_enabled`: boolean — An indicator if this schema is enabled

## POST /zones/{zone_id}/schema_validation/schemas

Upload a schema

operationId: `schema-validation-create-schema`

**Request** (application/json)

- `kind`: string **required** enum: `openapi_v3` — The kind of the schema
- `name`: string **required** — A human-readable name for the schema
- `source`: string **required** — The raw schema, e.g., the OpenAPI schema, either as JSON or YAML
- `validation_enabled`: boolean **required** — An indicator if this schema is enabled

**Response** 200 → `result`

- `created_at`: any **required**
- `kind`: string **required** enum: `openapi_v3` — The kind of the schema
- `name`: string **required** — A human-readable name for the schema
- `schema_id`: string **required**
- `source`: string **required** — The raw schema, e.g., the OpenAPI schema, either as JSON or YAML
- `validation_enabled`: boolean — An indicator if this schema is enabled

## DELETE /zones/{zone_id}/schema_validation/schemas/{schema_id}

Delete a schema

operationId: `schema-validation-delete-schema`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/schema_validation/schemas/{schema_id}

Get details of a schema

operationId: `schema-validation-get-schema` · query: `omit_source`

**Response** 200 → `result`

- `created_at`: any **required**
- `kind`: string **required** enum: `openapi_v3` — The kind of the schema
- `name`: string **required** — A human-readable name for the schema
- `schema_id`: string **required**
- `source`: string **required** — The raw schema, e.g., the OpenAPI schema, either as JSON or YAML
- `validation_enabled`: boolean — An indicator if this schema is enabled

## PATCH /zones/{zone_id}/schema_validation/schemas/{schema_id}

Set schema validation state

operationId: `schema-validation-edit-schema`

**Request** (application/json)

- `validation_enabled`: boolean — Flag whether schema is enabled for validation.

**Response** 200 → `result`

- `created_at`: any **required**
- `kind`: string **required** enum: `openapi_v3` — The kind of the schema
- `name`: string **required** — A human-readable name for the schema
- `schema_id`: string **required**
- `source`: string **required** — The raw schema, e.g., the OpenAPI schema, either as JSON or YAML
- `validation_enabled`: boolean — An indicator if this schema is enabled

## GET /zones/{zone_id}/schema_validation/schemas/{schema_id}/operations

Retrieve all operations from the schema

operationId: `schema-validation-extract-operations-from-schema` · query: `feature`, `host`, `method`, `endpoint`, `page`, `per_page`, `operation_status`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `features`: object

## GET /zones/{zone_id}/schema_validation/schemas/hosts

List hosts covered by uploaded schemas

operationId: `schema-validation-list-schema-hosts` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: any **required**
- `hosts`: string[] **required** — Hosts serving the schema, e.g zone.host.com
  [array]
- `name`: string **required** — Name of the schema
- `schema_id`: string **required**
