# CNIs

5 endpoints.

## GET /accounts/{account_id}/cni/cnis

List existing CNI objects

operationId: `list_cnis` · query: `slot`, `tunnel_id`, `cursor`, `limit`

## POST /accounts/{account_id}/cni/cnis

Create a new CNI object

operationId: `create_cni`

## DELETE /accounts/{account_id}/cni/cnis/{cni}

Delete a specified CNI object

operationId: `delete_cni`

## GET /accounts/{account_id}/cni/cnis/{cni}

Get information about a CNI object

operationId: `get_cni`

## PUT /accounts/{account_id}/cni/cnis/{cni}

Modify stored information about a CNI object

operationId: `update_cni`
