# Radar Layer 3 Attacks

22 endpoints.

## GET /radar/attacks/layer3/summary/{dimension}

Get layer 3 attacks summary by dimension

operationId: `radar-get-attacks-layer3-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `direction`, `limitPerGroup`, `format`

## GET /radar/attacks/layer3/summary/bitrate

Get layer 3 attacks by bitrate summary

operationId: `radar-get-attacks-layer3-summary-by-bitrate` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `direction`, `format`

## GET /radar/attacks/layer3/summary/duration

Get layer 3 attacks by duration summary

operationId: `radar-get-attacks-layer3-summary-by-duration` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `direction`, `format`

## GET /radar/attacks/layer3/summary/industry

Get layer 3 attacks by targeted industry summary

operationId: `radar-get-attacks-layer3-summary-by-industry` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `direction`, `limitPerGroup`, `format`

## GET /radar/attacks/layer3/summary/ip_version

Get layer 3 attacks by IP version summary

operationId: `radar-get-attacks-layer3-summary-by-ip-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `protocol`, `direction`, `format`

## GET /radar/attacks/layer3/summary/protocol

Get layer 3 attacks by protocol summary

operationId: `radar-get-attacks-layer3-summary-by-protocol` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `direction`, `format`

## GET /radar/attacks/layer3/summary/vector

Get layer 3 attacks by vector summary

operationId: `radar-get-attacks-layer3-summary-by-vector` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `direction`, `limitPerGroup`, `format`

## GET /radar/attacks/layer3/summary/vertical

Get layer 3 attacks by targeted vertical summary

operationId: `radar-get-attacks-layer3-summary-by-vertical` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `direction`, `limitPerGroup`, `format`

## GET /radar/attacks/layer3/timeseries

Get layer 3 attacks by bytes time series

operationId: `radar-get-attacks-layer3-timeseries-by-bytes` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `protocol`, `normalization`, `metric`, `direction`, `format`

## GET /radar/attacks/layer3/timeseries_groups/{dimension}

Get layer 3 attacks time series grouped by dimension

operationId: `radar-get-attacks-layer3-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `normalization`, `direction`, `limitPerGroup`, `format`

## GET /radar/attacks/layer3/timeseries_groups/bitrate

Get layer 3 attacks by bitrate time series

operationId: `radar-get-attacks-layer3-timeseries-group-by-bitrate` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `normalization`, `direction`, `format`

## GET /radar/attacks/layer3/timeseries_groups/duration

Get layer 3 attacks by duration time series

operationId: `radar-get-attacks-layer3-timeseries-group-by-duration` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `normalization`, `direction`, `format`

## GET /radar/attacks/layer3/timeseries_groups/industry

Get layer 3 attacks by target industries time series

operationId: `radar-get-attacks-layer3-timeseries-group-by-industry` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `normalization`, `direction`, `limitPerGroup`, `format`

## GET /radar/attacks/layer3/timeseries_groups/ip_version

Get layer 3 attacks by IP version time series

operationId: `radar-get-attacks-layer3-timeseries-group-by-ip-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `protocol`, `normalization`, `direction`, `format`

## GET /radar/attacks/layer3/timeseries_groups/protocol

Get layer 3 attacks by protocol time series

operationId: `radar-get-attacks-layer3-timeseries-group-by-protocol` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `normalization`, `direction`, `format`

## GET /radar/attacks/layer3/timeseries_groups/vector

Get layer 3 attacks by vector time series

operationId: `radar-get-attacks-layer3-timeseries-group-by-vector` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `normalization`, `direction`, `limitPerGroup`, `format`

## GET /radar/attacks/layer3/timeseries_groups/vertical

Get layer 3 attacks by vertical time series

operationId: `radar-get-attacks-layer3-timeseries-group-by-vertical` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `normalization`, `direction`, `limitPerGroup`, `format`

## GET /radar/attacks/layer3/top/attacks

Get top layer 3 attack pairs (origin and target locations)

operationId: `radar-get-attacks-layer3-top-attacks` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `limitDirection`, `limitPerLocation`, `magnitude`, `normalization`, `format`

## GET /radar/attacks/layer3/top/industry

Get top industries targeted by layer 3 attacks

operationId: `radar-get-attacks-layer3-top-industries` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `format`

## GET /radar/attacks/layer3/top/locations/origin

Get top origin locations of layer 3 attacks

operationId: `radar-get-attacks-layer3-top-origin-locations` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `format`

## GET /radar/attacks/layer3/top/locations/target

Get top target locations of layer 3 attacks

operationId: `radar-get-attacks-layer3-top-target-locations` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `format`

## GET /radar/attacks/layer3/top/vertical

Get top verticals targeted by layer 3 attacks

operationId: `radar-get-attacks-layer3-top-verticals` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `protocol`, `format`
