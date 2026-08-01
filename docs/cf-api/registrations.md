# Registrations

5 endpoints.

## GET /accounts/{account_id}/devices/registrations

List registrations

operationId: `list-registrations`

## DELETE /accounts/{account_id}/devices/registrations/{registration_id}

Delete registration

operationId: `delete-registration`

## GET /accounts/{account_id}/devices/registrations/{registration_id}

Get registration

operationId: `get-registration`

## POST /accounts/{account_id}/devices/registrations/revoke

Revoke registrations

operationId: `revoke-registrations` · query: `id`

## POST /accounts/{account_id}/devices/registrations/unrevoke

Unrevoke registrations

operationId: `unrevoke-registrations` · query: `id`
