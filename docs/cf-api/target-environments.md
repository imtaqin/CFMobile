# Target Environments

6 endpoints.

## GET /accounts/{account_id}/vuln_scanner/target_environments

List target environments

operationId: `list-target-environments` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `description`: string — Optional description providing additional context.
- `id`: string **required** — Target environment identifier.
- `name`: string **required** — Human-readable name.
- `target`: any **required** — Identifies the Cloudflare asset to scan. Uses a `type` discriminator.

## POST /accounts/{account_id}/vuln_scanner/target_environments

Create target environment

operationId: `create-target-environment`

**Request** (application/json)

- `description`: string — Optional description.
- `name`: string **required** — Human-readable name.
- `target`: any **required** — Identifies the Cloudflare asset to scan. Uses a `type` discriminator.

**Response** 200 → `result`

- `description`: string — Optional description providing additional context.
- `id`: string **required** — Target environment identifier.
- `name`: string **required** — Human-readable name.
- `target`: any **required** — Identifies the Cloudflare asset to scan. Uses a `type` discriminator.

## DELETE /accounts/{account_id}/vuln_scanner/target_environments/{target_environment_id}

Delete target environment

operationId: `delete-target-environment`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/vuln_scanner/target_environments/{target_environment_id}

Get target environment

operationId: `get-target-environment`

**Response** 200 → `result`

- `description`: string — Optional description providing additional context.
- `id`: string **required** — Target environment identifier.
- `name`: string **required** — Human-readable name.
- `target`: any **required** — Identifies the Cloudflare asset to scan. Uses a `type` discriminator.

## PATCH /accounts/{account_id}/vuln_scanner/target_environments/{target_environment_id}

Edit target environment

operationId: `edit-target-environment`

**Request** (application/json)

- `description`: string — Optional description. Omit to leave unchanged, set to `null`
- `name`: string — Human-readable name.
- `target`: any — Identifies the Cloudflare asset to scan. Uses a `type` discriminator.

**Response** 200 → `result`

- `description`: string — Optional description providing additional context.
- `id`: string **required** — Target environment identifier.
- `name`: string **required** — Human-readable name.
- `target`: any **required** — Identifies the Cloudflare asset to scan. Uses a `type` discriminator.

## PUT /accounts/{account_id}/vuln_scanner/target_environments/{target_environment_id}

Update target environment

operationId: `update-target-environment`

**Request** (application/json)

- `description`: string — Optional description.
- `name`: string **required** — Human-readable name.
- `target`: any **required** — Identifies the Cloudflare asset to scan. Uses a `type` discriminator.

**Response** 200 → `result`

- `description`: string — Optional description providing additional context.
- `id`: string **required** — Target environment identifier.
- `name`: string **required** — Human-readable name.
- `target`: any **required** — Identifies the Cloudflare asset to scan. Uses a `type` discriminator.
