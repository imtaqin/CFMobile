# URL Scanner

8 endpoints.

## POST /accounts/{account_id}/urlscanner/v2/bulk

Bulk create URL Scans

operationId: `urlscanner-create-scan-bulk-v2`

## GET /accounts/{account_id}/urlscanner/v2/dom/{scan_id}

Get URL scan's DOM

operationId: `urlscanner-get-scan-dom-v2`

## GET /accounts/{account_id}/urlscanner/v2/har/{scan_id}

Get URL scan's HAR

operationId: `urlscanner-get-scan-har-v2`

## GET /accounts/{account_id}/urlscanner/v2/responses/{response_id}

Get raw response

operationId: `urlscanner-get-response-v2`

## GET /accounts/{account_id}/urlscanner/v2/result/{scan_id}

Get URL scan

operationId: `urlscanner-get-scan-v2`

## POST /accounts/{account_id}/urlscanner/v2/scan

Create URL Scan

operationId: `urlscanner-create-scan-v2`

## GET /accounts/{account_id}/urlscanner/v2/screenshots/{scan_id}.png

Get screenshot

operationId: `urlscanner-get-scan-screenshot-v2` · query: `resolution`

## GET /accounts/{account_id}/urlscanner/v2/search

Search URL scans

operationId: `urlscanner-search-scans-v2` · query: `size`, `q`
