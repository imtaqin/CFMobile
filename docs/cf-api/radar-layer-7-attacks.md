# Radar Layer 7 Attacks

23 endpoints.

## GET /radar/attacks/layer7/summary/{dimension}

Get layer 7 attacks summary by dimension

operationId: `radar-get-attacks-layer7-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/summary/http_method

Get layer 7 attacks by HTTP method summary

operationId: `radar-get-attacks-layer7-summary-by-http-method` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `mitigationProduct`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/summary/http_version

Get layer 7 attacks by HTTP version summary

operationId: `radar-get-attacks-layer7-summary-by-http-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpMethod`, `mitigationProduct`, `format`

## GET /radar/attacks/layer7/summary/industry

Get layer 7 attacks by targeted industry summary

operationId: `radar-get-attacks-layer7-summary-by-industry` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/summary/ip_version

Get layer 7 attacks by IP version summary

operationId: `radar-get-attacks-layer7-summary-by-ip-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `httpVersion`, `httpMethod`, `mitigationProduct`, `format`

## GET /radar/attacks/layer7/summary/managed_rules

Get layer 7 attacks by managed rules summary

operationId: `radar-get-attacks-layer7-summary-by-managed-rules` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/summary/mitigation_product

Get layer 7 attacks by mitigation product summary

operationId: `radar-get-attacks-layer7-summary-by-mitigation-product` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/summary/vertical

Get layer 7 attacks by targeted vertical summary

operationId: `radar-get-attacks-layer7-summary-by-vertical` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/timeseries

Get layer 7 attacks time series

operationId: `radar-get-attacks-layer7-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `normalization`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `format`

## GET /radar/attacks/layer7/timeseries_groups/{dimension}

Get layer 7 attacks time series grouped by dimension

operationId: `radar-get-attacks-layer7-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `normalization`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/timeseries_groups/http_method

Get layer 7 attacks by HTTP method time series

operationId: `radar-get-attacks-layer7-timeseries-group-by-http-method` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `mitigationProduct`, `normalization`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/timeseries_groups/http_version

Get layer 7 attacks by HTTP version time series

operationId: `radar-get-attacks-layer7-timeseries-group-by-http-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpMethod`, `mitigationProduct`, `normalization`, `format`

## GET /radar/attacks/layer7/timeseries_groups/industry

Get layer 7 attacks by target industries time series

operationId: `radar-get-attacks-layer7-timeseries-group-by-industry` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `normalization`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/timeseries_groups/ip_version

Get layer 7 attacks by IP version time series

operationId: `radar-get-attacks-layer7-timeseries-group-by-ip-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `httpVersion`, `httpMethod`, `mitigationProduct`, `normalization`, `format`

## GET /radar/attacks/layer7/timeseries_groups/managed_rules

Get layer 7 attacks by managed rules time series

operationId: `radar-get-attacks-layer7-timeseries-group-by-managed-rules` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `normalization`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/timeseries_groups/mitigation_product

Get layer 7 attacks by mitigation product time series

operationId: `radar-get-attacks-layer7-timeseries-group-by-mitigation-product` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `normalization`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/timeseries_groups/vertical

Get layer 7 attacks by vertical time series

operationId: `radar-get-attacks-layer7-timeseries-group-by-vertical` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `normalization`, `limitPerGroup`, `format`

## GET /radar/attacks/layer7/top/ases/origin

Get top origin ASes of layer 7 attacks

operationId: `radar-get-attacks-layer7-top-origin-as` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `format`

## GET /radar/attacks/layer7/top/attacks

Get top layer 7 attack pairs (origin and target locations)

operationId: `radar-get-attacks-layer7-top-attacks` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `mitigationProduct`, `limitDirection`, `limitPerLocation`, `normalization`, `format`

## GET /radar/attacks/layer7/top/industry

Get top industries targeted by layer 7 attacks

operationId: `radar-get-attacks-layer7-top-industries` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `format`

## GET /radar/attacks/layer7/top/locations/origin

Get top origin locations of layer 7 attacks

operationId: `radar-get-attacks-layer7-top-origin-location` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `format`

## GET /radar/attacks/layer7/top/locations/target

Get top target locations of layer 7 attacks

operationId: `radar-get-attacks-layer7-top-target-location` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `continent`, `mitigationProduct`, `format`

## GET /radar/attacks/layer7/top/vertical

Get top verticals targeted by layer 7 attacks

operationId: `radar-get-attacks-layer7-top-verticals` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `ipVersion`, `httpVersion`, `httpMethod`, `mitigationProduct`, `format`
