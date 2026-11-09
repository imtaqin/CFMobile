# Domains

4 endpoints.

## GET /accounts/{account_id}/workers/domains

List Worker Domains

operationId: `workers.domains.list` · query: `zone_id`, `zone_name`, `service`, `hostname`, `environment`, `previews_enabled`, `enabled`

**Response** 200 → `result`

[array of]
- `cert_id`: string **required** — ID of the TLS certificate issued for the domain.
- `enabled`: boolean **required** default: `true` — Whether the configured hostname is routable for the domain. If disabled, then requests to the configured hostname will not be routed to the 
- `environment`: string **required** — Worker environment associated with the domain.
- `hostname`: string **required** — Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured W
- `id`: string **required** — Immutable ID of the domain.
- `previews_enabled`: boolean **required** default: `false` — Whether previews are routable for the domain. If enabled, previews will be routable as subdomains of the configured hostname. For example, i
- `service`: string **required** — Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.
- `zone_id`: string **required** — ID of the zone containing the domain hostname.
- `zone_name`: string **required** — Name of the zone containing the domain hostname.

## PUT /accounts/{account_id}/workers/domains

Attach Worker Domain

operationId: `workers.domains.update`

**Request** (application/json)

- `cert_id`: string **required** — ID of the TLS certificate issued for the domain.
- `enabled`: boolean **required** default: `true` — Whether the configured hostname is routable for the domain. If disabled, then requests to the configured hostname will not be routed to the 
- `environment`: string **required** — Worker environment associated with the domain.
- `hostname`: string **required** — Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured W
- `id`: string **required** — Immutable ID of the domain.
- `previews_enabled`: boolean **required** default: `false` — Whether previews are routable for the domain. If enabled, previews will be routable as subdomains of the configured hostname. For example, i
- `service`: string **required** — Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.
- `zone_id`: string **required** — ID of the zone containing the domain hostname.
- `zone_name`: string **required** — Name of the zone containing the domain hostname.
object

**Response** 200 → `result`

- `cert_id`: string **required** — ID of the TLS certificate issued for the domain.
- `enabled`: boolean **required** default: `true` — Whether the configured hostname is routable for the domain. If disabled, then requests to the configured hostname will not be routed to the 
- `environment`: string **required** — Worker environment associated with the domain.
- `hostname`: string **required** — Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured W
- `id`: string **required** — Immutable ID of the domain.
- `previews_enabled`: boolean **required** default: `false` — Whether previews are routable for the domain. If enabled, previews will be routable as subdomains of the configured hostname. For example, i
- `service`: string **required** — Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.
- `zone_id`: string **required** — ID of the zone containing the domain hostname.
- `zone_name`: string **required** — Name of the zone containing the domain hostname.

## DELETE /accounts/{account_id}/workers/domains/{domain_id}

Detach Worker Domain

operationId: `workers.domains.delete`

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

## GET /accounts/{account_id}/workers/domains/{domain_id}

Get Worker Domain

operationId: `workers.domains.get`

**Response** 200 → `result`

- `cert_id`: string **required** — ID of the TLS certificate issued for the domain.
- `enabled`: boolean **required** default: `true` — Whether the configured hostname is routable for the domain. If disabled, then requests to the configured hostname will not be routed to the 
- `environment`: string **required** — Worker environment associated with the domain.
- `hostname`: string **required** — Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured W
- `id`: string **required** — Immutable ID of the domain.
- `previews_enabled`: boolean **required** default: `false` — Whether previews are routable for the domain. If enabled, previews will be routable as subdomains of the configured hostname. For example, i
- `service`: string **required** — Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.
- `zone_id`: string **required** — ID of the zone containing the domain hostname.
- `zone_name`: string **required** — Name of the zone containing the domain hostname.
