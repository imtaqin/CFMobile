# OrganizationMembers

5 endpoints.

## GET /organizations/{organization_id}/members

List organization members

operationId: `Members_list` · query: `status`, `user.email`, `user.email.contains`, `user.email.startsWith`, `user.email.endsWith`

## POST /organizations/{organization_id}/members

Create organization member

operationId: `Members_create`

## POST /organizations/{organization_id}/members:batchCreate

Batch create organization members

operationId: `Members_batchCreate`

## DELETE /organizations/{organization_id}/members/{member_id}

Delete organization member

operationId: `Members_delete`

## GET /organizations/{organization_id}/members/{member_id}

Get organization member

operationId: `Members_retrieve`
