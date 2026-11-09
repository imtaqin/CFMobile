# IP Address Management Prefixes

9 endpoints.

## GET /accounts/{account_id}/addressing/loa_documents

List LOA Documents

operationId: `ip-address-management-prefixes-list-loa-documents`

**Response** 200 → `result`

[array of]
- `account_id`: string — Identifier of a Cloudflare account.
- `auto_generated`: boolean — Whether the LOA has been auto-generated for the prefix owner by Cloudflare.
- `created`: string
- `filename`: string — Name of LOA document. Max file size 10MB, and supported filetype is pdf.
- `id`: string — Identifier for the uploaded LOA document.
- `size_bytes`: integer — File size of the uploaded LOA document.
- `verified`: boolean — Whether the LOA has been verified by Cloudflare staff.
- `verified_at`: string — Timestamp of the moment the LOA was marked as validated.

## POST /accounts/{account_id}/addressing/loa_documents

Upload LOA Document

operationId: `ip-address-management-prefixes-upload-loa-document`

**Request** (multipart/form-data)

- `loa_document`: string **required** — LOA document to upload.

**Response** 201 → `result`

- `account_id`: string — Identifier of a Cloudflare account.
- `auto_generated`: boolean — Whether the LOA has been auto-generated for the prefix owner by Cloudflare.
- `created`: string
- `filename`: string — Name of LOA document. Max file size 10MB, and supported filetype is pdf.
- `id`: string — Identifier for the uploaded LOA document.
- `size_bytes`: integer — File size of the uploaded LOA document.
- `verified`: boolean — Whether the LOA has been verified by Cloudflare staff.
- `verified_at`: string — Timestamp of the moment the LOA was marked as validated.

## GET /accounts/{account_id}/addressing/loa_documents/{loa_document_id}/download

Download LOA Document

operationId: `ip-address-management-prefixes-download-loa-document`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/addressing/prefixes

List Prefixes

operationId: `ip-address-management-prefixes-list-prefixes`

**Response** 200 → `result`

[array of]
- `account_id`: string — Identifier of a Cloudflare account.
- `advertised`: boolean — Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.
- `advertised_modified_at`: string — Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.
- `approved`: string — Approval state of the prefix (P = pending, V = approved). Approval does not advertise the prefix or activate traffic.
- `asn`: integer — Autonomous System Number (ASN) the prefix will be advertised under. Use 13335 for Cloudflare's ASN, or your own ASN as an integer without th
- `asn_ownership_validation_state`: string enum: `pending`, `valid`, `missing`, `invalid` — State of ASN ownership validation for a customer-owned Autonomous System Number (ASN). Returned when an ASN ownership validation result exis
- `aspa_validation_state`: string enum: `pending`, `valid`, `invalid` — State of Autonomous System Provider Authorization (ASPA) validation for a customer-owned ASN. Returned when an ASPA validation result exists
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `delegate_loa_creation`: boolean default: `false` — Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.
- `description`: string — Description of the prefix.
- `id`: string — Identifier of an IP Prefix.
- `irr_validation_state`: string — State of one kind of validation for an IP prefix.
- `loa_document_id`: string — Identifier for the uploaded LOA document.
- `modified_at`: string
- `on_demand_enabled`: boolean — Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.
- `on_demand_locked`: boolean — Whether advertisement status of the prefix is locked, meaning it cannot be changed.
- `ownership_validation_state`: string — State of one kind of validation for an IP prefix.
- `ownership_validation_token`: string — Token used to verify ownership of the prefix and, when applicable, its ASN. Use the same token for both checks. Refer to the [BYOIP onboardi
- `rpki_validation_state`: string — State of one kind of validation for an IP prefix.

## POST /accounts/{account_id}/addressing/prefixes

Add Prefix

operationId: `ip-address-management-prefixes-add-prefix`

**Request** (application/json)

- `asn`: integer **required** — Autonomous System Number (ASN) the prefix will be advertised under. Use 13335 for Cloudflare's ASN, or your own ASN as an integer without th
- `cidr`: string **required** — IP Prefix in Classless Inter-Domain Routing format.
- `delegate_loa_creation`: boolean default: `false` — Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.
- `description`: string — Description of the prefix.
- `loa_document_id`: string — Identifier for the uploaded LOA document.

**Response** 201 → `result`

- `account_id`: string — Identifier of a Cloudflare account.
- `advertised`: boolean — Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.
- `advertised_modified_at`: string — Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.
- `approved`: string — Approval state of the prefix (P = pending, V = approved). Approval does not advertise the prefix or activate traffic.
- `asn`: integer — Autonomous System Number (ASN) the prefix will be advertised under. Use 13335 for Cloudflare's ASN, or your own ASN as an integer without th
- `asn_ownership_validation_state`: string enum: `pending`, `valid`, `missing`, `invalid` — State of ASN ownership validation for a customer-owned Autonomous System Number (ASN). Returned when an ASN ownership validation result exis
- `aspa_validation_state`: string enum: `pending`, `valid`, `invalid` — State of Autonomous System Provider Authorization (ASPA) validation for a customer-owned ASN. Returned when an ASPA validation result exists
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `delegate_loa_creation`: boolean default: `false` — Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.
- `description`: string — Description of the prefix.
- `id`: string — Identifier of an IP Prefix.
- `irr_validation_state`: string — State of one kind of validation for an IP prefix.
- `loa_document_id`: string — Identifier for the uploaded LOA document.
- `modified_at`: string
- `on_demand_enabled`: boolean — Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.
- `on_demand_locked`: boolean — Whether advertisement status of the prefix is locked, meaning it cannot be changed.
- `ownership_validation_state`: string — State of one kind of validation for an IP prefix.
- `ownership_validation_token`: string — Token used to verify ownership of the prefix and, when applicable, its ASN. Use the same token for both checks. Refer to the [BYOIP onboardi
- `rpki_validation_state`: string — State of one kind of validation for an IP prefix.

## DELETE /accounts/{account_id}/addressing/prefixes/{prefix_id}

Delete Prefix

operationId: `ip-address-management-prefixes-delete-prefix`

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

## GET /accounts/{account_id}/addressing/prefixes/{prefix_id}

Prefix Details

operationId: `ip-address-management-prefixes-prefix-details`

**Response** 200 → `result`

- `account_id`: string — Identifier of a Cloudflare account.
- `advertised`: boolean — Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.
- `advertised_modified_at`: string — Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.
- `approved`: string — Approval state of the prefix (P = pending, V = approved). Approval does not advertise the prefix or activate traffic.
- `asn`: integer — Autonomous System Number (ASN) the prefix will be advertised under. Use 13335 for Cloudflare's ASN, or your own ASN as an integer without th
- `asn_ownership_validation_state`: string enum: `pending`, `valid`, `missing`, `invalid` — State of ASN ownership validation for a customer-owned Autonomous System Number (ASN). Returned when an ASN ownership validation result exis
- `aspa_validation_state`: string enum: `pending`, `valid`, `invalid` — State of Autonomous System Provider Authorization (ASPA) validation for a customer-owned ASN. Returned when an ASPA validation result exists
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `delegate_loa_creation`: boolean default: `false` — Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.
- `description`: string — Description of the prefix.
- `id`: string — Identifier of an IP Prefix.
- `irr_validation_state`: string — State of one kind of validation for an IP prefix.
- `loa_document_id`: string — Identifier for the uploaded LOA document.
- `modified_at`: string
- `on_demand_enabled`: boolean — Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.
- `on_demand_locked`: boolean — Whether advertisement status of the prefix is locked, meaning it cannot be changed.
- `ownership_validation_state`: string — State of one kind of validation for an IP prefix.
- `ownership_validation_token`: string — Token used to verify ownership of the prefix and, when applicable, its ASN. Use the same token for both checks. Refer to the [BYOIP onboardi
- `rpki_validation_state`: string — State of one kind of validation for an IP prefix.

## PATCH /accounts/{account_id}/addressing/prefixes/{prefix_id}

Update Prefix Description

operationId: `ip-address-management-prefixes-update-prefix-description`

**Request** (application/json)

- `description`: string **required** — Description of the prefix.

**Response** 200 → `result`

- `account_id`: string — Identifier of a Cloudflare account.
- `advertised`: boolean — Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.
- `advertised_modified_at`: string — Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.
- `approved`: string — Approval state of the prefix (P = pending, V = approved). Approval does not advertise the prefix or activate traffic.
- `asn`: integer — Autonomous System Number (ASN) the prefix will be advertised under. Use 13335 for Cloudflare's ASN, or your own ASN as an integer without th
- `asn_ownership_validation_state`: string enum: `pending`, `valid`, `missing`, `invalid` — State of ASN ownership validation for a customer-owned Autonomous System Number (ASN). Returned when an ASN ownership validation result exis
- `aspa_validation_state`: string enum: `pending`, `valid`, `invalid` — State of Autonomous System Provider Authorization (ASPA) validation for a customer-owned ASN. Returned when an ASPA validation result exists
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `delegate_loa_creation`: boolean default: `false` — Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.
- `description`: string — Description of the prefix.
- `id`: string — Identifier of an IP Prefix.
- `irr_validation_state`: string — State of one kind of validation for an IP prefix.
- `loa_document_id`: string — Identifier for the uploaded LOA document.
- `modified_at`: string
- `on_demand_enabled`: boolean — Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.
- `on_demand_locked`: boolean — Whether advertisement status of the prefix is locked, meaning it cannot be changed.
- `ownership_validation_state`: string — State of one kind of validation for an IP prefix.
- `ownership_validation_token`: string — Token used to verify ownership of the prefix and, when applicable, its ASN. Use the same token for both checks. Refer to the [BYOIP onboardi
- `rpki_validation_state`: string — State of one kind of validation for an IP prefix.

## POST /accounts/{account_id}/addressing/prefixes/{prefix_id}/validate

Validate Prefix

operationId: `ip-address-management-prefixes-validate-prefix`

**Response** 202 → `result`

- `account_id`: string — Identifier of a Cloudflare account.
- `advertised`: boolean — Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.
- `advertised_modified_at`: string — Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.
- `approved`: string — Approval state of the prefix (P = pending, V = approved). Approval does not advertise the prefix or activate traffic.
- `asn`: integer — Autonomous System Number (ASN) the prefix will be advertised under. Use 13335 for Cloudflare's ASN, or your own ASN as an integer without th
- `asn_ownership_validation_state`: string enum: `pending`, `valid`, `missing`, `invalid` — State of ASN ownership validation for a customer-owned Autonomous System Number (ASN). Returned when an ASN ownership validation result exis
- `aspa_validation_state`: string enum: `pending`, `valid`, `invalid` — State of Autonomous System Provider Authorization (ASPA) validation for a customer-owned ASN. Returned when an ASPA validation result exists
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `delegate_loa_creation`: boolean default: `false` — Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.
- `description`: string — Description of the prefix.
- `id`: string — Identifier of an IP Prefix.
- `irr_validation_state`: string — State of one kind of validation for an IP prefix.
- `loa_document_id`: string — Identifier for the uploaded LOA document.
- `modified_at`: string
- `on_demand_enabled`: boolean — Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.
- `on_demand_locked`: boolean — Whether advertisement status of the prefix is locked, meaning it cannot be changed.
- `ownership_validation_state`: string — State of one kind of validation for an IP prefix.
- `ownership_validation_token`: string — Token used to verify ownership of the prefix and, when applicable, its ASN. Use the same token for both checks. Refer to the [BYOIP onboardi
- `rpki_validation_state`: string — State of one kind of validation for an IP prefix.
