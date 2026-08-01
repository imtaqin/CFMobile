# Radar Email Routing

14 endpoints.

## GET /radar/email/routing/summary/{dimension}

Get email routing summary by dimension

operationId: `radar-get-email-routing-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `ipVersion`, `encrypted`, `limitPerGroup`, `format`

## GET /radar/email/routing/summary/arc

Get email ARC validation summary

operationId: `radar-get-email-routing-summary-by-arc` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `dkim`, `dmarc`, `spf`, `ipVersion`, `encrypted`, `format`

## GET /radar/email/routing/summary/dkim

Get email DKIM validation summary

operationId: `radar-get-email-routing-summary-by-dkim` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dmarc`, `spf`, `ipVersion`, `encrypted`, `format`

## GET /radar/email/routing/summary/dmarc

Get email DMARC validation summary

operationId: `radar-get-email-routing-summary-by-dmarc` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `spf`, `ipVersion`, `encrypted`, `format`

## GET /radar/email/routing/summary/encrypted

Get email encryption status summary

operationId: `radar-get-email-routing-summary-by-encrypted` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `ipVersion`, `format`

## GET /radar/email/routing/summary/ip_version

Get email IP version summary

operationId: `radar-get-email-routing-summary-by-ip-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `encrypted`, `format`

## GET /radar/email/routing/summary/spf

Get email SPF validation summary

operationId: `radar-get-email-routing-summary-by-spf` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `ipVersion`, `encrypted`, `format`

## GET /radar/email/routing/timeseries_groups/{dimension}

Get email routing time series grouped by dimension

operationId: `radar-get-email-routing-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `ipVersion`, `encrypted`, `limitPerGroup`, `format`

## GET /radar/email/routing/timeseries_groups/arc

Get email ARC validation time series

operationId: `radar-get-email-routing-timeseries-group-by-arc` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `dkim`, `dmarc`, `spf`, `ipVersion`, `encrypted`, `format`

## GET /radar/email/routing/timeseries_groups/dkim

Get email DKIM validation time series

operationId: `radar-get-email-routing-timeseries-group-by-dkim` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dmarc`, `spf`, `ipVersion`, `encrypted`, `format`

## GET /radar/email/routing/timeseries_groups/dmarc

Get email DMARC validation time series

operationId: `radar-get-email-routing-timeseries-group-by-dmarc` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `spf`, `ipVersion`, `encrypted`, `format`

## GET /radar/email/routing/timeseries_groups/encrypted

Get email encryption status time series

operationId: `radar-get-email-routing-timeseries-group-by-encrypted` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `ipVersion`, `format`

## GET /radar/email/routing/timeseries_groups/ip_version

Get email IP version time series

operationId: `radar-get-email-routing-timeseries-group-by-ip-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `encrypted`, `format`

## GET /radar/email/routing/timeseries_groups/spf

Get email SPF validation time series

operationId: `radar-get-email-routing-timeseries-group-by-spf` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `ipVersion`, `encrypted`, `format`
