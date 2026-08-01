# Origin CA

4 endpoints.

## GET /certificates

List Certificates

operationId: `origin-ca-list-certificates` · query: `zone_id`, `page`, `per_page`, `limit`, `offset`

## POST /certificates

Create Certificate

operationId: `origin-ca-create-certificate`

## DELETE /certificates/{certificate_id}

Revoke Certificate

operationId: `origin-ca-revoke-certificate`

## GET /certificates/{certificate_id}

Get Certificate

operationId: `origin-ca-get-certificate`
