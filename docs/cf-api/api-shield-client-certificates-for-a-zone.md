# API Shield Client Certificates for a Zone

7 endpoints.

## GET /zones/{zone_id}/certificate_authorities/hostname_associations

List Hostname Associations

operationId: `client-certificate-for-a-zone-list-hostname-associations` · query: `mtls_certificate_id`

## PUT /zones/{zone_id}/certificate_authorities/hostname_associations

Replace Hostname Associations

operationId: `client-certificate-for-a-zone-put-hostname-associations`

## GET /zones/{zone_id}/client_certificates

List Client Certificates

operationId: `client-certificate-for-a-zone-list-client-certificates` · query: `status`, `page`, `per_page`, `limit`, `offset`

## POST /zones/{zone_id}/client_certificates

Create Client Certificate

operationId: `client-certificate-for-a-zone-create-client-certificate`

## DELETE /zones/{zone_id}/client_certificates/{client_certificate_id}

Revoke Client Certificate

operationId: `client-certificate-for-a-zone-delete-client-certificate`

## GET /zones/{zone_id}/client_certificates/{client_certificate_id}

Client Certificate Details

operationId: `client-certificate-for-a-zone-client-certificate-details`

## PATCH /zones/{zone_id}/client_certificates/{client_certificate_id}

Reactivate Client Certificate

operationId: `client-certificate-for-a-zone-edit-client-certificate`
