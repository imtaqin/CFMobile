# Schema Validation Settings

8 endpoints.

## GET /zones/{zone_id}/schema_validation/settings

Get global schema validation settings

operationId: `schema-validation-get-settings`

**Response** 200 → `result`

- `validation_default_mitigation_action`: string **required** enum: `none`, `log`, `block` — The default mitigation action used
- `validation_override_mitigation_action`: string enum: `none`, `null` — When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema

## PATCH /zones/{zone_id}/schema_validation/settings

Edit global schema validation settings

operationId: `schema-validation-edit-settings`

**Request** (application/json)

- `validation_default_mitigation_action`: string enum: `none`, `log`, `block` — The default mitigation action used
- `validation_override_mitigation_action`: string enum: `none`, `null` — When set, this overrides both zone level and operation level mitigation actions.

**Response** 200 → `result`

- `validation_default_mitigation_action`: string **required** enum: `none`, `log`, `block` — The default mitigation action used
- `validation_override_mitigation_action`: string enum: `none`, `null` — When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema

## PUT /zones/{zone_id}/schema_validation/settings

Update global schema validation settings

operationId: `schema-validation-update-settings`

**Request** (application/json)

- `validation_default_mitigation_action`: string enum: `none`, `log`, `block` — The default mitigation action used
- `validation_override_mitigation_action`: string enum: `none`, `null` — When set, this overrides both zone level and operation level mitigation actions.
object

**Response** 200 → `result`

- `validation_default_mitigation_action`: string **required** enum: `none`, `log`, `block` — The default mitigation action used
- `validation_override_mitigation_action`: string enum: `none`, `null` — When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema

## GET /zones/{zone_id}/schema_validation/settings/operations

List per-operation schema validation settings

operationId: `schema-validation-list-per-operation-settings` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `mitigation_action`: string **required** enum: `log`, `block`, `none` — When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation
- `operation_id`: any **required**

## PATCH /zones/{zone_id}/schema_validation/settings/operations

Bulk edit per-operation schema validation settings

operationId: `schema-validation-bulk-edit-per-operation-settings`

**Request** (application/json)

object

**Response** 200 → `result`

object

## DELETE /zones/{zone_id}/schema_validation/settings/operations/{operation_id}

Delete per-operation schema validation setting

operationId: `schema-validation-delete-per-operation-setting`

**Response** 200 → `result`

- `operation_id`: any

## GET /zones/{zone_id}/schema_validation/settings/operations/{operation_id}

Get per-operation schema validation setting

operationId: `schema-validation-get-per-operation-setting`

**Response** 200 → `result`

- `mitigation_action`: string **required** enum: `log`, `block`, `none` — When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation
- `operation_id`: any **required**

## PUT /zones/{zone_id}/schema_validation/settings/operations/{operation_id}

Update per-operation schema validation setting

operationId: `schema-validation-update-per-operation-setting`

**Request** (application/json)

- `mitigation_action`: string enum: `log`, `block`, `none`, `null` — When set, this applies a mitigation action to this operation
object

**Response** 200 → `result`

- `mitigation_action`: string **required** enum: `log`, `block`, `none` — When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation
- `operation_id`: any **required**
