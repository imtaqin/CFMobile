# Per-hostname Authenticated Origin Pull

7 endpoints.

## GET /zones/{zone_id}/origin_tls_client_auth/hostnames

List Hostname Associations

operationId: `per-hostname-authenticated-origin-pull-list-hostname-associations` · query: `page`, `per_page`, `status`

## PUT /zones/{zone_id}/origin_tls_client_auth/hostnames

Enable or Disable a Hostname for Client Authentication

operationId: `per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication`

## GET /zones/{zone_id}/origin_tls_client_auth/hostnames/{hostname}

Get the Hostname Status for Client Authentication

operationId: `per-hostname-authenticated-origin-pull-get-the-hostname-status-for-client-authentication`

## GET /zones/{zone_id}/origin_tls_client_auth/hostnames/certificates

List Certificates

operationId: `per-hostname-authenticated-origin-pull-list-certificates`

## POST /zones/{zone_id}/origin_tls_client_auth/hostnames/certificates

Upload a Hostname Client Certificate

operationId: `per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate`

## DELETE /zones/{zone_id}/origin_tls_client_auth/hostnames/certificates/{certificate_id}

Delete Hostname Client Certificate

operationId: `per-hostname-authenticated-origin-pull-delete-hostname-client-certificate`

## GET /zones/{zone_id}/origin_tls_client_auth/hostnames/certificates/{certificate_id}

Get the Hostname Client Certificate

operationId: `per-hostname-authenticated-origin-pull-get-the-hostname-client-certificate`
