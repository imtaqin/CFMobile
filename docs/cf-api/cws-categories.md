# CWS Categories

6 endpoints.

## GET /cws/categories/apis

List category APIs

operationId: `cws-list-category-apis` · query: `cursor`, `per_page`, `application`, `name`, `variants`

**Response** 200 → `result`

[array of]
- `ancestors`: object[] **required** — Application and API paths associated with this name
  [array of]
  - `kind`: string **required**
  - `name`: string **required**
- `name`: string **required** — API or operation name
- `variants`: object[] — Routing identities represented by this name
  [array of]
  - `id`: string **required**
  - `key`: string **required**
  - `parent_id`: string

## GET /cws/categories/applications

List category applications

operationId: `cws-list-category-applications` · query: `cursor`, `per_page`, `name`

**Response** 200 → `result`

[array of]
- `key`: string **required** — Stable application key used by version routes
- `name`: string **required** — Application name

## GET /cws/categories/applications/{application_key}/versions

List application versions

operationId: `cws-list-category-application-versions` · query: `cursor`, `per_page`

**Response** 200 → `result`

[array of]
- `bundle_format`: string **required** enum: `v1`
- `bundle_hash`: string **required**
- `category_count`: integer **required**
- `created_at`: string **required**
- `definition_count`: integer **required**
- `group_count`: integer **required**
- `id`: string **required**
- `metadata`: object **required**
- `version`: string **required**

## GET /cws/categories/applications/{application_key}/versions/{version_tag}

Get an application version

operationId: `cws-get-category-application-version`

**Response** 200 → `result`

- `bundle`: object **required**
  - `format`: string **required** enum: `v1`
  - `groups`: object[]
    [array of]
    - `description`: string
    - `id`: string **required**
    - `kind`: string **required**
    - `legacy_id`: integer
    - `member_ids`: string[] **required**
    - `metadata`: object
    - `name`: string **required**
    - `scope`: object **required**
  - `root`: object **required**
    - `children`: object[]
    - `definitions`: object[] **required**
    - `description`: string
    - `id`: string **required**
    - `key`: string **required**
    - `kind`: string **required**
    - `legacy_id`: integer
    - `metadata`: object
    - `name`: string **required**
- `bundle_format`: string **required** enum: `v1`
- `bundle_hash`: string **required**
- `category_count`: integer **required**
- `created_at`: string **required**
- `definition_count`: integer **required**
- `group_count`: integer **required**
- `id`: string **required**
- `metadata`: object **required**
- `version`: string **required**

## GET /cws/categories/applications/{application_key}/versions/latest

Get the latest application version

operationId: `cws-get-latest-category-application-version`

**Response** 200 → `result`

- `bundle`: object **required**
  - `format`: string **required** enum: `v1`
  - `groups`: object[]
    [array of]
    - `description`: string
    - `id`: string **required**
    - `kind`: string **required**
    - `legacy_id`: integer
    - `member_ids`: string[] **required**
    - `metadata`: object
    - `name`: string **required**
    - `scope`: object **required**
  - `root`: object **required**
    - `children`: object[]
    - `definitions`: object[] **required**
    - `description`: string
    - `id`: string **required**
    - `key`: string **required**
    - `kind`: string **required**
    - `legacy_id`: integer
    - `metadata`: object
    - `name`: string **required**
- `bundle_format`: string **required** enum: `v1`
- `bundle_hash`: string **required**
- `category_count`: integer **required**
- `created_at`: string **required**
- `definition_count`: integer **required**
- `group_count`: integer **required**
- `id`: string **required**
- `metadata`: object **required**
- `version`: string **required**

## GET /cws/categories/operations

List category operations

operationId: `cws-list-category-operations` · query: `cursor`, `per_page`, `application`, `api`, `name`, `variants`

**Response** 200 → `result`

[array of]
- `ancestors`: object[] **required** — Application and API paths associated with this name
  [array of]
  - `kind`: string **required**
  - `name`: string **required**
- `name`: string **required** — API or operation name
- `variants`: object[] — Routing identities represented by this name
  [array of]
  - `id`: string **required**
  - `key`: string **required**
  - `parent_id`: string
