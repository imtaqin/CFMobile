# DNS Internal Views for an Account

5 endpoints.

## GET /accounts/{account_id}/dns_settings/views

List Internal DNS Views

operationId: `dns-views-for-an-account-list-internal-dns-views` · query: `name`, `name.exact`, `name.contains`, `name.startswith`, `name.endswith`, `zone_id`, `zone_name`, `match`, `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/dns_settings/views

Create Internal DNS View

operationId: `dns-views-for-an-account-create-internal-dns-views`

## DELETE /accounts/{account_id}/dns_settings/views/{view_id}

Delete Internal DNS View

operationId: `dns-views-for-an-account-delete-internal-dns-view`

## GET /accounts/{account_id}/dns_settings/views/{view_id}

DNS Internal View Details

operationId: `dns-views-for-an-account-get-internal-dns-view`

## PATCH /accounts/{account_id}/dns_settings/views/{view_id}

Update Internal DNS View

operationId: `dns-views-for-an-account-update-internal-dns-view`
