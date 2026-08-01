# Zero Trust Risk Scoring

5 endpoints.

## GET /accounts/{account_id}/zt_risk_scoring/{user_id}

Get risk event/score information for a specific user

operationId: `dlp-risk-score-summary-get-for-user`

## POST /accounts/{account_id}/zt_risk_scoring/{user_id}/reset

Clear the risk score for a particular user

operationId: `dlp-risk-score-reset-post`

## GET /accounts/{account_id}/zt_risk_scoring/behaviors

Get all behaviors and associated configuration

operationId: `dlp-risk-score-behaviors-get`

## PUT /accounts/{account_id}/zt_risk_scoring/behaviors

Update configuration for risk behaviors

operationId: `dlp-risk-score-behaviors-put`

## GET /accounts/{account_id}/zt_risk_scoring/summary

Get risk score info for all users in the account

operationId: `dlp-risk-score-summary-get`
