# Approvals

4 endpoints.

## GET /accounts/{account_id}/cloudforce-one/rules/approvals

List rule approvals

operationId: `cloudforce-one-list-rule-approvals` · query: `status`, `latest_only`, `limit`, `offset`, `reviewer_scope`, `change_type`, `rule_id`

**Response** 200 → `result`

- `approvals`: object[] **required**
  [array of]
  - `audit_log_id`: number **required**
  - `can_review`: boolean **required** — Whether the authenticated user may approve or reject this pending change.
  - `cancelled_at`: number **required** — Time at which the requester cancelled the approval.
  - `cancelled_by`: string **required** — Requester who cancelled the pending approval.
  - `change_description`: string **required**
  - `change_type`: string **required** enum: `create`, `update`, `delete`, `unresolved`
  - `commit_message`: string **required** — The requester supplies this human-readable justification with the change. Internal-account mutations require it; customer accounts and sync-
  - `id`: number **required**
  - `proposed_changes`: any **required** — Contains structured proposed rule changes, or null for unresolved persisted data.
  - `rejection_reason`: string **required** — The reviewer may supply a reason when rejecting the change.
  - `requested_at`: number **required**
  - `requested_by`: string **required**
  - `reviewed_at`: number **required**
  - `reviewer_scope`: string **required** enum: `default`, `email`, `unresolved` — Review policy: general Nomos approvers for default; general approvers or Phishguard for email.
  - `revision_number`: integer **required** — Revision number within this approval request chain.
  - `rule_id`: string **required**
  - `rule_name`: string **required**
  - `status`: string **required** enum: `pending`, `approved`, `rejected`, `cancelled`
  - `superseded_by_approval_id`: number **required** — Newer approval revision that replaced this approval.
  - `supersedes_approval_id`: number **required** — This approval replaces the referenced approval revision.
- `total`: number **required**

## GET /accounts/{account_id}/cloudforce-one/rules/approvals/{id}

Get rule approval details

operationId: `cloudforce-one-get-rule-approval`

**Response** 200 → `result`

- `approval`: object **required**
  - `audit_log_id`: number **required**
  - `can_review`: boolean **required** — Whether the authenticated user may approve or reject this pending change.
  - `cancelled_at`: number **required** — Time at which the requester cancelled the approval.
  - `cancelled_by`: string **required** — Requester who cancelled the pending approval.
  - `change_description`: string **required**
  - `change_type`: string **required** enum: `create`, `update`, `delete`, `unresolved`
  - `commit_message`: string **required** — The requester supplies this human-readable justification with the change. Internal-account mutations require it; customer accounts and sync-
  - `compiler_warnings`: object[]
    [array of]
    - `code`: string **required**
    - `column`: integer
    - `footers`: object[] default: ``
    - `labels`: object[] default: ``
    - `line`: integer
    - `text`: string **required**
    - `title`: string **required**
  - `current_rule`: any **required**
  - `id`: number **required**
  - `proposed_changes`: any **required** — Contains structured proposed rule changes, or null for unresolved persisted data.
  - `rejection_reason`: string **required** — The reviewer may supply a reason when rejecting the change.
  - `requested_at`: number **required**
  - `requested_by`: string **required**
  - `reviewed_at`: number **required**
  - `reviewer_scope`: string **required** enum: `default`, `email`, `unresolved` — Review policy: general Nomos approvers for default; general approvers or Phishguard for email.
  - `revision_number`: integer **required** — Revision number within this approval request chain.
  - `rule_id`: string **required**
  - `rule_name`: string **required**
  - `status`: string **required** enum: `pending`, `approved`, `rejected`, `cancelled`
  - `superseded_by_approval_id`: number **required** — Newer approval revision that replaced this approval.
  - `supersedes_approval_id`: number **required** — This approval replaces the referenced approval revision.

## POST /accounts/{account_id}/cloudforce-one/rules/approvals/{id}/cancel

Cancel a pending approval

operationId: `cloudforce-one-cancel-rule-approval`

**Response** 200 → `result`

- `success`: boolean **required**

## POST /accounts/{account_id}/cloudforce-one/rules/approvals/{id}/resubmit

Revise and resubmit a rejected approval

operationId: `cloudforce-one-resubmit-rule-approval`

**Request** (application/json)

- `commit_message`: string
- `content`: string
- `description`: string
- `enabled`: boolean
- `name`: string
- `namespaces`: string[]
  [array]

**Response** 202 → `result`

- `approval_id`: number **required**
- `message`: string **required**
- `requires_approval`: boolean **required** enum: `true`
- `revision_number`: integer **required**
- `supersedes_approval_id`: number **required**
