# Apps

8 endpoints.

## GET /accounts/{account_id}/flagship/apps

List apps

operationId: `flagship_list_apps`

## POST /accounts/{account_id}/flagship/apps

Create app

operationId: `flagship_create_app`

## DELETE /accounts/{account_id}/flagship/apps/{app_id}

Delete app

operationId: `flagship_delete_app`

## GET /accounts/{account_id}/flagship/apps/{app_id}

Get app

operationId: `flagship_get_app`

## PUT /accounts/{account_id}/flagship/apps/{app_id}

Update app

operationId: `flagship_update_app`

## GET /accounts/{account_id}/realtime/kit/apps

Fetch all apps

operationId: `get_apps` · query: `page_no`, `per_page`, `search`, `sort_order`

## POST /accounts/{account_id}/realtime/kit/apps

Create App

operationId: `create_app`

## GET /accounts/{account_id}/realtime/kit/apps/{app_id}

Fetch app details

operationId: `get_app`
