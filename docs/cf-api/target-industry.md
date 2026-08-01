# Target Industry

3 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/targetIndustries

Lists all target industries for a specific dataset

operationId: `get_TargetIndustryListByDataset`

## GET /accounts/{account_id}/cloudforce-one/events/targetIndustries

Lists target industries across multiple datasets

operationId: `get_TargetIndustryList` · query: `datasetIds`

## GET /accounts/{account_id}/cloudforce-one/events/targetIndustries/catalog

Lists all target industries from industry map catalog

operationId: `get_TargetIndustryListComplete`
