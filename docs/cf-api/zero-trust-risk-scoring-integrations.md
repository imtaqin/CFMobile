# Zero Trust Risk Scoring Integrations

6 endpoints.

## GET /accounts/{account_id}/zt_risk_scoring/integrations

List all risk score integrations for the account.

operationId: `dlp-zt-risk-score-integration-list`

## POST /accounts/{account_id}/zt_risk_scoring/integrations

Create new risk score integration.

operationId: `dlp-zt-risk-score-integration-create`

## DELETE /accounts/{account_id}/zt_risk_scoring/integrations/{integration_id}

Delete a risk score integration.

operationId: `dlp-zt-risk-score-integration-delete`

## GET /accounts/{account_id}/zt_risk_scoring/integrations/{integration_id}

Get risk score integration by id.

operationId: `dlp-zt-risk-score-integration-get`

## PUT /accounts/{account_id}/zt_risk_scoring/integrations/{integration_id}

Update a risk score integration.

operationId: `dlp-zt-risk-score-integration-update`

## GET /accounts/{account_id}/zt_risk_scoring/integrations/reference_id/{reference_id}

Get risk score integration by reference id.

operationId: `dlp-zt-risk-score-integration-get-by-reference-id`
