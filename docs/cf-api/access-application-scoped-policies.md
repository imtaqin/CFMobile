# Access application-scoped policies

6 endpoints.

## GET /accounts/{account_id}/access/apps/{app_id}/policies

List Access application policies

operationId: `access-policies-list-access-app-policies` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `created_at`: string
- `decision`: string enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.
- `exclude`: object[] default: `` — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `id`: string — The UUID of the policy
- `include`: object[] default: `` — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `name`: string — The name of the Access policy.
- `policy_resolution_account_id`: string — The account ID used to resolve policy resources and identity for cross-account WARP authentication. The account must be trusted by the accou
- `require`: object[] default: `` — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `updated_at`: string
- `account_id`: string — Identifier.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy within an app.

## POST /accounts/{account_id}/access/apps/{app_id}/policies

Create an Access application policy

operationId: `access-policies-create-an-access-policy`

**Request** (application/json)

(one of 2 variants; showing the first)
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy within an app.
- `decision`: string **required** enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.
- `exclude`: object[] default: `` — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `include`: object[] **required** default: `` — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `name`: string **required** — The name of the Access policy.
- `policy_resolution_account_id`: string — The account ID used to resolve policy resources and identity for cross-account WARP authentication. The account must be trusted by the accou
- `require`: object[] default: `` — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.

**Response** 201 → `result`

(one of 2 variants; showing the first)
- `created_at`: string
- `decision`: string enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.
- `exclude`: object[] default: `` — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `id`: string — The UUID of the policy
- `include`: object[] default: `` — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `name`: string — The name of the Access policy.
- `policy_resolution_account_id`: string — The account ID used to resolve policy resources and identity for cross-account WARP authentication. The account must be trusted by the accou
- `require`: object[] default: `` — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `updated_at`: string
- `account_id`: string — Identifier.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy within an app.

## DELETE /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}

Delete an Access application policy

operationId: `access-policies-delete-an-access-policy`

**Response** 202 → `result`

- `id`: string — UUID.

## GET /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}

Get an Access application policy

operationId: `access-policies-get-an-access-policy`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_at`: string
- `decision`: string enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.
- `exclude`: object[] default: `` — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `id`: string — The UUID of the policy
- `include`: object[] default: `` — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `name`: string — The name of the Access policy.
- `policy_resolution_account_id`: string — The account ID used to resolve policy resources and identity for cross-account WARP authentication. The account must be trusted by the accou
- `require`: object[] default: `` — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `updated_at`: string
- `account_id`: string — Identifier.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy within an app.

## PUT /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}

Update an Access application policy

operationId: `access-policies-update-an-access-policy`

**Request** (application/json)

(one of 2 variants; showing the first)
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy within an app.
- `decision`: string **required** enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.
- `exclude`: object[] default: `` — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `include`: object[] **required** default: `` — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `name`: string **required** — The name of the Access policy.
- `policy_resolution_account_id`: string — The account ID used to resolve policy resources and identity for cross-account WARP authentication. The account must be trusted by the accou
- `require`: object[] default: `` — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_at`: string
- `decision`: string enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.
- `exclude`: object[] default: `` — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `id`: string — The UUID of the policy
- `include`: object[] default: `` — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `name`: string — The name of the Access policy.
- `policy_resolution_account_id`: string — The account ID used to resolve policy resources and identity for cross-account WARP authentication. The account must be trusted by the accou
- `require`: object[] default: `` — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `updated_at`: string
- `account_id`: string — Identifier.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy within an app.

## PUT /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}/make_reusable

Convert an Access application policy to a reusable policy

operationId: `access-policies-convert-reusable`

**Response** 200 → `result`

[array of]
(one of 2 variants; showing the first)
- `created_at`: string
- `decision`: string enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.
- `exclude`: object[] default: `` — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `id`: string — The UUID of the policy
- `include`: object[] default: `` — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `name`: string — The name of the Access policy.
- `policy_resolution_account_id`: string — The account ID used to resolve policy resources and identity for cross-account WARP authentication. The account must be trusted by the accou
- `require`: object[] default: `` — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
  [array of]
  - `group`: object **required**
    - `id`: string **required** — The ID of a previously created Access group.
- `updated_at`: string
- `account_id`: string — Identifier.
- `precedence`: integer — The order of execution for this policy. Must be unique for each policy within an app.
