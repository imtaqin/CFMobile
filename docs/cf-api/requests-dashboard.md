# Requests - Dashboard

5 endpoints.

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/constants

Get request constants

operationId: `get_RequestConstants`

**Response** 200 → `result`

- `properties`: object **required**
  - `result`: object **required**
    - `properties`: object **required**
    - `type`: string **required**
  - `success`: object **required**
    - `type`: string **required**
- `type`: string **required**

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/metadata

List metadata fields for an RFI type

operationId: `get_DashboardMetadataFieldList` · query: `request_type`, `country`

**Response** 200 → `result`

- `data`: object[] **required**
  [array of]
  - `created`: string **required**
  - `defaultValue`: any
  - `description`: string
  - `displayOrder`: number **required**
  - `fieldLabel`: string **required**
  - `fieldName`: string **required**
  - `fieldType`: string **required**
  - `id`: string **required**
  - `options`: string[]
    [array]
  - `projectType`: string **required**
  - `public`: boolean **required**
  - `required`: boolean **required**
  - `sectionID`: string
  - `sectionLabel`: string
  - `updated`: string **required**
  - `validation`: object
    - `max`: number
    - `maxLength`: number
    - `min`: number
    - `minLength`: number
    - `pattern`: string
    - `requiredWhen`: object — Require this field only when the predicate matches sibling values.
    - `visibility`: object — Controls which request types and countries this field is shown for.
    - `visibleWhen`: object — Show this field only when the predicate matches sibling values.
- `success`: boolean **required**

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/quota

Get request token quota

operationId: `get_RequestQuota`

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/types

List visible request types for a project (dashboard)

operationId: `get_DashboardRequestTypesList`

**Response** 200 → `result`

- `project_type`: string **required**
- `request_types`: object[] **required**
  [array of]
  - `category`: string **required**
  - `description`: string **required**
  - `id`: string **required**
  - `message_tokens`: integer **required**
  - `name`: string **required**
  - `request_tokens`: integer **required**
  - `response_tokens`: integer **required**
  - `result`: string **required**
  - `source`: string **required**
- `total`: number **required**

## GET /accounts/{account_id}/cloudforce-one/v2/requests/legal-response/access-check

Check if current user is allowlisted for Legal Response

operationId: `get_LegalResponseAccessCheck`

**Response** 200 → `result`

- `allowed`: boolean **required** — True if the JWT user's email is on the legal-response allowlist
