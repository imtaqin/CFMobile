# Resource Tagging

10 endpoints.

## DELETE /accounts/{account_id}/tags

Delete tags from an account-level resource

operationId: `tags-delete`

## GET /accounts/{account_id}/tags

Get tags for an account-level resource

operationId: `tags-get` · query: `resource_id`, `resource_type`, `worker_id`

## PUT /accounts/{account_id}/tags

Set tags for an account-level resource

operationId: `tags-set`

## GET /accounts/{account_id}/tags/keys

List tag keys

operationId: `tags-list-keys`

## GET /accounts/{account_id}/tags/resources

List tagged resources

operationId: `tags-list` · query: `type`, `name`, `id`

## GET /accounts/{account_id}/tags/summary

List tag key summary

operationId: `tags-list-key-summary`

## GET /accounts/{account_id}/tags/values/{tag_key}

List tag values

operationId: `tags-list-values`

## DELETE /zones/{zone_id}/tags

Delete tags from a zone-level resource

operationId: `tags-zone-delete`

## GET /zones/{zone_id}/tags

Get tags for a zone-level resource

operationId: `tags-zone-get` · query: `resource_id`, `resource_type`, `access_application_id`

## PUT /zones/{zone_id}/tags

Set tags for a zone-level resource

operationId: `tags-zone-set`
