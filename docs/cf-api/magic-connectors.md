# Magic Connectors

14 endpoints.

## GET /accounts/{account_id}/magic/connectors

List Connectors

operationId: `mconn-connectors-list` · query: `device_type`

## POST /accounts/{account_id}/magic/connectors

Create Connector

operationId: `mconn-connectors-create`

## DELETE /accounts/{account_id}/magic/connectors/{connector_id}

Delete Connector

operationId: `mconn-connectors-delete`

## GET /accounts/{account_id}/magic/connectors/{connector_id}

Get Connector

operationId: `mconn-connectors-get`

## PATCH /accounts/{account_id}/magic/connectors/{connector_id}

Edit Connector

operationId: `mconn-connectors-edit`

## PUT /accounts/{account_id}/magic/connectors/{connector_id}

Update Connector

operationId: `mconn-connectors-update`

## GET /accounts/{account_id}/magic/connectors/{connector_id}/interrupts

List Interrupts

operationId: `mconn-connector-interrupts-list`

## POST /accounts/{account_id}/magic/connectors/{connector_id}/interrupts

Create Interrupt

operationId: `mconn-connector-interrupts-create`

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events

List Events

operationId: `mconn-connector-telemetry-events-list` · query: `from`, `to`, `limit`, `cursor`, `k`

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events/{event_t}.{event_n}

Get Event

operationId: `mconn-connector-telemetry-events-get`

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events/latest

Get latest Events

operationId: `mconn-connector-telemetry-events-latest-get`

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots

List Snapshots

operationId: `mconn-connector-telemetry-snapshots-list` · query: `from`, `to`, `limit`, `cursor`

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots/{snapshot_t}

Get Snapshot

operationId: `mconn-connector-telemetry-snapshots-get`

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots/latest

Get latest Snapshots

operationId: `mconn-connector-telemetry-snapshots-latest-get`
