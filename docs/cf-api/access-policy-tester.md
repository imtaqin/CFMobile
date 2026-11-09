# Access policy tester

3 endpoints.

## POST /accounts/{account_id}/access/policy-tests

Start Access policy test

operationId: `access-policy-tests`

**Request** (application/json)

- `policies`: object[]
  [array of]
  - `decision`: string **required** enum: `allow`, `deny`, `non_identity`, `bypass` — The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.
  - `exclude`: object[] default: `` — Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.
    [array of]
    - `group`: object **required**
  - `include`: object[] **required** default: `` — Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.
    [array of]
    - `group`: object **required**
  - `name`: string **required** — The name of the Access policy.
  - `policy_resolution_account_id`: string — The account ID used to resolve policy resources and identity for cross-account WARP authentication. The account must be trusted by the accou
  - `require`: object[] default: `` — Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.
    [array of]
    - `group`: object **required**

**Response** 200 → `result`

- `id`: string — The UUID of the policy test.
- `status`: string enum: `success` — The status of the policy test request.

## GET /accounts/{account_id}/access/policy-tests/{policy_test_id}

Get the current status of a given Access policy test

operationId: `access-policy-tests-get-an-update`

**Response** 200 → `result`

- `id`: string — The UUID of the policy test.
- `percent_approved`: integer — The percentage of (processed) users approved based on policy evaluation results.
- `percent_blocked`: integer — The percentage of (processed) users blocked based on policy evaluation results.
- `percent_errored`: integer — The percentage of (processed) users errored based on policy evaluation results.
- `percent_users_processed`: integer — The percentage of users processed so far (of the entire user base).
- `status`: string enum: `blocked`, `processing`, `exceeded time`, `complete` — The status of the policy test.
- `total_users`: integer — The total number of users in the user base.
- `users_approved`: integer — The number of (processed) users approved based on policy evaluation results.
- `users_blocked`: integer — The number of (processed) users blocked based on policy evaluation results.
- `users_errored`: integer — The number of (processed) users errored based on policy evaluation results.

## GET /accounts/{account_id}/access/policy-tests/{policy_test_id}/users

Get an Access policy test users page

operationId: `access-policy-tests-get-a-user-page` · query: `page`, `per_page`, `status`

**Response** 200 → `result`

[array of]
- `email`: string — The email of the user.
- `id`: string — UUID.
- `name`: string — The name of the user.
- `status`: string enum: `approved`, `blocked`, `error` — Policy evaluation result for an individual user.
