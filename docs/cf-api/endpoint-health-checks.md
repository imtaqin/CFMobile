# Endpoint Health Checks

5 endpoints.

## GET /accounts/{account_id}/diagnostics/endpoint-healthchecks

List Endpoint Health Checks

operationId: `diagnostics-endpoint-healthcheck-list`

**Response** 200 → `result`

[array of]
- `check_type`: string **required** enum: `icmp` default: `icmp` — type of check to perform
- `endpoint`: string **required** — the IP address of the host to perform checks against
- `name`: string — Optional name associated with this check
- `id`: string — UUID.

## POST /accounts/{account_id}/diagnostics/endpoint-healthchecks

Endpoint Health Check

operationId: `diagnostics-endpoint-healthcheck-create`

**Request** (application/json)

- `check_type`: string **required** enum: `icmp` default: `icmp` — type of check to perform
- `endpoint`: string **required** — the IP address of the host to perform checks against
- `name`: string — Optional name associated with this check

**Response** 201 → `result`

- `check_type`: string **required** enum: `icmp` default: `icmp` — type of check to perform
- `endpoint`: string **required** — the IP address of the host to perform checks against
- `name`: string — Optional name associated with this check
- `id`: string — UUID.

## DELETE /accounts/{account_id}/diagnostics/endpoint-healthchecks/{id}

Delete Endpoint Health Check

operationId: `diagnostics-endpoint-healthcheck-delete`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /accounts/{account_id}/diagnostics/endpoint-healthchecks/{id}

Get Endpoint Health Check

operationId: `diagnostics-endpoint-healthcheck-get`

**Response** 200 → `result`

- `check_type`: string **required** enum: `icmp` default: `icmp` — type of check to perform
- `endpoint`: string **required** — the IP address of the host to perform checks against
- `name`: string — Optional name associated with this check
- `id`: string — UUID.

## PUT /accounts/{account_id}/diagnostics/endpoint-healthchecks/{id}

Update Endpoint Health Check

operationId: `diagnostics-endpoint-healthcheck-update`

**Request** (application/json)

- `check_type`: string **required** enum: `icmp` default: `icmp` — type of check to perform
- `endpoint`: string **required** — the IP address of the host to perform checks against
- `name`: string — Optional name associated with this check

**Response** 200 → `result`

- `check_type`: string **required** enum: `icmp` default: `icmp` — type of check to perform
- `endpoint`: string **required** — the IP address of the host to perform checks against
- `name`: string — Optional name associated with this check
- `id`: string — UUID.
