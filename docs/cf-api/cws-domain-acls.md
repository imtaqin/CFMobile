# CWS Domain ACLs

5 endpoints.

## GET /accounts/{account_id}/cws/domain-acls

List domain ACLs

operationId: `cws-list-domain-acls` · query: `cursor`, `per_page`, `order`, `direction`, `name`, `deployment_id`

**Response** 200 → `result`

[array of]
- `created_at`: string **required**
- `default_action`: string **required** enum: `ALLOW`, `BLOCK` — Action applied when no entry matches the request domain
- `entries`: object[] **required** — Per-domain action overrides. Each domain appears at most once.
  [array of]
  - `action`: string **required** enum: `ALLOW`, `BLOCK` — Per-domain decision overriding the parent ACL's default_action
  - `domain`: string **required** — Hostname or domain pattern, capped at 255 UTF-8 bytes
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## POST /accounts/{account_id}/cws/domain-acls

Create a new domain ACL

operationId: `cws-create-domain-acl`

**Request** (application/json)

- `default_action`: string **required** enum: `ALLOW`, `BLOCK` — Default action when no entry matches
- `entries`: object[] **required** — Domain entries for this ACL. Each domain must appear at most once.
  [array of]
  - `action`: string **required** enum: `ALLOW`, `BLOCK` — Per-domain decision overriding the parent ACL's default_action
  - `domain`: string **required** — Hostname or domain pattern, capped at 255 UTF-8 bytes
- `name`: string **required** — Name of the domain ACL

**Response** 201 → `result`

- `created_at`: string **required**
- `default_action`: string **required** enum: `ALLOW`, `BLOCK` — Action applied when no entry matches the request domain
- `entries`: object[] **required** — Per-domain action overrides. Each domain appears at most once.
  [array of]
  - `action`: string **required** enum: `ALLOW`, `BLOCK` — Per-domain decision overriding the parent ACL's default_action
  - `domain`: string **required** — Hostname or domain pattern, capped at 255 UTF-8 bytes
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## DELETE /accounts/{account_id}/cws/domain-acls/{domain_acl_id}

Delete a domain ACL

operationId: `cws-delete-domain-acl`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/cws/domain-acls/{domain_acl_id}

Get a domain ACL by ID

operationId: `cws-get-domain-acl`

**Response** 200 → `result`

- `created_at`: string **required**
- `default_action`: string **required** enum: `ALLOW`, `BLOCK` — Action applied when no entry matches the request domain
- `entries`: object[] **required** — Per-domain action overrides. Each domain appears at most once.
  [array of]
  - `action`: string **required** enum: `ALLOW`, `BLOCK` — Per-domain decision overriding the parent ACL's default_action
  - `domain`: string **required** — Hostname or domain pattern, capped at 255 UTF-8 bytes
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**

## PUT /accounts/{account_id}/cws/domain-acls/{domain_acl_id}

Update a domain ACL and replace its entries

operationId: `cws-update-domain-acl`

**Request** (application/json)

- `default_action`: string **required** enum: `ALLOW`, `BLOCK` — Default action when no entry matches
- `entries`: object[] **required** — Replacement set of domain entries. Each domain must appear at most once.
  [array of]
  - `action`: string **required** enum: `ALLOW`, `BLOCK` — Per-domain decision overriding the parent ACL's default_action
  - `domain`: string **required** — Hostname or domain pattern, capped at 255 UTF-8 bytes
- `name`: string **required** — Name of the domain ACL

**Response** 200 → `result`

- `created_at`: string **required**
- `default_action`: string **required** enum: `ALLOW`, `BLOCK` — Action applied when no entry matches the request domain
- `entries`: object[] **required** — Per-domain action overrides. Each domain appears at most once.
  [array of]
  - `action`: string **required** enum: `ALLOW`, `BLOCK` — Per-domain decision overriding the parent ACL's default_action
  - `domain`: string **required** — Hostname or domain pattern, capped at 255 UTF-8 bytes
- `id`: string **required** — Server-assigned UUID
- `name`: string **required** — Human-readable name; unique per account
- `updated_at`: string **required**
