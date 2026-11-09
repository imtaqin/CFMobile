# Repository Connections

2 endpoints.

## PUT /accounts/{account_id}/builds/repos/connections

Create or update a repository connection

operationId: `upsertRepoConnection`

**Request** (application/json)

- `provider_account_id`: string **required** — Provider-specific identifier of the account or namespace that owns the repository.
- `provider_account_name`: string **required** — Human-readable name of the account or namespace that owns the repository.
- `provider_type`: string **required** enum: `github`, `gitlab`, `gitlab_internal`, `origin` — Source control provider.
- `repo_id`: string **required** — Provider-specific repository identifier.
- `repo_name`: string **required** — Human-readable repository name.

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## DELETE /accounts/{account_id}/builds/repos/connections/{repo_connection_uuid}

Delete a repository connection

operationId: `deleteRepoConnection`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object
