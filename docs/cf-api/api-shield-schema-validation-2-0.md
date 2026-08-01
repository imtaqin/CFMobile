# API Shield Schema Validation 2.0

13 endpoints.

## GET /zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation

Retrieve operation-level schema validation settings

operationId: `api-shield-schema-validation-retrieve-operation-level-settings`

## PUT /zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation

Update operation-level schema validation settings

operationId: `api-shield-schema-validation-update-operation-level-settings`

## PATCH /zones/{zone_id}/api_gateway/operations/schema_validation

Update multiple operation-level schema validation settings

operationId: `api-shield-schema-validation-update-multiple-operation-level-settings`

## GET /zones/{zone_id}/api_gateway/settings/schema_validation

Retrieve zone level schema validation settings

operationId: `api-shield-schema-validation-retrieve-zone-level-settings`

## PATCH /zones/{zone_id}/api_gateway/settings/schema_validation

Update zone level schema validation settings

operationId: `api-shield-schema-validation-patch-zone-level-settings`

## PUT /zones/{zone_id}/api_gateway/settings/schema_validation

Update zone level schema validation settings

operationId: `api-shield-schema-validation-update-zone-level-settings`

## GET /zones/{zone_id}/api_gateway/user_schemas

Retrieve information about all schemas on a zone

operationId: `api-shield-schema-validation-retrieve-information-about-all-schemas` · query: `validation_enabled`

## POST /zones/{zone_id}/api_gateway/user_schemas

Upload a schema to a zone

operationId: `api-shield-schema-validation-post-schema`

## DELETE /zones/{zone_id}/api_gateway/user_schemas/{schema_id}

Delete a schema

operationId: `api-shield-schema-delete-a-schema`

## GET /zones/{zone_id}/api_gateway/user_schemas/{schema_id}

Retrieve information about a specific schema on a zone

operationId: `api-shield-schema-validation-retrieve-information-about-specific-schema`

## PATCH /zones/{zone_id}/api_gateway/user_schemas/{schema_id}

Enable validation for a schema

operationId: `api-shield-schema-validation-enable-validation-for-a-schema`

## GET /zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations

Retrieve all operations from a schema.

operationId: `api-shield-schema-validation-extract-operations-from-schema` · query: `operation_status`

## GET /zones/{zone_id}/api_gateway/user_schemas/hosts

Retrieve schema hosts in a zone

operationId: `api-shield-schema-validation-retrieve-user-schema-hosts`
