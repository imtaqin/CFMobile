# Radar TCP Resets and Timeouts

2 endpoints.

## GET /radar/tcp_resets_timeouts/summary

Get TCP resets and timeouts summary

operationId: `radar-get-tcp-resets-timeouts-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `format`

## GET /radar/tcp_resets_timeouts/timeseries_groups

Get TCP resets and timeouts time series

operationId: `radar-get-tcp-resets-timeouts-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `format`
