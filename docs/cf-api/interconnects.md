# Interconnects

6 endpoints.

## GET /accounts/{account_id}/cni/interconnects

List existing interconnects

operationId: `list_interconnects` · query: `site`, `type`, `cursor`, `limit`

## POST /accounts/{account_id}/cni/interconnects

Create a new interconnect

operationId: `create_interconnect`

## DELETE /accounts/{account_id}/cni/interconnects/{icon}

Delete an interconnect object

operationId: `delete_interconnect`

## GET /accounts/{account_id}/cni/interconnects/{icon}

Get information about an interconnect object

operationId: `get_interconnect`

## GET /accounts/{account_id}/cni/interconnects/{icon}/loa

Generate the Letter of Authorization (LOA) for a given interconnect

operationId: `get_interconnect_loa`

## GET /accounts/{account_id}/cni/interconnects/{icon}/status

Get the current status of an interconnect object

operationId: `get_interconnect_status`
