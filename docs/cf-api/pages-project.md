# Pages Project

8 endpoints.

## GET /accounts/{account_id}/pages/projects

Get projects

operationId: `pages-project-get-projects` · query: `page`, `per_page`

## POST /accounts/{account_id}/pages/projects

Create project

operationId: `pages-project-create-project`

## DELETE /accounts/{account_id}/pages/projects/{project_name}

Delete project

operationId: `pages-project-delete-project`

## GET /accounts/{account_id}/pages/projects/{project_name}

Get project

operationId: `pages-project-get-project`

## PATCH /accounts/{account_id}/pages/projects/{project_name}

Update project

operationId: `pages-project-update-project`

## DELETE /accounts/{account_id}/pages/projects/{project_name}/source

Disconnect project source

operationId: `pages-project-disconnect-project-source`

## POST /accounts/{account_id}/pages/projects/{project_name}/source

Connect project source

operationId: `pages-project-connect-project-source`

## GET /accounts/{account_id}/pages/projects/{project_name}/upload-token

Get upload token

operationId: `pages-project-get-upload-token`
