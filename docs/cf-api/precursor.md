# Precursor

2 endpoints.

## GET /zones/{zone_id}/precursor

Get Zone Precursor Config

operationId: `precursor-for-a-zone-get-config`

**Response** 200 → `result`

- `mode`: any
- `rules`: object[] — The ordered list of Precursor rules for the zone.
  [array of]
  - `description`: string default: `` — An informative description of the rule.
  - `enabled`: boolean default: `true` — Whether the rule is active.
  - `expression`: string **required** — The filter expression that determines which requests the rule matches.
  - `id`: string — The read-only identifier that Cloudflare assigns to the rule.
  - `show_interstitial`: boolean **required** — Whether Precursor shows an interstitial when it takes action on a
- `show_interstitial`: boolean — Whether Precursor shows an interstitial when it takes action on a

## PUT /zones/{zone_id}/precursor

Update Zone Precursor Config

operationId: `precursor-for-a-zone-update-config`

**Request** (application/json)

- `mode`: any
- `rules`: object[] — The ordered list of Precursor rules for the zone.
  [array of]
  - `description`: string default: `` — An informative description of the rule.
  - `enabled`: boolean default: `true` — Whether the rule is active.
  - `expression`: string **required** — The filter expression that determines which requests the rule matches.
  - `id`: string — The read-only identifier that Cloudflare assigns to the rule.
  - `show_interstitial`: boolean **required** — Whether Precursor shows an interstitial when it takes action on a
- `show_interstitial`: boolean — Whether Precursor shows an interstitial when it takes action on a

**Response** 200 → `result`

- `mode`: any
- `rules`: object[] — The ordered list of Precursor rules for the zone.
  [array of]
  - `description`: string default: `` — An informative description of the rule.
  - `enabled`: boolean default: `true` — Whether the rule is active.
  - `expression`: string **required** — The filter expression that determines which requests the rule matches.
  - `id`: string — The read-only identifier that Cloudflare assigns to the rule.
  - `show_interstitial`: boolean **required** — Whether Precursor shows an interstitial when it takes action on a
- `show_interstitial`: boolean — Whether Precursor shows an interstitial when it takes action on a
