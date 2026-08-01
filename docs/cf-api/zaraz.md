# Zaraz

10 endpoints.

## GET /zones/{zone_id}/settings/zaraz/config

Get Zaraz configuration

operationId: `get-zones-zone_identifier-zaraz-config`

## PUT /zones/{zone_id}/settings/zaraz/config

Update Zaraz configuration

operationId: `put-zones-zone_identifier-zaraz-config`

## GET /zones/{zone_id}/settings/zaraz/default

Get default Zaraz configuration

operationId: `get-zones-zone_identifier-zaraz-default`

## GET /zones/{zone_id}/settings/zaraz/export

Export Zaraz configuration

operationId: `get-zones-zone_identifier-zaraz-export`

## GET /zones/{zone_id}/settings/zaraz/history

List Zaraz historical configuration records

operationId: `get-zones-zone_identifier-zaraz-history` · query: `offset`, `limit`, `sortField`, `sortOrder`

## PUT /zones/{zone_id}/settings/zaraz/history

Restore Zaraz historical configuration by ID

operationId: `put-zones-zone_identifier-zaraz-history`

## GET /zones/{zone_id}/settings/zaraz/history/configs

Get Zaraz historical configurations by ID(s)

operationId: `get-zones-zone_identifier-zaraz-config-history` · query: `ids`

## POST /zones/{zone_id}/settings/zaraz/publish

Publish Zaraz preview configuration

operationId: `post-zones-zone_identifier-zaraz-publish`

## GET /zones/{zone_id}/settings/zaraz/workflow

Get Zaraz workflow

operationId: `get-zones-zone_identifier-zaraz-workflow`

## PUT /zones/{zone_id}/settings/zaraz/workflow

Update Zaraz workflow

operationId: `put-zones-zone_identifier-zaraz-workflow`
