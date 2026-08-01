# Radar BGP

19 endpoints.

## GET /radar/bgp/hijacks/events

Get BGP hijack events

operationId: `radar-get-bgp-hijacks-events` · query: `page`, `per_page`, `eventId`, `hijackerAsn`, `victimAsn`, `involvedAsn`, `involvedCountry`, `prefix`, `minConfidence`, `maxConfidence`, `dateRange`, `dateStart`, `dateEnd`, `sortBy`, `sortOrder`, `format`

## GET /radar/bgp/ips/timeseries

Get announced IP address space time series

operationId: `radar-get-bgp-ips-timeseries` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `ipVersion`, `includeDelay`, `format`

## GET /radar/bgp/ips/top/ases

Get top ASes by announced IP space

operationId: `radar-get-bgp-ips-top-ases` · query: `date`, `limit`, `metric`, `country`, `format`

## GET /radar/bgp/leaks/events

Get BGP route leak events

operationId: `radar-get-bgp-route-leak-events` · query: `page`, `per_page`, `eventId`, `leakAsn`, `involvedAsn`, `involvedCountry`, `dateRange`, `dateStart`, `dateEnd`, `sortBy`, `sortOrder`, `format`

## GET /radar/bgp/routes/ases

List ASes from global routing tables

operationId: `radar-get-bgp-routes-asns` · query: `location`, `limit`, `sortBy`, `sortOrder`, `format`

## GET /radar/bgp/routes/moas

Get Multi-Origin AS (MOAS) prefixes

operationId: `radar-get-bgp-pfx2as-moas` · query: `origin`, `prefix`, `invalid_only`, `format`

## GET /radar/bgp/routes/paths/{asn}

Get tier-1 path segments for an AS

operationId: `radar-get-bgp-routes-paths` · query: `ipVersion`, `collector`, `format`

## GET /radar/bgp/routes/pfx2as

Get prefix-to-ASN mapping

operationId: `radar-get-bgp-pfx2as` · query: `prefix`, `origin`, `rpkiStatus`, `longestPrefixMatch`, `format`

## GET /radar/bgp/routes/realtime

Get real-time BGP routes for a prefix

operationId: `radar-get-bgp-routes-realtime` · query: `prefix`, `format`

## GET /radar/bgp/routes/stats

Get BGP routing table stats

operationId: `radar-get-bgp-routes-stats` · query: `asn`, `location`, `format`

## GET /radar/bgp/routes/upstreams/{asn}/timeseries

Get upstream composition time series for an AS

operationId: `radar-get-bgp-routes-upstreams-timeseries` · query: `ipVersion`, `dateStart`, `dateEnd`, `limit`, `format`

## GET /radar/bgp/rpki/aspa/changes

Get ASPA changes over time

operationId: `radar-get-bgp-rpki-aspa-changes` · query: `dateStart`, `dateEnd`, `asn`, `includeAsnInfo`, `format`

## GET /radar/bgp/rpki/aspa/snapshot

Get ASPA objects snapshot

operationId: `radar-get-bgp-rpki-aspa-snapshot` · query: `customerAsn`, `providerAsn`, `date`, `includeAsnInfo`, `format`

## GET /radar/bgp/rpki/aspa/timeseries

Get ASPA count time series

operationId: `radar-get-bgp-rpki-aspa-timeseries` · query: `dateStart`, `dateEnd`, `name`, `rir`, `location`, `format`

## GET /radar/bgp/rpki/roas/timeseries

Get RPKI ROA deployment time series

operationId: `radar-get-bgp-rpki-roas-timeseries` · query: `dateStart`, `dateEnd`, `metric`, `asn`, `location`, `name`, `format`

## GET /radar/bgp/timeseries

Get BGP time series

operationId: `radar-get-bgp-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `prefix`, `updateType`, `asn`, `format`

## GET /radar/bgp/top/ases

Get top ASes by BGP updates

operationId: `radar-get-bgp-top-ases` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `prefix`, `updateType`, `format`

## GET /radar/bgp/top/ases/prefixes

Get top ASes by prefix count

operationId: `radar-get-bgp-top-asns-by-prefixes` · query: `country`, `limit`, `format`

## GET /radar/bgp/top/prefixes

Get top prefixes by BGP updates

operationId: `radar-get-bgp-top-prefixes` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `updateType`, `format`
