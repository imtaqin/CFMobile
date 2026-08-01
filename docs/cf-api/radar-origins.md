# Radar Origins

5 endpoints.

## GET /radar/origins

List Origins

operationId: `radar-get-origins` · query: `limit`, `offset`, `format`

## GET /radar/origins/{slug}

Get Origin details

operationId: `radar-get-origin-details` · query: `format`

## GET /radar/origins/summary/{dimension}

Get origin metrics distribution by dimension

operationId: `radar-get-origins-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `origin`, `metric`, `region`, `format`

## GET /radar/origins/timeseries

Get origin metrics time series

operationId: `radar-get-origins-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `origin`, `metric`, `region`, `format`

## GET /radar/origins/timeseries_groups/{dimension}

Get origin metrics time series grouped by dimension

operationId: `radar-get-origins-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `origin`, `metric`, `region`, `normalization`, `format`
