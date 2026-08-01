# Organizations

8 endpoints.

## GET /organizations

List organizations the user has access to

operationId: `Organization_listOrganizations`

## POST /organizations

Create organization

operationId: `Organizations_createUserOrganization`

## DELETE /organizations/{organization_id}

Delete organization.

operationId: `Organizations_delete`

## GET /organizations/{organization_id}

Get organization

operationId: `Organizations_retrieve`

## PUT /organizations/{organization_id}

Modify organization.

operationId: `Organizations_modify`

## GET /organizations/{organization_id}/accounts

Get organization accounts

operationId: `Organizations_getAccounts` · query: `account_pubname`, `account_pubname.startsWith`, `account_pubname.endsWith`, `account_pubname.contains`, `name`, `name.startsWith`, `name.endsWith`, `name.contains`, `order_by`, `direction`

## GET /organizations/{organization_id}/profile

Get organization profile

operationId: `Organizations_getProfile`

## PUT /organizations/{organization_id}/profile

Modify organization profile.

operationId: `Organizations_modifyProfile`
