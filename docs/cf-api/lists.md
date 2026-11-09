# Lists

11 endpoints.

## GET /accounts/{account_id}/rules/lists

Get lists

operationId: `lists-get-lists`

**Response** 200 → `result`

[array of]
- `created_on`: string **required** — The RFC 3339 timestamp of when the list was created.
- `description`: string — An informative summary of the list.
- `id`: string **required** — The unique ID of the list.
- `kind`: any **required** enum: `ip`, `redirect`, `hostname`, `asn` — The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).
- `modified_on`: string **required** — The RFC 3339 timestamp of when the list was last modified.
- `name`: string **required** — An informative name for the list. Use this name in filter and rule expressions.
- `num_items`: number **required** — The number of items in the list.
- `num_referencing_filters`: number **required** — The number of [filters](/api/resources/filters/) referencing the list.

## POST /accounts/{account_id}/rules/lists

Create a list

operationId: `lists-create-a-list`

**Request** (application/json)

- `description`: string — An informative summary of the list.
- `kind`: any **required** enum: `ip`, `redirect`, `hostname`, `asn` — The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).
- `name`: string **required** — An informative name for the list. Use this name in filter and rule expressions.

**Response** 200 → `result`

- `created_on`: string **required** — The RFC 3339 timestamp of when the list was created.
- `description`: string — An informative summary of the list.
- `id`: string **required** — The unique ID of the list.
- `kind`: any **required** enum: `ip`, `redirect`, `hostname`, `asn` — The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).
- `modified_on`: string **required** — The RFC 3339 timestamp of when the list was last modified.
- `name`: string **required** — An informative name for the list. Use this name in filter and rule expressions.
- `num_items`: number **required** — The number of items in the list.
- `num_referencing_filters`: number **required** — The number of [filters](/api/resources/filters/) referencing the list.

## DELETE /accounts/{account_id}/rules/lists/{list_id}

Delete a list

operationId: `lists-delete-a-list`

**Response** 200 → `result`

- `id`: string **required** — The unique ID of the list.

## GET /accounts/{account_id}/rules/lists/{list_id}

Get a list

operationId: `lists-get-a-list`

**Response** 200 → `result`

- `created_on`: string **required** — The RFC 3339 timestamp of when the list was created.
- `description`: string — An informative summary of the list.
- `id`: string **required** — The unique ID of the list.
- `kind`: any **required** enum: `ip`, `redirect`, `hostname`, `asn` — The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).
- `modified_on`: string **required** — The RFC 3339 timestamp of when the list was last modified.
- `name`: string **required** — An informative name for the list. Use this name in filter and rule expressions.
- `num_items`: number **required** — The number of items in the list.
- `num_referencing_filters`: number **required** — The number of [filters](/api/resources/filters/) referencing the list.

## PUT /accounts/{account_id}/rules/lists/{list_id}

Update a list

operationId: `lists-update-a-list`

**Request** (application/json)

- `description`: string — An informative summary of the list.

**Response** 200 → `result`

- `created_on`: string **required** — The RFC 3339 timestamp of when the list was created.
- `description`: string — An informative summary of the list.
- `id`: string **required** — The unique ID of the list.
- `kind`: any **required** enum: `ip`, `redirect`, `hostname`, `asn` — The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).
- `modified_on`: string **required** — The RFC 3339 timestamp of when the list was last modified.
- `name`: string **required** — An informative name for the list. Use this name in filter and rule expressions.
- `num_items`: number **required** — The number of items in the list.
- `num_referencing_filters`: number **required** — The number of [filters](/api/resources/filters/) referencing the list.

## DELETE /accounts/{account_id}/rules/lists/{list_id}/items

Delete list items

operationId: `lists-delete-list-items`

**Request** (application/json)

- `items`: object[] — The list items to delete, identified by their unique IDs.
  [array of]
  - `id`: string **required** — Defines the unique ID of the item in the List.

**Response** 200 → `result`

- `operation_id`: string **required** — The unique operation ID of the asynchronous action.

## GET /accounts/{account_id}/rules/lists/{list_id}/items

Get list items

operationId: `lists-get-list-items` · query: `cursor`, `per_page`, `search`

**Response** 200 → `result`

[array of]
(one of 4 variants; showing the first)
- `ip`: string **required** — An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.
- `comment`: string — Defines an informative summary of the list item.
- `created_on`: string **required** — The RFC 3339 timestamp of when the list was created.
- `id`: string **required** — Defines the unique ID of the item in the List.
- `modified_on`: string **required** — The RFC 3339 timestamp of when the list was last modified.

## POST /accounts/{account_id}/rules/lists/{list_id}/items

Create list items

operationId: `lists-create-list-items`

**Request** (application/json)

[array of]
(one of 4 variants; showing the first)
- `ip`: string **required** — An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.
- `comment`: string — Defines an informative summary of the list item.

**Response** 200 → `result`

- `operation_id`: string **required** — The unique operation ID of the asynchronous action.

## PUT /accounts/{account_id}/rules/lists/{list_id}/items

Update all list items

operationId: `lists-update-all-list-items`

**Request** (application/json)

[array of]
(one of 4 variants; showing the first)
- `ip`: string **required** — An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.
- `comment`: string — Defines an informative summary of the list item.

**Response** 200 → `result`

- `operation_id`: string **required** — The unique operation ID of the asynchronous action.

## GET /accounts/{account_id}/rules/lists/{list_id}/items/{item_id}

Get a list item

operationId: `lists-get-a-list-item`

**Response** 200 → `result`

(one of 4 variants; showing the first)
- `ip`: string **required** — An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.
- `comment`: string — Defines an informative summary of the list item.
- `created_on`: string **required** — The RFC 3339 timestamp of when the list was created.
- `id`: string **required** — Defines the unique ID of the item in the List.
- `modified_on`: string **required** — The RFC 3339 timestamp of when the list was last modified.

## GET /accounts/{account_id}/rules/lists/bulk_operations/{operation_id}

Get bulk operation status

operationId: `lists-get-bulk-operation-status`

**Response** 200 → `result`

(one of 3 variants; showing the first)
- `id`: string **required** — The unique operation ID of the asynchronous action.
- `status`: string **required** enum: `pending`, `running` — The current status of the asynchronous operation.
