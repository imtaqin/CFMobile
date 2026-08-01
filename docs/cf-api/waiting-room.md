# Waiting Room

24 endpoints.

## GET /accounts/{account_id}/waiting_rooms

List waiting rooms for account

operationId: `waiting-room-list-waiting-rooms-account`

## GET /zones/{zone_id}/waiting_rooms

List waiting rooms for zone

operationId: `waiting-room-list-waiting-rooms`

## POST /zones/{zone_id}/waiting_rooms

Create waiting room

operationId: `waiting-room-create-waiting-room`

## DELETE /zones/{zone_id}/waiting_rooms/{waiting_room_id}

Delete waiting room

operationId: `waiting-room-delete-waiting-room`

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}

Waiting room details

operationId: `waiting-room-waiting-room-details`

## PATCH /zones/{zone_id}/waiting_rooms/{waiting_room_id}

Patch waiting room

operationId: `waiting-room-patch-waiting-room`

## PUT /zones/{zone_id}/waiting_rooms/{waiting_room_id}

Update waiting room

operationId: `waiting-room-update-waiting-room`

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events

List events

operationId: `waiting-room-list-events`

## POST /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events

Create event

operationId: `waiting-room-create-event`

## DELETE /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}

Delete event

operationId: `waiting-room-delete-event`

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}

Event details

operationId: `waiting-room-event-details`

## PATCH /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}

Patch event

operationId: `waiting-room-patch-event`

## PUT /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}

Update event

operationId: `waiting-room-update-event`

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}/details

Preview active event details

operationId: `waiting-room-preview-active-event-details`

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules

List Waiting Room Rules

operationId: `waiting-room-list-waiting-room-rules`

## POST /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules

Create Waiting Room Rule

operationId: `waiting-room-create-waiting-room-rule`

## PUT /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules

Replace Waiting Room Rules

operationId: `waiting-room-replace-waiting-room-rules`

## DELETE /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules/{rule_id}

Delete Waiting Room Rule

operationId: `waiting-room-delete-waiting-room-rule`

## PATCH /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules/{rule_id}

Patch Waiting Room Rule

operationId: `waiting-room-patch-waiting-room-rule`

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/status

Get waiting room status

operationId: `waiting-room-get-waiting-room-status`

## POST /zones/{zone_id}/waiting_rooms/preview

Create a custom waiting room page preview

operationId: `waiting-room-create-a-custom-waiting-room-page-preview`

## GET /zones/{zone_id}/waiting_rooms/settings

Get zone-level Waiting Room settings

operationId: `waiting-room-get-zone-settings`

## PATCH /zones/{zone_id}/waiting_rooms/settings

Patch zone-level Waiting Room settings

operationId: `waiting-room-patch-zone-settings`

## PUT /zones/{zone_id}/waiting_rooms/settings

Update zone-level Waiting Room settings

operationId: `waiting-room-update-zone-settings`
