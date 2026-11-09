# Zone Cloud Connector Rules GET

1 endpoints.

## GET /zones/{zone_id}/cloud_connector/rules

Rules

operationId: `zone-cloud-connector-rules`

**Response** 200 → `result`

[array of]
- `description`: string
- `enabled`: boolean
- `expression`: string
- `id`: string
- `parameters`: object — Parameters of Cloud Connector Rule
  - `host`: string — Host to perform Cloud Connection to
- `provider`: string enum: `aws_s3`, `cloudflare_r2`, `gcp_storage`, `azure_storage`, `oci_storage` — Cloud Provider type
