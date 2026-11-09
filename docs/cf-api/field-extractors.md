# Field Extractors

3 endpoints.

## DELETE /accounts/{account_id}/field_extractors/{extractor}

Delete Field Extractor

operationId: `deleteFieldExtractor`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/field_extractors/{extractor}

Get Field Extractor

operationId: `getFieldExtractor`

**Response** 200 → `result`

- `extractor`: string **required** — Extractor type.
- `rules`: object[] **required**
  [array of]
  - `description`: string — Human-readable rule description.
  - `fields`: object[] **required**
    [array of]
    - `expression`: string **required** — Wirefilter value expression.
    - `name`: string **required** — Field name.
  - `ref`: string **required** — Stable rule identifier.

## PUT /accounts/{account_id}/field_extractors/{extractor}

Update Field Extractor

operationId: `updateFieldExtractor`

**Request** (application/json)

- `rules`: object[] **required**
  [array of]
  - `description`: string
  - `fields`: object[] **required**
    [array of]
    - `expression`: string **required**
    - `name`: string **required**
  - `ref`: string **required**

**Response** 200 → `result`

- `extractor`: string **required** — Extractor type.
- `rules`: object[] **required**
  [array of]
  - `description`: string — Human-readable rule description.
  - `fields`: object[] **required**
    [array of]
    - `expression`: string **required** — Wirefilter value expression.
    - `name`: string **required** — Field name.
  - `ref`: string **required** — Stable rule identifier.
