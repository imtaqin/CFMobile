# Radar Quality

6 endpoints.

## GET /radar/quality/iqi/summary

Get Internet Quality Index (IQI) summary

operationId: `radar-get-quality-index-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `metric`, `format`

## GET /radar/quality/iqi/timeseries_groups

Get Internet Quality Index (IQI) time series

operationId: `radar-get-quality-index-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `interpolation`, `metric`, `format`

## GET /radar/quality/speed/histogram

Get speed tests histogram

operationId: `radar-get-quality-speed-histogram` · query: `name`, `dateEnd`, `asn`, `location`, `continent`, `bucketSize`, `metricGroup`, `format`

## GET /radar/quality/speed/summary

Get speed tests summary

operationId: `radar-get-quality-speed-summary` · query: `name`, `dateEnd`, `asn`, `location`, `continent`, `format`

## GET /radar/quality/speed/top/ases

Get top ASes by speed test results

operationId: `radar-get-quality-speed-top-ases` · query: `limit`, `name`, `dateEnd`, `asn`, `location`, `continent`, `orderBy`, `reverse`, `format`

## GET /radar/quality/speed/top/locations

Get top locations by speed test results

operationId: `radar-get-quality-speed-top-locations` · query: `limit`, `name`, `dateEnd`, `asn`, `location`, `continent`, `orderBy`, `reverse`, `format`
