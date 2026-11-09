# Target Industry

3 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/targetIndustries

List target industries in a dataset (legacy)

operationId: `get_TargetIndustryListByDataset`

**Response** 200 → `result`

- `items`: object **required**
  - `type`: string **required**
- `type`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/targetIndustries

List target industries used in datasets

operationId: `get_TargetIndustryList` · query: `datasetIds`

**Response** 200 → `result`

- `items`: object **required**
  - `type`: string **required**
- `type`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/targetIndustries/catalog

List all target industries

operationId: `get_TargetIndustryListComplete`

**Response** 200 → `result`

- `items`: object **required**
  - `type`: string **required**
- `type`: string **required**
