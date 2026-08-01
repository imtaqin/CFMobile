# Cloud Integrations

9 endpoints.

## GET /accounts/{account_id}/magic/cloud/providers

List Cloud Integrations

operationId: `providers-list` · query: `status`, `order_by`, `desc`, `cloudflare`

## POST /accounts/{account_id}/magic/cloud/providers

Create Cloud Integration

operationId: `providers-create`

## DELETE /accounts/{account_id}/magic/cloud/providers/{provider_id}

Delete Cloud Integration

operationId: `providers-delete`

## GET /accounts/{account_id}/magic/cloud/providers/{provider_id}

Read Cloud Integration

operationId: `providers-read` · query: `status`

## PATCH /accounts/{account_id}/magic/cloud/providers/{provider_id}

Patch Cloud Integration

operationId: `providers-patch`

## PUT /accounts/{account_id}/magic/cloud/providers/{provider_id}

Update Cloud Integration

operationId: `providers-update`

## POST /accounts/{account_id}/magic/cloud/providers/{provider_id}/discover

Run Discovery

operationId: `providers-discover` · query: `v2`

## GET /accounts/{account_id}/magic/cloud/providers/{provider_id}/initial_setup

Get Cloud Integration Setup Config

operationId: `providers-initial-setup`

## POST /accounts/{account_id}/magic/cloud/providers/discover

Run Discovery for All Integrations

operationId: `providers-discover-all`
