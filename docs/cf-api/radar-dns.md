# Radar DNS

25 endpoints.

## GET /radar/dns/summary/{dimension}

Get DNS summary by dimension

operationId: `radar-get-dns-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `cacheHit`, `nodata`, `protocol`, `queryType`, `responseCode`, `responseTtl`, `dnssec`, `dnssecAware`, `dnssecE2e`, `ipVersion`, `limitPerGroup`, `matchingAnswer`, `tld`, `format`

## GET /radar/dns/summary/cache_hit

Get DNS queries by cache status summary

operationId: `radar-get-dns-summary-by-cache-hit-status` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/summary/dnssec

Get DNS queries by DNSSEC support summary

operationId: `radar-get-dns-summary-by-dnssec` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/summary/dnssec_aware

Get DNS queries by DNSSEC awareness summary

operationId: `radar-get-dns-summary-by-dnssec-awareness` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/summary/dnssec_e2e

Get DNS queries by DNSSEC end-to-end summary

operationId: `radar-get-dns-summary-by-dnssec-e2e-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/summary/ip_version

Get DNS queries by IP version summary

operationId: `radar-get-dns-summary-by-ip-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/summary/matching_answer

Get DNS queries by matching answer summary

operationId: `radar-get-dns-summary-by-matching-answer-status` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/summary/protocol

Get DNS queries by protocol summary

operationId: `radar-get-dns-summary-by-protocol` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `responseCode`, `nodata`, `format`

## GET /radar/dns/summary/query_type

Get DNS queries by type summary

operationId: `radar-get-dns-summary-by-query-type` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `protocol`, `responseCode`, `nodata`, `limitPerGroup`, `format`

## GET /radar/dns/summary/response_code

Get DNS queries by response code summary

operationId: `radar-get-dns-summary-by-response-code` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `nodata`, `limitPerGroup`, `format`

## GET /radar/dns/summary/response_ttl

Get DNS queries by response TTL summary

operationId: `radar-get-dns-summary-by-response-ttl` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/timeseries

Get DNS queries time series

operationId: `radar-get-dns-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `cacheHit`, `nodata`, `protocol`, `queryType`, `responseCode`, `responseTtl`, `dnssec`, `dnssecAware`, `dnssecE2e`, `ipVersion`, `matchingAnswer`, `tld`, `format`

## GET /radar/dns/timeseries_groups/{dimension}

Get DNS time series grouped by dimension

operationId: `radar-get-dns-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `cacheHit`, `nodata`, `protocol`, `queryType`, `responseCode`, `responseTtl`, `dnssec`, `dnssecAware`, `dnssecE2e`, `ipVersion`, `limitPerGroup`, `matchingAnswer`, `tld`, `normalization`, `format`

## GET /radar/dns/timeseries_groups/cache_hit

Get DNS queries by cache status time series

operationId: `radar-get-dns-timeseries-group-by-cache-hit-status` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/timeseries_groups/dnssec

Get DNS queries by DNSSEC support time series

operationId: `radar-get-dns-timeseries-group-by-dnssec` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/timeseries_groups/dnssec_aware

Get DNS queries by DNSSEC awareness time series

operationId: `radar-get-dns-timeseries-group-by-dnssec-awareness` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/timeseries_groups/dnssec_e2e

Get DNS queries by DNSSEC end-to-end time series

operationId: `radar-get-dns-timeseries-group-by-dnssec-e2e-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/timeseries_groups/ip_version

Get DNS queries by IP version time series

operationId: `radar-get-dns-timeseries-group-by-ip-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/timeseries_groups/matching_answer

Get DNS queries by matching answer time series

operationId: `radar-get-dns-timeseries-group-by-matching-answer-status` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/timeseries_groups/protocol

Get DNS queries by protocol time series

operationId: `radar-get-dns-timeseries-group-by-protocol` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `responseCode`, `nodata`, `format`

## GET /radar/dns/timeseries_groups/query_type

Get DNS queries by type time series

operationId: `radar-get-dns-timeseries-group-by-query-type` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `protocol`, `responseCode`, `nodata`, `limitPerGroup`, `format`

## GET /radar/dns/timeseries_groups/response_code

Get DNS queries by response code time series

operationId: `radar-get-dns-timeseries-group-by-response-code` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `nodata`, `limitPerGroup`, `format`

## GET /radar/dns/timeseries_groups/response_ttl

Get DNS queries by response TTL time series

operationId: `radar-get-dns-timeseries-group-by-response-ttl` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `tld`, `queryType`, `protocol`, `responseCode`, `nodata`, `format`

## GET /radar/dns/top/ases

Get top ASes by DNS queries

operationId: `radar-get-dns-top-ases` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `domain`, `cacheHit`, `nodata`, `protocol`, `queryType`, `responseCode`, `responseTtl`, `dnssec`, `dnssecAware`, `dnssecE2e`, `ipVersion`, `matchingAnswer`, `format`

## GET /radar/dns/top/locations

Get top locations by DNS queries

operationId: `radar-get-dns-top-locations` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `domain`, `cacheHit`, `nodata`, `protocol`, `queryType`, `responseCode`, `responseTtl`, `dnssec`, `dnssecAware`, `dnssecE2e`, `ipVersion`, `matchingAnswer`, `tld`, `format`
