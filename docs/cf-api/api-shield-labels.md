# API Shield Labels

16 endpoints.

## GET /zones/{zone_id}/api_gateway/labels

List operation labels

operationId: `api-shield-labels-get-labels` · query: `page`, `per_page`, `order`, `direction`, `source`, `filter`, `with_mapped_resource_counts`

**Response** 200 → `result`

[array of]
- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user
- `mapped_resources`: object — Provides counts of what resources are linked to this label

## GET /zones/{zone_id}/api_gateway/labels/managed/{name}

Get a managed operation label

operationId: `api-shield-labels-get-managed-label` · query: `with_mapped_resource_counts`

**Response** 200 → `result`

- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user
- `mapped_resources`: object — Provides counts of what resources are linked to this label
- `source`: string

## PUT /zones/{zone_id}/api_gateway/labels/managed/{name}/resources/operation

Replace operations attached to a managed label

operationId: `api-shield-labels-replace-operations-attached-to-managed-label`

**Request** (application/json)

- `selector`: object **required** — Operation IDs selector
  - `include`: object **required**
    - `operation_ids`: object[] **required**

**Response** 200 → `result`

- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user
- `mapped_resources`: object — Provides counts of what resources are linked to this label
- `source`: string

## DELETE /zones/{zone_id}/api_gateway/labels/user

Delete user-defined operation labels

operationId: `api-shield-labels-delete-user-labels`

**Request** (application/json)

[array of]
string

**Response** 200 → `result`

[array of]
- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## POST /zones/{zone_id}/api_gateway/labels/user

Create user-defined operation labels

operationId: `api-shield-labels-create-user-labels`

**Request** (application/json)

[array of]
- `description`: string — The description of the label
- `metadata`: object — Metadata for the label
- `name`: string **required** — The name of the label

**Response** 200 → `result`

[array of]
- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## DELETE /zones/{zone_id}/api_gateway/labels/user/{name}

Delete a user-defined operation label

operationId: `api-shield-delete-user-label`

**Response** 200 → `result`

- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## GET /zones/{zone_id}/api_gateway/labels/user/{name}

Get a user-defined operation label

operationId: `api-shield-labels-get-user-label` · query: `with_mapped_resource_counts`

**Response** 200 → `result`

- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user
- `mapped_resources`: object — Provides counts of what resources are linked to this label

## PATCH /zones/{zone_id}/api_gateway/labels/user/{name}

Edit a user-defined operation label

operationId: `api-shield-patch-user-label`

**Request** (application/json)

- `description`: string — The description of the label
- `metadata`: object — Metadata for the label

**Response** 200 → `result`

- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## PUT /zones/{zone_id}/api_gateway/labels/user/{name}

Update a user-defined operation label

operationId: `api-shield-put-user-label`

**Request** (application/json)

- `description`: string — The description of the label
- `metadata`: object — Metadata for the label

**Response** 200 → `result`

- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## PUT /zones/{zone_id}/api_gateway/labels/user/{name}/resources/operation

Replace operations attached to a user-defined label

operationId: `api-shield-labels-replace-operations-attached-to-user-label`

**Request** (application/json)

- `selector`: object **required** — Operation IDs selector
  - `include`: object **required**
    - `operation_ids`: object[] **required**

**Response** 200 → `result`

- `created_at`: any **required**
- `description`: string **required** — The description of the label
- `last_updated`: any **required**
- `metadata`: object **required** — Metadata for the label
- `name`: string **required** — The name of the label
- `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user
- `mapped_resources`: object — Provides counts of what resources are linked to this label

## DELETE /zones/{zone_id}/api_gateway/operations/{operation_id}/labels

Remove labels from a web or API operation

operationId: `api-shield-operations-delete-labels-from-operation`

**Request** (application/json)

- `managed`: string[] — List of managed label names.
  [array]
- `user`: string[] — List of user label names.
  [array]

**Response** 200 → `result`

- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `labels`: object[]
  [array of]
  - `created_at`: any **required**
  - `description`: string **required** — The description of the label
  - `last_updated`: any **required**
  - `metadata`: object **required** — Metadata for the label
  - `name`: string **required** — The name of the label
  - `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## POST /zones/{zone_id}/api_gateway/operations/{operation_id}/labels

Attach labels to a web or API operation

operationId: `api-shield-operations-post-labels-to-operation`

**Request** (application/json)

- `managed`: string[] — List of managed label names.
  [array]
- `user`: string[] — List of user label names.
  [array]

**Response** 200 → `result`

- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `labels`: object[]
  [array of]
  - `created_at`: any **required**
  - `description`: string **required** — The description of the label
  - `last_updated`: any **required**
  - `metadata`: object **required** — Metadata for the label
  - `name`: string **required** — The name of the label
  - `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## PUT /zones/{zone_id}/api_gateway/operations/{operation_id}/labels

Replace labels on a web or API operation

operationId: `api-shield-operations-put-labels-to-operation`

**Request** (application/json)

- `managed`: string[] — List of managed label names. Omitting this property or passing an empty array will result in all managed labels being removed from the opera
  [array]
- `user`: string[] — List of user label names. Omitting this property or passing an empty array will result in all user labels being removed from the operation
  [array]

**Response** 200 → `result`

- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `labels`: object[]
  [array of]
  - `created_at`: any **required**
  - `description`: string **required** — The description of the label
  - `last_updated`: any **required**
  - `metadata`: object **required** — Metadata for the label
  - `name`: string **required** — The name of the label
  - `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## DELETE /zones/{zone_id}/api_gateway/operations/labels

Remove labels from web or API operations

operationId: `api-shield-operations-bulk-delete-labels-to-operations`

**Request** (application/json)

- `managed`: object
  - `labels`: string[] — List of managed label names.
    [array]
- `selector`: object **required** — Operation IDs selector
  - `include`: object **required**
    - `operation_ids`: object[] **required**
- `user`: object
  - `labels`: string[] — List of user label names.
    [array]

**Response** 200 → `result`

[array of]
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `labels`: object[]
  [array of]
  - `created_at`: any **required**
  - `description`: string **required** — The description of the label
  - `last_updated`: any **required**
  - `metadata`: object **required** — Metadata for the label
  - `name`: string **required** — The name of the label
  - `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## POST /zones/{zone_id}/api_gateway/operations/labels

Attach labels to web or API operations

operationId: `api-shield-operations-bulk-post-labels-to-operations`

**Request** (application/json)

- `managed`: object
  - `labels`: string[] — List of managed label names.
    [array]
- `selector`: object **required** — Operation IDs selector
  - `include`: object **required**
    - `operation_ids`: object[] **required**
- `user`: object
  - `labels`: string[] — List of user label names.
    [array]

**Response** 200 → `result`

[array of]
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `labels`: object[]
  [array of]
  - `created_at`: any **required**
  - `description`: string **required** — The description of the label
  - `last_updated`: any **required**
  - `metadata`: object **required** — Metadata for the label
  - `name`: string **required** — The name of the label
  - `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user

## PUT /zones/{zone_id}/api_gateway/operations/labels

Replace labels on web or API operations

operationId: `api-shield-operations-bulk-put-labels-to-operations`

**Request** (application/json)

- `managed`: object **required** — Managed labels to replace for all affected operations
  - `labels`: string[] **required** — List of managed label names. Providing an empty array will result in all managed labels being removed from all affected operations
    [array]
- `selector`: object **required** — Operation IDs selector
  - `include`: object **required**
    - `operation_ids`: object[] **required**
- `user`: object **required** — User labels to replace for all affected operations
  - `labels`: string[] **required** — List of user label names. Providing an empty array will result in all user labels being removed from all affected operations
    [array]

**Response** 200 → `result`

[array of]
- `endpoint`: string **required** — The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with
- `host`: string **required** — RFC3986-compliant host.
- `method`: string **required** enum: `GET`, `POST`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`, `CONNECT`, `PATCH` — The HTTP method used to access the endpoint.
- `last_updated`: any **required**
- `operation_id`: any **required**
- `labels`: object[]
  [array of]
  - `created_at`: any **required**
  - `description`: string **required** — The description of the label
  - `last_updated`: any **required**
  - `metadata`: object **required** — Metadata for the label
  - `name`: string **required** — The name of the label
  - `source`: string **required** enum: `user`, `managed` — * `user` - label is owned by the user
