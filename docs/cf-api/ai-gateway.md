# AI Gateway

13 endpoints.

## GET /accounts/{account_id}/ai-gateway/billing/credit-balance

Get credit balance

operationId: `aig-billing-get-credit-balance`

## GET /accounts/{account_id}/ai-gateway/billing/invoice-history

Get invoice history

operationId: `aig-billing-get-invoice-history` · query: `type`

## GET /accounts/{account_id}/ai-gateway/billing/invoice-preview

Get invoice preview

operationId: `aig-billing-get-invoice-preview`

## DELETE /accounts/{account_id}/ai-gateway/billing/spending-limit

Delete spending limit

operationId: `aig-billing-delete-spending-limit`

## GET /accounts/{account_id}/ai-gateway/billing/spending-limit

Get spending limit

operationId: `aig-billing-get-spending-limit`

## POST /accounts/{account_id}/ai-gateway/billing/spending-limit

Set spending limit (deprecated)

operationId: `aig-billing-set-spending-limit`

## POST /accounts/{account_id}/ai-gateway/billing/topup

Create a top-up

operationId: `aig-billing-create-topup`

## DELETE /accounts/{account_id}/ai-gateway/billing/topup/config

Delete auto top-up configuration

operationId: `aig-billing-delete-topup-config`

## GET /accounts/{account_id}/ai-gateway/billing/topup/config

Get auto top-up configuration

operationId: `aig-billing-get-topup-config`

## POST /accounts/{account_id}/ai-gateway/billing/topup/config

Set auto top-up configuration

operationId: `aig-billing-set-topup-config`

## GET /accounts/{account_id}/ai-gateway/billing/topup/limits

Get account top-up limits

operationId: `aig-billing-get-topup-limits`

## POST /accounts/{account_id}/ai-gateway/billing/topup/status

Check top-up status

operationId: `aig-billing-check-topup-status`

## GET /accounts/{account_id}/ai-gateway/billing/usage-history

Get usage history

operationId: `aig-billing-get-usage-history` · query: `value_grouping_window`, `start_time`, `end_time`
