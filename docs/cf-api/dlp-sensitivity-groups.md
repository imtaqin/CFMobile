# DLP Sensitivity Groups

7 endpoints.

## GET /accounts/{account_id}/dlp/sensitivity_groups

Retrieve all sensitivity groups in an account

operationId: `dlp-sensitivity-groups-list`

## POST /accounts/{account_id}/dlp/sensitivity_groups

Creates a new sensitivity group.

operationId: `dlp-sensitivity-groups-create`

## DELETE /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}

Delete a single sensitivity group.

operationId: `dlp-sensitivity-groups-delete`

## GET /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}

Retrieve a specific sensitivity group.

operationId: `dlp-sensitivity-groups-read`

## PUT /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}

Update the attributes of a single sensitivity group.

operationId: `dlp-sensitivity-groups-update`

## GET /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/level_order

Retrieve the ordered list of level IDs for a sensitivity group.

operationId: `dlp-sensitivity-groups-get-level-order`

## PUT /accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/level_order

Set the ordering of levels within a sensitivity group.

operationId: `dlp-sensitivity-groups-put-level-order`
