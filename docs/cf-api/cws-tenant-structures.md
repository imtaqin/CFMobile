# CWS Tenant Structures

11 endpoints.

## GET /accounts/{account_id}/cws/tenant-structures

List tenant structures for an account

operationId: `cws-list-tenant-structures` · query: `cursor`, `per_page`, `order`, `direction`, `name`, `import_path`

**Response** 200 → `result`

[array of]
- `application`: string **required** enum: `aws`, `cloudflare` — Platform this structure models. Immutable after creation; determines valid node kinds and identifier formats.
- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `import_path`: string — Optional unique Rego mount path in the form tenant.<application>.<name>. The application segment must match application; omitted when unmoun
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/tenant-structures

Create a tenant structure

operationId: `cws-create-tenant-structure`

**Request** (application/json)

- `application`: string **required** enum: `aws`, `cloudflare` — Platform this structure models. Immutable after creation.
- `import_path`: string — Optional unique Rego mount path in the form tenant.<application>.<name>; application must match. Omit to leave unmounted.
- `name`: string **required** — Human-readable name; unique per account

**Response** 201 → `result`

- `application`: string **required** enum: `aws`, `cloudflare` — Platform this structure models. Immutable after creation; determines valid node kinds and identifier formats.
- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `import_path`: string — Optional unique Rego mount path in the form tenant.<application>.<name>. The application segment must match application; omitted when unmoun
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cws/tenant-structures/{structure_id}

Delete a tenant structure

operationId: `cws-delete-tenant-structure`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/tenant-structures/{structure_id}

Get a tenant structure by ID

operationId: `cws-get-tenant-structure`

**Response** 200 → `result`

- `application`: string **required** enum: `aws`, `cloudflare` — Platform this structure models. Immutable after creation; determines valid node kinds and identifier formats.
- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `import_path`: string — Optional unique Rego mount path in the form tenant.<application>.<name>. The application segment must match application; omitted when unmoun
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## PUT /accounts/{account_id}/cws/tenant-structures/{structure_id}

Update a tenant structure

operationId: `cws-update-tenant-structure`

**Request** (application/json)

- `application`: string **required** enum: `aws`, `cloudflare` — Platform this structure models. Must match the existing value.
- `import_path`: string — Optional unique Rego mount path in the form tenant.<application>.<name>; application must match. Omit to clear.
- `name`: string **required** — Human-readable name; unique per account

**Response** 200 → `result`

- `application`: string **required** enum: `aws`, `cloudflare` — Platform this structure models. Immutable after creation; determines valid node kinds and identifier formats.
- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `import_path`: string — Optional unique Rego mount path in the form tenant.<application>.<name>. The application segment must match application; omitted when unmoun
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## GET /accounts/{account_id}/cws/tenant-structures/{structure_id}/nodes

List nodes for a tenant structure

operationId: `cws-list-tenant-nodes` · query: `cursor`, `per_page`, `order`, `direction`, `node_kind`, `native_id`, `name`, `parent`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `name`: string — Display name (e.g. an OU or account name), mutable. Optional; empty by default.
- `native_id`: string **required** — Cloud-native identifier of this node, unique within the structure; the parent-reference target. Shape depends on the structure's application
- `node_kind`: string **required** — Position in the tree. Legal values depend on the structure's application (aws: root/ou/account; cloudflare: org/account/zone). At most one r
- `parent`: string — Native ID of this node's parent. Required for non-root nodes and omitted for the root. The parent must be in the same structure and able to 
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/tenant-structures/{structure_id}/nodes

Add a node to a tenant structure

operationId: `cws-create-tenant-node`

**Request** (application/json)

- `name`: string — Display name (e.g. an OU or account name), mutable. Optional; empty by default.
- `native_id`: string **required** — Cloud-native identifier of this node, unique within the structure; the parent-reference target. Shape depends on the structure's application
- `node_kind`: string **required** — Position in the tree. Legal values depend on the structure's application (aws: root/ou/account; cloudflare: org/account/zone). At most one r
- `parent`: string — Native ID of this node's parent. Required for non-root nodes and omitted for the root. The parent must be in the same structure and able to 

**Response** 201 → `result`

- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `name`: string — Display name (e.g. an OU or account name), mutable. Optional; empty by default.
- `native_id`: string **required** — Cloud-native identifier of this node, unique within the structure; the parent-reference target. Shape depends on the structure's application
- `node_kind`: string **required** — Position in the tree. Legal values depend on the structure's application (aws: root/ou/account; cloudflare: org/account/zone). At most one r
- `parent`: string — Native ID of this node's parent. Required for non-root nodes and omitted for the root. The parent must be in the same structure and able to 
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cws/tenant-structures/{structure_id}/nodes/{node_id}

Delete a tenant node

operationId: `cws-delete-tenant-node`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/tenant-structures/{structure_id}/nodes/{node_id}

Get a tenant node by ID

operationId: `cws-get-tenant-node`

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `name`: string — Display name (e.g. an OU or account name), mutable. Optional; empty by default.
- `native_id`: string **required** — Cloud-native identifier of this node, unique within the structure; the parent-reference target. Shape depends on the structure's application
- `node_kind`: string **required** — Position in the tree. Legal values depend on the structure's application (aws: root/ou/account; cloudflare: org/account/zone). At most one r
- `parent`: string — Native ID of this node's parent. Required for non-root nodes and omitted for the root. The parent must be in the same structure and able to 
- `updated_at`: string **required**

## PUT /accounts/{account_id}/cws/tenant-structures/{structure_id}/nodes/{node_id}

Update a tenant node

operationId: `cws-update-tenant-node`

**Request** (application/json)

- `name`: string — Display name (e.g. an OU or account name), mutable. Optional; empty by default.
- `native_id`: string **required** — Cloud-native identifier of this node, unique within the structure; the parent-reference target. Shape depends on the structure's application
- `node_kind`: string **required** — Position in the tree. Legal values depend on the structure's application (aws: root/ou/account; cloudflare: org/account/zone). At most one r
- `parent`: string — Native ID of this node's parent. Required for non-root nodes and omitted for the root. The parent must be in the same structure and able to 

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required** — Server-assigned UUID
- `name`: string — Display name (e.g. an OU or account name), mutable. Optional; empty by default.
- `native_id`: string **required** — Cloud-native identifier of this node, unique within the structure; the parent-reference target. Shape depends on the structure's application
- `node_kind`: string **required** — Position in the tree. Legal values depend on the structure's application (aws: root/ou/account; cloudflare: org/account/zone). At most one r
- `parent`: string — Native ID of this node's parent. Required for non-root nodes and omitted for the root. The parent must be in the same structure and able to 
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/tenant-structures/{structure_id}/nodes/batch

Apply a batch of tenant node mutations

operationId: `cws-batch-tenant-nodes`

**Request** (application/json)

- `creates`: object[] **required** — Nodes to create; parents may be created elsewhere in this request
  [array of]
  - `name`: string — Display name (e.g. an OU or account name), mutable. Optional; empty by default.
  - `native_id`: string **required** — Cloud-native identifier of this node, unique within the structure; the parent-reference target. Shape depends on the structure's application
  - `node_kind`: string **required** — Position in the tree. Legal values depend on the structure's application (aws: root/ou/account; cloudflare: org/account/zone). At most one r
  - `parent`: string — Native ID of this node's parent. Required for non-root nodes and omitted for the root. The parent must be in the same structure and able to 
- `deletes`: object[] **required** — Nodes to delete; every descendant that will not be reparented must also be deleted
  [array of]
  - `id`: string **required** — ID of the node to delete
- `updates`: object[] **required** — Nodes whose mutable fields should be fully replaced
  [array of]
  - `id`: string **required** — ID of the node to update
  - `name`: string — Full replacement display name
  - `parent`: string — Full replacement parent native ID; omit for the root

**Response** 200 → `result`

- `created`: object[] **required**
  [array of]
  - `created_at`: string **required**
  - `id`: string **required** — Server-assigned UUID
  - `name`: string — Display name (e.g. an OU or account name), mutable. Optional; empty by default.
  - `native_id`: string **required** — Cloud-native identifier of this node, unique within the structure; the parent-reference target. Shape depends on the structure's application
  - `node_kind`: string **required** — Position in the tree. Legal values depend on the structure's application (aws: root/ou/account; cloudflare: org/account/zone). At most one r
  - `parent`: string — Native ID of this node's parent. Required for non-root nodes and omitted for the root. The parent must be in the same structure and able to 
  - `updated_at`: string **required**
- `deleted`: object[] **required**
  [array of]
  - `id`: string **required**
- `updated`: object[] **required**
  [array of]
  - `created_at`: string **required**
  - `id`: string **required** — Server-assigned UUID
  - `name`: string — Display name (e.g. an OU or account name), mutable. Optional; empty by default.
  - `native_id`: string **required** — Cloud-native identifier of this node, unique within the structure; the parent-reference target. Shape depends on the structure's application
  - `node_kind`: string **required** — Position in the tree. Legal values depend on the structure's application (aws: root/ou/account; cloudflare: org/account/zone). At most one r
  - `parent`: string — Native ID of this node's parent. Required for non-root nodes and omitted for the root. The parent must be in the same structure and able to 
  - `updated_at`: string **required**
