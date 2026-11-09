# IP Address Management Prefix Delegation

3 endpoints.

## GET /accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations

List Prefix Delegations

operationId: `ip-address-management-prefix-delegation-list-prefix-delegations`

**Response** 200 → `result`

[array of]
- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `delegated_account_id`: string — Account identifier for the account to which prefix is being delegated.
- `id`: string — Identifier of a Delegation.
- `modified_at`: string
- `parent_prefix_id`: string — Identifier of an IP Prefix.

## POST /accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations

Create Prefix Delegation

operationId: `ip-address-management-prefix-delegation-create-prefix-delegation`

**Request** (application/json)

- `cidr`: string **required** — IP Prefix in Classless Inter-Domain Routing format.
- `delegated_account_id`: string **required** — Account identifier for the account to which prefix is being delegated.

**Response** 201 → `result`

- `cidr`: string — IP Prefix in Classless Inter-Domain Routing format.
- `created_at`: string
- `delegated_account_id`: string — Account identifier for the account to which prefix is being delegated.
- `id`: string — Identifier of a Delegation.
- `modified_at`: string
- `parent_prefix_id`: string — Identifier of an IP Prefix.

## DELETE /accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations/{delegation_id}

Delete Prefix Delegation

operationId: `ip-address-management-prefix-delegation-delete-prefix-delegation`

**Response** 200 → `result`

- `id`: string — Identifier of a Delegation.
