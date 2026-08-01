# Artifacts

17 endpoints.

## GET /accounts/{account_id}/artifacts/namespaces

List namespaces

operationId: `artifacts_namespaces_list` · query: `limit`, `cursor`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}

Get a namespace

operationId: `artifacts_namespaces_get`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos

List repositories

operationId: `artifacts_repos_list` · query: `limit`, `cursor`, `search`, `sort`, `direction`

## POST /accounts/{account_id}/artifacts/namespaces/{namespace}/repos

Create a repository

operationId: `artifacts_repos_create`

## DELETE /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}

Delete a repository

operationId: `artifacts_repos_delete`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}

Get a repository

operationId: `artifacts_repos_get`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/blob/{hash}

Read a Git blob

operationId: `artifacts_repos_blob_get`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/commit/{hash}

Read a Git commit

operationId: `artifacts_repos_commit_get`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/file

Read a file

operationId: `artifacts_repos_file_get` · query: `ref`, `path`

## POST /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/fork

Fork a repository

operationId: `artifacts_repos_fork`

## POST /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/import

Import a repository

operationId: `artifacts_repos_import`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/log

Read commit history

operationId: `artifacts_repos_log_get` · query: `ref`, `limit`, `offset`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/raw/{ref}/{path}

Read a raw file with content type

operationId: `artifacts_repos_raw_get`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/tokens

List repository tokens

operationId: `artifacts_repo_tokens_list` · query: `state`, `page`, `per_page`

## GET /accounts/{account_id}/artifacts/namespaces/{namespace}/repos/{name}/tree/{hash}

Read a Git tree

operationId: `artifacts_repos_tree_get`

## POST /accounts/{account_id}/artifacts/namespaces/{namespace}/tokens

Create a repository token

operationId: `artifacts_tokens_create`

## DELETE /accounts/{account_id}/artifacts/namespaces/{namespace}/tokens/{id}

Revoke a token

operationId: `artifacts_tokens_revoke`
