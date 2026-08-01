# R2 Catalog Management

4 endpoints.

## GET /accounts/{account_id}/r2-catalog

List R2 catalogs

operationId: `list-catalogs`

## GET /accounts/{account_id}/r2-catalog/{bucket_name}

Get R2 catalog details

operationId: `get-catalog-details`

## POST /accounts/{account_id}/r2-catalog/{bucket_name}/disable

Disable R2 catalog

operationId: `disable-catalog`

## POST /accounts/{account_id}/r2-catalog/{bucket_name}/enable

Enable R2 bucket as a catalog

operationId: `enable-catalog`
