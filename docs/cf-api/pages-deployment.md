# Pages Deployment

9 endpoints.

## GET /accounts/{account_id}/pages/projects/{project_name}/deployments

List Pages deployments

operationId: `pages-deployment-get-deployments` · query: `env`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `aliases`: string[] **required** — A list of alias URLs pointing to this deployment.
  [array]
- `build_config`: object **required** — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `created_on`: string **required** — When the deployment was created.
- `deployment_trigger`: object **required** — Info about what caused the deployment.
  - `metadata`: object **required** — Additional info about the trigger.
    - `branch`: string **required** — Where the trigger happened.
    - `commit_dirty`: boolean **required** — Whether the deployment trigger commit was dirty.
    - `commit_hash`: string **required** — Hash of the deployment trigger commit.
    - `commit_message`: string **required** — Message of the deployment trigger commit.
  - `type`: string **required** enum: `github:push`, `ad_hoc`, `deploy_hook` — What caused the deployment.
- `env_vars`: object **required** — Environment variables used for builds and Pages Functions.
- `environment`: string **required** enum: `preview`, `production` — Type of deploy.
- `id`: string **required** — Id of the deployment.
- `is_skipped`: boolean **required** — Whether the deployment was skipped.
- `latest_stage`: object **required** — The status of the deployment.
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `modified_on`: string **required** — When the deployment was last modified.
- `project_id`: string **required** — Id of the project.
- `project_name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `short_id`: string **required** — Short Id (8 character) of the deployment.
- `skip_reason`: string enum: `commit_message`, `preview_deployments_disabled`, `production_deployments_disabled`, `path_config`, `branch_config`, `pages_to_workers_conversion`, `superseded_queued_build` — Why the deployment was skipped.
- `source`: object **required** — Configs for the project source control.
  - `config`: object **required**
    - `deployments_enabled`: boolean **required** — Whether to enable automatic deployments when pushing to the source repository.
    - `owner`: string **required** — The owner of the repository.
    - `owner_id`: string **required** — The owner ID of the repository.
    - `path_excludes`: string[] **required** — A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (`*`) is supported.
    - `path_includes`: string[] **required** — A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (`*`) is supported.
    - `pr_comments_enabled`: boolean **required** — Whether to enable PR comments.
    - `preview_branch_excludes`: string[] **required** — A list of branches that should not trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_s
    - `preview_branch_includes`: string[] **required** — A list of branches that should trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setti
    - `preview_deployment_setting`: string **required** enum: `all`, `none`, `custom` — Controls whether commits to preview branches trigger a preview deployment.
    - `production_branch`: string **required** — The production branch of the repository.
    - `production_deployments_enabled`: boolean **required** — Whether to trigger a production deployment on commits to the production branch.
    - `repo_id`: string **required** — The ID of the repository.
    - `repo_name`: string **required** — The name of the repository.
  - `type`: string **required** enum: `github`, `gitlab` — The source control management provider.
- `stages`: object[] **required** — List of past stages.
  [array of]
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `url`: string **required** — The live URL to view this deployment.
- `uses_functions`: boolean — Whether the deployment uses functions.

## POST /accounts/{account_id}/pages/projects/{project_name}/deployments

Create a Pages deployment

operationId: `pages-deployment-create-deployment`

**Request** (multipart/form-data)

- `_headers`: string — Headers configuration file for the deployment.
- `_redirects`: string — Redirects configuration file for the deployment.
- `_routes.json`: string — Routes configuration file defining routing rules.
- `_worker.bundle`: string — Worker bundle file in multipart/form-data format. Mutually exclusive with `_worker.js`.
- `_worker.js`: string — Worker JavaScript file. Mutually exclusive with `_worker.bundle`.
- `branch`: string — Git branch to deploy. Uses the branch's `HEAD`; defaults to the project's production branch.
- `commit_dirty`: string enum: `true`, `false` — Whether the associated Git working tree has uncommitted changes. Provide `true` or `false`.
- `commit_hash`: string — Git commit SHA associated with the deployment.
- `commit_message`: string — Git commit message associated with the deployment.
- `functions-filepath-routing-config.json`: string — Functions routing configuration file.
- `manifest`: string — JSON-encoded object mapping deployment file paths to their uploaded content hashes.
- `pages_build_output_dir`: string — The build output directory path.
- `wrangler_config_hash`: string — Hash of the Wrangler configuration file used for this deployment.

**Response** 200 → `result`

- `aliases`: string[] **required** — A list of alias URLs pointing to this deployment.
  [array]
- `build_config`: object **required** — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `created_on`: string **required** — When the deployment was created.
- `deployment_trigger`: object **required** — Info about what caused the deployment.
  - `metadata`: object **required** — Additional info about the trigger.
    - `branch`: string **required** — Where the trigger happened.
    - `commit_dirty`: boolean **required** — Whether the deployment trigger commit was dirty.
    - `commit_hash`: string **required** — Hash of the deployment trigger commit.
    - `commit_message`: string **required** — Message of the deployment trigger commit.
  - `type`: string **required** enum: `github:push`, `ad_hoc`, `deploy_hook` — What caused the deployment.
- `env_vars`: object **required** — Environment variables used for builds and Pages Functions.
- `environment`: string **required** enum: `preview`, `production` — Type of deploy.
- `id`: string **required** — Id of the deployment.
- `is_skipped`: boolean **required** — Whether the deployment was skipped.
- `latest_stage`: object **required** — The status of the deployment.
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `modified_on`: string **required** — When the deployment was last modified.
- `project_id`: string **required** — Id of the project.
- `project_name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `short_id`: string **required** — Short Id (8 character) of the deployment.
- `skip_reason`: string enum: `commit_message`, `preview_deployments_disabled`, `production_deployments_disabled`, `path_config`, `branch_config`, `pages_to_workers_conversion`, `superseded_queued_build` — Why the deployment was skipped.
- `source`: object **required** — Configs for the project source control.
  - `config`: object **required**
    - `deployments_enabled`: boolean **required** — Whether to enable automatic deployments when pushing to the source repository.
    - `owner`: string **required** — The owner of the repository.
    - `owner_id`: string **required** — The owner ID of the repository.
    - `path_excludes`: string[] **required** — A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (`*`) is supported.
    - `path_includes`: string[] **required** — A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (`*`) is supported.
    - `pr_comments_enabled`: boolean **required** — Whether to enable PR comments.
    - `preview_branch_excludes`: string[] **required** — A list of branches that should not trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_s
    - `preview_branch_includes`: string[] **required** — A list of branches that should trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setti
    - `preview_deployment_setting`: string **required** enum: `all`, `none`, `custom` — Controls whether commits to preview branches trigger a preview deployment.
    - `production_branch`: string **required** — The production branch of the repository.
    - `production_deployments_enabled`: boolean **required** — Whether to trigger a production deployment on commits to the production branch.
    - `repo_id`: string **required** — The ID of the repository.
    - `repo_name`: string **required** — The name of the repository.
  - `type`: string **required** enum: `github`, `gitlab` — The source control management provider.
- `stages`: object[] **required** — List of past stages.
  [array of]
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `url`: string **required** — The live URL to view this deployment.
- `uses_functions`: boolean — Whether the deployment uses functions.

## DELETE /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}

Delete a Pages deployment

operationId: `pages-deployment-delete-deployment` · query: `force`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}

Get a Pages deployment

operationId: `pages-deployment-get-deployment-info`

**Response** 200 → `result`

- `aliases`: string[] **required** — A list of alias URLs pointing to this deployment.
  [array]
- `build_config`: object **required** — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `created_on`: string **required** — When the deployment was created.
- `deployment_trigger`: object **required** — Info about what caused the deployment.
  - `metadata`: object **required** — Additional info about the trigger.
    - `branch`: string **required** — Where the trigger happened.
    - `commit_dirty`: boolean **required** — Whether the deployment trigger commit was dirty.
    - `commit_hash`: string **required** — Hash of the deployment trigger commit.
    - `commit_message`: string **required** — Message of the deployment trigger commit.
  - `type`: string **required** enum: `github:push`, `ad_hoc`, `deploy_hook` — What caused the deployment.
- `env_vars`: object **required** — Environment variables used for builds and Pages Functions.
- `environment`: string **required** enum: `preview`, `production` — Type of deploy.
- `id`: string **required** — Id of the deployment.
- `is_skipped`: boolean **required** — Whether the deployment was skipped.
- `latest_stage`: object **required** — The status of the deployment.
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `modified_on`: string **required** — When the deployment was last modified.
- `project_id`: string **required** — Id of the project.
- `project_name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `short_id`: string **required** — Short Id (8 character) of the deployment.
- `skip_reason`: string enum: `commit_message`, `preview_deployments_disabled`, `production_deployments_disabled`, `path_config`, `branch_config`, `pages_to_workers_conversion`, `superseded_queued_build` — Why the deployment was skipped.
- `source`: object **required** — Configs for the project source control.
  - `config`: object **required**
    - `deployments_enabled`: boolean **required** — Whether to enable automatic deployments when pushing to the source repository.
    - `owner`: string **required** — The owner of the repository.
    - `owner_id`: string **required** — The owner ID of the repository.
    - `path_excludes`: string[] **required** — A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (`*`) is supported.
    - `path_includes`: string[] **required** — A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (`*`) is supported.
    - `pr_comments_enabled`: boolean **required** — Whether to enable PR comments.
    - `preview_branch_excludes`: string[] **required** — A list of branches that should not trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_s
    - `preview_branch_includes`: string[] **required** — A list of branches that should trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setti
    - `preview_deployment_setting`: string **required** enum: `all`, `none`, `custom` — Controls whether commits to preview branches trigger a preview deployment.
    - `production_branch`: string **required** — The production branch of the repository.
    - `production_deployments_enabled`: boolean **required** — Whether to trigger a production deployment on commits to the production branch.
    - `repo_id`: string **required** — The ID of the repository.
    - `repo_name`: string **required** — The name of the repository.
  - `type`: string **required** enum: `github`, `gitlab` — The source control management provider.
- `stages`: object[] **required** — List of past stages.
  [array of]
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `url`: string **required** — The live URL to view this deployment.
- `uses_functions`: boolean — Whether the deployment uses functions.

## GET /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/history/logs

Get Pages deployment logs

operationId: `pages-deployment-get-deployment-logs`

**Response** 200 → `result`

- `data`: object[] **required**
  [array of]
  - `line`: string **required**
  - `ts`: string **required**
- `includes_container_logs`: boolean **required**
- `total`: integer **required**

## POST /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/retry

Retry a Pages deployment

operationId: `pages-deployment-retry-deployment`

**Response** 200 → `result`

- `aliases`: string[] **required** — A list of alias URLs pointing to this deployment.
  [array]
- `build_config`: object **required** — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `created_on`: string **required** — When the deployment was created.
- `deployment_trigger`: object **required** — Info about what caused the deployment.
  - `metadata`: object **required** — Additional info about the trigger.
    - `branch`: string **required** — Where the trigger happened.
    - `commit_dirty`: boolean **required** — Whether the deployment trigger commit was dirty.
    - `commit_hash`: string **required** — Hash of the deployment trigger commit.
    - `commit_message`: string **required** — Message of the deployment trigger commit.
  - `type`: string **required** enum: `github:push`, `ad_hoc`, `deploy_hook` — What caused the deployment.
- `env_vars`: object **required** — Environment variables used for builds and Pages Functions.
- `environment`: string **required** enum: `preview`, `production` — Type of deploy.
- `id`: string **required** — Id of the deployment.
- `is_skipped`: boolean **required** — Whether the deployment was skipped.
- `latest_stage`: object **required** — The status of the deployment.
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `modified_on`: string **required** — When the deployment was last modified.
- `project_id`: string **required** — Id of the project.
- `project_name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `short_id`: string **required** — Short Id (8 character) of the deployment.
- `skip_reason`: string enum: `commit_message`, `preview_deployments_disabled`, `production_deployments_disabled`, `path_config`, `branch_config`, `pages_to_workers_conversion`, `superseded_queued_build` — Why the deployment was skipped.
- `source`: object **required** — Configs for the project source control.
  - `config`: object **required**
    - `deployments_enabled`: boolean **required** — Whether to enable automatic deployments when pushing to the source repository.
    - `owner`: string **required** — The owner of the repository.
    - `owner_id`: string **required** — The owner ID of the repository.
    - `path_excludes`: string[] **required** — A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (`*`) is supported.
    - `path_includes`: string[] **required** — A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (`*`) is supported.
    - `pr_comments_enabled`: boolean **required** — Whether to enable PR comments.
    - `preview_branch_excludes`: string[] **required** — A list of branches that should not trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_s
    - `preview_branch_includes`: string[] **required** — A list of branches that should trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setti
    - `preview_deployment_setting`: string **required** enum: `all`, `none`, `custom` — Controls whether commits to preview branches trigger a preview deployment.
    - `production_branch`: string **required** — The production branch of the repository.
    - `production_deployments_enabled`: boolean **required** — Whether to trigger a production deployment on commits to the production branch.
    - `repo_id`: string **required** — The ID of the repository.
    - `repo_name`: string **required** — The name of the repository.
  - `type`: string **required** enum: `github`, `gitlab` — The source control management provider.
- `stages`: object[] **required** — List of past stages.
  [array of]
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `url`: string **required** — The live URL to view this deployment.
- `uses_functions`: boolean — Whether the deployment uses functions.

## POST /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/rollback

Roll back a Pages deployment

operationId: `pages-deployment-rollback-deployment`

**Response** 200 → `result`

- `aliases`: string[] **required** — A list of alias URLs pointing to this deployment.
  [array]
- `build_config`: object **required** — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `created_on`: string **required** — When the deployment was created.
- `deployment_trigger`: object **required** — Info about what caused the deployment.
  - `metadata`: object **required** — Additional info about the trigger.
    - `branch`: string **required** — Where the trigger happened.
    - `commit_dirty`: boolean **required** — Whether the deployment trigger commit was dirty.
    - `commit_hash`: string **required** — Hash of the deployment trigger commit.
    - `commit_message`: string **required** — Message of the deployment trigger commit.
  - `type`: string **required** enum: `github:push`, `ad_hoc`, `deploy_hook` — What caused the deployment.
- `env_vars`: object **required** — Environment variables used for builds and Pages Functions.
- `environment`: string **required** enum: `preview`, `production` — Type of deploy.
- `id`: string **required** — Id of the deployment.
- `is_skipped`: boolean **required** — Whether the deployment was skipped.
- `latest_stage`: object **required** — The status of the deployment.
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `modified_on`: string **required** — When the deployment was last modified.
- `project_id`: string **required** — Id of the project.
- `project_name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `short_id`: string **required** — Short Id (8 character) of the deployment.
- `skip_reason`: string enum: `commit_message`, `preview_deployments_disabled`, `production_deployments_disabled`, `path_config`, `branch_config`, `pages_to_workers_conversion`, `superseded_queued_build` — Why the deployment was skipped.
- `source`: object **required** — Configs for the project source control.
  - `config`: object **required**
    - `deployments_enabled`: boolean **required** — Whether to enable automatic deployments when pushing to the source repository.
    - `owner`: string **required** — The owner of the repository.
    - `owner_id`: string **required** — The owner ID of the repository.
    - `path_excludes`: string[] **required** — A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (`*`) is supported.
    - `path_includes`: string[] **required** — A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (`*`) is supported.
    - `pr_comments_enabled`: boolean **required** — Whether to enable PR comments.
    - `preview_branch_excludes`: string[] **required** — A list of branches that should not trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_s
    - `preview_branch_includes`: string[] **required** — A list of branches that should trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setti
    - `preview_deployment_setting`: string **required** enum: `all`, `none`, `custom` — Controls whether commits to preview branches trigger a preview deployment.
    - `production_branch`: string **required** — The production branch of the repository.
    - `production_deployments_enabled`: boolean **required** — Whether to trigger a production deployment on commits to the production branch.
    - `repo_id`: string **required** — The ID of the repository.
    - `repo_name`: string **required** — The name of the repository.
  - `type`: string **required** enum: `github`, `gitlab` — The source control management provider.
- `stages`: object[] **required** — List of past stages.
  [array of]
  - `ended_on`: string **required** — When the stage ended.
  - `name`: string **required** enum: `queued`, `initialize`, `clone_repo`, `build`, `deploy` — The current build stage.
  - `started_on`: string **required** — When the stage started.
  - `status`: string **required** enum: `success`, `idle`, `active`, `failure`, `canceled`, `skipped` — State of the current stage.
- `url`: string **required** — The live URL to view this deployment.
- `uses_functions`: boolean — Whether the deployment uses functions.

## POST /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/tails

Create deployment tail

operationId: `pages-deployment-create-tail`

**Request** (application/json)

- `filters`: object[] — Filters to apply to the tail session.
  [array]

**Response** 200 → `result`

- `id`: string **required** — Identifier of the tail session.
- `url`: string — Optional WebSocket URL to connect to for receiving tail events, when returned by the tail service.

## DELETE /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/tails/{tail_id}

Delete deployment tail

operationId: `pages-deployment-delete-tail`

**Response** 200 → `result`

object
