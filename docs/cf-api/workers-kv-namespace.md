# Workers KV Namespace

14 endpoints.

## GET /accounts/{account_id}/storage/kv/namespaces

List namespaces

operationId: `workers-kv-namespace-list-namespaces` · query: `page`, `per_page`, `order`, `direction`

**Response** 200 → `result`

[array of]
- `id`: string **required** — ID of the Workers KV namespace.
- `jurisdiction`: string enum: `eu`, `fedramp`, `us` — Specify the jurisdiction to restrict the KV namespace to durably store data within. Can only be set at namespace creation time.
- `mode`: string enum: `instant` — The mode of the Workers KV namespace. Specify `instant` when creating a namespace to create a KV Instant namespace. Omit this field when cre
- `supports_url_encoding`: boolean — True if keys written on the URL will be URL-decoded before storing. For example, if set to "true", a key written on the URL as "%3F" will be
- `title`: string **required** — Human-readable string name for a Workers KV namespace.

## POST /accounts/{account_id}/storage/kv/namespaces

Create a namespace

operationId: `workers-kv-namespace-create-a-namespace`

**Request** (application/json)

- `jurisdiction`: string enum: `eu`, `fedramp`, `us` — Specify the jurisdiction to restrict the KV namespace to durably store data within. Can only be set at namespace creation time.
- `mode`: string enum: `instant` — The mode of the Workers KV namespace. Specify `instant` when creating a namespace to create a KV Instant namespace. Omit this field when cre
- `title`: string **required** — Human-readable string name for a Workers KV namespace.

**Response** 200 → `result`

- `id`: string **required** — ID of the Workers KV namespace.
- `jurisdiction`: string enum: `eu`, `fedramp`, `us` — Specify the jurisdiction to restrict the KV namespace to durably store data within. Can only be set at namespace creation time.
- `mode`: string enum: `instant` — The mode of the Workers KV namespace. Specify `instant` when creating a namespace to create a KV Instant namespace. Omit this field when cre
- `supports_url_encoding`: boolean — True if keys written on the URL will be URL-decoded before storing. For example, if set to "true", a key written on the URL as "%3F" will be
- `title`: string **required** — Human-readable string name for a Workers KV namespace.

## DELETE /accounts/{account_id}/storage/kv/namespaces/{namespace_id}

Delete a namespace

operationId: `workers-kv-namespace-remove-a-namespace`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/storage/kv/namespaces/{namespace_id}

Get a namespace

operationId: `workers-kv-namespace-get-a-namespace`

**Response** 200 → `result`

- `id`: string **required** — ID of the Workers KV namespace.
- `jurisdiction`: string enum: `eu`, `fedramp`, `us` — Specify the jurisdiction to restrict the KV namespace to durably store data within. Can only be set at namespace creation time.
- `mode`: string enum: `instant` — The mode of the Workers KV namespace. Specify `instant` when creating a namespace to create a KV Instant namespace. Omit this field when cre
- `supports_url_encoding`: boolean — True if keys written on the URL will be URL-decoded before storing. For example, if set to "true", a key written on the URL as "%3F" will be
- `title`: string **required** — Human-readable string name for a Workers KV namespace.

## PUT /accounts/{account_id}/storage/kv/namespaces/{namespace_id}

Rename a namespace

operationId: `workers-kv-namespace-rename-a-namespace`

**Request** (application/json)

- `title`: string **required** — Human-readable string name for a Workers KV namespace.

**Response** 200 → `result`

- `id`: string **required** — ID of the Workers KV namespace.
- `jurisdiction`: string enum: `eu`, `fedramp`, `us` — Specify the jurisdiction to restrict the KV namespace to durably store data within. Can only be set at namespace creation time.
- `mode`: string enum: `instant` — The mode of the Workers KV namespace. Specify `instant` when creating a namespace to create a KV Instant namespace. Omit this field when cre
- `supports_url_encoding`: boolean — True if keys written on the URL will be URL-decoded before storing. For example, if set to "true", a key written on the URL as "%3F" will be
- `title`: string **required** — Human-readable string name for a Workers KV namespace.

## DELETE /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk

Delete multiple key-value pairs

operationId: `workers-kv-namespace-delete-multiple-key-value-pairs-deprecated`

**Request** (application/json)

[array of]
string

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk

Write multiple key-value pairs

operationId: `workers-kv-namespace-write-multiple-key-value-pairs`

**Request** (application/json)

[array of]
- `base64`: boolean default: `false` — Indicates whether or not the server should base64 decode the value before storing it. Useful for writing values that wouldn't otherwise be v
- `expiration`: number — Expires the key at a certain time, measured in number of seconds since the UNIX epoch.
- `expiration_ttl`: number — Number of seconds until the key expires. Must be at least 60. Takes precedence over `expiration` when both are specified.
- `key`: string **required** — A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid.
- `metadata`: any — Arbitrary JSON that is associated with a key.
- `value`: string **required** — A UTF-8 encoded string to be stored, up to 25 MiB in length.

**Response** 200 → `result`

object

## POST /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/delete

Delete multiple key-value pairs

operationId: `workers-kv-namespace-delete-multiple-key-value-pairs`

**Request** (application/json)

[array of]
string

**Response** 200 → `result`

object

## POST /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/get

Get multiple key-value pairs

operationId: `workers-kv-namespace-get-multiple-key-value-pairs`

**Request** (application/json)

- `keys`: string[] **required** — Array of keys to retrieve (maximum of 100).
  [array]
- `type`: string enum: `text`, `json` default: `text` — Return values as strings with `text`, or parse stored JSON values with `json`.
- `withMetadata`: boolean default: `false` — Whether to include metadata in the response.

**Response** 200 → `result`

object

## GET /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/keys

List keys in a namespace

operationId: `workers-kv-namespace-list-a-namespace'-s-keys` · query: `limit`, `prefix`, `cursor`

**Response** 200 → `result`

[array of]
- `expiration`: number — The time, measured in number of seconds since the UNIX epoch, at which the key will expire. This property is omitted for keys that will not 
- `metadata`: any — Arbitrary JSON that is associated with a key.
- `name`: string **required** — A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key name

## GET /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/metadata/{key_name}

Get a key's metadata

operationId: `workers-kv-namespace-read-the-metadata-for-a-key`

**Response** 200 → `result`

(one of 6 variants; showing the first)
string

## DELETE /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}

Delete a key-value pair

operationId: `workers-kv-namespace-delete-key-value-pair`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}

Get a key's value

operationId: `workers-kv-namespace-read-key-value-pair`

**Response** 200 → `result`

(one of 2 variants; showing the first)
string

## PUT /accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}

Write a key-value pair with optional metadata

operationId: `workers-kv-namespace-write-key-value-pair-with-metadata` · query: `expiration`, `expiration_ttl`

**Request** (application/octet-stream)

(one of 2 variants; showing the first)
string

**Response** 200 → `result`

object
