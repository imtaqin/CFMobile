# Audit Logs

7 endpoints.

## GET /accounts/{account_id}/audit_logs

Get account audit logs

operationId: `audit-logs-get-account-audit-logs` · query: `id`, `export`, `action.type`, `actor.ip`, `actor.email`, `since`, `before`, `zone.name`, `direction`, `per_page`, `page`, `hide_user_logs`

## GET /accounts/{account_id}/logs/audit

Get account audit logs (Version 2)

operationId: `audit-logs-v2-get-account-audit-logs` · query: `account_name`, `action_result`, `action_type`, `actor_context`, `actor_email`, `actor_id`, `actor_ip_address`, `actor_token_id`, `actor_token_name`, `actor_type`, `audit_log_id`, `id`, `raw_cf_ray_id`, `raw_method`, `raw_status_code`, `raw_uri`, `resource_id`, `resource_product`, `resource_type`, `resource_scope`, `product_category`, `zone_id`, `zone_name`, `account_name.not`, `action_result.not`, `action_type.not`, `actor_context.not`, `actor_email.not`, `actor_id.not`, `actor_ip_address.not`, `actor_token_id.not`, `actor_token_name.not`, `actor_type.not`, `audit_log_id.not`, `id.not`, `raw_cf_ray_id.not`, `raw_method.not`, `raw_status_code.not`, `raw_uri.not`, `resource_id.not`, `resource_product.not`, `resource_type.not`, `resource_scope.not`, `zone_id.not`, `zone_name.not`, `since`, `before`, `direction`, `limit`, `cursor`

## GET /accounts/{account_id}/logs/audit/{id}/history

Get resource change history from an account audit log entry (Version 2)

operationId: `audit-logs-v2-get-account-audit-log-history` · query: `action_time`, `since`, `before`, `direction`, `limit`, `cursor`

## GET /accounts/{account_id}/logs/audit/product_categories

List account audit log product categories (Version 2)

operationId: `audit-logs-v2-list-account-product-categories`

## GET /organizations/{organization_id}/logs/audit

Get organization audit logs (Version 2)

operationId: `audit-logs-v2-get-organization-audit-logs` · query: `action_result`, `action_type`, `actor_context`, `actor_email`, `actor_id`, `actor_ip_address`, `actor_token_id`, `actor_token_name`, `actor_type`, `id`, `raw_cf_ray_id`, `raw_method`, `raw_status_code`, `raw_uri`, `resource_id`, `resource_product`, `resource_type`, `resource_scope`, `action_result.not`, `action_type.not`, `actor_context.not`, `actor_email.not`, `actor_id.not`, `actor_ip_address.not`, `actor_token_id.not`, `actor_token_name.not`, `actor_type.not`, `id.not`, `raw_cf_ray_id.not`, `raw_method.not`, `raw_status_code.not`, `raw_uri.not`, `resource_id.not`, `resource_product.not`, `resource_type.not`, `resource_scope.not`, `since`, `before`, `direction`, `limit`, `cursor`

## GET /organizations/{organization_id}/logs/audit/{id}/history

Get resource change history from an organization audit log entry (Version 2)

operationId: `audit-logs-v2-get-organization-audit-log-history` · query: `action_time`, `since`, `before`, `direction`, `limit`, `cursor`

## GET /user/audit_logs

Get user audit logs

operationId: `audit-logs-get-user-audit-logs` · query: `id`, `export`, `action.type`, `actor.ip`, `actor.email`, `since`, `before`, `zone.name`, `direction`, `per_page`, `page`, `hide_user_logs`
