# Schema Validation

7 endpoints.

## GET /zones/{zone_id}/schema_validation/schemas

List all uploaded schemas

operationId: `schema-validation-list-schemas-paginated` · query: `validation_enabled`

## POST /zones/{zone_id}/schema_validation/schemas

Upload a schema

operationId: `schema-validation-create-schema`

## DELETE /zones/{zone_id}/schema_validation/schemas/{schema_id}

Delete a schema

operationId: `schema-validation-delete-schema`

## GET /zones/{zone_id}/schema_validation/schemas/{schema_id}

Get details of a schema

operationId: `schema-validation-get-schema`

## PATCH /zones/{zone_id}/schema_validation/schemas/{schema_id}

Edit details of a schema to enable validation

operationId: `schema-validation-edit-schema`

## GET /zones/{zone_id}/schema_validation/schemas/{schema_id}/operations

Retrieve all operations from the schema.

operationId: `schema-validation-extract-operations-from-schema` · query: `operation_status`

## GET /zones/{zone_id}/schema_validation/schemas/hosts

List hosts covered by uploaded schemas

operationId: `schema-validation-list-schema-hosts`
