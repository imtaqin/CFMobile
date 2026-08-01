# Notification policies

8 endpoints.

## GET /accounts/{account_id}/alerting/v3/policies

List Notification policies

operationId: `notification-policies-list-notification-policies`

## POST /accounts/{account_id}/alerting/v3/policies

Create a Notification policy

operationId: `notification-policies-create-a-notification-policy`

## DELETE /accounts/{account_id}/alerting/v3/policies/{policy_id}

Delete a Notification policy

operationId: `notification-policies-delete-a-notification-policy`

## GET /accounts/{account_id}/alerting/v3/policies/{policy_id}

Get a Notification policy

operationId: `notification-policies-get-a-notification-policy`

## PUT /accounts/{account_id}/alerting/v3/policies/{policy_id}

Update a Notification policy

operationId: `notification-policies-update-a-notification-policy`

## GET /accounts/{account_id}/alerting/v3/policies/{policy_id}/email/unsubscribe

Show email unsubscribe details

operationId: `notification-policies-show-email-unsubscribe-details` · query: `email`, `token`

## POST /accounts/{account_id}/alerting/v3/policies/{policy_id}/email/unsubscribe

Unsubscribe email from a Notification policy

operationId: `notification-policies-unsubscribe-email-from-notification-policy` · query: `email`, `token`

## POST /accounts/{account_id}/alerting/v3/policies/{policy_id}/test

Test a Notification policy

operationId: `notification-policies-test-a-notification-policy`
