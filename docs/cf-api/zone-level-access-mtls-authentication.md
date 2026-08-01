# Zone-Level Access mTLS authentication

7 endpoints.

## GET /zones/{zone_id}/access/certificates

List mTLS certificates

operationId: `zone-level-access-mtls-authentication-list-mtls-certificates`

## POST /zones/{zone_id}/access/certificates

Add an mTLS certificate

operationId: `zone-level-access-mtls-authentication-add-an-mtls-certificate`

## DELETE /zones/{zone_id}/access/certificates/{certificate_id}

Delete an mTLS certificate

operationId: `zone-level-access-mtls-authentication-delete-an-mtls-certificate`

## GET /zones/{zone_id}/access/certificates/{certificate_id}

Get an mTLS certificate

operationId: `zone-level-access-mtls-authentication-get-an-mtls-certificate`

## PUT /zones/{zone_id}/access/certificates/{certificate_id}

Update an mTLS certificate

operationId: `zone-level-access-mtls-authentication-update-an-mtls-certificate`

## GET /zones/{zone_id}/access/certificates/settings

List all mTLS hostname settings

operationId: `zone-level-access-mtls-authentication-list-mtls-certificates-hostname-settings`

## PUT /zones/{zone_id}/access/certificates/settings

Update an mTLS certificate's hostname settings

operationId: `zone-level-access-mtls-authentication-update-an-mtls-certificate-settings`
