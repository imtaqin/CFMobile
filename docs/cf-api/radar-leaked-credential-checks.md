# Radar Leaked Credential Checks

6 endpoints.

## GET /radar/leaked_credential_checks/summary/{dimension}

Get HTTP authentication requests distribution by dimension

operationId: `radar-get-leaked-credential-checks-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `botClass`, `compromised`, `limitPerGroup`, `format`

## GET /radar/leaked_credential_checks/summary/bot_class

Get HTTP authentication requests by bot class summary

operationId: `radar-get-leaked-credential-checks-summary-by-bot-class` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `compromised`, `format`

## GET /radar/leaked_credential_checks/summary/compromised

Get HTTP authentication requests by compromised credential status summary

operationId: `radar-get-leaked-credential-checks-summary-by-compromised` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `botClass`, `format`

## GET /radar/leaked_credential_checks/timeseries_groups/{dimension}

Get time series distribution of HTTP authentication requests by dimension.

operationId: `radar-get-leaked-credential-checks-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `botClass`, `compromised`, `checkResult`, `limitPerGroup`, `normalization`, `format`

## GET /radar/leaked_credential_checks/timeseries_groups/bot_class

Get HTTP authentication requests by bot class time series

operationId: `radar-get-leaked-credential-checks-timeseries-group-by-bot-class` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `compromised`, `format`

## GET /radar/leaked_credential_checks/timeseries_groups/compromised

Get HTTP authentication requests by compromised credential status time series

operationId: `radar-get-leaked-credential-checks-timeseries-group-by-compromised` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `botClass`, `format`
