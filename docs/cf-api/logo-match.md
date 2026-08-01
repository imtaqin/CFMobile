# logo_match

9 endpoints.

## GET /accounts/{account_id}/brand-protection/logo-matches

Read matches for logo queries by ID

operationId: `getAccountsAccountIdBrandProtectionLogoMatches` · query: `logo_id`, `offset`, `limit`

## GET /accounts/{account_id}/brand-protection/logo-matches/download

Download matches for logo queries by ID

operationId: `getAccountsAccountIdBrandProtectionLogoMatchesDownload` · query: `logo_id`, `offset`, `limit`

## GET /accounts/{account_id}/brand-protection/logos

Read all saved logo queries

operationId: `getAccountsAccountIdBrandProtectionLogos`

## POST /accounts/{account_id}/brand-protection/logos

Create new saved logo queries from image files

operationId: `postAccountsAccountIdBrandProtectionLogos` · query: `tag`, `match_type`, `threshold`

## DELETE /accounts/{account_id}/brand-protection/logos/{logo_id}

Delete saved logo queries by ID

operationId: `deleteAccountsAccountIdBrandProtectionLogosLogoId`

## GET /accounts/{account_id}/brand-protection/logos/{logo_id}

Read saved logo queries by ID

operationId: `getAccountsAccountIdBrandProtectionLogosLogoId`

## POST /accounts/{account_id}/brand-protection/scan-logo

Create new logo queries from image files

operationId: `postAccountsAccountIdBrandProtectionScanLogo`

## POST /accounts/{account_id}/brand-protection/scan-page

Create new logo queries from URLs

operationId: `postAccountsAccountIdBrandProtectionScanPage`

## GET /signed-url

Internal route for testing signed URLs

operationId: `getSignedUrl`
