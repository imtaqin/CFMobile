# Radar Annotations

4 endpoints.

## GET /radar/annotations

Get latest annotations

operationId: `radar-get-annotations` · query: `limit`, `offset`, `dateRange`, `dateStart`, `dateEnd`, `dataSource`, `eventType`, `outageType`, `outageCause`, `tags`, `query`, `asn`, `location`, `geoId`, `origin`, `tld`, `ca`, `log`, `bot`, `format`

**Response** 200 → `result`

- `annotations`: object[] **required**
  [array of]
  - `asns`: integer[] **required**
    [array]
  - `asnsDetails`: object[] **required**
    [array of]
    - `asn`: string **required**
    - `location`: object **required**
    - `name`: string **required**
  - `dataSource`: string **required**
  - `description`: string **required**
  - `endDate`: string **required**
  - `entities`: object[] **required**
    [array of]
    - `entityLocation`: string **required** — Alpha-2 code of the country the entity belongs to (GEOLOCATION and AS entities only).
    - `entityName`: string **required**
    - `entityType`: string **required**
    - `entityValue`: string **required**
  - `eventType`: string **required**
  - `geoIds`: string[] **required**
    [array]
  - `id`: string **required**
  - `linkedUrl`: string **required**
  - `locations`: string[] **required**
    [array]
  - `locationsDetails`: object[] **required**
    [array of]
    - `code`: string **required**
    - `name`: string **required**
  - `origins`: string[] **required**
    [array]
  - `originsDetails`: object[] **required**
    [array of]
    - `name`: string **required**
    - `origin`: string **required**
  - `outage`: object **required**
    - `outageCause`: string **required**
    - `outageType`: string **required**
  - `scope`: string **required**
  - `startDate`: string **required**
  - `tags`: string[] **required**
    [array]

## GET /radar/annotations/{id}

Get annotation by ID

operationId: `radar-get-annotation-by-id` · query: `format`

**Response** 200 → `result`

- `annotation`: object **required**
  - `asns`: integer[] **required**
    [array]
  - `asnsDetails`: object[] **required**
    [array of]
    - `asn`: string **required**
    - `location`: object **required**
    - `name`: string **required**
  - `dataSource`: string **required**
  - `description`: string **required**
  - `endDate`: string **required**
  - `entities`: object[] **required**
    [array of]
    - `entityLocation`: string **required** — Alpha-2 code of the country the entity belongs to (GEOLOCATION and AS entities only).
    - `entityName`: string **required**
    - `entityType`: string **required**
    - `entityValue`: string **required**
  - `eventType`: string **required**
  - `geoIds`: string[] **required**
    [array]
  - `id`: string **required**
  - `linkedUrl`: string **required**
  - `locations`: string[] **required**
    [array]
  - `locationsDetails`: object[] **required**
    [array of]
    - `code`: string **required**
    - `name`: string **required**
  - `origins`: string[] **required**
    [array]
  - `originsDetails`: object[] **required**
    [array of]
    - `name`: string **required**
    - `origin`: string **required**
  - `outage`: object **required**
    - `outageCause`: string **required**
    - `outageType`: string **required**
  - `scope`: string **required**
  - `startDate`: string **required**
  - `tags`: string[] **required**
    [array]

## GET /radar/annotations/outages

Get latest Internet outages and anomalies

operationId: `radar-get-annotations-outages` · query: `limit`, `offset`, `dateRange`, `dateStart`, `dateEnd`, `dataSource`, `outageType`, `outageCause`, `tags`, `query`, `asn`, `location`, `geoId`, `origin`, `tld`, `ca`, `log`, `bot`, `format`

**Response** 200 → `result`

- `annotations`: object[] **required**
  [array of]
  - `asns`: integer[] **required**
    [array]
  - `asnsDetails`: object[] **required**
    [array of]
    - `asn`: string **required**
    - `location`: object **required**
    - `name`: string **required**
  - `dataSource`: string **required**
  - `description`: string **required**
  - `endDate`: string **required**
  - `entities`: object[] **required**
    [array of]
    - `entityLocation`: string **required** — Alpha-2 code of the country the entity belongs to (GEOLOCATION and AS entities only).
    - `entityName`: string **required**
    - `entityType`: string **required**
    - `entityValue`: string **required**
  - `eventType`: string **required**
  - `geoIds`: string[] **required**
    [array]
  - `id`: string **required**
  - `linkedUrl`: string **required**
  - `locations`: string[] **required**
    [array]
  - `locationsDetails`: object[] **required**
    [array of]
    - `code`: string **required**
    - `name`: string **required**
  - `origins`: string[] **required**
    [array]
  - `originsDetails`: object[] **required**
    [array of]
    - `name`: string **required**
    - `origin`: string **required**
  - `outage`: object **required**
    - `outageCause`: string **required**
    - `outageType`: string **required**
  - `scope`: string **required**
  - `startDate`: string **required**
  - `tags`: string[] **required**
    [array]

## GET /radar/annotations/outages/locations

Get the number of outages by location

operationId: `radar-get-annotations-outages-top` · query: `limit`, `dateRange`, `dateStart`, `dateEnd`, `format`

**Response** 200 → `result`

- `annotations`: object[] **required**
  [array of]
  - `clientCountryAlpha2`: string **required**
  - `clientCountryName`: string **required**
  - `value`: string **required** — A numeric string.
