# Resource Tagging

10 endpoints.

## DELETE /accounts/{account_id}/tags

Delete tags from an account-level resource

operationId: `tags-delete`

**Request** (application/json)

(one of 2 variants; showing the first)
- `resource_id`: string **required** — Identifies the unique resource.
- `resource_type`: string **required** enum: `worker_version` — Enum for worker_version resource type.
- `worker_id`: string **required** — Worker ID is required only for worker_version resources

## GET /accounts/{account_id}/tags

Get tags for an account-level resource

operationId: `tags-get` · query: `resource_id`, `resource_type`, `worker_id`

**Response** 200 → `result`

(one of 46 variants; showing the first)
- `type`: string **required** enum: `access_application`
- `etag`: string **required** — ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
- `id`: string **required** — Identifies the unique resource.
- `name`: string **required** — Human-readable name of the resource.
- `tags`: object **required** — Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for k
- `tags_updated_at`: string — Monotonic version of the resource's tags: the timestamp assigned when the

## PUT /accounts/{account_id}/tags

Set tags for an account-level resource

operationId: `tags-set`

**Request** (application/json)

(one of 2 variants; showing the first)
- `resource_id`: string **required** — Identifies the unique resource.
- `resource_type`: string **required** enum: `worker_version` — Enum for worker_version resource type.
- `worker_id`: string **required** — Worker ID is required only for worker_version resources
- `tags`: object — Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for k

**Response** 200 → `result`

(one of 46 variants; showing the first)
- `type`: string **required** enum: `access_application`
- `etag`: string **required** — ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
- `id`: string **required** — Identifies the unique resource.
- `name`: string **required** — Human-readable name of the resource.
- `tags`: object **required** — Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for k
- `tags_updated_at`: string — Monotonic version of the resource's tags: the timestamp assigned when the

## GET /accounts/{account_id}/tags/keys

List tag keys

operationId: `tags-list-keys` · query: `cursor`

**Response** 200 → `result`

[array of]
string

## GET /accounts/{account_id}/tags/resources

List tagged resources

operationId: `tags-list` · query: `include_navigation`, `type`, `name`, `id`, `case_insensitive`, `tag`, `cursor`

**Response** 200 → `result`

[array of]
(one of 46 variants; showing the first)
- `type`: string **required** enum: `access_application`
- `etag`: string **required** — ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
- `id`: string **required** — Identifies the unique resource.
- `name`: string **required** — Human-readable name of the resource.
- `tags`: object **required** — Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for k
- `tags_updated_at`: string — Monotonic version of the resource's tags: the timestamp assigned when the

## GET /accounts/{account_id}/tags/summary

List tag key summary

operationId: `tags-list-key-summary` · query: `cursor`

**Response** 200 → `result`

[array of]
- `key`: string **required** — A tag key.
- `values`: string[] **required** — All distinct values for this tag key.
  [array]

## GET /accounts/{account_id}/tags/values/{tag_key}

List tag values

operationId: `tags-list-values` · query: `type`, `cursor`

**Response** 200 → `result`

[array of]
string

## DELETE /zones/{zone_id}/tags

Delete tags from a zone-level resource

operationId: `tags-zone-delete`

**Request** (application/json)

(one of 2 variants; showing the first)
- `resource_id`: string **required** — Identifies the unique resource.
- `resource_type`: string **required** enum: `api_gateway_operation`, `custom_certificate`, `custom_hostname`, `dns_record`, `healthcheck`, `load_balancer`, `managed_client_certificate`, `worker_route` — Enum for base zone-level resource types (those with no extra required fields).

## GET /zones/{zone_id}/tags

Get tags for a zone-level resource

operationId: `tags-zone-get` · query: `resource_id`, `resource_type`, `access_application_id`

**Response** 200 → `result`

(one of 46 variants; showing the first)
- `type`: string **required** enum: `access_application`
- `etag`: string **required** — ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
- `id`: string **required** — Identifies the unique resource.
- `name`: string **required** — Human-readable name of the resource.
- `tags`: object **required** — Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for k
- `tags_updated_at`: string — Monotonic version of the resource's tags: the timestamp assigned when the

## PUT /zones/{zone_id}/tags

Set tags for a zone-level resource

operationId: `tags-zone-set`

**Request** (application/json)

(one of 2 variants; showing the first)
- `resource_id`: string **required** — Identifies the unique resource.
- `resource_type`: string **required** enum: `api_gateway_operation`, `custom_certificate`, `custom_hostname`, `dns_record`, `healthcheck`, `load_balancer`, `managed_client_certificate`, `worker_route` — Enum for base zone-level resource types (those with no extra required fields).
- `tags`: object — Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for k

**Response** 200 → `result`

(one of 46 variants; showing the first)
- `type`: string **required** enum: `access_application`
- `etag`: string **required** — ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
- `id`: string **required** — Identifies the unique resource.
- `name`: string **required** — Human-readable name of the resource.
- `tags`: object **required** — Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for k
- `tags_updated_at`: string — Monotonic version of the resource's tags: the timestamp assigned when the
