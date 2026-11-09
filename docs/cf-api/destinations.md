# Destinations

4 endpoints.

## GET /accounts/{account_id}/workers/observability/destinations

Get Destinations

operationId: `destination.list` · query: `page`, `perPage`, `order`, `orderBy`

**Response** 200 → `result`

[array of]
- `configuration`: object **required**
  - `headers`: object **required**
  - `jobStatus`: object **required**
    - `error_message`: string **required**
    - `last_complete`: string **required**
    - `last_error`: string **required**
  - `logpushDataset`: any **required**
  - `type`: string **required** enum: `logpush`
  - `url`: string **required**
- `enabled`: boolean **required**
- `name`: string **required**
- `scripts`: string[] **required**
  [array]
- `slug`: string **required**

## POST /accounts/{account_id}/workers/observability/destinations

Create Destination

operationId: `destination.create`

**Request** (application/json)

- `configuration`: object **required**
  - `headers`: object **required**
  - `logpushDataset`: any **required**
  - `type`: string **required** enum: `logpush`
  - `url`: string **required**
- `enabled`: boolean **required**
- `name`: string **required**
- `skipPreflightCheck`: boolean

**Response** 201 → `result`

- `configuration`: object **required**
  - `headers`: object **required**
  - `jobStatus`: object **required**
    - `error_message`: string **required**
    - `last_complete`: string **required**
    - `last_error`: string **required**
  - `logpushDataset`: any **required**
  - `type`: string **required** enum: `logpush`
  - `url`: string **required**
- `enabled`: boolean **required**
- `name`: string **required**
- `scripts`: string[] **required**
  [array]
- `slug`: string **required**

## DELETE /accounts/{account_id}/workers/observability/destinations/{slug}

Delete Destination

operationId: `destinations.delete`

**Response** 200 → `result`

- `configuration`: object **required**
  - `headers`: object **required**
  - `jobStatus`: object **required**
    - `error_message`: string **required**
    - `last_complete`: string **required**
    - `last_error`: string **required**
  - `logpushDataset`: any **required**
  - `type`: string **required** enum: `logpush`
  - `url`: string **required**
- `enabled`: boolean **required**
- `name`: string **required**
- `scripts`: string[] **required**
  [array]
- `slug`: string **required**

## PATCH /accounts/{account_id}/workers/observability/destinations/{slug}

Update Destination

operationId: `destination.update`

**Request** (application/json)

- `configuration`: object
  - `headers`: object **required**
  - `replaceHeaders`: boolean
  - `type`: string **required** enum: `logpush`
  - `url`: string **required**
- `enabled`: boolean **required**

**Response** 200 → `result`

- `configuration`: object **required**
  - `headers`: object **required**
  - `jobStatus`: object **required**
    - `error_message`: string **required**
    - `last_complete`: string **required**
    - `last_error`: string **required**
  - `logpushDataset`: any **required**
  - `type`: string **required** enum: `logpush`
  - `url`: string **required**
- `enabled`: boolean **required**
- `name`: string **required**
- `scripts`: string[] **required**
  [array]
- `slug`: string **required**
