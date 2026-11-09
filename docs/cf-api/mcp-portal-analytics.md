# MCP Portal Analytics

3 endpoints.

## GET /accounts/{account_id}/access/ai-controls/mcp/analytics/portals/{portal_id}/tool-calls/timeseries

Per-portal MCP tool-call timeseries

operationId: `mcp-portals-api-portal-tool-call-timeseries` · query: `granularity`, `aggregate`, `tz`, `days`, `response_status`

**Response** 200 → `result`

- `aggregate`: boolean **required**
- `end`: integer **required**
- `granularity`: string **required** enum: `daily`, `monthly`
- `response_status`: string **required** enum: `success`, `error`, `cached`, `all`
- `series`: object[] **required**
  [array of]
  - `count`: integer **required**
  - `day`: string **required**
- `start`: integer **required**
- `total`: integer **required**
- `tz`: string **required**

## GET /accounts/{account_id}/access/ai-controls/mcp/analytics/servers/{server_id}/tool-calls/timeseries

Per-server MCP tool-call timeseries

operationId: `mcp-portals-api-server-tool-call-timeseries` · query: `granularity`, `aggregate`, `tz`, `days`, `response_status`

**Response** 200 → `result`

- `aggregate`: boolean **required**
- `end`: integer **required**
- `granularity`: string **required** enum: `daily`, `monthly`
- `response_status`: string **required** enum: `success`, `error`, `cached`, `all`
- `series`: object[] **required**
  [array of]
  - `count`: integer **required**
  - `day`: string **required**
- `start`: integer **required**
- `total`: integer **required**
- `tz`: string **required**

## GET /accounts/{account_id}/access/ai-controls/mcp/analytics/tool-calls/timeseries

Account-global MCP tool-call timeseries

operationId: `mcp-portals-api-account-tool-call-timeseries` · query: `granularity`, `aggregate`, `tz`, `days`, `response_status`

**Response** 200 → `result`

- `aggregate`: boolean **required**
- `end`: integer **required**
- `granularity`: string **required** enum: `daily`, `monthly`
- `response_status`: string **required** enum: `success`, `error`, `cached`, `all`
- `series`: object[] **required**
  [array of]
  - `count`: integer **required**
  - `day`: string **required**
- `start`: integer **required**
- `total`: integer **required**
- `tz`: string **required**
