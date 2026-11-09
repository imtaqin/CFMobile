# Zone-Level Access service tokens

5 endpoints.

## GET /zones/{zone_id}/access/service_tokens

List service tokens

operationId: `zone-level-access-service-tokens-list-service-tokens`

**Response** 200 → `result`

[array of]
- `client_id`: string — The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.
- `created_at`: string
- `duration`: string default: `8760h` — The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`, or the special value `forever` for non-
- `enabled`: boolean — Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous `client_secret`
- `expires_at`: string
- `id`: any
- `last_seen_at`: string
- `leak_report_url`: string — Where the leaked `client_secret` was found, if provided by the reporter. Omitted if the token has not been reported as leaked.
- `leak_reported_at`: string — When a secret scanning partner reported this service token's `client_secret` as leaked. A leaked service token is disabled and must be rotat
- `leak_reporter`: string — The secret scanning partner that reported the leak. Omitted if the token has not been reported as leaked.
- `name`: string — The name of the service token.
- `tags`: object — Tags associated with the service token, as key-value pairs. On update, replaces all existing tags.
- `updated_at`: string

## POST /zones/{zone_id}/access/service_tokens

Create a service token

operationId: `zone-level-access-service-tokens-create-a-service-token`

**Request** (application/json)

- `client_secret_version`: number default: `1` — A version number identifying the current `client_secret` associated with the service token. Incrementing it triggers a rotation; the previou
- `duration`: string default: `8760h` — The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`, or the special value `forever` for non-
- `enabled`: boolean — Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous `client_secret`
- `name`: string **required** — The name of the service token.
- `previous_client_secret_expires_at`: string — The expiration of the previous `client_secret`. This can be modified at any point after a rotation. For example, you may extend it further i
- `tags`: object — Tags associated with the service token, as key-value pairs. On update, replaces all existing tags.

**Response** 201 → `result`

- `client_id`: string — The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.
- `client_secret`: string — The Client Secret for the service token. Access will check for this value in the `CF-Access-Client-Secret` request header.
- `created_at`: string
- `duration`: string default: `8760h` — The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`, or the special value `forever` for non-
- `enabled`: boolean — Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous `client_secret`
- `id`: string — The ID of the service token.
- `name`: string — The name of the service token.
- `tags`: object — Tags associated with the service token, as key-value pairs. On update, replaces all existing tags.
- `updated_at`: string

## DELETE /zones/{zone_id}/access/service_tokens/{service_token_id}

Delete a service token

operationId: `zone-level-access-service-tokens-delete-a-service-token`

**Response** 200 → `result`

- `client_id`: string — The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.
- `created_at`: string
- `duration`: string default: `8760h` — The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`, or the special value `forever` for non-
- `enabled`: boolean — Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous `client_secret`
- `expires_at`: string
- `id`: any
- `last_seen_at`: string
- `leak_report_url`: string — Where the leaked `client_secret` was found, if provided by the reporter. Omitted if the token has not been reported as leaked.
- `leak_reported_at`: string — When a secret scanning partner reported this service token's `client_secret` as leaked. A leaked service token is disabled and must be rotat
- `leak_reporter`: string — The secret scanning partner that reported the leak. Omitted if the token has not been reported as leaked.
- `name`: string — The name of the service token.
- `tags`: object — Tags associated with the service token, as key-value pairs. On update, replaces all existing tags.
- `updated_at`: string

## GET /zones/{zone_id}/access/service_tokens/{service_token_id}

Get a service token

operationId: `zone-level-access-service-tokens-get-a-service-token`

**Response** 200 → `result`

- `client_id`: string — The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.
- `created_at`: string
- `duration`: string default: `8760h` — The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`, or the special value `forever` for non-
- `enabled`: boolean — Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous `client_secret`
- `expires_at`: string
- `id`: any
- `last_seen_at`: string
- `leak_report_url`: string — Where the leaked `client_secret` was found, if provided by the reporter. Omitted if the token has not been reported as leaked.
- `leak_reported_at`: string — When a secret scanning partner reported this service token's `client_secret` as leaked. A leaked service token is disabled and must be rotat
- `leak_reporter`: string — The secret scanning partner that reported the leak. Omitted if the token has not been reported as leaked.
- `name`: string — The name of the service token.
- `tags`: object — Tags associated with the service token, as key-value pairs. On update, replaces all existing tags.
- `updated_at`: string

## PUT /zones/{zone_id}/access/service_tokens/{service_token_id}

Update a service token

operationId: `zone-level-access-service-tokens-update-a-service-token`

**Request** (application/json)

- `client_secret_version`: number default: `1` — A version number identifying the current `client_secret` associated with the service token. Incrementing it triggers a rotation; the previou
- `duration`: string default: `8760h` — The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`, or the special value `forever` for non-
- `enabled`: boolean — Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous `client_secret`
- `name`: string — The name of the service token.
- `previous_client_secret_expires_at`: string — The expiration of the previous `client_secret`. This can be modified at any point after a rotation. For example, you may extend it further i
- `tags`: object — Tags associated with the service token, as key-value pairs. On update, replaces all existing tags.

**Response** 200 → `result`

- `client_id`: string — The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.
- `created_at`: string
- `duration`: string default: `8760h` — The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`, or the special value `forever` for non-
- `enabled`: boolean — Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous `client_secret`
- `expires_at`: string
- `id`: any
- `last_seen_at`: string
- `leak_report_url`: string — Where the leaked `client_secret` was found, if provided by the reporter. Omitted if the token has not been reported as leaked.
- `leak_reported_at`: string — When a secret scanning partner reported this service token's `client_secret` as leaked. A leaked service token is disabled and must be rotat
- `leak_reporter`: string — The secret scanning partner that reported the leak. Omitted if the token has not been reported as leaked.
- `name`: string — The name of the service token.
- `tags`: object — Tags associated with the service token, as key-value pairs. On update, replaces all existing tags.
- `updated_at`: string
