# MCP Portal

6 endpoints.

## GET /accounts/{account_id}/access/ai-controls/mcp/portals

List MCP Portals

operationId: `mcp-portals-api-list-portals` · query: `page`, `per_page`, `search`

## POST /accounts/{account_id}/access/ai-controls/mcp/portals

Create a new MCP Portal

operationId: `mcp-portals-api-create-portals`

## DELETE /accounts/{account_id}/access/ai-controls/mcp/portals/{id}

Delete a MCP Portal

operationId: `mcp-portals-api-delete-portals`

## GET /accounts/{account_id}/access/ai-controls/mcp/portals/{id}

Read details of an MCP Portal

operationId: `mcp-portals-api-fetch-gateways`

## PUT /accounts/{account_id}/access/ai-controls/mcp/portals/{id}

Update a MCP Portal

operationId: `mcp-portals-api-update-portals`

## GET /accounts/{account_id}/access/ai-controls/mcp/portals/{portal_id}/servers/{server_id}/effective-redirect-uri

Resolve the OAuth redirect_uri the admin must register at the upstream

operationId: `mcp-portals-api-effective-redirect-uri`
