# Domain Discovery

4 endpoints.

## POST /accounts/{account_id}/registrar-sandbox/domain-check

Check domain availability

operationId: `sandbox-registrar-domain-discovery-check`

## GET /accounts/{account_id}/registrar-sandbox/domain-search

Search for available domains

operationId: `sandbox-registrar-domain-discovery-search` · query: `q`, `extensions`, `limit`

## POST /accounts/{account_id}/registrar/domain-check

Check domain availability

operationId: `registrar-domain-discovery-check`

## GET /accounts/{account_id}/registrar/domain-search

Search for available domains

operationId: `registrar-domain-discovery-search` · query: `q`, `extensions`, `limit`
