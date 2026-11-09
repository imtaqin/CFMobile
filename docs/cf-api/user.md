# User

3 endpoints.

## GET /user

User Details

operationId: `user-user-details`

**Response** 200 → `result`

- `betas`: string[] — Lists the betas that the user is participating in.
  [array]
- `country`: string — The country in which the user lives.
- `email`: string **required** — Current email address of the user.
- `first_name`: string — User's first name
- `has_business_zones`: boolean default: `false` — Indicates whether user has any business zones
- `has_enterprise_zones`: boolean default: `false` — Indicates whether user has any enterprise zones
- `has_pro_zones`: boolean default: `false` — Indicates whether user has any pro zones
- `id`: string **required** — Identifier of the user.
- `last_name`: string — User's last name
- `organizations`: object[]
  [array of]
  - `id`: string — Identifier
  - `name`: string — Organization name.
  - `permissions`: string[] — Access permissions for this User.
    [array]
  - `roles`: string[] — List of roles that a user has within an organization.
    [array]
  - `status`: string enum: `member`, `invited` — Whether the user is a member of the organization or has an invitation pending.
- `suspended`: boolean default: `false` — Indicates whether user has been suspended
- `telephone`: string — User's telephone number
- `two_factor_authentication_enabled`: boolean default: `false` — Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.
- `two_factor_authentication_locked`: boolean default: `false` — Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.
- `zipcode`: string — The zipcode or postal code where the user lives.

## PATCH /user

Edit User

operationId: `user-edit-user`

**Request** (application/json)

- `country`: string — The country in which the user lives.
- `first_name`: string — User's first name
- `last_name`: string — User's last name
- `telephone`: string — User's telephone number
- `zipcode`: string — The zipcode or postal code where the user lives.

**Response** 200 → `result`

- `betas`: string[] — Lists the betas that the user is participating in.
  [array]
- `country`: string — The country in which the user lives.
- `email`: string **required** — Current email address of the user.
- `first_name`: string — User's first name
- `has_business_zones`: boolean default: `false` — Indicates whether user has any business zones
- `has_enterprise_zones`: boolean default: `false` — Indicates whether user has any enterprise zones
- `has_pro_zones`: boolean default: `false` — Indicates whether user has any pro zones
- `id`: string **required** — Identifier of the user.
- `last_name`: string — User's last name
- `organizations`: object[]
  [array of]
  - `id`: string — Identifier
  - `name`: string — Organization name.
  - `permissions`: string[] — Access permissions for this User.
    [array]
  - `roles`: string[] — List of roles that a user has within an organization.
    [array]
  - `status`: string enum: `member`, `invited` — Whether the user is a member of the organization or has an invitation pending.
- `suspended`: boolean default: `false` — Indicates whether user has been suspended
- `telephone`: string — User's telephone number
- `two_factor_authentication_enabled`: boolean default: `false` — Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.
- `two_factor_authentication_locked`: boolean default: `false` — Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.
- `zipcode`: string — The zipcode or postal code where the user lives.

## GET /user/tenants

List user tenants

operationId: `User_listUserTenants`

**Response** 200 → `result`

[array of]
- `cdate`: string **required**
- `customer_id`: string **required**
- `edate`: string **required**
- `tenant_contacts`: object **required**
  - `email`: string
  - `website`: string
- `tenant_labels`: string[] **required**
  [array]
- `tenant_metadata`: object **required**
  - `billing_account_type`: string
  - `configuration_account`: string
  - `created_by`: string
  - `dns`: object
    - `ns_pool`: object **required**
  - `flags`: object
  - `innate_account_entitlements`: object[]
    [array of]
    - `allocation`: object **required**
    - `feature`: object **required**
  - `tenant_entitlements`: object[]
    [array of]
    - `allocation`: object **required**
    - `feature`: object **required**
- `tenant_name`: string **required**
- `tenant_network`: object **required**
  - `choices`: object
- `tenant_status`: string **required**
- `tenant_tag`: string **required**
- `tenant_type`: string **required**
- `tenant_units`: object[] **required**
  [array of]
  - `unit_memberships`: object[] **required**
    [array of]
    - `member_metadata`: object **required**
    - `member_status`: string **required**
    - `member_tag`: string **required**
  - `unit_metadata`: object **required**
  - `unit_name`: string **required**
  - `unit_status`: string **required**
  - `unit_tag`: string **required**
- `ui_flags`: object **required** — Which top-level dashboard experiences to render for this tenant; both may be true.
  - `show_orgs_ui`: boolean **required** — Render the Organizations experience for this tenant.
  - `show_tenants_ui`: boolean **required** — Render the legacy Tenants experience for this tenant.
