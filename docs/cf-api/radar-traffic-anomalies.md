# Radar Traffic Anomalies

3 endpoints.

## GET /radar/traffic_anomalies

Get latest Internet traffic anomalies

operationId: `radar-get-traffic-anomalies` · query: `limit`, `offset`, `dateRange`, `dateStart`, `dateEnd`, `status`, `type`, `dataSource`, `asn`, `location`, `origin`, `format`

**Response** 200 → `result`

- `trafficAnomalies`: object[] **required**
  [array of]
  - `asnDetails`: object **required**
    - `asn`: string **required**
    - `location`: object **required**
    - `name`: string **required**
  - `endDate`: string **required**
  - `locationDetails`: object **required**
    - `code`: string **required**
    - `name`: string **required**
  - `originDetails`: object **required**
    - `name`: string **required**
    - `origin`: string **required**
  - `outageId`: string **required** — ID of the published outage this anomaly was confirmed as, if any.
  - `startDate`: string **required**
  - `status`: string **required** — Verification status: UNVERIFIED (automatically detected, not yet validated by Radar), TP (verified by Radar) or VERIFIED (verified by Radar 
  - `type`: string **required**
  - `uuid`: string **required**
  - `visibleInDataSources`: string[] **required**
    [array]

## GET /radar/traffic_anomalies/{uuid}

Get traffic anomaly by UUID

operationId: `radar-get-traffic-anomaly-by-uuid` · query: `format`

**Response** 200 → `result`

- `trafficAnomaly`: object **required**
  - `asnDetails`: object **required**
    - `asn`: string **required**
    - `location`: object **required**
    - `name`: string **required**
  - `endDate`: string **required**
  - `locationDetails`: object **required**
    - `code`: string **required**
    - `name`: string **required**
  - `originDetails`: object **required**
    - `name`: string **required**
    - `origin`: string **required**
  - `outageId`: string **required** — ID of the published outage this anomaly was confirmed as, if any.
  - `startDate`: string **required**
  - `status`: string **required** — Verification status: UNVERIFIED (automatically detected, not yet validated by Radar), TP (verified by Radar) or VERIFIED (verified by Radar 
  - `type`: string **required**
  - `uuid`: string **required**
  - `visibleInDataSources`: string[] **required**
    [array]

## GET /radar/traffic_anomalies/locations

Get top locations by total traffic anomalies

operationId: `radar-get-traffic-anomalies-top` · query: `limit`, `dateRange`, `dateStart`, `dateEnd`, `status`, `format`

**Response** 200 → `result`

- `trafficAnomalies`: object[] **required**
  [array of]
  - `clientCountryAlpha2`: string **required**
  - `clientCountryName`: string **required**
  - `value`: string **required** — A numeric string.
