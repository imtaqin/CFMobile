# CT Alerting

2 endpoints.

## GET /zones/{zone_id}/ct/alerting

Get CT Alerting Subscription

operationId: `ct-alerting-get-subscription`

**Response** 200 → `result`

- `emails`: string[] — Email addresses that receive CT alert notifications for the zone. A maximum of 100 addresses may be configured. Each address must be a valid
  [array]
- `enabled`: boolean **required** — Whether CT alerting is enabled for the zone.

## PATCH /zones/{zone_id}/ct/alerting

Update CT Alerting Subscription

operationId: `ct-alerting-update-subscription`

**Request** (application/json)

- `emails`: string[] — Email addresses that receive CT alert notifications for the zone. A maximum of 100 addresses may be configured. Each address must be a valid
  [array]
- `enabled`: boolean **required** — Whether CT alerting is enabled for the zone.

**Response** 200 → `result`

- `emails`: string[] — Email addresses that receive CT alert notifications for the zone. A maximum of 100 addresses may be configured. Each address must be a valid
  [array]
- `enabled`: boolean **required** — Whether CT alerting is enabled for the zone.
