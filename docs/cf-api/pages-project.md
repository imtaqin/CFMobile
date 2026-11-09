# Pages Project

8 endpoints.

## GET /accounts/{account_id}/pages/projects

List Cloudflare Pages projects

operationId: `pages-project-get-projects` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `build_config`: object — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `build_image_auto_upgrade`: object — Present when the project is set to a retired build image major version and its builds have been moved to a newer one. `build_image_major_ver
  - `from_version`: integer **required** — The retired build image major version the project is set to.
  - `to_version`: integer **required** — The build image major version the project's builds run on.
- `canonical_deployment`: any **required**
- `created_on`: string **required** — When the project was created.
- `deployment_configs`: object **required** — Configs for deployments in a project.
  - `preview`: any **required** — Configs for preview deploys.
  - `production`: any **required** — Configs for production deploys.
- `domains`: string[] — A list of associated custom domains for the project.
  [array]
- `framework`: string **required** — Framework the project is using.
- `framework_version`: string **required** — Version of the framework the project is using.
- `id`: string **required** — ID of the project.
- `latest_deployment`: any **required**
- `name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `preview_script_name`: string **required** — Name of the preview script.
- `production_branch`: string **required** — Production branch of the project. Used to identify production deployments.
- `production_script_name`: string **required** — Name of the production script.
- `source`: object — Configs for the project source control.
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
- `subdomain`: string — The Cloudflare subdomain associated with the project.
- `uses_functions`: boolean **required** — Whether the project uses functions.

## POST /accounts/{account_id}/pages/projects

Create a Cloudflare Pages project

operationId: `pages-project-create-project`

**Request** (application/json)

- `build_config`: object — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string — The classifying tag for analytics.
  - `web_analytics_token`: string — The auth token for analytics.
- `deployment_configs`: object — Configs for deployments in a project.
  - `preview`: any — Configs for preview deploys.
  - `production`: any — Configs for production deploys.
- `name`: string **required** — Name for the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `production_branch`: string **required** — Production branch of the project. Used to identify production deployments.
- `source`: object — Configs for the project source control.
  - `config`: object **required**
    - `deployments_enabled`: boolean — Whether to enable automatic deployments when pushing to the source repository.
    - `owner`: string — The owner of the repository.
    - `owner_id`: string — The owner ID of the repository.
    - `path_excludes`: string[] — A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (`*`) is supported.
    - `path_includes`: string[] — A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (`*`) is supported.
    - `pr_comments_enabled`: boolean — Whether to enable PR comments.
    - `preview_branch_excludes`: string[] — A list of branches that should not trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_s
    - `preview_branch_includes`: string[] — A list of branches that should trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setti
    - `preview_deployment_setting`: string enum: `all`, `none`, `custom` — Controls whether commits to preview branches trigger a preview deployment.
    - `production_branch`: string — The production branch of the repository.
    - `production_deployments_enabled`: boolean — Whether to trigger a production deployment on commits to the production branch.
    - `repo_id`: string — The ID of the repository.
    - `repo_name`: string — The name of the repository.
  - `type`: string **required** enum: `github`, `gitlab` — The source control management provider.

**Response** 200 → `result`

- `build_config`: object — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `build_image_auto_upgrade`: object — Present when the project is set to a retired build image major version and its builds have been moved to a newer one. `build_image_major_ver
  - `from_version`: integer **required** — The retired build image major version the project is set to.
  - `to_version`: integer **required** — The build image major version the project's builds run on.
- `canonical_deployment`: any **required**
- `created_on`: string **required** — When the project was created.
- `deployment_configs`: object **required** — Configs for deployments in a project.
  - `preview`: any **required** — Configs for preview deploys.
  - `production`: any **required** — Configs for production deploys.
- `domains`: string[] — A list of associated custom domains for the project.
  [array]
- `framework`: string **required** — Framework the project is using.
- `framework_version`: string **required** — Version of the framework the project is using.
- `id`: string **required** — ID of the project.
- `latest_deployment`: any **required**
- `name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `preview_script_name`: string **required** — Name of the preview script.
- `production_branch`: string **required** — Production branch of the project. Used to identify production deployments.
- `production_script_name`: string **required** — Name of the production script.
- `source`: object — Configs for the project source control.
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
- `subdomain`: string — The Cloudflare subdomain associated with the project.
- `uses_functions`: boolean **required** — Whether the project uses functions.

## DELETE /accounts/{account_id}/pages/projects/{project_name}

Delete a Cloudflare Pages project

operationId: `pages-project-delete-project`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/pages/projects/{project_name}

Get a Cloudflare Pages project

operationId: `pages-project-get-project`

**Response** 200 → `result`

- `build_config`: object — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `build_image_auto_upgrade`: object — Present when the project is set to a retired build image major version and its builds have been moved to a newer one. `build_image_major_ver
  - `from_version`: integer **required** — The retired build image major version the project is set to.
  - `to_version`: integer **required** — The build image major version the project's builds run on.
- `canonical_deployment`: any **required**
- `created_on`: string **required** — When the project was created.
- `deployment_configs`: object **required** — Configs for deployments in a project.
  - `preview`: any **required** — Configs for preview deploys.
  - `production`: any **required** — Configs for production deploys.
- `domains`: string[] — A list of associated custom domains for the project.
  [array]
- `framework`: string **required** — Framework the project is using.
- `framework_version`: string **required** — Version of the framework the project is using.
- `id`: string **required** — ID of the project.
- `latest_deployment`: any **required**
- `name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `preview_script_name`: string **required** — Name of the preview script.
- `production_branch`: string **required** — Production branch of the project. Used to identify production deployments.
- `production_script_name`: string **required** — Name of the production script.
- `source`: object — Configs for the project source control.
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
- `subdomain`: string — The Cloudflare subdomain associated with the project.
- `uses_functions`: boolean **required** — Whether the project uses functions.

## PATCH /accounts/{account_id}/pages/projects/{project_name}

Update a Cloudflare Pages project

operationId: `pages-project-update-project`

**Request** (application/json)

- `build_config`: object — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string — The classifying tag for analytics.
  - `web_analytics_token`: string — The auth token for analytics.
- `deployment_configs`: object — Configs for deployments in a project.
  - `preview`: any — Configs for preview deploys.
  - `production`: any — Configs for production deploys.
- `name`: string — Name for the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `production_branch`: string — Production branch of the project. Used to identify production deployments.
- `source`: object — Configs for the project source control.
  - `config`: object **required**
    - `deployments_enabled`: boolean — Whether to enable automatic deployments when pushing to the source repository.
    - `owner`: string — The owner of the repository.
    - `owner_id`: string — The owner ID of the repository.
    - `path_excludes`: string[] — A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (`*`) is supported.
    - `path_includes`: string[] — A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (`*`) is supported.
    - `pr_comments_enabled`: boolean — Whether to enable PR comments.
    - `preview_branch_excludes`: string[] — A list of branches that should not trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_s
    - `preview_branch_includes`: string[] — A list of branches that should trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setti
    - `preview_deployment_setting`: string enum: `all`, `none`, `custom` — Controls whether commits to preview branches trigger a preview deployment.
    - `production_branch`: string — The production branch of the repository.
    - `production_deployments_enabled`: boolean — Whether to trigger a production deployment on commits to the production branch.
    - `repo_id`: string — The ID of the repository.
    - `repo_name`: string — The name of the repository.
  - `type`: string **required** enum: `github`, `gitlab` — The source control management provider.

**Response** 200 → `result`

- `build_config`: object — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `build_image_auto_upgrade`: object — Present when the project is set to a retired build image major version and its builds have been moved to a newer one. `build_image_major_ver
  - `from_version`: integer **required** — The retired build image major version the project is set to.
  - `to_version`: integer **required** — The build image major version the project's builds run on.
- `canonical_deployment`: any **required**
- `created_on`: string **required** — When the project was created.
- `deployment_configs`: object **required** — Configs for deployments in a project.
  - `preview`: any **required** — Configs for preview deploys.
  - `production`: any **required** — Configs for production deploys.
- `domains`: string[] — A list of associated custom domains for the project.
  [array]
- `framework`: string **required** — Framework the project is using.
- `framework_version`: string **required** — Version of the framework the project is using.
- `id`: string **required** — ID of the project.
- `latest_deployment`: any **required**
- `name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `preview_script_name`: string **required** — Name of the preview script.
- `production_branch`: string **required** — Production branch of the project. Used to identify production deployments.
- `production_script_name`: string **required** — Name of the production script.
- `source`: object — Configs for the project source control.
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
- `subdomain`: string — The Cloudflare subdomain associated with the project.
- `uses_functions`: boolean **required** — Whether the project uses functions.

## DELETE /accounts/{account_id}/pages/projects/{project_name}/source

Disconnect a Git repository

operationId: `pages-project-disconnect-project-source`

**Response** 200 → `result`

- `build_config`: object — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `build_image_auto_upgrade`: object — Present when the project is set to a retired build image major version and its builds have been moved to a newer one. `build_image_major_ver
  - `from_version`: integer **required** — The retired build image major version the project is set to.
  - `to_version`: integer **required** — The build image major version the project's builds run on.
- `canonical_deployment`: any **required**
- `created_on`: string **required** — When the project was created.
- `deployment_configs`: object **required** — Configs for deployments in a project.
  - `preview`: any **required** — Configs for preview deploys.
  - `production`: any **required** — Configs for production deploys.
- `domains`: string[] — A list of associated custom domains for the project.
  [array]
- `framework`: string **required** — Framework the project is using.
- `framework_version`: string **required** — Version of the framework the project is using.
- `id`: string **required** — ID of the project.
- `latest_deployment`: any **required**
- `name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `preview_script_name`: string **required** — Name of the preview script.
- `production_branch`: string **required** — Production branch of the project. Used to identify production deployments.
- `production_script_name`: string **required** — Name of the production script.
- `source`: object — Configs for the project source control.
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
- `subdomain`: string — The Cloudflare subdomain associated with the project.
- `uses_functions`: boolean **required** — Whether the project uses functions.

## POST /accounts/{account_id}/pages/projects/{project_name}/source

Connect a Git repository

operationId: `pages-project-connect-project-source`

**Request** (application/json)

- `config`: any **required**
- `type`: string **required** enum: `github`, `gitlab` — The source control management provider.

**Response** 200 → `result`

- `build_config`: object — Configs for the project build process.
  - `build_caching`: boolean — Enable build caching for the project.
  - `build_command`: string — Command used to build project.
  - `destination_dir`: string — Assets output directory of the build.
  - `root_dir`: string — Directory to run the command.
  - `web_analytics_tag`: string **required** — The classifying tag for analytics.
  - `web_analytics_token`: string **required** — The auth token for analytics.
- `build_image_auto_upgrade`: object — Present when the project is set to a retired build image major version and its builds have been moved to a newer one. `build_image_major_ver
  - `from_version`: integer **required** — The retired build image major version the project is set to.
  - `to_version`: integer **required** — The build image major version the project's builds run on.
- `canonical_deployment`: any **required**
- `created_on`: string **required** — When the project was created.
- `deployment_configs`: object **required** — Configs for deployments in a project.
  - `preview`: any **required** — Configs for preview deploys.
  - `production`: any **required** — Configs for production deploys.
- `domains`: string[] — A list of associated custom domains for the project.
  [array]
- `framework`: string **required** — Framework the project is using.
- `framework_version`: string **required** — Version of the framework the project is using.
- `id`: string **required** — ID of the project.
- `latest_deployment`: any **required**
- `name`: string **required** — Name of the Pages project. Must begin with a lowercase letter or digit and contain only lowercase letters, digits, and hyphens.
- `preview_script_name`: string **required** — Name of the preview script.
- `production_branch`: string **required** — Production branch of the project. Used to identify production deployments.
- `production_script_name`: string **required** — Name of the production script.
- `source`: object — Configs for the project source control.
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
- `subdomain`: string — The Cloudflare subdomain associated with the project.
- `uses_functions`: boolean **required** — Whether the project uses functions.

## GET /accounts/{account_id}/pages/projects/{project_name}/upload-token

Get upload token

operationId: `pages-project-get-upload-token`

**Response** 200 → `result`

- `jwt`: string **required** — Short-lived JWT used to authenticate Pages Direct Upload asset operations.
