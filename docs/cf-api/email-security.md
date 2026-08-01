# Email Security

20 endpoints.

## GET /accounts/{account_id}/email-security/investigate

Search email messages

operationId: `email_security_investigate` · query: `start`, `end`, `query`, `detections_only`, `final_disposition`, `metric`, `message_action`, `recipient`, `sender`, `alert_id`, `domain`, `message_id`, `subject`, `delivery_status`, `cursor`, `page`

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}

Get message details

operationId: `email_security_get_message`

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/action_log

Get action log for a message

operationId: `email_security_get_message_action_log`

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/detections

Get message detection details

operationId: `email_security_get_message_detections`

## POST /accounts/{account_id}/email-security/investigate/{investigate_id}/move

Move a message

operationId: `email_security_post_message_move`

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/preview

Get email preview

operationId: `email_security_get_message_preview`

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/raw

Get raw email content

operationId: `email_security_get_message_raw`

## POST /accounts/{account_id}/email-security/investigate/{investigate_id}/reclassify

Change email classification

operationId: `email_security_post_reclassify`

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/trace

Get email trace

operationId: `email_security_get_message_trace`

## GET /accounts/{account_id}/email-security/investigate/bulk

List bulk action jobs

operationId: `email_security_get_bulk_jobs` · query: `action_type`, `status`

## POST /accounts/{account_id}/email-security/investigate/bulk

Create a bulk action job

operationId: `email_security_create_bulk_job`

## DELETE /accounts/{account_id}/email-security/investigate/bulk/{job_id}

Delete a bulk action job

operationId: `email_security_delete_bulk_job`

## GET /accounts/{account_id}/email-security/investigate/bulk/{job_id}

Get bulk action job details

operationId: `email_security_get_bulk_job`

## POST /accounts/{account_id}/email-security/investigate/bulk/{job_id}/cancel

Cancel a bulk action job

operationId: `email_security_cancel_bulk_job`

## GET /accounts/{account_id}/email-security/investigate/bulk/{job_id}/messages

List messages for a bulk action job

operationId: `email_security_get_bulk_job_messages` · query: `status`

## POST /accounts/{account_id}/email-security/investigate/move

Move multiple messages

operationId: `email_security_post_bulk_move`

## POST /accounts/{account_id}/email-security/investigate/preview

Preview for non-detection messages

operationId: `email_security_post_preview`

## POST /accounts/{account_id}/email-security/investigate/release

Release messages from quarantine

operationId: `email_security_post_release`

## GET /accounts/{account_id}/email-security/phishguard/reports

Get PhishGuard reports

operationId: `email_security_get_phishguard_reports` · query: `start`, `end`, `from_date`, `to_date`

## GET /accounts/{account_id}/email-security/submissions

Get reclassify submissions

operationId: `email_security_submissions` · query: `start`, `end`, `type`, `submission_id`, `original_disposition`, `requested_disposition`, `outcome_disposition`, `status`, `query`, `escalated_from_user`
