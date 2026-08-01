# Custom Indicator Feeds

11 endpoints.

## GET /accounts/{account_id}/intel/indicator-feeds

Get indicator feeds owned by this account

operationId: `custom-indicator-feeds-get-indicator-feeds`

## POST /accounts/{account_id}/intel/indicator-feeds

Create new indicator feed

operationId: `custom-indicator-feeds-create-indicator-feeds`

## GET /accounts/{account_id}/intel/indicator-feeds/{feed_id}

Get indicator feed metadata

operationId: `custom-indicator-feeds-get-indicator-feed-metadata`

## PUT /accounts/{account_id}/intel/indicator-feeds/{feed_id}

Update indicator feed metadata

operationId: `custom-indicator-feeds-update-indicator-feed-metadata`

## GET /accounts/{account_id}/intel/indicator-feeds/{feed_id}/data

Get indicator feed data

operationId: `custom-indicator-feeds-get-indicator-feed-data`

## GET /accounts/{account_id}/intel/indicator-feeds/{feed_id}/download

Download indicator feed data

operationId: `custom-indicator-feeds-download-indicator-feed-data`

## PUT /accounts/{account_id}/intel/indicator-feeds/{feed_id}/snapshot

Update indicator feed data

operationId: `custom-indicator-feeds-update-indicator-feed-data`

## PUT /accounts/{account_id}/intel/indicator-feeds/permissions/add

Grant permission to indicator feed

operationId: `custom-indicator-feeds-add-permission`

## PUT /accounts/{account_id}/intel/indicator-feeds/permissions/createProvider

Create indicator feed provider

operationId: `custom-indicator-feeds-create-provider`

## PUT /accounts/{account_id}/intel/indicator-feeds/permissions/remove

Revoke permission to indicator feed

operationId: `custom-indicator-feeds-remove-permission`

## GET /accounts/{account_id}/intel/indicator-feeds/permissions/view

List indicator feed permissions

operationId: `custom-indicator-feeds-view-permissions`
