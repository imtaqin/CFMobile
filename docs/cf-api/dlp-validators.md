# DLP Validators

13 endpoints.

## GET /accounts/{account_id}/dlp/validators

List validators

operationId: `dlp-validators-list-validators` · query: `kind`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `updated_at`: string **required**
- `words`: object[] **required** — The words that raise confidence when found near a match.
  [array of]
  - `weight`: string **required** enum: `strong`, `moderate`, `weak` — How much a word contributes to a match's confidence when it is found nearby.
  - `word`: string **required** — The word or phrase to look for. Must contain 1–128 characters and is matched
- `kind`: string **required** enum: `proximity_words`

## GET /accounts/{account_id}/dlp/validators/{validator_id}

Get a validator

operationId: `dlp-validators-get-validator`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `updated_at`: string **required**
- `words`: object[] **required** — The words that raise confidence when found near a match.
  [array of]
  - `weight`: string **required** enum: `strong`, `moderate`, `weak` — How much a word contributes to a match's confidence when it is found nearby.
  - `word`: string **required** — The word or phrase to look for. Must contain 1–128 characters and is matched
- `kind`: string **required** enum: `proximity_words`

## GET /accounts/{account_id}/dlp/validators/proximity_words

List proximity word validators

operationId: `dlp-validators-list-proximity-words-validators`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `updated_at`: string **required**
- `words`: object[] **required** — The words that raise confidence when found near a match.
  [array of]
  - `weight`: string **required** enum: `strong`, `moderate`, `weak` — How much a word contributes to a match's confidence when it is found nearby.
  - `word`: string **required** — The word or phrase to look for. Must contain 1–128 characters and is matched

## POST /accounts/{account_id}/dlp/validators/proximity_words

Create a proximity word validator

operationId: `dlp-validators-create-proximity-words-validator`

**Request** (application/json)

- `name`: string **required** — A name for this validator, at most 50 characters.
- `words`: object[] **required** — The words that raise confidence when found near a match, at most 100 per validator. Matching
  [array of]
  - `weight`: string **required** enum: `strong`, `moderate`, `weak` — How much a word contributes to a match's confidence when it is found nearby.
  - `word`: string **required** — The word or phrase to look for. Must contain 1–128 characters and is matched

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `updated_at`: string **required**
- `words`: object[] **required** — The words that raise confidence when found near a match.
  [array of]
  - `weight`: string **required** enum: `strong`, `moderate`, `weak` — How much a word contributes to a match's confidence when it is found nearby.
  - `word`: string **required** — The word or phrase to look for. Must contain 1–128 characters and is matched

## DELETE /accounts/{account_id}/dlp/validators/proximity_words/{validator_id}

Delete a proximity word validator

operationId: `dlp-validators-delete-proximity-words-validator`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/dlp/validators/proximity_words/{validator_id}

Get a proximity word validator

operationId: `dlp-validators-get-proximity-words-validator`

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `updated_at`: string **required**
- `words`: object[] **required** — The words that raise confidence when found near a match.
  [array of]
  - `weight`: string **required** enum: `strong`, `moderate`, `weak` — How much a word contributes to a match's confidence when it is found nearby.
  - `word`: string **required** — The word or phrase to look for. Must contain 1–128 characters and is matched

## PUT /accounts/{account_id}/dlp/validators/proximity_words/{validator_id}

Update a proximity word validator

operationId: `dlp-validators-update-proximity-words-validator`

**Request** (application/json)

- `name`: string **required** — A name for this validator, at most 50 characters.
- `words`: object[] **required** — The words that raise confidence when found near a match, at most 100 per validator. Matching
  [array of]
  - `weight`: string **required** enum: `strong`, `moderate`, `weak` — How much a word contributes to a match's confidence when it is found nearby.
  - `word`: string **required** — The word or phrase to look for. Must contain 1–128 characters and is matched

**Response** 200 → `result`

- `created_at`: string **required**
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `updated_at`: string **required**
- `words`: object[] **required** — The words that raise confidence when found near a match.
  [array of]
  - `weight`: string **required** enum: `strong`, `moderate`, `weak` — How much a word contributes to a match's confidence when it is found nearby.
  - `word`: string **required** — The word or phrase to look for. Must contain 1–128 characters and is matched

## GET /accounts/{account_id}/dlp/validators/worker

List worker validators

operationId: `dlp-validators-list-worker-validators`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `default`: any
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `script_tag`: string **required** — The public script tag of the customer's Worker that scores matches.
- `updated_at`: string **required**

## POST /accounts/{account_id}/dlp/validators/worker

Create a worker validator

operationId: `dlp-validators-create-worker-validator`

**Request** (application/json)

- `default`: any
- `name`: string **required** — A name for this validator, at most 50 characters.
- `script_tag`: string **required** — The public script tag of the customer's Worker that scores matches.

**Response** 200 → `result`

- `created_at`: string **required**
- `default`: any
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `script_tag`: string **required** — The public script tag of the customer's Worker that scores matches.
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/dlp/validators/worker/{validator_id}

Delete a worker validator

operationId: `dlp-validators-delete-worker-validator`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/dlp/validators/worker/{validator_id}

Get a worker validator

operationId: `dlp-validators-get-worker-validator`

**Response** 200 → `result`

- `created_at`: string **required**
- `default`: any
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `script_tag`: string **required** — The public script tag of the customer's Worker that scores matches.
- `updated_at`: string **required**

## PUT /accounts/{account_id}/dlp/validators/worker/{validator_id}

Update a worker validator

operationId: `dlp-validators-update-worker-validator`

**Request** (application/json)

- `default`: any
- `name`: string **required** — A name for this validator, at most 50 characters.
- `script_tag`: string **required** — The public script tag of the customer's Worker that scores matches.

**Response** 200 → `result`

- `created_at`: string **required**
- `default`: any
- `id`: string **required**
- `name`: string **required** — A name for this validator, at most 50 characters.
- `referenced_by`: any **required**
- `script_tag`: string **required** — The public script tag of the customer's Worker that scores matches.
- `updated_at`: string **required**

## GET /accounts/{account_id}/dlp/validators/worker/{validator_id}/status

Get a worker validator status

operationId: `dlp-validators-get-worker-validator-status`

**Response** 200 → `result`

- `status`: string **required** enum: `worker_not_found`, `worker_error`, `configured`, `active`
