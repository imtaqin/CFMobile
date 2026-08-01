# Stream Live Inputs

12 endpoints.

## GET /accounts/{account_id}/stream/live_inputs

List live inputs

operationId: `stream-live-inputs-list-live-inputs` · query: `include_counts`

## POST /accounts/{account_id}/stream/live_inputs

Create a live input

operationId: `stream-live-inputs-create-a-live-input`

## DELETE /accounts/{account_id}/stream/live_inputs/{live_input_identifier}

Delete a live input

operationId: `stream-live-inputs-delete-a-live-input`

## GET /accounts/{account_id}/stream/live_inputs/{live_input_identifier}

Retrieve a live input

operationId: `stream-live-inputs-retrieve-a-live-input`

## PUT /accounts/{account_id}/stream/live_inputs/{live_input_identifier}

Update a live input

operationId: `stream-live-inputs-update-a-live-input`

## POST /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/disable

Disable a live input

operationId: `stream-live-inputs-disable-a-live-input`

## POST /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/enable

Enable a live input

operationId: `stream-live-inputs-enable-a-live-input`

## GET /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs

List all outputs associated with a specified live input

operationId: `stream-live-inputs-list-all-outputs-associated-with-a-specified-live-input`

## POST /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs

Create a new output, connected to a live input

operationId: `stream-live-inputs-create-a-new-output,-connected-to-a-live-input`

## DELETE /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}

Delete an output

operationId: `stream-live-inputs-delete-an-output`

## PUT /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}

Update an output

operationId: `stream-live-inputs-update-an-output`

## POST /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/rotate_keys

Rotate keys for a live input

operationId: `stream-live-inputs-rotate-keys-for-a-live-input`
