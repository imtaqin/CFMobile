# Radar NetFlows

6 endpoints.

## GET /radar/netflows/summary

Get network traffic summary

operationId: `radar-get-netflows-summary-deprecated` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `format`

## GET /radar/netflows/summary/{dimension}

Get network traffic distribution by dimension

operationId: `radar-get-netflows-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `product`, `limitPerGroup`, `format`

## GET /radar/netflows/timeseries

Get network traffic time series

operationId: `radar-get-netflows-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `product`, `asn`, `location`, `continent`, `geoId`, `normalization`, `format`

## GET /radar/netflows/timeseries_groups/{dimension}

Get time series distribution of network traffic by dimension

operationId: `radar-get-netflows-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `limitPerGroup`, `normalization`, `product`, `format`

## GET /radar/netflows/top/ases

Get top ASes by network traffic

operationId: `radar-get-netflows-top-ases` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `format`

## GET /radar/netflows/top/locations

Get top locations by network traffic

operationId: `radar-get-netflows-top-locations` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `format`
