# workers_pipelines_other

19 endpoints.

## GET /accounts/{account_id}/pipelines

[DEPRECATED] List Pipelines

operationId: `getV4AccountsByAccount_idPipelines_deprecated` · query: `search`, `page`, `per_page`

## POST /accounts/{account_id}/pipelines

[DEPRECATED] Create Pipeline

operationId: `postV4AccountsByAccount_idPipelines_deprecated`

## DELETE /accounts/{account_id}/pipelines/{pipeline_name}

[DEPRECATED] Delete Pipeline

operationId: `deleteV4AccountsByAccount_idPipelinesByPipeline_name_deprecated`

## GET /accounts/{account_id}/pipelines/{pipeline_name}

[DEPRECATED] Get Pipeline

operationId: `getV4AccountsByAccount_idPipelinesByPipeline_name_deprecated`

## PUT /accounts/{account_id}/pipelines/{pipeline_name}

[DEPRECATED] Update Pipeline

operationId: `putV4AccountsByAccount_idPipelinesByPipeline_name_deprecated`

## GET /accounts/{account_id}/pipelines/v1/pipelines

List Pipelines

operationId: `getV4AccountsByAccount_idPipelinesV1Pipelines` · query: `page`, `per_page`, `name`

## POST /accounts/{account_id}/pipelines/v1/pipelines

Create Pipeline

operationId: `postV4AccountsByAccount_idPipelinesV1Pipelines`

## DELETE /accounts/{account_id}/pipelines/v1/pipelines/{pipeline_id}

Delete Pipelines

operationId: `deleteV4AccountsByAccount_idPipelinesV1PipelinesByPipeline_id`

## GET /accounts/{account_id}/pipelines/v1/pipelines/{pipeline_id}

Get Pipeline Details

operationId: `getV4AccountsByAccount_idPipelinesV1PipelinesByPipeline_id`

## GET /accounts/{account_id}/pipelines/v1/sinks

List Sinks

operationId: `getV4AccountsByAccount_idPipelinesV1Sinks` · query: `pipeline_id`, `name`, `page`, `per_page`

## POST /accounts/{account_id}/pipelines/v1/sinks

Create Sink

operationId: `postV4AccountsByAccount_idPipelinesV1Sinks`

## DELETE /accounts/{account_id}/pipelines/v1/sinks/{sink_id}

Delete Sink

operationId: `deleteV4AccountsByAccount_idPipelinesV1SinksBySink_id` · query: `force`

## GET /accounts/{account_id}/pipelines/v1/sinks/{sink_id}

Get Sink Details

operationId: `getV4AccountsByAccount_idPipelinesV1SinksBySink_id`

## GET /accounts/{account_id}/pipelines/v1/streams

List Streams

operationId: `getV4AccountsByAccount_idPipelinesV1Streams` · query: `pipeline_id`, `name`, `page`, `per_page`

## POST /accounts/{account_id}/pipelines/v1/streams

Create Stream

operationId: `postV4AccountsByAccount_idPipelinesV1Streams`

## DELETE /accounts/{account_id}/pipelines/v1/streams/{stream_id}

Delete Stream

operationId: `deleteV4AccountsByAccount_idPipelinesV1StreamsByStream_id` · query: `force`

## GET /accounts/{account_id}/pipelines/v1/streams/{stream_id}

Get Stream Details

operationId: `getV4AccountsByAccount_idPipelinesV1StreamsByStream_id`

## PATCH /accounts/{account_id}/pipelines/v1/streams/{stream_id}

Update Stream

operationId: `patchV4AccountsByAccount_idPipelinesV1StreamsByStream_id`

## POST /accounts/{account_id}/pipelines/v1/validate_sql

Validate SQL

operationId: `postV4AccountsByAccount_idPipelinesV1Validate_sql`
