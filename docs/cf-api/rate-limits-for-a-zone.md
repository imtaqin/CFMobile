# Rate limits for a zone

5 endpoints.

## GET /zones/{zone_id}/rate_limits

List rate limits

operationId: `rate-limits-for-a-zone-list-rate-limits` · query: `page`, `per_page`

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`

## POST /zones/{zone_id}/rate_limits

Create a rate limit

operationId: `rate-limits-for-a-zone-create-a-rate-limit`

**Request** (application/json)

- `action`: object **required** — The action to perform when the threshold of matched traffic within the configured period is exceeded.
- `match`: object **required** — Determines which traffic the rate limit counts towards the threshold.
- `period`: number **required** — The time in seconds (an integer value) to count matching traffic. If the count exceeds the configured threshold within this period, Cloudfla
- `threshold`: number **required** — The threshold that will trigger the configured mitigation action. Configure this value along with the `period` property to establish a thres

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`

## DELETE /zones/{zone_id}/rate_limits/{rate_limit_id}

Delete a rate limit

operationId: `rate-limits-for-a-zone-delete-a-rate-limit`

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`

## GET /zones/{zone_id}/rate_limits/{rate_limit_id}

Get a rate limit

operationId: `rate-limits-for-a-zone-get-a-rate-limit`

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`

## PUT /zones/{zone_id}/rate_limits/{rate_limit_id}

Update a rate limit

operationId: `rate-limits-for-a-zone-update-a-rate-limit`

**Request** (application/json)

- `action`: object **required** — The action to perform when the threshold of matched traffic within the configured period is exceeded.
- `match`: object **required** — Determines which traffic the rate limit counts towards the threshold.
- `period`: number **required** — The time in seconds (an integer value) to count matching traffic. If the count exceeds the configured threshold within this period, Cloudfla
- `threshold`: number **required** — The threshold that will trigger the configured mitigation action. Configure this value along with the `period` property to establish a thres

**Response** 410 → `result`

- `message`: string **required** enum: `This API has been deprecated. Please use the Rulesets API instead.`
