# Zero Trust Gateway DNS destination IPv4 address pairs

1 endpoints.

## GET /accounts/{account_id}/gateway/dns_destination_ips

List Zero Trust Gateway DNS destination IPv4 address pairs

operationId: `zero-trust-dns-destination-ips-list-dns-destination-ips`

**Response** 200 → `result`

[array of]
- `backup_ip`: string **required**
- `id`: string **required**
- `pair_type`: string **required** enum: `shared`, `dedicated`, `byoip` — Specify whether the pair shared across multiple accounts (shared) or available exclusively to this account. Non-shared pairs can contain Clo
- `primary_ip`: string **required**
