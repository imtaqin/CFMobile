# User's Invites

3 endpoints.

## GET /user/invites

List Invitations

operationId: `user'-s-invites-list-invitations`

**Response** 200 → `result`

[array of]
- `expires_on`: string — When the invite is no longer active.
- `id`: string — Invite identifier tag.
- `invited_by`: string — The email address of the user who created the invite.
- `invited_member_email`: string — Email address of the user to add to the organization.
- `invited_member_id`: string **required** — ID of the user to add to the organization.
- `invited_on`: string — When the invite was sent.
- `organization_id`: string **required** — ID of the organization the user will be added to.
- `organization_is_enforcing_twofactor`: boolean
- `organization_name`: string — Organization name.
- `roles`: string[] — List of role names the membership has for this account.
  [array]
- `status`: string enum: `pending`, `accepted`, `rejected`, `expired` — Current status of the invitation.

## GET /user/invites/{invite_id}

Invitation Details

operationId: `user'-s-invites-invitation-details`

**Response** 200 → `result`

- `expires_on`: string — When the invite is no longer active.
- `id`: string — Invite identifier tag.
- `invited_by`: string — The email address of the user who created the invite.
- `invited_member_email`: string — Email address of the user to add to the organization.
- `invited_member_id`: string **required** — ID of the user to add to the organization.
- `invited_on`: string — When the invite was sent.
- `organization_id`: string **required** — ID of the organization the user will be added to.
- `organization_is_enforcing_twofactor`: boolean
- `organization_name`: string — Organization name.
- `roles`: string[] — List of role names the membership has for this account.
  [array]
- `status`: string enum: `pending`, `accepted`, `rejected`, `expired` — Current status of the invitation.

## PATCH /user/invites/{invite_id}

Respond to Invitation

operationId: `user'-s-invites-respond-to-invitation`

**Request** (application/json)

- `status`: string **required** enum: `accepted`, `rejected` — Status of your response to the invitation (rejected or accepted).

**Response** 200 → `result`

- `expires_on`: string — When the invite is no longer active.
- `id`: string — Invite identifier tag.
- `invited_by`: string — The email address of the user who created the invite.
- `invited_member_email`: string — Email address of the user to add to the organization.
- `invited_member_id`: string **required** — ID of the user to add to the organization.
- `invited_on`: string — When the invite was sent.
- `organization_id`: string **required** — ID of the organization the user will be added to.
- `organization_is_enforcing_twofactor`: boolean
- `organization_name`: string — Organization name.
- `roles`: string[] — List of role names the membership has for this account.
  [array]
- `status`: string enum: `pending`, `accepted`, `rejected`, `expired` — Current status of the invitation.
