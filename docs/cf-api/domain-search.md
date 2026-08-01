# domain_search

9 endpoints.

## GET /accounts/{account_id}/brand-protection/matches

Read matches for string queries by ID

operationId: `getAccountsAccountIdBrandProtectionMatches` · query: `id`, `offset`, `limit`, `include_domain_id`

## GET /accounts/{account_id}/brand-protection/matches/download

Download matches for string queries by ID

operationId: `getAccountsAccountIdBrandProtectionMatchesDownload` · query: `id`, `offset`, `limit`, `include_domain_id`

## DELETE /accounts/{account_id}/brand-protection/queries

Delete saved string queries by ID

operationId: `deleteAccountsAccountIdBrandProtectionQueries` · query: `id`, `tag`, `scan`

## GET /accounts/{account_id}/brand-protection/queries

Read string queries by ID

operationId: `getAccountsAccountIdBrandProtectionQueries`

## PATCH /accounts/{account_id}/brand-protection/queries

Update saved string queries by ID

operationId: `patchAccountsAccountIdBrandProtectionQueries`

## POST /accounts/{account_id}/brand-protection/queries

Create new saved string queries

operationId: `postAccountsAccountIdBrandProtectionQueries` · query: `id`, `tag`, `scan`

## POST /accounts/{account_id}/brand-protection/queries/bulk

Create new saved string queries in bulk

operationId: `postAccountsAccountIdBrandProtectionQueriesBulk`

## POST /accounts/{account_id}/brand-protection/search

Create new string queries

operationId: `postAccountsAccountIdBrandProtectionSearch`

## GET /accounts/{account_id}/brand-protection/total-queries

Read the total number of saved string queries

operationId: `getAccountsAccountIdBrandProtectionTotalQueries`
