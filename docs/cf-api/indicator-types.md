# Indicator Types

2 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/indicator-types

List indicator types

operationId: `get_IndicatorTypesList` · query: `datasetIds`

**Response** 200 → `result`

- `items`: object **required**
  - `type`: string **required**
- `type`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/indicatorTypes

List indicator types (legacy)

operationId: `get_LegacyIndicatorTypesList`

**Response** 200 → `result`

- `items`: object **required**
  - `type`: string **required**
- `type`: string **required**
