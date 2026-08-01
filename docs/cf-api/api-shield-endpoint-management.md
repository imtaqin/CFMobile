# API Shield Endpoint Management

7 endpoints.

## DELETE /zones/{zone_id}/api_gateway/operations

Delete multiple operations

operationId: `api-shield-endpoint-management-delete-multiple-operations`

## GET /zones/{zone_id}/api_gateway/operations

Retrieve information about all operations on a zone

operationId: `api-shield-endpoint-management-retrieve-information-about-all-operations-on-a-zone` · query: `order`

## POST /zones/{zone_id}/api_gateway/operations

Add operations to a zone

operationId: `api-shield-endpoint-management-add-operations-to-a-zone`

## DELETE /zones/{zone_id}/api_gateway/operations/{operation_id}

Delete an operation

operationId: `api-shield-endpoint-management-delete-an-operation`

## GET /zones/{zone_id}/api_gateway/operations/{operation_id}

Retrieve information about an operation

operationId: `api-shield-endpoint-management-retrieve-information-about-an-operation`

## POST /zones/{zone_id}/api_gateway/operations/item

Add one operation to a zone

operationId: `api-shield-endpoint-management-add-operation-to-a-zone`

## GET /zones/{zone_id}/api_gateway/schemas

Retrieve operations and features as OpenAPI schemas

operationId: `api-shield-endpoint-management-retrieve-operations-and-features-as-open-api-schemas` · query: `host`, `include_schema_kind`
