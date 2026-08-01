# mTLS Certificate Management

5 endpoints.

## GET /accounts/{account_id}/mtls_certificates

List mTLS certificates

operationId: `m-tls-certificate-management-list-m-tls-certificates` · query: `type`

## POST /accounts/{account_id}/mtls_certificates

Upload mTLS certificate

operationId: `m-tls-certificate-management-upload-m-tls-certificate`

## DELETE /accounts/{account_id}/mtls_certificates/{mtls_certificate_id}

Delete mTLS certificate

operationId: `m-tls-certificate-management-delete-m-tls-certificate`

## GET /accounts/{account_id}/mtls_certificates/{mtls_certificate_id}

Get mTLS certificate

operationId: `m-tls-certificate-management-get-m-tls-certificate`

## GET /accounts/{account_id}/mtls_certificates/{mtls_certificate_id}/associations

List mTLS certificate associations

operationId: `m-tls-certificate-management-list-m-tls-certificate-associations`
