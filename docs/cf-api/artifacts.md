# Artifacts

19 endpoints.

## GET /accounts/{account_id}/artifacts/namespaces

List namespaces

operationId: `artifacts_namespaces_list` · query: `limit`, `cursor`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `jurisdiction`: string **required** enum: `unrestricted`, `us`, `eu`, `fedramp`
- `namespace`: string **required**
- `repo_count`: integer **required**
- `updated_at`: string **required**

## POST /accounts/{account_id}/artifacts/namespaces

Create a namespace

operationId: `artifacts_namespaces_create`

**Request** (application/json)

- `jurisdiction`: string enum: `unrestricted`, `us`, `eu`, `fedramp` default: `unrestricted`
- `namespace`: string **required**

**Response** 201 → `result`

- `created_at`: string **required**
- `jurisdiction`: string **required** enum: `unrestricted`, `us`, `eu`, `fedramp`
- `namespace`: string **required**
- `repo_count`: integer **required**
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/artifacts/namespaces/{namespace}

Delete a namespace

operationId: `artifacts_namespaces_delete`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}

Get a namespace

operationId: `artifacts_namespaces_get`

**Response** 200 → `result`

- `created_at`: string **required**
- `jurisdiction`: string **required** enum: `unrestricted`, `us`, `eu`, `fedramp`
- `namespace`: string **required**
- `repo_count`: integer **required**
- `updated_at`: string **required**

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos

List repositories

operationId: `artifacts_repos_list` · query: `limit`, `cursor`, `search`, `sort`, `direction`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `default_branch`: string **required** — Default branch name. Must not contain '..' and must not end with '/' or '.'.
- `description`: string **required**
- `id`: string **required**
- `last_push_at`: string **required**
- `name`: string **required**
- `read_only`: boolean **required**
- `remote`: string **required**
- `source`: string **required**
- `updated_at`: string **required**

## POST /accounts/{account_id}/artifacts/namespaces/{namespace}/repos

Create a repository

operationId: `artifacts_repos_create`

**Request** (application/json)

- `default_branch`: string — Git branch name. Must match /^[a-zA-Z0-9][a-zA-Z0-9._/-]*$/, must not contain '..', and must not end with '/' or '.'.
- `description`: string
- `name`: string **required**
- `read_only`: boolean

**Response** 201 → `result`

- `default_branch`: string **required**
- `description`: string **required**
- `id`: string **required**
- `name`: string **required**
- `remote`: string **required**
- `token`: string **required**

## DELETE /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}

Delete a repository

operationId: `artifacts_repos_delete`

**Response** 202 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}

Get a repository

operationId: `artifacts_repos_get`

**Response** 200 → `result`

- `created_at`: string **required**
- `default_branch`: string **required** — Default branch name. Must not contain '..' and must not end with '/' or '.'.
- `description`: string **required**
- `id`: string **required**
- `last_push_at`: string **required**
- `name`: string **required**
- `read_only`: boolean **required**
- `remote`: string **required**
- `source`: string **required**
- `updated_at`: string **required**

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/blob/{hash}

Read a Git blob

operationId: `artifacts_repos_blob_get`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/commit/{hash}

Read a Git commit

operationId: `artifacts_repos_commit_get`

**Response** 200 → `result`

- `author`: object **required**
  - `email`: string **required**
  - `name`: string **required**
- `authoredAt`: integer **required**
- `committedAt`: integer **required**
- `committer`: object **required**
  - `email`: string **required**
  - `name`: string **required**
- `hash`: string **required**
- `message`: string **required**
- `parents`: string[] **required**
  [array]
- `treeHash`: string **required**

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/file

Read a file

operationId: `artifacts_repos_file_get` · query: `ref`, `path`

**Response** 200 → `result`

string

## POST /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/fork

Fork a repository

operationId: `artifacts_repos_fork`

**Request** (application/json)

- `default_branch_only`: boolean
- `description`: string
- `name`: string **required**
- `read_only`: boolean

**Response** 201 → `result`

- `default_branch`: string **required**
- `description`: string **required**
- `id`: string **required**
- `name`: string **required**
- `objects`: integer **required**
- `remote`: string **required**
- `token`: string **required**

## POST /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/import

Import a repository

operationId: `artifacts_repos_import`

**Request** (application/json)

- `branch`: string — Git branch name. Must match /^[a-zA-Z0-9][a-zA-Z0-9._/-]*$/, must not contain '..', and must not end with '/' or '.'.
- `depth`: integer
- `read_only`: boolean
- `url`: string **required**

**Response** 201 → `result`

- `default_branch`: string **required**
- `description`: string **required**
- `id`: string **required**
- `name`: string **required**
- `remote`: string **required**
- `token`: string **required**

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/log

Read commit history

operationId: `artifacts_repos_log_get` · query: `ref`, `limit`, `offset`

**Response** 200 → `result`

[array of]
- `author`: object **required**
  - `email`: string **required**
  - `name`: string **required**
- `authoredAt`: integer **required**
- `committedAt`: integer **required**
- `committer`: object **required**
  - `email`: string **required**
  - `name`: string **required**
- `hash`: string **required**
- `message`: string **required**
- `parents`: string[] **required**
  [array]
- `treeHash`: string **required**

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/raw/{ref}/{path}

Read a raw file with content type

operationId: `artifacts_repos_raw_get`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/tokens

List repository tokens

operationId: `artifacts_repo_tokens_list` · query: `state`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `expires_at`: string **required**
- `id`: string **required**
- `scope`: string **required** enum: `read`, `write`
- `state`: string **required** enum: `active`, `expired`, `revoked`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/tree/{hash}

Read a Git tree

operationId: `artifacts_repos_tree_get`

**Response** 200 → `result`

[array of]
- `hash`: string **required**
- `mode`: string **required**
- `name`: string **required**
- `type`: string **required** enum: `tree`, `blob`, `symlink`, `gitlink`, `exec`

## POST /accounts/{account_id}/artifacts/namespaces/{namespace}/tokens

Create a repository token

operationId: `artifacts_tokens_create`

**Request** (application/json)

- `repo`: string **required**
- `scope`: string enum: `read`, `write`
- `ttl`: integer

**Response** 201 → `result`

- `expires_at`: string **required**
- `id`: string **required**
- `plaintext`: string **required**
- `scope`: string **required** enum: `read`, `write`

## DELETE /accounts/{account_id}/artifacts/namespaces/{namespace}/tokens/{id}

Revoke a token

operationId: `artifacts_tokens_revoke`

**Response** 200 → `result`

- `id`: string **required**
