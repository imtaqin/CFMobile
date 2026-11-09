# Email Sending subdomains

10 endpoints.

## GET /zones/{zone_id}/email/sending/subdomains

List sending subdomains

operationId: `email-sending-subdomains-list-sending-subdomains`

**Response** 200 → `result`

[array of]
- `created`: string — The date and time the destination address has been created.
- `dkim_selector`: string — The DKIM selector used for email signing. Wildcard rows publish the selector and sign with `d=<base>`.
- `drop_suppressed_recipients`: boolean — Whether a send request that includes a recipient suppressed on
- `enabled`: boolean **required** — Whether Email Sending is enabled on this subdomain.
- `modified`: string — The date and time the destination address was last modified.
- `name`: string **required** — The exact domain name or a leftmost wildcard such as `*.example.com`.
- `preview_enabled`: boolean — Whether sent messages from this subdomain can be previewed in the activity log.
- `return_path_domain`: string — The return-path domain used for bounce handling. Wildcard rows use `cf-bounce.<base>`.
- `tag`: string **required** — Sending subdomain identifier.

## POST /zones/{zone_id}/email/sending/subdomains

Create a sending subdomain

operationId: `email-sending-subdomains-create-sending-subdomain`

**Request** (application/json)

- `name`: string **required** — The domain name within the zone. A wildcard is allowed only as the complete leftmost label (`*.example.com`) and requires the account wildca

**Response** 200 → `result`

- `created`: string — The date and time the destination address has been created.
- `dkim_selector`: string — The DKIM selector used for email signing. Wildcard rows publish the selector and sign with `d=<base>`.
- `drop_suppressed_recipients`: boolean — Whether a send request that includes a recipient suppressed on
- `enabled`: boolean **required** — Whether Email Sending is enabled on this subdomain.
- `modified`: string — The date and time the destination address was last modified.
- `name`: string **required** — The exact domain name or a leftmost wildcard such as `*.example.com`.
- `preview_enabled`: boolean — Whether sent messages from this subdomain can be previewed in the activity log.
- `return_path_domain`: string — The return-path domain used for bounce handling. Wildcard rows use `cf-bounce.<base>`.
- `tag`: string **required** — Sending subdomain identifier.

## DELETE /zones/{zone_id}/email/sending/subdomains/{subdomain_id}

Delete a sending subdomain

operationId: `email-sending-subdomains-delete-sending-subdomain`

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

## GET /zones/{zone_id}/email/sending/subdomains/{subdomain_id}

Get a sending subdomain

operationId: `email-sending-subdomains-get-sending-subdomain`

**Response** 200 → `result`

- `created`: string — The date and time the destination address has been created.
- `dkim_selector`: string — The DKIM selector used for email signing. Wildcard rows publish the selector and sign with `d=<base>`.
- `drop_suppressed_recipients`: boolean — Whether a send request that includes a recipient suppressed on
- `enabled`: boolean **required** — Whether Email Sending is enabled on this subdomain.
- `modified`: string — The date and time the destination address was last modified.
- `name`: string **required** — The exact domain name or a leftmost wildcard such as `*.example.com`.
- `preview_enabled`: boolean — Whether sent messages from this subdomain can be previewed in the activity log.
- `return_path_domain`: string — The return-path domain used for bounce handling. Wildcard rows use `cf-bounce.<base>`.
- `tag`: string **required** — Sending subdomain identifier.

## PATCH /zones/{zone_id}/email/sending/subdomains/{subdomain_id}

Update a sending subdomain

operationId: `email-sending-subdomains-update-sending-subdomain`

**Request** (application/json)

(one of 2 variants; showing the first)
object

**Response** 200 → `result`

- `created`: string — The date and time the destination address has been created.
- `dkim_selector`: string — The DKIM selector used for email signing. Wildcard rows publish the selector and sign with `d=<base>`.
- `drop_suppressed_recipients`: boolean — Whether a send request that includes a recipient suppressed on
- `enabled`: boolean **required** — Whether Email Sending is enabled on this subdomain.
- `modified`: string — The date and time the destination address was last modified.
- `name`: string **required** — The exact domain name or a leftmost wildcard such as `*.example.com`.
- `preview_enabled`: boolean — Whether sent messages from this subdomain can be previewed in the activity log.
- `return_path_domain`: string — The return-path domain used for bounce handling. Wildcard rows use `cf-bounce.<base>`.
- `tag`: string **required** — Sending subdomain identifier.

## GET /zones/{zone_id}/email/sending/subdomains/{subdomain_id}/dns

Get sending subdomain DNS records

operationId: `email-sending-subdomains-get-sending-subdomain-dns`

**Response** 200 → `result`

[array of]
- `content`: string — DNS record content.
- `name`: string — DNS record name (or @ for the zone apex).
- `priority`: number — Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.
- `ttl`: number — Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.
- `type`: string enum: `A`, `AAAA`, `CNAME`, `HTTPS`, `TXT`, `SRV`, `LOC`, `MX` — DNS record type.

## POST /zones/{zone_id}/email/sending/subdomains/{subdomain_id}/dns

Fix sending subdomain DNS records

operationId: `email-sending-subdomains-fix-sending-subdomain-dns`

**Response** 200 → `result`

- `errors`: object[] — DNS issues detected against the current zone state.
  [array of]
  - `code`: string **required** enum: `mx.missing`, `mx.foreign`, `spf.missing`, `spf.foreign`, `spf.multiple`, `dkim.missing`, `dkim.conflict`, `dmarc.missing` — Error code identifying the type of issue. `dkim.conflict` is
  - `conflicting_subdomain`: string — The enabled sending-subdomain row that conflicts with the requested name.
  - `existing`: any — The conflicting DNS record found in the zone.
  - `missing`: any — The DNS record that must be added to resolve this error.
  - `multiple`: object[] — Multiple conflicting DNS records found, for example more than one SPF or DMARC TXT record.
    [array of]
    - `content`: string — DNS record content.
    - `name`: string — DNS record name (or @ for the zone apex).
    - `priority`: number — Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.
    - `ttl`: number — Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.
    - `type`: string enum: `A`, `AAAA`, `CNAME`, `HTTPS`, `TXT`, `SRV`, `LOC`, `MX` — DNS record type.
- `records`: object[] — Desired DNS records for the subdomain.
  [array of]
  - `content`: string — DNS record content.
  - `name`: string — DNS record name (or @ for the zone apex).
  - `priority`: number — Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.
  - `ttl`: number — Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.
  - `type`: string enum: `A`, `AAAA`, `CNAME`, `HTTPS`, `TXT`, `SRV`, `LOC`, `MX` — DNS record type.
- `status`: string enum: `ready`, `unconfigured`, `unlocked`, `misconfigured` — Aggregated DNS state for the subdomain. `unlocked` means desired records exist with correct content but at least one has had its email_routi

## GET /zones/{zone_id}/email/sending/subdomains/{subdomain_id}/dns/status

Get sending subdomain DNS status

operationId: `email-sending-subdomains-get-sending-subdomain-dns-status`

**Response** 200 → `result`

- `errors`: object[] — DNS issues detected against the current zone state.
  [array of]
  - `code`: string **required** enum: `mx.missing`, `mx.foreign`, `spf.missing`, `spf.foreign`, `spf.multiple`, `dkim.missing`, `dkim.conflict`, `dmarc.missing` — Error code identifying the type of issue. `dkim.conflict` is
  - `conflicting_subdomain`: string — The enabled sending-subdomain row that conflicts with the requested name.
  - `existing`: any — The conflicting DNS record found in the zone.
  - `missing`: any — The DNS record that must be added to resolve this error.
  - `multiple`: object[] — Multiple conflicting DNS records found, for example more than one SPF or DMARC TXT record.
    [array of]
    - `content`: string — DNS record content.
    - `name`: string — DNS record name (or @ for the zone apex).
    - `priority`: number — Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.
    - `ttl`: number — Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.
    - `type`: string enum: `A`, `AAAA`, `CNAME`, `HTTPS`, `TXT`, `SRV`, `LOC`, `MX` — DNS record type.
- `records`: object[] — Desired DNS records for the subdomain.
  [array of]
  - `content`: string — DNS record content.
  - `name`: string — DNS record name (or @ for the zone apex).
  - `priority`: number — Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.
  - `ttl`: number — Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.
  - `type`: string enum: `A`, `AAAA`, `CNAME`, `HTTPS`, `TXT`, `SRV`, `LOC`, `MX` — DNS record type.
- `status`: string enum: `ready`, `unconfigured`, `unlocked`, `misconfigured` — Aggregated DNS state for the subdomain. `unlocked` means desired records exist with correct content but at least one has had its email_routi

## GET /zones/{zone_id}/email/sending/subdomains/{subdomain_id}/reputation/complaints

Get sending subdomain complaint count

operationId: `email-sending-subdomains-get-sending-subdomain-reputation-complaints` · query: `start_at`, `end_at`

**Response** 200 → `result`

- `complaints`: integer **required** — The number of matched complaints for the sending subdomain in the requested time window.

## POST /zones/{zone_id}/email/sending/subdomains/preview

Preview sending subdomain DNS

operationId: `email-sending-subdomains-preview-sending-subdomain`

**Request** (application/json)

- `name`: string **required** — The domain name within the zone. A wildcard is allowed only as the complete leftmost label (`*.example.com`) and requires the account wildca

**Response** 200 → `result`

- `errors`: object[] — DNS or sending-configuration issues detected during the preview.
  [array of]
  - `code`: string **required** enum: `mx.missing`, `mx.foreign`, `spf.missing`, `spf.foreign`, `spf.multiple`, `dkim.missing`, `dkim.conflict`, `dmarc.missing` — Error code identifying the type of issue. `dkim.conflict` is
  - `conflicting_subdomain`: string — The enabled sending-subdomain row that conflicts with the requested name.
  - `existing`: any — The conflicting DNS record found in the zone.
  - `missing`: any — The DNS record that must be added to resolve this error.
  - `multiple`: object[] — Multiple conflicting DNS records found, for example more than one SPF or DMARC TXT record.
    [array of]
    - `content`: string — DNS record content.
    - `name`: string — DNS record name (or @ for the zone apex).
    - `priority`: number — Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.
    - `ttl`: number — Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.
    - `type`: string enum: `A`, `AAAA`, `CNAME`, `HTTPS`, `TXT`, `SRV`, `LOC`, `MX` — DNS record type.
- `records`: object[] — DNS records that would be created for the subdomain.
  [array of]
  - `content`: string — DNS record content.
  - `name`: string — DNS record name (or @ for the zone apex).
  - `priority`: number — Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.
  - `ttl`: number — Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.
  - `type`: string enum: `A`, `AAAA`, `CNAME`, `HTTPS`, `TXT`, `SRV`, `LOC`, `MX` — DNS record type.
