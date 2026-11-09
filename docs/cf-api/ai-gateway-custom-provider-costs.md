# AI Gateway Custom Provider Costs

5 endpoints.

## GET /accounts/{account_id}/ai-gateway/custom-providers/costs

List custom provider pricing rules

operationId: `aig-config-list-account-provider-cost` · query: `page`, `per_page`, `enable`, `account_provider_id`, `model_rule`, `cost_type`, `search`

**Response** 200 → `result`

[array of]
- `account_provider_id`: string **required**
- `changed_by`: string default: `manual`
- `cost_in`: number
- `cost_out`: number
- `cost_type`: string default: `tokens`
- `created_at`: string **required**
- `enable`: boolean
- `id`: string **required**
- `model`: string **required**
- `model_rule`: string enum: `equals`, `starts-with`, `contains` default: `equals`
- `modified_at`: string **required**
- `token_pricing`: string
- `weight`: integer

## POST /accounts/{account_id}/ai-gateway/custom-providers/costs

Create a custom provider pricing rule

operationId: `aig-config-create-account-provider-cost`

**Request** (application/json)

- `account_provider_id`: string **required** — ID of the custom provider that the pricing rule applies to.
- `cost_in`: number
- `cost_out`: number
- `cost_type`: string default: `tokens`
- `enable`: boolean
- `model`: string **required**
- `model_rule`: string enum: `equals`, `starts-with`, `contains` default: `equals`
- `token_pricing`: object
  - `input_audio_tokens`: number
  - `input_cache_creation_tokens`: number
  - `input_cached_tokens`: number
  - `input_image_count`: number
  - `input_image_tokens`: number
  - `input_text_tokens`: number
  - `input_tokens`: number
  - `input_video_tokens`: number
  - `output_image_count`: number
  - `output_reasoning_tokens`: number
  - `output_tokens`: number
  - `total_tokens`: number

**Response** 200 → `result`

- `account_provider_id`: string **required**
- `changed_by`: string default: `manual`
- `cost_in`: number
- `cost_out`: number
- `cost_type`: string default: `tokens`
- `created_at`: string **required**
- `enable`: boolean
- `id`: string **required**
- `model`: string **required**
- `model_rule`: string enum: `equals`, `starts-with`, `contains` default: `equals`
- `modified_at`: string **required**
- `token_pricing`: string
- `weight`: integer

## DELETE /accounts/{account_id}/ai-gateway/custom-providers/costs/{id}

Delete a custom provider pricing rule

operationId: `aig-config-delete-account-provider-cost`

**Response** 200 → `result`

- `account_provider_id`: string **required**
- `changed_by`: string default: `manual`
- `cost_in`: number
- `cost_out`: number
- `cost_type`: string default: `tokens`
- `created_at`: string **required**
- `enable`: boolean
- `id`: string **required**
- `model`: string **required**
- `model_rule`: string enum: `equals`, `starts-with`, `contains` default: `equals`
- `modified_at`: string **required**
- `token_pricing`: string
- `weight`: integer

## GET /accounts/{account_id}/ai-gateway/custom-providers/costs/{id}

Get a custom provider pricing rule

operationId: `aig-config-fetch-account-provider-cost`

**Response** 200 → `result`

- `account_provider_id`: string **required**
- `changed_by`: string default: `manual`
- `cost_in`: number
- `cost_out`: number
- `cost_type`: string default: `tokens`
- `created_at`: string **required**
- `enable`: boolean
- `id`: string **required**
- `model`: string **required**
- `model_rule`: string enum: `equals`, `starts-with`, `contains` default: `equals`
- `modified_at`: string **required**
- `token_pricing`: string
- `weight`: integer

## PATCH /accounts/{account_id}/ai-gateway/custom-providers/costs/{id}

Update a custom provider pricing rule

operationId: `aig-config-update-account-provider-cost`

**Request** (application/json)

- `cost_in`: number
- `cost_out`: number
- `cost_type`: string default: `tokens`
- `enable`: boolean
- `model`: string
- `model_rule`: string enum: `equals`, `starts-with`, `contains` default: `equals`
- `token_pricing`: object
  - `input_audio_tokens`: number
  - `input_cache_creation_tokens`: number
  - `input_cached_tokens`: number
  - `input_image_count`: number
  - `input_image_tokens`: number
  - `input_text_tokens`: number
  - `input_tokens`: number
  - `input_video_tokens`: number
  - `output_image_count`: number
  - `output_reasoning_tokens`: number
  - `output_tokens`: number
  - `total_tokens`: number

**Response** 200 → `result`

- `account_provider_id`: string **required**
- `changed_by`: string default: `manual`
- `cost_in`: number
- `cost_out`: number
- `cost_type`: string default: `tokens`
- `created_at`: string **required**
- `enable`: boolean
- `id`: string **required**
- `model`: string **required**
- `model_rule`: string enum: `equals`, `starts-with`, `contains` default: `equals`
- `modified_at`: string **required**
- `token_pricing`: string
- `weight`: integer
