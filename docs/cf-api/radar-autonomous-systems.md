# Radar Autonomous Systems

6 endpoints.

## GET /radar/entities/asns

List autonomous systems

operationId: `radar-get-entities-asn-list` · query: `limit`, `offset`, `asn`, `location`, `orderBy`, `format`

## GET /radar/entities/asns/{asn}

Get AS details by ASN

operationId: `radar-get-entities-asn-by-id` · query: `format`

## GET /radar/entities/asns/{asn}/as_set

Get IRR AS-SETs that an AS is a member of

operationId: `radar-get-asns-as-set` · query: `format`

## GET /radar/entities/asns/{asn}/rel

Get AS-level relationships by ASN

operationId: `radar-get-asns-rel` · query: `asn2`, `format`

## GET /radar/entities/asns/botnet_threat_feed

Get AS rankings by botnet threat feed activity

operationId: `radar-get-as-botnet-threat-feed` · query: `limit`, `offset`, `metric`, `date`, `compareDateRange`, `location`, `asn`, `sortOrder`, `format`

## GET /radar/entities/asns/ip

Get AS details by IP address

operationId: `radar-get-entities-asn-by-ip` · query: `ip`, `format`
