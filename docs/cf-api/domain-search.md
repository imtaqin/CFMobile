# domain_search

11 endpoints.

## GET /accounts/{account_id}/brand-protection/matches

Read matches for string queries by ID

operationId: `getAccountsAccountIdBrandProtectionMatches` · query: `id`, `offset`, `limit`, `include_domain_id`, `include_dismissed`

**Response** 200 → `result`

- `matches`: object[]
  [array]
- `total`: integer

## GET /accounts/{account_id}/brand-protection/matches/download

Download matches for string queries by ID

operationId: `getAccountsAccountIdBrandProtectionMatchesDownload` · query: `id`, `offset`, `limit`, `include_domain_id`, `include_dismissed`

**Response** 200 → `result`

- `matches`: object[]
  [array]
- `total`: integer

## DELETE /accounts/{account_id}/brand-protection/queries

Delete saved string queries by ID

operationId: `deleteAccountsAccountIdBrandProtectionQueries` · query: `id`, `tag`, `scan`

## GET /accounts/{account_id}/brand-protection/queries

Read string queries by ID

operationId: `getAccountsAccountIdBrandProtectionQueries`

## PATCH /accounts/{account_id}/brand-protection/queries

Update saved string queries by ID

operationId: `patchAccountsAccountIdBrandProtectionQueries`

**Request** (application/json)

- `id`: integer — The query ID to update (required when updating tag or scan).
- `scan`: boolean — Whether to scan matches.
- `string_matches`: object[] — Updated pattern match constraints. When provided, replaces the existing string_matches.
  [array of]
  - `max_edit_distance`: number — Maximum Levenshtein edit distance for fuzzy matching.
  - `pattern`: string **required** — The pattern to match against.
- `tag`: string — Query tag. Required as identifier when updating string_matches.

## POST /accounts/{account_id}/brand-protection/queries

Create new saved string queries

operationId: `postAccountsAccountIdBrandProtectionQueries` · query: `id`, `tag`, `scan`

**Request** (application/json)

- `max_time`: string
- `min_time`: string
- `scan`: boolean
- `string_matches`: object[]
  [array of]
  - `max_edit_distance`: number
  - `pattern`: string **required**
- `tag`: string

## POST /accounts/{account_id}/brand-protection/queries/{query_id}/matches/{domain_id}/dismiss

Dismiss a match for a saved string query

operationId: `postAccountsAccountIdBrandProtectionQueriesQueryIdMatchesDomainIdDismiss`

## POST /accounts/{account_id}/brand-protection/queries/{query_id}/matches/{domain_id}/undismiss

Undismiss a match for a saved string query

operationId: `postAccountsAccountIdBrandProtectionQueriesQueryIdMatchesDomainIdUndismiss`

## POST /accounts/{account_id}/brand-protection/queries/bulk

Create new saved string queries in bulk

operationId: `postAccountsAccountIdBrandProtectionQueriesBulk`

**Request** (application/json)

- `queries`: object[]
  [array]

## POST /accounts/{account_id}/brand-protection/search

Create new string queries

operationId: `postAccountsAccountIdBrandProtectionSearch`

## GET /accounts/{account_id}/brand-protection/total-queries

Read the total number of saved string queries

operationId: `getAccountsAccountIdBrandProtectionTotalQueries`
