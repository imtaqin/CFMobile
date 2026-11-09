# Zone

10 endpoints.

## GET /zones

List Zones

operationId: `zones-get` · query: `name`, `status`, `type`, `account.id`, `account.name`, `page`, `per_page`, `order`, `direction`, `match`

**Response** 200 → `result`

[array of]
- `account`: object **required** — The account the zone belongs to.
  - `id`: string — Identifier
  - `name`: string — The name of the account.
- `activated_on`: string **required** — The last time proof of ownership was detected and the zone was made
- `cname_suffix`: string — Allows the customer to use a custom apex.
- `created_on`: string **required** — When the zone was created.
- `development_mode`: number **required** — The interval (in seconds) from when development mode expires
- `id`: string **required** — Identifier
- `meta`: object **required** — Metadata about the zone.
  - `cdn_only`: boolean — The zone is only configured for CDN.
  - `custom_certificate_quota`: integer — Number of Custom Certificates the zone can have.
  - `dns_only`: boolean — The zone is only configured for DNS.
  - `foundation_dns`: boolean — The zone is setup with Foundation DNS.
  - `page_rule_quota`: integer — Number of Page Rules a zone can have.
  - `phishing_detected`: boolean — The zone has been flagged for phishing.
  - `step`: integer
- `modified_on`: string **required** — When the zone was last modified.
- `name`: string **required** — The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characte
- `name_servers`: string[] **required** — The name servers Cloudflare assigns to a zone.
  [array]
- `original_dnshost`: string **required** — DNS host at the time of switching to Cloudflare.
- `original_name_servers`: string[] **required** — Original name servers before moving to Cloudflare.
  [array]
- `original_registrar`: string **required** — Registrar for the domain at the time of switching to Cloudflare.
- `owner`: object **required** — The owner of the zone.
  - `id`: string — Identifier
  - `name`: string — Name of the owner.
  - `type`: string — The type of owner.
- `paused`: boolean default: `false` — Indicates whether the zone is only using Cloudflare DNS services. A
- `permissions`: string[] — Legacy permissions based on legacy user membership information.
  [array]
- `plan`: object **required** — A Zones subscription information.
  - `can_subscribe`: boolean — States if the subscription can be activated.
  - `currency`: string — The denomination of the customer.
  - `externally_managed`: boolean — If this Zone is managed by another company.
  - `frequency`: string — How often the customer is billed.
  - `id`: string — Identifier
  - `is_subscribed`: boolean — States if the subscription active.
  - `legacy_discount`: boolean — If the legacy discount applies to this Zone.
  - `legacy_id`: string — The legacy name of the plan.
  - `name`: string — Name of the owner.
  - `price`: number — How much the customer is paying.
- `status`: string enum: `initializing`, `pending`, `active`, `moved` — The zone status on Cloudflare.
- `tenant`: object — The root organizational unit that this zone belongs to (such as a tenant or organization).
  - `id`: string — Identifier
  - `name`: string — The name of the Tenant account.
- `tenant_unit`: object — The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).
  - `id`: string — Identifier
- `type`: string enum: `full`, `partial`, `secondary`, `internal` default: `full` — A full zone implies that DNS is hosted with Cloudflare. A partial zone is
- `vanity_name_servers`: string[] default: `` — An array of domains used for custom name servers. This is only available for Business and Enterprise plans.
  [array]
- `verification_key`: string — Verification key for partial zone setup.

## POST /zones

Create Zone

operationId: `zones-post`

**Request** (application/json)

- `account`: object **required**
  - `id`: string — Identifier
- `name`: string **required** — The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characte
- `type`: string enum: `full`, `partial`, `secondary`, `internal` default: `full` — A full zone implies that DNS is hosted with Cloudflare. A partial zone is

**Response** 200 → `result`

- `account`: object **required** — The account the zone belongs to.
  - `id`: string — Identifier
  - `name`: string — The name of the account.
- `activated_on`: string **required** — The last time proof of ownership was detected and the zone was made
- `cname_suffix`: string — Allows the customer to use a custom apex.
- `created_on`: string **required** — When the zone was created.
- `development_mode`: number **required** — The interval (in seconds) from when development mode expires
- `id`: string **required** — Identifier
- `meta`: object **required** — Metadata about the zone.
  - `cdn_only`: boolean — The zone is only configured for CDN.
  - `custom_certificate_quota`: integer — Number of Custom Certificates the zone can have.
  - `dns_only`: boolean — The zone is only configured for DNS.
  - `foundation_dns`: boolean — The zone is setup with Foundation DNS.
  - `page_rule_quota`: integer — Number of Page Rules a zone can have.
  - `phishing_detected`: boolean — The zone has been flagged for phishing.
  - `step`: integer
- `modified_on`: string **required** — When the zone was last modified.
- `name`: string **required** — The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characte
- `name_servers`: string[] **required** — The name servers Cloudflare assigns to a zone.
  [array]
- `original_dnshost`: string **required** — DNS host at the time of switching to Cloudflare.
- `original_name_servers`: string[] **required** — Original name servers before moving to Cloudflare.
  [array]
- `original_registrar`: string **required** — Registrar for the domain at the time of switching to Cloudflare.
- `owner`: object **required** — The owner of the zone.
  - `id`: string — Identifier
  - `name`: string — Name of the owner.
  - `type`: string — The type of owner.
- `paused`: boolean default: `false` — Indicates whether the zone is only using Cloudflare DNS services. A
- `permissions`: string[] — Legacy permissions based on legacy user membership information.
  [array]
- `plan`: object **required** — A Zones subscription information.
  - `can_subscribe`: boolean — States if the subscription can be activated.
  - `currency`: string — The denomination of the customer.
  - `externally_managed`: boolean — If this Zone is managed by another company.
  - `frequency`: string — How often the customer is billed.
  - `id`: string — Identifier
  - `is_subscribed`: boolean — States if the subscription active.
  - `legacy_discount`: boolean — If the legacy discount applies to this Zone.
  - `legacy_id`: string — The legacy name of the plan.
  - `name`: string — Name of the owner.
  - `price`: number — How much the customer is paying.
- `status`: string enum: `initializing`, `pending`, `active`, `moved` — The zone status on Cloudflare.
- `tenant`: object — The root organizational unit that this zone belongs to (such as a tenant or organization).
  - `id`: string — Identifier
  - `name`: string — The name of the Tenant account.
- `tenant_unit`: object — The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).
  - `id`: string — Identifier
- `type`: string enum: `full`, `partial`, `secondary`, `internal` default: `full` — A full zone implies that DNS is hosted with Cloudflare. A partial zone is
- `vanity_name_servers`: string[] default: `` — An array of domains used for custom name servers. This is only available for Business and Enterprise plans.
  [array]
- `verification_key`: string — Verification key for partial zone setup.

## DELETE /zones/{zone_id}

Delete Zone

operationId: `zones-0-delete`

**Response** 200 → `result`

- `id`: string **required** — Identifier

## GET /zones/{zone_id}

Zone Details

operationId: `zones-0-get`

**Response** 200 → `result`

- `account`: object **required** — The account the zone belongs to.
  - `id`: string — Identifier
  - `name`: string — The name of the account.
- `activated_on`: string **required** — The last time proof of ownership was detected and the zone was made
- `cname_suffix`: string — Allows the customer to use a custom apex.
- `created_on`: string **required** — When the zone was created.
- `development_mode`: number **required** — The interval (in seconds) from when development mode expires
- `id`: string **required** — Identifier
- `meta`: object **required** — Metadata about the zone.
  - `cdn_only`: boolean — The zone is only configured for CDN.
  - `custom_certificate_quota`: integer — Number of Custom Certificates the zone can have.
  - `dns_only`: boolean — The zone is only configured for DNS.
  - `foundation_dns`: boolean — The zone is setup with Foundation DNS.
  - `page_rule_quota`: integer — Number of Page Rules a zone can have.
  - `phishing_detected`: boolean — The zone has been flagged for phishing.
  - `step`: integer
- `modified_on`: string **required** — When the zone was last modified.
- `name`: string **required** — The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characte
- `name_servers`: string[] **required** — The name servers Cloudflare assigns to a zone.
  [array]
- `original_dnshost`: string **required** — DNS host at the time of switching to Cloudflare.
- `original_name_servers`: string[] **required** — Original name servers before moving to Cloudflare.
  [array]
- `original_registrar`: string **required** — Registrar for the domain at the time of switching to Cloudflare.
- `owner`: object **required** — The owner of the zone.
  - `id`: string — Identifier
  - `name`: string — Name of the owner.
  - `type`: string — The type of owner.
- `paused`: boolean default: `false` — Indicates whether the zone is only using Cloudflare DNS services. A
- `permissions`: string[] — Legacy permissions based on legacy user membership information.
  [array]
- `plan`: object **required** — A Zones subscription information.
  - `can_subscribe`: boolean — States if the subscription can be activated.
  - `currency`: string — The denomination of the customer.
  - `externally_managed`: boolean — If this Zone is managed by another company.
  - `frequency`: string — How often the customer is billed.
  - `id`: string — Identifier
  - `is_subscribed`: boolean — States if the subscription active.
  - `legacy_discount`: boolean — If the legacy discount applies to this Zone.
  - `legacy_id`: string — The legacy name of the plan.
  - `name`: string — Name of the owner.
  - `price`: number — How much the customer is paying.
- `status`: string enum: `initializing`, `pending`, `active`, `moved` — The zone status on Cloudflare.
- `tenant`: object — The root organizational unit that this zone belongs to (such as a tenant or organization).
  - `id`: string — Identifier
  - `name`: string — The name of the Tenant account.
- `tenant_unit`: object — The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).
  - `id`: string — Identifier
- `type`: string enum: `full`, `partial`, `secondary`, `internal` default: `full` — A full zone implies that DNS is hosted with Cloudflare. A partial zone is
- `vanity_name_servers`: string[] default: `` — An array of domains used for custom name servers. This is only available for Business and Enterprise plans.
  [array]
- `verification_key`: string — Verification key for partial zone setup.

## PATCH /zones/{zone_id}

Edit Zone

operationId: `zones-0-patch`

**Request** (application/json)

- `paused`: boolean default: `false` — Indicates whether the zone is only using Cloudflare DNS services. A
- `plan`: object — (Deprecated) Please use the `/zones/{zone_id}/subscription` API
  - `id`: string — Identifier
- `type`: string enum: `full`, `partial`, `secondary`, `internal` — A full zone implies that DNS is hosted with Cloudflare. A partial
- `vanity_name_servers`: string[] default: `` — An array of domains used for custom name servers. This is only
  [array]

**Response** 200 → `result`

- `account`: object **required** — The account the zone belongs to.
  - `id`: string — Identifier
  - `name`: string — The name of the account.
- `activated_on`: string **required** — The last time proof of ownership was detected and the zone was made
- `cname_suffix`: string — Allows the customer to use a custom apex.
- `created_on`: string **required** — When the zone was created.
- `development_mode`: number **required** — The interval (in seconds) from when development mode expires
- `id`: string **required** — Identifier
- `meta`: object **required** — Metadata about the zone.
  - `cdn_only`: boolean — The zone is only configured for CDN.
  - `custom_certificate_quota`: integer — Number of Custom Certificates the zone can have.
  - `dns_only`: boolean — The zone is only configured for DNS.
  - `foundation_dns`: boolean — The zone is setup with Foundation DNS.
  - `page_rule_quota`: integer — Number of Page Rules a zone can have.
  - `phishing_detected`: boolean — The zone has been flagged for phishing.
  - `step`: integer
- `modified_on`: string **required** — When the zone was last modified.
- `name`: string **required** — The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characte
- `name_servers`: string[] **required** — The name servers Cloudflare assigns to a zone.
  [array]
- `original_dnshost`: string **required** — DNS host at the time of switching to Cloudflare.
- `original_name_servers`: string[] **required** — Original name servers before moving to Cloudflare.
  [array]
- `original_registrar`: string **required** — Registrar for the domain at the time of switching to Cloudflare.
- `owner`: object **required** — The owner of the zone.
  - `id`: string — Identifier
  - `name`: string — Name of the owner.
  - `type`: string — The type of owner.
- `paused`: boolean default: `false` — Indicates whether the zone is only using Cloudflare DNS services. A
- `permissions`: string[] — Legacy permissions based on legacy user membership information.
  [array]
- `plan`: object **required** — A Zones subscription information.
  - `can_subscribe`: boolean — States if the subscription can be activated.
  - `currency`: string — The denomination of the customer.
  - `externally_managed`: boolean — If this Zone is managed by another company.
  - `frequency`: string — How often the customer is billed.
  - `id`: string — Identifier
  - `is_subscribed`: boolean — States if the subscription active.
  - `legacy_discount`: boolean — If the legacy discount applies to this Zone.
  - `legacy_id`: string — The legacy name of the plan.
  - `name`: string — Name of the owner.
  - `price`: number — How much the customer is paying.
- `status`: string enum: `initializing`, `pending`, `active`, `moved` — The zone status on Cloudflare.
- `tenant`: object — The root organizational unit that this zone belongs to (such as a tenant or organization).
  - `id`: string — Identifier
  - `name`: string — The name of the Tenant account.
- `tenant_unit`: object — The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).
  - `id`: string — Identifier
- `type`: string enum: `full`, `partial`, `secondary`, `internal` default: `full` — A full zone implies that DNS is hosted with Cloudflare. A partial zone is
- `vanity_name_servers`: string[] default: `` — An array of domains used for custom name servers. This is only available for Business and Enterprise plans.
  [array]
- `verification_key`: string — Verification key for partial zone setup.

## PUT /zones/{zone_id}/activation_check

Rerun the Activation Check

operationId: `put-zones-zone_id-activation_check`

**Response** 200 → `result`

- `id`: string — Identifier.

## POST /zones/{zone_id}/environments/{environment_id}/invalidate_cache

Invalidate Cached Content by Environment

operationId: `zone-environment-invalidate`

**Request** (application/json)

(one of 6 variants; showing the first)
- `tags`: string[] — Cache tags. Targets all content whose `Cache-Tag` response header contains at least one of these tags. See [Purge cache by cache-tags](https
  [array]

**Response** 200 → `result`

- `id`: string **required**

## POST /zones/{zone_id}/environments/{environment_id}/purge_cache

Purge Cached Content by Environment

operationId: `zone-environment-purge`

**Request** (application/json)

(one of 6 variants; showing the first)
- `tags`: string[] — Cache tags. Targets all content whose `Cache-Tag` response header contains at least one of these tags. See [Purge cache by cache-tags](https
  [array]

**Response** 200 → `result`

- `id`: string **required**

## POST /zones/{zone_id}/invalidate_cache

Invalidate Cached Content

operationId: `zone-invalidate`

**Request** (application/json)

(one of 6 variants; showing the first)
- `tags`: string[] — Cache tags. Targets all content whose `Cache-Tag` response header contains at least one of these tags. See [Purge cache by cache-tags](https
  [array]

**Response** 200 → `result`

- `id`: string **required**

## POST /zones/{zone_id}/purge_cache

Purge Cached Content

operationId: `zone-purge`

**Request** (application/json)

(one of 6 variants; showing the first)
- `tags`: string[] — Cache tags. Targets all content whose `Cache-Tag` response header contains at least one of these tags. See [Purge cache by cache-tags](https
  [array]

**Response** 200 → `result`

- `id`: string **required**
