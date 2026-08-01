# Workers AI Finetune

4 endpoints.

## GET /accounts/{account_id}/ai/finetunes

List Finetunes

operationId: `workers-ai-list-finetunes`

## POST /accounts/{account_id}/ai/finetunes

Create a new Finetune

operationId: `workers-ai-create-finetune`

## POST /accounts/{account_id}/ai/finetunes/{finetune_id}/finetune-assets

Upload a Finetune Asset

operationId: `workers-ai-upload-finetune-asset`

## GET /accounts/{account_id}/ai/finetunes/public

List Public Finetunes

operationId: `workers-ai-list-public-finetunes` · query: `limit`, `offset`, `orderBy`
