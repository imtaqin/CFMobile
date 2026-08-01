# Zone-Level Authenticated Origin Pulls

6 endpoints.

## GET /zones/{zone_id}/origin_tls_client_auth

List Certificates

operationId: `zone-level-authenticated-origin-pulls-list-certificates`

## POST /zones/{zone_id}/origin_tls_client_auth

Upload Certificate

operationId: `zone-level-authenticated-origin-pulls-upload-certificate`

## DELETE /zones/{zone_id}/origin_tls_client_auth/{certificate_id}

Delete Certificate

operationId: `zone-level-authenticated-origin-pulls-delete-certificate`

## GET /zones/{zone_id}/origin_tls_client_auth/{certificate_id}

Get Certificate Details

operationId: `zone-level-authenticated-origin-pulls-get-certificate-details`

## GET /zones/{zone_id}/origin_tls_client_auth/settings

Get Enablement Setting for Zone

operationId: `zone-level-authenticated-origin-pulls-get-enablement-setting-for-zone`

## PUT /zones/{zone_id}/origin_tls_client_auth/settings

Set Enablement for Zone

operationId: `zone-level-authenticated-origin-pulls-set-enablement-for-zone`
