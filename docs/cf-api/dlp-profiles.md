# DLP Profiles

16 endpoints.

## GET /accounts/{account_id}/dlp/profiles

List all profiles

operationId: `dlp-profiles-list-all-profiles` · query: `all`

**Response** 200 → `result`

[array of]
(one of 3 variants; showing the first)
- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required** default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: any default: `low`
- `context_awareness`: any
- `created_at`: string **required** — When the profile was created.
- `data_classes`: string[] — Data classes associated with this profile.
  [array]
- `data_tags`: string[] — Data tags associated with this profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the profile (uuid).
- `name`: string **required** — The name of the profile.
- `ocr_enabled`: boolean **required** default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels associated with this profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `updated_at`: string **required** — When the profile was lasted updated.
- `type`: string **required** enum: `custom`

## GET /accounts/{account_id}/dlp/profiles/{profile_id}

Get DLP Profile

operationId: `dlp-profiles-get-dlp-profile`

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required** default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: any default: `low`
- `context_awareness`: any
- `created_at`: string **required** — When the profile was created.
- `data_classes`: string[] — Data classes associated with this profile.
  [array]
- `data_tags`: string[] — Data tags associated with this profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the profile (uuid).
- `name`: string **required** — The name of the profile.
- `ocr_enabled`: boolean **required** default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels associated with this profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `updated_at`: string **required** — When the profile was lasted updated.
- `type`: string **required** enum: `custom`

## GET /accounts/{account_id}/dlp/profiles/custom

List all custom profiles

operationId: `dlp-profiles-list-all-custom-profiles`

**Response** 200 → `result`

[array of]
- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required** default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: any default: `low`
- `context_awareness`: any
- `created_at`: string **required** — When the profile was created.
- `data_classes`: string[] — Data classes associated with this profile.
  [array]
- `data_tags`: string[] — Data tags associated with this profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the profile (uuid).
- `name`: string **required** — The name of the profile.
- `ocr_enabled`: boolean **required** default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels associated with this profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `updated_at`: string **required** — When the profile was lasted updated.

## POST /accounts/{account_id}/dlp/profiles/custom

Create custom profile

operationId: `dlp-profiles-create-custom-profiles`

**Request** (application/json)

- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: string default: `low`
- `context_awareness`: any
- `data_classes`: string[] — Data class IDs to associate with the profile.
  [array]
- `data_tags`: string[] — Data tag IDs to associate with the profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `description`: string
  - `enabled`: boolean **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
- `name`: string **required**
- `ocr_enabled`: boolean default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels to associate with the profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[] — Entries from other profiles (e.g. pre-defined Cloudflare profiles, or your Microsoft Information Protection profiles).
  [array of]
  - `enabled`: boolean **required**
  - `entry_id`: string **required**

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required** default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: any default: `low`
- `context_awareness`: any
- `created_at`: string **required** — When the profile was created.
- `data_classes`: string[] — Data classes associated with this profile.
  [array]
- `data_tags`: string[] — Data tags associated with this profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the profile (uuid).
- `name`: string **required** — The name of the profile.
- `ocr_enabled`: boolean **required** default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels associated with this profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `updated_at`: string **required** — When the profile was lasted updated.
- `type`: string **required** enum: `custom`

## DELETE /accounts/{account_id}/dlp/profiles/custom/{profile_id}

Delete custom profile

operationId: `dlp-profiles-delete-custom-profile`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/dlp/profiles/custom/{profile_id}

Get custom profile

operationId: `dlp-profiles-get-custom-profile`

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required** default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: any default: `low`
- `context_awareness`: any
- `created_at`: string **required** — When the profile was created.
- `data_classes`: string[] — Data classes associated with this profile.
  [array]
- `data_tags`: string[] — Data tags associated with this profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the profile (uuid).
- `name`: string **required** — The name of the profile.
- `ocr_enabled`: boolean **required** default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels associated with this profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `updated_at`: string **required** — When the profile was lasted updated.
- `type`: string **required** enum: `custom`

## PUT /accounts/{account_id}/dlp/profiles/custom/{profile_id}

Update custom profile

operationId: `dlp-profiles-update-custom-profile`

**Request** (application/json)

- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer
- `confidence_threshold`: string default: `low`
- `context_awareness`: any
- `data_classes`: string[] — Data class IDs to associate with the profile. If omitted, existing associations are unchanged.
  [array]
- `data_tags`: string[] — Data tag IDs to associate with the profile. If omitted, existing associations are unchanged.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[] — Custom entries from this profile.
  [array of]
  - `description`: string
  - `enabled`: boolean **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `entry_id`: string **required**
- `name`: string **required**
- `ocr_enabled`: boolean default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels to associate with the profile. If omitted, existing associations are unchanged.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[] — Other entries, e.g. predefined or integration.
  [array of]
  - `enabled`: boolean **required**
  - `entry_id`: string **required**

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required** default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: any default: `low`
- `context_awareness`: any
- `created_at`: string **required** — When the profile was created.
- `data_classes`: string[] — Data classes associated with this profile.
  [array]
- `data_tags`: string[] — Data tags associated with this profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the profile (uuid).
- `name`: string **required** — The name of the profile.
- `ocr_enabled`: boolean **required** default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels associated with this profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `updated_at`: string **required** — When the profile was lasted updated.
- `type`: string **required** enum: `custom`

## DELETE /accounts/{account_id}/dlp/profiles/integration/{profile_id}

Delete integration profile

operationId: `dlp-profiles-delete-integration-profile` · query: `recursive`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/dlp/profiles/integration/{profile_id}/references

List integration profile references

operationId: `dlp-profiles-list-integration-profile-references`

**Response** 200 → `result`

- `data_classes`: object[] **required** — Data classes that reference entries owned by this profile, sorted by ID.
  [array of]
  - `current_expression`: string **required** — The expression of the data class before the profile is deleted.
  - `id`: string **required** — The ID of the data class.
  - `name`: string **required** — The name of the data class.
  - `resulting_expression`: string **required** — The expression with every condition on this profile's entries removed, or `null` if no
- `entries`: object[] **required** — Entries owned by this profile, sorted by ID.
  [array of]
  - `id`: string **required** — The ID of the entry.
  - `name`: string **required** — The name of the entry.
  - `referenced_by_data_classes`: object[] **required** — Data classes that reference this entry, sorted by ID.
    [array of]
    - `id`: string **required** — The ID of the data class.
    - `name`: string **required** — The name of the data class.
  - `referenced_by_profiles`: object[] **required** — Other profiles that share this entry, sorted by ID.
    [array of]
    - `id`: string **required**
    - `name`: string **required**
- `integration_exists`: boolean **required** — Whether the integration that manages this profile still exists in CASB. The profile cannot

## POST /accounts/{account_id}/dlp/profiles/predefined

Create predefined profile

operationId: `dlp-profiles-create-predefined-profile`

**Request** (application/json)

- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer default: `0`
- `confidence_threshold`: string default: `low`
- `context_awareness`: any
- `entries`: object[]
  [array of]
  - `enabled`: boolean **required**
  - `id`: string **required**
- `ocr_enabled`: boolean default: `false`
- `profile_id`: string **required**

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required** default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: any default: `low`
- `context_awareness`: any
- `created_at`: string **required** — When the profile was created.
- `data_classes`: string[] — Data classes associated with this profile.
  [array]
- `data_tags`: string[] — Data tags associated with this profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the profile (uuid).
- `name`: string **required** — The name of the profile.
- `ocr_enabled`: boolean **required** default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels associated with this profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `updated_at`: string **required** — When the profile was lasted updated.
- `type`: string **required** enum: `custom`

## DELETE /accounts/{account_id}/dlp/profiles/predefined/{profile_id}

Delete predefined profile

operationId: `dlp-profiles-delete-predefined-profile`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/dlp/profiles/predefined/{profile_id}

Get predefined profile

operationId: `dlp-profiles-get-predefined-profile`

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required** default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: any default: `low`
- `context_awareness`: any
- `created_at`: string **required** — When the profile was created.
- `data_classes`: string[] — Data classes associated with this profile.
  [array]
- `data_tags`: string[] — Data tags associated with this profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the profile (uuid).
- `name`: string **required** — The name of the profile.
- `ocr_enabled`: boolean **required** default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels associated with this profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `updated_at`: string **required** — When the profile was lasted updated.
- `type`: string **required** enum: `custom`

## PUT /accounts/{account_id}/dlp/profiles/predefined/{profile_id}

Update predefined profile

operationId: `dlp-profiles-update-predefined-profile`

**Request** (application/json)

- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer default: `0`
- `confidence_threshold`: string default: `low`
- `context_awareness`: any
- `entries`: object[]
  [array of]
  - `enabled`: boolean **required**
  - `id`: string **required**
- `ocr_enabled`: boolean default: `false`

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required** default: `0` — Related DLP policies will trigger when the match count exceeds the number set.
- `confidence_threshold`: any default: `low`
- `context_awareness`: any
- `created_at`: string **required** — When the profile was created.
- `data_classes`: string[] — Data classes associated with this profile.
  [array]
- `data_tags`: string[] — Data tags associated with this profile.
  [array]
- `description`: string — The description of the profile.
- `entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the profile (uuid).
- `name`: string **required** — The name of the profile.
- `ocr_enabled`: boolean **required** default: `false`
- `sensitivity_levels`: object[] — Sensitivity levels associated with this profile.
  [array of]
  - `group_id`: string **required**
  - `level_id`: string **required**
- `shared_entries`: object[]
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `updated_at`: string **required** — When the profile was lasted updated.
- `type`: string **required** enum: `custom`

## GET /accounts/{account_id}/dlp/profiles/predefined/{profile_id}/config

Get predefined profile config

operationId: `dlp-profiles-get-predefined-profile-config`

**Response** 200 → `result`

- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required**
- `confidence_threshold`: string **required** default: `low`
- `enabled_entries`: string[] **required** — Entries to enable for this predefined profile. Any entries not provided will be disabled.
  [array]
- `entries`: object[] **required** — This field has been deprecated for `enabled_entries`.
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the predefined profile (uuid).
- `name`: string **required** — The name of the predefined profile.
- `ocr_enabled`: boolean default: `false`
- `open_access`: boolean — Whether this profile can be accessed by anyone.

## POST /accounts/{account_id}/dlp/profiles/predefined/{profile_id}/config

Create predefined profile

operationId: `dlp-profiles-create-predefined-profile-config`

**Request** (application/json)

- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer default: `0`
- `confidence_threshold`: string default: `low`
- `enabled_entries`: string[]
  [array]
- `entries`: object[]
  [array of]
  - `enabled`: boolean **required**
  - `id`: string **required**
- `ocr_enabled`: boolean default: `false`

**Response** 200 → `result`

- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required**
- `confidence_threshold`: string **required** default: `low`
- `enabled_entries`: string[] **required** — Entries to enable for this predefined profile. Any entries not provided will be disabled.
  [array]
- `entries`: object[] **required** — This field has been deprecated for `enabled_entries`.
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the predefined profile (uuid).
- `name`: string **required** — The name of the predefined profile.
- `ocr_enabled`: boolean default: `false`
- `open_access`: boolean — Whether this profile can be accessed by anyone.

## PUT /accounts/{account_id}/dlp/profiles/predefined/{profile_id}/config

Update predefined profile config

operationId: `dlp-profiles-update-predefined-profile-config`

**Request** (application/json)

- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer default: `0`
- `confidence_threshold`: string default: `low`
- `enabled_entries`: string[]
  [array]
- `entries`: object[]
  [array of]
  - `enabled`: boolean **required**
  - `id`: string **required**
- `ocr_enabled`: boolean default: `false`

**Response** 200 → `result`

- `ai_context_enabled`: boolean default: `false`
- `allowed_match_count`: integer **required**
- `confidence_threshold`: string **required** default: `low`
- `enabled_entries`: string[] **required** — Entries to enable for this predefined profile. Any entries not provided will be disabled.
  [array]
- `entries`: object[] **required** — This field has been deprecated for `enabled_entries`.
  [array of]
  - `created_at`: string **required**
  - `description`: string
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `name`: string **required**
  - `pattern`: object **required**
    - `regex`: string **required**
    - `validation`: any
  - `profile_id`: string
  - `updated_at`: string **required**
  - `validator_ids`: string[] — Validators this entry references, by id, at most 10. An empty list means the entry
    [array]
  - `type`: string **required** enum: `custom`
- `id`: string **required** — The id of the predefined profile (uuid).
- `name`: string **required** — The name of the predefined profile.
- `ocr_enabled`: boolean default: `false`
- `open_access`: boolean — Whether this profile can be accessed by anyone.
