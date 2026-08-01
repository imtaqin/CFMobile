# Applications

19 endpoints.

## GET /accounts/{account_id}/containers/applications

List Applications associated with your account

operationId: `listApplications` · query: `name`, `image`, `label`

## POST /accounts/{account_id}/containers/applications

Create a new application

operationId: `createApplication`

## DELETE /accounts/{account_id}/containers/applications/{application_id}

Delete a single application by id

operationId: `deleteApplication`

## GET /accounts/{account_id}/containers/applications/{application_id}

Get a single application by id

operationId: `getApplication`

## PATCH /accounts/{account_id}/containers/applications/{application_id}

Modify an application

operationId: `modifyApplication`

## GET /accounts/{account_id}/containers/applications/{application_id}/instances

List container instances

operationId: `listContainerInstances` · query: `per_page`, `page_token`

## POST /accounts/{account_id}/containers/applications/{application_id}/instances

Create a container instance

operationId: `createContainerInstance`

## DELETE /accounts/{account_id}/containers/applications/{application_id}/instances/{instance_id}

Delete a container instance

operationId: `deleteContainerInstance`

## GET /accounts/{account_id}/containers/applications/{application_id}/instances/{instance_id}

Get a container instance

operationId: `getContainerInstance`

## POST /accounts/{account_id}/containers/applications/{application_id}/instances/{instance_id}/exec

Execute a command in a container instance

operationId: `containerInstanceExec`

## POST /accounts/{account_id}/containers/applications/{application_id}/instances/{instance_id}/fetch

Proxy a request to a container instance

operationId: `containerInstanceFetch`

## POST /accounts/{account_id}/containers/applications/{application_id}/rollouts

Create a new rollout for an application

operationId: `createApplicationRollout`

## GET /accounts/{account_id}/containers/applications/{application_id}/versions

List all application versions

operationId: `listApplicationVersions`

## GET /accounts/{account_id}/one/applications

List applications

operationId: `list_applications_v2` · query: `environment`

## GET /accounts/{account_id}/one/applications/{application_id}

Get application details

operationId: `get_application_v2`

## GET /accounts/{account_id}/one/applications/{application_id}/auth-methods

Get auth methods

operationId: `get_application_auth_methods_v2`

## GET /accounts/{account_id}/one/applications/{application_id}/setup-flows

Get application setup flows

operationId: `get_application_setup_flows_v2` · query: `auth_method`, `environment`

## GET /accounts/{account_id}/resource-library/applications

List applications

operationId: `getApplications` · query: `filter`, `limit`, `offset`, `order_by`, `search`

## GET /accounts/{account_id}/resource-library/applications/{id}

Get application

operationId: `getApplicationById`
