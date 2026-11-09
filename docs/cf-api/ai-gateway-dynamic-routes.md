# AI Gateway Dynamic Routes

10 endpoints.

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes

List dynamic routes

operationId: `aig-config-list-gateway-dynamic-routes` · query: `page`, `per_page`

**Response** 200 → `result`

- `data`: object **required**
  - `order_by`: string **required**
  - `order_by_direction`: string **required**
  - `page`: number **required**
  - `per_page`: number **required**
  - `routes`: object[] **required**
    [array of]
    - `account_tag`: string **required**
    - `created_at`: string **required**
    - `deployment`: object **required**
    - `elements`: object[] **required**
    - `gateway_id`: string **required**
    - `id`: string **required**
    - `modified_at`: string **required**
    - `name`: string **required**
    - `version`: object **required**
- `success`: boolean **required**

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes

Create a dynamic route

operationId: `aig-config-post-gateway-dynamic-route`

**Request** (application/json)

- `elements`: object[] **required**
  [array of]
  - `id`: string **required**
  - `outputs`: object **required**
    - `next`: object **required**
  - `type`: string **required** enum: `start`
- `name`: string **required**

**Response** 200 → `result`

- `created_at`: string **required**
- `deployment`: object **required**
  - `created_at`: string **required**
  - `deployment_id`: string **required**
  - `version_id`: string **required**
- `elements`: object[] **required**
  [array of]
  - `id`: string **required**
  - `outputs`: object **required**
    - `next`: object **required**
  - `type`: string **required** enum: `start`
- `gateway_id`: string **required**
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**
- `version`: object **required**
  - `active`: string **required** enum: `true`, `false`
  - `created_at`: string **required**
  - `data`: string **required**
  - `is_valid`: boolean
  - `version_id`: string **required**

## DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}

Delete a dynamic route

operationId: `aig-config-delete-gateway-dynamic-route`

**Response** 200 → `result`

- `created_at`: string **required**
- `elements`: object[] **required**
  [array of]
  - `id`: string **required**
  - `outputs`: object **required**
    - `next`: object **required**
  - `type`: string **required** enum: `start`
- `gateway_id`: string **required**
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}

Get a dynamic route

operationId: `aig-config-get-gateway-dynamic-route`

**Response** 200 → `result`

- `created_at`: string **required**
- `deployment`: object **required**
  - `created_at`: string **required**
  - `deployment_id`: string **required**
  - `version_id`: string **required**
- `elements`: object[] **required**
  [array of]
  - `id`: string **required**
  - `outputs`: object **required**
    - `next`: object **required**
  - `type`: string **required** enum: `start`
- `gateway_id`: string **required**
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**
- `version`: object **required**
  - `active`: string **required** enum: `true`, `false`
  - `created_at`: string **required**
  - `data`: string **required**
  - `is_valid`: boolean
  - `version_id`: string **required**

## PATCH /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}

Rename a dynamic route

operationId: `aig-config-update-gateway-dynamic-route`

**Request** (application/json)

- `name`: string **required**

**Response** 200 → `result`

- `route`: object **required**
  - `account_tag`: string **required**
  - `created_at`: string **required**
  - `deployment`: object **required**
    - `created_at`: string **required**
    - `deployment_id`: string **required**
    - `version_id`: string **required**
  - `elements`: object[] **required**
    [array of]
    - `id`: string **required**
    - `outputs`: object **required**
    - `type`: string **required** enum: `start`
  - `gateway_id`: string **required**
  - `id`: string **required**
  - `modified_at`: string **required**
  - `name`: string **required**
  - `version`: object **required**
    - `active`: string **required** enum: `true`, `false`
    - `created_at`: string **required**
    - `data`: string **required**
    - `is_valid`: boolean
    - `version_id`: string **required**
- `success`: boolean **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/deployments

List dynamic route deployments

operationId: `aig-config-list-gateway-dynamic-route-deployments`

**Response** 200 → `result`

- `data`: object **required**
  - `deployments`: object[] **required**
    [array of]
    - `created_at`: string **required**
    - `deployment_id`: string **required**
    - `version_id`: string **required**
  - `order_by`: string **required**
  - `order_by_direction`: string **required**
  - `page`: number **required**
  - `per_page`: number **required**
- `success`: boolean **required**

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/deployments

Deploy a dynamic route version

operationId: `aig-config-post-gateway-dynamic-route-deployment`

**Request** (application/json)

- `version_id`: string **required**

**Response** 200 → `result`

- `created_at`: string **required**
- `elements`: object[] **required**
  [array of]
  - `id`: string **required**
  - `outputs`: object **required**
    - `next`: object **required**
  - `type`: string **required** enum: `start`
- `gateway_id`: string **required**
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions

List dynamic route versions

operationId: `aig-config-list-gateway-dynamic-route-versions`

**Response** 200 → `result`

- `data`: object **required**
  - `order_by`: string **required**
  - `order_by_direction`: string **required**
  - `page`: number **required**
  - `per_page`: number **required**
  - `versions`: object[] **required**
    [array of]
    - `active`: string **required** enum: `true`, `false`
    - `created_at`: string **required**
    - `data`: string **required**
    - `is_valid`: boolean
    - `version_id`: string **required**
- `success`: boolean **required**

## POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions

Create a dynamic route version

operationId: `aig-config-post-gateway-dynamic-route-version`

**Request** (application/json)

- `elements`: object[] **required**
  [array of]
  - `id`: string **required**
  - `outputs`: object **required**
    - `next`: object **required**
  - `type`: string **required** enum: `start`

**Response** 200 → `result`

- `created_at`: string **required**
- `elements`: object[] **required**
  [array of]
  - `id`: string **required**
  - `outputs`: object **required**
    - `next`: object **required**
  - `type`: string **required** enum: `start`
- `gateway_id`: string **required**
- `id`: string **required**
- `modified_at`: string **required**
- `name`: string **required**

## GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions/{version_id}

Get a dynamic route version

operationId: `aig-config-get-gateway-dynamic-route-version`

**Response** 200 → `result`

- `active`: string **required** enum: `true`, `false`
- `created_at`: string **required**
- `data`: string **required**
- `elements`: object[] **required**
  [array of]
  - `id`: string **required**
  - `outputs`: object **required**
    - `next`: object **required**
  - `type`: string **required** enum: `start`
- `gateway_id`: string **required**
- `id`: string **required**
- `is_valid`: boolean
- `modified_at`: string **required**
- `name`: string **required**
- `version_id`: string **required**
