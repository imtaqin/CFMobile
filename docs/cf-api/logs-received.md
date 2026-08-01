# Logs Received

5 endpoints.

## GET /zones/{zone_id}/logs/control/retention/flag

Get log retention flag

operationId: `get-zones-zone_id-logs-control-retention-flag`

## POST /zones/{zone_id}/logs/control/retention/flag

Update log retention flag

operationId: `post-zones-zone_id-logs-control-retention-flag`

## GET /zones/{zone_id}/logs/rayids/{ray_id}

Get logs RayIDs

operationId: `get-zones-zone_id-logs-rayids-ray_id` · query: `fields`, `timestamps`

## GET /zones/{zone_id}/logs/received

Get logs received

operationId: `get-zones-zone_id-logs-received` · query: `start`, `end`, `fields`, `sample`, `count`, `timestamps`

## GET /zones/{zone_id}/logs/received/fields

List fields

operationId: `get-zones-zone_id-logs-received-fields`
