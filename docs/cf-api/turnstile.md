# Turnstile

6 endpoints.

## GET /accounts/{account_id}/challenges/widgets

List Turnstile Widgets

operationId: `accounts-turnstile-widgets-list` · query: `page`, `per_page`, `order`, `direction`, `filter`

## POST /accounts/{account_id}/challenges/widgets

Create a Turnstile Widget

operationId: `accounts-turnstile-widget-create` · query: `page`, `per_page`, `order`, `direction`, `filter`

## DELETE /accounts/{account_id}/challenges/widgets/{sitekey}

Delete a Turnstile Widget

operationId: `accounts-turnstile-widget-delete`

## GET /accounts/{account_id}/challenges/widgets/{sitekey}

Turnstile Widget Details

operationId: `accounts-turnstile-widget-get`

## PUT /accounts/{account_id}/challenges/widgets/{sitekey}

Update a Turnstile Widget

operationId: `accounts-turnstile-widget-update`

## POST /accounts/{account_id}/challenges/widgets/{sitekey}/rotate_secret

Rotate Secret for a Turnstile Widget

operationId: `accounts-turnstile-widget-rotate-secret`
