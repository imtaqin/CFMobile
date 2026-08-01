# DEX Synthetic Application Monitoring

20 endpoints.

## GET /accounts/{account_id}/dex/colos

List Cloudflare colos

operationId: `dex-endpoints-list-colos` · query: `from`, `to`, `sortBy`

## GET /accounts/{account_id}/dex/devices/{device_id}/fleet-status/live

Get the latest status of a device.

operationId: `devices-live-status` · query: `since_minutes`, `time_now`, `colo`

## GET /accounts/{account_id}/dex/devices/{device_id}/fleet-status/over-time

Get the status over time for a device

operationId: `dex-device-status-over-time` · query: `from`, `to`, `interval`, `colo`

## GET /accounts/{account_id}/dex/devices/{device_id}/isps

List device ISPs

operationId: `dex-endpoints-list-device-isps` · query: `page`, `per_page`, `cursor`, `sort_by`, `sort_order`, `from`, `to`

## GET /accounts/{account_id}/dex/devices/dex_tests

List Device DEX tests

operationId: `device-dex-test-details` · query: `page`, `per_page`, `testName`, `kind`

## POST /accounts/{account_id}/dex/devices/dex_tests

Create Device DEX test

operationId: `device-dex-test-create-device-dex-test`

## DELETE /accounts/{account_id}/dex/devices/dex_tests/{dex_test_id}

Delete Device DEX test

operationId: `device-dex-test-delete-device-dex-test`

## GET /accounts/{account_id}/dex/devices/dex_tests/{dex_test_id}

Get Device DEX test

operationId: `device-dex-test-get-device-dex-test`

## PUT /accounts/{account_id}/dex/devices/dex_tests/{dex_test_id}

Update Device DEX test

operationId: `device-dex-test-update-device-dex-test`

## GET /accounts/{account_id}/dex/fleet-status/devices

List details of devices using WARP.

operationId: `dex-fleet-status-devices` · query: `to`, `from`, `page`, `per_page`, `sort_by`, `colo`, `device_id`, `mode`, `status`, `platform`, `version`, `source`

## GET /accounts/{account_id}/dex/fleet-status/live

Get live aggregate device details by dimension

operationId: `dex-fleet-status-live` · query: `since_minutes`

## GET /accounts/{account_id}/dex/fleet-status/over-time

Get over time aggregate details for devices by dimension

operationId: `dex-fleet-status-over-time` · query: `to`, `from`, `colo`, `device_id`

## GET /accounts/{account_id}/dex/http-tests/{test_id}

Get details and aggregate metrics for an http test

operationId: `dex-endpoints-http-test-details` · query: `deviceId`, `from`, `to`, `interval`, `colo`

## GET /accounts/{account_id}/dex/http-tests/{test_id}/percentiles

Get percentiles for an http test

operationId: `dex-endpoints-http-test-percentiles` · query: `deviceId`, `from`, `to`, `colo`

## GET /accounts/{account_id}/dex/tests/overview

List DEX test analytics

operationId: `dex-endpoints-list-tests-overview` · query: `colo`, `testName`, `deviceId`, `registration_id`, `page`, `per_page`, `kind`

## GET /accounts/{account_id}/dex/tests/unique-devices

Get count of devices targeted

operationId: `dex-endpoints-tests-unique-devices` · query: `testName`, `deviceId`

## GET /accounts/{account_id}/dex/traceroute-test-results/{test_result_id}/network-path

Get details for a specific traceroute test run

operationId: `dex-endpoints-traceroute-test-result-network-path`

## GET /accounts/{account_id}/dex/traceroute-tests/{test_id}

Get details and aggregate metrics for a traceroute test

operationId: `dex-endpoints-traceroute-test-details` · query: `deviceId`, `from`, `to`, `interval`, `colo`

## GET /accounts/{account_id}/dex/traceroute-tests/{test_id}/network-path

Get network path breakdown for a traceroute test

operationId: `dex-endpoints-traceroute-test-network-path` · query: `deviceId`, `from`, `to`, `interval`

## GET /accounts/{account_id}/dex/traceroute-tests/{test_id}/percentiles

Get percentiles for a traceroute test

operationId: `dex-endpoints-traceroute-test-percentiles` · query: `deviceId`, `from`, `to`, `colo`
