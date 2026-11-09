# Zone-Level Zero Trust organization

4 endpoints.

## GET /zones/{zone_id}/access/organizations

Get your Zero Trust organization

operationId: `zone-level-zero-trust-organization-get-your-zero-trust-organization`

**Response** 200 → `result`

- `auth_domain`: string — The unique subdomain assigned to your Zero Trust organization. Auto-generated if omitted on creation.
- `created_at`: string
- `deny_unmatched_requests`: boolean — Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must e
- `deny_unmatched_requests_exempted_zone_names`: string[] — Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthentic
  [array]
- `is_ui_read_only`: boolean — Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this a
- `login_design`: object
  - `background_color`: string — The background color on your login page.
  - `footer_text`: string — The text at the bottom of your login page.
  - `header_text`: string — The text at the top of your login page.
  - `logo_path`: string — The URL of the logo on your login page.
  - `text_color`: string — The text color on your login page.
- `name`: string — The name of your Zero Trust organization. When omitted on creation, defaults to the provided auth_domain; when both are omitted, defaults to
- `strict_service_token_auth`: boolean — Enables new behaviors for requests made with Access service tokens. Unauthorized requests emit audit logs, and return a 401 or 403 status co
- `ui_read_only_toggle_reason`: string — A description of the reason why the UI read only field is being toggled.
- `updated_at`: string
- `user_seat_expiration_inactive_time`: string — The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as 
- `trusted_accounts`: string[] — The account tags of organizations trusted by this organization for policy and device posture sharing.
  [array]

## POST /zones/{zone_id}/access/organizations

Create your Zero Trust organization

operationId: `zone-level-zero-trust-organization-create-your-zero-trust-organization`

**Request** (application/json)

- `auth_domain`: string — The unique subdomain assigned to your Zero Trust organization. Auto-generated if omitted on creation.
- `is_ui_read_only`: boolean — Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this a
- `login_design`: object
  - `background_color`: string — The background color on your login page.
  - `footer_text`: string — The text at the bottom of your login page.
  - `header_text`: string — The text at the top of your login page.
  - `logo_path`: string — The URL of the logo on your login page.
  - `text_color`: string — The text color on your login page.
- `name`: string — The name of your Zero Trust organization. When omitted on creation, defaults to the provided auth_domain; when both are omitted, defaults to
- `strict_service_token_auth`: boolean — Enables new behaviors for requests made with Access service tokens. Unauthorized requests emit audit logs, and return a 401 or 403 status co
- `ui_read_only_toggle_reason`: string — A description of the reason why the UI read only field is being toggled.
- `user_seat_expiration_inactive_time`: string — The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as 

**Response** 201 → `result`

- `auth_domain`: string — The unique subdomain assigned to your Zero Trust organization. Auto-generated if omitted on creation.
- `created_at`: string
- `deny_unmatched_requests`: boolean — Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must e
- `deny_unmatched_requests_exempted_zone_names`: string[] — Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthentic
  [array]
- `is_ui_read_only`: boolean — Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this a
- `login_design`: object
  - `background_color`: string — The background color on your login page.
  - `footer_text`: string — The text at the bottom of your login page.
  - `header_text`: string — The text at the top of your login page.
  - `logo_path`: string — The URL of the logo on your login page.
  - `text_color`: string — The text color on your login page.
- `name`: string — The name of your Zero Trust organization. When omitted on creation, defaults to the provided auth_domain; when both are omitted, defaults to
- `strict_service_token_auth`: boolean — Enables new behaviors for requests made with Access service tokens. Unauthorized requests emit audit logs, and return a 401 or 403 status co
- `ui_read_only_toggle_reason`: string — A description of the reason why the UI read only field is being toggled.
- `updated_at`: string
- `user_seat_expiration_inactive_time`: string — The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as 

## PUT /zones/{zone_id}/access/organizations

Update your Zero Trust organization

operationId: `zone-level-zero-trust-organization-update-your-zero-trust-organization`

**Request** (application/json)

- `auth_domain`: string — The unique subdomain assigned to your Zero Trust organization. Auto-generated if omitted on creation.
- `is_ui_read_only`: boolean — Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this a
- `login_design`: object
  - `background_color`: string — The background color on your login page.
  - `footer_text`: string — The text at the bottom of your login page.
  - `header_text`: string — The text at the top of your login page.
  - `logo_path`: string — The URL of the logo on your login page.
  - `text_color`: string — The text color on your login page.
- `name`: string — The name of your Zero Trust organization. When omitted on creation, defaults to the provided auth_domain; when both are omitted, defaults to
- `strict_service_token_auth`: boolean — Enables new behaviors for requests made with Access service tokens. Unauthorized requests emit audit logs, and return a 401 or 403 status co
- `ui_read_only_toggle_reason`: string — A description of the reason why the UI read only field is being toggled.
- `user_seat_expiration_inactive_time`: string — The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as 

**Response** 200 → `result`

- `auth_domain`: string — The unique subdomain assigned to your Zero Trust organization. Auto-generated if omitted on creation.
- `created_at`: string
- `deny_unmatched_requests`: boolean — Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must e
- `deny_unmatched_requests_exempted_zone_names`: string[] — Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthentic
  [array]
- `is_ui_read_only`: boolean — Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this a
- `login_design`: object
  - `background_color`: string — The background color on your login page.
  - `footer_text`: string — The text at the bottom of your login page.
  - `header_text`: string — The text at the top of your login page.
  - `logo_path`: string — The URL of the logo on your login page.
  - `text_color`: string — The text color on your login page.
- `name`: string — The name of your Zero Trust organization. When omitted on creation, defaults to the provided auth_domain; when both are omitted, defaults to
- `strict_service_token_auth`: boolean — Enables new behaviors for requests made with Access service tokens. Unauthorized requests emit audit logs, and return a 401 or 403 status co
- `ui_read_only_toggle_reason`: string — A description of the reason why the UI read only field is being toggled.
- `updated_at`: string
- `user_seat_expiration_inactive_time`: string — The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as 

## POST /zones/{zone_id}/access/organizations/revoke_user

Revoke all Access tokens for a user

operationId: `zone-level-zero-trust-organization-revoke-all-access-tokens-for-a-user`

**Request** (application/json)

- `email`: string **required** — The email of the user to revoke.

**Response** 200 → `result`

boolean
