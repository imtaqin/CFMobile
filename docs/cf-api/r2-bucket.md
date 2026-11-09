# R2 Bucket

34 endpoints.

## GET /accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration

List Event Notification Rules

operationId: `r2-get-event-notification-configs`

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}

Delete Event Notification Rules

operationId: `r2-event-notification-delete-config`

**Request** (application/json)

- `ruleIds`: string[] — Array of rule ids to delete.
  [array]

**Response** 200 → `result`

object

## GET /accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}

Get Event Notification Rules for a Queue

operationId: `r2-get-event-notification-config`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}

Create Event Notification Rules

operationId: `r2-put-event-notification-config`

**Request** (application/json)

- `rules`: object[] **required** — Array of rules to drive notifications.
  [array of]
  - `actions`: string[] **required** — Array of R2 object actions that will trigger notifications.
    [array]
  - `description`: string — A description that can be used to identify the event notification rule after creation.
  - `prefix`: string — Notifications will be sent only for objects with this prefix.
  - `suffix`: string — Notifications will be sent only for objects with this suffix.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets

List Buckets

operationId: `r2-list-buckets` · query: `name_contains`, `start_after`, `per_page`, `order`, `direction`, `cursor`

**Response** 200 → `result`

object

## POST /accounts/{account_id}/r2/buckets

Create Bucket

operationId: `r2-create-bucket`

**Request** (application/json)

- `locationHint`: string enum: `apac`, `eeur`, `enam`, `weur`, `wnam`, `oc` — Location of the bucket.
- `name`: string **required** — Name of the bucket.
- `storageClass`: string enum: `Standard`, `InfrequentAccess` default: `Standard` — Storage class for newly uploaded objects, unless specified otherwise.

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}

Delete Bucket

operationId: `r2-delete-bucket`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}

Get Bucket

operationId: `r2-get-bucket`

**Response** 200 → `result`

object

## PATCH /accounts/{account_id}/r2/buckets/{bucket_name}

Patch Bucket

operationId: `r2-patch-bucket`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}

Create Bucket (by name)

operationId: `r2-create-bucket-by-name`

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/cors

Delete Bucket CORS Policy

operationId: `r2-delete-bucket-cors-policy`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/cors

Get Bucket CORS Policy

operationId: `r2-get-bucket-cors-policy`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/cors

Set Bucket CORS Policy

operationId: `r2-put-bucket-cors-policy`

**Request** (application/json)

- `rules`: object[]
  [array of]
  - `allowed`: object **required** — Object specifying allowed origins, methods and headers for this CORS rule.
    - `headers`: string[] — Specifies the value for the Access-Control-Allow-Headers header R2 sets when requesting objects in this bucket from a browser. Cross-origin 
    - `methods`: string[] **required** — Specifies the value for the Access-Control-Allow-Methods header R2 sets when requesting objects in a bucket from a browser.
    - `origins`: string[] **required** — Specifies the value for the Access-Control-Allow-Origin header R2 sets when requesting objects in a bucket from a browser.
  - `exposeHeaders`: string[] — Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. If you need to access heade
    [array]
  - `id`: string — Identifier for this rule.
  - `maxAgeSeconds`: number — Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom

List Custom Domains of Bucket

operationId: `r2-list-custom-domains`

**Response** 200 → `result`

object

## POST /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom

Attach Custom Domain To Bucket

operationId: `r2-add-custom-domain`

**Request** (application/json)

- `ciphers`: string[] — An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.
  [array]
- `domain`: string **required** — Name of the custom domain to be added.
- `enabled`: boolean **required** — Whether to enable public bucket access at the custom domain. If undefined, the domain will be enabled.
- `minTLS`: string enum: `1.0`, `1.1`, `1.2`, `1.3` — Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.
- `zoneId`: string **required** — Zone ID of the custom domain.

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}

Remove Custom Domain From Bucket

operationId: `r2-delete-custom-domain`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}

Get Custom Domain Settings

operationId: `r2-get-custom-domain-settings`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}

Configure Custom Domain Settings

operationId: `r2-edit-custom-domain-settings`

**Request** (application/json)

- `ciphers`: string[] — An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.
  [array]
- `enabled`: boolean — Whether to enable public bucket access at the specified custom domain.
- `minTLS`: string enum: `1.0`, `1.1`, `1.2`, `1.3` — Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to previous value.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed

Get r2.dev Domain of Bucket

operationId: `r2-get-bucket-public-policy`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed

Update r2.dev Domain of Bucket

operationId: `r2-put-bucket-public-policy`

**Request** (application/json)

- `enabled`: boolean **required** — Whether to enable public bucket access at the r2.dev domain.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/jobs

List Bucket Jobs

operationId: `r2-list-bucket-jobs` · query: `jobType`, `status`, `maxKeys`, `continuationToken`

**Response** 200 → `result`

object

## POST /accounts/{account_id}/r2/buckets/{bucket_name}/jobs

Create Bucket Job

operationId: `r2-create-bucket-job`

**Request** (application/json)

(one of 2 variants; showing the first)
- `jobType`: string **required** enum: `prefixDelete`
- `prefix`: string **required** — Prefix matched against object keys. A non-empty value must end in `/`.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/jobs/{job_id}

Get Bucket Job

operationId: `r2-get-bucket-job`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle

Get Object Lifecycle Rules

operationId: `r2-get-bucket-lifecycle-configuration`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle

Set Object Lifecycle Rules

operationId: `r2-put-bucket-lifecycle-configuration`

**Request** (application/json)

- `rules`: object[]
  [array of]
  - `abortMultipartUploadsTransition`: object — Transition to abort ongoing multipart uploads.
    - `condition`: any
  - `conditions`: object **required** — Conditions that apply to all transitions of this rule.
    - `prefix`: string **required** — Transitions will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule
  - `deleteObjectsTransition`: object — Transition to delete objects.
    - `condition`: any
  - `enabled`: boolean **required** — Whether or not this rule is in effect.
  - `id`: string **required** — Unique identifier for this rule.
  - `storageClassTransitions`: object[] — Transitions to change the storage class of objects.
    [array of]
    - `condition`: any **required**
    - `storageClass`: string **required** enum: `InfrequentAccess`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/local-uploads

Get Local Uploads Configuration

operationId: `r2-get-bucket-local-uploads-configuration`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/local-uploads

Set Local Uploads Configuration

operationId: `r2-put-bucket-local-uploads-configuration`

**Request** (application/json)

- `enabled`: boolean **required** — Whether to enable local uploads for this bucket.

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/lock

Delete Bucket Lock Rules

operationId: `r2-delete-bucket-lock-configuration`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/lock

Get Bucket Lock Rules

operationId: `r2-get-bucket-lock-configuration`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/lock

Set Bucket Lock Rules

operationId: `r2-put-bucket-lock-configuration`

**Request** (application/json)

- `rules`: object[]
  [array of]
  - `condition`: any **required**
  - `enabled`: boolean **required** — Whether or not this rule is in effect.
  - `id`: string **required** — Unique identifier for this rule.
  - `prefix`: string — Rule will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all

**Response** 200 → `result`

object

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/sippy

Disable Sippy

operationId: `r2-delete-bucket-sippy-config`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/sippy

Get Sippy Configuration

operationId: `r2-get-bucket-sippy-config`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/sippy

Enable Sippy

operationId: `r2-put-bucket-sippy-config`

**Request** (application/json)

(one of 4 variants; showing the first)
- `destination`: object — R2 bucket to copy objects to.
  - `accessKeyId`: string — ID of a Cloudflare API token.
  - `provider`: string enum: `r2`
  - `secretAccessKey`: string — Value of a Cloudflare API token.
- `source`: object — AWS S3 bucket to copy objects from.
  - `accessKeyId`: string — Access Key ID of an IAM credential (ideally scoped to a single S3 bucket).
  - `bucket`: string — Name of the AWS S3 bucket.
  - `provider`: string enum: `aws`
  - `region`: string — AWS region containing the source S3 bucket.
  - `secretAccessKey`: string — Secret Access Key of an IAM credential (ideally scoped to a single S3 bucket).

**Response** 200 → `result`

object

## POST /accounts/{account_id}/r2/temp-access-credentials

Create Temporary Access Credentials

operationId: `r2-create-temp-access-credentials`

**Request** (application/json)

- `bucket`: string **required** — Name of the R2 bucket.
- `objects`: string[] — Optional object paths to scope the credentials to.
  [array]
- `parentAccessKeyId`: string **required** — Access key ID of the parent R2 API token. The temporary credentials cannot exceed this token's permissions.
- `permission`: string **required** enum: `admin-read-write`, `admin-read-only`, `object-read-write`, `object-read-only` — Permissions allowed on the credentials.
- `prefixes`: string[] — Optional prefix paths to scope the credentials to.
  [array]
- `ttlSeconds`: number **required** default: `900` — Lifetime of the temporary credentials in seconds, up to 604800 seconds (7 days).

**Response** 200 → `result`

object
