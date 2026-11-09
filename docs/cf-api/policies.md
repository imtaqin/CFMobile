# policies

6 endpoints.

## GET /accounts/{account_id}/data-security/posture/policies

List policy configurations

operationId: `ListPolicies` · query: `cursor`

**Response** 200 → `result`

[array of]
- `actions`: object **required** — The actions configured for this policy.
  - `remediation_types`: object[] **required** — List of remediation types that will be executed.
    [array of]
    - `display_name`: string **required** — Display name/label of the remediation type.
    - `remediation_type`: string **required** — The system name of the remediation type.
    - `remediation_type_id`: string **required** — Unique identifier for the remediation type.
  - `webhook_configs`: object[] **required** — List of webhook configurations that will be triggered.
    [array of]
    - `display_name`: string **required** — Display name/label of the webhook configuration.
    - `webhook_config_id`: string **required** — Unique identifier for the webhook configuration.
- `applies_to_all_integrations`: boolean **required** — When true, the policy applies to all integrations for the account. When false, it applies only to the specified integration_ids.
- `created_at`: string **required** — Timestamp when the policy was created.
- `description`: string **required** — User-set description of what this policy does. Limited to 1000 characters.
- `disabled_at`: string — Timestamp when the policy was disabled. Omitted from the response when the policy
- `display_name`: string **required** — Display name for the policy configuration. Limited to 255 characters.
- `enabled`: boolean **required** — Whether the policy is enabled. Derived from disabled_at (enabled when disabled_at is unset).
- `finding_type_id`: string **required** — The finding type this policy is associated with. Immutable after creation; attempts to change it via update are rejected.
- `id`: string **required** — Unique identifier for the policy configuration.
- `integration_ids`: string[] **required** — The integrations this policy applies to.
  [array]
- `last_triggered_at`: string — Timestamp of the most recent successful policy invocation. Omitted
- `updated_at`: string **required** — Timestamp when the policy was last updated.

## POST /accounts/{account_id}/data-security/posture/policies

Create a new policy configuration

operationId: `CreatePolicy`

**Request** (application/json)

- `actions`: object **required** — Actions to execute when this policy is triggered, grouped by action type.
  - `remediation_types`: object[] — Remediation actions to execute (at most one).
    [array of]
    - `remediation_type_id`: string **required** — The ID of the remediation type to execute.
  - `webhook_configs`: object[] — Webhook actions to execute.
    [array of]
    - `webhook_config_id`: string **required** — The ID of the webhook configuration to use.
- `applies_to_all_integrations`: boolean **required** — When true, the policy applies to all integrations for the account. When false, integration_ids must be provided.
- `description`: string — Optional description of what this policy does.
- `display_name`: string **required** — Display name for the policy configuration.
- `enabled`: boolean **required** — Boolean specifying if the policy is enabled or disabled.
- `finding_type_id`: string **required** — The finding type this policy is associated with. All remediation actions must match this finding type.
- `integration_ids`: string[] — The integrations this policy applies to. Required when applies_to_all_integrations is false.
  [array]

**Response** 200 → `result`

- `actions`: object **required** — The actions configured for this policy.
  - `remediation_types`: object[] **required** — List of remediation types that will be executed.
    [array of]
    - `display_name`: string **required** — Display name/label of the remediation type.
    - `remediation_type`: string **required** — The system name of the remediation type.
    - `remediation_type_id`: string **required** — Unique identifier for the remediation type.
  - `webhook_configs`: object[] **required** — List of webhook configurations that will be triggered.
    [array of]
    - `display_name`: string **required** — Display name/label of the webhook configuration.
    - `webhook_config_id`: string **required** — Unique identifier for the webhook configuration.
- `applies_to_all_integrations`: boolean **required** — When true, the policy applies to all integrations for the account. When false, it applies only to the specified integration_ids.
- `created_at`: string **required** — Timestamp when the policy was created.
- `description`: string **required** — User-set description of what this policy does. Limited to 1000 characters.
- `disabled_at`: string — Timestamp when the policy was disabled. Omitted from the response when the policy
- `display_name`: string **required** — Display name for the policy configuration. Limited to 255 characters.
- `enabled`: boolean **required** — Whether the policy is enabled. Derived from disabled_at (enabled when disabled_at is unset).
- `finding_type_id`: string **required** — The finding type this policy is associated with. Immutable after creation; attempts to change it via update are rejected.
- `id`: string **required** — Unique identifier for the policy configuration.
- `integration_ids`: string[] **required** — The integrations this policy applies to.
  [array]
- `last_triggered_at`: string — Timestamp of the most recent successful policy invocation. Omitted
- `updated_at`: string **required** — Timestamp when the policy was last updated.

## DELETE /accounts/{account_id}/data-security/posture/policies/{policy_id}

Delete a policy configuration

operationId: `DeletePolicy`

**Response** 200 → `result`

- `id`: string **required** — ID of the policy deleted.

## GET /accounts/{account_id}/data-security/posture/policies/{policy_id}

Get a policy configuration by ID

operationId: `GetPolicyByID`

**Response** 200 → `result`

- `actions`: object **required** — The actions configured for this policy.
  - `remediation_types`: object[] **required** — List of remediation types that will be executed.
    [array of]
    - `display_name`: string **required** — Display name/label of the remediation type.
    - `remediation_type`: string **required** — The system name of the remediation type.
    - `remediation_type_id`: string **required** — Unique identifier for the remediation type.
  - `webhook_configs`: object[] **required** — List of webhook configurations that will be triggered.
    [array of]
    - `display_name`: string **required** — Display name/label of the webhook configuration.
    - `webhook_config_id`: string **required** — Unique identifier for the webhook configuration.
- `applies_to_all_integrations`: boolean **required** — When true, the policy applies to all integrations for the account. When false, it applies only to the specified integration_ids.
- `created_at`: string **required** — Timestamp when the policy was created.
- `description`: string **required** — User-set description of what this policy does. Limited to 1000 characters.
- `disabled_at`: string — Timestamp when the policy was disabled. Omitted from the response when the policy
- `display_name`: string **required** — Display name for the policy configuration. Limited to 255 characters.
- `enabled`: boolean **required** — Whether the policy is enabled. Derived from disabled_at (enabled when disabled_at is unset).
- `finding_type_id`: string **required** — The finding type this policy is associated with. Immutable after creation; attempts to change it via update are rejected.
- `id`: string **required** — Unique identifier for the policy configuration.
- `integration_ids`: string[] **required** — The integrations this policy applies to.
  [array]
- `last_triggered_at`: string — Timestamp of the most recent successful policy invocation. Omitted
- `updated_at`: string **required** — Timestamp when the policy was last updated.

## PUT /accounts/{account_id}/data-security/posture/policies/{policy_id}

Update a policy configuration

operationId: `UpdatePolicy`

**Request** (application/json)

- `actions`: object **required** — Actions to execute when this policy is triggered, grouped by action type.
  - `remediation_types`: object[] — Remediation actions to execute (at most one).
    [array of]
    - `remediation_type_id`: string **required** — The ID of the remediation type to execute.
  - `webhook_configs`: object[] — Webhook actions to execute.
    [array of]
    - `webhook_config_id`: string **required** — The ID of the webhook configuration to use.
- `applies_to_all_integrations`: boolean **required** — When true, the policy applies to all integrations for the account. When false, integration_ids must be provided.
- `description`: string — Optional description of what this policy does.
- `display_name`: string **required** — Display name for the policy configuration.
- `enabled`: boolean **required** — Boolean specifying if the policy is enabled or disabled.
- `integration_ids`: string[] — The integrations this policy applies to. Required when applies_to_all_integrations is false.
  [array]

**Response** 200 → `result`

- `actions`: object **required** — The actions configured for this policy.
  - `remediation_types`: object[] **required** — List of remediation types that will be executed.
    [array of]
    - `display_name`: string **required** — Display name/label of the remediation type.
    - `remediation_type`: string **required** — The system name of the remediation type.
    - `remediation_type_id`: string **required** — Unique identifier for the remediation type.
  - `webhook_configs`: object[] **required** — List of webhook configurations that will be triggered.
    [array of]
    - `display_name`: string **required** — Display name/label of the webhook configuration.
    - `webhook_config_id`: string **required** — Unique identifier for the webhook configuration.
- `applies_to_all_integrations`: boolean **required** — When true, the policy applies to all integrations for the account. When false, it applies only to the specified integration_ids.
- `created_at`: string **required** — Timestamp when the policy was created.
- `description`: string **required** — User-set description of what this policy does. Limited to 1000 characters.
- `disabled_at`: string — Timestamp when the policy was disabled. Omitted from the response when the policy
- `display_name`: string **required** — Display name for the policy configuration. Limited to 255 characters.
- `enabled`: boolean **required** — Whether the policy is enabled. Derived from disabled_at (enabled when disabled_at is unset).
- `finding_type_id`: string **required** — The finding type this policy is associated with. Immutable after creation; attempts to change it via update are rejected.
- `id`: string **required** — Unique identifier for the policy configuration.
- `integration_ids`: string[] **required** — The integrations this policy applies to.
  [array]
- `last_triggered_at`: string — Timestamp of the most recent successful policy invocation. Omitted
- `updated_at`: string **required** — Timestamp when the policy was last updated.

## GET /accounts/{account_id}/data-security/posture/policy_logs

List policy invocation logs

operationId: `ListPolicyLogEntries` · query: `since`, `until`, `integration_id`, `policy_name`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `actions`: object **required** — Actions dispatched by the policy consumer for this invocation. Both arrays are always present and may be empty.
  - `remediations`: object[] **required** — Remediation jobs spawned by this policy invocation.
    [array of]
    - `id`: string **required** — Identifier of the remediation job, suitable for cross-referencing with the remediations API.
    - `type`: string **required** — Display name of the remediation type that ran.
    - `url`: string **required** — Path to the remediation job in the dashboard.
  - `webhooks`: object[] **required** — Webhook jobs dispatched by this policy invocation.
    [array of]
    - `nickname`: string **required** — User-set nickname of the webhook configuration that fired.
    - `url`: string **required** — Path to the webhook configuration in the dashboard.
- `policy`: object **required** — The policy configuration that fired.
  - `name`: string **required** — Display name of the policy at the time it ran.
  - `url`: string **required** — URL to the policy configuration in the dashboard. Currently always an empty string; populated in a future revision once the upstream view ex
- `timestamp`: string **required** — When the policy invocation was recorded by ClickHouse, in ClickHouse DateTime format (UTC).
- `trigger`: object **required** — The finding instance that caused the policy to fire.
  - `date_detected`: string **required** — When the finding was first detected, in ISO 8601 / RFC3339 format.
  - `fields_of_interest`: object **required** — Free-form JSON object containing finding-type-specific context fields (e.g. file owner, sharing scope). Schema varies per finding type; cons
  - `finding_type_name`: string **required** — Display name of the finding type that triggered the policy.
  - `instance_asset`: string **required** — Name of the specific resource (file, drive item, etc.) the finding was raised against.
  - `integration_name`: string **required** — Display name of the CASB integration that produced the finding.
  - `integration_url`: string **required** — Path to the integration in the dashboard.
