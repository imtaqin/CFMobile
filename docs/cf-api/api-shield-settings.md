# API Shield Settings

2 endpoints.

## GET /zones/{zone_id}/api_gateway/configuration

Get session identifier settings

operationId: `api-shield-settings-retrieve-information-about-specific-configuration-properties` · query: `normalize`

**Response** 200 → `result`

- `auth_id_characteristics`: object[] **required**
  [array of]
  - `name`: string **required** — The name of the characteristic field, i.e., the header or cookie name.
  - `type`: string **required** enum: `header`, `cookie` — The type of characteristic.

## PUT /zones/{zone_id}/api_gateway/configuration

Update session identifier settings

operationId: `api-shield-settings-set-configuration-properties` · query: `normalize`

**Request** (application/json)

- `auth_id_characteristics`: object[] **required**
  [array of]
  - `name`: string **required** — The name of the characteristic field, i.e., the header or cookie name.
  - `type`: string **required** enum: `header`, `cookie` — The type of characteristic.

**Response** 200 → `result`

- `auth_id_characteristics`: object[] **required**
  [array of]
  - `name`: string **required** — The name of the characteristic field, i.e., the header or cookie name.
  - `type`: string **required** enum: `header`, `cookie` — The type of characteristic.
