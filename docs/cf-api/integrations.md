# Integrations

7 endpoints.

## GET /accounts/{account_id}/one/integrations

List integrations

operationId: `list_integrations_v2` · query: `application`, `direction`, `dlp_enabled`, `order`, `page`, `page_size`, `search`, `status`, `use_cases`

## POST /accounts/{account_id}/one/integrations

Create integration

operationId: `create_integration_v2`

## DELETE /accounts/{account_id}/one/integrations/{id}

Delete integration

operationId: `delete_integration_v2`

## GET /accounts/{account_id}/one/integrations/{id}

Get integration details

operationId: `get_integration_v2`

## PATCH /accounts/{account_id}/one/integrations/{id}

Update integration

operationId: `update_integration_v2`

## POST /accounts/{account_id}/one/integrations/{id}/pause

Pause integration

operationId: `pause_integration_v2`

## POST /accounts/{account_id}/one/integrations/{id}/resume

Resume integration

operationId: `resume_integration_v2`
