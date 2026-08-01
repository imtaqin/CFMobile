# Pages Deployment

9 endpoints.

## GET /accounts/{account_id}/pages/projects/{project_name}/deployments

Get deployments

operationId: `pages-deployment-get-deployments` · query: `env`, `page`, `per_page`

## POST /accounts/{account_id}/pages/projects/{project_name}/deployments

Create deployment

operationId: `pages-deployment-create-deployment`

## DELETE /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}

Delete deployment

operationId: `pages-deployment-delete-deployment` · query: `force`

## GET /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}

Get deployment info

operationId: `pages-deployment-get-deployment-info`

## GET /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/history/logs

Get deployment logs

operationId: `pages-deployment-get-deployment-logs`

## POST /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/retry

Retry deployment

operationId: `pages-deployment-retry-deployment`

## POST /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/rollback

Rollback deployment

operationId: `pages-deployment-rollback-deployment`

## POST /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/tails

Create deployment tail

operationId: `pages-deployment-create-tail`

## DELETE /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/tails/{tail_id}

Delete deployment tail

operationId: `pages-deployment-delete-tail`
