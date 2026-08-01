# Access mTLS authentication

7 endpoints.

## GET /accounts/{account_id}/access/certificates

List mTLS certificates

operationId: `access-mtls-authentication-list-mtls-certificates` · query: `per_page`

## POST /accounts/{account_id}/access/certificates

Add an mTLS certificate

operationId: `access-mtls-authentication-add-an-mtls-certificate`

## DELETE /accounts/{account_id}/access/certificates/{certificate_id}

Delete an mTLS certificate

operationId: `access-mtls-authentication-delete-an-mtls-certificate`

## GET /accounts/{account_id}/access/certificates/{certificate_id}

Get an mTLS certificate

operationId: `access-mtls-authentication-get-an-mtls-certificate`

## PUT /accounts/{account_id}/access/certificates/{certificate_id}

Update an mTLS certificate

operationId: `access-mtls-authentication-update-an-mtls-certificate`

## GET /accounts/{account_id}/access/certificates/settings

List all mTLS hostname settings

operationId: `access-mtls-authentication-list-mtls-certificates-hostname-settings`

## PUT /accounts/{account_id}/access/certificates/settings

Update an mTLS certificate's hostname settings

operationId: `access-mtls-authentication-update-an-mtls-certificate-settings`
