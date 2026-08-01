# Radar AI Inference

6 endpoints.

## GET /radar/ai/inference/summary/{dimension}

Get Workers AI inference distribution by dimension

operationId: `radar-get-ai-inference-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `limitPerGroup`, `format`

## GET /radar/ai/inference/summary/model

Get Workers AI models summary

operationId: `radar-get-ai-inference-summary-by-model` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `format`

## GET /radar/ai/inference/summary/task

Get Workers AI tasks summary

operationId: `radar-get-ai-inference-summary-by-task` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `format`

## GET /radar/ai/inference/timeseries_groups/{dimension}

Get time series distribution of Workers AI inference by dimension.

operationId: `radar-get-ai-inference-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `asn`, `location`, `continent`, `limitPerGroup`, `normalization`, `format`

## GET /radar/ai/inference/timeseries_groups/model

Get Workers AI models time series

operationId: `radar-get-ai-inference-timeseries-group-by-model` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `format`

## GET /radar/ai/inference/timeseries_groups/task

Get Workers AI tasks time series

operationId: `radar-get-ai-inference-timeseries-group-by-task` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `format`
