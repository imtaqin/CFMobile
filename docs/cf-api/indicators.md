# Indicators

1 endpoints.

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}/indicatorTypes/create

Create an indicator type

operationId: `post_IndicatorTypeCreate`

**Request** (application/json)

- `description`: string — Optional description for the indicator type
- `indicatorType`: string **required** — The indicator type to create (e.g., 'DOMAIN', 'IP', 'URL', 'HASH', 'EMAIL')

**Response** 200 → `result`

- `durableObjectId`: string **required**
- `indicatorType`: string **required**
- `message`: string **required**
