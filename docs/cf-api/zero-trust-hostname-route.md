# Zero Trust Hostname Route

5 endpoints.

## GET /accounts/{account_id}/zerotrust/routes/hostname

List hostname routes

operationId: `zero-trust-networks-route-hostname-list` · query: `id`, `hostname`, `tunnel_id`, `comment`, `existed_at`, `is_deleted`, `per_page`, `page`

## POST /accounts/{account_id}/zerotrust/routes/hostname

Create hostname route

operationId: `zero-trust-networks-route-hostname-create`

## DELETE /accounts/{account_id}/zerotrust/routes/hostname/{hostname_route_id}

Delete hostname route

operationId: `zero-trust-networks-route-hostname-delete`

## GET /accounts/{account_id}/zerotrust/routes/hostname/{hostname_route_id}

Get hostname route

operationId: `zero-trust-networks-route-hostname-get`

## PATCH /accounts/{account_id}/zerotrust/routes/hostname/{hostname_route_id}

Update hostname route

operationId: `zero-trust-networks-route-hostname-update`
