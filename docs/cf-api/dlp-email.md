# DLP Email

8 endpoints.

## GET /accounts/{account_id}/dlp/email/account_mapping

Get mapping

operationId: `dlp-email-scanner-get-account-mapping`

## POST /accounts/{account_id}/dlp/email/account_mapping

Create mapping

operationId: `dlp-email-scanner-create-account-mapping`

## GET /accounts/{account_id}/dlp/email/rules

List all email scanner rules

operationId: `dlp-email-scanner-list-all-rules`

## PATCH /accounts/{account_id}/dlp/email/rules

Update email scanner rule priorities

operationId: `dlp-email-scanner-update-rule-priorities`

## POST /accounts/{account_id}/dlp/email/rules

Create email scanner rule

operationId: `dlp-email-scanner-create-rule`

## DELETE /accounts/{account_id}/dlp/email/rules/{rule_id}

Delete email scanner rule

operationId: `dlp-email-scanner-delete-rule`

## GET /accounts/{account_id}/dlp/email/rules/{rule_id}

Get an email scanner rule

operationId: `dlp-email-scanner-get-rule`

## PUT /accounts/{account_id}/dlp/email/rules/{rule_id}

Update email scanner rule

operationId: `dlp-email-scanner-update-rule`
