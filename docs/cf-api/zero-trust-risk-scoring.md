# Zero Trust Risk Scoring

5 endpoints.

## GET /accounts/{account_id}/zt_risk_scoring/{user_id}

Get risk event/score information for a specific user

operationId: `dlp-risk-score-summary-get-for-user`

**Response** 200 → `result`

- `email`: string **required**
- `events`: object[] **required**
  [array of]
  - `event_details`: object
  - `id`: string **required**
  - `name`: string **required**
  - `risk_level`: string **required** enum: `info`, `low`, `medium`, `high`
  - `timestamp`: string **required**
- `last_reset_time`: string
- `name`: string **required**
- `risk_level`: any

## POST /accounts/{account_id}/zt_risk_scoring/{user_id}/reset

Clear the risk score for a particular user

operationId: `dlp-risk-score-reset-post`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/zt_risk_scoring/behaviors

Get all behaviors and associated configuration

operationId: `dlp-risk-score-behaviors-get`

**Response** 200 → `result`

- `behaviors`: object **required**

## PUT /accounts/{account_id}/zt_risk_scoring/behaviors

Update configuration for risk behaviors

operationId: `dlp-risk-score-behaviors-put`

**Request** (application/json)

- `behaviors`: object **required**

**Response** 200 → `result`

- `behaviors`: object **required**

## GET /accounts/{account_id}/zt_risk_scoring/summary

Get risk score info for all users in the account

operationId: `dlp-risk-score-summary-get`

**Response** 200 → `result`

- `users`: object[] **required**
  [array of]
  - `email`: string **required**
  - `event_count`: integer **required**
  - `last_event`: string **required**
  - `max_risk_level`: string **required** enum: `info`, `low`, `medium`, `high`
  - `name`: string **required**
  - `user_id`: string **required**
