# Monetization

10 endpoints.

## GET /accounts/{account_id}/monetization

Get account monetization eligibility

operationId: `monetization-get-account-eligibility`

**Response** 200 → `result`

- `reasons`: string[] — Public, human-readable reasons for a rejected decision, when available.
  [array]
- `status`: string **required** enum: `pending`, `approved`, `rejected` — Current monetization eligibility decision.

## POST /accounts/{account_id}/monetization

Check account monetization eligibility

operationId: `monetization-check-account-eligibility`

**Request** (application/json)

- `acceptedTermsOfService`: boolean **required** enum: `true` — Confirms acceptance of the Monetization Gateway terms of service.

**Response** 200 → `result`

- `reasons`: string[] — Public, human-readable reasons for a rejected decision, when available.
  [array]
- `status`: string **required** enum: `pending`, `approved`, `rejected` — Current monetization eligibility decision.

## GET /zones/{zone_id}/monetization

Get zone monetization eligibility

operationId: `monetization-get-zone-eligibility`

**Response** 200 → `result`

- `reasons`: string[] — Public, human-readable reasons for a rejected decision, when available.
  [array]
- `status`: string **required** enum: `pending`, `approved`, `rejected` — Current monetization eligibility decision.

## POST /zones/{zone_id}/monetization

Check zone monetization eligibility

operationId: `monetization-check-zone-eligibility`

**Response** 200 → `result`

- `reasons`: string[] — Public, human-readable reasons for a rejected decision, when available.
  [array]
- `status`: string **required** enum: `pending`, `approved`, `rejected` — Current monetization eligibility decision.
- `enabled`: boolean **required** — Whether this check successfully enabled the zone entitlement. Only approved decisions can enable it.

## DELETE /zones/{zone_id}/monetization/rules

Delete all payment rules

operationId: `monetization-delete-ruleset`

**Response** 200 → `result`

- `rules`: object[] **required** — The zone's payment rules, in the order they are evaluated. Empty when the zone has no payment rules.
  [array of]
  - `address`: string **required** — 0x-prefixed 20-byte hexadecimal Ethereum address. Mixed-case addresses must carry a valid EIP-55 checksum; all-lowercase or all-uppercase ad
  - `description`: string
  - `enabled`: boolean default: `true`
  - `expression`: string **required** — Wirefilter expression identifying the requests that require payment. Forwarded verbatim to the Rulesets API, which validates its syntax.
  - `id`: any — Optional on input. Include the ID of an existing payment rule to update it in place, preserving its stable identity across the full-ruleset 
  - `price`: string **required** — Price in the smallest indivisible unit of the configured payment token, encoded as a decimal string. Must be a canonical decimal integer in 
  - `scheme`: string **required** enum: `exact`, `upto` — X402 payment scheme. "exact" requires the specified payment amount; "upto" permits a payment up to the specified amount. Both fixed-price sc
  - `id`: any **required** — The server-assigned unique ID of the payment rule. Stable across full-ruleset replacements.

## GET /zones/{zone_id}/monetization/rules

List payment rules

operationId: `monetization-list-rules`

**Response** 200 → `result`

- `rules`: object[] **required** — The zone's payment rules, in the order they are evaluated. Empty when the zone has no payment rules.
  [array of]
  - `address`: string **required** — 0x-prefixed 20-byte hexadecimal Ethereum address. Mixed-case addresses must carry a valid EIP-55 checksum; all-lowercase or all-uppercase ad
  - `description`: string
  - `enabled`: boolean default: `true`
  - `expression`: string **required** — Wirefilter expression identifying the requests that require payment. Forwarded verbatim to the Rulesets API, which validates its syntax.
  - `id`: any — Optional on input. Include the ID of an existing payment rule to update it in place, preserving its stable identity across the full-ruleset 
  - `price`: string **required** — Price in the smallest indivisible unit of the configured payment token, encoded as a decimal string. Must be a canonical decimal integer in 
  - `scheme`: string **required** enum: `exact`, `upto` — X402 payment scheme. "exact" requires the specified payment amount; "upto" permits a payment up to the specified amount. Both fixed-price sc
  - `id`: any **required** — The server-assigned unique ID of the payment rule. Stable across full-ruleset replacements.

## PUT /zones/{zone_id}/monetization/rules

Deploy payment ruleset

operationId: `monetization-deploy-ruleset`

**Request** (application/json)

- `rules`: object[] **required** — Full desired Payment Required ruleset. An empty array clears all payment rules. The ruleset may contain at most 40 unique wallet addresses; 
  [array of]
  - `address`: string **required** — 0x-prefixed 20-byte hexadecimal Ethereum address. Mixed-case addresses must carry a valid EIP-55 checksum; all-lowercase or all-uppercase ad
  - `description`: string
  - `enabled`: boolean default: `true`
  - `expression`: string **required** — Wirefilter expression identifying the requests that require payment. Forwarded verbatim to the Rulesets API, which validates its syntax.
  - `id`: any — Optional on input. Include the ID of an existing payment rule to update it in place, preserving its stable identity across the full-ruleset 
  - `price`: string **required** — Price in the smallest indivisible unit of the configured payment token, encoded as a decimal string. Must be a canonical decimal integer in 
  - `scheme`: string **required** enum: `exact`, `upto` — X402 payment scheme. "exact" requires the specified payment amount; "upto" permits a payment up to the specified amount. Both fixed-price sc

**Response** 200 → `result`

- `rules`: object[] **required** — The zone's payment rules, in the order they are evaluated. Empty when the zone has no payment rules.
  [array of]
  - `address`: string **required** — 0x-prefixed 20-byte hexadecimal Ethereum address. Mixed-case addresses must carry a valid EIP-55 checksum; all-lowercase or all-uppercase ad
  - `description`: string
  - `enabled`: boolean default: `true`
  - `expression`: string **required** — Wirefilter expression identifying the requests that require payment. Forwarded verbatim to the Rulesets API, which validates its syntax.
  - `id`: any — Optional on input. Include the ID of an existing payment rule to update it in place, preserving its stable identity across the full-ruleset 
  - `price`: string **required** — Price in the smallest indivisible unit of the configured payment token, encoded as a decimal string. Must be a canonical decimal integer in 
  - `scheme`: string **required** enum: `exact`, `upto` — X402 payment scheme. "exact" requires the specified payment amount; "upto" permits a payment up to the specified amount. Both fixed-price sc
  - `id`: any **required** — The server-assigned unique ID of the payment rule. Stable across full-ruleset replacements.

## DELETE /zones/{zone_id}/monetization/rules/{rule_id}

Delete a payment rule

operationId: `monetization-delete-rule`

**Response** 200 → `result`

- `rules`: object[] **required** — The zone's payment rules, in the order they are evaluated. Empty when the zone has no payment rules.
  [array of]
  - `address`: string **required** — 0x-prefixed 20-byte hexadecimal Ethereum address. Mixed-case addresses must carry a valid EIP-55 checksum; all-lowercase or all-uppercase ad
  - `description`: string
  - `enabled`: boolean default: `true`
  - `expression`: string **required** — Wirefilter expression identifying the requests that require payment. Forwarded verbatim to the Rulesets API, which validates its syntax.
  - `id`: any — Optional on input. Include the ID of an existing payment rule to update it in place, preserving its stable identity across the full-ruleset 
  - `price`: string **required** — Price in the smallest indivisible unit of the configured payment token, encoded as a decimal string. Must be a canonical decimal integer in 
  - `scheme`: string **required** enum: `exact`, `upto` — X402 payment scheme. "exact" requires the specified payment amount; "upto" permits a payment up to the specified amount. Both fixed-price sc
  - `id`: any **required** — The server-assigned unique ID of the payment rule. Stable across full-ruleset replacements.

## GET /zones/{zone_id}/monetization/rules/{rule_id}

Get a payment rule

operationId: `monetization-get-rule`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `address`: string **required** — 0x-prefixed 20-byte hexadecimal Ethereum address. Mixed-case addresses must carry a valid EIP-55 checksum; all-lowercase or all-uppercase ad
- `description`: string
- `enabled`: boolean default: `true`
- `expression`: string **required** — Wirefilter expression identifying the requests that require payment. Forwarded verbatim to the Rulesets API, which validates its syntax.
- `id`: any — Optional on input. Include the ID of an existing payment rule to update it in place, preserving its stable identity across the full-ruleset 
- `price`: string **required** — Price in the smallest indivisible unit of the configured payment token, encoded as a decimal string. Must be a canonical decimal integer in 
- `scheme`: string **required** enum: `exact`, `upto` — X402 payment scheme. "exact" requires the specified payment amount; "upto" permits a payment up to the specified amount. Both fixed-price sc
- `id`: any **required** — The server-assigned unique ID of the payment rule. Stable across full-ruleset replacements.

## PATCH /zones/{zone_id}/monetization/rules/{rule_id}

Update a payment rule

operationId: `monetization-patch-rule`

**Request** (application/json)

- `address`: string — 0x-prefixed 20-byte hexadecimal Ethereum address. Mixed-case addresses must carry a valid EIP-55 checksum; all-lowercase or all-uppercase ad
- `description`: string
- `enabled`: boolean
- `expression`: string — Wirefilter expression identifying the requests that require payment. Forwarded verbatim to the Rulesets API, which validates its syntax.
- `price`: string — Price in the smallest indivisible unit of the configured payment token, encoded as a decimal string. Must be a canonical decimal integer in 
- `scheme`: string enum: `exact`, `upto`, `origin_controlled` — X402 payment scheme. "exact" requires the specified payment amount; "upto" permits a payment up to the specified amount; "origin_controlled"

**Response** 200 → `result`

- `rules`: object[] **required** — The zone's payment rules, in the order they are evaluated. Empty when the zone has no payment rules.
  [array of]
  - `address`: string **required** — 0x-prefixed 20-byte hexadecimal Ethereum address. Mixed-case addresses must carry a valid EIP-55 checksum; all-lowercase or all-uppercase ad
  - `description`: string
  - `enabled`: boolean default: `true`
  - `expression`: string **required** — Wirefilter expression identifying the requests that require payment. Forwarded verbatim to the Rulesets API, which validates its syntax.
  - `id`: any — Optional on input. Include the ID of an existing payment rule to update it in place, preserving its stable identity across the full-ruleset 
  - `price`: string **required** — Price in the smallest indivisible unit of the configured payment token, encoded as a decimal string. Must be a canonical decimal integer in 
  - `scheme`: string **required** enum: `exact`, `upto` — X402 payment scheme. "exact" requires the specified payment amount; "upto" permits a payment up to the specified amount. Both fixed-price sc
  - `id`: any **required** — The server-assigned unique ID of the payment rule. Stable across full-ruleset replacements.
