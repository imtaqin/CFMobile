# Image Registries

4 endpoints.

## GET /accounts/{account_id}/containers/registries

Get the list of configured registries in the account

operationId: `listImageRegistries`

**Response** 200 → `result`

[array of]
- `created_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `domain`: string **required** — A string representation of a domain name. See RFC-1034 (https://www.ietf.org/rfc/rfc1034.txt). Consider that the limit of a domain name is m
- `kind`: any — The type of registry that is being configured.
- `public_key`: string — Public component of the registry credentials. For managed registries this is

## POST /accounts/{account_id}/containers/registries

Configure a private external image registry

operationId: `createImageRegistry`

**Request** (application/json)

- `auth`: object **required** — Credentials for authenticating to a private external image registry. Store the
  - `private_credential`: any **required** — A reference to the private registry credential in Secrets Store. The referenced
  - `public_credential`: string **required** — The non-secret part of the registry credential: an AWS access key ID for ECR,
- `domain`: string **required** — Hostname of the private registry, without a scheme or image path. Supported
- `is_public`: boolean enum: `false` — Omit this field or set it to `false`. Public Docker Hub images do not require
- `kind`: any **required** — Registry provider. This must match `domain`: `DockerHub` for `docker.io`,

**Response** 201 → `result`

- `created_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `domain`: string **required** — A string representation of a domain name. See RFC-1034 (https://www.ietf.org/rfc/rfc1034.txt). Consider that the limit of a domain name is m
- `kind`: any — The type of registry that is being configured.
- `public_key`: string — Public component of the registry credentials. For managed registries this is

## DELETE /accounts/{account_id}/containers/registries/{domain}

Delete a registry from the account

operationId: `deleteImageRegistry`

**Response** 200 → `result`

- `domain`: any **required**

## POST /accounts/{account_id}/containers/registries/{domain}/credentials

Generate a JWT to interact with the specified image registry.

operationId: `generateImageRegistryCredentials`

**Request** (application/json)

- `expiration_minutes`: integer — The number of minutes Cloudflare managed registry credentials stay valid. Required for managed registries and must remain positive. Cloudfla
- `permissions`: string[] — The permissions for Cloudflare managed registry credentials. Required for managed registries. Cloudflare ignores this value for external reg
  [array]

**Response** 201 → `result`

- `account_id`: string **required** — A unique identifier for the user's account.
- `password`: string **required** — The password to use when authenticating to the image registry.
- `registry_host`: string **required** — The domain of the image registry these credentials target.
- `username`: string **required** — The username to use when authenticating to the image registry.
