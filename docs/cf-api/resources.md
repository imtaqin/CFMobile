# Resources

4 endpoints.

## GET /accounts/{account_id}/magic/cloud/resources

List Resources

operationId: `resources-catalog-list` · query: `provider_id`, `resource_type`, `resource_id`, `region`, `resource_group`, `managed`, `search`, `order_by`, `desc`, `per_page`, `page`, `cloudflare`, `v2`

## GET /accounts/{account_id}/magic/cloud/resources/{resource_id}

Read Resource

operationId: `resources-catalog-read` · query: `v2`

## GET /accounts/{account_id}/magic/cloud/resources/export

Export Resources

operationId: `resources-catalog-export` · query: `provider_id`, `resource_type`, `resource_id`, `region`, `resource_group`, `search`, `order_by`, `desc`, `v2`

## POST /accounts/{account_id}/magic/cloud/resources/policy-preview

Preview Rego Query

operationId: `resources-catalog-policy-preview`
