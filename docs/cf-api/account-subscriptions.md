# Account Subscriptions

6 endpoints.

## POST /accounts/{account_id}/bulk/subscriptions

Create Subscriptions

operationId: `account-subscriptions-bulk-create-subscription` · query: `idemp_key`

## GET /accounts/{account_id}/subscriptions

List Subscriptions

operationId: `account-subscriptions-list-subscriptions`

## POST /accounts/{account_id}/subscriptions

Create Subscription

operationId: `account-subscriptions-create-subscription`

## DELETE /accounts/{account_id}/subscriptions/{subscription_identifier}

Delete Subscription

operationId: `account-subscriptions-delete-subscription`

## PUT /accounts/{account_id}/subscriptions/{subscription_identifier}

Update Subscription

operationId: `account-subscriptions-update-subscription`

## POST /accounts/{account_id}/subscriptions/{subscription_identifier}/action/append

Append Subscription Action

operationId: `account-subscriptions-action-append-subscription`
