# DLP Settings

8 endpoints.

## GET /accounts/{account_id}/dlp/limits

Fetch limits associated with DLP for account

operationId: `dlp-limits-get`

## POST /accounts/{account_id}/dlp/patterns/validate

Validate a DLP regex pattern

operationId: `dlp-pattern-validate`

## GET /accounts/{account_id}/dlp/payload_log

Get payload log settings

operationId: `dlp-payload-log-get`

## PUT /accounts/{account_id}/dlp/payload_log

Set payload log settings

operationId: `dlp-payload-log-put`

## DELETE /accounts/{account_id}/dlp/settings

Delete (reset) DLP account-level settings to initial values.

operationId: `dlp-settings-delete`

## GET /accounts/{account_id}/dlp/settings

Get DLP account-level settings.

operationId: `dlp-settings-get`

## PATCH /accounts/{account_id}/dlp/settings

Partially update DLP account-level settings.

operationId: `dlp-settings-edit`

## PUT /accounts/{account_id}/dlp/settings

Update DLP account-level settings (full replacement).

operationId: `dlp-settings-update`
