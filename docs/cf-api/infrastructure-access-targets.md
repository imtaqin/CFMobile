# Infrastructure Access Targets

8 endpoints.

## GET /accounts/{account_id}/infrastructure/targets

List all targets

operationId: `infra-targets-list` · query: `hostname`, `hostname_contains`, `virtual_network_id`, `ip_v4`, `ip_v6`, `created_before`, `created_after`, `modified_before`, `modified_after`, `ips`, `target_ids`, `ip_like`, `ipv4_start`, `ipv4_end`, `ipv6_start`, `ipv6_end`, `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/infrastructure/targets

Create new target

operationId: `infra-targets-post`

## DELETE /accounts/{account_id}/infrastructure/targets/{target_id}

Delete target

operationId: `infra-targets-delete`

## GET /accounts/{account_id}/infrastructure/targets/{target_id}

Get target

operationId: `infra-targets-get`

## PUT /accounts/{account_id}/infrastructure/targets/{target_id}

Update target

operationId: `infra-targets-put`

## DELETE /accounts/{account_id}/infrastructure/targets/batch

Delete targets (Deprecated)

operationId: `infra-targets-delete-batch`

## PUT /accounts/{account_id}/infrastructure/targets/batch

Create new targets

operationId: `infra-targets-put-batch`

## POST /accounts/{account_id}/infrastructure/targets/batch_delete

Delete targets

operationId: `infra-targets-delete-batch-post`
