# Domain Discovery

5 endpoints.

## POST /accounts/{account_id}/registrar-sandbox/domain-check

Check domain availability

operationId: `sandbox-registrar-domain-discovery-check`

**Request** (application/json)

- `domains`: string[] **required** — List of fully qualified domain names (FQDNs) to check for availability. Each domain must include the extension.
  [array]

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar-sandbox/domain-search

Search for available domains

operationId: `sandbox-registrar-domain-discovery-search` · query: `q`, `extensions`, `limit`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/registrar/domain-check

Check domain availability

operationId: `registrar-domain-discovery-check`

**Request** (application/json)

- `domains`: string[] **required** — List of fully qualified domain names (FQDNs) to check for availability. Each domain must include the extension.
  [array]

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar/domain-search

Search for available domains

operationId: `registrar-domain-discovery-search` · query: `q`, `extensions`, `limit`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/registrar/domain-transfer-check

Check domain transfer eligibility

operationId: `registrar-domain-discovery-transfer-check`

**Request** (application/json)

- `domains`: object[] **required** — List of domain objects to evaluate for transfer eligibility.
  [array of]
  - `auth_code`: string — Base64-encoded auth/EPP code from the current registrar.
  - `domain_name`: string **required** — Fully qualified domain name (FQDN) to check for transfer eligibility.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
