# Tunnel Virtual Network

5 endpoints.

## GET /accounts/{account_id}/teamnet/virtual_networks

List virtual networks

operationId: `tunnel-virtual-network-list-virtual-networks` · query: `id`, `name`, `is_default`, `is_default_network`, `is_deleted`

## POST /accounts/{account_id}/teamnet/virtual_networks

Create a virtual network

operationId: `tunnel-virtual-network-create-a-virtual-network`

## DELETE /accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}

Delete a virtual network

operationId: `tunnel-virtual-network-delete`

## GET /accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}

Get a virtual network

operationId: `tunnel-virtual-network-get`

## PATCH /accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}

Update a virtual network

operationId: `tunnel-virtual-network-update`
