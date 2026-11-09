# Email for Platforms

6 endpoints.

## GET /accounts/{account_id}/email/domain-changes

List Email Domain changes

operationId: `email-domains-changes` · query: `per_page`, `cursor`, `modified_since`

**Response** 200 → `result`

[array of]
- `email_domain`: any — EmailDomain state at this change. Present only when kind is email_domain; DNS assignments are omitted.
- `kind`: string **required** enum: `email_domain`, `tombstone` — Change type. email_domain carries the domain state at this change; tombstone records a completed removal.
- `tombstone`: any — Bounded reconciliation record for a completed removal. Present only when kind is tombstone.

## GET /accounts/{account_id}/email/domains

List Email Domains

operationId: `email-domains-list` · query: `per_page`, `cursor`, `hostname`, `include`

**Response** 200 → `result`

[array of]
- `account_id`: string **required** — Identifier.
- `claim_release_at`: string — When the claim will enter blocked-first release if both ownership records remain continuously invalid. Absent outside that recovery period.
- `client_reference`: string — Opaque customer enrollment reference supplied at Create. The platform must map customers by this reference and EmailDomain ID, never by host
- `dns_management`: string **required** enum: `external` — The customer publishes the returned DNS instructions.
- `dns_records`: object[] — Four immutable assignments, including one Routing MX record. Included on single-resource responses and optionally on lists; operation exampl
  [array of]
  - `content`: string **required** — Assigned target. CNAME targets contain the enrollment token; use the returned value verbatim.
  - `name`: string **required** — Exact owner name to publish in the customer's DNS.
  - `observed_at`: string — Time of the latest accepted observation for this assignment.
  - `priority`: integer — MX preference; present only for MX records.
  - `purpose`: string **required** enum: `return_path`, `dkim`, `routing` — Role of this DNS assignment.
  - `required_for`: string[] **required** — Capabilities that depend on this assignment.
    [array]
  - `selector`: string enum: `cf1`, `cf2`, `s1`, `s2` — DKIM selector, the first label of name; present only for DKIM assignments. New enrollments use cf1 and cf2. Enrollments created before cf1 a
  - `type`: string **required** enum: `CNAME`, `MX` — DNS record type to publish.
  - `validation_status`: string **required** enum: `pending`, `valid`, `missing`, `mismatch`, `conflict`, `indeterminate`, `dnssec_bogus` — Observation of the exact customer record.
  - `verification_group`: string enum: `ownership_any` — Either current DKIM alias can establish ownership.
- `hostname`: string **required** — Canonical exact external customer hostname.
- `id`: string **required** — Stable identifier of this exact domain enrollment.
- `lifecycle_reason`: string enum: `deleting` — Why the resource is leaving the provisioned lifecycle.
- `lifecycle_status`: string **required** enum: `provisioned`, `deleting` — Resource lifecycle; provisioned does not imply active mail, and completed deletion returns HTTP 404.
- `modified_at`: string **required** — Last state change. Use the opaque change-feed cursor rather than comparing this value alone.
- `routing`: any **required** — Whether this exact domain can currently receive mail.
- `sending`: any **required** — Whether this exact domain can currently send mail.
- `verification`: any **required** — Customer DNS ownership status, independent of mail capability readiness.

## POST /accounts/{account_id}/email/domains

Create an Email Domain

operationId: `email-domains-create`

**Request** (application/json)

- `client_reference`: string — Opaque reference for one customer enrollment. Reuse it with the same hostname to retry Create safely. Distinct references can enroll the sam
- `hostname`: string **required** — Exact external hostname to enroll. After ASCII conversion, the assigned Return-Path hostname must be at most 201 characters (191 for the cur

**Response** 201 → `result`

- `account_id`: string **required** — Identifier.
- `claim_release_at`: string — When the claim will enter blocked-first release if both ownership records remain continuously invalid. Absent outside that recovery period.
- `client_reference`: string — Opaque customer enrollment reference supplied at Create. The platform must map customers by this reference and EmailDomain ID, never by host
- `dns_management`: string **required** enum: `external` — The customer publishes the returned DNS instructions.
- `dns_records`: object[] — Four immutable assignments, including one Routing MX record. Included on single-resource responses and optionally on lists; operation exampl
  [array of]
  - `content`: string **required** — Assigned target. CNAME targets contain the enrollment token; use the returned value verbatim.
  - `name`: string **required** — Exact owner name to publish in the customer's DNS.
  - `observed_at`: string — Time of the latest accepted observation for this assignment.
  - `priority`: integer — MX preference; present only for MX records.
  - `purpose`: string **required** enum: `return_path`, `dkim`, `routing` — Role of this DNS assignment.
  - `required_for`: string[] **required** — Capabilities that depend on this assignment.
    [array]
  - `selector`: string enum: `cf1`, `cf2`, `s1`, `s2` — DKIM selector, the first label of name; present only for DKIM assignments. New enrollments use cf1 and cf2. Enrollments created before cf1 a
  - `type`: string **required** enum: `CNAME`, `MX` — DNS record type to publish.
  - `validation_status`: string **required** enum: `pending`, `valid`, `missing`, `mismatch`, `conflict`, `indeterminate`, `dnssec_bogus` — Observation of the exact customer record.
  - `verification_group`: string enum: `ownership_any` — Either current DKIM alias can establish ownership.
- `hostname`: string **required** — Canonical exact external customer hostname.
- `id`: string **required** — Stable identifier of this exact domain enrollment.
- `lifecycle_reason`: string enum: `deleting` — Why the resource is leaving the provisioned lifecycle.
- `lifecycle_status`: string **required** enum: `provisioned`, `deleting` — Resource lifecycle; provisioned does not imply active mail, and completed deletion returns HTTP 404.
- `modified_at`: string **required** — Last state change. Use the opaque change-feed cursor rather than comparing this value alone.
- `routing`: any **required** — Whether this exact domain can currently receive mail.
- `sending`: any **required** — Whether this exact domain can currently send mail.
- `verification`: any **required** — Customer DNS ownership status, independent of mail capability readiness.

## DELETE /accounts/{account_id}/email/domains/{email_domain_id}

Delete an Email Domain

operationId: `email-domains-delete`

**Response** 202 → `result`

- `account_id`: string **required** — Identifier.
- `claim_release_at`: string — When the claim will enter blocked-first release if both ownership records remain continuously invalid. Absent outside that recovery period.
- `client_reference`: string — Opaque customer enrollment reference supplied at Create. The platform must map customers by this reference and EmailDomain ID, never by host
- `dns_management`: string **required** enum: `external` — The customer publishes the returned DNS instructions.
- `dns_records`: object[] — Four immutable assignments, including one Routing MX record. Included on single-resource responses and optionally on lists; operation exampl
  [array of]
  - `content`: string **required** — Assigned target. CNAME targets contain the enrollment token; use the returned value verbatim.
  - `name`: string **required** — Exact owner name to publish in the customer's DNS.
  - `observed_at`: string — Time of the latest accepted observation for this assignment.
  - `priority`: integer — MX preference; present only for MX records.
  - `purpose`: string **required** enum: `return_path`, `dkim`, `routing` — Role of this DNS assignment.
  - `required_for`: string[] **required** — Capabilities that depend on this assignment.
    [array]
  - `selector`: string enum: `cf1`, `cf2`, `s1`, `s2` — DKIM selector, the first label of name; present only for DKIM assignments. New enrollments use cf1 and cf2. Enrollments created before cf1 a
  - `type`: string **required** enum: `CNAME`, `MX` — DNS record type to publish.
  - `validation_status`: string **required** enum: `pending`, `valid`, `missing`, `mismatch`, `conflict`, `indeterminate`, `dnssec_bogus` — Observation of the exact customer record.
  - `verification_group`: string enum: `ownership_any` — Either current DKIM alias can establish ownership.
- `hostname`: string **required** — Canonical exact external customer hostname.
- `id`: string **required** — Stable identifier of this exact domain enrollment.
- `lifecycle_reason`: string enum: `deleting` — Why the resource is leaving the provisioned lifecycle.
- `lifecycle_status`: string **required** enum: `provisioned`, `deleting` — Resource lifecycle; provisioned does not imply active mail, and completed deletion returns HTTP 404.
- `modified_at`: string **required** — Last state change. Use the opaque change-feed cursor rather than comparing this value alone.
- `routing`: any **required** — Whether this exact domain can currently receive mail.
- `sending`: any **required** — Whether this exact domain can currently send mail.
- `verification`: any **required** — Customer DNS ownership status, independent of mail capability readiness.

## GET /accounts/{account_id}/email/domains/{email_domain_id}

Get an Email Domain

operationId: `email-domains-get`

**Response** 200 → `result`

- `account_id`: string **required** — Identifier.
- `claim_release_at`: string — When the claim will enter blocked-first release if both ownership records remain continuously invalid. Absent outside that recovery period.
- `client_reference`: string — Opaque customer enrollment reference supplied at Create. The platform must map customers by this reference and EmailDomain ID, never by host
- `dns_management`: string **required** enum: `external` — The customer publishes the returned DNS instructions.
- `dns_records`: object[] — Four immutable assignments, including one Routing MX record. Included on single-resource responses and optionally on lists; operation exampl
  [array of]
  - `content`: string **required** — Assigned target. CNAME targets contain the enrollment token; use the returned value verbatim.
  - `name`: string **required** — Exact owner name to publish in the customer's DNS.
  - `observed_at`: string — Time of the latest accepted observation for this assignment.
  - `priority`: integer — MX preference; present only for MX records.
  - `purpose`: string **required** enum: `return_path`, `dkim`, `routing` — Role of this DNS assignment.
  - `required_for`: string[] **required** — Capabilities that depend on this assignment.
    [array]
  - `selector`: string enum: `cf1`, `cf2`, `s1`, `s2` — DKIM selector, the first label of name; present only for DKIM assignments. New enrollments use cf1 and cf2. Enrollments created before cf1 a
  - `type`: string **required** enum: `CNAME`, `MX` — DNS record type to publish.
  - `validation_status`: string **required** enum: `pending`, `valid`, `missing`, `mismatch`, `conflict`, `indeterminate`, `dnssec_bogus` — Observation of the exact customer record.
  - `verification_group`: string enum: `ownership_any` — Either current DKIM alias can establish ownership.
- `hostname`: string **required** — Canonical exact external customer hostname.
- `id`: string **required** — Stable identifier of this exact domain enrollment.
- `lifecycle_reason`: string enum: `deleting` — Why the resource is leaving the provisioned lifecycle.
- `lifecycle_status`: string **required** enum: `provisioned`, `deleting` — Resource lifecycle; provisioned does not imply active mail, and completed deletion returns HTTP 404.
- `modified_at`: string **required** — Last state change. Use the opaque change-feed cursor rather than comparing this value alone.
- `routing`: any **required** — Whether this exact domain can currently receive mail.
- `sending`: any **required** — Whether this exact domain can currently send mail.
- `verification`: any **required** — Customer DNS ownership status, independent of mail capability readiness.

## POST /accounts/{account_id}/email/domains/{email_domain_id}/verify

Verify an Email Domain

operationId: `email-domains-verify`

**Response** 202 → `result`

- `account_id`: string **required** — Identifier.
- `claim_release_at`: string — When the claim will enter blocked-first release if both ownership records remain continuously invalid. Absent outside that recovery period.
- `client_reference`: string — Opaque customer enrollment reference supplied at Create. The platform must map customers by this reference and EmailDomain ID, never by host
- `dns_management`: string **required** enum: `external` — The customer publishes the returned DNS instructions.
- `dns_records`: object[] — Four immutable assignments, including one Routing MX record. Included on single-resource responses and optionally on lists; operation exampl
  [array of]
  - `content`: string **required** — Assigned target. CNAME targets contain the enrollment token; use the returned value verbatim.
  - `name`: string **required** — Exact owner name to publish in the customer's DNS.
  - `observed_at`: string — Time of the latest accepted observation for this assignment.
  - `priority`: integer — MX preference; present only for MX records.
  - `purpose`: string **required** enum: `return_path`, `dkim`, `routing` — Role of this DNS assignment.
  - `required_for`: string[] **required** — Capabilities that depend on this assignment.
    [array]
  - `selector`: string enum: `cf1`, `cf2`, `s1`, `s2` — DKIM selector, the first label of name; present only for DKIM assignments. New enrollments use cf1 and cf2. Enrollments created before cf1 a
  - `type`: string **required** enum: `CNAME`, `MX` — DNS record type to publish.
  - `validation_status`: string **required** enum: `pending`, `valid`, `missing`, `mismatch`, `conflict`, `indeterminate`, `dnssec_bogus` — Observation of the exact customer record.
  - `verification_group`: string enum: `ownership_any` — Either current DKIM alias can establish ownership.
- `hostname`: string **required** — Canonical exact external customer hostname.
- `id`: string **required** — Stable identifier of this exact domain enrollment.
- `lifecycle_reason`: string enum: `deleting` — Why the resource is leaving the provisioned lifecycle.
- `lifecycle_status`: string **required** enum: `provisioned`, `deleting` — Resource lifecycle; provisioned does not imply active mail, and completed deletion returns HTTP 404.
- `modified_at`: string **required** — Last state change. Use the opaque change-feed cursor rather than comparing this value alone.
- `routing`: any **required** — Whether this exact domain can currently receive mail.
- `sending`: any **required** — Whether this exact domain can currently send mail.
- `verification`: any **required** — Customer DNS ownership status, independent of mail capability readiness.
