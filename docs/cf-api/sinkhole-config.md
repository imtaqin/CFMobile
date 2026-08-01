# Sinkhole Config

10 endpoints.

## GET /accounts/{account_id}/intel/sinkholes

List sinkholes owned by this account

operationId: `sinkhole-config-list-sinkholes`

## POST /accounts/{account_id}/intel/sinkholes

Create a new sinkhole for your account

operationId: `sinkhole-config-create-sinkhole`

## DELETE /accounts/{account_id}/intel/sinkholes/{sinkhole_id}

Delete a sinkhole

operationId: `sinkhole-config-delete-sinkhole`

## GET /accounts/{account_id}/intel/sinkholes/{sinkhole_id}

Get a sinkhole

operationId: `sinkhole-config-get-sinkhole`

## PUT /accounts/{account_id}/intel/sinkholes/{sinkhole_id}

Update a sinkhole

operationId: `sinkhole-config-update-sinkhole`

## GET /accounts/{account_id}/intel/sinkholes/{sinkhole_id}/ingresses

List ingresses for a sinkhole

operationId: `sinkhole-config-list-sinkhole-ingresses`

## POST /zones/{zone_id}/intel/sinkholes/{sinkhole_id}/ingresses

Create an ingress rule

operationId: `sinkhole-config-create-ingress`

## DELETE /zones/{zone_id}/intel/sinkholes/{sinkhole_id}/ingresses/{ingress_id}

Delete an ingress rule

operationId: `sinkhole-config-delete-ingress`

## GET /zones/{zone_id}/intel/sinkholes/{sinkhole_id}/ingresses/{ingress_id}

Get an ingress rule

operationId: `sinkhole-config-get-ingress`

## PUT /zones/{zone_id}/intel/sinkholes/{sinkhole_id}/ingresses/{ingress_id}

Update an ingress rule

operationId: `sinkhole-config-update-ingress`
