# Workers AI

8 endpoints.

## GET /accounts/{account_id}/ai/authors/search

Author Search

operationId: `workers-ai-search-author`

**Response** 200 → `result`

[array of]
object

## GET /accounts/{account_id}/ai/models/schema

Get an AI model's input and output schemas

operationId: `workers-ai-get-model-schema` · query: `model`

**Response** 200 → `result`

- `input`: object **required**
  - `additionalProperties`: boolean **required**
  - `description`: string **required**
  - `type`: string **required**
- `output`: object **required**
  - `additionalProperties`: boolean **required**
  - `description`: string **required**
  - `type`: string **required**

## GET /accounts/{account_id}/ai/models/search

Model Search

operationId: `workers-ai-search-model` · query: `per_page`, `page`, `task`, `author`, `source`, `hide_experimental`, `search`, `include_deprecated`, `format`

**Response** 200 → `result`

[array of]
object

## POST /accounts/{account_id}/ai/run

Run an AI model with request options

operationId: `workers-ai-post-run-generic`

**Request** (application/json)

- `input`: object **required** — JSON object containing the selected model's input fields, such as prompt or messages. Do not include model or options inside this object.
- `model`: string **required** — The AI model to execute (e.g., @cf/google/gemma-4-26b-a4b-it, openai/gpt-5.5, anthropic/claude-opus-4.7)
- `options`: object
  - `extraHeaders`: object — Additional headers to pass to the AI provider
  - `gateway`: object
    - `cacheTtl`: number — Cache TTL in seconds
    - `id`: string — AI Gateway ID for caching and logging
    - `skipCache`: boolean — Skip cache lookup for this request

**Response** 200 → `result`

object

## POST /accounts/{account_id}/ai/run/{model_name}

Run a Workers AI model

operationId: `workers-ai-post-run-model`

**Request** (application/json)

(one of 13 variants; showing the first)
- `text`: string **required** — The text that you want to classify

**Response** 200 → `result`

(one of 13 variants; showing the first)
[array of]
- `label`: string — The classification label assigned to the text (e.g., 'POSITIVE' or 'NEGATIVE')
- `score`: number — Confidence score indicating the likelihood that the text belongs to the specified label

## GET /accounts/{account_id}/ai/tasks/search

Task Search

operationId: `workers-ai-search-task`

**Response** 200 → `result`

[array of]
object

## POST /accounts/{account_id}/ai/tomarkdown

Convert uploaded files to Markdown

operationId: `workers-ai-post-to-markdown`

**Request** (multipart/form-data)

- `files`: string[] **required** — Files to convert, supplied as multipart file uploads.
  [array]

**Response** 200 → `result`

[array of]
- `data`: string **required**
- `format`: string **required**
- `mimeType`: string **required**
- `name`: string **required**
- `tokens`: string **required**

## GET /accounts/{account_id}/ai/tomarkdown/supported

List supported Markdown conversion formats

operationId: `workers-ai-get-to-markdown-supported`

**Response** 200 → `result`

[array of]
- `extension`: string **required**
- `mimeType`: string **required**
