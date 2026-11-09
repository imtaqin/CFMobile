# findings

10 endpoints.

## GET /accounts/{account_id}/data-security/posture/findings

List posture findings

operationId: `ListFindings` · query: `cursor`, `direction`, `ignored`, `integration_id`, `max_affliction_date`, `min_affliction_date`, `observation`, `order`, `page`, `per_page`, `product`, `search`, `severity`, `type`, `vendor`, `finding_type_ids`

**Response** 200 → `result`

[array of]
- `active_count`: integer **required** — Number of active problematic instances identified in the security finding.
- `archived_count`: integer **required** — Number of archived instances identified in the security finding.
- `finding`: object **required**
- `id`: string **required** — Base64 encoded identifier of the security finding.
- `ignored`: boolean **required** — Determines if finding is currently ignored.
- `instance_count`: integer **required** — Number of total (Active or archived) problematic instances identified in the security finding.
- `integration`: object **required** — Summary information about an integration.
  - `created`: string **required** — When entity was created.
  - `credential_health_status`: string enum: `Initializing`, `Healthy`, `Unhealthy` — Health status of integration credentials.
  - `credentials_expiry`: string — The date and time when the integration credentials will expire.
  - `id`: string — Integration ID.
  - `is_paused`: boolean default: `false` — Whether the given integration is paused by the user.
  - `last_hydrated`: string **required** — When were the integration credentials last updated.
  - `name`: string **required** — Name of the integration.
  - `permissions`: string[] **required** — The vendor-specific permissions associated with the integration.
    [array]
  - `policy`: object **required** — Policy configuration for an integration.
    - `client_id`: string — OAuth client ID for the policy.
    - `compliance_level`: string — Compliance level for the policy.
    - `dlp_enabled`: boolean — Whether DLP is enabled for this policy.
    - `id`: string — Policy identifier.
    - `link`: string — Link to policy documentation.
    - `name`: string — Policy name.
    - `permissions`: string[] — List of permissions included in the policy.
  - `status`: string **required** — Current status of the integration.
  - `updated`: string **required** — Last entity was updated.
  - `upgradable`: boolean **required** — Whether the integrations permissions can be updated.
  - `upgrade_dismissed`: boolean default: `false` — UI State as to whether a potential permissions upgrade has been dismissed.
  - `vendor`: object **required** — Information about a vendor/service provider.
    - `description`: string **required** — Detailed information about what kinds of issues are detected for this vendor.
    - `display_name`: string **required** — The display name of the vendor.
    - `id`: string **required** — The id of the vendor.
    - `logo`: string **required** — Logo URL for the vendor.
    - `name`: string **required** — The name of the vendor.
    - `policies`: object[] — The policies related to the vendor.
    - `static_logo`: string **required** — Static logo URL for the vendor.
    - `zt_enrollments`: string[] **required** — The vendor's compatible Zero Trust products.
  - `zt_enrollments`: object[] **required** — Zero Trust products associated with this integration.
    [array of]
    - `description`: string — Brief description of the Zero Trust Product.
    - `display_name`: string — The verbose name of the Zero Trust Product.
    - `enabled`: boolean default: `false` — Flag to enable/disable access to the listed integration from the corresponding Cloudflare product.
    - `id`: string — The internal identifier of the Zero Trust Product.
- `latest_affliction_date`: string **required** — Timestamp of the latest affliction date of an active finding.
- `severity_override`: object — Override information for finding severity.
  - `created_by`: string **required** — User ID who created the override.
  - `severity`: string **required** enum: `Critical`, `High`, `Medium`, `Low` — The severity level of a finding.

## GET /accounts/{account_id}/data-security/posture/findings/{finding_id}

Get a posture finding

operationId: `GetFinding`

**Response** 200 → `result`

- `active_count`: integer **required** — Number of active problematic instances identified in the security finding.
- `archived_count`: integer **required** — Number of archived instances identified in the security finding.
- `finding`: object **required**
- `id`: string **required** — Base64 encoded identifier of the security finding.
- `ignored`: boolean **required** — Determines if finding is currently ignored.
- `instance_count`: integer **required** — Number of total (Active or archived) problematic instances identified in the security finding.
- `integration`: object **required** — Summary information about an integration.
  - `created`: string **required** — When entity was created.
  - `credential_health_status`: string enum: `Initializing`, `Healthy`, `Unhealthy` — Health status of integration credentials.
  - `credentials_expiry`: string — The date and time when the integration credentials will expire.
  - `id`: string — Integration ID.
  - `is_paused`: boolean default: `false` — Whether the given integration is paused by the user.
  - `last_hydrated`: string **required** — When were the integration credentials last updated.
  - `name`: string **required** — Name of the integration.
  - `permissions`: string[] **required** — The vendor-specific permissions associated with the integration.
    [array]
  - `policy`: object **required** — Policy configuration for an integration.
    - `client_id`: string — OAuth client ID for the policy.
    - `compliance_level`: string — Compliance level for the policy.
    - `dlp_enabled`: boolean — Whether DLP is enabled for this policy.
    - `id`: string — Policy identifier.
    - `link`: string — Link to policy documentation.
    - `name`: string — Policy name.
    - `permissions`: string[] — List of permissions included in the policy.
  - `status`: string **required** — Current status of the integration.
  - `updated`: string **required** — Last entity was updated.
  - `upgradable`: boolean **required** — Whether the integrations permissions can be updated.
  - `upgrade_dismissed`: boolean default: `false` — UI State as to whether a potential permissions upgrade has been dismissed.
  - `vendor`: object **required** — Information about a vendor/service provider.
    - `description`: string **required** — Detailed information about what kinds of issues are detected for this vendor.
    - `display_name`: string **required** — The display name of the vendor.
    - `id`: string **required** — The id of the vendor.
    - `logo`: string **required** — Logo URL for the vendor.
    - `name`: string **required** — The name of the vendor.
    - `policies`: object[] — The policies related to the vendor.
    - `static_logo`: string **required** — Static logo URL for the vendor.
    - `zt_enrollments`: string[] **required** — The vendor's compatible Zero Trust products.
  - `zt_enrollments`: object[] **required** — Zero Trust products associated with this integration.
    [array of]
    - `description`: string — Brief description of the Zero Trust Product.
    - `display_name`: string — The verbose name of the Zero Trust Product.
    - `enabled`: boolean default: `false` — Flag to enable/disable access to the listed integration from the corresponding Cloudflare product.
    - `id`: string — The internal identifier of the Zero Trust Product.
- `latest_affliction_date`: string **required** — Timestamp of the latest affliction date of an active finding.
- `severity_override`: object — Override information for finding severity.
  - `created_by`: string **required** — User ID who created the override.
  - `severity`: string **required** enum: `Critical`, `High`, `Medium`, `Low` — The severity level of a finding.

## GET /accounts/{account_id}/data-security/posture/findings/{finding_id}/instances

List instances of a finding

operationId: `ListFindingInstances` · query: `archived`, `cursor`, `direction`, `max_affliction_date`, `min_affliction_date`, `order`, `page`, `per_page`, `search`, `remediation_statuses`, `finding_instance_ids`, `asset_ids`

**Response** 200 → `result`

[array of]
- `affliction_date`: string **required** — When this specific instance was identified.
- `asset`: object **required** — Asset information including metadata and categorization.
  - `category`: object **required** — Category information for an asset.
    - `id`: string — Unique identifier for the asset category.
    - `service`: string **required** — The specific service within the vendor the asset is part of (often none). Example - AWS is the vendor, S3 is the service.
    - `type`: string **required** — The type of asset.
    - `vendor`: string **required** — The vendor the asset is part of.
  - `external_id`: string **required** — External identifier from the source system.
  - `fields`: object[] **required** — The fields associated with the asset.
    [array of]
    - `link`: string — Optional link associated with the field.
    - `name`: string **required** — The name of the field.
    - `value`: string **required** — The value of the field.
  - `id`: string — Unique identifier for the asset.
  - `link`: string — Direct link to the asset.
  - `name`: string **required** — Human-readable name of the asset.
  - `updated`: string — Timestamp of the asset row version represented by this data.
- `dlp_contexts`: object[] **required** — DLP context information if this is a content finding.
  [array of]
  - `created`: string **required** — When the DLP context was created.
  - `deleted`: string — When the DLP context was deleted.
  - `entry_ids`: string[] **required** — DLP Entry IDs.
    [array]
  - `id`: string — Unique identifier for the DLP context.
  - `match_context_max_extent`: integer — DLP Right Boundary of match context.
  - `match_context_min_extent`: integer — DLP Left Boundary of match context.
  - `match_context_payload`: object — DLP Match context payload that matched the profile in question.
  - `profile_id`: string **required** — DLP Profile ID.
  - `updated`: string **required** — When the DLP context was last updated.
- `id`: string — Unique identifier for the finding instance.
- `is_archived`: boolean default: `false` — Whether this finding instance has been archived.
- `remediations`: object[] **required** — A list of the 10 most recent remediation jobs for this finding instance, ordered by creation time (most recent first). The 'stale' field ind
  [array of]
  - `created_at`: string **required** — When the remediation job was created.
  - `id`: string **required** — Unique identifier for the remediation job.
  - `stale`: boolean **required** — Whether this remediation job is stale (created before the finding instance's affliction_date).
  - `status`: string **required** enum: `pending`, `processing`, `completed`, `failed`, `validating` — Status of a remediation job.
- `webhooks`: object[] **required** — The most recent webhook job invocation for each webhook configuration associated with this finding instance. Each entry represents the lates
  [array of]
  - `latest_job`: object **required** — The most recent webhook job for this webhook configuration.
    - `created_at`: string **required** — When the webhook job was created.
    - `id`: string **required** — Unique identifier for the webhook job.
    - `stale`: boolean **required** — Whether this webhook job is stale (created before the finding instance's current affliction_date).
    - `status`: string **required** enum: `pending`, `processing`, `completed` — Current status of the webhook job.
  - `webhook_id`: string **required** — Unique identifier for the webhook configuration.
  - `webhook_label`: string **required** — Account-specified display label for the webhook configuration.

## GET /accounts/{account_id}/data-security/posture/findings/{finding_id}/instances/{instance_id}

Get a finding instance using an instance ID

operationId: `GetFindingInstance`

**Response** 200 → `result`

- `affliction_date`: string **required** — When this specific instance was identified.
- `asset`: object **required** — Asset information including metadata and categorization.
  - `category`: object **required** — Category information for an asset.
    - `id`: string — Unique identifier for the asset category.
    - `service`: string **required** — The specific service within the vendor the asset is part of (often none). Example - AWS is the vendor, S3 is the service.
    - `type`: string **required** — The type of asset.
    - `vendor`: string **required** — The vendor the asset is part of.
  - `external_id`: string **required** — External identifier from the source system.
  - `fields`: object[] **required** — The fields associated with the asset.
    [array of]
    - `link`: string — Optional link associated with the field.
    - `name`: string **required** — The name of the field.
    - `value`: string **required** — The value of the field.
  - `id`: string — Unique identifier for the asset.
  - `link`: string — Direct link to the asset.
  - `name`: string **required** — Human-readable name of the asset.
  - `updated`: string — Timestamp of the asset row version represented by this data.
- `dlp_contexts`: object[] **required** — DLP context information if this is a content finding.
  [array of]
  - `created`: string **required** — When the DLP context was created.
  - `deleted`: string — When the DLP context was deleted.
  - `entry_ids`: string[] **required** — DLP Entry IDs.
    [array]
  - `id`: string — Unique identifier for the DLP context.
  - `match_context_max_extent`: integer — DLP Right Boundary of match context.
  - `match_context_min_extent`: integer — DLP Left Boundary of match context.
  - `match_context_payload`: object — DLP Match context payload that matched the profile in question.
  - `profile_id`: string **required** — DLP Profile ID.
  - `updated`: string **required** — When the DLP context was last updated.
- `id`: string — Unique identifier for the finding instance.
- `is_archived`: boolean default: `false` — Whether this finding instance has been archived.
- `remediations`: object[] **required** — A list of the 10 most recent remediation jobs for this finding instance, ordered by creation time (most recent first). The 'stale' field ind
  [array of]
  - `created_at`: string **required** — When the remediation job was created.
  - `id`: string **required** — Unique identifier for the remediation job.
  - `stale`: boolean **required** — Whether this remediation job is stale (created before the finding instance's affliction_date).
  - `status`: string **required** enum: `pending`, `processing`, `completed`, `failed`, `validating` — Status of a remediation job.
- `webhooks`: object[] **required** — The most recent webhook job invocation for each webhook configuration associated with this finding instance. Each entry represents the lates
  [array of]
  - `latest_job`: object **required** — The most recent webhook job for this webhook configuration.
    - `created_at`: string **required** — When the webhook job was created.
    - `id`: string **required** — Unique identifier for the webhook job.
    - `stale`: boolean **required** — Whether this webhook job is stale (created before the finding instance's current affliction_date).
    - `status`: string **required** enum: `pending`, `processing`, `completed` — Current status of the webhook job.
  - `webhook_id`: string **required** — Unique identifier for the webhook configuration.
  - `webhook_label`: string **required** — Account-specified display label for the webhook configuration.

## POST /accounts/{account_id}/data-security/posture/findings/{finding_id}/instances/archive

Archive a finding

operationId: `ArchiveFindingInstance`

**Request** (application/json)

- `check_instances`: string[] **required** — A list of finding instance IDs to pass along.
  [array]

**Response** 200 → `result`

- `affliction_date`: string **required** — When this specific instance was identified.
- `asset`: object **required** — Asset information including metadata and categorization.
  - `category`: object **required** — Category information for an asset.
    - `id`: string — Unique identifier for the asset category.
    - `service`: string **required** — The specific service within the vendor the asset is part of (often none). Example - AWS is the vendor, S3 is the service.
    - `type`: string **required** — The type of asset.
    - `vendor`: string **required** — The vendor the asset is part of.
  - `external_id`: string **required** — External identifier from the source system.
  - `fields`: object[] **required** — The fields associated with the asset.
    [array of]
    - `link`: string — Optional link associated with the field.
    - `name`: string **required** — The name of the field.
    - `value`: string **required** — The value of the field.
  - `id`: string — Unique identifier for the asset.
  - `link`: string — Direct link to the asset.
  - `name`: string **required** — Human-readable name of the asset.
  - `updated`: string — Timestamp of the asset row version represented by this data.
- `dlp_contexts`: object[] **required** — DLP context information if this is a content finding.
  [array of]
  - `created`: string **required** — When the DLP context was created.
  - `deleted`: string — When the DLP context was deleted.
  - `entry_ids`: string[] **required** — DLP Entry IDs.
    [array]
  - `id`: string — Unique identifier for the DLP context.
  - `match_context_max_extent`: integer — DLP Right Boundary of match context.
  - `match_context_min_extent`: integer — DLP Left Boundary of match context.
  - `match_context_payload`: object — DLP Match context payload that matched the profile in question.
  - `profile_id`: string **required** — DLP Profile ID.
  - `updated`: string **required** — When the DLP context was last updated.
- `id`: string — Unique identifier for the finding instance.
- `is_archived`: boolean default: `false` — Whether this finding instance has been archived.
- `remediations`: object[] **required** — A list of the 10 most recent remediation jobs for this finding instance, ordered by creation time (most recent first). The 'stale' field ind
  [array of]
  - `created_at`: string **required** — When the remediation job was created.
  - `id`: string **required** — Unique identifier for the remediation job.
  - `stale`: boolean **required** — Whether this remediation job is stale (created before the finding instance's affliction_date).
  - `status`: string **required** enum: `pending`, `processing`, `completed`, `failed`, `validating` — Status of a remediation job.
- `webhooks`: object[] **required** — The most recent webhook job invocation for each webhook configuration associated with this finding instance. Each entry represents the lates
  [array of]
  - `latest_job`: object **required** — The most recent webhook job for this webhook configuration.
    - `created_at`: string **required** — When the webhook job was created.
    - `id`: string **required** — Unique identifier for the webhook job.
    - `stale`: boolean **required** — Whether this webhook job is stale (created before the finding instance's current affliction_date).
    - `status`: string **required** enum: `pending`, `processing`, `completed` — Current status of the webhook job.
  - `webhook_id`: string **required** — Unique identifier for the webhook configuration.
  - `webhook_label`: string **required** — Account-specified display label for the webhook configuration.

## POST /accounts/{account_id}/data-security/posture/findings/{finding_id}/instances/unarchive

Remove the archive marking from a finding instance

operationId: `UnarchiveFindingInstance`

**Request** (application/json)

- `check_instances`: string[] **required** — A list of finding instance IDs to pass along.
  [array]

**Response** 200 → `result`

- `affliction_date`: string **required** — When this specific instance was identified.
- `asset`: object **required** — Asset information including metadata and categorization.
  - `category`: object **required** — Category information for an asset.
    - `id`: string — Unique identifier for the asset category.
    - `service`: string **required** — The specific service within the vendor the asset is part of (often none). Example - AWS is the vendor, S3 is the service.
    - `type`: string **required** — The type of asset.
    - `vendor`: string **required** — The vendor the asset is part of.
  - `external_id`: string **required** — External identifier from the source system.
  - `fields`: object[] **required** — The fields associated with the asset.
    [array of]
    - `link`: string — Optional link associated with the field.
    - `name`: string **required** — The name of the field.
    - `value`: string **required** — The value of the field.
  - `id`: string — Unique identifier for the asset.
  - `link`: string — Direct link to the asset.
  - `name`: string **required** — Human-readable name of the asset.
  - `updated`: string — Timestamp of the asset row version represented by this data.
- `dlp_contexts`: object[] **required** — DLP context information if this is a content finding.
  [array of]
  - `created`: string **required** — When the DLP context was created.
  - `deleted`: string — When the DLP context was deleted.
  - `entry_ids`: string[] **required** — DLP Entry IDs.
    [array]
  - `id`: string — Unique identifier for the DLP context.
  - `match_context_max_extent`: integer — DLP Right Boundary of match context.
  - `match_context_min_extent`: integer — DLP Left Boundary of match context.
  - `match_context_payload`: object — DLP Match context payload that matched the profile in question.
  - `profile_id`: string **required** — DLP Profile ID.
  - `updated`: string **required** — When the DLP context was last updated.
- `id`: string — Unique identifier for the finding instance.
- `is_archived`: boolean default: `false` — Whether this finding instance has been archived.
- `remediations`: object[] **required** — A list of the 10 most recent remediation jobs for this finding instance, ordered by creation time (most recent first). The 'stale' field ind
  [array of]
  - `created_at`: string **required** — When the remediation job was created.
  - `id`: string **required** — Unique identifier for the remediation job.
  - `stale`: boolean **required** — Whether this remediation job is stale (created before the finding instance's affliction_date).
  - `status`: string **required** enum: `pending`, `processing`, `completed`, `failed`, `validating` — Status of a remediation job.
- `webhooks`: object[] **required** — The most recent webhook job invocation for each webhook configuration associated with this finding instance. Each entry represents the lates
  [array of]
  - `latest_job`: object **required** — The most recent webhook job for this webhook configuration.
    - `created_at`: string **required** — When the webhook job was created.
    - `id`: string **required** — Unique identifier for the webhook job.
    - `stale`: boolean **required** — Whether this webhook job is stale (created before the finding instance's current affliction_date).
    - `status`: string **required** enum: `pending`, `processing`, `completed` — Current status of the webhook job.
  - `webhook_id`: string **required** — Unique identifier for the webhook configuration.
  - `webhook_label`: string **required** — Account-specified display label for the webhook configuration.

## POST /accounts/{account_id}/data-security/posture/findings/{finding_id}/reset_finding_severity

Reset severity for a finding back to the default

operationId: `ResetFindingSeverity`

**Response** 200 → `result`

- `active_count`: integer **required** — Number of active problematic instances identified in the security finding.
- `archived_count`: integer **required** — Number of archived instances identified in the security finding.
- `finding`: object **required**
- `id`: string **required** — Base64 encoded identifier of the security finding.
- `ignored`: boolean **required** — Determines if finding is currently ignored.
- `instance_count`: integer **required** — Number of total (Active or archived) problematic instances identified in the security finding.
- `integration`: object **required** — Summary information about an integration.
  - `created`: string **required** — When entity was created.
  - `credential_health_status`: string enum: `Initializing`, `Healthy`, `Unhealthy` — Health status of integration credentials.
  - `credentials_expiry`: string — The date and time when the integration credentials will expire.
  - `id`: string — Integration ID.
  - `is_paused`: boolean default: `false` — Whether the given integration is paused by the user.
  - `last_hydrated`: string **required** — When were the integration credentials last updated.
  - `name`: string **required** — Name of the integration.
  - `permissions`: string[] **required** — The vendor-specific permissions associated with the integration.
    [array]
  - `policy`: object **required** — Policy configuration for an integration.
    - `client_id`: string — OAuth client ID for the policy.
    - `compliance_level`: string — Compliance level for the policy.
    - `dlp_enabled`: boolean — Whether DLP is enabled for this policy.
    - `id`: string — Policy identifier.
    - `link`: string — Link to policy documentation.
    - `name`: string — Policy name.
    - `permissions`: string[] — List of permissions included in the policy.
  - `status`: string **required** — Current status of the integration.
  - `updated`: string **required** — Last entity was updated.
  - `upgradable`: boolean **required** — Whether the integrations permissions can be updated.
  - `upgrade_dismissed`: boolean default: `false` — UI State as to whether a potential permissions upgrade has been dismissed.
  - `vendor`: object **required** — Information about a vendor/service provider.
    - `description`: string **required** — Detailed information about what kinds of issues are detected for this vendor.
    - `display_name`: string **required** — The display name of the vendor.
    - `id`: string **required** — The id of the vendor.
    - `logo`: string **required** — Logo URL for the vendor.
    - `name`: string **required** — The name of the vendor.
    - `policies`: object[] — The policies related to the vendor.
    - `static_logo`: string **required** — Static logo URL for the vendor.
    - `zt_enrollments`: string[] **required** — The vendor's compatible Zero Trust products.
  - `zt_enrollments`: object[] **required** — Zero Trust products associated with this integration.
    [array of]
    - `description`: string — Brief description of the Zero Trust Product.
    - `display_name`: string — The verbose name of the Zero Trust Product.
    - `enabled`: boolean default: `false` — Flag to enable/disable access to the listed integration from the corresponding Cloudflare product.
    - `id`: string — The internal identifier of the Zero Trust Product.
- `latest_affliction_date`: string **required** — Timestamp of the latest affliction date of an active finding.
- `severity_override`: object — Override information for finding severity.
  - `created_by`: string **required** — User ID who created the override.
  - `severity`: string **required** enum: `Critical`, `High`, `Medium`, `Low` — The severity level of a finding.

## POST /accounts/{account_id}/data-security/posture/findings/{finding_id}/tune_finding_severity

Update the severity for a finding

operationId: `ChangeFindingSeverity`

**Request** (application/json)

- `new_severity`: integer **required** enum: `1`, `2`, `3`, `4` — The numeric severity value to apply to the finding.

**Response** 200 → `result`

- `active_count`: integer **required** — Number of active problematic instances identified in the security finding.
- `archived_count`: integer **required** — Number of archived instances identified in the security finding.
- `finding`: object **required**
- `id`: string **required** — Base64 encoded identifier of the security finding.
- `ignored`: boolean **required** — Determines if finding is currently ignored.
- `instance_count`: integer **required** — Number of total (Active or archived) problematic instances identified in the security finding.
- `integration`: object **required** — Summary information about an integration.
  - `created`: string **required** — When entity was created.
  - `credential_health_status`: string enum: `Initializing`, `Healthy`, `Unhealthy` — Health status of integration credentials.
  - `credentials_expiry`: string — The date and time when the integration credentials will expire.
  - `id`: string — Integration ID.
  - `is_paused`: boolean default: `false` — Whether the given integration is paused by the user.
  - `last_hydrated`: string **required** — When were the integration credentials last updated.
  - `name`: string **required** — Name of the integration.
  - `permissions`: string[] **required** — The vendor-specific permissions associated with the integration.
    [array]
  - `policy`: object **required** — Policy configuration for an integration.
    - `client_id`: string — OAuth client ID for the policy.
    - `compliance_level`: string — Compliance level for the policy.
    - `dlp_enabled`: boolean — Whether DLP is enabled for this policy.
    - `id`: string — Policy identifier.
    - `link`: string — Link to policy documentation.
    - `name`: string — Policy name.
    - `permissions`: string[] — List of permissions included in the policy.
  - `status`: string **required** — Current status of the integration.
  - `updated`: string **required** — Last entity was updated.
  - `upgradable`: boolean **required** — Whether the integrations permissions can be updated.
  - `upgrade_dismissed`: boolean default: `false` — UI State as to whether a potential permissions upgrade has been dismissed.
  - `vendor`: object **required** — Information about a vendor/service provider.
    - `description`: string **required** — Detailed information about what kinds of issues are detected for this vendor.
    - `display_name`: string **required** — The display name of the vendor.
    - `id`: string **required** — The id of the vendor.
    - `logo`: string **required** — Logo URL for the vendor.
    - `name`: string **required** — The name of the vendor.
    - `policies`: object[] — The policies related to the vendor.
    - `static_logo`: string **required** — Static logo URL for the vendor.
    - `zt_enrollments`: string[] **required** — The vendor's compatible Zero Trust products.
  - `zt_enrollments`: object[] **required** — Zero Trust products associated with this integration.
    [array of]
    - `description`: string — Brief description of the Zero Trust Product.
    - `display_name`: string — The verbose name of the Zero Trust Product.
    - `enabled`: boolean default: `false` — Flag to enable/disable access to the listed integration from the corresponding Cloudflare product.
    - `id`: string — The internal identifier of the Zero Trust Product.
- `latest_affliction_date`: string **required** — Timestamp of the latest affliction date of an active finding.
- `severity_override`: object — Override information for finding severity.
  - `created_by`: string **required** — User ID who created the override.
  - `severity`: string **required** enum: `Critical`, `High`, `Medium`, `Low` — The severity level of a finding.

## POST /accounts/{account_id}/data-security/posture/findings/ignore

Mark a finding as ignored

operationId: `IgnoreFinding`

**Request** (application/json)

- `checks`: string[] **required** — A list of finding IDs to pass along.
  [array]

**Response** 200 → `result`

- `active_count`: integer **required** — Number of active problematic instances identified in the security finding.
- `archived_count`: integer **required** — Number of archived instances identified in the security finding.
- `finding`: object **required**
- `id`: string **required** — Base64 encoded identifier of the security finding.
- `ignored`: boolean **required** — Determines if finding is currently ignored.
- `instance_count`: integer **required** — Number of total (Active or archived) problematic instances identified in the security finding.
- `integration`: object **required** — Summary information about an integration.
  - `created`: string **required** — When entity was created.
  - `credential_health_status`: string enum: `Initializing`, `Healthy`, `Unhealthy` — Health status of integration credentials.
  - `credentials_expiry`: string — The date and time when the integration credentials will expire.
  - `id`: string — Integration ID.
  - `is_paused`: boolean default: `false` — Whether the given integration is paused by the user.
  - `last_hydrated`: string **required** — When were the integration credentials last updated.
  - `name`: string **required** — Name of the integration.
  - `permissions`: string[] **required** — The vendor-specific permissions associated with the integration.
    [array]
  - `policy`: object **required** — Policy configuration for an integration.
    - `client_id`: string — OAuth client ID for the policy.
    - `compliance_level`: string — Compliance level for the policy.
    - `dlp_enabled`: boolean — Whether DLP is enabled for this policy.
    - `id`: string — Policy identifier.
    - `link`: string — Link to policy documentation.
    - `name`: string — Policy name.
    - `permissions`: string[] — List of permissions included in the policy.
  - `status`: string **required** — Current status of the integration.
  - `updated`: string **required** — Last entity was updated.
  - `upgradable`: boolean **required** — Whether the integrations permissions can be updated.
  - `upgrade_dismissed`: boolean default: `false` — UI State as to whether a potential permissions upgrade has been dismissed.
  - `vendor`: object **required** — Information about a vendor/service provider.
    - `description`: string **required** — Detailed information about what kinds of issues are detected for this vendor.
    - `display_name`: string **required** — The display name of the vendor.
    - `id`: string **required** — The id of the vendor.
    - `logo`: string **required** — Logo URL for the vendor.
    - `name`: string **required** — The name of the vendor.
    - `policies`: object[] — The policies related to the vendor.
    - `static_logo`: string **required** — Static logo URL for the vendor.
    - `zt_enrollments`: string[] **required** — The vendor's compatible Zero Trust products.
  - `zt_enrollments`: object[] **required** — Zero Trust products associated with this integration.
    [array of]
    - `description`: string — Brief description of the Zero Trust Product.
    - `display_name`: string — The verbose name of the Zero Trust Product.
    - `enabled`: boolean default: `false` — Flag to enable/disable access to the listed integration from the corresponding Cloudflare product.
    - `id`: string — The internal identifier of the Zero Trust Product.
- `latest_affliction_date`: string **required** — Timestamp of the latest affliction date of an active finding.
- `severity_override`: object — Override information for finding severity.
  - `created_by`: string **required** — User ID who created the override.
  - `severity`: string **required** enum: `Critical`, `High`, `Medium`, `Low` — The severity level of a finding.

## POST /accounts/{account_id}/data-security/posture/findings/unignore

Remove ignore marker from a finding

operationId: `UnIgnoreFinding`

**Request** (application/json)

- `checks`: string[] **required** — A list of finding IDs to pass along.
  [array]

**Response** 200 → `result`

- `active_count`: integer **required** — Number of active problematic instances identified in the security finding.
- `archived_count`: integer **required** — Number of archived instances identified in the security finding.
- `finding`: object **required**
- `id`: string **required** — Base64 encoded identifier of the security finding.
- `ignored`: boolean **required** — Determines if finding is currently ignored.
- `instance_count`: integer **required** — Number of total (Active or archived) problematic instances identified in the security finding.
- `integration`: object **required** — Summary information about an integration.
  - `created`: string **required** — When entity was created.
  - `credential_health_status`: string enum: `Initializing`, `Healthy`, `Unhealthy` — Health status of integration credentials.
  - `credentials_expiry`: string — The date and time when the integration credentials will expire.
  - `id`: string — Integration ID.
  - `is_paused`: boolean default: `false` — Whether the given integration is paused by the user.
  - `last_hydrated`: string **required** — When were the integration credentials last updated.
  - `name`: string **required** — Name of the integration.
  - `permissions`: string[] **required** — The vendor-specific permissions associated with the integration.
    [array]
  - `policy`: object **required** — Policy configuration for an integration.
    - `client_id`: string — OAuth client ID for the policy.
    - `compliance_level`: string — Compliance level for the policy.
    - `dlp_enabled`: boolean — Whether DLP is enabled for this policy.
    - `id`: string — Policy identifier.
    - `link`: string — Link to policy documentation.
    - `name`: string — Policy name.
    - `permissions`: string[] — List of permissions included in the policy.
  - `status`: string **required** — Current status of the integration.
  - `updated`: string **required** — Last entity was updated.
  - `upgradable`: boolean **required** — Whether the integrations permissions can be updated.
  - `upgrade_dismissed`: boolean default: `false` — UI State as to whether a potential permissions upgrade has been dismissed.
  - `vendor`: object **required** — Information about a vendor/service provider.
    - `description`: string **required** — Detailed information about what kinds of issues are detected for this vendor.
    - `display_name`: string **required** — The display name of the vendor.
    - `id`: string **required** — The id of the vendor.
    - `logo`: string **required** — Logo URL for the vendor.
    - `name`: string **required** — The name of the vendor.
    - `policies`: object[] — The policies related to the vendor.
    - `static_logo`: string **required** — Static logo URL for the vendor.
    - `zt_enrollments`: string[] **required** — The vendor's compatible Zero Trust products.
  - `zt_enrollments`: object[] **required** — Zero Trust products associated with this integration.
    [array of]
    - `description`: string — Brief description of the Zero Trust Product.
    - `display_name`: string — The verbose name of the Zero Trust Product.
    - `enabled`: boolean default: `false` — Flag to enable/disable access to the listed integration from the corresponding Cloudflare product.
    - `id`: string — The internal identifier of the Zero Trust Product.
- `latest_affliction_date`: string **required** — Timestamp of the latest affliction date of an active finding.
- `severity_override`: object — Override information for finding severity.
  - `created_by`: string **required** — User ID who created the override.
  - `severity`: string **required** enum: `Critical`, `High`, `Medium`, `Low` — The severity level of a finding.
