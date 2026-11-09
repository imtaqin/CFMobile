# Spend Policies

7 endpoints.

## GET /accounts/{account_id}/billing/spend-policies

List Spend Policies

operationId: `spend-policies-list`

**Response** 200 → `result`

[array of]
- `account_id`: integer **required** — Internal numeric ID of the account that owns the policy. This is not the account tag used in the path.
- `action`: string **required** enum: `notification`, `usage_block` — The action taken when the threshold is reached. `notification` sends an email to `notification_email`. `usage_block` blocks further usage of
- `current_state`: object — Read-only state on list/get responses, evaluated from the latest owning projector snapshot at request time, independently of the API replica
  - `balance_cents`: integer **required**
  - `billing_period_end`: string **required**
  - `billing_period_start`: string **required**
  - `enforcement`: object **required** — Durable desired cap and delivery bookkeeping for this policy, or null if no owned effect exists. Separate from threshold evaluation: pending
    - `applied_generation`: integer **required**
    - `delivery_status`: string **required** enum: `pending`, `leased`, `retry`, `succeeded`
    - `desired_generation`: integer **required**
    - `desired_state`: string **required** enum: `active`, `inactive`
    - `expires_at`: string **required**
  - `evaluated_at`: string **required** — Evaluation time; not the timestamp of the latest usage event.
  - `status`: string **required** enum: `disabled`, `no_current_period`, `unavailable`, `below_limit`, `limit_reached` — Threshold evaluation, not proof of an edge cap. No current active period yields no_current_period for enabled policies; failed aggregate rea
- `enabled`: boolean **required** — Whether the policy is evaluated.
- `id`: string **required** — The unique identifier of the spend policy.
- `name`: string **required** — Display name of the policy.
- `notification_email`: string **required** — Email address that receives notifications. An empty string when none is set.
- `product_id`: string **required** enum: `workers`, `durable_objects` — The product the policy applies to: `workers` or `durable_objects`. Each product's balance and policies are separate. Both products support `
- `threshold_cents`: integer **required** — The spend threshold for the current billing period, in US cents.
- `version`: integer **required** — Optimistic-concurrency version. It starts at 1 and goes up by one on every update or delete. This value is also returned in `ETag`.

## POST /accounts/{account_id}/billing/spend-policies

Create Spend Policy

operationId: `spend-policies-create`

**Request** (application/json)

- `action`: string **required** enum: `notification`, `usage_block` — The action taken when the threshold is reached. `notification` sends an email to `notification_email`. `usage_block` blocks further usage of
- `enabled`: boolean **required** — Whether the policy is evaluated.
- `name`: string **required** — Display name of the policy. After surrounding whitespace is trimmed, it must be 1 to 200 bytes long. The value is stored as sent, untrimmed.
- `notification_email`: string — Email address that receives notifications. Required when `action` is `notification`. When set, it must be a bare address (`user@example.com`
- `product_id`: string **required** enum: `workers`, `durable_objects` — The product the policy applies to: `workers` or `durable_objects`. Each product's balance and policies are separate. Both products support `
- `threshold_cents`: integer **required** — The spend threshold for the current billing period, in US cents. Must be greater than zero.

**Response** 201 → `result`

- `account_id`: integer **required** — Internal numeric ID of the account that owns the policy. This is not the account tag used in the path.
- `action`: string **required** enum: `notification`, `usage_block` — The action taken when the threshold is reached. `notification` sends an email to `notification_email`. `usage_block` blocks further usage of
- `current_state`: object — Read-only state on list/get responses, evaluated from the latest owning projector snapshot at request time, independently of the API replica
  - `balance_cents`: integer **required**
  - `billing_period_end`: string **required**
  - `billing_period_start`: string **required**
  - `enforcement`: object **required** — Durable desired cap and delivery bookkeeping for this policy, or null if no owned effect exists. Separate from threshold evaluation: pending
    - `applied_generation`: integer **required**
    - `delivery_status`: string **required** enum: `pending`, `leased`, `retry`, `succeeded`
    - `desired_generation`: integer **required**
    - `desired_state`: string **required** enum: `active`, `inactive`
    - `expires_at`: string **required**
  - `evaluated_at`: string **required** — Evaluation time; not the timestamp of the latest usage event.
  - `status`: string **required** enum: `disabled`, `no_current_period`, `unavailable`, `below_limit`, `limit_reached` — Threshold evaluation, not proof of an edge cap. No current active period yields no_current_period for enabled policies; failed aggregate rea
- `enabled`: boolean **required** — Whether the policy is evaluated.
- `id`: string **required** — The unique identifier of the spend policy.
- `name`: string **required** — Display name of the policy.
- `notification_email`: string **required** — Email address that receives notifications. An empty string when none is set.
- `product_id`: string **required** enum: `workers`, `durable_objects` — The product the policy applies to: `workers` or `durable_objects`. Each product's balance and policies are separate. Both products support `
- `threshold_cents`: integer **required** — The spend threshold for the current billing period, in US cents.
- `version`: integer **required** — Optimistic-concurrency version. It starts at 1 and goes up by one on every update or delete. This value is also returned in `ETag`.

## DELETE /accounts/{account_id}/billing/spend-policies/{policy_id}

Delete Spend Policy

operationId: `spend-policies-delete`

**Response** 200 → `result`

- `id`: string **required** — The unique identifier of the spend policy.

## GET /accounts/{account_id}/billing/spend-policies/{policy_id}

Get Spend Policy

operationId: `spend-policies-get`

**Response** 200 → `result`

- `account_id`: integer **required** — Internal numeric ID of the account that owns the policy. This is not the account tag used in the path.
- `action`: string **required** enum: `notification`, `usage_block` — The action taken when the threshold is reached. `notification` sends an email to `notification_email`. `usage_block` blocks further usage of
- `current_state`: object — Read-only state on list/get responses, evaluated from the latest owning projector snapshot at request time, independently of the API replica
  - `balance_cents`: integer **required**
  - `billing_period_end`: string **required**
  - `billing_period_start`: string **required**
  - `enforcement`: object **required** — Durable desired cap and delivery bookkeeping for this policy, or null if no owned effect exists. Separate from threshold evaluation: pending
    - `applied_generation`: integer **required**
    - `delivery_status`: string **required** enum: `pending`, `leased`, `retry`, `succeeded`
    - `desired_generation`: integer **required**
    - `desired_state`: string **required** enum: `active`, `inactive`
    - `expires_at`: string **required**
  - `evaluated_at`: string **required** — Evaluation time; not the timestamp of the latest usage event.
  - `status`: string **required** enum: `disabled`, `no_current_period`, `unavailable`, `below_limit`, `limit_reached` — Threshold evaluation, not proof of an edge cap. No current active period yields no_current_period for enabled policies; failed aggregate rea
- `enabled`: boolean **required** — Whether the policy is evaluated.
- `id`: string **required** — The unique identifier of the spend policy.
- `name`: string **required** — Display name of the policy.
- `notification_email`: string **required** — Email address that receives notifications. An empty string when none is set.
- `product_id`: string **required** enum: `workers`, `durable_objects` — The product the policy applies to: `workers` or `durable_objects`. Each product's balance and policies are separate. Both products support `
- `threshold_cents`: integer **required** — The spend threshold for the current billing period, in US cents.
- `version`: integer **required** — Optimistic-concurrency version. It starts at 1 and goes up by one on every update or delete. This value is also returned in `ETag`.

## PUT /accounts/{account_id}/billing/spend-policies/{policy_id}

Update Spend Policy

operationId: `spend-policies-update`

**Request** (application/json)

- `action`: string **required** enum: `notification`, `usage_block` — The action taken when the threshold is reached. `notification` sends an email to `notification_email`. `usage_block` blocks further usage of
- `enabled`: boolean **required** — Whether the policy is evaluated.
- `name`: string **required** — Display name of the policy. After surrounding whitespace is trimmed, it must be 1 to 200 bytes long. The value is stored as sent, untrimmed.
- `notification_email`: string — Email address that receives notifications. Required when `action` is `notification`. When set, it must be a bare address (`user@example.com`
- `product_id`: string **required** enum: `workers`, `durable_objects` — The product the policy applies to: `workers` or `durable_objects`. Each product's balance and policies are separate. Both products support `
- `threshold_cents`: integer **required** — The spend threshold for the current billing period, in US cents. Must be greater than zero.

**Response** 200 → `result`

- `account_id`: integer **required** — Internal numeric ID of the account that owns the policy. This is not the account tag used in the path.
- `action`: string **required** enum: `notification`, `usage_block` — The action taken when the threshold is reached. `notification` sends an email to `notification_email`. `usage_block` blocks further usage of
- `current_state`: object — Read-only state on list/get responses, evaluated from the latest owning projector snapshot at request time, independently of the API replica
  - `balance_cents`: integer **required**
  - `billing_period_end`: string **required**
  - `billing_period_start`: string **required**
  - `enforcement`: object **required** — Durable desired cap and delivery bookkeeping for this policy, or null if no owned effect exists. Separate from threshold evaluation: pending
    - `applied_generation`: integer **required**
    - `delivery_status`: string **required** enum: `pending`, `leased`, `retry`, `succeeded`
    - `desired_generation`: integer **required**
    - `desired_state`: string **required** enum: `active`, `inactive`
    - `expires_at`: string **required**
  - `evaluated_at`: string **required** — Evaluation time; not the timestamp of the latest usage event.
  - `status`: string **required** enum: `disabled`, `no_current_period`, `unavailable`, `below_limit`, `limit_reached` — Threshold evaluation, not proof of an edge cap. No current active period yields no_current_period for enabled policies; failed aggregate rea
- `enabled`: boolean **required** — Whether the policy is evaluated.
- `id`: string **required** — The unique identifier of the spend policy.
- `name`: string **required** — Display name of the policy.
- `notification_email`: string **required** — Email address that receives notifications. An empty string when none is set.
- `product_id`: string **required** enum: `workers`, `durable_objects` — The product the policy applies to: `workers` or `durable_objects`. Each product's balance and policies are separate. Both products support `
- `threshold_cents`: integer **required** — The spend threshold for the current billing period, in US cents.
- `version`: integer **required** — Optimistic-concurrency version. It starts at 1 and goes up by one on every update or delete. This value is also returned in `ETag`.

## GET /accounts/{account_id}/billing/spend-policies/{policy_id}/audit

List Spend Policy Audit Entries

operationId: `spend-policies-list-audit` · query: `limit`, `period`

**Response** 200 → `result`

[array of]
- `action`: string **required** enum: `notification`, `usage_block` — The action taken when the threshold is reached. `notification` sends an email to `notification_email`. `usage_block` blocks further usage of
- `balance_cents`: integer **required** — The account's balance for the product at evaluation time, in US cents.
- `billing_period_end`: string **required** — Exclusive end of the billing period that was evaluated.
- `billing_period_start`: string **required** — Inclusive start of the billing period that was evaluated.
- `created_at`: string **required** — When the entry was recorded.
- `policy_version`: integer **required** — The policy `version` that was evaluated.
- `reason`: string **required** — A human-readable explanation of the trigger.
- `source`: string **required** enum: `kafka`, `policy_revision` — What caused the evaluation. `kafka` means a balance update. `policy_revision` means a change to the policy.
- `threshold_cents`: integer **required** — The policy threshold at evaluation time, in US cents.
- `trigger`: string **required** — The trigger recorded at evaluation time. New evaluations record `limit_reached` when the balance reaches or exceeds the configured threshold

## GET /accounts/{account_id}/billing/spend-policies/activity

List Spend Policy Activity

operationId: `spend-policies-activity` · query: `limit`, `period`, `cursor`

**Response** 200 → `result`

[array of]
- `action`: string **required** enum: `created`, `updated`, `enabled`, `disabled`, `deleted`
- `actor`: string **required** — Verified actor identifier, unknown when absent, or trusted internal actor.
- `details`: object **required**
  - `after`: object — A spend policy.
    - `account_id`: integer **required** — Internal numeric ID of the account that owns the policy. This is not the account tag used in the path.
    - `action`: string **required** enum: `notification`, `usage_block` — The action taken when the threshold is reached. `notification` sends an email to `notification_email`. `usage_block` blocks further usage of
    - `current_state`: object — Read-only state on list/get responses, evaluated from the latest owning projector snapshot at request time, independently of the API replica
    - `enabled`: boolean **required** — Whether the policy is evaluated.
    - `id`: string **required** — The unique identifier of the spend policy.
    - `name`: string **required** — Display name of the policy.
    - `notification_email`: string **required** — Email address that receives notifications. An empty string when none is set.
    - `product_id`: string **required** enum: `workers`, `durable_objects` — The product the policy applies to: `workers` or `durable_objects`. Each product's balance and policies are separate. Both products support `
    - `threshold_cents`: integer **required** — The spend threshold for the current billing period, in US cents.
    - `version`: integer **required** — Optimistic-concurrency version. It starts at 1 and goes up by one on every update or delete. This value is also returned in `ETag`.
  - `before`: object — Prior configuration; null on creation or if a previous revision is unavailable.
- `id`: string **required**
- `occurred_at`: string **required**
- `policy_id`: string **required** — The unique identifier of the spend policy.
- `policy_version`: integer **required**
- `product_id`: string **required**
