# Leaked Credential Checks

7 endpoints.

## GET /zones/{zone_id}/leaked-credential-checks

Get the Leaked Credential Checks status for a zone.

operationId: `waf-product-api-leaked-credentials-get-status`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/leaked-credential-checks

Update the Leaked Credential Checks status for a zone.

operationId: `waf-product-api-leaked-credentials-set-status`

**Request** (application/json)

- `enabled`: boolean — Determines whether or not Leaked Credential Checks are enabled.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/leaked-credential-checks/detections

List the custom detection locations of a zone.

operationId: `waf-product-api-leaked-credentials-list-detections`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/leaked-credential-checks/detections

Create a custom detection location for a zone.

operationId: `waf-product-api-leaked-credentials-create-detection`

**Request** (application/json)

- `id`: any — Defines the unique ID for this custom detection.
- `password`: string — Defines ehe ruleset expression to use in matching the password in a request.
- `username`: string — Defines the ruleset expression to use in matching the username in a request.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /zones/{zone_id}/leaked-credential-checks/detections/{detection_id}

Delete a custom detection location from a zone.

operationId: `waf-product-api-leaked-credentials-delete-detection`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/leaked-credential-checks/detections/{detection_id}

Get a custom detection location of a zone.

operationId: `waf-product-api-leaked-credentials-get-detection`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/leaked-credential-checks/detections/{detection_id}

Update a custom detection location of a zone.

operationId: `waf-product-api-leaked-credentials-update-detection`

**Request** (application/json)

- `id`: any — Defines the unique ID for this custom detection.
- `password`: string — Defines ehe ruleset expression to use in matching the password in a request.
- `username`: string — Defines the ruleset expression to use in matching the username in a request.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
