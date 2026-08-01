# R2 Bucket

29 endpoints.

## GET /accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration

List Event Notification Rules

operationId: `r2-get-event-notification-configs`

## DELETE /accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}

Delete Event Notification Rules

operationId: `r2-event-notification-delete-config`

## GET /accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}

Get Event Notification Rule

operationId: `r2-get-event-notification-config`

## PUT /accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}

Create Event Notification Rule

operationId: `r2-put-event-notification-config`

## GET /accounts/{account_id}/r2/buckets

List Buckets

operationId: `r2-list-buckets` · query: `name_contains`, `start_after`, `per_page`, `order`, `direction`, `cursor`

## POST /accounts/{account_id}/r2/buckets

Create Bucket

operationId: `r2-create-bucket`

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}

Delete Bucket

operationId: `r2-delete-bucket`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}

Get Bucket

operationId: `r2-get-bucket`

## PATCH /accounts/{account_id}/r2/buckets/{bucket_name}

Patch Bucket

operationId: `r2-patch-bucket`

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/cors

Delete Bucket CORS Policy

operationId: `r2-delete-bucket-cors-policy`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/cors

Get Bucket CORS Policy

operationId: `r2-get-bucket-cors-policy`

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/cors

Put Bucket CORS Policy

operationId: `r2-put-bucket-cors-policy`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom

List Custom Domains of Bucket

operationId: `r2-list-custom-domains`

## POST /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom

Attach Custom Domain To Bucket

operationId: `r2-add-custom-domain`

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}

Remove Custom Domain From Bucket

operationId: `r2-delete-custom-domain`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}

Get Custom Domain Settings

operationId: `r2-get-custom-domain-settings`

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}

Configure Custom Domain Settings

operationId: `r2-edit-custom-domain-settings`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed

Get r2.dev Domain of Bucket

operationId: `r2-get-bucket-public-policy`

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed

Update r2.dev Domain of Bucket

operationId: `r2-put-bucket-public-policy`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle

Get Object Lifecycle Rules

operationId: `r2-get-bucket-lifecycle-configuration`

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle

Put Object Lifecycle Rules

operationId: `r2-put-bucket-lifecycle-configuration`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/local-uploads

Get Local Uploads Configuration

operationId: `r2-get-bucket-local-uploads-configuration`

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/local-uploads

Put Local Uploads Configuration

operationId: `r2-put-bucket-local-uploads-configuration`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/lock

Get Bucket Lock Rules

operationId: `r2-get-bucket-lock-configuration`

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/lock

Put Bucket Lock Rules

operationId: `r2-put-bucket-lock-configuration`

## DELETE /accounts/{account_id}/r2/buckets/{bucket_name}/sippy

Disable Sippy

operationId: `r2-delete-bucket-sippy-config`

## GET /accounts/{account_id}/r2/buckets/{bucket_name}/sippy

Get Sippy Configuration

operationId: `r2-get-bucket-sippy-config`

## PUT /accounts/{account_id}/r2/buckets/{bucket_name}/sippy

Enable Sippy

operationId: `r2-put-bucket-sippy-config`

## POST /accounts/{account_id}/r2/temp-access-credentials

Create Temporary Access Credentials

operationId: `r2-create-temp-access-credentials`
