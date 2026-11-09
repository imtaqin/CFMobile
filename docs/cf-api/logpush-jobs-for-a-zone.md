# Logpush jobs for a zone

12 endpoints.

## GET /zones/{zone_id}/logpush/datasets/{dataset_id}/fields

List fields

operationId: `get-zones-zone_id-logpush-datasets-dataset_id-fields`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/logpush/datasets/{dataset_id}/jobs

List Logpush jobs for a dataset

operationId: `get-zones-zone_id-logpush-datasets-dataset_id-jobs`

**Response** 200 → `result`

[array of]
- `dataset`: string enum: `access_requests`, `account_abuse_protection_events`, `ai_gateway_events`, `audit_logs`, `audit_logs_v2`, `biso_user_actions`, `casb_findings`, `device_posture_results` default: `http_requests` — Name of the dataset. A list of supported datasets can be found on the [Developer Docs](https://developers.cloudflare.com/logs/reference/log-
- `destination_conf`: string — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti
- `enabled`: boolean default: `false` — Flag that indicates if the job is enabled.
- `error_message`: string — If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only t
- `filter_attack_traffic`: boolean default: `false` — When true, excludes DDoS attack traffic from logs. This option is supported for the `http_requests`, `firewall_events`, and `network_analyti
- `frequency`: string enum: `high`, `low` default: `high` — This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your de
- `id`: integer — Unique id of the job.
- `kind`: string enum: ``, `edge` default: `` — The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).
- `last_complete`: string — Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2
- `last_error`: string — Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run succes
- `logpull_options`: string — This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp format
- `max_upload_bytes`: integer — The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that
- `max_upload_interval_seconds`: integer — The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note tha
- `max_upload_records`: integer — The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot
- `name`: string — Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make i
- `output_options`: object — The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.
  - `CVE-2021-44228`: boolean — If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.
  - `batch_prefix`: string — String to be prepended before each batch.
  - `batch_suffix`: string — String to be appended after each batch.
  - `field_delimiter`: string — String to join fields. This field be ignored when `record_template` is set.
  - `field_names`: string[] — List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify 
    [array]
  - `merge_subrequests`: boolean — If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.
  - `output_type`: string enum: `ndjson`, `csv` — Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output 
  - `record_delimiter`: string — String to be inserted in-between the records as separator.
  - `record_prefix`: string — String to be prepended before each record.
  - `record_suffix`: string — String to be appended after each record.
  - `record_template`: string — String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in 
  - `sample_rate`: number — Specifies the sampling rate as a floating number greater than 0 and at most 1. Sampling is applied on top of filtering, and regardless of th
  - `timestamp_format`: string enum: `unixnano`, `unix`, `rfc3339`, `rfc3339ms`, `rfc3339ns` — String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

## GET /zones/{zone_id}/logpush/jobs

List Logpush jobs

operationId: `get-zones-zone_id-logpush-jobs`

**Response** 200 → `result`

[array of]
- `dataset`: string enum: `access_requests`, `account_abuse_protection_events`, `ai_gateway_events`, `audit_logs`, `audit_logs_v2`, `biso_user_actions`, `casb_findings`, `device_posture_results` default: `http_requests` — Name of the dataset. A list of supported datasets can be found on the [Developer Docs](https://developers.cloudflare.com/logs/reference/log-
- `destination_conf`: string — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti
- `enabled`: boolean default: `false` — Flag that indicates if the job is enabled.
- `error_message`: string — If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only t
- `filter_attack_traffic`: boolean default: `false` — When true, excludes DDoS attack traffic from logs. This option is supported for the `http_requests`, `firewall_events`, and `network_analyti
- `frequency`: string enum: `high`, `low` default: `high` — This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your de
- `id`: integer — Unique id of the job.
- `kind`: string enum: ``, `edge` default: `` — The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).
- `last_complete`: string — Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2
- `last_error`: string — Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run succes
- `logpull_options`: string — This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp format
- `max_upload_bytes`: integer — The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that
- `max_upload_interval_seconds`: integer — The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note tha
- `max_upload_records`: integer — The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot
- `name`: string — Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make i
- `output_options`: object — The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.
  - `CVE-2021-44228`: boolean — If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.
  - `batch_prefix`: string — String to be prepended before each batch.
  - `batch_suffix`: string — String to be appended after each batch.
  - `field_delimiter`: string — String to join fields. This field be ignored when `record_template` is set.
  - `field_names`: string[] — List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify 
    [array]
  - `merge_subrequests`: boolean — If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.
  - `output_type`: string enum: `ndjson`, `csv` — Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output 
  - `record_delimiter`: string — String to be inserted in-between the records as separator.
  - `record_prefix`: string — String to be prepended before each record.
  - `record_suffix`: string — String to be appended after each record.
  - `record_template`: string — String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in 
  - `sample_rate`: number — Specifies the sampling rate as a floating number greater than 0 and at most 1. Sampling is applied on top of filtering, and regardless of th
  - `timestamp_format`: string enum: `unixnano`, `unix`, `rfc3339`, `rfc3339ms`, `rfc3339ns` — String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

## POST /zones/{zone_id}/logpush/jobs

Create Logpush job

operationId: `post-zones-zone_id-logpush-jobs`

**Request** (application/json)

- `dataset`: string enum: `access_requests`, `account_abuse_protection_events`, `ai_gateway_events`, `audit_logs`, `audit_logs_v2`, `biso_user_actions`, `casb_findings`, `device_posture_results` default: `http_requests` — Name of the dataset. A list of supported datasets can be found on the [Developer Docs](https://developers.cloudflare.com/logs/reference/log-
- `destination_conf`: string **required** — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti
- `enabled`: boolean default: `false` — Flag that indicates if the job is enabled.
- `filter`: string — The filters to select the events to include and/or remove from your logs. For more information, refer to [Filters](https://developers.cloudf
- `filter_attack_traffic`: boolean default: `false` — When true, excludes DDoS attack traffic from logs. This option is supported for the `http_requests`, `firewall_events`, and `network_analyti
- `frequency`: string enum: `high`, `low` default: `high` — This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your de
- `kind`: string enum: ``, `edge` default: `` — The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).
- `logpull_options`: string — This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp format
- `max_upload_bytes`: integer — The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that
- `max_upload_interval_seconds`: integer — The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note tha
- `max_upload_records`: integer — The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot
- `name`: string — Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make i
- `output_options`: object — The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.
  - `CVE-2021-44228`: boolean — If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.
  - `batch_prefix`: string — String to be prepended before each batch.
  - `batch_suffix`: string — String to be appended after each batch.
  - `field_delimiter`: string — String to join fields. This field be ignored when `record_template` is set.
  - `field_names`: string[] — List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify 
    [array]
  - `merge_subrequests`: boolean — If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.
  - `output_type`: string enum: `ndjson`, `csv` — Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output 
  - `record_delimiter`: string — String to be inserted in-between the records as separator.
  - `record_prefix`: string — String to be prepended before each record.
  - `record_suffix`: string — String to be appended after each record.
  - `record_template`: string — String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in 
  - `sample_rate`: number — Specifies the sampling rate as a floating number greater than 0 and at most 1. Sampling is applied on top of filtering, and regardless of th
  - `timestamp_format`: string enum: `unixnano`, `unix`, `rfc3339`, `rfc3339ms`, `rfc3339ns` — String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.
- `ownership_challenge`: string — Ownership challenge token to prove destination ownership.

**Response** 200 → `result`

- `dataset`: string enum: `access_requests`, `account_abuse_protection_events`, `ai_gateway_events`, `audit_logs`, `audit_logs_v2`, `biso_user_actions`, `casb_findings`, `device_posture_results` default: `http_requests` — Name of the dataset. A list of supported datasets can be found on the [Developer Docs](https://developers.cloudflare.com/logs/reference/log-
- `destination_conf`: string — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti
- `enabled`: boolean default: `false` — Flag that indicates if the job is enabled.
- `error_message`: string — If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only t
- `filter_attack_traffic`: boolean default: `false` — When true, excludes DDoS attack traffic from logs. This option is supported for the `http_requests`, `firewall_events`, and `network_analyti
- `frequency`: string enum: `high`, `low` default: `high` — This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your de
- `id`: integer — Unique id of the job.
- `kind`: string enum: ``, `edge` default: `` — The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).
- `last_complete`: string — Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2
- `last_error`: string — Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run succes
- `logpull_options`: string — This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp format
- `max_upload_bytes`: integer — The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that
- `max_upload_interval_seconds`: integer — The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note tha
- `max_upload_records`: integer — The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot
- `name`: string — Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make i
- `output_options`: object — The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.
  - `CVE-2021-44228`: boolean — If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.
  - `batch_prefix`: string — String to be prepended before each batch.
  - `batch_suffix`: string — String to be appended after each batch.
  - `field_delimiter`: string — String to join fields. This field be ignored when `record_template` is set.
  - `field_names`: string[] — List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify 
    [array]
  - `merge_subrequests`: boolean — If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.
  - `output_type`: string enum: `ndjson`, `csv` — Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output 
  - `record_delimiter`: string — String to be inserted in-between the records as separator.
  - `record_prefix`: string — String to be prepended before each record.
  - `record_suffix`: string — String to be appended after each record.
  - `record_template`: string — String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in 
  - `sample_rate`: number — Specifies the sampling rate as a floating number greater than 0 and at most 1. Sampling is applied on top of filtering, and regardless of th
  - `timestamp_format`: string enum: `unixnano`, `unix`, `rfc3339`, `rfc3339ms`, `rfc3339ns` — String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

## DELETE /zones/{zone_id}/logpush/jobs/{job_id}

Delete Logpush job

operationId: `delete-zones-zone_id-logpush-jobs-job_id`

**Response** 200 → `result`

- `id`: integer — Unique id of the job.

## GET /zones/{zone_id}/logpush/jobs/{job_id}

Get Logpush job details

operationId: `get-zones-zone_id-logpush-jobs-job_id`

**Response** 200 → `result`

- `dataset`: string enum: `access_requests`, `account_abuse_protection_events`, `ai_gateway_events`, `audit_logs`, `audit_logs_v2`, `biso_user_actions`, `casb_findings`, `device_posture_results` default: `http_requests` — Name of the dataset. A list of supported datasets can be found on the [Developer Docs](https://developers.cloudflare.com/logs/reference/log-
- `destination_conf`: string — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti
- `enabled`: boolean default: `false` — Flag that indicates if the job is enabled.
- `error_message`: string — If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only t
- `filter_attack_traffic`: boolean default: `false` — When true, excludes DDoS attack traffic from logs. This option is supported for the `http_requests`, `firewall_events`, and `network_analyti
- `frequency`: string enum: `high`, `low` default: `high` — This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your de
- `id`: integer — Unique id of the job.
- `kind`: string enum: ``, `edge` default: `` — The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).
- `last_complete`: string — Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2
- `last_error`: string — Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run succes
- `logpull_options`: string — This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp format
- `max_upload_bytes`: integer — The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that
- `max_upload_interval_seconds`: integer — The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note tha
- `max_upload_records`: integer — The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot
- `name`: string — Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make i
- `output_options`: object — The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.
  - `CVE-2021-44228`: boolean — If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.
  - `batch_prefix`: string — String to be prepended before each batch.
  - `batch_suffix`: string — String to be appended after each batch.
  - `field_delimiter`: string — String to join fields. This field be ignored when `record_template` is set.
  - `field_names`: string[] — List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify 
    [array]
  - `merge_subrequests`: boolean — If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.
  - `output_type`: string enum: `ndjson`, `csv` — Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output 
  - `record_delimiter`: string — String to be inserted in-between the records as separator.
  - `record_prefix`: string — String to be prepended before each record.
  - `record_suffix`: string — String to be appended after each record.
  - `record_template`: string — String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in 
  - `sample_rate`: number — Specifies the sampling rate as a floating number greater than 0 and at most 1. Sampling is applied on top of filtering, and regardless of th
  - `timestamp_format`: string enum: `unixnano`, `unix`, `rfc3339`, `rfc3339ms`, `rfc3339ns` — String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

## PUT /zones/{zone_id}/logpush/jobs/{job_id}

Update Logpush job

operationId: `put-zones-zone_id-logpush-jobs-job_id`

**Request** (application/json)

- `destination_conf`: string — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti
- `enabled`: boolean default: `false` — Flag that indicates if the job is enabled.
- `filter`: string — The filters to select the events to include and/or remove from your logs. For more information, refer to [Filters](https://developers.cloudf
- `filter_attack_traffic`: boolean default: `false` — When true, excludes DDoS attack traffic from logs. This option is supported for the `http_requests`, `firewall_events`, and `network_analyti
- `frequency`: string enum: `high`, `low` default: `high` — This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your de
- `kind`: string enum: ``, `edge` default: `` — The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).
- `logpull_options`: string — This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp format
- `max_upload_bytes`: integer — The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that
- `max_upload_interval_seconds`: integer — The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note tha
- `max_upload_records`: integer — The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot
- `name`: string — Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make i
- `output_options`: object — The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.
  - `CVE-2021-44228`: boolean — If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.
  - `batch_prefix`: string — String to be prepended before each batch.
  - `batch_suffix`: string — String to be appended after each batch.
  - `field_delimiter`: string — String to join fields. This field be ignored when `record_template` is set.
  - `field_names`: string[] — List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify 
    [array]
  - `merge_subrequests`: boolean — If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.
  - `output_type`: string enum: `ndjson`, `csv` — Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output 
  - `record_delimiter`: string — String to be inserted in-between the records as separator.
  - `record_prefix`: string — String to be prepended before each record.
  - `record_suffix`: string — String to be appended after each record.
  - `record_template`: string — String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in 
  - `sample_rate`: number — Specifies the sampling rate as a floating number greater than 0 and at most 1. Sampling is applied on top of filtering, and regardless of th
  - `timestamp_format`: string enum: `unixnano`, `unix`, `rfc3339`, `rfc3339ms`, `rfc3339ns` — String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.
- `ownership_challenge`: string — Ownership challenge token to prove destination ownership.

**Response** 200 → `result`

- `dataset`: string enum: `access_requests`, `account_abuse_protection_events`, `ai_gateway_events`, `audit_logs`, `audit_logs_v2`, `biso_user_actions`, `casb_findings`, `device_posture_results` default: `http_requests` — Name of the dataset. A list of supported datasets can be found on the [Developer Docs](https://developers.cloudflare.com/logs/reference/log-
- `destination_conf`: string — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti
- `enabled`: boolean default: `false` — Flag that indicates if the job is enabled.
- `error_message`: string — If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only t
- `filter_attack_traffic`: boolean default: `false` — When true, excludes DDoS attack traffic from logs. This option is supported for the `http_requests`, `firewall_events`, and `network_analyti
- `frequency`: string enum: `high`, `low` default: `high` — This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your de
- `id`: integer — Unique id of the job.
- `kind`: string enum: ``, `edge` default: `` — The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).
- `last_complete`: string — Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2
- `last_error`: string — Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run succes
- `logpull_options`: string — This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp format
- `max_upload_bytes`: integer — The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that
- `max_upload_interval_seconds`: integer — The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note tha
- `max_upload_records`: integer — The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot
- `name`: string — Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make i
- `output_options`: object — The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.
  - `CVE-2021-44228`: boolean — If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.
  - `batch_prefix`: string — String to be prepended before each batch.
  - `batch_suffix`: string — String to be appended after each batch.
  - `field_delimiter`: string — String to join fields. This field be ignored when `record_template` is set.
  - `field_names`: string[] — List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify 
    [array]
  - `merge_subrequests`: boolean — If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.
  - `output_type`: string enum: `ndjson`, `csv` — Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output 
  - `record_delimiter`: string — String to be inserted in-between the records as separator.
  - `record_prefix`: string — String to be prepended before each record.
  - `record_suffix`: string — String to be appended after each record.
  - `record_template`: string — String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in 
  - `sample_rate`: number — Specifies the sampling rate as a floating number greater than 0 and at most 1. Sampling is applied on top of filtering, and regardless of th
  - `timestamp_format`: string enum: `unixnano`, `unix`, `rfc3339`, `rfc3339ms`, `rfc3339ns` — String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

## POST /zones/{zone_id}/logpush/ownership

Get ownership challenge

operationId: `post-zones-zone_id-logpush-ownership`

**Request** (application/json)

- `destination_conf`: string **required** — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti

**Response** 200 → `result`

- `filename`: string
- `message`: string
- `valid`: boolean

## POST /zones/{zone_id}/logpush/ownership/validate

Validate ownership challenge

operationId: `post-zones-zone_id-logpush-ownership-validate`

**Request** (application/json)

- `destination_conf`: string **required** — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti
- `ownership_challenge`: string **required** — Ownership challenge token to prove destination ownership.

**Response** 200 → `result`

- `valid`: boolean

## POST /zones/{zone_id}/logpush/validate/destination

Validate destination

operationId: `post-zones-zone_id-logpush-validate-destination`

**Request** (application/json)

- `destination_conf`: string **required** — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti

**Response** 200 → `result`

- `message`: string
- `valid`: boolean

## POST /zones/{zone_id}/logpush/validate/destination/exists

Check destination exists

operationId: `post-zones-zone_id-logpush-validate-destination-exists`

**Request** (application/json)

- `destination_conf`: string **required** — Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the desti

**Response** 200 → `result`

- `exists`: boolean

## POST /zones/{zone_id}/logpush/validate/origin

Validate origin

operationId: `post-zones-zone_id-logpush-validate-origin`

**Request** (application/json)

- `logpull_options`: string **required** — This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp format

**Response** 200 → `result`

- `message`: string
- `valid`: boolean
