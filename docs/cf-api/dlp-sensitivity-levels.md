# DLP Sensitivity Levels

5 endpoints.

## GET /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels

Retrieve all sensitivity levels in a sensitivity group

operationId: `dlp-sensitivity-levels-list`

## POST /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels

Creates a new sensitivity level.

operationId: `dlp-sensitivity-levels-create`

## DELETE /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels/{sensitivity_level_id}

Delete a single sensitivity level.

operationId: `dlp-sensitivity-levels-delete`

## GET /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels/{sensitivity_level_id}

Retrieve a specific sensitivity level.

operationId: `dlp-sensitivity-levels-read`

## PUT /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels/{sensitivity_level_id}

Update the attributes of a single sensitivity level.

operationId: `dlp-sensitivity-levels-update`
