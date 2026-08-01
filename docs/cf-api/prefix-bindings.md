# Prefix Bindings

5 endpoints.

## GET /accounts/{account_id}/dls/regional_services/prefix_bindings

List DLS prefix bindings for an account

operationId: `publicListPrefixBindings` · query: `cursor`, `per_page`

## POST /accounts/{account_id}/dls/regional_services/prefix_bindings

Create a DLS prefix binding

operationId: `publicCreatePrefixBinding`

## DELETE /accounts/{account_id}/dls/regional_services/prefix_bindings/{binding_id}

Delete a DLS prefix binding

operationId: `publicDeletePrefixBinding`

## GET /accounts/{account_id}/dls/regional_services/prefix_bindings/{binding_id}

Get a DLS prefix binding

operationId: `publicGetPrefixBinding`

## PATCH /accounts/{account_id}/dls/regional_services/prefix_bindings/{binding_id}

Update a DLS prefix binding

operationId: `publicPatchPrefixBinding`
