# CWS Policies

5 endpoints.

## GET /accounts/{account_id}/cws/policies

List policies

operationId: `cws-list-policies` · query: `cursor`, `per_page`, `order`, `direction`, `name`, `policy_set_id`, `package_path`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `entrypoint`: string **required** — Non-function rule declared in rego_source. Evaluation uses data.<package_path>.<entrypoint>.
- `filter`: string **required** — Filter expression that determines whether this policy applies. Maximum 4096 UTF-8 bytes.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `package_path`: string **required** — Dotted path derived from rego_source. Begins with policy. and is unique per account.
- `rego_source`: string **required** — Inline Rego source with a package beginning with "policy." Maximum 16384 UTF-8 bytes.
- `tags`: object **required** — Tags attached to this policy
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/policies

Create a new policy

operationId: `cws-create-policy`

**Request** (application/json)

- `description`: string — Optional free-form description.
- `entrypoint`: string **required** — Non-function rule declared in rego_source. Evaluation uses data.<package_path>.<entrypoint>.
- `filter`: string **required** — Filter expression that determines whether this policy applies. Maximum 4096 UTF-8 bytes.
- `name`: string **required** — Name of the policy
- `rego_source`: string **required** — Inline Rego source with a package beginning with "policy." Maximum 16384 UTF-8 bytes.
- `tags`: object — Tags to attach. Keys are limited to 256 UTF-8 bytes and values to 1024 UTF-8 bytes.

**Response** 201 → `result`

- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `entrypoint`: string **required** — Non-function rule declared in rego_source. Evaluation uses data.<package_path>.<entrypoint>.
- `filter`: string **required** — Filter expression that determines whether this policy applies. Maximum 4096 UTF-8 bytes.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `package_path`: string **required** — Dotted path derived from rego_source. Begins with policy. and is unique per account.
- `rego_source`: string **required** — Inline Rego source with a package beginning with "policy." Maximum 16384 UTF-8 bytes.
- `tags`: object **required** — Tags attached to this policy
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cws/policies/{policy_id}

Delete a policy

operationId: `cws-delete-policy`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/policies/{policy_id}

Get a policy by ID

operationId: `cws-get-policy`

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `entrypoint`: string **required** — Non-function rule declared in rego_source. Evaluation uses data.<package_path>.<entrypoint>.
- `filter`: string **required** — Filter expression that determines whether this policy applies. Maximum 4096 UTF-8 bytes.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `package_path`: string **required** — Dotted path derived from rego_source. Begins with policy. and is unique per account.
- `rego_source`: string **required** — Inline Rego source with a package beginning with "policy." Maximum 16384 UTF-8 bytes.
- `tags`: object **required** — Tags attached to this policy
- `updated_at`: string **required**

## PUT /accounts/{account_id}/cws/policies/{policy_id}

Update a policy

operationId: `cws-update-policy`

**Request** (application/json)

- `description`: string — Optional free-form description.
- `entrypoint`: string **required** — Non-function rule declared in rego_source. Evaluation uses data.<package_path>.<entrypoint>.
- `filter`: string **required** — Filter expression that determines whether this policy applies. Maximum 4096 UTF-8 bytes.
- `name`: string **required** — Name of the policy
- `rego_source`: string **required** — Inline Rego source with a package beginning with "policy." Maximum 16384 UTF-8 bytes.
- `tags`: object — Replacement tag set. Omit or use {} to clear. Keys are limited to 256 UTF-8 bytes and values to 1024 UTF-8 bytes.

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string — Optional free-form description.
- `entrypoint`: string **required** — Non-function rule declared in rego_source. Evaluation uses data.<package_path>.<entrypoint>.
- `filter`: string **required** — Filter expression that determines whether this policy applies. Maximum 4096 UTF-8 bytes.
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `package_path`: string **required** — Dotted path derived from rego_source. Begins with policy. and is unique per account.
- `rego_source`: string **required** — Inline Rego source with a package beginning with "policy." Maximum 16384 UTF-8 bytes.
- `tags`: object **required** — Tags attached to this policy
- `updated_at`: string **required**
