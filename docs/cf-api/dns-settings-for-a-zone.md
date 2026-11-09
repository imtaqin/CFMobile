# DNS Settings for a Zone

2 endpoints.

## GET /zones/{zone_id}/dns_settings

Show DNS Settings

operationId: `dns-settings-for-a-zone-list-dns-settings`

**Response** 200 → `result`

- `flatten_all_cnames`: boolean — Whether to flatten all CNAME records in the zone. Note that, due to DNS limitations, a CNAME record at the zone apex will always be flattene
- `internal_dns`: object — Settings for this internal zone.
  - `reference_zone_id`: string — The ID of the zone to fallback to.
- `multi_provider`: boolean — Whether to enable multi-provider DNS, which causes Cloudflare to activate the zone even when non-Cloudflare NS records exist, and to respect
- `ns_ttl`: number — The time to live (TTL) of the zone's nameserver (NS) records.
- `secondary_overrides`: boolean — Allows a Secondary DNS zone to use (proxied) override records and CNAME flattening at the zone apex.
- `soa`: object — Components of the zone's SOA record.
  - `expire`: number — Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.
  - `min_ttl`: number — The time to live (TTL) for negative caching of records within the zone.
  - `mname`: string — The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.
  - `refresh`: number — Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.
  - `retry`: number — Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.
  - `rname`: string — The email address of the zone administrator, with the first label representing the local part of the email address.
  - `ttl`: number — The time to live (TTL) of the SOA record itself.
- `zone_mode`: string enum: `standard`, `cdn_only`, `dns_only` — Whether the zone mode is a regular or CDN/DNS only zone.
- `internal_dns`: object **required**
- `soa`: object **required**
- `nameservers`: object **required** — Controls the nameservers through which the zone is available.

## PATCH /zones/{zone_id}/dns_settings

Update DNS Settings

operationId: `dns-settings-for-a-zone-update-dns-settings`

**Request** (application/json)

- `flatten_all_cnames`: boolean — Whether to flatten all CNAME records in the zone. Note that, due to DNS limitations, a CNAME record at the zone apex will always be flattene
- `internal_dns`: object — Settings for this internal zone.
  - `reference_zone_id`: string — The ID of the zone to fallback to.
- `multi_provider`: boolean — Whether to enable multi-provider DNS, which causes Cloudflare to activate the zone even when non-Cloudflare NS records exist, and to respect
- `ns_ttl`: number — The time to live (TTL) of the zone's nameserver (NS) records.
- `secondary_overrides`: boolean — Allows a Secondary DNS zone to use (proxied) override records and CNAME flattening at the zone apex.
- `soa`: object — Components of the zone's SOA record.
  - `expire`: number — Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.
  - `min_ttl`: number — The time to live (TTL) for negative caching of records within the zone.
  - `mname`: string — The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.
  - `refresh`: number — Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.
  - `retry`: number — Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.
  - `rname`: string — The email address of the zone administrator, with the first label representing the local part of the email address.
  - `ttl`: number — The time to live (TTL) of the SOA record itself.
- `zone_mode`: string enum: `standard`, `cdn_only`, `dns_only` — Whether the zone mode is a regular or CDN/DNS only zone.
- `nameservers`: any

**Response** 200 → `result`

- `flatten_all_cnames`: boolean — Whether to flatten all CNAME records in the zone. Note that, due to DNS limitations, a CNAME record at the zone apex will always be flattene
- `internal_dns`: object — Settings for this internal zone.
  - `reference_zone_id`: string — The ID of the zone to fallback to.
- `multi_provider`: boolean — Whether to enable multi-provider DNS, which causes Cloudflare to activate the zone even when non-Cloudflare NS records exist, and to respect
- `ns_ttl`: number — The time to live (TTL) of the zone's nameserver (NS) records.
- `secondary_overrides`: boolean — Allows a Secondary DNS zone to use (proxied) override records and CNAME flattening at the zone apex.
- `soa`: object — Components of the zone's SOA record.
  - `expire`: number — Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.
  - `min_ttl`: number — The time to live (TTL) for negative caching of records within the zone.
  - `mname`: string — The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.
  - `refresh`: number — Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.
  - `retry`: number — Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.
  - `rname`: string — The email address of the zone administrator, with the first label representing the local part of the email address.
  - `ttl`: number — The time to live (TTL) of the SOA record itself.
- `zone_mode`: string enum: `standard`, `cdn_only`, `dns_only` — Whether the zone mode is a regular or CDN/DNS only zone.
- `internal_dns`: object **required**
- `soa`: object **required**
- `nameservers`: object **required** — Controls the nameservers through which the zone is available.
