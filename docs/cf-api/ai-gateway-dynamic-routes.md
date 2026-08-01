# AI Gateway Dynamic Routes

10 endpoints.

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes

List all AI Gateway Dynamic Routes.

operationId: `aig-config-list-gateway-dynamic-routes` · query: `page`, `per_page`

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes

Create a new AI Gateway Dynamic Route.

operationId: `aig-config-post-gateway-dynamic-route`

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}

Delete an AI Gateway Dynamic Route.

operationId: `aig-config-delete-gateway-dynamic-route`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}

Get an AI Gateway Dynamic Route.

operationId: `aig-config-get-gateway-dynamic-route`

## PATCH /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}

Update an AI Gateway Dynamic Route.

operationId: `aig-config-update-gateway-dynamic-route`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/deployments

List all AI Gateway Dynamic Route Deployments.

operationId: `aig-config-list-gateway-dynamic-route-deployments`

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/deployments

Create a new AI Gateway Dynamic Route Deployment.

operationId: `aig-config-post-gateway-dynamic-route-deployment`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions

List all AI Gateway Dynamic Route Versions.

operationId: `aig-config-list-gateway-dynamic-route-versions`

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions

Create a new AI Gateway Dynamic Route Version.

operationId: `aig-config-post-gateway-dynamic-route-version`

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions/{version_id}

Get an AI Gateway Dynamic Route Version.

operationId: `aig-config-get-gateway-dynamic-route-version`
