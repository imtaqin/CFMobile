# Custom Indicator Feeds

12 endpoints.

## GET /accounts/{account_id}/intel/indicator-feeds

Get indicator feeds owned by this account

operationId: `custom-indicator-feeds-get-indicator-feeds`

**Response** 200 → `result`

[array of]
- `created_on`: string — The date and time when the data entry was created
- `description`: string — The description of the example test
- `id`: integer — The unique identifier for the indicator feed
- `is_attributable`: boolean — Whether the indicator feed can be attributed to a provider
- `is_downloadable`: boolean — Whether the indicator feed can be downloaded
- `is_public`: boolean — Whether the indicator feed is exposed to customers
- `modified_on`: string — The date and time when the data entry was last modified
- `name`: string — The name of the indicator feed

## POST /accounts/{account_id}/intel/indicator-feeds

Create new indicator feed

operationId: `custom-indicator-feeds-create-indicator-feeds`

**Request** (application/json)

- `description`: string — The description of the example test
- `name`: string — The name of the indicator feed

**Response** 200 → `result`

- `created_on`: string — The date and time when the data entry was created
- `description`: string — The description of the example test
- `id`: integer — The unique identifier for the indicator feed
- `is_attributable`: boolean — Whether the indicator feed can be attributed to a provider
- `is_downloadable`: boolean — Whether the indicator feed can be downloaded
- `is_public`: boolean — Whether the indicator feed is exposed to customers
- `modified_on`: string — The date and time when the data entry was last modified
- `name`: string — The name of the indicator feed

## GET /accounts/{account_id}/intel/indicator-feeds/{feed_id}

Get indicator feed metadata

operationId: `custom-indicator-feeds-get-indicator-feed-metadata`

**Response** 200 → `result`

- `created_on`: string — The date and time when the data entry was created
- `description`: string — The description of the example test
- `id`: integer — The unique identifier for the indicator feed
- `is_attributable`: boolean — Whether the indicator feed can be attributed to a provider
- `is_downloadable`: boolean — Whether the indicator feed can be downloaded
- `is_public`: boolean — Whether the indicator feed is exposed to customers
- `last_upload_summary`: object — Summary of indicator counts from the last successful upload to this
  - `persisted`: object — Net delta applied to feed indicators by this upload. Snapshot
    - `domains_added`: integer
    - `domains_removed`: integer
    - `ips_added`: integer
    - `ips_removed`: integer
    - `urls_added`: integer
    - `urls_removed`: integer
  - `skipped`: object — Counts of indicators that were uploaded but did not reach
    - `allowlisted_domains`: integer — Domains filtered by the global popularity allowlist at QS
    - `expired_indicators`: integer — Indicators in the upload whose valid_until is already in
    - `invalid_indicators`: integer — Reserved for future use. Currently always 0 — the unifier
  - `uploaded`: object — Indicator counts from the unified file the loader received
    - `domains`: integer — Number of domain indicators in the upload
    - `ips`: integer — Number of IP indicators in the upload
    - `urls`: integer — Number of URL indicators in the upload
- `latest_upload_error`: string — Human-readable error message describing why the latest upload
- `latest_upload_status`: string enum: `Mirroring`, `Unifying`, `Loading`, `Provisioning`, `Complete`, `Error` — Status of the latest snapshot uploaded
- `modified_on`: string — The date and time when the data entry was last modified
- `name`: string — The name of the indicator feed
- `provider_id`: integer — The unique identifier for the provider
- `provider_name`: string — The provider of the indicator feed

## PUT /accounts/{account_id}/intel/indicator-feeds/{feed_id}

Update indicator feed metadata

operationId: `custom-indicator-feeds-update-indicator-feed-metadata`

**Request** (application/json)

- `description`: string — The new description of the feed
- `is_attributable`: boolean — The new is_attributable value of the feed
- `is_downloadable`: boolean — The new is_downloadable value of the feed
- `is_public`: boolean — The new is_public value of the feed
- `name`: string — The new name of the feed

**Response** 200 → `result`

- `created_on`: string — The date and time when the data entry was created
- `description`: string — The description of the example test
- `id`: integer — The unique identifier for the indicator feed
- `is_attributable`: boolean — Whether the indicator feed can be attributed to a provider
- `is_downloadable`: boolean — Whether the indicator feed can be downloaded
- `is_public`: boolean — Whether the indicator feed is exposed to customers
- `modified_on`: string — The date and time when the data entry was last modified
- `name`: string — The name of the indicator feed

## GET /accounts/{account_id}/intel/indicator-feeds/{feed_id}/data

Get indicator feed data

operationId: `custom-indicator-feeds-get-indicator-feed-data`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/intel/indicator-feeds/{feed_id}/download

Download indicator feed data

operationId: `custom-indicator-feeds-download-indicator-feed-data`

**Response** 200 → `result`

- `file_id`: integer — Feed id
- `filename`: string — Name of the file unified in our system
- `poll_url`: string — Account-relative polling path. Prepend `/accounts/{account_id}`
- `status`: string — Current status of the upload at the moment the request returned.
- `upload_id`: integer — Identifier of the upload row, for polling this upload to a

## PUT /accounts/{account_id}/intel/indicator-feeds/{feed_id}/snapshot

Update indicator feed data

operationId: `custom-indicator-feeds-update-indicator-feed-data`

**Request** (multipart/form-data)

- `source`: string — The file to upload. Either a plain STIX2/CRDF body

**Response** 200 → `result`

- `file_id`: integer — Feed id
- `filename`: string — Name of the file unified in our system
- `poll_url`: string — Account-relative polling path. Prepend `/accounts/{account_id}`
- `status`: string — Current status of the upload at the moment the request returned.
- `upload_id`: integer — Identifier of the upload row, for polling this upload to a

## GET /accounts/{account_id}/intel/indicator-feeds/{feed_id}/uploads/{upload_id}

Get indicator feed upload status

operationId: `custom-indicator-feeds-get-upload-status`

**Response** 200 → `result`

- `attempts`: integer **required**
- `created_at`: string
- `error`: string — Sanitized terminal error; omitted for non-error states.
- `feed_id`: integer **required** — Indicator feed ID
- `filename`: string **required**
- `poll_after_seconds`: integer **required** — Recommended delay before the next poll; 0 means terminal.
- `stage`: string enum: `queued`, `loading`, `provisioning`, `retrying`, `complete`, `error` — Sanitized durable loader stage, when available.
- `status`: string **required** — `Unifying` while work is queued or active, optionally with attempt
- `updated_at`: string
- `upload_id`: integer **required**

## PUT /accounts/{account_id}/intel/indicator-feeds/permissions/add

Grant permission to indicator feed

operationId: `custom-indicator-feeds-add-permission`

**Request** (application/json)

- `account_tag`: string — The Cloudflare account tag of the account to change permissions on
- `feed_id`: integer — The ID of the feed to add/remove permissions on

**Response** 200 → `result`

- `success`: boolean — Whether the update succeeded or not

## PUT /accounts/{account_id}/intel/indicator-feeds/permissions/createProvider

Create indicator feed provider

operationId: `custom-indicator-feeds-create-provider`

**Request** (application/json)

- `account_id`: integer **required** — The numeric account ID to create the provider for. Distinct from the
- `name`: string **required** — The name of the provider

**Response** 200 → `result`

- `account_id`: integer **required** — The numeric account ID the provider was created for. Distinct from
- `name`: string **required** — The name of the provider
- `provider_id`: integer **required** — The unique identifier for the created provider

## PUT /accounts/{account_id}/intel/indicator-feeds/permissions/remove

Revoke permission to indicator feed

operationId: `custom-indicator-feeds-remove-permission`

**Request** (application/json)

- `account_tag`: string — The Cloudflare account tag of the account to change permissions on
- `feed_id`: integer — The ID of the feed to add/remove permissions on

**Response** 200 → `result`

- `success`: boolean — Whether the update succeeded or not

## GET /accounts/{account_id}/intel/indicator-feeds/permissions/view

List indicator feed permissions

operationId: `custom-indicator-feeds-view-permissions`

**Response** 200 → `result`

[array of]
- `description`: string — The description of the example test
- `id`: integer — The unique identifier for the indicator feed
- `is_attributable`: boolean — Whether the indicator feed can be attributed to a provider
- `is_downloadable`: boolean — Whether the indicator feed can be downloaded
- `is_public`: boolean — Whether the indicator feed is exposed to customers
- `name`: string — The name of the indicator feed
