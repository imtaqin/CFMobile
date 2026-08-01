# Botnet Threat Feed

4 endpoints.

## GET /accounts/{account_id}/botnet_feed/asn/{asn_id}/day_report

Get daily report

operationId: `botnet-threat-feed-get-day-report` · query: `date`

## GET /accounts/{account_id}/botnet_feed/asn/{asn_id}/full_report

Get full report

operationId: `botnet-threat-feed-get-full-report`

## GET /accounts/{account_id}/botnet_feed/configs/asn

Get list of ASNs

operationId: `botnet-threat-feed-list-asn`

## DELETE /accounts/{account_id}/botnet_feed/configs/asn/{asn_id}

Delete an ASN

operationId: `botnet-threat-feed-delete-asn`
