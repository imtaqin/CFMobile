# Zone-Level Access policies

5 endpoints.

## GET /zones/{zone_id}/access/apps/{app_id}/policies

List Access policies

operationId: `zone-level-access-policies-list-access-policies`

**Response** 200 → `result`

[array of]
- `approval_groups`: object[] — Administrators who can approve a temporary authentication request.
  [array of]
  - `approvals_needed`: number **required** — The number of approvals needed to obtain access.
  - `email_addresses`: string[] — A list of emails that can approve the access request.
    [array]
  - `email_list_uuid`: string — The UUID of an re-usable email list.
- `approval_required`: boolean default: `false` — Requires the user to request access from an administrator at the start of each session.
- `created_at`: string
- `decision`: string enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy.
- `exclude`: object[] — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `id`: string — UUID.
- `include`: object[] — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `isolation_required`: boolean default: `false` — Require this application to be served in an isolated browser for users matching this policy.
- `name`: string — The name of the Access policy.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy.
- `purpose_justification_prompt`: string — A custom message that will appear on the purpose justification screen.
- `purpose_justification_required`: boolean default: `false` — Require users to enter a justification when they log in to the application.
- `require`: object[] — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `updated_at`: string

## POST /zones/{zone_id}/access/apps/{app_id}/policies

Create an Access policy

operationId: `zone-level-access-policies-create-an-access-policy`

**Request** (application/json)

- `approval_groups`: object[] — Administrators who can approve a temporary authentication request.
  [array of]
  - `approvals_needed`: number **required** — The number of approvals needed to obtain access.
  - `email_addresses`: string[] — A list of emails that can approve the access request.
    [array]
  - `email_list_uuid`: string — The UUID of an re-usable email list.
- `approval_required`: boolean default: `false` — Requires the user to request access from an administrator at the start of each session.
- `decision`: string **required** enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy.
- `exclude`: object[] — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `include`: object[] **required** — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `isolation_required`: boolean default: `false` — Require this application to be served in an isolated browser for users matching this policy.
- `name`: string **required** — The name of the Access policy.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy.
- `purpose_justification_prompt`: string — A custom message that will appear on the purpose justification screen.
- `purpose_justification_required`: boolean default: `false` — Require users to enter a justification when they log in to the application.
- `require`: object[] — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.

**Response** 201 → `result`

- `approval_groups`: object[] — Administrators who can approve a temporary authentication request.
  [array of]
  - `approvals_needed`: number **required** — The number of approvals needed to obtain access.
  - `email_addresses`: string[] — A list of emails that can approve the access request.
    [array]
  - `email_list_uuid`: string — The UUID of an re-usable email list.
- `approval_required`: boolean default: `false` — Requires the user to request access from an administrator at the start of each session.
- `created_at`: string
- `decision`: string enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy.
- `exclude`: object[] — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `id`: string — UUID.
- `include`: object[] — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `isolation_required`: boolean default: `false` — Require this application to be served in an isolated browser for users matching this policy.
- `name`: string — The name of the Access policy.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy.
- `purpose_justification_prompt`: string — A custom message that will appear on the purpose justification screen.
- `purpose_justification_required`: boolean default: `false` — Require users to enter a justification when they log in to the application.
- `require`: object[] — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `updated_at`: string

## DELETE /zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}

Delete an Access policy

operationId: `zone-level-access-policies-delete-an-access-policy`

**Response** 202 → `result`

- `id`: string — UUID.

## GET /zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}

Get an Access policy

operationId: `zone-level-access-policies-get-an-access-policy`

**Response** 200 → `result`

- `approval_groups`: object[] — Administrators who can approve a temporary authentication request.
  [array of]
  - `approvals_needed`: number **required** — The number of approvals needed to obtain access.
  - `email_addresses`: string[] — A list of emails that can approve the access request.
    [array]
  - `email_list_uuid`: string — The UUID of an re-usable email list.
- `approval_required`: boolean default: `false` — Requires the user to request access from an administrator at the start of each session.
- `created_at`: string
- `decision`: string enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy.
- `exclude`: object[] — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `id`: string — UUID.
- `include`: object[] — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `isolation_required`: boolean default: `false` — Require this application to be served in an isolated browser for users matching this policy.
- `name`: string — The name of the Access policy.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy.
- `purpose_justification_prompt`: string — A custom message that will appear on the purpose justification screen.
- `purpose_justification_required`: boolean default: `false` — Require users to enter a justification when they log in to the application.
- `require`: object[] — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `updated_at`: string

## PUT /zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}

Update an Access policy

operationId: `zone-level-access-policies-update-an-access-policy`

**Request** (application/json)

- `approval_groups`: object[] — Administrators who can approve a temporary authentication request.
  [array of]
  - `approvals_needed`: number **required** — The number of approvals needed to obtain access.
  - `email_addresses`: string[] — A list of emails that can approve the access request.
    [array]
  - `email_list_uuid`: string — The UUID of an re-usable email list.
- `approval_required`: boolean default: `false` — Requires the user to request access from an administrator at the start of each session.
- `decision`: string **required** enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy.
- `exclude`: object[] — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `include`: object[] **required** — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `isolation_required`: boolean default: `false` — Require this application to be served in an isolated browser for users matching this policy.
- `name`: string **required** — The name of the Access policy.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy.
- `purpose_justification_prompt`: string — A custom message that will appear on the purpose justification screen.
- `purpose_justification_required`: boolean default: `false` — Require users to enter a justification when they log in to the application.
- `require`: object[] — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.

**Response** 200 → `result`

- `approval_groups`: object[] — Administrators who can approve a temporary authentication request.
  [array of]
  - `approvals_needed`: number **required** — The number of approvals needed to obtain access.
  - `email_addresses`: string[] — A list of emails that can approve the access request.
    [array]
  - `email_list_uuid`: string — The UUID of an re-usable email list.
- `approval_required`: boolean default: `false` — Requires the user to request access from an administrator at the start of each session.
- `created_at`: string
- `decision`: string enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy.
- `exclude`: object[] — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `id`: string — UUID.
- `include`: object[] — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `isolation_required`: boolean default: `false` — Require this application to be served in an isolated browser for users matching this policy.
- `name`: string — The name of the Access policy.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy.
- `purpose_justification_prompt`: string — A custom message that will appear on the purpose justification screen.
- `purpose_justification_required`: boolean default: `false` — Require users to enter a justification when they log in to the application.
- `require`: object[] — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `updated_at`: string
