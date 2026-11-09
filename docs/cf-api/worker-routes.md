# Worker Routes

5 endpoints.

## GET /zones/{zone_id}/workers/routes

List Worker Routes

operationId: `worker-routes-list-routes`

**Response** 200 → `result`

[array of]
- `id`: any **required**
- `pattern`: string **required** — Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-be
- `script`: string — Name of the script to run if the route matches.

## POST /zones/{zone_id}/workers/routes

Create Worker Route

operationId: `worker-routes-create-route`

**Request** (application/json)

- `id`: any **required**
- `pattern`: string **required** — Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-be
- `script`: string — Name of the script to run if the route matches.

**Response** 200 → `result`

- `id`: any **required**
- `pattern`: string **required** — Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-be
- `script`: string — Name of the script to run if the route matches.

## DELETE /zones/{zone_id}/workers/routes/{route_id}

Delete Worker Route

operationId: `worker-routes-delete-route`

**Response** 200 → `result`

- `id`: string — Identifier.

## GET /zones/{zone_id}/workers/routes/{route_id}

Get Worker Route

operationId: `worker-routes-get-route`

**Response** 200 → `result`

- `id`: any **required**
- `pattern`: string **required** — Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-be
- `script`: string — Name of the script to run if the route matches.

## PUT /zones/{zone_id}/workers/routes/{route_id}

Replace Worker Route

operationId: `worker-routes-update-route`

**Request** (application/json)

- `id`: any **required**
- `pattern`: string **required** — Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-be
- `script`: string — Name of the script to run if the route matches.

**Response** 200 → `result`

- `id`: any **required**
- `pattern`: string **required** — Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-be
- `script`: string — Name of the script to run if the route matches.
