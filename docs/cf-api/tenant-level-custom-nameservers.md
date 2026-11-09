# Tenant-Level Custom Nameservers

3 endpoints.

## GET /tenants/{tenant_id}/custom_ns

List Tenant Custom Nameservers

operationId: `tenant-level-custom-nameservers-list-tenant-custom-nameservers`

**Response** 200 → `result`

[array of]
- `dns_records`: object[] **required** — A and AAAA records associated with the nameserver.
  [array of]
  - `type`: string enum: `A`, `AAAA` — DNS record type.
  - `value`: string — DNS record contents (an IPv4 or IPv6 address).
- `ns_name`: string **required** — The FQDN of the name server.
- `ns_set`: number default: `1` — The number of the set that this name server belongs to.
- `status`: string **required** enum: `moved`, `pending`, `verified` — Verification status of the nameserver.
- `zone_tag`: string **required** — Identifier.

## POST /tenants/{tenant_id}/custom_ns

Add Tenant Custom Nameserver

operationId: `tenant-level-custom-nameservers-add-tenant-custom-nameserver`

**Request** (application/json)

- `ns_name`: string **required** — The FQDN of the name server.
- `ns_set`: number default: `1` — The number of the set that this name server belongs to.

**Response** 200 → `result`

- `dns_records`: object[] **required** — A and AAAA records associated with the nameserver.
  [array of]
  - `type`: string enum: `A`, `AAAA` — DNS record type.
  - `value`: string — DNS record contents (an IPv4 or IPv6 address).
- `ns_name`: string **required** — The FQDN of the name server.
- `ns_set`: number default: `1` — The number of the set that this name server belongs to.
- `status`: string **required** enum: `moved`, `pending`, `verified` — Verification status of the nameserver.
- `zone_tag`: string **required** — Identifier.

## DELETE /tenants/{tenant_id}/custom_ns/{custom_ns_id}

Delete Tenant Custom Nameserver

operationId: `tenant-level-custom-nameservers-delete-tenant-custom-nameserver`

**Response** 200 → `result`

[array of]
string
