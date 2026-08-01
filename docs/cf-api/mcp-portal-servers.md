# MCP Portal Servers

6 endpoints.

## GET /accounts/{account_id}/access/ai-controls/mcp/servers

List MCP Servers

operationId: `mcp-portals-api-list-servers` · query: `page`, `per_page`, `search`

## POST /accounts/{account_id}/access/ai-controls/mcp/servers

Create a new MCP Server

operationId: `mcp-portals-api-create-servers`

## DELETE /accounts/{account_id}/access/ai-controls/mcp/servers/{id}

Delete a MCP Server

operationId: `mcp-portals-api-delete-servers`

## GET /accounts/{account_id}/access/ai-controls/mcp/servers/{id}

Read the details of a MCP Server

operationId: `mcp-portals-api-fetch-servers`

## PUT /accounts/{account_id}/access/ai-controls/mcp/servers/{id}

Update a MCP Server

operationId: `mcp-portals-api-update-servers`

## POST /accounts/{account_id}/access/ai-controls/mcp/servers/{id}/sync

Sync MCP Server Capabilities

operationId: `mcp-portals-api-sync-server`
