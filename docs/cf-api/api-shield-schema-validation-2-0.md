# API Shield Schema Validation 2.0

13 endpoints.

## GET /zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation

Retrieve operation-level schema validation settings

operationId: `api-shield-schema-validation-retrieve-operation-level-settings`

**Response** 200 → `result`

- `mitigation_action`: string enum: `log`, `block`, `none`, `null` — When set, this applies a mitigation action to this operation
- `operation_id`: any

## PUT /zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation

Update operation-level schema validation settings

operationId: `api-shield-schema-validation-update-operation-level-settings`

**Request** (application/json)

- `mitigation_action`: string enum: `log`, `block`, `none`, `null` — When set, this applies a mitigation action to this operation

**Response** 200 → `result`

- `mitigation_action`: string enum: `log`, `block`, `none`, `null` — When set, this applies a mitigation action to this operation
- `operation_id`: any

## PATCH /zones/{zone_id}/api_gateway/operations/schema_validation

Update multiple operation-level schema validation settings

operationId: `api-shield-schema-validation-update-multiple-operation-level-settings`

**Request** (application/json)

object

**Response** 200 → `result`

object

## GET /zones/{zone_id}/api_gateway/settings/schema_validation

Retrieve zone level schema validation settings

operationId: `api-shield-schema-validation-retrieve-zone-level-settings`

**Response** 200 → `result`

- `validation_default_mitigation_action`: string enum: `none`, `log`, `block` — The default mitigation action used when there is no mitigation action defined on the operation
- `validation_override_mitigation_action`: string enum: `none`, `null` — When set, this overrides both zone level and operation level mitigation actions.

## PATCH /zones/{zone_id}/api_gateway/settings/schema_validation

Update zone level schema validation settings

operationId: `api-shield-schema-validation-patch-zone-level-settings`

**Request** (application/json)

- `validation_default_mitigation_action`: string enum: `none`, `log`, `block`, `null` — The default mitigation action used when there is no mitigation action defined on the operation
- `validation_override_mitigation_action`: string enum: `none`, `disable_override`, `null` — When set, this overrides both zone level and operation level mitigation actions.

**Response** 200 → `result`

- `validation_default_mitigation_action`: string enum: `none`, `log`, `block` — The default mitigation action used when there is no mitigation action defined on the operation
- `validation_override_mitigation_action`: string enum: `none`, `null` — When set, this overrides both zone level and operation level mitigation actions.

## PUT /zones/{zone_id}/api_gateway/settings/schema_validation

Update zone level schema validation settings

operationId: `api-shield-schema-validation-update-zone-level-settings`

**Request** (application/json)

- `validation_default_mitigation_action`: string **required** enum: `none`, `log`, `block` — The default mitigation action used when there is no mitigation action defined on the operation
- `validation_override_mitigation_action`: string enum: `none`, `disable_override`, `null` — When set, this overrides both zone level and operation level mitigation actions.

**Response** 200 → `result`

- `validation_default_mitigation_action`: string enum: `none`, `log`, `block` — The default mitigation action used when there is no mitigation action defined on the operation
- `validation_override_mitigation_action`: string enum: `none`, `null` — When set, this overrides both zone level and operation level mitigation actions.

## GET /zones/{zone_id}/api_gateway/user_schemas

Retrieve information about all schemas on a zone

operationId: `api-shield-schema-validation-retrieve-information-about-all-schemas` · query: `page`, `per_page`, `omit_source`, `validation_enabled`

**Response** 200 → `result`

[array of]
- `created_at`: any **required**
- `kind`: string **required** enum: `openapi_v3` — Kind of schema
- `name`: string **required** — Name of the schema
- `schema_id`: any **required**
- `source`: string — Source of the schema
- `validation_enabled`: boolean — Flag whether schema is enabled for validation.

## POST /zones/{zone_id}/api_gateway/user_schemas

Upload a legacy schema

operationId: `api-shield-schema-validation-post-schema`

**Request** (multipart/form-data)

- `file`: string **required** — Schema file bytes
- `kind`: string **required** enum: `openapi_v3` — Kind of schema
- `name`: string — Name of the schema
- `validation_enabled`: string enum: `true`, `false` — Flag whether schema is enabled for validation.

**Response** 200 → `result`

- `schema`: object **required**
  - `created_at`: any **required**
  - `kind`: string **required** enum: `openapi_v3` — Kind of schema
  - `name`: string **required** — Name of the schema
  - `schema_id`: any **required**
  - `source`: string — Source of the schema
  - `validation_enabled`: boolean — Flag whether schema is enabled for validation.
- `upload_details`: object
  - `warnings`: object[] — Diagnostic warning events that occurred during processing. These events are non-critical errors found within the schema.
    [array of]
    - `code`: integer **required** — Code that identifies the event that occurred.
    - `locations`: string[] — JSONPath location(s) in the schema where these events were encountered.  See [https://goessner.net/articles/JsonPath/](https://goessner.net/
    - `message`: string — Diagnostic message that describes the event.

## DELETE /zones/{zone_id}/api_gateway/user_schemas/{schema_id}

Delete a schema

operationId: `api-shield-schema-delete-a-schema`

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

## GET /zones/{zone_id}/api_gateway/user_schemas/{schema_id}

Retrieve information about a specific schema on a zone

operationId: `api-shield-schema-validation-retrieve-information-about-specific-schema` · query: `omit_source`

**Response** 200 → `result`

- `created_at`: any **required**
- `kind`: string **required** enum: `openapi_v3` — Kind of schema
- `name`: string **required** — Name of the schema
- `schema_id`: any **required**
- `source`: string — Source of the schema
- `validation_enabled`: boolean — Flag whether schema is enabled for validation.

## PATCH /zones/{zone_id}/api_gateway/user_schemas/{schema_id}

Enable validation for a schema

operationId: `api-shield-schema-validation-enable-validation-for-a-schema`

**Request** (application/json)

- `validation_enabled`: any

**Response** 200 → `result`

- `created_at`: any **required**
- `kind`: string **required** enum: `openapi_v3` — Kind of schema
- `name`: string **required** — Name of the schema
- `schema_id`: any **required**
- `source`: string — Source of the schema
- `validation_enabled`: boolean — Flag whether schema is enabled for validation.

## GET /zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations

Retrieve all operations from a schema

operationId: `api-shield-schema-validation-extract-operations-from-schema` · query: `feature`, `host`, `method`, `endpoint`, `page`, `per_page`, `operation_status`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `features`: object

## GET /zones/{zone_id}/api_gateway/user_schemas/hosts

Retrieve schema hosts in a zone

operationId: `api-shield-schema-validation-retrieve-user-schema-hosts` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: any **required**
- `hosts`: string[] **required** — Hosts serving the schema, e.g zone.host.com
  [array]
- `name`: string **required** — Name of the schema
- `schema_id`: any **required**
