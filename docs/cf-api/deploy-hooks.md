# Deploy Hooks

6 endpoints.

## GET /accounts/{account_id}/builds/workers/{script_name}/deploy_hooks

List deploy hooks

operationId: `listDeployHooks`

## POST /accounts/{account_id}/builds/workers/{script_name}/deploy_hooks

Create deploy hook

operationId: `createDeployHook`

## DELETE /accounts/{account_id}/builds/workers/{script_name}/deploy_hooks/{deploy_hook_uuid}

Delete deploy hook

operationId: `deleteDeployHook`

## GET /accounts/{account_id}/builds/workers/{script_name}/deploy_hooks/{deploy_hook_uuid}

Get deploy hook

operationId: `getDeployHook`

## PUT /accounts/{account_id}/builds/workers/{script_name}/deploy_hooks/{deploy_hook_uuid}

Update deploy hook

operationId: `updateDeployHook`

## POST /workers/builds/deploy_hooks/{deploy_hook_uuid}

Trigger deploy hook

operationId: `triggerDeployHook`
