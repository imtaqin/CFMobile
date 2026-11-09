# Email Routing settings

10 endpoints.

## GET /zones/{zone_id}/email/routing

Get Email Routing settings

operationId: `email-routing-settings-get-email-routing-settings`

**Response** 200 → `result`

- `created`: string — The date and time the settings have been created.
- `enabled`: boolean **required** enum: `true`, `false` — State of the zone settings for Email Routing.
- `id`: string **required** — Email Routing settings identifier.
- `modified`: string — The date and time the settings have been modified.
- `name`: string **required** — Domain of your zone.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `status`: string enum: `ready`, `unconfigured`, `misconfigured`, `misconfigured/locked`, `unlocked` — Show the state of your account, and the type or configuration error.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.
- `tag`: string — Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

## PATCH /zones/{zone_id}/email/routing

Update Email Routing settings

operationId: `email-routing-settings-update-email-routing-settings`

**Request** (application/json)

- `enabled`: boolean enum: `true`, `false` — State of your zone Email Routing settings. No-op on this endpoint - use `POST`/`DELETE /zones/{zone_id}/email/routing/dns`.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.

**Response** 200 → `result`

- `created`: string — The date and time the settings have been created.
- `enabled`: boolean **required** enum: `true`, `false` — State of the zone settings for Email Routing.
- `id`: string **required** — Email Routing settings identifier.
- `modified`: string — The date and time the settings have been modified.
- `name`: string **required** — Domain of your zone.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `status`: string enum: `ready`, `unconfigured`, `misconfigured`, `misconfigured/locked`, `unlocked` — Show the state of your account, and the type or configuration error.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.
- `tag`: string — Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

## PUT /zones/{zone_id}/email/routing

Apply Email Routing settings

operationId: `email-routing-settings-replace-email-routing-settings`

**Request** (application/json)

- `enabled`: boolean enum: `true`, `false` — State of your zone Email Routing settings. No-op on this endpoint - use `POST`/`DELETE /zones/{zone_id}/email/routing/dns`.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.

**Response** 200 → `result`

- `created`: string — The date and time the settings have been created.
- `enabled`: boolean **required** enum: `true`, `false` — State of the zone settings for Email Routing.
- `id`: string **required** — Email Routing settings identifier.
- `modified`: string — The date and time the settings have been modified.
- `name`: string **required** — Domain of your zone.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `status`: string enum: `ready`, `unconfigured`, `misconfigured`, `misconfigured/locked`, `unlocked` — Show the state of your account, and the type or configuration error.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.
- `tag`: string — Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

## POST /zones/{zone_id}/email/routing/disable

Disable Email Routing

operationId: `email-routing-settings-disable-email-routing`

**Response** 200 → `result`

- `created`: string — The date and time the settings have been created.
- `enabled`: boolean **required** enum: `true`, `false` — State of the zone settings for Email Routing.
- `id`: string **required** — Email Routing settings identifier.
- `modified`: string — The date and time the settings have been modified.
- `name`: string **required** — Domain of your zone.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `status`: string enum: `ready`, `unconfigured`, `misconfigured`, `misconfigured/locked`, `unlocked` — Show the state of your account, and the type or configuration error.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.
- `tag`: string — Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

## DELETE /zones/{zone_id}/email/routing/dns

Disable Email Routing

operationId: `email-routing-settings-disable-email-routing-dns`

**Request** (application/json)

- `name`: string — Domain of your zone.

**Response** 200 → `result`

- `created`: string — The date and time the settings have been created.
- `enabled`: boolean **required** enum: `true`, `false` — State of the zone settings for Email Routing.
- `id`: string **required** — Email Routing settings identifier.
- `modified`: string — The date and time the settings have been modified.
- `name`: string **required** — Domain of your zone.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `status`: string enum: `ready`, `unconfigured`, `misconfigured`, `misconfigured/locked`, `unlocked` — Show the state of your account, and the type or configuration error.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.
- `tag`: string — Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

## GET /zones/{zone_id}/email/routing/dns

Email Routing - DNS settings

operationId: `email-routing-settings-email-routing-dns-settings` · query: `subdomain`

**Response** 200 → `result`

[array of]
- `content`: string — DNS record content.
- `name`: string — DNS record name (or @ for the zone apex).
- `priority`: number — Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.
- `ttl`: number — Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.
- `type`: string enum: `A`, `AAAA`, `CNAME`, `HTTPS`, `TXT`, `SRV`, `LOC`, `MX` — DNS record type.

## PATCH /zones/{zone_id}/email/routing/dns

Unlock Email Routing DNS records

operationId: `email-routing-settings-unlock-email-routing-dns`

**Request** (application/json)

- `name`: string — Domain of your zone.

**Response** 200 → `result`

- `created`: string — The date and time the settings have been created.
- `enabled`: boolean **required** enum: `true`, `false` — State of the zone settings for Email Routing.
- `id`: string **required** — Email Routing settings identifier.
- `modified`: string — The date and time the settings have been modified.
- `name`: string **required** — Domain of your zone.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `status`: string enum: `ready`, `unconfigured`, `misconfigured`, `misconfigured/locked`, `unlocked` — Show the state of your account, and the type or configuration error.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.
- `tag`: string — Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

## POST /zones/{zone_id}/email/routing/dns

Enable Email Routing

operationId: `email-routing-settings-enable-email-routing-dns`

**Request** (application/json)

- `name`: string — Domain of your zone.

**Response** 200 → `result`

- `created`: string — The date and time the settings have been created.
- `enabled`: boolean **required** enum: `true`, `false` — State of the zone settings for Email Routing.
- `id`: string **required** — Email Routing settings identifier.
- `modified`: string — The date and time the settings have been modified.
- `name`: string **required** — Domain of your zone.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `status`: string enum: `ready`, `unconfigured`, `misconfigured`, `misconfigured/locked`, `unlocked` — Show the state of your account, and the type or configuration error.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.
- `tag`: string — Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

## POST /zones/{zone_id}/email/routing/enable

Enable Email Routing

operationId: `email-routing-settings-enable-email-routing`

**Response** 200 → `result`

- `created`: string — The date and time the settings have been created.
- `enabled`: boolean **required** enum: `true`, `false` — State of the zone settings for Email Routing.
- `id`: string **required** — Email Routing settings identifier.
- `modified`: string — The date and time the settings have been modified.
- `name`: string **required** — Domain of your zone.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `status`: string enum: `ready`, `unconfigured`, `misconfigured`, `misconfigured/locked`, `unlocked` — Show the state of your account, and the type or configuration error.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.
- `tag`: string — Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

## POST /zones/{zone_id}/email/routing/unlock

Unlock Email Routing

operationId: `email-routing-settings-unlock-email-routing`

**Request** (application/json)

- `name`: string — Domain of your zone.

**Response** 200 → `result`

- `created`: string — The date and time the settings have been created.
- `enabled`: boolean **required** enum: `true`, `false` — State of the zone settings for Email Routing.
- `id`: string **required** — Email Routing settings identifier.
- `modified`: string — The date and time the settings have been modified.
- `name`: string **required** — Domain of your zone.
- `skip_wizard`: boolean enum: `true`, `false` — Flag to check if the user skipped the configuration wizard.
- `status`: string enum: `ready`, `unconfigured`, `misconfigured`, `misconfigured/locked`, `unlocked` — Show the state of your account, and the type or configuration error.
- `support_subaddress`: boolean enum: `true`, `false` — Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.
- `tag`: string — Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)
