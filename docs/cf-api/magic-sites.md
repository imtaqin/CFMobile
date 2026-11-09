# Magic Sites

6 endpoints.

## GET /accounts/{account_id}/magic/sites

List Sites

operationId: `magic-sites-list-sites` · query: `connectorid`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/magic/sites

Create a new Site

operationId: `magic-sites-create-site`

**Request** (application/json)

- `connector_id`: string — Magic Connector identifier tag.
- `description`: string
- `ha_mode`: boolean — Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.
- `location`: object — Location of site in latitude and longitude.
  - `lat`: string — Latitude
  - `lon`: string — Longitude
- `name`: string **required** — The name of the site.
- `secondary_connector_id`: string — Magic Connector identifier tag. Used when high availability mode is on.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/magic/sites/{site_id}

Delete Site

operationId: `magic-sites-delete-site`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/magic/sites/{site_id}

Site Details

operationId: `magic-sites-site-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/magic/sites/{site_id}

Patch Site

operationId: `magic-sites-patch-site`

**Request** (application/json)

- `connector_id`: string — Magic Connector identifier tag.
- `description`: string
- `ha_mode`: boolean — Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.
- `location`: object — Location of site in latitude and longitude.
  - `lat`: string — Latitude
  - `lon`: string — Longitude
- `name`: string — The name of the site.
- `secondary_connector_id`: string — Magic Connector identifier tag. Used when high availability mode is on.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/magic/sites/{site_id}

Update Site

operationId: `magic-sites-update-site`

**Request** (application/json)

- `connector_id`: string — Magic Connector identifier tag.
- `description`: string
- `ha_mode`: boolean — Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.
- `location`: object — Location of site in latitude and longitude.
  - `lat`: string — Latitude
  - `lon`: string — Longitude
- `name`: string — The name of the site.
- `secondary_connector_id`: string — Magic Connector identifier tag. Used when high availability mode is on.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
