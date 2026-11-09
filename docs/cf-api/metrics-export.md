# Metrics Export

2 endpoints.

## GET /accounts/{account_id}/workers/observability/metricsexport

List Metrics Exports

operationId: `metricsExport.list`

**Response** 200 → `result`

[array of]
- `createdAt`: string **required**
- `destinations`: string[] **required**
  [array]
- `resourceId`: string **required**
- `resourceType`: string **required** enum: `workers`, `d1`, `r2`, `containers`
- `updatedAt`: string **required**

## POST /accounts/{account_id}/workers/observability/metricsexport

Upsert Metrics Exports

operationId: `metricsExport.upsert`

**Request** (application/json)

- `requester`: object **required**
  - `requesterId`: string **required**
  - `requesterType`: string **required** enum: `workers`
- `resources`: object[] **required**
  [array of]
  - `destinations`: string[] **required**
    [array]
  - `resourceId`: string **required**
  - `resourceType`: string **required** enum: `workers`, `d1`, `r2`, `containers`

**Response** 201 → `result`

[array of]
- `createdAt`: string **required**
- `destinations`: string[] **required**
  [array]
- `resourceId`: string **required**
- `resourceType`: string **required** enum: `workers`, `d1`, `r2`, `containers`
- `updatedAt`: string **required**
