# Radar AI Bots

5 endpoints.

## GET /radar/ai/bots/summary/{dimension}

Get AI bots HTTP requests distribution by dimension

operationId: `radar-get-ai-bots-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `crawlPurpose`, `userAgent`, `vertical`, `industry`, `contentType`, `responseStatus`, `responseStatusCategory`, `limitPerGroup`, `format`

## GET /radar/ai/bots/summary/user_agent

Get AI user agents summary

operationId: `radar-get-ai-bots-summary-by-user-agent` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `limitPerGroup`, `format`

## GET /radar/ai/bots/timeseries

Get AI bots HTTP requests time series

operationId: `radar-get-ai-bots-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `crawlPurpose`, `userAgent`, `industry`, `vertical`, `contentType`, `responseStatus`, `responseStatusCategory`, `limitPerGroup`, `format`

## GET /radar/ai/bots/timeseries_groups/{dimension}

Get time series distribution of AI bots HTTP requests by dimension.

operationId: `radar-get-ai-bots-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `crawlPurpose`, `userAgent`, `industry`, `vertical`, `contentType`, `responseStatus`, `responseStatusCategory`, `limitPerGroup`, `normalization`, `format`

## GET /radar/ai/bots/timeseries_groups/user_agent

Get AI user agents time series

operationId: `radar-get-ai-bots-timeseries-group-by-user-agent` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `limitPerGroup`, `format`
