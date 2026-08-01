# Image Registries

4 endpoints.

## GET /accounts/{account_id}/containers/registries

Get the list of configured registries in the account

operationId: `listImageRegistries`

## POST /accounts/{account_id}/containers/registries

Add a new image registry configuration

operationId: `createImageRegistry`

## DELETE /accounts/{account_id}/containers/registries/{domain}

Delete a registry from the account

operationId: `deleteImageRegistry`

## POST /accounts/{account_id}/containers/registries/{domain}/credentials

Generate a JWT to interact with the specified image registry.

operationId: `generateImageRegistryCredentials`
