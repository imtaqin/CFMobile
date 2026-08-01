# Domains

4 endpoints.

## GET /accounts/{account_id}/workers/domains

List Domains

operationId: `workers.domains.list` · query: `zone_id`, `zone_name`, `service`, `hostname`, `environment`

## PUT /accounts/{account_id}/workers/domains

Attach Domain

operationId: `workers.domains.update`

## DELETE /accounts/{account_id}/workers/domains/{domain_id}

Detach Domain

operationId: `workers.domains.delete`

## GET /accounts/{account_id}/workers/domains/{domain_id}

Get Domain

operationId: `workers.domains.get`
