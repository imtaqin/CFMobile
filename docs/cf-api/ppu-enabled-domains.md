# ppu_enabled_domains

1 endpoints.

## GET /accounts/{account_id}/pay-per-use/enabled-domains

List enabled Pay Per Use domains

operationId: `pay-per-use.listEnabledDomains` · query: `cursor`, `per_page`

**Response** 200 → `result`

- `cursor`: string **required** — Opaque, account-bound cursor for the next page. It expires after one hour and is null on the final page.
- `domains`: object[] **required**
  [array of]
  - `domain`: string **required**
  - `license_expires_at`: string **required** — Earlier non-null exclusive expiration from the accepted price agreement and publisher zone lifecycles, or null when neither expires
  - `license_status`: string **required** enum: `active`, `expired` — Whether the selected accepted price agreement is currently active or retained after expiration
  - `non_billable_since`: string **required** — When the publisher zone was classified for local-only, non-billable settlement. Null for billable zones.
  - `price_usd_microcents`: integer **required** — Price of the selected accepted agreement in microcents. For an active license this is the price currently in effect; for an expired license 
