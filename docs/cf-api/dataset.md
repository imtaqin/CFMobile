# Dataset

9 endpoints.

## GET /accounts/{account_id}/cloudforce-one/events/dataset

List datasets

operationId: `get_DatasetList` · query: `includeDeleted`

**Response** 200 → `result`

[array of]
- `deletedAt`: string
- `indicatorWriteMode`: string **required** enum: `read_only`, `create_only`, `full` — Effective indicator mutation capability after account/dataset authorization and dataset storage capability are applied. API Gateway method p
- `isAnalytics`: boolean **required**
- `isPublic`: boolean **required**
- `name`: string **required**
- `uuid`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}

Delete a dataset

operationId: `delete_DatasetDelete`

**Response** 200 → `result`

- `name`: string **required**
- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}

Get a dataset

operationId: `get_DatasetRead`

**Response** 200 → `result`

- `isAnalytics`: boolean **required**
- `isPublic`: boolean **required**
- `name`: string **required**
- `uuid`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}

Update a dataset

operationId: `patch_DatasetUpdate`

**Request** (application/json)

- `isPublic`: boolean **required** — If true, then anyone can search the dataset. If false, then its limited to the account.
- `name`: string **required** — Used to describe the dataset within the account context.

**Response** 200 → `result`

- `isAnalytics`: boolean **required**
- `isPublic`: boolean **required**
- `name`: string **required**
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}

Update a dataset

operationId: `post_DatasetUpdate`

**Request** (application/json)

- `isPublic`: boolean **required** — If true, then anyone can search the dataset. If false, then its limited to the account.
- `name`: string **required** — Used to describe the dataset within the account context.

**Response** 200 → `result`

- `isAnalytics`: boolean **required**
- `isPublic`: boolean **required**
- `name`: string **required**
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/dataset/create

Create a dataset

operationId: `post_DatasetCreate`

**Request** (application/json)

- `isPublic`: boolean **required** — If true, then anyone can search the dataset. If false, then its limited to the account.
- `name`: string **required** — Used to describe the dataset within the account context.

**Response** 200 → `result`

- `isAnalytics`: boolean **required**
- `isPublic`: boolean **required**
- `name`: string **required**
- `uuid`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/datasets/preferences

Remove default datasets

operationId: `delete_DatasetPreferencesDelete` · query: `scope`

**Response** 200 → `result`

- `account`: object **required** — The account's default datasets, or null if they are not set.
  - `datasetIds`: string[] **required** — The saved dataset UUIDs.
    [array]
  - `unresolvableDatasetIds`: string[] **required** — Saved datasets that you can no longer read or that were deleted. While this list is not empty, the preference is skipped.
    [array]
  - `updatedAt`: string **required** — When the preference was last set.
  - `updatedBy`: string **required** — The email address of the user who last set the preference.
- `effective`: object **required** — The datasets that event searches use when `datasetId` is omitted.
  - `datasetIds`: string[] **required**
    [array]
  - `source`: string **required** enum: `user_preference`, `account_preference`, `environment` — `user_preference`: your default datasets. `account_preference`: the account's default datasets. `environment`: no usable preference is set, 
- `user`: object **required** — Your default datasets, or null if you have not set them.
  - `datasetIds`: string[] **required** — The saved dataset UUIDs.
    [array]
  - `unresolvableDatasetIds`: string[] **required** — Saved datasets that you can no longer read or that were deleted. While this list is not empty, the preference is skipped.
    [array]
  - `updatedAt`: string **required** — When the preference was last set.
  - `updatedBy`: string **required** — The email address of the user who last set the preference.

## GET /accounts/{account_id}/cloudforce-one/events/datasets/preferences

Get default datasets

operationId: `get_DatasetPreferencesRead`

**Response** 200 → `result`

- `account`: object **required** — The account's default datasets, or null if they are not set.
  - `datasetIds`: string[] **required** — The saved dataset UUIDs.
    [array]
  - `unresolvableDatasetIds`: string[] **required** — Saved datasets that you can no longer read or that were deleted. While this list is not empty, the preference is skipped.
    [array]
  - `updatedAt`: string **required** — When the preference was last set.
  - `updatedBy`: string **required** — The email address of the user who last set the preference.
- `effective`: object **required** — The datasets that event searches use when `datasetId` is omitted.
  - `datasetIds`: string[] **required**
    [array]
  - `source`: string **required** enum: `user_preference`, `account_preference`, `environment` — `user_preference`: your default datasets. `account_preference`: the account's default datasets. `environment`: no usable preference is set, 
- `user`: object **required** — Your default datasets, or null if you have not set them.
  - `datasetIds`: string[] **required** — The saved dataset UUIDs.
    [array]
  - `unresolvableDatasetIds`: string[] **required** — Saved datasets that you can no longer read or that were deleted. While this list is not empty, the preference is skipped.
    [array]
  - `updatedAt`: string **required** — When the preference was last set.
  - `updatedBy`: string **required** — The email address of the user who last set the preference.

## PUT /accounts/{account_id}/cloudforce-one/events/datasets/preferences

Set default datasets

operationId: `put_DatasetPreferencesUpdate`

**Request** (application/json)

- `datasetIds`: string[] **required** — The dataset UUIDs to use when a request omits `datasetId`: 1 to 50 datasets you can read. Duplicates are ignored.
  [array]
- `scope`: string **required** enum: `user`, `account` — `user` sets your own default datasets. `account` sets the default datasets for everyone in the account who has not set their own, and requir

**Response** 200 → `result`

- `account`: object **required** — The account's default datasets, or null if they are not set.
  - `datasetIds`: string[] **required** — The saved dataset UUIDs.
    [array]
  - `unresolvableDatasetIds`: string[] **required** — Saved datasets that you can no longer read or that were deleted. While this list is not empty, the preference is skipped.
    [array]
  - `updatedAt`: string **required** — When the preference was last set.
  - `updatedBy`: string **required** — The email address of the user who last set the preference.
- `effective`: object **required** — The datasets that event searches use when `datasetId` is omitted.
  - `datasetIds`: string[] **required**
    [array]
  - `source`: string **required** enum: `user_preference`, `account_preference`, `environment` — `user_preference`: your default datasets. `account_preference`: the account's default datasets. `environment`: no usable preference is set, 
- `user`: object **required** — Your default datasets, or null if you have not set them.
  - `datasetIds`: string[] **required** — The saved dataset UUIDs.
    [array]
  - `unresolvableDatasetIds`: string[] **required** — Saved datasets that you can no longer read or that were deleted. While this list is not empty, the preference is skipped.
    [array]
  - `updatedAt`: string **required** — When the preference was last set.
  - `updatedBy`: string **required** — The email address of the user who last set the preference.
