# Observatory

10 endpoints.

## GET /zones/{zone_id}/speed_api/availabilities

Get quota and availability

operationId: `speed-get-availabilities`

## GET /zones/{zone_id}/speed_api/pages

List tested webpages

operationId: `speed-list-pages`

## DELETE /zones/{zone_id}/speed_api/pages/{url}/tests

Delete all page tests

operationId: `speed-delete-tests` · query: `region`

## GET /zones/{zone_id}/speed_api/pages/{url}/tests

List page test history

operationId: `speed-list-test-history` · query: `page`, `per_page`, `region`

## POST /zones/{zone_id}/speed_api/pages/{url}/tests

Start page test

operationId: `speed-create-test`

## GET /zones/{zone_id}/speed_api/pages/{url}/tests/{test_id}

Get a page test result

operationId: `speed-get-test`

## GET /zones/{zone_id}/speed_api/pages/{url}/trend

List core web vital metrics trend

operationId: `speed-list-page-trend` · query: `region`, `deviceType`, `start`, `end`, `tz`, `metrics`

## DELETE /zones/{zone_id}/speed_api/schedule/{url}

Delete scheduled page test

operationId: `speed-delete-test-schedule` · query: `region`

## GET /zones/{zone_id}/speed_api/schedule/{url}

Get a page test schedule

operationId: `speed-get-scheduled-test` · query: `region`

## POST /zones/{zone_id}/speed_api/schedule/{url}

Create scheduled page test

operationId: `speed-create-scheduled-test` · query: `region`, `frequency`
