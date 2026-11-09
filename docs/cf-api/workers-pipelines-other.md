# workers_pipelines_other

19 endpoints.

## GET /accounts/{account_id}/pipelines

[DEPRECATED] List Pipelines

operationId: `getV4AccountsByAccount_idPipelines_deprecated` · query: `search`, `page`, `per_page`

**Response** 200 → `result`

- `result_info`: object **required**
  - `count`: number **required** — Indicates the number of items on current page.
  - `page`: number **required** — Indicates the current page number.
  - `per_page`: number **required** — Indicates the number of items per page.
  - `total_count`: number **required** — Indicates the total number of items.
- `results`: object[] **required**
  [array of]
  - `destination`: object **required**
    - `batch`: object **required**
    - `compression`: object **required**
    - `format`: string **required** enum: `json` — Specifies the format of data to deliver.
    - `path`: object **required**
    - `type`: string **required** enum: `r2` — Specifies the type of destination.
  - `endpoint`: string **required** — Indicates the endpoint URL to send traffic.
  - `id`: string **required** — Specifies the pipeline identifier.
  - `name`: string **required** — Defines the name of the pipeline.
  - `source`: object[] **required**
    [array of]
    - `authentication`: boolean — Specifies whether authentication is required to send to this pipeline via HTTP.
    - `cors`: object
    - `format`: string **required** enum: `json` — Specifies the format of source data.
    - `type`: string **required**
  - `version`: number **required** — Indicates the version number of last saved configuration.
- `success`: boolean **required** — Indicates whether the API call was successful.

## POST /accounts/{account_id}/pipelines

[DEPRECATED] Create Pipeline

operationId: `postV4AccountsByAccount_idPipelines_deprecated`

**Request** (application/json)

- `destination`: object **required**
  - `batch`: object **required**
    - `max_bytes`: integer default: `100000000` — Specifies rough maximum size of files.
    - `max_duration_s`: number default: `300` — Specifies duration to wait to aggregate batches files.
    - `max_rows`: integer default: `10000000` — Specifies rough maximum number of rows per file.
  - `compression`: object **required**
    - `type`: string enum: `none`, `gzip`, `deflate` default: `gzip` — Specifies the desired compression algorithm and format.
  - `credentials`: object **required**
    - `access_key_id`: string **required** — Specifies the R2 Bucket Access Key Id.
    - `endpoint`: string **required** — Specifies the R2 Endpoint.
    - `secret_access_key`: string **required** — Specifies the R2 Bucket Secret Access Key.
  - `format`: string **required** enum: `json` — Specifies the format of data to deliver.
  - `path`: object **required**
    - `bucket`: string **required** — Specifies the R2 Bucket to store files.
    - `filename`: any — Specifies the name pattern to for individual data files.
    - `filepath`: string — Specifies the name pattern for directory.
    - `prefix`: string — Specifies the base directory within the bucket.
  - `type`: string **required** enum: `r2` — Specifies the type of destination.
- `name`: string **required** — Defines the name of the pipeline.
- `source`: object[] **required**
  [array of]
  - `authentication`: boolean — Specifies whether authentication is required to send to this pipeline via HTTP.
  - `cors`: object
    - `origins`: string[] — Specifies allowed origins to allow Cross Origin HTTP Requests.
  - `format`: string **required** enum: `json` — Specifies the format of source data.
  - `type`: string **required**

**Response** 200 → `result`

- `destination`: object **required**
  - `batch`: object **required**
    - `max_bytes`: integer **required** default: `100000000` — Specifies rough maximum size of files.
    - `max_duration_s`: number **required** default: `300` — Specifies duration to wait to aggregate batches files.
    - `max_rows`: integer **required** default: `10000000` — Specifies rough maximum number of rows per file.
  - `compression`: object **required**
    - `type`: string **required** enum: `none`, `gzip`, `deflate` default: `gzip` — Specifies the desired compression algorithm and format.
  - `format`: string **required** enum: `json` — Specifies the format of data to deliver.
  - `path`: object **required**
    - `bucket`: string **required** — Specifies the R2 Bucket to store files.
    - `filename`: any — Specifies the name pattern to for individual data files.
    - `filepath`: string — Specifies the name pattern for directory.
    - `prefix`: string — Specifies the base directory within the bucket.
  - `type`: string **required** enum: `r2` — Specifies the type of destination.
- `endpoint`: string **required** — Indicates the endpoint URL to send traffic.
- `id`: string **required** — Specifies the pipeline identifier.
- `name`: string **required** — Defines the name of the pipeline.
- `source`: object[] **required**
  [array of]
  - `authentication`: boolean — Specifies whether authentication is required to send to this pipeline via HTTP.
  - `cors`: object
    - `origins`: string[] — Specifies allowed origins to allow Cross Origin HTTP Requests.
  - `format`: string **required** enum: `json` — Specifies the format of source data.
  - `type`: string **required**
- `version`: number **required** — Indicates the version number of last saved configuration.

## DELETE /accounts/{account_id}/pipelines/{pipeline_name}

[DEPRECATED] Delete Pipeline

operationId: `deleteV4AccountsByAccount_idPipelinesByPipeline_name_deprecated`

## GET /accounts/{account_id}/pipelines/{pipeline_name}

[DEPRECATED] Get Pipeline

operationId: `getV4AccountsByAccount_idPipelinesByPipeline_name_deprecated`

**Response** 200 → `result`

- `destination`: object **required**
  - `batch`: object **required**
    - `max_bytes`: integer **required** default: `100000000` — Specifies rough maximum size of files.
    - `max_duration_s`: number **required** default: `300` — Specifies duration to wait to aggregate batches files.
    - `max_rows`: integer **required** default: `10000000` — Specifies rough maximum number of rows per file.
  - `compression`: object **required**
    - `type`: string **required** enum: `none`, `gzip`, `deflate` default: `gzip` — Specifies the desired compression algorithm and format.
  - `format`: string **required** enum: `json` — Specifies the format of data to deliver.
  - `path`: object **required**
    - `bucket`: string **required** — Specifies the R2 Bucket to store files.
    - `filename`: any — Specifies the name pattern to for individual data files.
    - `filepath`: string — Specifies the name pattern for directory.
    - `prefix`: string — Specifies the base directory within the bucket.
  - `type`: string **required** enum: `r2` — Specifies the type of destination.
- `endpoint`: string **required** — Indicates the endpoint URL to send traffic.
- `id`: string **required** — Specifies the pipeline identifier.
- `name`: string **required** — Defines the name of the pipeline.
- `source`: object[] **required**
  [array of]
  - `authentication`: boolean — Specifies whether authentication is required to send to this pipeline via HTTP.
  - `cors`: object
    - `origins`: string[] — Specifies allowed origins to allow Cross Origin HTTP Requests.
  - `format`: string **required** enum: `json` — Specifies the format of source data.
  - `type`: string **required**
- `version`: number **required** — Indicates the version number of last saved configuration.

## PUT /accounts/{account_id}/pipelines/{pipeline_name}

[DEPRECATED] Update Pipeline

operationId: `putV4AccountsByAccount_idPipelinesByPipeline_name_deprecated`

**Request** (application/json)

- `destination`: object **required**
  - `batch`: object **required**
    - `max_bytes`: integer default: `100000000` — Specifies rough maximum size of files.
    - `max_duration_s`: number default: `300` — Specifies duration to wait to aggregate batches files.
    - `max_rows`: integer default: `10000000` — Specifies rough maximum number of rows per file.
  - `compression`: object **required**
    - `type`: string enum: `none`, `gzip`, `deflate` default: `gzip` — Specifies the desired compression algorithm and format.
  - `credentials`: object
    - `access_key_id`: string **required** — Specifies the R2 Bucket Access Key Id.
    - `endpoint`: string **required** — Specifies the R2 Endpoint.
    - `secret_access_key`: string **required** — Specifies the R2 Bucket Secret Access Key.
  - `format`: string **required** enum: `json` — Specifies the format of data to deliver.
  - `path`: object **required**
    - `bucket`: string **required** — Specifies the R2 Bucket to store files.
    - `filename`: any — Specifies the name pattern to for individual data files.
    - `filepath`: string — Specifies the name pattern for directory.
    - `prefix`: string — Specifies the base directory within the bucket.
  - `type`: string **required** enum: `r2` — Specifies the type of destination.
- `name`: string **required** — Defines the name of the pipeline.
- `source`: object[] **required**
  [array of]
  - `authentication`: boolean — Specifies whether authentication is required to send to this pipeline via HTTP.
  - `cors`: object
    - `origins`: string[] — Specifies allowed origins to allow Cross Origin HTTP Requests.
  - `format`: string **required** enum: `json` — Specifies the format of source data.
  - `type`: string **required**

**Response** 200 → `result`

- `destination`: object **required**
  - `batch`: object **required**
    - `max_bytes`: integer **required** default: `100000000` — Specifies rough maximum size of files.
    - `max_duration_s`: number **required** default: `300` — Specifies duration to wait to aggregate batches files.
    - `max_rows`: integer **required** default: `10000000` — Specifies rough maximum number of rows per file.
  - `compression`: object **required**
    - `type`: string **required** enum: `none`, `gzip`, `deflate` default: `gzip` — Specifies the desired compression algorithm and format.
  - `format`: string **required** enum: `json` — Specifies the format of data to deliver.
  - `path`: object **required**
    - `bucket`: string **required** — Specifies the R2 Bucket to store files.
    - `filename`: any — Specifies the name pattern to for individual data files.
    - `filepath`: string — Specifies the name pattern for directory.
    - `prefix`: string — Specifies the base directory within the bucket.
  - `type`: string **required** enum: `r2` — Specifies the type of destination.
- `endpoint`: string **required** — Indicates the endpoint URL to send traffic.
- `id`: string **required** — Specifies the pipeline identifier.
- `name`: string **required** — Defines the name of the pipeline.
- `source`: object[] **required**
  [array of]
  - `authentication`: boolean — Specifies whether authentication is required to send to this pipeline via HTTP.
  - `cors`: object
    - `origins`: string[] — Specifies allowed origins to allow Cross Origin HTTP Requests.
  - `format`: string **required** enum: `json` — Specifies the format of source data.
  - `type`: string **required**
- `version`: number **required** — Indicates the version number of last saved configuration.

## GET /accounts/{account_id}/pipelines/v1/pipelines

List Pipelines

operationId: `getV4AccountsByAccount_idPipelinesV1Pipelines` · query: `page`, `per_page`, `name`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `id`: string **required** — Indicates a unique identifier for this pipeline.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the Pipeline.
- `sql`: string **required** — Specifies SQL for the Pipeline processing flow.
- `status`: string **required** — Indicates the current status of the Pipeline.

## POST /accounts/{account_id}/pipelines/v1/pipelines

Create Pipeline

operationId: `postV4AccountsByAccount_idPipelinesV1Pipelines`

**Request** (application/json)

- `name`: string **required** — Specifies the name of the Pipeline.
- `sql`: string **required** — Specifies SQL for the Pipeline processing flow.

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required** — Indicates a unique identifier for this pipeline.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the Pipeline.
- `sql`: string **required** — Specifies SQL for the Pipeline processing flow.
- `status`: string **required** — Indicates the current status of the Pipeline.

## DELETE /accounts/{account_id}/pipelines/v1/pipelines/{pipeline_id}

Delete Pipeline

operationId: `deleteV4AccountsByAccount_idPipelinesV1PipelinesByPipeline_id`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/pipelines/v1/pipelines/{pipeline_id}

Get Pipeline Details

operationId: `getV4AccountsByAccount_idPipelinesV1PipelinesByPipeline_id`

**Response** 200 → `result`

- `created_at`: string **required**
- `failure_reason`: string — Indicates the reason for the failure of the Pipeline.
- `id`: string **required** — Indicates a unique identifier for this pipeline.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the Pipeline.
- `sql`: string **required** — Specifies SQL for the Pipeline processing flow.
- `status`: string **required** — Indicates the current status of the Pipeline.
- `tables`: object[] **required** — List of streams and sinks used by this pipeline.
  [array of]
  - `id`: string **required** — Unique identifier for the connection (stream or sink).
  - `latest`: integer **required** — Latest available version of the connection.
  - `name`: string **required** — Name of the connection.
  - `type`: string **required** enum: `stream`, `sink` — Type of the connection.
  - `version`: integer **required** — Current version of the connection used by this pipeline.

## GET /accounts/{account_id}/pipelines/v1/sinks

List Sinks

operationId: `getV4AccountsByAccount_idPipelinesV1Sinks` · query: `pipeline_id`, `name`, `order_by`, `direction`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `config`: any — Defines the configuration of the R2 Sink.
- `created_at`: string **required**
- `format`: any — Defines the output data format of a sink.
- `id`: string **required** — Indicates a unique identifier for this sink.
- `modified_at`: string **required**
- `name`: string **required** — Defines the name of the Sink.
- `schema`: object — Defines the schema of the events in the data stream.
  - `fields`: object[]
    [array of]
    - `type`: string **required** enum: `int32`
    - `metadata_key`: string
    - `name`: string **required**
    - `required`: boolean
    - `sql_name`: string
  - `inferred`: boolean
- `type`: string **required** enum: `r2`, `r2_data_catalog`, `basin_catalog` — Specifies the type of sink.

## POST /accounts/{account_id}/pipelines/v1/sinks

Create Sink

operationId: `postV4AccountsByAccount_idPipelinesV1Sinks`

**Request** (application/json)

- `config`: any — Defines the configuration of the R2 Sink.
- `format`: any — Defines the output data format of a sink.
- `name`: string **required** — Defines the name of the Sink.
- `schema`: object — Defines the schema of the events in the data stream.
  - `fields`: object[]
    [array of]
    - `type`: string **required** enum: `int32`
    - `metadata_key`: string
    - `name`: string **required**
    - `required`: boolean
    - `sql_name`: string
  - `inferred`: boolean
- `type`: string **required** enum: `r2`, `r2_data_catalog`, `basin_catalog` — Specifies the type of sink.

**Response** 200 → `result`

- `config`: any
- `created_at`: string **required**
- `format`: any — Defines the output data format of a sink.
- `id`: string **required** — Indicates a unique identifier for this sink.
- `modified_at`: string **required**
- `name`: string **required** — Defines the name of the Sink.
- `schema`: object — Defines the schema of the events in the data stream.
  - `fields`: object[]
    [array of]
    - `type`: string **required** enum: `int32`
    - `metadata_key`: string
    - `name`: string **required**
    - `required`: boolean
    - `sql_name`: string
  - `inferred`: boolean
- `type`: string **required** enum: `r2`, `r2_data_catalog`, `basin_catalog` — Specifies the type of sink.

## DELETE /accounts/{account_id}/pipelines/v1/sinks/{sink_id}

Delete Sink

operationId: `deleteV4AccountsByAccount_idPipelinesV1SinksBySink_id`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/pipelines/v1/sinks/{sink_id}

Get Sink Details

operationId: `getV4AccountsByAccount_idPipelinesV1SinksBySink_id`

**Response** 200 → `result`

- `config`: any — Defines the configuration of the R2 Sink.
- `created_at`: string **required**
- `format`: any — Defines the output data format of a sink.
- `id`: string **required** — Indicates a unique identifier for this sink.
- `modified_at`: string **required**
- `name`: string **required** — Defines the name of the Sink.
- `schema`: object — Defines the schema of the events in the data stream.
  - `fields`: object[]
    [array of]
    - `type`: string **required** enum: `int32`
    - `metadata_key`: string
    - `name`: string **required**
    - `required`: boolean
    - `sql_name`: string
  - `inferred`: boolean
- `type`: string **required** enum: `r2`, `r2_data_catalog`, `basin_catalog` — Specifies the type of sink.

## GET /accounts/{account_id}/pipelines/v1/streams

List Streams

operationId: `getV4AccountsByAccount_idPipelinesV1Streams` · query: `pipeline_id`, `name`, `order_by`, `direction`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `endpoint`: string — Indicates the endpoint URL of this stream.
- `format`: any — Defines the data format of the events.
- `http`: object **required**
  - `authentication`: boolean **required** — Indicates that authentication is required for the HTTP endpoint.
  - `cors`: object — Specifies the CORS options for the HTTP endpoint.
    - `origins`: string[]
  - `enabled`: boolean **required** — Indicates that the HTTP endpoint is enabled.
- `id`: string **required** — Indicates a unique identifier for this stream.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the Stream.
- `schema`: object — Defines the schema of the events in the data stream.
  - `fields`: object[]
    [array of]
    - `type`: string **required** enum: `int32`
    - `metadata_key`: string
    - `name`: string **required**
    - `required`: boolean
    - `sql_name`: string
  - `inferred`: boolean
- `version`: integer **required** — Indicates the current version of this stream.
- `worker_binding`: object **required**
  - `enabled`: boolean **required** — Indicates that the worker binding is enabled.

## POST /accounts/{account_id}/pipelines/v1/streams

Create Stream

operationId: `postV4AccountsByAccount_idPipelinesV1Streams`

**Request** (application/json)

- `format`: any — Defines the data format of the events.
- `http`: object default: `[object Object]`
  - `authentication`: boolean **required** — Indicates that authentication is required for the HTTP endpoint.
  - `cors`: object — Specifies the CORS options for the HTTP endpoint.
    - `origins`: string[]
  - `enabled`: boolean **required** — Indicates that the HTTP endpoint is enabled.
- `name`: string **required** — Specifies the name of the Stream.
- `schema`: object — Defines the schema of the events in the data stream.
  - `fields`: object[]
    [array of]
    - `type`: string **required** enum: `int32`
    - `metadata_key`: string
    - `name`: string **required**
    - `required`: boolean
    - `sql_name`: string
  - `inferred`: boolean
- `worker_binding`: object default: `[object Object]`
  - `enabled`: boolean **required** — Indicates that the worker binding is enabled.

**Response** 200 → `result`

- `created_at`: string **required**
- `endpoint`: string — Indicates the endpoint URL of this stream.
- `format`: any — Defines the data format of the events.
- `http`: object **required**
  - `authentication`: boolean **required** — Indicates that authentication is required for the HTTP endpoint.
  - `cors`: object — Specifies the CORS options for the HTTP endpoint.
    - `origins`: string[]
  - `enabled`: boolean **required** — Indicates that the HTTP endpoint is enabled.
- `id`: string **required** — Indicates a unique identifier for this stream.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the Stream.
- `schema`: object — Defines the schema of the events in the data stream.
  - `fields`: object[]
    [array of]
    - `type`: string **required** enum: `int32`
    - `metadata_key`: string
    - `name`: string **required**
    - `required`: boolean
    - `sql_name`: string
  - `inferred`: boolean
- `version`: integer **required** — Indicates the current version of this stream.
- `worker_binding`: object **required**
  - `enabled`: boolean **required** — Indicates that the worker binding is enabled.

## DELETE /accounts/{account_id}/pipelines/v1/streams/{stream_id}

Delete Stream

operationId: `deleteV4AccountsByAccount_idPipelinesV1StreamsByStream_id`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/pipelines/v1/streams/{stream_id}

Get Stream Details

operationId: `getV4AccountsByAccount_idPipelinesV1StreamsByStream_id`

**Response** 200 → `result`

- `created_at`: string **required**
- `endpoint`: string — Indicates the endpoint URL of this stream.
- `format`: any — Defines the data format of the events.
- `http`: object **required**
  - `authentication`: boolean **required** — Indicates that authentication is required for the HTTP endpoint.
  - `cors`: object — Specifies the CORS options for the HTTP endpoint.
    - `origins`: string[]
  - `enabled`: boolean **required** — Indicates that the HTTP endpoint is enabled.
- `id`: string **required** — Indicates a unique identifier for this stream.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the Stream.
- `schema`: object — Defines the schema of the events in the data stream.
  - `fields`: object[]
    [array of]
    - `type`: string **required** enum: `int32`
    - `metadata_key`: string
    - `name`: string **required**
    - `required`: boolean
    - `sql_name`: string
  - `inferred`: boolean
- `version`: integer **required** — Indicates the current version of this stream.
- `worker_binding`: object **required**
  - `enabled`: boolean **required** — Indicates that the worker binding is enabled.

## PATCH /accounts/{account_id}/pipelines/v1/streams/{stream_id}

Update Stream

operationId: `patchV4AccountsByAccount_idPipelinesV1StreamsByStream_id`

**Request** (application/json)

- `http`: object
  - `authentication`: boolean **required** — Indicates that authentication is required for the HTTP endpoint.
  - `cors`: object — Specifies the CORS options for the HTTP endpoint.
    - `origins`: string[]
  - `enabled`: boolean **required** — Indicates that the HTTP endpoint is enabled.
- `worker_binding`: object
  - `enabled`: boolean **required** — Indicates that the worker binding is enabled.

**Response** 200 → `result`

- `created_at`: string **required**
- `endpoint`: string — Indicates the endpoint URL of this stream.
- `format`: any — Defines the data format of the events.
- `http`: object **required**
  - `authentication`: boolean **required** — Indicates that authentication is required for the HTTP endpoint.
  - `cors`: object — Specifies the CORS options for the HTTP endpoint.
    - `origins`: string[]
  - `enabled`: boolean **required** — Indicates that the HTTP endpoint is enabled.
- `id`: string **required** — Indicates a unique identifier for this stream.
- `modified_at`: string **required**
- `name`: string **required** — Indicates the name of the Stream.
- `schema`: object — Defines the schema of the events in the data stream.
  - `fields`: object[]
    [array of]
    - `type`: string **required** enum: `int32`
    - `metadata_key`: string
    - `name`: string **required**
    - `required`: boolean
    - `sql_name`: string
  - `inferred`: boolean
- `version`: integer **required** — Indicates the current version of this stream.
- `worker_binding`: object **required**
  - `enabled`: boolean **required** — Indicates that the worker binding is enabled.

## POST /accounts/{account_id}/pipelines/v1/validate_sql

Validate SQL

operationId: `postV4AccountsByAccount_idPipelinesV1Validate_sql`

**Request** (application/json)

- `sql`: string **required** — Specifies SQL to validate.

**Response** 200 → `result`

- `graph`: object — Indicates the processing flow to implement the SQL.
  - `edges`: object[] **required**
    [array of]
    - `dest_id`: integer **required**
    - `edge_type`: string **required**
    - `key_type`: string **required**
    - `src_id`: integer **required**
    - `value_type`: string **required**
  - `nodes`: object[] **required**
    [array of]
    - `description`: string **required**
    - `node_id`: integer **required**
    - `operator`: string **required**
    - `parallelism`: integer **required**
- `tables`: object **required** — Indicates tables involved in the processing.
