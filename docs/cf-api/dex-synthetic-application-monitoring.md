# DEX Synthetic Application Monitoring

20 endpoints.

## GET /accounts/{account_id}/dex/colos

List Cloudflare colos

operationId: `dex-endpoints-list-colos` · query: `from`, `to`, `sortBy`

**Response** 200 → `result`

[array of]
- `airportCode`: string **required** — Airport code
- `city`: string **required** — City
- `countryCode`: string **required** — Country code

## GET /accounts/{account_id}/dex/devices/{device_id}/fleet-status/live

Get the latest status of a device.

operationId: `devices-live-status` · query: `since_minutes`, `time_now`, `colo`

**Response** 200 → `result`

- `alwaysOn`: boolean
- `batteryCharging`: boolean
- `batteryCycles`: integer
- `batteryPct`: number
- `colo`: string **required** — Cloudflare colo airport code.
- `connectionType`: string
- `cpuPct`: number
- `cpuPctByApp`: object[]
  [array of]
  - `cpu_pct`: number — CPU usage percentage, on a scale of 0 to 100.
  - `name`: string — Application name.
- `deviceId`: string **required** — Device identifier (UUID v4)
- `deviceIpv4`: object
- `deviceIpv6`: object
- `deviceName`: string — Device identifier (human readable).
- `deviceRegistration`: string — Deprecated: use registrationId. Device registration identifier (UUID).
- `diskReadBps`: integer
- `diskUsagePct`: number
- `diskWriteBps`: integer
- `dohSubdomain`: string
- `estimatedLossPct`: number
- `firewallEnabled`: boolean
- `gatewayIpv4`: object
- `gatewayIpv6`: object
- `handshakeLatencyMs`: number
- `ispIpv4`: object
- `ispIpv6`: object
- `metal`: string
- `mode`: string **required** — The mode under which the WARP client is run.
- `networkRcvdBps`: integer
- `networkSentBps`: integer
- `networkSsid`: string
- `personEmail`: string — User contact email address
- `platform`: string **required** — Operating system.
- `ramAvailableKb`: integer
- `ramUsedPct`: number
- `ramUsedPctByApp`: object[]
  [array of]
  - `name`: string — Application name.
  - `ram_used_pct`: number — RAM usage percentage, on a scale of 0 to 100.
- `registrationId`: string — Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user's registration on the device.
- `rtt`: object — Round-trip time statistics for the WARP tunnel.
- `status`: string **required** — Network status.
- `switchLocked`: boolean
- `timestamp`: string **required**
- `tunnelStats`: object — WARP tunnel packet and byte counters.
- `tunnelType`: string
- `version`: string **required** — WARP client version.
- `wifiStrengthDbm`: integer

## GET /accounts/{account_id}/dex/devices/{device_id}/fleet-status/over-time

Get the status over time for a device

operationId: `dex-device-status-over-time` · query: `from`, `to`, `interval`, `colo`

**Response** 200 → `result`

- `over_time`: object **required** — Time-bucketed device metrics.
  - `battery_cycles`: object[] — Battery cycle count over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: integer **required** — Integer metric value for the time slot.
  - `battery_pct`: object[] — Battery percentage over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: number **required** — Float metric value for the time slot.
  - `connection_type`: object[] — Connection type over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: string **required** — String metric value for the time slot.
  - `cpu_pct`: object[] — CPU usage percentage over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: number **required** — Float metric value for the time slot.
  - `disk_read_bps`: object[] — Disk read throughput in bytes per second over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: integer **required** — Integer metric value for the time slot.
  - `disk_usage_pct`: object[] — Disk usage percentage over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: number **required** — Float metric value for the time slot.
  - `disk_write_bps`: object[] — Disk write throughput in bytes per second over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: integer **required** — Integer metric value for the time slot.
  - `mode`: object[] — WARP mode over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: string **required** — String metric value for the time slot.
  - `network_rcvd_bps`: object[] — Network bytes received per second over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: integer **required** — Integer metric value for the time slot.
  - `network_sent_bps`: object[] — Network bytes sent per second over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: integer **required** — Integer metric value for the time slot.
  - `network_ssid`: object[] — Network SSID over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: string **required** — String metric value for the time slot.
  - `ram_available_kb`: object[] — Available RAM in kilobytes over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: integer **required** — Integer metric value for the time slot.
  - `ram_used_pct`: object[] — RAM usage percentage over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: number **required** — Float metric value for the time slot.
  - `rtt`: object[] — Round-trip time stats over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: any **required** — Round-trip time statistics for the time slot.
  - `status`: object[] — Device status over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: string **required** — String metric value for the time slot.
  - `top_cpu_applications`: object[] — Top CPU-consuming applications over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: object[] **required** — Top CPU-consuming applications for the time slot.
  - `top_ram_applications`: object[] — Top RAM-consuming applications over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: object[] **required** — Top RAM-consuming applications for the time slot.
  - `tunnel_stats`: object[] — Tunnel stats over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: any **required** — WARP tunnel packet and byte counters measured within the stats window for the time slot.
  - `tunnel_type`: object[] — Tunnel type over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: string **required** — String metric value for the time slot.
  - `unique_networks`: object[] — Unique network count over time.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: integer **required** — Integer metric value for the time slot.
  - `wifi_strength_dbm`: object[] — Wi-Fi signal strength over time in dBm.
    [array of]
    - `timestamp`: string **required** — Timestamp of the time slot.
    - `value`: integer **required** — Integer metric value for the time slot.
- `top_networks`: object[] **required** — Top networks observed for the device.
  [array of]
  - `count`: integer **required** — Number of observations.
  - `name`: string **required** — Network name.

## GET /accounts/{account_id}/dex/devices/{device_id}/isps

List device ISPs

operationId: `dex-endpoints-list-device-isps` · query: `page`, `per_page`, `cursor`, `sort_by`, `sort_order`, `from`, `to`

**Response** 200 → `result`

- `isps`: object[] **required**
  [array of]
  - `ip`: object — IP address information for the ISP hop. Fields marked as PII-gated (`name`, `address`, `netmask`, and all `location` sub-fields) will be ret
    - `address`: string — IP address. Returned as `"REDACTED"` without PII permission.
    - `asn`: integer — Autonomous System Number.
    - `aso`: string — Autonomous System Organization name.
    - `location`: object — Geographic location information. All fields are returned as the literal string `"REDACTED"` for callers that do not have the PII permission.
    - `name`: string — Named IP address (reverse DNS hostname when available). Returned as `"REDACTED"` without PII permission.
    - `netmask`: string — Network mask. Returned as `"REDACTED"` without PII permission.
    - `version`: integer — IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).
  - `test_id`: string **required** — The test that generated this result.
  - `test_result_id`: string **required** — The specific test result.
  - `time_start`: string **required** — Timestamp of when the ISP was observed.

## GET /accounts/{account_id}/dex/devices/dex_tests

List Device DEX tests

operationId: `device-dex-test-details` · query: `page`, `per_page`, `testName`, `kind`

**Response** 200 → `result`

[array of]
object

## POST /accounts/{account_id}/dex/devices/dex_tests

Create Device DEX test

operationId: `device-dex-test-create-device-dex-test`

**Request** (application/json)

- `created`: string — Date the test was created, in RFC 3339 format.
- `data`: object **required** — The configuration object which contains the details for the WARP client to conduct the test.
  - `host`: string **required** — The desired endpoint to test.
  - `kind`: string **required** enum: `http`, `traceroute` — The type of test.
  - `method`: string enum: `GET` — The HTTP request method type.
- `description`: string — Additional details about the test.
- `enabled`: boolean **required** — Determines whether or not the test is active.
- `interval`: string **required** — How often the test will run.
- `name`: string **required** — The name of the DEX test. Must be unique.
- `target_policies`: any
- `targeted`: boolean
- `test_id`: string — The unique identifier for the test.
- `updated`: string — Date the test was last updated, in RFC 3339 format.

**Response** 200 → `result`

- `created`: string — Date the test was created, in RFC 3339 format.
- `data`: object **required** — The configuration object which contains the details for the WARP client to conduct the test.
  - `host`: string **required** — The desired endpoint to test.
  - `kind`: string **required** enum: `http`, `traceroute` — The type of test.
  - `method`: string enum: `GET` — The HTTP request method type.
- `description`: string — Additional details about the test.
- `enabled`: boolean **required** — Determines whether or not the test is active.
- `interval`: string **required** — How often the test will run.
- `name`: string **required** — The name of the DEX test. Must be unique.
- `target_policies`: any
- `targeted`: boolean
- `test_id`: string — The unique identifier for the test.
- `updated`: string — Date the test was last updated, in RFC 3339 format.

## DELETE /accounts/{account_id}/dex/devices/dex_tests/{dex_test_id}

Delete Device DEX test

operationId: `device-dex-test-delete-device-dex-test`

**Response** 200 → `result`

- `dex_tests`: object[]
  [array of]
  - `created`: string — Date the test was created, in RFC 3339 format.
  - `data`: object **required** — The configuration object which contains the details for the WARP client to conduct the test.
    - `host`: string **required** — The desired endpoint to test.
    - `kind`: string **required** enum: `http`, `traceroute` — The type of test.
    - `method`: string enum: `GET` — The HTTP request method type.
  - `description`: string — Additional details about the test.
  - `enabled`: boolean **required** — Determines whether or not the test is active.
  - `interval`: string **required** — How often the test will run.
  - `name`: string **required** — The name of the DEX test. Must be unique.
  - `target_policies`: any
  - `targeted`: boolean
  - `test_id`: string — The unique identifier for the test.
  - `updated`: string — Date the test was last updated, in RFC 3339 format.

## GET /accounts/{account_id}/dex/devices/dex_tests/{dex_test_id}

Get Device DEX test

operationId: `device-dex-test-get-device-dex-test`

**Response** 200 → `result`

- `created`: string — Date the test was created, in RFC 3339 format.
- `data`: object **required** — The configuration object which contains the details for the WARP client to conduct the test.
  - `host`: string **required** — The desired endpoint to test.
  - `kind`: string **required** enum: `http`, `traceroute` — The type of test.
  - `method`: string enum: `GET` — The HTTP request method type.
- `description`: string — Additional details about the test.
- `enabled`: boolean **required** — Determines whether or not the test is active.
- `interval`: string **required** — How often the test will run.
- `name`: string **required** — The name of the DEX test. Must be unique.
- `target_policies`: any
- `targeted`: boolean
- `test_id`: string — The unique identifier for the test.
- `updated`: string — Date the test was last updated, in RFC 3339 format.

## PUT /accounts/{account_id}/dex/devices/dex_tests/{dex_test_id}

Update Device DEX test

operationId: `device-dex-test-update-device-dex-test`

**Request** (application/json)

- `created`: string — Date the test was created, in RFC 3339 format.
- `data`: object **required** — The configuration object which contains the details for the WARP client to conduct the test.
  - `host`: string **required** — The desired endpoint to test.
  - `kind`: string **required** enum: `http`, `traceroute` — The type of test.
  - `method`: string enum: `GET` — The HTTP request method type.
- `description`: string — Additional details about the test.
- `enabled`: boolean **required** — Determines whether or not the test is active.
- `interval`: string **required** — How often the test will run.
- `name`: string **required** — The name of the DEX test. Must be unique.
- `target_policies`: any
- `targeted`: boolean
- `test_id`: string — The unique identifier for the test.
- `updated`: string — Date the test was last updated, in RFC 3339 format.

**Response** 200 → `result`

- `created`: string — Date the test was created, in RFC 3339 format.
- `data`: object **required** — The configuration object which contains the details for the WARP client to conduct the test.
  - `host`: string **required** — The desired endpoint to test.
  - `kind`: string **required** enum: `http`, `traceroute` — The type of test.
  - `method`: string enum: `GET` — The HTTP request method type.
- `description`: string — Additional details about the test.
- `enabled`: boolean **required** — Determines whether or not the test is active.
- `interval`: string **required** — How often the test will run.
- `name`: string **required** — The name of the DEX test. Must be unique.
- `target_policies`: any
- `targeted`: boolean
- `test_id`: string — The unique identifier for the test.
- `updated`: string — Date the test was last updated, in RFC 3339 format.

## GET /accounts/{account_id}/dex/fleet-status/devices

List details of devices using WARP.

operationId: `dex-fleet-status-devices` · query: `to`, `from`, `page`, `per_page`, `sort_by`, `colo`, `device_id`, `mode`, `status`, `platform`, `version`, `source`

**Response** 200 → `result`

[array of]
- `alwaysOn`: boolean
- `batteryCharging`: boolean
- `batteryCycles`: integer
- `batteryPct`: number
- `colo`: string **required** — Cloudflare colo airport code.
- `connectionType`: string
- `cpuPct`: number
- `cpuPctByApp`: object[]
  [array of]
  - `cpu_pct`: number — CPU usage percentage, on a scale of 0 to 100.
  - `name`: string — Application name.
- `deviceId`: string **required** — Device identifier (UUID v4)
- `deviceIpv4`: object
- `deviceIpv6`: object
- `deviceName`: string — Device identifier (human readable).
- `deviceRegistration`: string — Deprecated: use registrationId. Device registration identifier (UUID).
- `diskReadBps`: integer
- `diskUsagePct`: number
- `diskWriteBps`: integer
- `dohSubdomain`: string
- `estimatedLossPct`: number
- `firewallEnabled`: boolean
- `gatewayIpv4`: object
- `gatewayIpv6`: object
- `handshakeLatencyMs`: number
- `ispIpv4`: object
- `ispIpv6`: object
- `metal`: string
- `mode`: string **required** — The mode under which the WARP client is run.
- `networkRcvdBps`: integer
- `networkSentBps`: integer
- `networkSsid`: string
- `personEmail`: string — User contact email address
- `platform`: string **required** — Operating system.
- `ramAvailableKb`: integer
- `ramUsedPct`: number
- `ramUsedPctByApp`: object[]
  [array of]
  - `name`: string — Application name.
  - `ram_used_pct`: number — RAM usage percentage, on a scale of 0 to 100.
- `registrationId`: string — Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user's registration on the device.
- `rtt`: object — Round-trip time statistics for the WARP tunnel.
- `status`: string **required** — Network status.
- `switchLocked`: boolean
- `timestamp`: string **required**
- `tunnelStats`: object — WARP tunnel packet and byte counters.
- `tunnelType`: string
- `version`: string **required** — WARP client version.
- `wifiStrengthDbm`: integer

## GET /accounts/{account_id}/dex/fleet-status/live

Get live aggregate device details by dimension

operationId: `dex-fleet-status-live` · query: `since_minutes`

**Response** 200 → `result`

- `deviceStats`: object
  - `byColo`: object[]
    [array of]
    - `uniqueDevicesTotal`: number — Number of unique devices
    - `value`: string
  - `byMode`: object[]
    [array of]
    - `uniqueDevicesTotal`: number — Number of unique devices
    - `value`: string
  - `byPlatform`: object[]
    [array of]
    - `uniqueDevicesTotal`: number — Number of unique devices
    - `value`: string
  - `byStatus`: object[]
    [array of]
    - `uniqueDevicesTotal`: number — Number of unique devices
    - `value`: string
  - `byVersion`: object[]
    [array of]
    - `uniqueDevicesTotal`: number — Number of unique devices
    - `value`: string
  - `uniqueDevicesTotal`: number — Number of unique devices

## GET /accounts/{account_id}/dex/fleet-status/over-time

Get over time aggregate details for devices by dimension

operationId: `dex-fleet-status-over-time` · query: `to`, `from`, `colo`, `device_id`

**Response** 200 → `result`

- `deviceStats`: object
  - `byMode`: object[]
    [array of]
    - `timestamp`: string
    - `uniqueDevicesTotal`: number — Number of unique devices
    - `value`: string
  - `byStatus`: object[]
    [array of]
    - `timestamp`: string
    - `uniqueDevicesTotal`: number — Number of unique devices
    - `value`: string
  - `uniqueDevicesTotal`: number — Number of unique devices

## GET /accounts/{account_id}/dex/http-tests/{test_id}

Get details and aggregate metrics for an http test

operationId: `dex-endpoints-http-test-details` · query: `deviceId`, `from`, `to`, `interval`, `colo`

**Response** 200 → `result`

- `host`: string — The url of the HTTP synthetic application test.
- `httpStats`: object
  - `availabilityPct`: object **required**
    - `avg`: number — average observed in the time period.
    - `max`: number — highest observed in the time period.
    - `min`: number — lowest observed in the time period.
    - `slots`: object[] **required**
  - `dnsResponseTimeMs`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `httpStatusCode`: object[] **required**
    [array of]
    - `status200`: integer **required**
    - `status300`: integer **required**
    - `status400`: integer **required**
    - `status500`: integer **required**
    - `timestamp`: string **required**
  - `resourceFetchTimeMs`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `serverResponseTimeMs`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `uniqueDevicesTotal`: integer **required** — Count of unique devices that have run this test in the given time period.
- `httpStatsByColo`: object[]
  [array of]
  - `availabilityPct`: object **required**
    - `avg`: number — average observed in the time period.
    - `max`: number — highest observed in the time period.
    - `min`: number — lowest observed in the time period.
    - `slots`: object[] **required**
  - `colo`: string **required**
  - `dnsResponseTimeMs`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `httpStatusCode`: object[] **required**
    [array of]
    - `status200`: integer **required**
    - `status300`: integer **required**
    - `status400`: integer **required**
    - `status500`: integer **required**
    - `timestamp`: string **required**
  - `resourceFetchTimeMs`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `serverResponseTimeMs`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `uniqueDevicesTotal`: integer **required** — Count of unique devices that have run this test in the given time period.
- `interval`: string — The interval at which the HTTP synthetic application test is set to run.
- `kind`: string enum: `http`
- `method`: string — The HTTP method to use when running the test.
- `name`: string — The name of the HTTP synthetic application test.
- `target_policies`: object[]
  [array of]
  - `default`: boolean **required** — Whether the policy is the default for the account.
  - `id`: string **required** — API Resource UUID tag.
  - `name`: string **required**
- `targeted`: boolean

## GET /accounts/{account_id}/dex/http-tests/{test_id}/percentiles

Get percentiles for an http test

operationId: `dex-endpoints-http-test-percentiles` · query: `deviceId`, `from`, `to`, `colo`

**Response** 200 → `result`

- `dnsResponseTimeMs`: object
  - `p50`: number — p50 observed in the time period.
  - `p90`: number — p90 observed in the time period.
  - `p95`: number — p95 observed in the time period.
  - `p99`: number — p99 observed in the time period.
- `resourceFetchTimeMs`: object
  - `p50`: number — p50 observed in the time period.
  - `p90`: number — p90 observed in the time period.
  - `p95`: number — p95 observed in the time period.
  - `p99`: number — p99 observed in the time period.
- `serverResponseTimeMs`: object
  - `p50`: number — p50 observed in the time period.
  - `p90`: number — p90 observed in the time period.
  - `p95`: number — p95 observed in the time period.
  - `p99`: number — p99 observed in the time period.

## GET /accounts/{account_id}/dex/tests/overview

List DEX test analytics

operationId: `dex-endpoints-list-tests-overview` · query: `colo`, `testName`, `deviceId`, `registration_id`, `page`, `per_page`, `kind`

**Response** 200 → `result`

- `overviewMetrics`: object **required**
  - `avgHttpAvailabilityPct`: number — percentage availability for all HTTP test results in response.
  - `avgTracerouteAvailabilityPct`: number — percentage availability for all traceroutes results in response.
  - `testsTotal`: integer **required** — number of tests.
- `tests`: object[] **required** — array of test results objects.
  [array of]
  - `created`: string **required** — date the test was created.
  - `description`: string **required** — the test description defined during configuration
  - `enabled`: boolean **required** — if true, then the test will run on targeted devices. Else, the test will not run.
  - `host`: string **required**
  - `httpResults`: object
    - `resourceFetchTime`: object **required**
  - `httpResultsByColo`: object[]
    [array of]
    - `colo`: string **required** — Cloudflare colo
    - `resourceFetchTime`: object **required**
  - `id`: string **required** — API Resource UUID tag.
  - `interval`: string **required** — The interval at which the synthetic application test is set to run.
  - `kind`: string **required** enum: `http`, `traceroute` — test type, http or traceroute
  - `method`: string — for HTTP, the method to use when running the test
  - `name`: string **required** — name given to this test
  - `target_policies`: object[]
    [array of]
    - `default`: boolean **required** — Whether the policy is the default for the account
    - `id`: string **required** — API Resource UUID tag.
    - `name`: string **required**
  - `targeted`: boolean
  - `tracerouteResults`: object
    - `roundTripTime`: object **required**
  - `tracerouteResultsByColo`: object[]
    [array of]
    - `colo`: string **required** — Cloudflare colo
    - `roundTripTime`: object **required**
  - `updated`: string **required**

## GET /accounts/{account_id}/dex/tests/unique-devices

Get count of devices targeted

operationId: `dex-endpoints-tests-unique-devices` · query: `testName`, `deviceId`

**Response** 200 → `result`

- `uniqueDevicesTotal`: integer **required** — total number of unique devices

## GET /accounts/{account_id}/dex/traceroute-test-results/{test_result_id}/network-path

Get details for a specific traceroute test run

operationId: `dex-endpoints-traceroute-test-result-network-path`

**Response** 200 → `result`

- `colo`: string — Cloudflare colo airport code.
- `deviceName`: string — Name of the device associated with this network path response.
- `execution_context`: any — Whether the test was run inside or outside of the WARP tunnel.
- `hops`: object[] **required** — An array of the hops taken by the device to reach the end destination.
  [array of]
  - `asn`: integer
  - `aso`: string
  - `ipAddress`: string
  - `location`: object
    - `city`: string
    - `state`: string
    - `zip`: string
  - `mile`: string enum: `client-to-app`, `client-to-cf-egress`, `client-to-cf-ingress`, `client-to-isp`
  - `name`: string
  - `packetLossPct`: number
  - `rttMs`: integer
  - `ttl`: integer **required**
- `resultId`: string **required** — API Resource UUID tag.
- `testId`: string — API Resource UUID tag.
- `testName`: string — Name of the traceroute test.
- `time_start`: string — Timestamp indicating when the traceroute test execution began.
- `tunnel_type`: string

## GET /accounts/{account_id}/dex/traceroute-tests/{test_id}

Get details and aggregate metrics for a traceroute test

operationId: `dex-endpoints-traceroute-test-details` · query: `deviceId`, `from`, `to`, `interval`, `colo`

**Response** 200 → `result`

- `host`: string **required** — The host of the Traceroute synthetic application test.
- `interval`: string **required** — The interval at which the Traceroute synthetic application test is set to run.
- `kind`: string **required** enum: `traceroute`
- `name`: string **required** — The name of the Traceroute synthetic application test.
- `target_policies`: object[]
  [array of]
  - `default`: boolean **required** — Whether the policy is the default for the account.
  - `id`: string **required** — API Resource UUID tag.
  - `name`: string **required**
- `targeted`: boolean
- `tracerouteStats`: object
  - `availabilityPct`: object **required**
    - `avg`: number — average observed in the time period.
    - `max`: number — highest observed in the time period.
    - `min`: number — lowest observed in the time period.
    - `slots`: object[] **required**
  - `hopsCount`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `packetLossPct`: object **required**
    - `avg`: number — average observed in the time period.
    - `max`: number — highest observed in the time period.
    - `min`: number — lowest observed in the time period.
    - `slots`: object[] **required**
  - `roundTripTimeMs`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `uniqueDevicesTotal`: integer **required** — Count of unique devices that have run this test in the given time period.
- `tracerouteStatsByColo`: object[]
  [array of]
  - `availabilityPct`: object **required**
    - `avg`: number — average observed in the time period.
    - `max`: number — highest observed in the time period.
    - `min`: number — lowest observed in the time period.
    - `slots`: object[] **required**
  - `colo`: string **required**
  - `hopsCount`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `packetLossPct`: object **required**
    - `avg`: number — average observed in the time period.
    - `max`: number — highest observed in the time period.
    - `min`: number — lowest observed in the time period.
    - `slots`: object[] **required**
  - `roundTripTimeMs`: object **required**
    - `avg`: integer — average observed in the time period.
    - `max`: integer — highest observed in the time period.
    - `min`: integer — lowest observed in the time period.
    - `slots`: object[] **required**
  - `uniqueDevicesTotal`: integer **required** — Count of unique devices that have run this test in the given time period.

## GET /accounts/{account_id}/dex/traceroute-tests/{test_id}/network-path

Get network path breakdown for a traceroute test

operationId: `dex-endpoints-traceroute-test-network-path` · query: `deviceId`, `from`, `to`, `interval`

**Response** 200 → `result`

- `deviceName`: string — Name of the device that ran the test.
- `id`: string **required** — API Resource UUID tag.
- `interval`: string — The interval at which the Traceroute synthetic application test is set to run.
- `kind`: string enum: `traceroute`
- `name`: string
- `networkPath`: object
  - `sampling`: object — Specifies the sampling applied, if any, to the slots response. When sampled, results shown represent the first test run to the start of each
    - `unit`: string **required** enum: `hours`
    - `value`: integer **required**
  - `slots`: object[] **required**
    [array of]
    - `clientToAppRttMs`: integer **required** — Round trip time in ms of the client to app mile
    - `clientToCfEgressRttMs`: integer **required** — Round trip time in ms of the client to Cloudflare egress mile
    - `clientToCfIngressRttMs`: integer **required** — Round trip time in ms of the client to Cloudflare ingress mile
    - `clientToIspRttMs`: integer — Round trip time in ms of the client to ISP mile
    - `id`: string **required** — API Resource UUID tag.
    - `timestamp`: string **required**
- `url`: string — The host of the Traceroute synthetic application test.

## GET /accounts/{account_id}/dex/traceroute-tests/{test_id}/percentiles

Get percentiles for a traceroute test

operationId: `dex-endpoints-traceroute-test-percentiles` · query: `deviceId`, `from`, `to`, `colo`

**Response** 200 → `result`

- `hopsCount`: object
  - `p50`: number — p50 observed in the time period.
  - `p90`: number — p90 observed in the time period.
  - `p95`: number — p95 observed in the time period.
  - `p99`: number — p99 observed in the time period.
- `packetLossPct`: object
  - `p50`: number — p50 observed in the time period.
  - `p90`: number — p90 observed in the time period.
  - `p95`: number — p95 observed in the time period.
  - `p99`: number — p99 observed in the time period.
- `roundTripTimeMs`: object
  - `p50`: number — p50 observed in the time period.
  - `p90`: number — p90 observed in the time period.
  - `p95`: number — p95 observed in the time period.
  - `p99`: number — p99 observed in the time period.
