# IP Address Management Service Bindings

5 endpoints.

## GET /accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings

List Service Bindings

operationId: `ip-address-management-service-bindings-list-service-bindings`

**Response** 200 → `result`

[array of]
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `id`: string — Identifier of a Service Binding.
- `provisioning`: object — Status of a Service Binding's deployment to the Cloudflare network
  - `state`: string enum: `provisioning`, `active`, `magic_transit_route_missing` — When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated
- `service_id`: string — Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
- `service_name`: string — Name of a service running on the Cloudflare network

## POST /accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings

Create Service Binding

operationId: `ip-address-management-service-bindings-create-service-binding`

**Request** (application/json)

- `cidr`: string **required** — IP Prefix in Classless Inter-Domain Routing format.
- `service_id`: string **required** — Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the

**Response** 201 → `result`

- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `id`: string — Identifier of a Service Binding.
- `provisioning`: object — Status of a Service Binding's deployment to the Cloudflare network
  - `state`: string enum: `provisioning`, `active`, `magic_transit_route_missing` — When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated
- `service_id`: string — Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
- `service_name`: string — Name of a service running on the Cloudflare network

## DELETE /accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings/{binding_id}

Delete Service Binding

operationId: `ip-address-management-service-bindings-delete-service-binding`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings/{binding_id}

Get Service Binding

operationId: `ip-address-management-service-bindings-get-service-binding`

**Response** 200 → `result`

- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `id`: string — Identifier of a Service Binding.
- `provisioning`: object — Status of a Service Binding's deployment to the Cloudflare network
  - `state`: string enum: `provisioning`, `active`, `magic_transit_route_missing` — When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated
- `service_id`: string — Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
- `service_name`: string — Name of a service running on the Cloudflare network

## GET /accounts/{account_id}/addressing/services

List Services

operationId: `ip-address-management-service-bindings-list-services`

**Response** 200 → `result`

[array of]
- `id`: string — Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
- `name`: string — Name of a service running on the Cloudflare network
