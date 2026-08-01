# Scans

9 endpoints.

## GET /accounts/{account_id}/cloudforce-one/scans/config

List Scan Configs

operationId: `get_ConfigFetch`

## POST /accounts/{account_id}/cloudforce-one/scans/config

Create a new Scan Config

operationId: `post_ConfigCreate`

## DELETE /accounts/{account_id}/cloudforce-one/scans/config/{config_id}

Delete a Scan Config

operationId: `delete_DeleteScans`

## PATCH /accounts/{account_id}/cloudforce-one/scans/config/{config_id}

Update an existing Scan Config

operationId: `post_ConfigUpdate`

## GET /accounts/{account_id}/cloudforce-one/scans/results/{config_id}

Get the Latest Scan Result

operationId: `get_GetOpenPorts`

## GET /accounts/{account_id}/vuln_scanner/scans

List Scans

operationId: `list-scans`

## POST /accounts/{account_id}/vuln_scanner/scans

Create Scan

operationId: `create-scan`

## DELETE /accounts/{account_id}/vuln_scanner/scans/{scan_id}

Delete Scan

operationId: `delete-scan`

## GET /accounts/{account_id}/vuln_scanner/scans/{scan_id}

Get Scan

operationId: `get-scan`
