# Resource Sharing

21 endpoints.

## GET /accounts/{account_id}/shares

List account shares

operationId: `shares-list` · query: `status`, `kind`, `target_type`, `resource_types`, `order`, `direction`, `page`, `per_page`, `include_resources`, `include_recipient_counts`, `include_tags_from`, `tag`

**Response** 200 → `result`

[array of]
- `account_id`: string **required** — Account identifier.
- `account_name`: string **required** — The display name of an account.
- `associated_recipient_count`: integer — The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter.
- `associating_recipient_count`: integer — The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter
- `created`: string **required** — When the object was created.
- `disassociated_recipient_count`: integer — The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' paramet
- `disassociating_recipient_count`: integer — The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parame
- `id`: string **required** — Share identifier tag.
- `kind`: string enum: `sent`, `received`
- `modified`: string **required** — When the object was last modified.
- `name`: string **required** — The name of the share.
- `organization_id`: string **required** — Organization identifier.
- `resources`: object[] — A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter.
  [array of]
  - `created`: string **required** — When the object was created.
  - `id`: string **required** — Share Resource identifier.
  - `meta`: object **required** — Resource Metadata.
  - `modified`: string **required** — When the object was last modified.
  - `resource_account_id`: string **required** — Account identifier.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
  - `resource_version`: integer **required** — Resource Version.
  - `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.
- `status`: string **required** enum: `active`, `deleting`, `deleted`
- `tags`: any — Tags associated with the share. Included in create and update responses when tags are supplied, and in read responses when the `include_tags
- `target_type`: string **required** enum: `account`, `organization`

## POST /accounts/{account_id}/shares

Trigger a share creation

operationId: `share-create`

**Request** (application/json)

- `excluded_recipients`: object[] — Accounts to exclude from an organization-targeted share. Only allowed when `recipients` contains no account entries. The share owner cannot 
  [array of]
  - `account_id`: any **required** — The account to exclude from the organization-targeted share.
- `name`: string **required** — The name of the share.
- `recipients`: object[]
  [array of]
  - `account_id`: any — Deprecated alias for `recipient_account_id`. Use `recipient_account_id` instead.
  - `organization_id`: string — Organization identifier.
  - `recipient_account_id`: any — The account that will receive the share.
- `resources`: object[]
  [array of]
  - `meta`: object **required** — Resource Metadata.
  - `resource_account_id`: any **required** — The account that owns the resource. Must match the `account_id` in the path.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
- `tags`: object — Tags associated with the share.

**Response** 201 → `result`

- `account_id`: string **required** — Account identifier.
- `account_name`: string **required** — The display name of an account.
- `associated_recipient_count`: integer — The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter.
- `associating_recipient_count`: integer — The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter
- `created`: string **required** — When the object was created.
- `disassociated_recipient_count`: integer — The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' paramet
- `disassociating_recipient_count`: integer — The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parame
- `id`: string **required** — Share identifier tag.
- `kind`: string enum: `sent`, `received`
- `modified`: string **required** — When the object was last modified.
- `name`: string **required** — The name of the share.
- `organization_id`: string **required** — Organization identifier.
- `resources`: object[] — A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter.
  [array of]
  - `created`: string **required** — When the object was created.
  - `id`: string **required** — Share Resource identifier.
  - `meta`: object **required** — Resource Metadata.
  - `modified`: string **required** — When the object was last modified.
  - `resource_account_id`: string **required** — Account identifier.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
  - `resource_version`: integer **required** — Resource Version.
  - `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.
- `status`: string **required** enum: `active`, `deleting`, `deleted`
- `tags`: any — Tags associated with the share. Included in create and update responses when tags are supplied, and in read responses when the `include_tags
- `target_type`: string **required** enum: `account`, `organization`

## DELETE /accounts/{account_id}/shares/{share_id}

Trigger a share deletion

operationId: `share-delete`

**Response** 200 → `result`

- `account_id`: string **required** — Account identifier.
- `account_name`: string **required** — The display name of an account.
- `associated_recipient_count`: integer — The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter.
- `associating_recipient_count`: integer — The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter
- `created`: string **required** — When the object was created.
- `disassociated_recipient_count`: integer — The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' paramet
- `disassociating_recipient_count`: integer — The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parame
- `id`: string **required** — Share identifier tag.
- `kind`: string enum: `sent`, `received`
- `modified`: string **required** — When the object was last modified.
- `name`: string **required** — The name of the share.
- `organization_id`: string **required** — Organization identifier.
- `resources`: object[] — A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter.
  [array of]
  - `created`: string **required** — When the object was created.
  - `id`: string **required** — Share Resource identifier.
  - `meta`: object **required** — Resource Metadata.
  - `modified`: string **required** — When the object was last modified.
  - `resource_account_id`: string **required** — Account identifier.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
  - `resource_version`: integer **required** — Resource Version.
  - `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.
- `status`: string **required** enum: `active`, `deleting`, `deleted`
- `tags`: any — Tags associated with the share. Included in create and update responses when tags are supplied, and in read responses when the `include_tags
- `target_type`: string **required** enum: `account`, `organization`

## GET /accounts/{account_id}/shares/{share_id}

Get account share by ID

operationId: `shares-get-by-id` · query: `include_resources`, `include_recipient_counts`, `include_tags_from`

**Response** 200 → `result`

- `account_id`: string **required** — Account identifier.
- `account_name`: string **required** — The display name of an account.
- `associated_recipient_count`: integer — The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter.
- `associating_recipient_count`: integer — The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter
- `created`: string **required** — When the object was created.
- `disassociated_recipient_count`: integer — The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' paramet
- `disassociating_recipient_count`: integer — The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parame
- `id`: string **required** — Share identifier tag.
- `kind`: string enum: `sent`, `received`
- `modified`: string **required** — When the object was last modified.
- `name`: string **required** — The name of the share.
- `organization_id`: string **required** — Organization identifier.
- `resources`: object[] — A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter.
  [array of]
  - `created`: string **required** — When the object was created.
  - `id`: string **required** — Share Resource identifier.
  - `meta`: object **required** — Resource Metadata.
  - `modified`: string **required** — When the object was last modified.
  - `resource_account_id`: string **required** — Account identifier.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
  - `resource_version`: integer **required** — Resource Version.
  - `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.
- `status`: string **required** enum: `active`, `deleting`, `deleted`
- `tags`: any — Tags associated with the share. Included in create and update responses when tags are supplied, and in read responses when the `include_tags
- `target_type`: string **required** enum: `account`, `organization`

## PUT /accounts/{account_id}/shares/{share_id}

Trigger a share update

operationId: `share-update`

**Request** (application/json)

- `name`: string **required** — The name of the share.
- `tags`: object — Tags associated with the share.

**Response** 200 → `result`

- `account_id`: string **required** — Account identifier.
- `account_name`: string **required** — The display name of an account.
- `associated_recipient_count`: integer — The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter.
- `associating_recipient_count`: integer — The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter
- `created`: string **required** — When the object was created.
- `disassociated_recipient_count`: integer — The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' paramet
- `disassociating_recipient_count`: integer — The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parame
- `id`: string **required** — Share identifier tag.
- `kind`: string enum: `sent`, `received`
- `modified`: string **required** — When the object was last modified.
- `name`: string **required** — The name of the share.
- `organization_id`: string **required** — Organization identifier.
- `resources`: object[] — A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter.
  [array of]
  - `created`: string **required** — When the object was created.
  - `id`: string **required** — Share Resource identifier.
  - `meta`: object **required** — Resource Metadata.
  - `modified`: string **required** — When the object was last modified.
  - `resource_account_id`: string **required** — Account identifier.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
  - `resource_version`: integer **required** — Resource Version.
  - `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.
- `status`: string **required** enum: `active`, `deleting`, `deleted`
- `tags`: any — Tags associated with the share. Included in create and update responses when tags are supplied, and in read responses when the `include_tags
- `target_type`: string **required** enum: `account`, `organization`

## GET /accounts/{account_id}/shares/{share_id}/excluded-recipients

List share excluded recipients by share ID

operationId: `share-excluded-recipients-list` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `account_id`: string **required** — Account identifier.
- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Excluded Recipient identifier tag.
- `modified`: string **required** — When the object was last modified.

## POST /accounts/{account_id}/shares/{share_id}/excluded-recipients

Trigger an account exclusion from a share

operationId: `share-excluded-recipient-create`

**Request** (application/json)

- `account_id`: any **required** — The account to exclude from the organization-targeted share.

**Response** 201 → `result`

- `account_id`: string **required** — Account identifier.
- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Excluded Recipient identifier tag.
- `modified`: string **required** — When the object was last modified.

## PUT /accounts/{account_id}/shares/{share_id}/excluded-recipients

Trigger excluded-account reconciliation on a share

operationId: `share-excluded-recipients-update`

**Request** (application/json)

[array of]
- `account_id`: any **required** — The account to exclude from the organization-targeted share.

## DELETE /accounts/{account_id}/shares/{share_id}/excluded-recipients/{excluded_recipient_id}

Trigger an account un-exclusion from a share

operationId: `share-excluded-recipient-delete`

**Response** 200 → `result`

- `account_id`: string **required** — Account identifier.
- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Excluded Recipient identifier tag.
- `modified`: string **required** — When the object was last modified.

## GET /accounts/{account_id}/shares/{share_id}/excluded-recipients/{excluded_recipient_id}

Get share excluded recipient by ID

operationId: `share-excluded-recipients-get-by-id`

**Response** 200 → `result`

- `account_id`: string **required** — Account identifier.
- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Excluded Recipient identifier tag.
- `modified`: string **required** — When the object was last modified.

## GET /accounts/{account_id}/shares/{share_id}/recipients

List share recipients by share ID

operationId: `share-recipients-list` · query: `include_resources`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `account_id`: string **required** — Account identifier.
- `association_status`: string **required** enum: `associating`, `associated`, `disassociating`, `disassociated` — The current state of the recipient relative to the share. The
- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Recipient identifier tag.
- `modified`: string **required** — When the object was last modified.
- `resources`: object[]
  [array of]
  - `error`: string **required** — Error from the most recent attempt to apply the resource to the recipient. Empty string when no error has been recorded.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_version`: integer **required** — Resource version applied to the recipient, if reconciliation has occurred.
  - `terminal`: boolean **required** — Whether the error is terminal or will be continually retried.

## POST /accounts/{account_id}/shares/{share_id}/recipients

Trigger a recipient addition to a share

operationId: `share-recipient-create`

**Request** (application/json)

- `account_id`: any — Deprecated alias for `recipient_account_id`. Use `recipient_account_id` instead.
- `recipient_account_id`: any — The account that will receive the share.

**Response** 201 → `result`

- `account_id`: string **required** — Account identifier.
- `association_status`: string **required** enum: `associating`, `associated`, `disassociating`, `disassociated` — The current state of the recipient relative to the share. The
- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Recipient identifier tag.
- `modified`: string **required** — When the object was last modified.
- `resources`: object[]
  [array of]
  - `error`: string **required** — Error from the most recent attempt to apply the resource to the recipient. Empty string when no error has been recorded.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_version`: integer **required** — Resource version applied to the recipient, if reconciliation has occurred.
  - `terminal`: boolean **required** — Whether the error is terminal or will be continually retried.

## PUT /accounts/{account_id}/shares/{share_id}/recipients

Trigger recipient reconciliation on a share

operationId: `share-recipients-update`

**Request** (application/json)

[array of]
- `account_id`: any — Deprecated alias for `recipient_account_id`. Use `recipient_account_id` instead.
- `recipient_account_id`: any — The account that will receive the share.

## DELETE /accounts/{account_id}/shares/{share_id}/recipients/{recipient_id}

Trigger a recipient removal from a share

operationId: `share-recipient-delete`

**Response** 200 → `result`

- `account_id`: string **required** — Account identifier.
- `association_status`: string **required** enum: `associating`, `associated`, `disassociating`, `disassociated` — The current state of the recipient relative to the share. The
- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Recipient identifier tag.
- `modified`: string **required** — When the object was last modified.
- `resources`: object[]
  [array of]
  - `error`: string **required** — Error from the most recent attempt to apply the resource to the recipient. Empty string when no error has been recorded.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_version`: integer **required** — Resource version applied to the recipient, if reconciliation has occurred.
  - `terminal`: boolean **required** — Whether the error is terminal or will be continually retried.

## GET /accounts/{account_id}/shares/{share_id}/recipients/{recipient_id}

Get share recipient by ID

operationId: `share-recipients-get-by-id` · query: `include_resources`

**Response** 200 → `result`

- `account_id`: string **required** — Account identifier.
- `association_status`: string **required** enum: `associating`, `associated`, `disassociating`, `disassociated` — The current state of the recipient relative to the share. The
- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Recipient identifier tag.
- `modified`: string **required** — When the object was last modified.
- `resources`: object[]
  [array of]
  - `error`: string **required** — Error from the most recent attempt to apply the resource to the recipient. Empty string when no error has been recorded.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_version`: integer **required** — Resource version applied to the recipient, if reconciliation has occurred.
  - `terminal`: boolean **required** — Whether the error is terminal or will be continually retried.

## GET /accounts/{account_id}/shares/{share_id}/resources

List share resources by share ID

operationId: `share-resources-list` · query: `status`, `resource_type`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Resource identifier.
- `meta`: object **required** — Resource Metadata.
- `modified`: string **required** — When the object was last modified.
- `resource_account_id`: string **required** — Account identifier.
- `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
- `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
- `resource_version`: integer **required** — Resource Version.
- `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.

## POST /accounts/{account_id}/shares/{share_id}/resources

Trigger a resource addition to a share

operationId: `share-resource-create`

**Request** (application/json)

- `meta`: object **required** — Resource Metadata.
- `resource_account_id`: any **required** — The account that owns the resource. Must match the `account_id` in the path.
- `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
- `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.

**Response** 201 → `result`

- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Resource identifier.
- `meta`: object **required** — Resource Metadata.
- `modified`: string **required** — When the object was last modified.
- `resource_account_id`: string **required** — Account identifier.
- `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
- `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
- `resource_version`: integer **required** — Resource Version.
- `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.

## DELETE /accounts/{account_id}/shares/{share_id}/resources/{share_resource_id}

Trigger a resource deletion from a share

operationId: `share-resource-delete`

**Response** 200 → `result`

- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Resource identifier.
- `meta`: object **required** — Resource Metadata.
- `modified`: string **required** — When the object was last modified.
- `resource_account_id`: string **required** — Account identifier.
- `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
- `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
- `resource_version`: integer **required** — Resource Version.
- `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.

## GET /accounts/{account_id}/shares/{share_id}/resources/{share_resource_id}

Get share resource by ID

operationId: `share-resources-get-by-id`

**Response** 200 → `result`

- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Resource identifier.
- `meta`: object **required** — Resource Metadata.
- `modified`: string **required** — When the object was last modified.
- `resource_account_id`: string **required** — Account identifier.
- `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
- `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
- `resource_version`: integer **required** — Resource Version.
- `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.

## PUT /accounts/{account_id}/shares/{share_id}/resources/{share_resource_id}

Trigger a resource metadata update in a share

operationId: `share-resource-update`

**Request** (application/json)

- `meta`: object **required** — Resource Metadata.

**Response** 200 → `result`

- `created`: string **required** — When the object was created.
- `id`: string **required** — Share Resource identifier.
- `meta`: object **required** — Resource Metadata.
- `modified`: string **required** — When the object was last modified.
- `resource_account_id`: string **required** — Account identifier.
- `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
- `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
- `resource_version`: integer **required** — Resource Version.
- `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.

## GET /organizations/{organization_id}/shares

List organization shares

operationId: `organization-shares-list` · query: `status`, `order`, `direction`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `account_id`: string **required** — Account identifier.
- `account_name`: string **required** — The display name of an account.
- `associated_recipient_count`: integer — The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter.
- `associating_recipient_count`: integer — The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter
- `created`: string **required** — When the object was created.
- `disassociated_recipient_count`: integer — The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' paramet
- `disassociating_recipient_count`: integer — The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parame
- `id`: string **required** — Share identifier tag.
- `kind`: string enum: `sent`, `received`
- `modified`: string **required** — When the object was last modified.
- `name`: string **required** — The name of the share.
- `organization_id`: string **required** — Organization identifier.
- `resources`: object[] — A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter.
  [array of]
  - `created`: string **required** — When the object was created.
  - `id`: string **required** — Share Resource identifier.
  - `meta`: object **required** — Resource Metadata.
  - `modified`: string **required** — When the object was last modified.
  - `resource_account_id`: string **required** — Account identifier.
  - `resource_id`: string **required** — Identifier assigned by the service that owns the shared resource.
  - `resource_type`: string **required** enum: `custom-ruleset`, `gateway-policy`, `gateway-destination-ip`, `gateway-block-page-settings`, `gateway-extended-email-matching`, `idp-federation-grant`, `trust-grant` — Resource Type.
  - `resource_version`: integer **required** — Resource Version.
  - `status`: string **required** enum: `active`, `deleting`, `deleted` — Resource Status.
- `status`: string **required** enum: `active`, `deleting`, `deleted`
- `tags`: any — Tags associated with the share. Included in create and update responses when tags are supplied, and in read responses when the `include_tags
- `target_type`: string **required** enum: `account`, `organization`
