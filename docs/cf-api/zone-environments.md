# Zone Environments

6 endpoints.

## GET /zones/{zone_id}/environments

List zone environments

operationId: `zonesEnvironmentsList`

## PATCH /zones/{zone_id}/environments

Partially update zone environments

operationId: `zonesEnvironmentsEdit`

## POST /zones/{zone_id}/environments

Create zone environments

operationId: `zonesEnvironmentsCreate`

## PUT /zones/{zone_id}/environments

Upsert zone environments

operationId: `zonesEnvironmentsUpdate`

## DELETE /zones/{zone_id}/environments/{environment_id}

Delete zone environment

operationId: `zonesEnvironmentsDelete`

## POST /zones/{zone_id}/environments/{environment_id}/rollback

Roll back zone environment

operationId: `zonesEnvironmentsRollback`
