# CWS Deployments

5 endpoints.

## GET /accounts/{account_id}/cws/deployments

List deployments

operationId: `cws-list-deployments` · query: `cursor`, `per_page`, `order`, `direction`, `name`

**Response** 200 → `result`

[array of]
- `basic_auth_credential_ids`: string[] **required** — IDs of basic-auth credentials attached to this deployment
  [array]
- `created_at`: string **required**
- `default_mode`: string **required** enum: `ALLOW`, `BLOCK` — Default traffic decision when no policy set matches
- `description`: string — Optional free-form description.
- `domain_acl_id`: string — ID of the attached domain ACL. Omitted when none.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `on_error_action`: string **required** enum: `BLOCK`, `SKIP` — Action applied when an enforcing policy has a runtime Rego error
- `policy_set_ids`: string[] **required** — IDs of policy sets attached to this deployment
  [array]
- `rego_raise_error`: boolean **required** — Whether OPA builtin failures are raised as runtime evaluation errors
- `tags`: object **required** — Tags attached to this deployment
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/deployments

Create a new deployment

operationId: `cws-create-deployment`

**Request** (application/json)

- `basic_auth_credential_ids`: string[] **required** — IDs of basic-auth credentials to attach
  [array]
- `default_mode`: string **required** enum: `ALLOW`, `BLOCK` — Default traffic mode: ALLOW or BLOCK
- `description`: string — Optional free-form description.
- `domain_acl_id`: string — ID of the domain ACL to attach (omit or null for none)
- `name`: string **required** — Name of the deployment
- `on_error_action`: string enum: `BLOCK`, `SKIP` default: `BLOCK` — Action for runtime Rego errors. Omit to use BLOCK.
- `policy_set_ids`: string[] **required** — IDs of policy sets to attach
  [array]
- `rego_raise_error`: boolean default: `true` — Whether OPA builtin failures are raised as runtime evaluation errors. Omit to use the default true value.
- `tags`: object — Tags to attach. Keys are limited to 256 UTF-8 bytes and values to 1024 UTF-8 bytes.

**Response** 201 → `result`

- `basic_auth_credential_ids`: string[] **required** — IDs of basic-auth credentials attached to this deployment
  [array]
- `created_at`: string **required**
- `default_mode`: string **required** enum: `ALLOW`, `BLOCK` — Default traffic decision when no policy set matches
- `description`: string — Optional free-form description.
- `domain_acl_id`: string — ID of the attached domain ACL. Omitted when none.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `on_error_action`: string **required** enum: `BLOCK`, `SKIP` — Action applied when an enforcing policy has a runtime Rego error
- `policy_set_ids`: string[] **required** — IDs of policy sets attached to this deployment
  [array]
- `rego_raise_error`: boolean **required** — Whether OPA builtin failures are raised as runtime evaluation errors
- `tags`: object **required** — Tags attached to this deployment
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cws/deployments/{deployment_id}

Delete a deployment

operationId: `cws-delete-deployment`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/deployments/{deployment_id}

Get a deployment by ID

operationId: `cws-get-deployment`

**Response** 200 → `result`

- `basic_auth_credential_ids`: string[] **required** — IDs of basic-auth credentials attached to this deployment
  [array]
- `created_at`: string **required**
- `default_mode`: string **required** enum: `ALLOW`, `BLOCK` — Default traffic decision when no policy set matches
- `description`: string — Optional free-form description.
- `domain_acl_id`: string — ID of the attached domain ACL. Omitted when none.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `on_error_action`: string **required** enum: `BLOCK`, `SKIP` — Action applied when an enforcing policy has a runtime Rego error
- `policy_set_ids`: string[] **required** — IDs of policy sets attached to this deployment
  [array]
- `rego_raise_error`: boolean **required** — Whether OPA builtin failures are raised as runtime evaluation errors
- `tags`: object **required** — Tags attached to this deployment
- `updated_at`: string **required**

## PUT /accounts/{account_id}/cws/deployments/{deployment_id}

Update a deployment

operationId: `cws-update-deployment`

**Request** (application/json)

- `basic_auth_credential_ids`: string[] **required** — Replacement set of basic-auth credential IDs
  [array]
- `default_mode`: string **required** enum: `ALLOW`, `BLOCK` — Default traffic mode: ALLOW or BLOCK
- `description`: string — Optional free-form description.
- `domain_acl_id`: string — ID of the domain ACL to attach (omit or null to clear)
- `name`: string **required** — Name of the deployment
- `on_error_action`: string enum: `BLOCK`, `SKIP` default: `BLOCK` — Action for runtime Rego errors. Omit to reset to BLOCK.
- `policy_set_ids`: string[] **required** — Replacement set of policy set IDs
  [array]
- `rego_raise_error`: boolean default: `true` — Whether OPA builtin failures are raised as runtime evaluation errors. Omit to reset to true.
- `tags`: object — Replacement tag set. Omit or use {} to clear. Keys are limited to 256 UTF-8 bytes and values to 1024 UTF-8 bytes.

**Response** 200 → `result`

- `basic_auth_credential_ids`: string[] **required** — IDs of basic-auth credentials attached to this deployment
  [array]
- `created_at`: string **required**
- `default_mode`: string **required** enum: `ALLOW`, `BLOCK` — Default traffic decision when no policy set matches
- `description`: string — Optional free-form description.
- `domain_acl_id`: string — ID of the attached domain ACL. Omitted when none.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `on_error_action`: string **required** enum: `BLOCK`, `SKIP` — Action applied when an enforcing policy has a runtime Rego error
- `policy_set_ids`: string[] **required** — IDs of policy sets attached to this deployment
  [array]
- `rego_raise_error`: boolean **required** — Whether OPA builtin failures are raised as runtime evaluation errors
- `tags`: object **required** — Tags attached to this deployment
- `updated_at`: string **required**
