# Triggers

5 endpoints.

## POST /accounts/{account_id}/builds/triggers

Create trigger

operationId: `createTrigger`

## DELETE /accounts/{account_id}/builds/triggers/{trigger_uuid}

Delete trigger

operationId: `deleteTrigger`

## PATCH /accounts/{account_id}/builds/triggers/{trigger_uuid}

Update trigger

operationId: `updateTrigger`

## POST /accounts/{account_id}/builds/triggers/{trigger_uuid}/builds

Create manual build

operationId: `createManualBuild`

## POST /accounts/{account_id}/builds/triggers/{trigger_uuid}/purge_build_cache

Purge build cache

operationId: `purgeBuildCache`
