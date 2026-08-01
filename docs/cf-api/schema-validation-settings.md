# Schema Validation Settings

8 endpoints.

## GET /zones/{zone_id}/schema_validation/settings

Get global schema validation settings

operationId: `schema-validation-get-settings`

## PATCH /zones/{zone_id}/schema_validation/settings

Edit global schema validation settings

operationId: `schema-validation-edit-settings`

## PUT /zones/{zone_id}/schema_validation/settings

Update global schema validation settings

operationId: `schema-validation-update-settings`

## GET /zones/{zone_id}/schema_validation/settings/operations

List per-operation schema validation settings

operationId: `schema-validation-list-per-operation-settings`

## PATCH /zones/{zone_id}/schema_validation/settings/operations

Bulk edit per-operation schema validation settings

operationId: `schema-validation-bulk-edit-per-operation-settings`

## DELETE /zones/{zone_id}/schema_validation/settings/operations/{operation_id}

Delete per-operation schema validation setting

operationId: `schema-validation-delete-per-operation-setting`

## GET /zones/{zone_id}/schema_validation/settings/operations/{operation_id}

Get per-operation schema validation setting

operationId: `schema-validation-get-per-operation-setting`

## PUT /zones/{zone_id}/schema_validation/settings/operations/{operation_id}

Update per-operation schema validation setting

operationId: `schema-validation-update-per-operation-setting`
