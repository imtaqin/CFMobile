# Slots

2 endpoints.

## GET /accounts/{account_id}/cni/slots

Retrieve a list of all slots matching the specified parameters

operationId: `list_slots` · query: `address_contains`, `site`, `speed`, `occupied`, `cursor`, `limit`

## GET /accounts/{account_id}/cni/slots/{slot}

Get information about the specified slot

operationId: `get_slot`
