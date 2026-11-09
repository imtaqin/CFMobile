# Client-Side Security

13 endpoints.

## GET /zones/{zone_id}/page_shield

Get client-side security settings

operationId: `page-shield-get-settings`

**Response** 200 → `result`

object

## PUT /zones/{zone_id}/page_shield

Update client-side security settings

operationId: `page-shield-update-settings`

**Request** (application/json)

- `enabled`: boolean — When true, indicates that Client-Side Security is enabled.
- `use_cloudflare_reporting_endpoint`: boolean — When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report
- `use_connection_url_path`: boolean — When true, the paths associated with connections URLs will also be analyzed.

**Response** 200 → `result`

object

## GET /zones/{zone_id}/page_shield/connections

List detected connections

operationId: `page-shield-list-connections` · query: `exclude_urls`, `urls`, `hosts`, `page`, `per_page`, `order_by`, `direction`, `prioritize_malicious`, `exclude_cdn_cgi`, `status`, `page_url`, `export`

**Response** 200 → `result`

[array of]
- `added_at`: string **required**
- `domain_reported_malicious`: boolean
- `first_page_url`: string
- `first_seen_at`: string **required**
- `host`: string **required**
- `id`: string **required** — Identifier
- `last_seen_at`: string **required**
- `malicious_domain_categories`: string[]
  [array]
- `malicious_url_categories`: string[]
  [array]
- `page_urls`: string[]
  [array]
- `url`: string **required**
- `url_contains_cdn_cgi_path`: boolean **required**
- `url_reported_malicious`: boolean

## GET /zones/{zone_id}/page_shield/connections/{connection_id}

Get a detected connection

operationId: `page-shield-get-connection`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/page_shield/cookies

List detected cookies

operationId: `page-shield-list-cookies` · query: `hosts`, `page`, `per_page`, `order_by`, `direction`, `page_url`, `export`, `name`, `secure`, `http_only`, `same_site`, `type`, `path`, `domain`

**Response** 200 → `result`

[array of]
- `domain_attribute`: string
- `expires_attribute`: string
- `first_seen_at`: string **required**
- `host`: string **required**
- `http_only_attribute`: boolean
- `id`: string **required** — Identifier
- `last_seen_at`: string **required**
- `max_age_attribute`: integer
- `name`: string **required**
- `page_urls`: string[]
  [array]
- `path_attribute`: string
- `same_site_attribute`: string enum: `lax`, `strict`, `none`
- `secure_attribute`: boolean
- `type`: string **required** enum: `first_party`, `unknown`

## GET /zones/{zone_id}/page_shield/cookies/{cookie_id}

Get a detected cookie

operationId: `page-shield-get-cookie`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/page_shield/policies

List content security rules

operationId: `page-shield-list-policies`

**Response** 200 → `result`

[array of]
- `action`: string **required** enum: `allow`, `log`, `add_reporting_directives` — The action to take if the expression matches
- `description`: string **required** — A description for the policy
- `enabled`: boolean **required** — Whether the policy is enabled
- `expression`: string **required** — The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax
- `value`: string **required** — The policy which will be applied
- `id`: string **required** — Identifier

## POST /zones/{zone_id}/page_shield/policies

Create a content security rule

operationId: `page-shield-create-policy`

**Request** (application/json)

- `action`: string **required** enum: `allow`, `log`, `add_reporting_directives` — The action to take if the expression matches
- `description`: string **required** — A description for the policy
- `enabled`: boolean **required** — Whether the policy is enabled
- `expression`: string **required** — The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax
- `value`: string **required** — The policy which will be applied

**Response** 200 → `result`

object

## DELETE /zones/{zone_id}/page_shield/policies/{policy_id}

Delete a content security rule

operationId: `page-shield-delete-policy`

## GET /zones/{zone_id}/page_shield/policies/{policy_id}

Get a content security rule

operationId: `page-shield-get-policy`

**Response** 200 → `result`

object

## PUT /zones/{zone_id}/page_shield/policies/{policy_id}

Update a content security rule

operationId: `page-shield-update-policy`

**Request** (application/json)

- `action`: string enum: `allow`, `log`, `add_reporting_directives` — The action to take if the expression matches
- `description`: string — A description for the policy
- `enabled`: boolean — Whether the policy is enabled
- `expression`: string — The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax
- `value`: string — The policy which will be applied

**Response** 200 → `result`

object

## GET /zones/{zone_id}/page_shield/scripts

List detected scripts

operationId: `page-shield-list-scripts` · query: `exclude_urls`, `urls`, `hosts`, `page`, `per_page`, `order_by`, `direction`, `prioritize_malicious`, `exclude_cdn_cgi`, `exclude_duplicates`, `status`, `page_url`, `export`

**Response** 200 → `result`

[array of]
- `added_at`: string **required**
- `cryptomining_score`: integer — The cryptomining score of the JavaScript content.
- `dataflow_score`: any
- `domain_reported_malicious`: boolean
- `fetched_at`: string — The timestamp of when the script was last fetched.
- `first_page_url`: string
- `first_seen_at`: string **required**
- `hash`: string — The computed hash of the analyzed script.
- `host`: string **required**
- `id`: string **required** — Identifier
- `js_integrity_score`: integer — The integrity score of the JavaScript content.
- `last_seen_at`: string **required**
- `magecart_score`: integer — The magecart score of the JavaScript content.
- `malicious_domain_categories`: string[]
  [array]
- `malicious_url_categories`: string[]
  [array]
- `malware_score`: integer — The malware score of the JavaScript content.
- `obfuscation_score`: any
- `page_urls`: string[]
  [array]
- `url`: string **required**
- `url_contains_cdn_cgi_path`: boolean **required**
- `url_reported_malicious`: boolean

## GET /zones/{zone_id}/page_shield/scripts/{script_id}

Get a detected script

operationId: `page-shield-get-script`

**Response** 200 → `result`

object
