# Environment Variables

3 endpoints.

## GET /accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables

List environment variables

operationId: `listEnvironmentVariables`

## PATCH /accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables

Upsert environment variables

operationId: `upsertEnvironmentVariables`

## DELETE /accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables/{environment_variable_key}

Delete environment variable

operationId: `deleteEnvironmentVariable`
