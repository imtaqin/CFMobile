# Registrar Registration

12 endpoints.

## GET /accounts/{account_id}/registrar-sandbox/registrations

List Registrations

operationId: `sandbox-registrar-domain-registration-list` · query: `cursor`, `per_page`, `direction`, `sort_by`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/registrar-sandbox/registrations

Create Registration

operationId: `sandbox-registrar-domain-registration-create`

**Request** (application/json)

- `acknowledgements`: object — Provides user acknowledgements for a specific extension or premium
- `auto_renew`: boolean default: `false` — Enable or disable automatic renewal. Defaults to `false` if omitted.
- `contact_extensions`: object — Provides registry-specific contact extension values for the registrant.
- `contacts`: object
- `domain_name`: string **required** — Provides a fully qualified domain name (FQDN), including the extension
- `privacy_mode`: string enum: `off`, `redaction` default: `redaction` — Sets the WHOIS privacy mode for the registration. Defaults to `redaction`.
- `years`: integer — Sets the registration term from 1 to 10 years. When omitted, this

**Response** 201 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar-sandbox/registrations/{domain_name}

Get Registration

operationId: `sandbox-registrar-domain-registration-get`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/registrar-sandbox/registrations/{domain_name}

Update Registration

operationId: `sandbox-registrar-domain-registration-update`

**Request** (application/json)

- `auto_renew`: boolean — Enable or disable automatic renewal.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar-sandbox/registrations/{domain_name}/registration-status

Get Registration Status

operationId: `sandbox-registrar-domain-registration-get-status`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar-sandbox/registrations/{domain_name}/update-status

Get Update Status

operationId: `sandbox-registrar-domain-registration-get-update-status`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar/registrations

List Registrations

operationId: `registrar-domain-registration-list` · query: `cursor`, `per_page`, `direction`, `sort_by`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/registrar/registrations

Create Registration

operationId: `registrar-domain-registration-create`

**Request** (application/json)

- `acknowledgements`: object — Provides user acknowledgements for a specific extension or premium
- `auto_renew`: boolean default: `false` — Enable or disable automatic renewal. Defaults to `false` if omitted.
- `contact_extensions`: object — Provides registry-specific contact extension values for the registrant.
- `contacts`: object
- `domain_name`: string **required** — Provides a fully qualified domain name (FQDN), including the extension
- `privacy_mode`: string enum: `off`, `redaction` default: `redaction` — Sets the WHOIS privacy mode for the registration. Defaults to `redaction`.
- `years`: integer — Sets the registration term from 1 to 10 years. When omitted, this

**Response** 201 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar/registrations/{domain_name}

Get Registration

operationId: `registrar-domain-registration-get`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/registrar/registrations/{domain_name}

Update Registration

operationId: `registrar-domain-registration-update`

**Request** (application/json)

- `auto_renew`: boolean — Enable or disable automatic renewal.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar/registrations/{domain_name}/registration-status

Get Registration Status

operationId: `registrar-domain-registration-get-status`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/registrar/registrations/{domain_name}/update-status

Get Update Status

operationId: `registrar-domain-registration-get-update-status`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
