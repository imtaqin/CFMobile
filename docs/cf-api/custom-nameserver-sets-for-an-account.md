# Custom Nameserver Sets for an Account

5 endpoints.

## GET /accounts/{account_id}/dns_settings/nameserver_sets

List Custom Nameserver Sets

operationId: `dns-settings-for-an-account-list-custom-nameserver-sets` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `created_on`: string **required** — When the nameserver set was created.
- `id`: string **required** — Identifier for a nameserver set.
- `ip_set`: integer **required** default: `1` — Selects the account-specific IP set that supplies the nameserver addresses. Nameserver sets with the same `ip_set` and `advanced` value may 
- `name`: string **required** — Customer-defined name, unique within the account by exact string equality (case-sensitive, with no Unicode normalization). Must be valid UTF
- `advanced`: boolean **required** enum: `false` — Whether the nameserver set uses Advanced anycast groups.
- `nameservers`: object[] **required**
  [array of]
  - `ipv4`: string[] **required** — IPv4 addresses assigned to the nameserver.
    [array]
  - `ipv6`: string[] **required** — IPv6 addresses assigned to the nameserver.
    [array]
  - `name`: string **required** — A unique lowercase Punycode nameserver name within the set.

## POST /accounts/{account_id}/dns_settings/nameserver_sets

Create Custom Nameserver Set

operationId: `dns-settings-for-an-account-create-custom-nameserver-set`

**Request** (application/json)

- `advanced`: boolean default: `false` — Whether to allocate the nameservers from distinct Advanced anycast groups.
- `ip_set`: integer default: `1` — Selects the account-specific IP set that supplies the nameserver addresses. Nameserver sets with the same `ip_set` and `advanced` value may 
- `name`: string **required** — Customer-defined name, unique within the account by exact string equality (case-sensitive, with no Unicode normalization). Must be valid UTF
- `nameservers`: object[] **required** — Lists each nameserver and the number of addresses to allocate to it. Requires a unique name for each entry in the set.
  [array of]
  - `ip_count`: integer default: `1` — Number of IPv4 addresses and number of IPv6 addresses to allocate to this nameserver. All nameservers in an Advanced nameserver set must use
  - `name`: string **required** — A unique lowercase Punycode nameserver name within the set.

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_on`: string **required** — When the nameserver set was created.
- `id`: string **required** — Identifier for a nameserver set.
- `ip_set`: integer **required** default: `1` — Selects the account-specific IP set that supplies the nameserver addresses. Nameserver sets with the same `ip_set` and `advanced` value may 
- `name`: string **required** — Customer-defined name, unique within the account by exact string equality (case-sensitive, with no Unicode normalization). Must be valid UTF
- `advanced`: boolean **required** enum: `false` — Whether the nameserver set uses Advanced anycast groups.
- `nameservers`: object[] **required**
  [array of]
  - `ipv4`: string[] **required** — IPv4 addresses assigned to the nameserver.
    [array]
  - `ipv6`: string[] **required** — IPv6 addresses assigned to the nameserver.
    [array]
  - `name`: string **required** — A unique lowercase Punycode nameserver name within the set.

## DELETE /accounts/{account_id}/dns_settings/nameserver_sets/{nameserver_set_id}

Delete Custom Nameserver Set

operationId: `dns-settings-for-an-account-delete-custom-nameserver-set`

**Response** 200 → `result`

- `id`: string **required** — Identifier for a nameserver set.

## GET /accounts/{account_id}/dns_settings/nameserver_sets/{nameserver_set_id}

Get Custom Nameserver Set

operationId: `dns-settings-for-an-account-get-custom-nameserver-set`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_on`: string **required** — When the nameserver set was created.
- `id`: string **required** — Identifier for a nameserver set.
- `ip_set`: integer **required** default: `1` — Selects the account-specific IP set that supplies the nameserver addresses. Nameserver sets with the same `ip_set` and `advanced` value may 
- `name`: string **required** — Customer-defined name, unique within the account by exact string equality (case-sensitive, with no Unicode normalization). Must be valid UTF
- `advanced`: boolean **required** enum: `false` — Whether the nameserver set uses Advanced anycast groups.
- `nameservers`: object[] **required**
  [array of]
  - `ipv4`: string[] **required** — IPv4 addresses assigned to the nameserver.
    [array]
  - `ipv6`: string[] **required** — IPv6 addresses assigned to the nameserver.
    [array]
  - `name`: string **required** — A unique lowercase Punycode nameserver name within the set.

## PATCH /accounts/{account_id}/dns_settings/nameserver_sets/{nameserver_set_id}

Update Custom Nameserver Set

operationId: `dns-settings-for-an-account-update-custom-nameserver-set`

**Request** (application/json)

- `name`: string — Customer-defined name, unique within the account by exact string equality (case-sensitive, with no Unicode normalization). Must be valid UTF

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_on`: string **required** — When the nameserver set was created.
- `id`: string **required** — Identifier for a nameserver set.
- `ip_set`: integer **required** default: `1` — Selects the account-specific IP set that supplies the nameserver addresses. Nameserver sets with the same `ip_set` and `advanced` value may 
- `name`: string **required** — Customer-defined name, unique within the account by exact string equality (case-sensitive, with no Unicode normalization). Must be valid UTF
- `advanced`: boolean **required** enum: `false` — Whether the nameserver set uses Advanced anycast groups.
- `nameservers`: object[] **required**
  [array of]
  - `ipv4`: string[] **required** — IPv4 addresses assigned to the nameserver.
    [array]
  - `ipv6`: string[] **required** — IPv6 addresses assigned to the nameserver.
    [array]
  - `name`: string **required** — A unique lowercase Punycode nameserver name within the set.
