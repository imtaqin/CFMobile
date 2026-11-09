# Domain Intelligence

2 endpoints.

## GET /accounts/{account_id}/intel/domain

Get Domain Details

operationId: `domain-intelligence-get-domain-details` · query: `domain`, `skip_dns`, `skip_ranking`

**Response** 200 → `result`

- `additional_information`: object — Additional information related to the host name.
  - `suspected_malware_family`: string — Suspected DGA malware family.
- `application`: object — Application that the hostname belongs to.
  - `id`: integer
  - `name`: string
- `content_categories`: object[]
  [array of]
  - `id`: integer
  - `name`: string
  - `super_category_id`: integer
- `domain`: string
- `inherited_content_categories`: object[]
  [array of]
  - `id`: integer
  - `name`: string
  - `super_category_id`: integer
- `inherited_from`: string — Domain from which `inherited_content_categories` and `inherited_risk_types` are inherited, if applicable.
- `inherited_risk_types`: object[]
  [array of]
  - `id`: integer
  - `name`: string
  - `super_category_id`: integer
- `popularity_rank`: integer — Global Cloudflare 100k ranking for the last 30 days, if available for the hostname. The top ranked domain is 1, the lowest ranked domain is 
- `resolves_to_refs`: object[] — Specifies a list of references to one or more IP addresses or domain names that the domain name currently resolves to.
  [array of]
  - `id`: string — STIX 2.1 identifier: https://docs.oasis-open.org/cti/stix/v2.1/cs02/stix-v2.1-cs02.html#_64yvzeku5a5c.
  - `value`: string — IP address or domain name.
- `risk_score`: number — Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk).
- `risk_types`: object[]
  [array of]
  - `id`: integer
  - `name`: string
  - `super_category_id`: integer

## GET /accounts/{account_id}/intel/domain/bulk

Get Multiple Domain Details

operationId: `domain-intelligence-get-multiple-domain-details` · query: `domain`, `include_ranking`, `skip_dns`, `skip_ranking`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
