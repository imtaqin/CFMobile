# Radar Traffic Anomalies

2 endpoints.

## GET /radar/traffic_anomalies

Get latest Internet traffic anomalies

operationId: `radar-get-traffic-anomalies` · query: `limit`, `offset`, `dateRange`, `dateStart`, `dateEnd`, `status`, `type`, `asn`, `location`, `origin`, `format`

## GET /radar/traffic_anomalies/locations

Get top locations by total traffic anomalies

operationId: `radar-get-traffic-anomalies-top` · query: `limit`, `dateRange`, `dateStart`, `dateEnd`, `status`, `format`
