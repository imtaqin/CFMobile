# Email Sending suppressions

13 endpoints.

## GET /accounts/{account_id}/email/sending/suppression

List account email suppressions

operationId: `get_publicListSuppressionSending` · query: `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/email/sending/suppression

Create account email suppression

operationId: `post_publicNewSuppressionSending`

## DELETE /accounts/{account_id}/email/sending/suppression/{suppression_id}

Delete account email suppression

operationId: `delete_publicDeleteSuppressionSending`

## GET /accounts/{account_id}/email/sending/suppression/{suppression_id}

Get account email suppression

operationId: `get_publicGetSuppressionSending`

## GET /accounts/{account_id}/email/sending/suppressions

List account Email Sending suppressions

operationId: `get_publicListSendingSuppressions` · query: `per_page`, `cursor`, `email`, `reason`, `order`, `direction`

## POST /accounts/{account_id}/email/sending/suppressions

Create account Email Sending suppression

operationId: `post_publicCreateSendingSuppression`

## DELETE /accounts/{account_id}/email/sending/suppressions/{suppression_id}

Delete account Email Sending suppression

operationId: `delete_publicDeleteSendingSuppression`

## GET /accounts/{account_id}/email/sending/suppressions/{suppression_id}

Get account Email Sending suppression

operationId: `get_publicGetSendingSuppression`

## POST /accounts/{account_id}/email/sending/suppressions/bulk

Bulk import account Email Sending suppressions

operationId: `post_publicBulkCreateSendingSuppressions`

## GET /zones/{zone_id}/email/sending/suppression

List zone email suppressions

operationId: `get_publicListSuppressionZoneSending` · query: `page`, `per_page`, `order`, `direction`

## POST /zones/{zone_id}/email/sending/suppression

Create zone email suppression

operationId: `post_publicNewSuppressionZoneSending`

## DELETE /zones/{zone_id}/email/sending/suppression/{suppression_id}

Delete zone email suppression

operationId: `delete_publicDeleteSuppressionZoneSending`

## GET /zones/{zone_id}/email/sending/suppression/{suppression_id}

Get zone email suppression

operationId: `get_publicGetSuppressionZoneSending`
