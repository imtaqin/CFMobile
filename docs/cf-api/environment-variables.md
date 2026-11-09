# Environment Variables

3 endpoints.

## GET /accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables

List build variables

operationId: `listEnvironmentVariables`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PATCH /accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables

Set build variables

operationId: `upsertEnvironmentVariables`

**Request** (application/json)

object

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## DELETE /accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables/{environment_variable_key}

Delete a build variable

operationId: `deleteEnvironmentVariable`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object
