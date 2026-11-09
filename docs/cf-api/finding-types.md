# finding_types

7 endpoints.

## GET /accounts/{account_id}/data-security/posture/finding_types

List all finding types

operationId: `ListFindingTypes` · query: `page`, `per_page`, `vendors`, `types`, `origins`, `severities`, `search`, `quarantined`, `min_updated_at`, `max_updated_at`, `order`, `direction`

**Response** 200 → `result`

[array of]
- `applies_to_all_integrations`: boolean — Whether this finding type applies to every current and future integration of the vendor.
- `asset_class`: string — Asset class the finding type's policy evaluates.
- `asset_vendor`: string
- `category`: object **required**
- `created_at`: string — Timestamp when the finding type was created.
- `description`: string — Detailed description of the finding.
- `expression`: string — Rego expression backing this finding type. For custom finding types, generated package and import declarations are omitted. System expressio
- `id`: string **required** — The unique identifier of the finding.
- `integration_ids`: string[] — Integrations this finding type applies to when applies_to_all_integrations is false.
  [array]
- `match_count`: integer — Number of currently active finding instances across the account's integrations. Zero when none have been detected.
- `name`: string **required** — The name of the finding.
- `origin`: string enum: `system`, `custom` — Whether the finding type is system-managed or customer-created.
- `quarantined`: boolean — Whether evaluation of this finding type is suspended by an operator. Present only when true.
- `severity`: string **required**
- `updated_at`: string — Timestamp when the finding type was last updated.
- `vendor`: string **required** — The SaaS/Cloud vendor of the platform with which the finding is associated.
- `version`: integer — Current version of the finding type. Incremented on each update.

## POST /accounts/{account_id}/data-security/posture/finding_types

Create a custom finding type

operationId: `CreateFindingType`

**Request** (application/json)

- `applies_to_all_integrations`: boolean **required** — When true, this finding type applies to every current and future integration of the vendor.
- `asset_class`: string **required** — Asset class this finding type applies to (PascalCase, e.g. GoogleWorkspaceFile)
- `asset_vendor`: string **required**
- `description`: string **required** — Human-readable description of the finding type. Cannot be empty. Maximum 4096 characters.
- `expression`: string **required** — Rego expression body for the policy. `package cloudflare.casb.custom` and `import rego.v1` are added automatically. Do not include package o
- `integration_ids`: string[] — Required and non-empty when applies_to_all_integrations is false; omit when it is true.
  [array]
- `name`: string **required** — Human-readable name for the finding type. Maximum 256 characters.
- `severity`: string **required**

**Response** 201 → `result`

- `applies_to_all_integrations`: boolean — Whether this finding type applies to every current and future integration of the vendor.
- `asset_class`: string — Asset class the finding type's policy evaluates.
- `asset_vendor`: string
- `category`: object **required**
- `created_at`: string — Timestamp when the finding type was created.
- `description`: string — Detailed description of the finding.
- `expression`: string — Rego expression backing this finding type. For custom finding types, generated package and import declarations are omitted. System expressio
- `id`: string **required** — The unique identifier of the finding.
- `integration_ids`: string[] — Integrations this finding type applies to when applies_to_all_integrations is false.
  [array]
- `match_count`: integer — Number of currently active finding instances across the account's integrations. Zero when none have been detected.
- `name`: string **required** — The name of the finding.
- `origin`: string enum: `system`, `custom` — Whether the finding type is system-managed or customer-created.
- `quarantined`: boolean — Whether evaluation of this finding type is suspended by an operator. Present only when true.
- `severity`: string **required**
- `updated_at`: string — Timestamp when the finding type was last updated.
- `vendor`: string **required** — The SaaS/Cloud vendor of the platform with which the finding is associated.
- `version`: integer — Current version of the finding type. Incremented on each update.
object

## DELETE /accounts/{account_id}/data-security/posture/finding_types/{finding_type_id}

Delete a custom finding type

operationId: `DeleteFindingType`

## GET /accounts/{account_id}/data-security/posture/finding_types/{finding_type_id}

Get finding by ID

operationId: `GetFindingType`

**Response** 200 → `result`

- `applies_to_all_integrations`: boolean — Whether this finding type applies to every current and future integration of the vendor.
- `asset_class`: string — Asset class the finding type's policy evaluates.
- `asset_vendor`: string
- `category`: object **required**
- `created_at`: string — Timestamp when the finding type was created.
- `description`: string — Detailed description of the finding.
- `expression`: string — Rego expression backing this finding type. For custom finding types, generated package and import declarations are omitted. System expressio
- `id`: string **required** — The unique identifier of the finding.
- `integration_ids`: string[] — Integrations this finding type applies to when applies_to_all_integrations is false.
  [array]
- `match_count`: integer — Number of currently active finding instances across the account's integrations. Zero when none have been detected.
- `name`: string **required** — The name of the finding.
- `origin`: string enum: `system`, `custom` — Whether the finding type is system-managed or customer-created.
- `quarantined`: boolean — Whether evaluation of this finding type is suspended by an operator. Present only when true.
- `severity`: string **required**
- `updated_at`: string — Timestamp when the finding type was last updated.
- `vendor`: string **required** — The SaaS/Cloud vendor of the platform with which the finding is associated.
- `version`: integer — Current version of the finding type. Incremented on each update.

## PUT /accounts/{account_id}/data-security/posture/finding_types/{finding_type_id}

Update a custom finding type

operationId: `UpdateFindingType`

**Request** (application/json)

- `applies_to_all_integrations`: boolean **required** — When true, this finding type applies to every current and future integration of the vendor.
- `description`: string — Optional description of the finding type. Cannot be empty if provided. Maximum 4096 characters.
- `integration_ids`: string[] — Required and non-empty when applies_to_all_integrations is false; omit when it is true.
  [array]
- `name`: string — Human-readable name for the finding type. Cannot be empty if provided. Maximum 256 characters.
- `severity`: string

**Response** 200 → `result`

- `applies_to_all_integrations`: boolean — Whether this finding type applies to every current and future integration of the vendor.
- `asset_class`: string — Asset class the finding type's policy evaluates.
- `asset_vendor`: string
- `category`: object **required**
- `created_at`: string — Timestamp when the finding type was created.
- `description`: string — Detailed description of the finding.
- `expression`: string — Rego expression backing this finding type. For custom finding types, generated package and import declarations are omitted. System expressio
- `id`: string **required** — The unique identifier of the finding.
- `integration_ids`: string[] — Integrations this finding type applies to when applies_to_all_integrations is false.
  [array]
- `match_count`: integer — Number of currently active finding instances across the account's integrations. Zero when none have been detected.
- `name`: string **required** — The name of the finding.
- `origin`: string enum: `system`, `custom` — Whether the finding type is system-managed or customer-created.
- `quarantined`: boolean — Whether evaluation of this finding type is suspended by an operator. Present only when true.
- `severity`: string **required**
- `updated_at`: string — Timestamp when the finding type was last updated.
- `vendor`: string **required** — The SaaS/Cloud vendor of the platform with which the finding is associated.
- `version`: integer — Current version of the finding type. Incremented on each update.
object

## GET /accounts/{account_id}/data-security/posture/finding_types/{finding_type_id}/remediation_types

List remediation types for a finding type

operationId: `GetRemediationTypesForFindingType` · query: `integration_id`, `cursor`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `description`: string **required** — A description of the action(s) taken by the remediation type.
- `display_name`: string **required** — The name of the remediation type as displayed in the cloudflare dashboard.
- `finding_type_id`: string **required** — The identifier of the finding_type which this remediation type should remediate.
- `id`: string **required** — The identifier for the remediation type.
- `remediation_type`: string **required** — The name of the remediation type.

## POST /accounts/{account_id}/data-security/posture/finding_types/validate

Validate a custom finding type

operationId: `ValidateFindingType`

**Request** (application/json)

- `applies_to_all_integrations`: boolean **required** — When true, this finding type applies to every current and future integration of the vendor.
- `asset_class`: string **required** — Asset class this finding type applies to (PascalCase, e.g. GoogleWorkspaceFile)
- `asset_vendor`: string **required**
- `description`: string **required** — Human-readable description of the finding type. Cannot be empty. Maximum 4096 characters.
- `expression`: string **required** — Rego expression body for the policy. `package cloudflare.casb.custom` and `import rego.v1` are added automatically. Do not include package o
- `integration_ids`: string[] — Required and non-empty when applies_to_all_integrations is false; omit when it is true.
  [array]
- `name`: string **required** — Human-readable name for the finding type. Maximum 256 characters.
- `severity`: string **required**

**Response** 200 → `result`

- `errors`: object[] **required** — Every problem found with the candidate, so all of them can be surfaced at
  [array of]
  - `code`: string — Machine-readable identifier for the class of problem, when one is
  - `column`: integer — 1-based column on `line`. Omitted when the problem could not be located in
  - `detail`: string **required** — Description of the problem.
  - `field`: string — Request field the problem belongs to, matching the property names of
  - `line`: integer — 1-based line in `expression` where the problem was found. Omitted when
  - `message`: string **required** — Deprecated: use `detail`.
- `valid`: boolean **required** — Whether the candidate finding type would be accepted as-is.
