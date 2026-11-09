# Access reusable policies

5 endpoints.

## GET /accounts/{account_id}/access/policies

List Access reusable policies

operationId: `access-policies-list-access-reusable-policies` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
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
- `app_count`: integer — Number of access applications currently using this policy.
- `reusable`: boolean enum: `true`

## POST /accounts/{account_id}/access/policies

Create an Access reusable policy

operationId: `access-policies-create-an-access-reusable-policy`

**Request** (application/json)

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
- `app_count`: integer — Number of access applications currently using this policy.
- `reusable`: boolean enum: `true`

## DELETE /accounts/{account_id}/access/policies/{policy_id}

Delete an Access reusable policy

operationId: `access-policies-delete-an-access-reusable-policy`

**Response** 202 → `result`

- `id`: string — The UUID of the policy

## GET /accounts/{account_id}/access/policies/{policy_id}

Get an Access reusable policy

operationId: `access-policies-get-an-access-reusable-policy`

**Response** 200 → `result`

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
- `app_count`: integer — Number of access applications currently using this policy.
- `reusable`: boolean enum: `true`

## PUT /accounts/{account_id}/access/policies/{policy_id}

Update an Access reusable policy

operationId: `access-policies-update-an-access-reusable-policy`

**Request** (application/json)

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
- `app_count`: integer — Number of access applications currently using this policy.
- `reusable`: boolean enum: `true`
