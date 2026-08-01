# Flags

5 endpoints.

## GET /accounts/{account_id}/flagship/apps/{app_id}/flags

List flags

operationId: `flagship_list_flags` · query: `limit`, `cursor`

## POST /accounts/{account_id}/flagship/apps/{app_id}/flags

Create flag

operationId: `flagship_create_flag`

## DELETE /accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}

Delete flag

operationId: `flagship_delete_flag`

## GET /accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}

Get flag

operationId: `flagship_get_flag`

## PUT /accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}

Update flag

operationId: `flagship_update_flag`
