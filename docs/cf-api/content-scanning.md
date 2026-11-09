# Content Scanning

8 endpoints.

## POST /zones/{zone_id}/content-upload-scan/disable

Disable Content Scanning for a zone.

operationId: `waf-content-scanning-disable`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/content-upload-scan/enable

Enable Content Scanning for a zone.

operationId: `waf-content-scanning-enable`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/content-upload-scan/payloads

List the Content Scanning custom expressions of a zone.

operationId: `waf-content-scanning-list-custom-scan-expressions`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/content-upload-scan/payloads

Create Content Scanning custom expressions for a zone.

operationId: `waf-content-scanning-add-custom-scan-expressions`

**Request** (application/json)

[array of]
- `payload`: string **required** — Defines the custom content extraction expression used to reach content objects in the request.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /zones/{zone_id}/content-upload-scan/payloads/{expression_id}

Delete a Content Scanning custom expression from a zone.

operationId: `waf-content-scanning-delete-custom-scan-expressions`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /zones/{zone_id}/content-upload-scan/payloads/{expression_id}

Update a Content Scanning custom expression for a zone.

operationId: `waf-content-scanning-update-custom-scan-expression`

**Request** (application/json)

- `payload`: string **required** — Defines the custom content extraction expression used to reach content objects in the request.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/content-upload-scan/settings

Get the Content Scanning status for a zone.

operationId: `waf-content-scanning-get-status`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/content-upload-scan/settings

Update the Content Scanning status for a zone.

operationId: `waf-content-scanning-update-settings`

**Request** (application/json)

- `value`: string **required** enum: `enabled`, `disabled` — The status value for Content Scanning.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
