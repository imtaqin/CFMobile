# Scans

10 endpoints.

## GET /accounts/{account_id}/cloudforce-one/banner/{config_id}

Get the Latest Banner Grab Result

operationId: `get_GetBanners`

**Response** 200 → `result`

- `1.1.1.1`: object[] **required**
  [array of]
  - `number`: number
  - `proto`: string
  - `status`: string

## GET /accounts/{account_id}/cloudforce-one/scans/config

List Scan Configs

operationId: `get_ConfigFetch`

**Response** 200 → `result`

[array of]
- `account_id`: string **required**
- `frequency`: number **required** — Defines the number of days between each scan (0 = One-off scan).
- `id`: string **required** — Defines the Config ID.
- `ips`: string[] **required** — Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.
  [array]
- `ports`: string[] **required** — Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443
  [array]

## POST /accounts/{account_id}/cloudforce-one/scans/config

Create a new Scan Config

operationId: `post_ConfigCreate`

**Request** (application/json)

- `frequency`: number — Defines the number of days between each scan (0 = One-off scan).
- `ips`: string[] **required** — Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.
  [array]
- `ports`: string[] — Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443
  [array]

**Response** 200 → `result`

- `account_id`: string **required**
- `frequency`: number **required** — Defines the number of days between each scan (0 = One-off scan).
- `id`: string **required** — Defines the Config ID.
- `ips`: string[] **required** — Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.
  [array]
- `ports`: string[] **required** — Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443
  [array]

## DELETE /accounts/{account_id}/cloudforce-one/scans/config/{config_id}

Delete a Scan Config

operationId: `delete_DeleteScans`

**Response** 200 → `result`

object

## PATCH /accounts/{account_id}/cloudforce-one/scans/config/{config_id}

Update an existing Scan Config

operationId: `post_ConfigUpdate`

**Request** (application/json)

- `frequency`: number — Defines the number of days between each scan (0 = One-off scan).
- `ips`: string[] — Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.
  [array]
- `ports`: string[] — Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443
  [array]

**Response** 200 → `result`

- `account_id`: string **required**
- `frequency`: number **required** — Defines the number of days between each scan (0 = One-off scan).
- `id`: string **required** — Defines the Config ID.
- `ips`: string[] **required** — Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.
  [array]
- `ports`: string[] **required** — Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443
  [array]

## GET /accounts/{account_id}/cloudforce-one/scans/results/{config_id}

Get the Latest Scan Result

operationId: `get_GetOpenPorts`

**Response** 200 → `result`

- `1.1.1.1`: object[] **required**
  [array of]
  - `number`: number
  - `proto`: string
  - `status`: string

## GET /accounts/{account_id}/vuln_scanner/scans

List scans

operationId: `list-scans` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `id`: string **required** — Scan identifier.
- `report`: object — Vulnerability report produced after the scan completes. The shape depends on the scan type. Present only for finished scans.
- `scan_type`: string **required** enum: `bola` — The type of vulnerability scan.
- `status`: string **required** enum: `created`, `scheduled`, `planning`, `running`, `finished`, `failed` — Current lifecycle status of the scan.
- `target_environment_id`: string **required** — The target environment this scan runs against.

## POST /accounts/{account_id}/vuln_scanner/scans

Create scan

operationId: `create-scan`

**Request** (application/json)

(one of 1 variants; showing the first)
- `credential_sets`: object **required** — Credential set references for a BOLA scan. The scanner uses the
  - `attacker`: string **required** — Credential set ID for the attacker.
  - `owner`: string **required** — Credential set ID for the resource owner.
- `open_api`: string **required** — OpenAPI schema definition for the API under test. The scanner
- `scan_type`: string **required** enum: `bola`
- `target_environment_id`: string **required** — The target environment to scan.

**Response** 200 → `result`

- `id`: string **required** — Scan identifier.
- `report`: object — Vulnerability report produced after the scan completes. The shape depends on the scan type. Present only for finished scans.
- `scan_type`: string **required** enum: `bola` — The type of vulnerability scan.
- `status`: string **required** enum: `created`, `scheduled`, `planning`, `running`, `finished`, `failed` — Current lifecycle status of the scan.
- `target_environment_id`: string **required** — The target environment this scan runs against.

## DELETE /accounts/{account_id}/vuln_scanner/scans/{scan_id}

Delete scan

operationId: `delete-scan`

**Response** 200 → `result`

- `id`: string **required** — ID of the deleted scan.

## GET /accounts/{account_id}/vuln_scanner/scans/{scan_id}

Get scan

operationId: `get-scan`

**Response** 200 → `result`

- `id`: string **required** — Scan identifier.
- `report`: object — Vulnerability report produced after the scan completes. The shape depends on the scan type. Present only for finished scans.
- `scan_type`: string **required** enum: `bola` — The type of vulnerability scan.
- `status`: string **required** enum: `created`, `scheduled`, `planning`, `running`, `finished`, `failed` — Current lifecycle status of the scan.
- `target_environment_id`: string **required** — The target environment this scan runs against.
