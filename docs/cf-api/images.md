# Images

2 endpoints.

## GET /zones/{zone_id}/images/v1/flows

Get transformation flows

operationId: `get_FlowsGet`

**Response** 200 → `result`

- `etag`: string
- `flows`: object[] **required**
  [array of]
  - `enabled`: boolean **required**
  - `provider`: string **required** enum: `fastly`
  - `type`: string **required** enum: `provider`
  - `version`: number **required**
- `version`: number **required** enum: `2`

## PUT /zones/{zone_id}/images/v1/flows

Update transformation flows

operationId: `put_FlowsUpdate`

**Request** (application/json)

- `etag`: string
- `flows`: object[] **required**
  [array of]
  - `enabled`: boolean **required**
  - `provider`: string **required** enum: `fastly`
  - `type`: string **required** enum: `provider`
  - `version`: number **required**
- `version`: number **required** enum: `2`

**Response** 200 → `result`

- `etag`: string
- `flows`: object[] **required**
  [array of]
  - `enabled`: boolean **required**
  - `provider`: string **required** enum: `fastly`
  - `type`: string **required** enum: `provider`
  - `version`: number **required**
- `version`: number **required** enum: `2`
