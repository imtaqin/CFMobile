# Account Owned API Tokens

8 endpoints.

## GET /accounts/{account_id}/tokens

List Tokens

operationId: `account-api-tokens-list-tokens` · query: `page`, `per_page`, `direction`, `include_expired`

**Response** 200 → `result`

[array of]
- `condition`: object
  - `request_ip`: object — Client IP restrictions.
    - `in`: string[] — List of IPv4/IPv6 CIDR addresses.
    - `not_in`: string[] — List of IPv4/IPv6 CIDR addresses.
- `creator_email_at_creation`: string — The email address of the user who created the token at the time of
- `expires_on`: string — The expiration time on or after which the JWT MUST NOT be accepted for processing.
- `id`: string — Token identifier tag.
- `issued_on`: string — The time on which the token was created.
- `last_used_on`: string — Last time the token was used.
- `modified_on`: string — Last time the token was modified.
- `name`: string — Token name.
- `not_before`: string — The time before which the token MUST NOT be accepted for processing.
- `policies`: object[] — List of access policies assigned to the token.
  [array of]
  - `effect`: string **required** enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string **required** — Policy identifier.
  - `permission_groups`: object[] **required** — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resources`: any **required** — A list of resource names that the policy applies to.
- `provisioner_id`: string — The identifier of the service that provisioned the token. For an
- `provisioner_type`: string — The type of service that provisioned the token. Only present for
- `status`: string enum: `active`, `disabled`, `expired` — Status of the token.
- `token_prefix`: string — The prefix of the token value, before the first underscore. Use it with
- `token_suffix`: string — The last 4 characters of the token value. Use it with `token_prefix` to

## POST /accounts/{account_id}/tokens

Create Token

operationId: `account-api-tokens-create-token`

**Request** (application/json)

- `condition`: object
  - `request_ip`: object — Client IP restrictions.
    - `in`: string[] — List of IPv4/IPv6 CIDR addresses.
    - `not_in`: string[] — List of IPv4/IPv6 CIDR addresses.
- `expires_on`: string — The expiration time on or after which the JWT MUST NOT be accepted for processing.
- `name`: string **required** — Token name.
- `not_before`: string — The time before which the token MUST NOT be accepted for processing.
- `policies`: object[] **required** — List of access policies assigned to the token.
  [array of]
  - `effect`: string **required** enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string **required** — Policy identifier.
  - `permission_groups`: object[] **required** — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resources`: any **required** — A list of resource names that the policy applies to.

**Response** 200 → `result`

- `condition`: object
  - `request_ip`: object — Client IP restrictions.
    - `in`: string[] — List of IPv4/IPv6 CIDR addresses.
    - `not_in`: string[] — List of IPv4/IPv6 CIDR addresses.
- `creator_email_at_creation`: string — The email address of the user who created the token at the time of
- `expires_on`: string — The expiration time on or after which the JWT MUST NOT be accepted for processing.
- `id`: string — Token identifier tag.
- `issued_on`: string — The time on which the token was created.
- `last_used_on`: string — Last time the token was used.
- `modified_on`: string — Last time the token was modified.
- `name`: string — Token name.
- `not_before`: string — The time before which the token MUST NOT be accepted for processing.
- `policies`: object[] — List of access policies assigned to the token.
  [array of]
  - `effect`: string **required** enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string **required** — Policy identifier.
  - `permission_groups`: object[] **required** — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resources`: any **required** — A list of resource names that the policy applies to.
- `provisioner_id`: string — The identifier of the service that provisioned the token. For an
- `provisioner_type`: string — The type of service that provisioned the token. Only present for
- `status`: string enum: `active`, `disabled`, `expired` — Status of the token.
- `token_prefix`: string — The prefix of the token value, before the first underscore. Use it with
- `token_suffix`: string — The last 4 characters of the token value. Use it with `token_prefix` to
- `value`: string — The token value.

## DELETE /accounts/{account_id}/tokens/{token_id}

Delete Token

operationId: `account-api-tokens-delete-token`

**Response** 200 → `result`

- `id`: string **required** — Identifier

## GET /accounts/{account_id}/tokens/{token_id}

Token Details

operationId: `account-api-tokens-token-details`

**Response** 200 → `result`

- `condition`: object
  - `request_ip`: object — Client IP restrictions.
    - `in`: string[] — List of IPv4/IPv6 CIDR addresses.
    - `not_in`: string[] — List of IPv4/IPv6 CIDR addresses.
- `creator_email_at_creation`: string — The email address of the user who created the token at the time of
- `expires_on`: string — The expiration time on or after which the JWT MUST NOT be accepted for processing.
- `id`: string — Token identifier tag.
- `issued_on`: string — The time on which the token was created.
- `last_used_on`: string — Last time the token was used.
- `modified_on`: string — Last time the token was modified.
- `name`: string — Token name.
- `not_before`: string — The time before which the token MUST NOT be accepted for processing.
- `policies`: object[] — List of access policies assigned to the token.
  [array of]
  - `effect`: string **required** enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string **required** — Policy identifier.
  - `permission_groups`: object[] **required** — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resources`: any **required** — A list of resource names that the policy applies to.
- `provisioner_id`: string — The identifier of the service that provisioned the token. For an
- `provisioner_type`: string — The type of service that provisioned the token. Only present for
- `status`: string enum: `active`, `disabled`, `expired` — Status of the token.
- `token_prefix`: string — The prefix of the token value, before the first underscore. Use it with
- `token_suffix`: string — The last 4 characters of the token value. Use it with `token_prefix` to

## PUT /accounts/{account_id}/tokens/{token_id}

Update Token

operationId: `account-api-tokens-update-token`

**Request** (application/json)

- `condition`: object
  - `request_ip`: object — Client IP restrictions.
    - `in`: string[] — List of IPv4/IPv6 CIDR addresses.
    - `not_in`: string[] — List of IPv4/IPv6 CIDR addresses.
- `creator_email_at_creation`: string — The email address of the user who created the token at the time of
- `expires_on`: string — The expiration time on or after which the JWT MUST NOT be accepted for processing.
- `id`: string — Token identifier tag.
- `issued_on`: string — The time on which the token was created.
- `last_used_on`: string — Last time the token was used.
- `modified_on`: string — Last time the token was modified.
- `name`: string — Token name.
- `not_before`: string — The time before which the token MUST NOT be accepted for processing.
- `policies`: object[] — List of access policies assigned to the token.
  [array of]
  - `effect`: string **required** enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string **required** — Policy identifier.
  - `permission_groups`: object[] **required** — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resources`: any **required** — A list of resource names that the policy applies to.
- `provisioner_id`: string — The identifier of the service that provisioned the token. For an
- `provisioner_type`: string — The type of service that provisioned the token. Only present for
- `status`: string enum: `active`, `disabled`, `expired` — Status of the token.
- `token_prefix`: string — The prefix of the token value, before the first underscore. Use it with
- `token_suffix`: string — The last 4 characters of the token value. Use it with `token_prefix` to
object

**Response** 200 → `result`

- `condition`: object
  - `request_ip`: object — Client IP restrictions.
    - `in`: string[] — List of IPv4/IPv6 CIDR addresses.
    - `not_in`: string[] — List of IPv4/IPv6 CIDR addresses.
- `creator_email_at_creation`: string — The email address of the user who created the token at the time of
- `expires_on`: string — The expiration time on or after which the JWT MUST NOT be accepted for processing.
- `id`: string — Token identifier tag.
- `issued_on`: string — The time on which the token was created.
- `last_used_on`: string — Last time the token was used.
- `modified_on`: string — Last time the token was modified.
- `name`: string — Token name.
- `not_before`: string — The time before which the token MUST NOT be accepted for processing.
- `policies`: object[] — List of access policies assigned to the token.
  [array of]
  - `effect`: string **required** enum: `allow`, `deny` — Allow or deny operations against the resources.
  - `id`: string **required** — Policy identifier.
  - `permission_groups`: object[] **required** — A set of permission groups that are specified to the policy.
    [array of]
    - `id`: string **required** — Identifier of the permission group.
    - `meta`: object — Attributes associated to the permission group.
    - `name`: string — Name of the permission group.
  - `resources`: any **required** — A list of resource names that the policy applies to.
- `provisioner_id`: string — The identifier of the service that provisioned the token. For an
- `provisioner_type`: string — The type of service that provisioned the token. Only present for
- `status`: string enum: `active`, `disabled`, `expired` — Status of the token.
- `token_prefix`: string — The prefix of the token value, before the first underscore. Use it with
- `token_suffix`: string — The last 4 characters of the token value. Use it with `token_prefix` to

## PUT /accounts/{account_id}/tokens/{token_id}/value

Roll Token

operationId: `account-api-tokens-roll-token`

**Response** 200 → `result`

string

## GET /accounts/{account_id}/tokens/permission_groups

List Permission Groups

operationId: `account-api-tokens-list-permission-groups` · query: `name`, `scope`

**Response** 200 → `result`

[array of]
- `category`: string enum: `developer_platform`, `ai_and_machine_learning`, `dns_and_zones`, `app_security`, `rules_and_configuration`, `cloudflare_one_and_zero_trust`, `analytics_and_logs`, `network_services` — Product category that this permission group belongs to.
- `id`: string — Public ID.
- `is_selectable`: boolean — Whether the caller can select this permission group when creating a token.
- `name`: string — Permission Group Name
- `scopes`: string[] — Resources to which the Permission Group is scoped
  [array]

## GET /accounts/{account_id}/tokens/verify

Verify Token

operationId: `account-api-tokens-verify-token`

**Response** 200 → `result`

- `expires_on`: string — The expiration time on or after which the JWT MUST NOT be accepted for processing.
- `id`: string **required** — Token identifier tag.
- `not_before`: string — The time before which the token MUST NOT be accepted for processing.
- `status`: string **required** enum: `active`, `disabled`, `expired` — Status of the token.
