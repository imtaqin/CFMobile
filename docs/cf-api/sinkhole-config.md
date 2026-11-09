# Sinkhole Config

10 endpoints.

## GET /accounts/{account_id}/intel/sinkholes

List sinkholes owned by this account

operationId: `sinkhole-config-list-sinkholes`

**Response** 200 → `result`

[array of]
- `account_tag`: string — The account tag that owns this sinkhole.
- `created_on`: string — The date and time when the sinkhole was created.
- `id`: string — The unique identifier for the sinkhole.
- `modified_on`: string — The date and time when the sinkhole was last modified.
- `name`: string — The name of the sinkhole.
- `r2_bucket`: string — The name of the R2 bucket to store results.
- `r2_id`: string — The id of the R2 instance.

## POST /accounts/{account_id}/intel/sinkholes

Create a new sinkhole for your account

operationId: `sinkhole-config-create-sinkhole`

**Request** (application/json)

- `name`: string **required** — The name of the sinkhole.
- `r2_bucket`: string — The name of the R2 bucket to store results. Required if you want to store large request bodies in R2.
- `r2_id`: string — The id of the R2 instance. Required if you want to store large request bodies in R2.
- `r2_secret`: string — The secret key for the R2 API token. Required if you want to store large request bodies in R2.

**Response** 201 → `result`

- `account_tag`: string — The account tag that owns this sinkhole.
- `created_on`: string — The date and time when the sinkhole was created.
- `id`: string — The unique identifier for the sinkhole.
- `modified_on`: string — The date and time when the sinkhole was last modified.
- `name`: string — The name of the sinkhole.
- `r2_bucket`: string — The name of the R2 bucket to store results.
- `r2_id`: string — The id of the R2 instance.

## DELETE /accounts/{account_id}/intel/sinkholes/{sinkhole_id}

Delete a sinkhole

operationId: `sinkhole-config-delete-sinkhole`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/intel/sinkholes/{sinkhole_id}

Get a sinkhole

operationId: `sinkhole-config-get-sinkhole`

**Response** 200 → `result`

- `account_tag`: string — The account tag that owns this sinkhole.
- `created_on`: string — The date and time when the sinkhole was created.
- `id`: string — The unique identifier for the sinkhole.
- `modified_on`: string — The date and time when the sinkhole was last modified.
- `name`: string — The name of the sinkhole.
- `r2_bucket`: string — The name of the R2 bucket to store results.
- `r2_id`: string — The id of the R2 instance.

## PUT /accounts/{account_id}/intel/sinkholes/{sinkhole_id}

Update a sinkhole

operationId: `sinkhole-config-update-sinkhole`

**Request** (application/json)

- `name`: string **required** — The name of the sinkhole.
- `r2_bucket`: string — The name of the R2 bucket to store results. Required if you want to store large request bodies in R2.
- `r2_id`: string — The id of the R2 instance. Required if you want to store large request bodies in R2.
- `r2_secret`: string — The secret key for the R2 API token. Required if you want to store large request bodies in R2.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/intel/sinkholes/{sinkhole_id}/ingresses

List ingresses for a sinkhole

operationId: `sinkhole-config-list-sinkhole-ingresses`

**Response** 200 → `result`

[array of]
- `cidr`: string — The CIDR block for the ingress rule.
- `created_on`: string — The date and time when the ingress rule was created.
- `id`: string — The unique identifier for the ingress rule.
- `modified_on`: string — The date and time when the ingress rule was last modified.
- `sinkhole_id`: string — The sinkhole this ingress rule belongs to.
- `zone_tag`: string — The zone tag associated with this ingress rule.

## POST /zones/{zone_id}/intel/sinkholes/{sinkhole_id}/ingresses

Create an ingress rule

operationId: `sinkhole-config-create-ingress`

**Request** (application/json)

- `cidr`: string **required** — The CIDR block for the ingress rule in IPv4 or IPv6 notation (e.g., 192.0.2.0/24). Provide a Cloudflare BYOIP CIDR that your account owns.

**Response** 201 → `result`

- `cidr`: string — The CIDR block for the ingress rule.
- `created_on`: string — The date and time when the ingress rule was created.
- `id`: string — The unique identifier for the ingress rule.
- `modified_on`: string — The date and time when the ingress rule was last modified.
- `sinkhole_id`: string — The sinkhole this ingress rule belongs to.
- `zone_tag`: string — The zone tag associated with this ingress rule.

## DELETE /zones/{zone_id}/intel/sinkholes/{sinkhole_id}/ingresses/{ingress_id}

Delete an ingress rule

operationId: `sinkhole-config-delete-ingress`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/intel/sinkholes/{sinkhole_id}/ingresses/{ingress_id}

Get an ingress rule

operationId: `sinkhole-config-get-ingress`

**Response** 200 → `result`

- `cidr`: string — The CIDR block for the ingress rule.
- `created_on`: string — The date and time when the ingress rule was created.
- `id`: string — The unique identifier for the ingress rule.
- `modified_on`: string — The date and time when the ingress rule was last modified.
- `sinkhole_id`: string — The sinkhole this ingress rule belongs to.
- `zone_tag`: string — The zone tag associated with this ingress rule.

## PUT /zones/{zone_id}/intel/sinkholes/{sinkhole_id}/ingresses/{ingress_id}

Update an ingress rule

operationId: `sinkhole-config-update-ingress`

**Request** (application/json)

- `cidr`: string **required** — The CIDR block for the ingress rule in IPv4 or IPv6 notation (e.g., 192.0.2.0/24). Provide a Cloudflare BYOIP CIDR that your account owns.

**Response** 200 → `result`

object
