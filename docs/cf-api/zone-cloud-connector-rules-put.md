# Zone Cloud Connector Rules PUT

1 endpoints.

## PUT /zones/{zone_id}/cloud_connector/rules

Put Rules

operationId: `zone-cloud-conenctor-rules-put`

**Request** (application/json)

[array of]
- `description`: string
- `enabled`: boolean
- `expression`: string
- `id`: string
- `parameters`: object — Parameters of Cloud Connector Rule
  - `host`: string — Host to perform Cloud Connection to
- `provider`: string enum: `aws_s3`, `cloudflare_r2`, `gcp_storage`, `azure_storage`, `oci_storage` — Cloud Provider type

**Response** 200 → `result`

[array of]
- `description`: string
- `enabled`: boolean
- `expression`: string
- `id`: string
- `parameters`: object — Parameters of Cloud Connector Rule
  - `host`: string — Host to perform Cloud Connection to
- `provider`: string enum: `aws_s3`, `cloudflare_r2`, `gcp_storage`, `azure_storage`, `oci_storage` — Cloud Provider type
