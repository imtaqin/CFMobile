# Public - Credential Monitor

4 endpoints.

## GET /accounts/{account_id}/cloudforce-one/v2/credential-monitor/domains

List monitored domains

operationId: `get_DomainList` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `domain`: string **required**
- `id`: integer **required**

## POST /accounts/{account_id}/cloudforce-one/v2/credential-monitor/domains

Create monitored domain

operationId: `post_DomainCreate`

**Request** (application/json)

- `domain`: string **required** — Domain to monitor (e.g. my-company.com)

**Response** 201 → `result`

- `domain`: string **required**
- `id`: integer **required**

## DELETE /accounts/{account_id}/cloudforce-one/v2/credential-monitor/domains/{id}

Delete monitored domain

operationId: `delete_DomainDelete`

**Response** 200 → `result`

- `deleted`: boolean **required** enum: `true`
- `domain`: string **required**
- `id`: integer **required**

## GET /accounts/{account_id}/cloudforce-one/v2/credential-monitor/matches

List credential matches

operationId: `get_MatchList` · query: `domain`, `username`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `domain`: string **required**
- `id`: integer **required**
- `matched_at`: string **required**
- `username`: string **required**
