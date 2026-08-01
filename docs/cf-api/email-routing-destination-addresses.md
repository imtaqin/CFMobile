# Email Routing destination addresses

5 endpoints.

## GET /accounts/{account_id}/email/routing/addresses

List destination addresses

operationId: `email-routing-destination-addresses-list-destination-addresses` · query: `page`, `per_page`, `direction`, `verified`

## POST /accounts/{account_id}/email/routing/addresses

Create a destination address

operationId: `email-routing-destination-addresses-create-a-destination-address`

## DELETE /accounts/{account_id}/email/routing/addresses/{destination_address_identifier}

Delete destination address

operationId: `email-routing-destination-addresses-delete-destination-address`

## GET /accounts/{account_id}/email/routing/addresses/{destination_address_identifier}

Get a destination address

operationId: `email-routing-destination-addresses-get-a-destination-address`

## PATCH /accounts/{account_id}/email/routing/addresses/{destination_address_identifier}

Update destination address

operationId: `email-routing-destination-addresses-update-destination-address`
