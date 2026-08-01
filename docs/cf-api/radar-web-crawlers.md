# Radar Web Crawlers

2 endpoints.

## GET /radar/bots/crawlers/summary/{dimension}

Get crawler HTTP request distribution by dimension

operationId: `radar-get-crawlers-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `botOperator`, `vertical`, `industry`, `clientType`, `responseStatus`, `responseStatusCategory`, `format`

## GET /radar/bots/crawlers/timeseries_groups/{dimension}

Get time series of crawler HTTP request distribution by dimension

operationId: `radar-get-crawlers-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `normalization`, `botOperator`, `vertical`, `industry`, `clientType`, `responseStatus`, `responseStatusCategory`, `format`
