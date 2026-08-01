# Tunnel Routing

9 endpoints.

## GET /accounts/{account_id}/teamnet/routes

List tunnel routes

operationId: `tunnel-route-list-tunnel-routes` · query: `comment`, `is_deleted`, `network_subset`, `network_superset`, `existed_at`, `tunnel_id`, `route_id`, `tun_types`, `virtual_network_id`, `per_page`, `page`

## POST /accounts/{account_id}/teamnet/routes

Create a tunnel route

operationId: `tunnel-route-create-a-tunnel-route`

## DELETE /accounts/{account_id}/teamnet/routes/{route_id}

Delete a tunnel route

operationId: `tunnel-route-delete-a-tunnel-route`

## GET /accounts/{account_id}/teamnet/routes/{route_id}

Get tunnel route

operationId: `tunnel-route-get-tunnel-route`

## PATCH /accounts/{account_id}/teamnet/routes/{route_id}

Update a tunnel route

operationId: `tunnel-route-update-a-tunnel-route`

## GET /accounts/{account_id}/teamnet/routes/ip/{ip}

Get tunnel route by IP

operationId: `tunnel-route-get-tunnel-route-by-ip` · query: `virtual_network_id`, `default_virtual_network_fallback`

## DELETE /accounts/{account_id}/teamnet/routes/network/{ip_network_encoded}

Delete a tunnel route (CIDR Endpoint)

operationId: `tunnel-route-delete-a-tunnel-route-with-cidr` · query: `virtual_network_id`, `tun_type`, `tunnel_id`

## PATCH /accounts/{account_id}/teamnet/routes/network/{ip_network_encoded}

Update a tunnel route (CIDR Endpoint)

operationId: `tunnel-route-update-a-tunnel-route-with-cidr`

## POST /accounts/{account_id}/teamnet/routes/network/{ip_network_encoded}

Create a tunnel route (CIDR Endpoint)

operationId: `tunnel-route-create-a-tunnel-route-with-cidr`
