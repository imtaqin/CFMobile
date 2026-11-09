# Accounts

9 endpoints.

## GET /accounts

List Accounts

operationId: `accounts-list-accounts` · query: `name`, `page`, `per_page`, `direction`

**Response** 200 → `result`

[array of]
- `created_on`: string — Timestamp for the creation of the account
- `id`: string **required** — Identifier
- `legacy_flags`: object — Legacy account flags.
  - `enterprise_zone_quota`: object — Enterprise zone quota for standard and enterprise accounts. Accounts without a quota have a maximum of 0.
    - `available`: integer — Number of additional Enterprise zones available. Returns 0 if the quota is not allocated or is exhausted.
    - `current`: integer — Current number of Enterprise zones.
    - `maximum`: integer — Maximum number of Enterprise zones allowed.
- `managed_by`: object — Parent container details
  - `parent_org_id`: string — ID of the parent Organization, if one exists
  - `parent_org_name`: string — Name of the parent Organization, if one exists
  - `root_org_id`: string — ID of the root Organization, if one exists
  - `should_display_parent_orgs`: boolean — Indicates whether the parent Organization hierarchy should be displayed
- `name`: string **required** — Account name
- `settings`: object — Account settings
  - `abuse_contact_email`: string — Sets an abuse contact email to notify for abuse reports.
  - `enforce_twofactor`: boolean default: `false` — Indicates whether membership in this account requires that
- `type`: any **required**

## POST /accounts

Create an Account

operationId: `account-creation`

**Request** (application/json)

- `name`: string **required** — Account name, limited to 65 UTF-8 bytes.
- `standalone`: boolean enum: `true` — Set to `true` and omit `unit` to create a standalone Free Account. If provided, this field must be `true`.
- `type`: any default: `standard` — the type of account being created. For self-serve customers, use standard. for enterprise customers, use enterprise.
- `unit`: object — Information related to the tenant unit. Provide its ID and omit `standalone` to create the Account within an Organization. See https://devel
  - `id`: string — Tenant unit ID

**Response** 200 → `result`

- `created_on`: string — Timestamp for the creation of the account
- `id`: string **required** — Identifier
- `legacy_flags`: object — Legacy account flags.
  - `enterprise_zone_quota`: object — Enterprise zone quota for standard and enterprise accounts. Accounts without a quota have a maximum of 0.
    - `available`: integer — Number of additional Enterprise zones available. Returns 0 if the quota is not allocated or is exhausted.
    - `current`: integer — Current number of Enterprise zones.
    - `maximum`: integer — Maximum number of Enterprise zones allowed.
- `managed_by`: object — Parent container details
  - `parent_org_id`: string — ID of the parent Organization, if one exists
  - `parent_org_name`: string — Name of the parent Organization, if one exists
  - `root_org_id`: string — ID of the root Organization, if one exists
  - `should_display_parent_orgs`: boolean — Indicates whether the parent Organization hierarchy should be displayed
- `name`: string **required** — Account name
- `settings`: object — Account settings
  - `abuse_contact_email`: string — Sets an abuse contact email to notify for abuse reports.
  - `enforce_twofactor`: boolean default: `false` — Indicates whether membership in this account requires that
- `type`: any **required**

## DELETE /accounts/{account_id}

Delete a specific account

operationId: `account-deletion`

**Response** 200 → `result`

- `id`: string **required** — Identifier

## GET /accounts/{account_id}

Account Details

operationId: `accounts-account-details`

**Response** 200 → `result`

- `created_on`: string — Timestamp for the creation of the account
- `id`: string **required** — Identifier
- `legacy_flags`: object — Legacy account flags.
  - `enterprise_zone_quota`: object — Enterprise zone quota for standard and enterprise accounts. Accounts without a quota have a maximum of 0.
    - `available`: integer — Number of additional Enterprise zones available. Returns 0 if the quota is not allocated or is exhausted.
    - `current`: integer — Current number of Enterprise zones.
    - `maximum`: integer — Maximum number of Enterprise zones allowed.
- `managed_by`: object — Parent container details
  - `parent_org_id`: string — ID of the parent Organization, if one exists
  - `parent_org_name`: string — Name of the parent Organization, if one exists
  - `root_org_id`: string — ID of the root Organization, if one exists
  - `should_display_parent_orgs`: boolean — Indicates whether the parent Organization hierarchy should be displayed
- `name`: string **required** — Account name
- `settings`: object — Account settings
  - `abuse_contact_email`: string — Sets an abuse contact email to notify for abuse reports.
  - `enforce_twofactor`: boolean default: `false` — Indicates whether membership in this account requires that
- `type`: any **required**

## PUT /accounts/{account_id}

Update Account

operationId: `accounts-update-account`

**Request** (application/json)

- `created_on`: string — Timestamp for the creation of the account
- `id`: string **required** — Identifier
- `legacy_flags`: object — Legacy account flags.
  - `enterprise_zone_quota`: object — Enterprise zone quota for standard and enterprise accounts. Accounts without a quota have a maximum of 0.
    - `available`: integer — Number of additional Enterprise zones available. Returns 0 if the quota is not allocated or is exhausted.
    - `current`: integer — Current number of Enterprise zones.
    - `maximum`: integer — Maximum number of Enterprise zones allowed.
- `managed_by`: object — Parent container details
  - `parent_org_id`: string — ID of the parent Organization, if one exists
  - `parent_org_name`: string — Name of the parent Organization, if one exists
  - `root_org_id`: string — ID of the root Organization, if one exists
  - `should_display_parent_orgs`: boolean — Indicates whether the parent Organization hierarchy should be displayed
- `name`: string **required** — Account name
- `settings`: object — Account settings
  - `abuse_contact_email`: string — Sets an abuse contact email to notify for abuse reports.
  - `enforce_twofactor`: boolean default: `false` — Indicates whether membership in this account requires that
- `type`: any **required**
- `name`: string — Account name, limited to 65 UTF-8 bytes.

**Response** 200 → `result`

- `created_on`: string — Timestamp for the creation of the account
- `id`: string **required** — Identifier
- `legacy_flags`: object — Legacy account flags.
  - `enterprise_zone_quota`: object — Enterprise zone quota for standard and enterprise accounts. Accounts without a quota have a maximum of 0.
    - `available`: integer — Number of additional Enterprise zones available. Returns 0 if the quota is not allocated or is exhausted.
    - `current`: integer — Current number of Enterprise zones.
    - `maximum`: integer — Maximum number of Enterprise zones allowed.
- `managed_by`: object — Parent container details
  - `parent_org_id`: string — ID of the parent Organization, if one exists
  - `parent_org_name`: string — Name of the parent Organization, if one exists
  - `root_org_id`: string — ID of the root Organization, if one exists
  - `should_display_parent_orgs`: boolean — Indicates whether the parent Organization hierarchy should be displayed
- `name`: string **required** — Account name
- `settings`: object — Account settings
  - `abuse_contact_email`: string — Sets an abuse contact email to notify for abuse reports.
  - `enforce_twofactor`: boolean default: `false` — Indicates whether membership in this account requires that
- `type`: any **required**

## POST /accounts/{account_id}/move

Move account to organization

operationId: `Accounts_moveAccounts`

**Request** (application/json)

- `destination_organization_id`: string **required** — The ID of the organization to move the account into.

**Response** 200 → `result`

- `account_id`: string **required**
- `destination_organization_id`: string **required**
- `source_organization_id`: string **required** — Empty string when the account did not belong to an organization before the move.

## GET /accounts/{account_id}/organizations

List account organizations

operationId: `Accounts_listAccountOrganizations`

**Response** 200 → `result`

[array of]
- `create_time`: string **required**
- `id`: any **required**
- `meta`: object **required**
  - `are_child_accounts_accessible_by_org_members`: boolean
  - `hierarchy_tags`: string[] — Ordered chain of organization tags from the root organization down to
    [array]
  - `managed_by`: string
  - `tenant_flags`: any
  - `tenant_type`: string
- `name`: string **required**
- `parent`: object
  - `id`: string **required**
  - `name`: string **required**
- `profile`: object
  - `business_address`: string **required**
  - `business_email`: string **required**
  - `business_name`: string **required**
  - `business_phone`: string **required**
  - `external_metadata`: string **required**

## GET /accounts/{account_id}/profile

Get account profile

operationId: `Accounts_getAccountProfile`

**Response** 200 → `result`

- `business_address`: string **required**
- `business_email`: string **required**
- `business_name`: string **required**
- `business_phone`: string **required**
- `external_metadata`: string **required**

## PUT /accounts/{account_id}/profile

Update account profile

operationId: `Accounts_modifyAccountProfile`

**Request** (application/json)

- `business_address`: string
- `business_email`: string
- `business_name`: string
- `business_phone`: string
- `external_metadata`: string
