# Radar Bots

5 endpoints.

## GET /radar/bots

List bots

operationId: `radar-get-bots` · query: `limit`, `offset`, `botCategory`, `botOperator`, `kind`, `botVerificationStatus`, `format`

## GET /radar/bots/{bot_slug}

Get bot details

operationId: `radar-get-bot-details` · query: `format`

## GET /radar/bots/summary/{dimension}

Get bots HTTP requests distribution by dimension

operationId: `radar-get-bots-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `limitPerGroup`, `bot`, `botOperator`, `botCategory`, `botKind`, `botVerificationStatus`, `format`

## GET /radar/bots/timeseries

Get bots HTTP requests time series

operationId: `radar-get-bots-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `bot`, `botOperator`, `botCategory`, `botKind`, `botVerificationStatus`, `format`

## GET /radar/bots/timeseries_groups/{dimension}

Get time series distribution of bots HTTP requests by dimension.

operationId: `radar-get-bots-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `limitPerGroup`, `bot`, `botOperator`, `botCategory`, `botKind`, `botVerificationStatus`, `format`
