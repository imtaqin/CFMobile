# Radar Datasets

3 endpoints.

## GET /radar/datasets

List datasets

operationId: `radar-get-reports-datasets` · query: `limit`, `offset`, `datasetType`, `date`, `format`

## GET /radar/datasets/{alias}

Get dataset CSV stream

operationId: `radar-get-reports-dataset-download`

## POST /radar/datasets/download

Get dataset download URL

operationId: `radar-post-reports-dataset-download-url` · query: `format`
