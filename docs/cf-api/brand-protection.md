# brand_protection

23 endpoints.

## GET /accounts/{account_id}/brand-protection/alerts

Read all alerts on submitted domains

operationId: `getAccountsAccountIdBrandProtectionAlerts`

## PATCH /accounts/{account_id}/brand-protection/alerts

Update alerts on submitted domains by ID

operationId: `patchAccountsAccountIdBrandProtectionAlerts`

## PATCH /accounts/{account_id}/brand-protection/alerts/clear

Update verification statuses of tracked URLs to awaiting by ID

operationId: `patchAccountsAccountIdBrandProtectionAlertsClear`

## PATCH /accounts/{account_id}/brand-protection/alerts/refute

Update verification statuses of tracked URLs to disproven by ID

operationId: `patchAccountsAccountIdBrandProtectionAlertsRefute`

## PATCH /accounts/{account_id}/brand-protection/alerts/verify

Update verification statuses of tracked URLs to confirmed by ID

operationId: `patchAccountsAccountIdBrandProtectionAlertsVerify`

## DELETE /accounts/{account_id}/brand-protection/brands

Delete brands by ID

operationId: `deleteAccountsAccountIdBrandProtectionBrands`

## GET /accounts/{account_id}/brand-protection/brands

Read all brands

operationId: `getAccountsAccountIdBrandProtectionBrands`

## POST /accounts/{account_id}/brand-protection/brands

Create new brands

operationId: `postAccountsAccountIdBrandProtectionBrands`

## DELETE /accounts/{account_id}/brand-protection/brands/patterns

Delete patterns for brands by ID

operationId: `deleteAccountsAccountIdBrandProtectionBrandsPatterns`

## GET /accounts/{account_id}/brand-protection/brands/patterns

Read patterns for brands by ID

operationId: `getAccountsAccountIdBrandProtectionBrandsPatterns`

## POST /accounts/{account_id}/brand-protection/brands/patterns

Create new patterns for brands by ID

operationId: `postAccountsAccountIdBrandProtectionBrandsPatterns`

## PATCH /accounts/{account_id}/brand-protection/clear

Update verification statuses of submitted URLs to awaiting by ID

operationId: `patchAccountsAccountIdBrandProtectionClear`

## GET /accounts/{account_id}/brand-protection/domain-info

Read submitted domains by ID

operationId: `getAccountsAccountIdBrandProtectionDomainInfo`

## GET /accounts/{account_id}/brand-protection/recent-submissions

Read recent URL submissions

operationId: `getAccountsAccountIdBrandProtectionRecentSubmissions`

## PATCH /accounts/{account_id}/brand-protection/refute

Update verification statuses of submitted URLs to disproven by ID

operationId: `patchAccountsAccountIdBrandProtectionRefute`

## GET /accounts/{account_id}/brand-protection/submission-info

Read URL submissions by ID

operationId: `getAccountsAccountIdBrandProtectionSubmissionInfo`

## POST /accounts/{account_id}/brand-protection/submit

Create new URL submissions

operationId: `postAccountsAccountIdBrandProtectionSubmit`

## GET /accounts/{account_id}/brand-protection/tracked-domains

Read submitted domains by pattern

operationId: `getAccountsAccountIdBrandProtectionTrackedDomains`

## GET /accounts/{account_id}/brand-protection/url-info

Read submitted URLs by ID

operationId: `getAccountsAccountIdBrandProtectionUrlInfo`

## PATCH /accounts/{account_id}/brand-protection/verify

Update verification statuses of submitted URLs to confirmed by ID

operationId: `patchAccountsAccountIdBrandProtectionVerify`

## POST /internal/submit

Internal route for testing URL submissions

operationId: `postInternalSubmit`

## GET /live

Run liveness checks

operationId: `getLive`

## GET /ready

Run readiness checks

operationId: `getReady`
