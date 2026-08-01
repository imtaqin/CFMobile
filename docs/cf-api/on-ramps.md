# On-ramps

12 endpoints.

## GET /accounts/{account_id}/magic/cloud/onramps

List On-ramps

operationId: `onramps-list` · query: `order_by`, `desc`, `status`, `vpcs`

## POST /accounts/{account_id}/magic/cloud/onramps

Create On-ramp

operationId: `onramps-create`

## DELETE /accounts/{account_id}/magic/cloud/onramps/{onramp_id}

Delete On-ramp

operationId: `onramps-delete` · query: `destroy`, `force`

## GET /accounts/{account_id}/magic/cloud/onramps/{onramp_id}

Read On-ramp

operationId: `onramps-read` · query: `status`, `vpcs`, `post_apply_resources`, `planned_resources`

## PATCH /accounts/{account_id}/magic/cloud/onramps/{onramp_id}

Patch On-ramp

operationId: `onramps-patch`

## PUT /accounts/{account_id}/magic/cloud/onramps/{onramp_id}

Update On-ramp

operationId: `onramps-update`

## POST /accounts/{account_id}/magic/cloud/onramps/{onramp_id}/apply

Apply On-ramp

operationId: `onramps-apply`

## POST /accounts/{account_id}/magic/cloud/onramps/{onramp_id}/export

Export as Terraform

operationId: `onramps-export`

## POST /accounts/{account_id}/magic/cloud/onramps/{onramp_id}/plan

Plan On-ramp

operationId: `onramps-plan`

## GET /accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space

Read Magic WAN Address Space

operationId: `onramps-mwan-addr-space-read`

## PATCH /accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space

Patch Magic WAN Address Space

operationId: `onramps-mwan-addr-space-patch`

## PUT /accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space

Update Magic WAN Address Space

operationId: `onramps-mwan-addr-space-update`
