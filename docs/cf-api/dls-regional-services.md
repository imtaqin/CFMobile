# DLS Regional Services

6 endpoints.

## GET /accounts/{account_id}/addressing/regional_hostnames/regions

List Regions

operationId: `dls-account-regional-hostnames-list-regions`

## GET /zones/{zone_id}/addressing/regional_hostnames

List Regional Hostnames

operationId: `dls-zone-regional-hostnames-list`

## POST /zones/{zone_id}/addressing/regional_hostnames

Create Regional Hostname

operationId: `dls-zone-regional-hostnames-create`

## DELETE /zones/{zone_id}/addressing/regional_hostnames/{hostname}

Delete Regional Hostname

operationId: `dls-zone-regional-hostnames-delete`

## GET /zones/{zone_id}/addressing/regional_hostnames/{hostname}

Fetch Regional Hostname

operationId: `dls-zone-regional-hostnames-fetch`

## PATCH /zones/{zone_id}/addressing/regional_hostnames/{hostname}

Update Regional Hostname

operationId: `dls-zone-regional-hostnames-patch`
