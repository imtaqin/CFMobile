# Access SAML encryption certificates

4 endpoints.

## GET /accounts/{account_id}/access/saml_certificates

List SAML certificate sets

operationId: `access-saml-certificates-list-certificate-sets` · query: `page`, `per_page`, `id`

## GET /accounts/{account_id}/access/saml_certificates/{saml_cert_set_id}

Get SAML certificate set

operationId: `access-saml-certificates-get-certificate-set`

## GET /accounts/{account_id}/access/saml_certificates/{saml_cert_set_id}/pem

Download current certificate in PEM format

operationId: `access-saml-certificates-get-pem`

## POST /accounts/{account_id}/access/saml_certificates/{saml_cert_set_id}/rotate

Rotate SAML certificate

operationId: `access-saml-certificates-rotate-certificate`
