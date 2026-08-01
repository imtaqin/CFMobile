# Workers AI

8 endpoints.

## GET /accounts/{account_id}/ai/authors/search

Author Search

operationId: `workers-ai-search-author`

## GET /accounts/{account_id}/ai/models/schema

Get Model Schema

operationId: `workers-ai-get-model-schema` · query: `model`

## GET /accounts/{account_id}/ai/models/search

Model Search

operationId: `workers-ai-search-model` · query: `per_page`, `page`, `task`, `author`, `source`, `hide_experimental`, `search`, `include_deprecated`, `format`

## POST /accounts/{account_id}/ai/run

Execute AI Model (Generic)

operationId: `workers-ai-post-run-generic`

## POST /accounts/{account_id}/ai/run/{model_name}

Execute AI model

operationId: `workers-ai-post-run-model`

## GET /accounts/{account_id}/ai/tasks/search

Task Search

operationId: `workers-ai-search-task`

## POST /accounts/{account_id}/ai/tomarkdown

Convert Files into Markdown

operationId: `workers-ai-post-to-markdown`

## GET /accounts/{account_id}/ai/tomarkdown/supported

Get all converted formats supported

operationId: `workers-ai-get-to-markdown-supported`
