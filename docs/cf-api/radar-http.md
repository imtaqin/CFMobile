# Radar HTTP

41 endpoints.

## GET /radar/http/summary/{dimension}

Get HTTP requests summary by dimension

operationId: `radar-get-http-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `apiTraffic`, `botClass`, `contentType`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `limitPerGroup`, `format`

## GET /radar/http/summary/bot_class

Get HTTP requests by bot class summary

operationId: `radar-get-http-summary-by-bot-class` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/summary/device_type

Get HTTP requests by device type summary

operationId: `radar-get-http-summary-by-device-type` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/summary/http_protocol

Get HTTP requests by HTTP/HTTPS summary

operationId: `radar-get-http-summary-by-http-protocol` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/summary/http_version

Get HTTP requests by HTTP version summary

operationId: `radar-get-http-summary-by-http-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/summary/ip_version

Get HTTP requests by IP version summary

operationId: `radar-get-http-summary-by-ip-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/summary/os

Get HTTP requests by OS summary

operationId: `radar-get-http-summary-by-operating-system` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/summary/post_quantum

Get HTTP requests by post-quantum support summary

operationId: `radar-get-http-summary-by-post-quantum` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/summary/tls_version

Get HTTP requests by TLS version summary

operationId: `radar-get-http-summary-by-tls-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `browserFamily`, `format`

## GET /radar/http/timeseries

Get HTTP requests time series

operationId: `radar-get-http-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `normalization`, `apiTraffic`, `botClass`, `contentType`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/timeseries_groups/{dimension}

Get HTTP requests time series grouped by dimension

operationId: `radar-get-http-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `apiTraffic`, `botClass`, `contentType`, `limitPerGroup`, `deviceType`, `httpProtocol`, `httpVersion`, `normalization`, `ipVersion`, `os`, `tlsVersion`, `format`

## GET /radar/http/timeseries_groups/bot_class

Get HTTP requests by bot class time series

operationId: `radar-get-http-timeseries-group-by-bot-class` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/timeseries_groups/browser

Get HTTP requests by user agent time series

operationId: `radar-get-http-timeseries-group-by-browsers` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `limitPerGroup`, `format`

## GET /radar/http/timeseries_groups/browser_family

Get HTTP requests by user agent family time series

operationId: `radar-get-http-timeseries-group-by-browser-families` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `limitPerGroup`, `format`

## GET /radar/http/timeseries_groups/device_type

Get HTTP requests by device type time series

operationId: `radar-get-http-timeseries-group-by-device-type` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/timeseries_groups/http_protocol

Get HTTP requests by HTTP/HTTPS time series

operationId: `radar-get-http-timeseries-group-by-http-protocol` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/timeseries_groups/http_version

Get HTTP requests by HTTP version time series

operationId: `radar-get-http-timeseries-group-by-http-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/timeseries_groups/ip_version

Get HTTP requests by IP version time series

operationId: `radar-get-http-timeseries-group-by-ip-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/timeseries_groups/os

Get HTTP requests by OS time series

operationId: `radar-get-http-timeseries-group-by-operating-system` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/timeseries_groups/post_quantum

Get HTTP requests by post-quantum support time series

operationId: `radar-get-http-timeseries-group-by-post-quantum` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/timeseries_groups/tls_version

Get HTTP requests by TLS version time series

operationId: `radar-get-http-timeseries-group-by-tls-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `browserFamily`, `format`

## GET /radar/http/top/ases

Get top ASes by HTTP requests

operationId: `radar-get-http-top-ases-by-http-requests` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/ases/bot_class/{bot_class}

Get top ASes by HTTP requests for a bot class

operationId: `radar-get-http-top-ases-by-bot-class` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/ases/browser_family/{browser_family}

Get top ASes by HTTP requests for a browser family

operationId: `radar-get-http-top-ases-by-browser-family` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `format`

## GET /radar/http/top/ases/device_type/{device_type}

Get top ASes by HTTP requests for a device type

operationId: `radar-get-http-top-ases-by-device-type` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/ases/http_protocol/{http_protocol}

Get top ASes by HTTP requests for an HTTP protocol

operationId: `radar-get-http-top-ases-by-http-protocol` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/ases/http_version/{http_version}

Get top ASes by HTTP requests for an HTTP version

operationId: `radar-get-http-top-ases-by-http-version` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/ases/ip_version/{ip_version}

Get top ASes by HTTP requests for an IP version

operationId: `radar-get-http-top-ases-by-ip-version` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/ases/os/{os}

Get top ASes by HTTP requests for an OS

operationId: `radar-get-http-top-ases-by-operating-system` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/ases/tls_version/{tls_version}

Get top ASes by HTTP requests for a TLS version

operationId: `radar-get-http-top-ases-by-tls-version` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `browserFamily`, `format`

## GET /radar/http/top/browser

Get top user agents by HTTP requests

operationId: `radar-get-http-top-browsers` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/browser_family

Get top user agent families by HTTP requests

operationId: `radar-get-http-top-browser-families` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `format`

## GET /radar/http/top/locations

Get top locations by HTTP requests

operationId: `radar-get-http-top-locations-by-http-requests` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/locations/bot_class/{bot_class}

Get top locations by HTTP requests for a bot class

operationId: `radar-get-http-top-locations-by-bot-class` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/locations/browser_family/{browser_family}

Get top locations by HTTP requests for a browser family

operationId: `radar-get-http-top-locations-by-browser-family` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `format`

## GET /radar/http/top/locations/device_type/{device_type}

Get top locations by HTTP requests for a device type

operationId: `radar-get-http-top-locations-by-device-type` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/locations/http_protocol/{http_protocol}

Get top locations by HTTP requests for an HTTP protocol

operationId: `radar-get-http-top-locations-by-http-protocol` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpVersion`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/locations/http_version/{http_version}

Get top locations by HTTP requests for an HTTP version

operationId: `radar-get-http-top-locations-by-http-version` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `ipVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/locations/ip_version/{ip_version}

Get top locations by HTTP requests for an IP version

operationId: `radar-get-http-top-locations-by-ip-version` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `os`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/locations/os/{os}

Get top locations by HTTP requests for an OS

operationId: `radar-get-http-top-locations-by-operating-system` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `tlsVersion`, `browserFamily`, `format`

## GET /radar/http/top/locations/tls_version/{tls_version}

Get top locations by HTTP requests for a TLS version

operationId: `radar-get-http-top-locations-by-tls-version` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `geoId`, `botClass`, `deviceType`, `httpProtocol`, `httpVersion`, `ipVersion`, `os`, `browserFamily`, `format`
