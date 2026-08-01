# Content Scanning

7 endpoints.

## POST /zones/{zone_id}/content-upload-scan/disable

Disable Content Scanning

operationId: `waf-content-scanning-disable`

## POST /zones/{zone_id}/content-upload-scan/enable

Enable Content Scanning

operationId: `waf-content-scanning-enable`

## GET /zones/{zone_id}/content-upload-scan/payloads

List Existing Custom Scan Expressions

operationId: `waf-content-scanning-list-custom-scan-expressions`

## POST /zones/{zone_id}/content-upload-scan/payloads

Add Custom Scan Expressions

operationId: `waf-content-scanning-add-custom-scan-expressions`

## DELETE /zones/{zone_id}/content-upload-scan/payloads/{expression_id}

Delete a Custom Scan Expression

operationId: `waf-content-scanning-delete-custom-scan-expressions`

## GET /zones/{zone_id}/content-upload-scan/settings

Get Content Scanning Status

operationId: `waf-content-scanning-get-status`

## PUT /zones/{zone_id}/content-upload-scan/settings

Update Content Scanning Status

operationId: `waf-content-scanning-update-settings`
