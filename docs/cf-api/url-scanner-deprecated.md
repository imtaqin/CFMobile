# URL Scanner (Deprecated)

6 endpoints.

## GET /accounts/{account_id}/urlscanner/response/{response_id}

Get raw response

operationId: `urlscanner-get-response-text`

## GET /accounts/{account_id}/urlscanner/scan

Search URL scans

operationId: `urlscanner-search-scans` · query: `scan_id`, `limit`, `next_cursor`, `date_start`, `date_end`, `url`, `hostname`, `path`, `ip`, `hash`, `page_url`, `page_hostname`, `page_path`, `page_asn`, `page_ip`, `account_scans`, `is_malicious`

## POST /accounts/{account_id}/urlscanner/scan

Create URL Scan

operationId: `urlscanner-create-scan`

## GET /accounts/{account_id}/urlscanner/scan/{scan_id}

Get URL scan

operationId: `urlscanner-get-scan` · query: `full`

## GET /accounts/{account_id}/urlscanner/scan/{scan_id}/har

Get URL scan's HAR

operationId: `urlscanner-get-scan-har`

## GET /accounts/{account_id}/urlscanner/scan/{scan_id}/screenshot

Get screenshot

operationId: `urlscanner-get-scan-screenshot` · query: `resolution`
