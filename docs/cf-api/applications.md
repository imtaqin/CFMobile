# Applications

16 endpoints.

## GET /accounts/{account_id}/containers/applications

List Applications associated with your account

operationId: `listApplications` · query: `per_page`, `page_token`, `name`, `image`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `account_id`: string **required** — A unique identifier for the user's account.
- `active_rollout_id`: string — An identifier for a specific rollout within an application.
- `configuration`: object **required** — User-specified container configuration.
  - `authorized_keys`: object[]
    [array of]
    - `name`: string — Optional human readable name for this key.
    - `public_key`: string **required** — An SSH public key.
  - `command`: string[] — The command that runs when the container starts, passed to the entrypoint.
    [array]
  - `entrypoint`: string[] — The entry point for the container, specifying the executable to run when the container starts.
    [array]
  - `environment_variables`: object[] — Container environment variables.
    [array of]
    - `name`: string **required** — An environment variable name.
    - `value`: string **required** — An environment variable value.
  - `image`: string **required** — Image url.
  - `instance_type`: string default: `lite` — The instance type configures vCPU, memory, and disk.
  - `observability`: object — Settings for deployment observability such as logging.
    - `logs`: object — Observability logging settings.
- `constraints`: object
  - `jurisdiction`: string — Restricts placement to datacenters in the selected jurisdiction. Choose "eu", "fedramp", or "us". When combined with regions, EU supports EE
  - `regions`: string[]
    [array]
- `created_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `durable_objects`: any — Durable object configuration stored on and returned from a Cloudchamber application.
- `health`: object
  - `errors`: object[] **required**
    [array of]
    - `event`: object **required** — An event within a Placement or a Job.
    - `instance_id`: string **required** — An instance ID represents an identifier of an instance configuration that maintains an underlying placement.
  - `instances`: object **required** — Shows a count of application instance states.
    - `active`: integer **required** — Number of instances whose runtime reports the container as running (container_status = "running"). This is a subset of the placements that r
    - `assigned`: integer **required** — Number of instances bound to a Durable Object with a running placement whose container_status remains behind "running". These count as live,
  - `summary`: string enum: `healthy`, `degraded`, `unhealthy`, `pending` — High-level health assessment. Only populated for "new_instances" strategy.
- `id`: string **required** — An Application ID represents an identifier of an application.
- `instances`: integer **required** — Number of deployments to create.
- `max_instances`: integer — Maximum number of instances the application allows. This is relevant for applications that auto-scale.
- `name`: string **required** — The application name.
- `observability`: any — Top-level observability settings for the application.
- `rollout_active_grace_period`: integer default: `0` — Grace period for active instances to stay alive before becoming eligible for shutdown signal due to a rollout, in seconds.
- `scheduling_policy`: string **required** enum: `default`, `durable_object` — The scheduling policy to use for an application.
- `updated_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `version`: integer **required**
- `scheduling_policy`: string **required** enum: `default` — Selects a scheduler-backed application. Use `default` when the Containers

## POST /accounts/{account_id}/containers/applications

Create a new application

operationId: `createApplication`

**Request** (application/json)

(one of 2 variants; showing the first)
- `configuration`: any **required** — Defines the deployment configuration for every deployment in this application.
- `constraints`: object
  - `jurisdiction`: string — Restricts placement to datacenters in the selected jurisdiction. Choose "eu", "fedramp", or "us". When combined with regions, EU supports EE
  - `regions`: string[]
    [array]
- `durable_objects`: any — Optionally associates this scheduler-backed application with a Durable Object namespace.
- `instances`: integer **required** — The initial number of deployments to create.
- `max_instances`: integer **required** — Sets the maximum number of instances that the application can run.
- `name`: string **required** — The name for this application.
- `observability`: any — Top-level observability settings for the application.
- `rollout_active_grace_period`: integer default: `0` — Grace period for active instances to stay alive before becoming eligible for shutdown signal due to a rollout, in seconds.
- `scheduling_policy`: any **required**

**Response** 201 → `result`

(one of 2 variants; showing the first)
- `account_id`: string **required** — A unique identifier for the user's account.
- `active_rollout_id`: string — An identifier for a specific rollout within an application.
- `configuration`: object **required** — User-specified container configuration.
  - `authorized_keys`: object[]
    [array of]
    - `name`: string — Optional human readable name for this key.
    - `public_key`: string **required** — An SSH public key.
  - `command`: string[] — The command that runs when the container starts, passed to the entrypoint.
    [array]
  - `entrypoint`: string[] — The entry point for the container, specifying the executable to run when the container starts.
    [array]
  - `environment_variables`: object[] — Container environment variables.
    [array of]
    - `name`: string **required** — An environment variable name.
    - `value`: string **required** — An environment variable value.
  - `image`: string **required** — Image url.
  - `instance_type`: string default: `lite` — The instance type configures vCPU, memory, and disk.
  - `observability`: object — Settings for deployment observability such as logging.
    - `logs`: object — Observability logging settings.
- `constraints`: object
  - `jurisdiction`: string — Restricts placement to datacenters in the selected jurisdiction. Choose "eu", "fedramp", or "us". When combined with regions, EU supports EE
  - `regions`: string[]
    [array]
- `created_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `durable_objects`: any — Durable object configuration stored on and returned from a Cloudchamber application.
- `health`: object
  - `errors`: object[] **required**
    [array of]
    - `event`: object **required** — An event within a Placement or a Job.
    - `instance_id`: string **required** — An instance ID represents an identifier of an instance configuration that maintains an underlying placement.
  - `instances`: object **required** — Shows a count of application instance states.
    - `active`: integer **required** — Number of instances whose runtime reports the container as running (container_status = "running"). This is a subset of the placements that r
    - `assigned`: integer **required** — Number of instances bound to a Durable Object with a running placement whose container_status remains behind "running". These count as live,
  - `summary`: string enum: `healthy`, `degraded`, `unhealthy`, `pending` — High-level health assessment. Only populated for "new_instances" strategy.
- `id`: string **required** — An Application ID represents an identifier of an application.
- `instances`: integer **required** — Number of deployments to create.
- `max_instances`: integer — Maximum number of instances the application allows. This is relevant for applications that auto-scale.
- `name`: string **required** — The application name.
- `observability`: any — Top-level observability settings for the application.
- `rollout_active_grace_period`: integer default: `0` — Grace period for active instances to stay alive before becoming eligible for shutdown signal due to a rollout, in seconds.
- `scheduling_policy`: string **required** enum: `default`, `durable_object` — The scheduling policy to use for an application.
- `updated_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `version`: integer **required**
- `scheduling_policy`: string **required** enum: `default` — Selects a scheduler-backed application. Use `default` when the Containers

## DELETE /accounts/{account_id}/containers/applications/{application_id}

Delete a single application by id

operationId: `deleteApplication`

**Response** 200 → `result`

- `message`: string **required**

## GET /accounts/{account_id}/containers/applications/{application_id}

Get a single application by id

operationId: `getApplication`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `account_id`: string **required** — A unique identifier for the user's account.
- `active_rollout_id`: string — An identifier for a specific rollout within an application.
- `configuration`: object **required** — User-specified container configuration.
  - `authorized_keys`: object[]
    [array of]
    - `name`: string — Optional human readable name for this key.
    - `public_key`: string **required** — An SSH public key.
  - `command`: string[] — The command that runs when the container starts, passed to the entrypoint.
    [array]
  - `entrypoint`: string[] — The entry point for the container, specifying the executable to run when the container starts.
    [array]
  - `environment_variables`: object[] — Container environment variables.
    [array of]
    - `name`: string **required** — An environment variable name.
    - `value`: string **required** — An environment variable value.
  - `image`: string **required** — Image url.
  - `instance_type`: string default: `lite` — The instance type configures vCPU, memory, and disk.
  - `observability`: object — Settings for deployment observability such as logging.
    - `logs`: object — Observability logging settings.
- `constraints`: object
  - `jurisdiction`: string — Restricts placement to datacenters in the selected jurisdiction. Choose "eu", "fedramp", or "us". When combined with regions, EU supports EE
  - `regions`: string[]
    [array]
- `created_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `durable_objects`: any — Durable object configuration stored on and returned from a Cloudchamber application.
- `health`: object
  - `errors`: object[] **required**
    [array of]
    - `event`: object **required** — An event within a Placement or a Job.
    - `instance_id`: string **required** — An instance ID represents an identifier of an instance configuration that maintains an underlying placement.
  - `instances`: object **required** — Shows a count of application instance states.
    - `active`: integer **required** — Number of instances whose runtime reports the container as running (container_status = "running"). This is a subset of the placements that r
    - `assigned`: integer **required** — Number of instances bound to a Durable Object with a running placement whose container_status remains behind "running". These count as live,
  - `summary`: string enum: `healthy`, `degraded`, `unhealthy`, `pending` — High-level health assessment. Only populated for "new_instances" strategy.
- `id`: string **required** — An Application ID represents an identifier of an application.
- `instances`: integer **required** — Number of deployments to create.
- `max_instances`: integer — Maximum number of instances the application allows. This is relevant for applications that auto-scale.
- `name`: string **required** — The application name.
- `observability`: any — Top-level observability settings for the application.
- `rollout_active_grace_period`: integer default: `0` — Grace period for active instances to stay alive before becoming eligible for shutdown signal due to a rollout, in seconds.
- `scheduling_policy`: string **required** enum: `default`, `durable_object` — The scheduling policy to use for an application.
- `updated_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `version`: integer **required**
- `scheduling_policy`: string **required** enum: `default` — Selects a scheduler-backed application. Use `default` when the Containers

## PATCH /accounts/{account_id}/containers/applications/{application_id}

Modify an application

operationId: `modifyApplication`

**Request** (application/json)

- `configuration`: object — Application configuration fields you can change without creating a rollout.
  - `authorized_keys`: object[]
    [array of]
    - `name`: string — Optional human readable name for this key.
    - `public_key`: string **required** — An SSH public key.
  - `wrangler_ssh`: object — Configuration properties for connecting with SSH to a container using Wrangler.
    - `enabled`: boolean default: `true`
    - `port`: integer default: `22`
- `constraints`: object
  - `jurisdiction`: string — Restricts placement to datacenters in the selected jurisdiction. Choose "eu", "fedramp", or "us". When combined with regions, EU supports EE
  - `regions`: string[]
    [array]
- `max_instances`: integer — Maximum number of instances that an autoscaling application can run.
- `observability`: any — Top-level application observability settings. Scheduler-backed applications
- `rollout_active_grace_period`: integer default: `0` — Grace period for active instances to stay alive before becoming eligible for shutdown signal due to a rollout, in seconds.

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `account_id`: string **required** — A unique identifier for the user's account.
- `active_rollout_id`: string — An identifier for a specific rollout within an application.
- `configuration`: object **required** — User-specified container configuration.
  - `authorized_keys`: object[]
    [array of]
    - `name`: string — Optional human readable name for this key.
    - `public_key`: string **required** — An SSH public key.
  - `command`: string[] — The command that runs when the container starts, passed to the entrypoint.
    [array]
  - `entrypoint`: string[] — The entry point for the container, specifying the executable to run when the container starts.
    [array]
  - `environment_variables`: object[] — Container environment variables.
    [array of]
    - `name`: string **required** — An environment variable name.
    - `value`: string **required** — An environment variable value.
  - `image`: string **required** — Image url.
  - `instance_type`: string default: `lite` — The instance type configures vCPU, memory, and disk.
  - `observability`: object — Settings for deployment observability such as logging.
    - `logs`: object — Observability logging settings.
- `constraints`: object
  - `jurisdiction`: string — Restricts placement to datacenters in the selected jurisdiction. Choose "eu", "fedramp", or "us". When combined with regions, EU supports EE
  - `regions`: string[]
    [array]
- `created_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `durable_objects`: any — Durable object configuration stored on and returned from a Cloudchamber application.
- `health`: object
  - `errors`: object[] **required**
    [array of]
    - `event`: object **required** — An event within a Placement or a Job.
    - `instance_id`: string **required** — An instance ID represents an identifier of an instance configuration that maintains an underlying placement.
  - `instances`: object **required** — Shows a count of application instance states.
    - `active`: integer **required** — Number of instances whose runtime reports the container as running (container_status = "running"). This is a subset of the placements that r
    - `assigned`: integer **required** — Number of instances bound to a Durable Object with a running placement whose container_status remains behind "running". These count as live,
  - `summary`: string enum: `healthy`, `degraded`, `unhealthy`, `pending` — High-level health assessment. Only populated for "new_instances" strategy.
- `id`: string **required** — An Application ID represents an identifier of an application.
- `instances`: integer **required** — Number of deployments to create.
- `max_instances`: integer — Maximum number of instances the application allows. This is relevant for applications that auto-scale.
- `name`: string **required** — The application name.
- `observability`: any — Top-level observability settings for the application.
- `rollout_active_grace_period`: integer default: `0` — Grace period for active instances to stay alive before becoming eligible for shutdown signal due to a rollout, in seconds.
- `scheduling_policy`: string **required** enum: `default`, `durable_object` — The scheduling policy to use for an application.
- `updated_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `version`: integer **required**
- `scheduling_policy`: string **required** enum: `default` — Selects a scheduler-backed application. Use `default` when the Containers

## GET /accounts/{account_id}/containers/applications/{application_id}/versions

List all application versions

operationId: `listApplicationVersions`

**Response** 200 → `result`

[array of]
- `configuration`: object **required** — User-specified container configuration changes.
  - `authorized_keys`: object[]
    [array of]
    - `name`: string — Optional human readable name for this key.
    - `public_key`: string **required** — An SSH public key.
  - `command`: string[] — The command that runs when the container starts, passed to the entrypoint.
    [array]
  - `entrypoint`: string[] — The entry point for the container, specifying the executable to run when the container starts.
    [array]
  - `environment_variables`: object[] — Container environment variables.
    [array of]
    - `name`: string **required** — An environment variable name.
    - `value`: string **required** — An environment variable value.
  - `image`: string — Image url.
  - `instance_type`: string default: `lite` — The instance type configures vCPU, memory, and disk.
  - `observability`: object — Settings for deployment observability such as logging.
    - `logs`: object — Observability logging settings.
- `percentage`: integer **required**
- `version`: integer **required**

## GET /accounts/{account_id}/one/applications

List applications

operationId: `list_applications_v2` · query: `environment`, `page`, `page_size`

**Response** 200 → `result`

[array of]
- `auth_methods`: object[] **required** — Available auth methods.
  [array of]
  - `display_name`: string **required** — Human-readable auth method name.
  - `id`: string **required** — Auth method identifier.
- `category`: string **required** — Vendor category (e.g. Productivity, AI).
- `description`: string **required** — Brief description of the integration.
- `display_name`: string **required** — Human-readable vendor name.
- `dlp_enabled`: boolean **required** — Whether DLP scanning is supported.
- `id`: string **required** enum: `ANTHROPIC`, `AWS`, `BITBUCKET`, `BOX`, `CONFLUENCE`, `DROPBOX`, `GITHUB`, `GOOGLE_CLOUD_PLATFORM` — Vendor identifier (e.g. microsoft_internal, google_workspace).
- `logo`: string **required** — Logo path.
- `permissions`: object[] **required** — All permissions with severity.
  [array of]
  - `display_name`: string **required** — Human-readable permission name.
  - `scope`: string **required** — Vendor-native scope identifier.
  - `severity`: string **required** enum: `low`, `medium`, `high`, `critical` — Permission sensitivity level.
- `supported_environments`: string[] **required** — Environments this vendor supports (standard, fedramp).
  [array]
- `use_cases`: object[] **required** — Supported use cases.
  [array of]
  - `display_name`: string **required** — Human-readable use case name.
  - `id`: string **required** — Use case identifier (e.g. casb, ces).

## GET /accounts/{account_id}/one/applications/{application_id}

Get application details

operationId: `get_application_v2`

**Response** 200 → `result`

- `auth_methods`: object[] **required** — Available authentication methods.
  [array of]
  - `display_name`: string **required** — Human-readable auth method name.
  - `id`: string **required** — Auth method identifier.
  - `is_default`: boolean **required** — Whether this is the default auth method.
  - `supported_environments`: string[] **required** — Environments this auth method supports.
    [array]
- `category`: string **required** — Vendor category.
- `description`: string **required** — Brief description.
- `display_name`: string **required** — Human-readable vendor name.
- `dlp_enabled`: boolean **required** — Whether DLP scanning is supported.
- `id`: string **required** enum: `ANTHROPIC`, `AWS`, `BITBUCKET`, `BOX`, `CONFLUENCE`, `DROPBOX`, `GITHUB`, `GOOGLE_CLOUD_PLATFORM` — Vendor identifier.
- `instructions`: string **required** — Setup instructions for the user.
- `logo`: string **required** — Logo path.
- `use_cases`: object[] **required** — Use cases with full scope details.
  [array of]
  - `base_scopes`: object[] **required** — Scopes always required for this use case.
    [array of]
    - `display_name`: string **required** — Human-readable permission name.
    - `scope`: string **required** — Vendor-native scope identifier.
    - `severity`: string **required** enum: `low`, `medium`, `high`, `critical` — Permission sensitivity level.
  - `description`: string **required** — Use case description.
  - `display_name`: string **required** — Human-readable use case name.
  - `features`: object[] **required** — Optional features with extra scopes.
    [array of]
    - `description`: string **required** — Feature description.
    - `display_name`: string **required** — Human-readable feature name.
    - `id`: string **required** — Feature identifier.
    - `scopes`: object[] **required** — Additional scopes when feature is enabled.
  - `id`: string **required** — Use case identifier.

## GET /accounts/{account_id}/one/applications/{application_id}/auth-methods

Get auth methods

operationId: `get_application_auth_methods_v2` · query: `page`, `page_size`

**Response** 200 → `result`

[array of]
- `display_name`: string **required** — Human-readable auth method name.
- `human_interaction_required`: boolean **required** — Whether setup requires human interaction or integration can be created purely using API (e.g., For OAuth can not be created without user int
- `id`: string **required** — Auth method identifier.
- `instructions`: any **required** — Step-by-step instructions for obtaining credentials.
- `payload_example`: object **required** — Example credentials payload with placeholder values.
- `payload_schema`: object **required** — JSON Schema for the credentials object in POST /v2/integrations request.
- `redirect_url`: string **required** — OAuth redirect URL for vendors requiring human interaction.

## GET /accounts/{account_id}/one/applications/{application_id}/setup-flows

Get application setup flows

operationId: `get_application_setup_flows_v2` · query: `auth_method`, `environment`, `page`, `page_size`

**Response** 200 → `result`

[array of]
- `auth_config`: any — OAuth configuration (present for OAuth-based flows).
- `default`: boolean **required** — Whether this is the default auth method.
- `description`: string **required** — Flow description.
- `id`: string **required** — Setup flow identifier.
- `name`: string **required** — Human-readable flow name.
- `steps`: object[] **required** — Ordered list of setup steps. Each step/field is flagged `is_used_in_create`/`is_used_in_update` for whether it belongs to the one-time creat
  [array of]
  - `component_id`: string — Component identifier (for component type).
  - `description`: string — Step description with markdown support.
  - `dynamic_content`: object[] — Dynamic content blocks (for instruction/form_input).
    [array of]
    - `label`: string **required** — Display label.
    - `type`: string **required** enum: `copy_block`, `external_link` — Content type.
    - `url_template`: string — URL template with {{ variable }} interpolation (for external_link).
    - `value_from`: string — Field path to get value from (for copy_block).
  - `form_fields`: object[] — Form fields (for form_input).
    [array of]
    - `default_value`: string — Backend-computed value to pre-fill the field with.
    - `description`: string — Risk or behavior callout for the field (e.g. consequences of an invalid value).
    - `is_used_in_create`: boolean **required** — Whether this field is part of the one-time create flow.
    - `is_used_in_update`: boolean **required** — Whether this field is safe to PATCH on an existing integration.
    - `label`: string **required** — Human-readable field label.
    - `name`: string **required** — Field identifier (maps to credentials key).
    - `placeholder`: string **required** — Placeholder text.
    - `readonly`: boolean — Whether the field is backend-computed and must be rendered disabled.
    - `required`: boolean **required** — Whether field is required.
    - `supported_file_types`: string[] **required** — Allowed file extensions for file_upload type.
    - `type`: string **required** enum: `text`, `password`, `email`, `file_upload` — Field input type.
  - `is_required`: boolean — Whether step is required (for form_input).
  - `is_used_in_create`: boolean **required** — Whether this step is part of the one-time create flow.
  - `is_used_in_update`: boolean **required** — Whether this step is shown when fixing an existing integration's credentials (e.g. a re-authorize/delete-and-recreate instruction, or a step
  - `parameters`: object — Component parameters (for component type).
  - `title`: string — Step title (for instruction/form_input/oauth_redirect).
  - `type`: string **required** enum: `component`, `instruction`, `form_input`, `oauth_redirect` — Step type.
- `supported_environments`: string[] **required** — Environments this auth method supports (standard, fedramp).
  [array]

## GET /accounts/{account_id}/resource-library/applications

List applications

operationId: `getResourceLibraryApplications` · query: `filter`, `limit`, `offset`, `cursor`, `order_by`, `search`, `lookup`, `fields`

**Response** 200 → `result`

[array of]
- `application_confidence_score`: number — Confidence score for the application. Returns -1 when no score is available.
- `application_score_composition`: object — Returns the score composition breakdown for the application.
- `application_source`: string — Returns the application source.
- `application_type`: string — Returns the application type.
- `application_type_description`: string — Returns the application type description.
- `category_id`: integer — Numeric identifier for an application category.
- `created_at`: string — Returns the application creation time.
- `gen_ai_score`: number — GenAI score for the application. Returns -1 when no score is available.
- `hostnames`: string[] — Hostnames matched by the application.
  [array]
- `human_id`: string — Human-readable identifier for the application.
- `id`: integer **required** — Numeric identifier for the application.
- `ip_subnets`: string[] — IP subnets for this application. Custom application create and update requests accept IPv4 prefix lengths /8 through /32 and IPv6 prefix len
  [array]
- `name`: string — Application name.
- `port_protocols`: string[] — Ports matched by the application, in `protocol/port` or inclusive `protocol/start-end` format (for example, `tcp/443` or `udp/10000-20000`).
  [array]
- `review_status`: string enum: `approved`, `unapproved`, `in_review`, `unreviewed` — The account-specific Gateway review status. Applications with no assigned review status are returned as `unreviewed`.
- `support_domains`: string[] — Support domains matched by the application.
  [array]
- `supported`: string[] — Cloudflare products that support this application.
  [array]
- `updated_at`: string — Returns the application update time.
- `version`: string — Returns the application version.

## POST /accounts/{account_id}/resource-library/applications

Create application

operationId: `createResourceLibraryApplication`

**Request** (application/json)

(one of 2 variants; showing the first)
- `hostnames`: any **required**

**Response** 201 → `result`

- `application_confidence_score`: number **required** — Confidence score for the application. Returns -1 when no score is available.
- `application_score_composition`: object — Returns the score composition breakdown for the application.
- `application_source`: string **required** — Returns the application source.
- `application_type`: string **required** — Returns the application type.
- `application_type_description`: string **required** — Returns the application type description.
- `category_id`: integer **required** — Numeric identifier for an application category.
- `created_at`: string **required** — Returns the application creation time.
- `gen_ai_score`: number **required** — GenAI score for the application. Returns -1 when no score is available.
- `hostnames`: string[] **required** — Hostnames matched by the application.
  [array]
- `human_id`: string **required** — Human-readable identifier for the application.
- `id`: integer **required** — Numeric identifier for the application.
- `ip_subnets`: string[] **required** — IP subnets for this application. Custom application create and update requests accept IPv4 prefix lengths /8 through /32 and IPv6 prefix len
  [array]
- `name`: string **required** — Application name.
- `port_protocols`: string[] **required** — Ports matched by the application, in `protocol/port` or inclusive `protocol/start-end` format (for example, `tcp/443` or `udp/10000-20000`).
  [array]
- `support_domains`: string[] **required** — Support domains matched by the application.
  [array]
- `supported`: string[] **required** — Cloudflare products that support this application.
  [array]
- `updated_at`: string **required** — Returns the application update time.
- `version`: string **required** — Returns the application version.

## DELETE /accounts/{account_id}/resource-library/applications/{id}

Delete application

operationId: `deleteResourceLibraryApplication`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/resource-library/applications/{id}

Get application

operationId: `getResourceLibraryApplicationById`

**Response** 200 → `result`

- `application_confidence_score`: number **required** — Confidence score for the application. Returns -1 when no score is available.
- `application_score_composition`: object — Returns the score composition breakdown for the application.
- `application_source`: string **required** — Returns the application source.
- `application_type`: string **required** — Returns the application type.
- `application_type_description`: string **required** — Returns the application type description.
- `category_id`: integer **required** — Numeric identifier for an application category.
- `created_at`: string **required** — Returns the application creation time.
- `gen_ai_score`: number **required** — GenAI score for the application. Returns -1 when no score is available.
- `hostnames`: string[] **required** — Hostnames matched by the application.
  [array]
- `human_id`: string **required** — Human-readable identifier for the application.
- `id`: integer **required** — Numeric identifier for the application.
- `ip_subnets`: string[] **required** — IP subnets for this application. Custom application create and update requests accept IPv4 prefix lengths /8 through /32 and IPv6 prefix len
  [array]
- `name`: string **required** — Application name.
- `port_protocols`: string[] **required** — Ports matched by the application, in `protocol/port` or inclusive `protocol/start-end` format (for example, `tcp/443` or `udp/10000-20000`).
  [array]
- `support_domains`: string[] **required** — Support domains matched by the application.
  [array]
- `supported`: string[] **required** — Cloudflare products that support this application.
  [array]
- `updated_at`: string **required** — Returns the application update time.
- `version`: string **required** — Returns the application version.

## PATCH /accounts/{account_id}/resource-library/applications/{id}

Update application

operationId: `updateResourceLibraryApplication`

**Request** (application/json)

- `hostnames`: string[] — Hostnames matched by the application.
  [array]
- `ip_subnets`: string[] — IP subnets for this application. Custom application create and update requests accept IPv4 prefix lengths /8 through /32 and IPv6 prefix len
  [array]
- `port_protocols`: string[] — Ports matched by the application, in `protocol/port` or inclusive `protocol/start-end` format (for example, `tcp/443` or `udp/10000-20000`).
  [array]
- `support_domains`: string[] — Support domains matched by the application.
  [array]

**Response** 200 → `result`

- `application_confidence_score`: number **required** — Confidence score for the application. Returns -1 when no score is available.
- `application_score_composition`: object — Returns the score composition breakdown for the application.
- `application_source`: string **required** — Returns the application source.
- `application_type`: string **required** — Returns the application type.
- `application_type_description`: string **required** — Returns the application type description.
- `category_id`: integer **required** — Numeric identifier for an application category.
- `created_at`: string **required** — Returns the application creation time.
- `gen_ai_score`: number **required** — GenAI score for the application. Returns -1 when no score is available.
- `hostnames`: string[] **required** — Hostnames matched by the application.
  [array]
- `human_id`: string **required** — Human-readable identifier for the application.
- `id`: integer **required** — Numeric identifier for the application.
- `ip_subnets`: string[] **required** — IP subnets for this application. Custom application create and update requests accept IPv4 prefix lengths /8 through /32 and IPv6 prefix len
  [array]
- `name`: string **required** — Application name.
- `port_protocols`: string[] **required** — Ports matched by the application, in `protocol/port` or inclusive `protocol/start-end` format (for example, `tcp/443` or `udp/10000-20000`).
  [array]
- `support_domains`: string[] **required** — Support domains matched by the application.
  [array]
- `supported`: string[] **required** — Cloudflare products that support this application.
  [array]
- `updated_at`: string **required** — Returns the application update time.
- `version`: string **required** — Returns the application version.

## POST /accounts/{account_id}/resource-library/applications/lookup

Look up applications in a rule sentence

operationId: `lookupResourceLibraryApplications` · query: `filter`, `limit`, `fields`

**Request** (application/json)

- `lookup`: string **required** — Rule sentence to search for complete application names. Leading and trailing

**Response** 200 → `result`

[array of]
- `application_confidence_score`: number — Confidence score for the application. Returns -1 when no score is available.
- `application_score_composition`: object — Returns the score composition breakdown for the application.
- `application_source`: string — Returns the application source.
- `application_type`: string — Returns the application type.
- `application_type_description`: string — Returns the application type description.
- `category_id`: integer — Numeric identifier for an application category.
- `created_at`: string — Returns the application creation time.
- `gen_ai_score`: number — GenAI score for the application. Returns -1 when no score is available.
- `hostnames`: string[] — Hostnames matched by the application.
  [array]
- `human_id`: string — Human-readable identifier for the application.
- `id`: integer **required** — Numeric identifier for the application.
- `ip_subnets`: string[] — IP subnets for this application. Custom application create and update requests accept IPv4 prefix lengths /8 through /32 and IPv6 prefix len
  [array]
- `name`: string — Application name.
- `port_protocols`: string[] — Ports matched by the application, in `protocol/port` or inclusive `protocol/start-end` format (for example, `tcp/443` or `udp/10000-20000`).
  [array]
- `review_status`: string enum: `approved`, `unapproved`, `in_review`, `unreviewed` — The account-specific Gateway review status. Applications with no assigned review status are returned as `unreviewed`.
- `support_domains`: string[] — Support domains matched by the application.
  [array]
- `supported`: string[] — Cloudflare products that support this application.
  [array]
- `updated_at`: string — Returns the application update time.
- `version`: string — Returns the application version.
