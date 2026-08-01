# ppc_config

5 endpoints.

## PATCH /accounts/{account_id}/pay-per-crawl/zones_can_be_enabled

Set can_be_enabled setting on zones

operationId: `pay-per-crawl.setZonesCanBeEnabled`

## POST /accounts/{account_id}/pay-per-crawl/zones_can_be_enabled/query

Gets the can_be_enabled zone setting

operationId: `pay-per-crawl.queryZonesCanBeEnabled`

## GET /zones/{zone_id}/pay-per-crawl/configuration

Get the pay-per-crawl config

operationId: `pay-per-crawl.getConfig`

## PATCH /zones/{zone_id}/pay-per-crawl/configuration

Changes pay-per-crawl config for a zone

operationId: `pay-per-crawl.patchConfig`

## POST /zones/{zone_id}/pay-per-crawl/configuration

Creates pay-per-crawl config for a zone

operationId: `pay-per-crawl.createConfig`
