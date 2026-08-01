# Radar Internet Services Ranking

3 endpoints.

## GET /radar/ranking/internet_services/categories

List Internet services categories

operationId: `radar-get-ranking-internet-services-categories` · query: `limit`, `name`, `date`, `format`

## GET /radar/ranking/internet_services/timeseries_groups

Get Internet services rank time series

operationId: `radar-get-ranking-internet-services-timeseries` · query: `serviceCategory`, `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `format`

## GET /radar/ranking/internet_services/top

Get top Internet services

operationId: `radar-get-ranking-top-internet-services` · query: `serviceCategory`, `limit`, `name`, `date`, `format`
