# Cloudflare Tunnel

20 endpoints.

## GET /accounts/{account_id}/cfd_tunnel

List Cloudflare Tunnels

operationId: `cloudflare-tunnel-list-cloudflare-tunnels` · query: `name`, `is_deleted`, `existed_at`, `uuid`, `was_active_at`, `was_inactive_at`, `include_prefix`, `exclude_prefix`, `status`, `per_page`, `page`

## POST /accounts/{account_id}/cfd_tunnel

Create a Cloudflare Tunnel

operationId: `cloudflare-tunnel-create-a-cloudflare-tunnel`

## DELETE /accounts/{account_id}/cfd_tunnel/{tunnel_id}

Delete a Cloudflare Tunnel

operationId: `cloudflare-tunnel-delete-a-cloudflare-tunnel`

## GET /accounts/{account_id}/cfd_tunnel/{tunnel_id}

Get a Cloudflare Tunnel

operationId: `cloudflare-tunnel-get-a-cloudflare-tunnel`

## PATCH /accounts/{account_id}/cfd_tunnel/{tunnel_id}

Update a Cloudflare Tunnel

operationId: `cloudflare-tunnel-update-a-cloudflare-tunnel`

## DELETE /accounts/{account_id}/cfd_tunnel/{tunnel_id}/connections

Clean up Cloudflare Tunnel connections

operationId: `cloudflare-tunnel-clean-up-cloudflare-tunnel-connections` · query: `client_id`

## GET /accounts/{account_id}/cfd_tunnel/{tunnel_id}/connections

List Cloudflare Tunnel connections

operationId: `cloudflare-tunnel-list-cloudflare-tunnel-connections`

## GET /accounts/{account_id}/cfd_tunnel/{tunnel_id}/connectors/{connector_id}

Get Cloudflare Tunnel connector

operationId: `cloudflare-tunnel-get-cloudflare-tunnel-connector`

## POST /accounts/{account_id}/cfd_tunnel/{tunnel_id}/management

Get a Cloudflare Tunnel management token

operationId: `cloudflare-tunnel-get-a-cloudflare-tunnel-management-token`

## GET /accounts/{account_id}/cfd_tunnel/{tunnel_id}/token

Get a Cloudflare Tunnel token

operationId: `cloudflare-tunnel-get-a-cloudflare-tunnel-token`

## GET /accounts/{account_id}/tunnels

List All Tunnels

operationId: `cloudflare-tunnel-list-all-tunnels` · query: `name`, `is_deleted`, `existed_at`, `uuid`, `was_active_at`, `was_inactive_at`, `include_prefix`, `exclude_prefix`, `tun_types`, `status`, `per_page`, `page`

## GET /accounts/{account_id}/warp_connector

List Warp Connector Tunnels

operationId: `cloudflare-tunnel-list-warp-connector-tunnels` · query: `name`, `is_deleted`, `existed_at`, `uuid`, `was_active_at`, `was_inactive_at`, `include_prefix`, `exclude_prefix`, `status`, `per_page`, `page`

## POST /accounts/{account_id}/warp_connector

Create a Warp Connector Tunnel

operationId: `cloudflare-tunnel-create-a-warp-connector-tunnel`

## DELETE /accounts/{account_id}/warp_connector/{tunnel_id}

Delete a Warp Connector Tunnel

operationId: `cloudflare-tunnel-delete-a-warp-connector-tunnel`

## GET /accounts/{account_id}/warp_connector/{tunnel_id}

Get a Warp Connector Tunnel

operationId: `cloudflare-tunnel-get-a-warp-connector-tunnel`

## PATCH /accounts/{account_id}/warp_connector/{tunnel_id}

Update a Warp Connector Tunnel

operationId: `cloudflare-tunnel-update-a-warp-connector-tunnel`

## GET /accounts/{account_id}/warp_connector/{tunnel_id}/connections

List WARP Connector Tunnel connections

operationId: `cloudflare-tunnel-list-warp-connector-tunnel-connections`

## GET /accounts/{account_id}/warp_connector/{tunnel_id}/connectors/{connector_id}

Get WARP Connector Tunnel connector

operationId: `cloudflare-tunnel-get-warp-connector-tunnel-connector`

## PUT /accounts/{account_id}/warp_connector/{tunnel_id}/failover

Trigger a manual failover for a WARP Connector Tunnel

operationId: `cloudflare-tunnel-manual-failover-warp-connector-tunnel`

## GET /accounts/{account_id}/warp_connector/{tunnel_id}/token

Get a Warp Connector Tunnel token

operationId: `cloudflare-tunnel-get-a-warp-connector-tunnel-token`
