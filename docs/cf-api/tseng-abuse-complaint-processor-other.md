# tseng-abuse-complaint-processor_other

7 endpoints.

## GET /accounts/{account_id}/abuse-reports

List abuse reports

operationId: `ListAbuseReports` · query: `page`, `per_page`, `sort`, `domain`, `created_before`, `created_after`, `status`, `type`, `mitigation_status`

## GET /accounts/{account_id}/abuse-reports/{report_id}/appeals/eligibility

Check whether a report can be appealed

operationId: `CheckAppealEligibility`

## GET /accounts/{account_id}/abuse-reports/{report_id}/emails

List abuse report emails

operationId: `ListEmails` · query: `page`, `per_page`

## GET /accounts/{account_id}/abuse-reports/{report_id}/mitigations

List abuse report mitigations

operationId: `ListMitigations` · query: `page`, `per_page`, `sort`, `type`, `effective_before`, `effective_after`, `status`, `entity_type`

## POST /accounts/{account_id}/abuse-reports/{report_id}/mitigations/appeal

Request review on mitigations

operationId: `RequestReview`

## GET /accounts/{account_id}/abuse-reports/{report_param}

Abuse Report Details

operationId: `GetAbuseReport`

## POST /accounts/{account_id}/abuse-reports/{report_param}

Submit an abuse report

operationId: `SubmitAbuseReport`
