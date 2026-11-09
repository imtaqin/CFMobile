# RFI Messages

4 endpoints.

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/{request_id}/messages

List messages for an RFI request

operationId: `get_MessageList` · query: `page`, `per_page`

**Response** 200 → `result`

- `messages`: object[] **required**
  [array of]
  - `attachments`: object[] **required**
    [array of]
    - `contentType`: string **required**
    - `downloadable`: boolean **required**
    - `fileName`: string **required**
    - `fileSize`: integer **required**
    - `id`: string **required**
    - `is_cloudflare_team`: boolean **required**
    - `origin`: string **required** enum: `cloudflare`, `self`
    - `state`: string **required** enum: `active`, `expired`, `revoked`
  - `content`: string **required**
  - `created`: string **required**
  - `id`: integer **required**
  - `is_cloudflare_team`: boolean **required**
  - `is_published`: boolean **required**
  - `published`: string **required**
  - `tlp`: string **required** enum: `clear`, `green`, `amber`, `amber-strict`, `red`
  - `updated`: string **required**
- `result_info`: object **required**
  - `has_more`: boolean **required**
  - `page`: integer **required**
  - `per_page`: integer **required**
  - `total_count`: integer **required**

## GET /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/{request_id}/messages/{message_id}

Read a single message for an RFI request

operationId: `get_MessageRead`

**Response** 200 → `result`

- `attachments`: object[] **required**
  [array of]
  - `contentType`: string **required**
  - `downloadable`: boolean **required**
  - `fileName`: string **required**
  - `fileSize`: integer **required**
  - `id`: string **required**
  - `is_cloudflare_team`: boolean **required**
  - `origin`: string **required** enum: `cloudflare`, `self`
  - `state`: string **required** enum: `active`, `expired`, `revoked`
- `content`: string **required**
- `created`: string **required**
- `id`: integer **required**
- `is_cloudflare_team`: boolean **required**
- `is_published`: boolean **required**
- `published`: string **required**
- `tlp`: string **required** enum: `clear`, `green`, `amber`, `amber-strict`, `red`
- `updated`: string **required**

## PUT /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/{request_id}/messages/{message_id}

Update/publish a message for an RFI request

operationId: `put_MessageUpdate`

**Request** (application/json)

- `attachment_asset_ids`: string[]
  [array]
- `content`: string **required**
- `publish`: boolean **required**
- `tlp`: string **required** enum: `clear`, `green`, `amber`, `amber-strict`, `red`, `white`

**Response** 200 → `result`

- `message`: object **required**
  - `attachments`: object[] **required**
    [array of]
    - `contentType`: string **required**
    - `downloadable`: boolean **required**
    - `fileName`: string **required**
    - `fileSize`: integer **required**
    - `id`: string **required**
    - `is_cloudflare_team`: boolean **required**
    - `origin`: string **required** enum: `cloudflare`, `self`
    - `state`: string **required** enum: `active`, `expired`, `revoked`
  - `content`: string **required**
  - `created`: string **required**
  - `id`: integer **required**
  - `is_cloudflare_team`: boolean **required**
  - `is_published`: boolean **required**
  - `published`: string **required**
  - `tlp`: string **required** enum: `clear`, `green`, `amber`, `amber-strict`, `red`
  - `updated`: string **required**

## POST /accounts/{account_id}/cloudforce-one/v2/requests/{project_type}/{request_id}/messages/new

Create a customer follow-on message on an RFI request

operationId: `post_MessageCreate`

**Request** (application/json)

- `attachment_asset_ids`: string[]
  [array]
- `author_id`: string
- `author_name`: string
- `content`: string **required**
- `publish`: boolean default: `false`
- `tlp`: string enum: `clear`, `green`, `amber`, `amber-strict`, `red`, `white` default: `red`

**Response** 200 → `result`

- `attachments`: object[] **required**
  [array of]
  - `contentType`: string **required**
  - `downloadable`: boolean **required**
  - `fileName`: string **required**
  - `fileSize`: integer **required**
  - `id`: string **required**
  - `is_cloudflare_team`: boolean **required**
  - `origin`: string **required** enum: `cloudflare`, `self`
  - `state`: string **required** enum: `active`, `expired`, `revoked`
- `content`: string **required**
- `created`: string **required**
- `id`: integer **required**
- `is_cloudflare_team`: boolean **required**
- `is_published`: boolean **required**
- `published`: string **required**
- `tlp`: string **required** enum: `clear`, `green`, `amber`, `amber-strict`, `red`
- `updated`: string **required**
