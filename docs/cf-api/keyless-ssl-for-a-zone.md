# Keyless SSL for a Zone

5 endpoints.

## GET /zones/{zone_id}/keyless_certificates

List Keyless SSL Configurations

operationId: `keyless-ssl-for-a-zone-list-keyless-ssl-configurations`

**Response** 200 → `result`

[array of]
- `created_on`: string **required** — When the Keyless SSL was created.
- `enabled`: boolean **required** — Whether or not the Keyless SSL is on or off.
- `host`: string **required** — The keyless SSL name.
- `id`: string **required** — Keyless certificate identifier tag.
- `modified_on`: string **required** — When the Keyless SSL was last modified.
- `name`: string **required** — The keyless SSL name.
- `permissions`: string[] **required** — Available permissions for the Keyless SSL for the current user requesting the item.
  [array]
- `port`: number **required** default: `24008` — The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.
- `status`: string **required** enum: `active`, `deleted` — Status of the Keyless SSL.
- `tunnel`: object — Configuration for using Keyless SSL through a Cloudflare Tunnel.
  - `private_ip`: string **required** — Private IP of the Key Server Host.
  - `vnet_id`: string **required** — Cloudflare Tunnel Virtual Network ID.

## POST /zones/{zone_id}/keyless_certificates

Create Keyless SSL Configuration

operationId: `keyless-ssl-for-a-zone-create-keyless-ssl-configuration`

**Request** (application/json)

- `bundle_method`: string enum: `ubiquitous`, `optimal`, `force` default: `ubiquitous` — A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An opt
- `certificate`: string **required** — The zone's SSL certificate or SSL certificate and intermediate(s).
- `host`: string **required** — The keyless SSL name.
- `name`: string — The keyless SSL name.
- `port`: number **required** default: `24008` — The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.
- `tunnel`: object — Configuration for using Keyless SSL through a Cloudflare Tunnel.
  - `private_ip`: string **required** — Private IP of the Key Server Host.
  - `vnet_id`: string **required** — Cloudflare Tunnel Virtual Network ID.

**Response** 200 → `result`

- `created_on`: string **required** — When the Keyless SSL was created.
- `enabled`: boolean **required** — Whether or not the Keyless SSL is on or off.
- `host`: string **required** — The keyless SSL name.
- `id`: string **required** — Keyless certificate identifier tag.
- `modified_on`: string **required** — When the Keyless SSL was last modified.
- `name`: string **required** — The keyless SSL name.
- `permissions`: string[] **required** — Available permissions for the Keyless SSL for the current user requesting the item.
  [array]
- `port`: number **required** default: `24008` — The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.
- `status`: string **required** enum: `active`, `deleted` — Status of the Keyless SSL.
- `tunnel`: object — Configuration for using Keyless SSL through a Cloudflare Tunnel.
  - `private_ip`: string **required** — Private IP of the Key Server Host.
  - `vnet_id`: string **required** — Cloudflare Tunnel Virtual Network ID.

## DELETE /zones/{zone_id}/keyless_certificates/{keyless_certificate_id}

Delete Keyless SSL Configuration

operationId: `keyless-ssl-for-a-zone-delete-keyless-ssl-configuration`

**Response** 200 → `result`

- `id`: string — Keyless certificate identifier tag.

## GET /zones/{zone_id}/keyless_certificates/{keyless_certificate_id}

Get Keyless SSL Configuration

operationId: `keyless-ssl-for-a-zone-get-keyless-ssl-configuration`

**Response** 200 → `result`

- `created_on`: string **required** — When the Keyless SSL was created.
- `enabled`: boolean **required** — Whether or not the Keyless SSL is on or off.
- `host`: string **required** — The keyless SSL name.
- `id`: string **required** — Keyless certificate identifier tag.
- `modified_on`: string **required** — When the Keyless SSL was last modified.
- `name`: string **required** — The keyless SSL name.
- `permissions`: string[] **required** — Available permissions for the Keyless SSL for the current user requesting the item.
  [array]
- `port`: number **required** default: `24008` — The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.
- `status`: string **required** enum: `active`, `deleted` — Status of the Keyless SSL.
- `tunnel`: object — Configuration for using Keyless SSL through a Cloudflare Tunnel.
  - `private_ip`: string **required** — Private IP of the Key Server Host.
  - `vnet_id`: string **required** — Cloudflare Tunnel Virtual Network ID.

## PATCH /zones/{zone_id}/keyless_certificates/{keyless_certificate_id}

Edit Keyless SSL Configuration

operationId: `keyless-ssl-for-a-zone-edit-keyless-ssl-configuration`

**Request** (application/json)

- `enabled`: boolean — Whether or not the Keyless SSL is on or off.
- `host`: string — The keyless SSL name.
- `name`: string — The keyless SSL name.
- `port`: number default: `24008` — The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.
- `tunnel`: object — Configuration for using Keyless SSL through a Cloudflare Tunnel.
  - `private_ip`: string **required** — Private IP of the Key Server Host.
  - `vnet_id`: string **required** — Cloudflare Tunnel Virtual Network ID.

**Response** 200 → `result`

- `created_on`: string **required** — When the Keyless SSL was created.
- `enabled`: boolean **required** — Whether or not the Keyless SSL is on or off.
- `host`: string **required** — The keyless SSL name.
- `id`: string **required** — Keyless certificate identifier tag.
- `modified_on`: string **required** — When the Keyless SSL was last modified.
- `name`: string **required** — The keyless SSL name.
- `permissions`: string[] **required** — Available permissions for the Keyless SSL for the current user requesting the item.
  [array]
- `port`: number **required** default: `24008` — The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.
- `status`: string **required** enum: `active`, `deleted` — Status of the Keyless SSL.
- `tunnel`: object — Configuration for using Keyless SSL through a Cloudflare Tunnel.
  - `private_ip`: string **required** — Private IP of the Key Server Host.
  - `vnet_id`: string **required** — Cloudflare Tunnel Virtual Network ID.
