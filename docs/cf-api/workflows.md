# Workflows

24 endpoints.

## DELETE /accounts/{account_id}/triggers/{script_name}

Delete script triggers

operationId: `wor-delete-script-triggers`

## GET /accounts/{account_id}/triggers/{script_name}

Get script triggers

operationId: `wor-get-script-triggers`

## PATCH /accounts/{account_id}/triggers/{script_name}

Add script triggers

operationId: `wor-add-script-triggers`

## PUT /accounts/{account_id}/triggers/{script_name}

Replace script triggers

operationId: `wor-replace-script-triggers`

## GET /accounts/{account_id}/workflows

List all Workflows

operationId: `wor-list-workflows` · query: `per_page`, `page`, `search`

## DELETE /accounts/{account_id}/workflows/{workflow_name}

Deletes a Workflow

operationId: `wor-delete-workflow`

## GET /accounts/{account_id}/workflows/{workflow_name}

Get Workflow details

operationId: `wor-get-workflow-details`

## PUT /accounts/{account_id}/workflows/{workflow_name}

Create/modify Workflow

operationId: `wor-create-or-modify-workflow`

## GET /accounts/{account_id}/workflows/{workflow_name}/instances

List of workflow instances

operationId: `wor-list-workflow-instances` · query: `page`, `per_page`, `cursor`, `direction`, `status`, `date_start`, `date_end`

## POST /accounts/{account_id}/workflows/{workflow_name}/instances

Create a new workflow instance

operationId: `wor-create-new-workflow-instance`

## DELETE /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}

Delete a workflow instance

operationId: `wor-delete-workflow-instance`

## GET /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}

Get logs and status from instance

operationId: `wor-describe-workflow-instance` · query: `simple`, `order`

## POST /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/events/{event_type}

Send event to instance

operationId: `wor-send-event-workflow-instance`

## PATCH /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/status

Change status of instance

operationId: `wor-change-status-workflow-instance`

## GET /accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/step

Get full step output from instance

operationId: `wor-get-workflow-instance-step` · query: `name`, `type`, `attempt`

## POST /accounts/{account_id}/workflows/{workflow_name}/instances/batch

Batch create new Workflow instances

operationId: `wor-batch-create-workflow-instance`

## POST /accounts/{account_id}/workflows/{workflow_name}/instances/batch/terminate

Batch terminate instances of a workflow

operationId: `wor-batch-terminate-workflow-instances`

## GET /accounts/{account_id}/workflows/{workflow_name}/instances/terminate

Get status of the job responsible for terminate all instances of a workflow

operationId: `wor-status-terminate-workflow-instances`

## GET /accounts/{account_id}/workflows/{workflow_name}/versions

List deployed Workflow versions

operationId: `wor-list-workflow-versions` · query: `per_page`, `page`

## GET /accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}

Get Workflow version details

operationId: `wor-describe-workflow-versions`

## GET /accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}/dag

Get Workflow version dag

operationId: `wor-describe-workflow-versions-dag`

## GET /accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}/graph

Get Workflow version graph

operationId: `wor-describe-workflow-versions-graph`

## GET /accounts/{account_id}/workflows/settings

Get account settings

operationId: `wor-get-workflow-settings`

## PATCH /accounts/{account_id}/workflows/settings

Update account settings

operationId: `wor-update-workflow-settings`
