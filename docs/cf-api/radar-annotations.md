# Radar Annotations

3 endpoints.

## GET /radar/annotations

Get latest annotations

operationId: `radar-get-annotations` · query: `limit`, `offset`, `dateRange`, `dateStart`, `dateEnd`, `dataSource`, `eventType`, `asn`, `location`, `origin`, `format`

## GET /radar/annotations/outages

Get latest Internet outages and anomalies

operationId: `radar-get-annotations-outages` · query: `limit`, `offset`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `origin`, `format`

## GET /radar/annotations/outages/locations

Get the number of outages by location

operationId: `radar-get-annotations-outages-top` · query: `limit`, `dateRange`, `dateStart`, `dateEnd`, `format`
