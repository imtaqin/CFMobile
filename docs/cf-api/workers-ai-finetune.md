# Workers AI Finetune

5 endpoints.

## GET /accounts/{account_id}/ai/finetunes

List Finetunes

operationId: `workers-ai-list-finetunes`

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string
- `id`: string **required**
- `model`: string **required**
- `modified_at`: string **required**
- `name`: string **required**

## POST /accounts/{account_id}/ai/finetunes

Create a new Finetune

operationId: `workers-ai-create-finetune`

**Request** (application/json)

- `description`: string
- `model`: string **required**
- `name`: string **required**
- `public`: boolean default: `false`

**Response** 200 → `result`

- `created_at`: string **required**
- `description`: string
- `id`: string **required**
- `model`: string **required**
- `modified_at`: string **required**
- `name`: string **required**
- `public`: boolean **required**

## DELETE /accounts/{account_id}/ai/finetunes/{finetune_id}

Delete a Finetune

operationId: `workers-ai-delete-finetune`

**Response** 200 → `result`

- `id`: string **required**
- `name`: string **required**

## POST /accounts/{account_id}/ai/finetunes/{finetune_id}/finetune-assets

Upload a Finetune Asset

operationId: `workers-ai-upload-finetune-asset`

**Request** (multipart/form-data)

- `file`: string **required** — File to upload.
- `file_name`: string **required** — Name of the file (adapter_config.json or adapter_model.safetensors).

**Response** 200 → `result`

- `success`: boolean **required**

## GET /accounts/{account_id}/ai/finetunes/public

List Public Finetunes

operationId: `workers-ai-list-public-finetunes` · query: `limit`, `offset`, `orderBy`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `description`: string
- `id`: string **required**
- `model`: string **required**
- `modified_at`: string **required**
- `name`: string **required**
- `public`: boolean **required**
