# Hyperdrive

8 endpoints.

## GET /accounts/{account_id}/hyperdrive/configs

List Hyperdrives

operationId: `list-hyperdrive` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `caching`: object **required**
  - `disabled`: boolean **required** — Defines whether caching is disabled.
  - `max_age`: integer — Defines the maximum duration (in seconds) items persist in the cache.
  - `stale_while_revalidate`: integer — Defines the number of seconds the cache may serve a stale response.
- `created_on`: string — Defines the creation time of the Hyperdrive configuration.
- `id`: string **required** — Define configurations using a unique string identifier.
- `integration`: object
- `modified_on`: string — Defines the last modified time of the Hyperdrive configuration.
- `mtls`: object — mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.
  - `ca_certificate_id`: string — Define CA certificate ID obtained after uploading CA cert.
  - `mtls_certificate_id`: string — Define mTLS certificate ID obtained after uploading client cert.
  - `sslmode`: string — PostgreSQL accepts `require`, `verify-ca`, and `verify-full`. MySQL accepts `REQUIRED`, `VERIFY_CA`, and `VERIFY_IDENTITY`. The verify modes
- `name`: string **required** — The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.
- `origin`: object **required** — Combines database connection fields with exactly one supported network location.
- `origin_connection_limit`: integer — The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.
- `restarted_on`: string — Defines the last time the Hyperdrive connection pool was explicitly restarted via the restart endpoint. Omitted if the pool has never been e

## POST /accounts/{account_id}/hyperdrive/configs

Create Hyperdrive

operationId: `create-hyperdrive`

**Request** (application/json)

(one of 2 variants; showing the first)
- `caching`: object
- `mtls`: object — mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.
  - `ca_certificate_id`: string — Define CA certificate ID obtained after uploading CA cert.
  - `mtls_certificate_id`: string — Define mTLS certificate ID obtained after uploading client cert.
  - `sslmode`: string — PostgreSQL accepts `require`, `verify-ca`, and `verify-full`. MySQL accepts `REQUIRED`, `VERIFY_CA`, and `VERIFY_IDENTITY`. The verify modes
- `name`: string **required** — The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.
- `origin_connection_limit`: integer — The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.
- `integration`: object
- `origin`: object **required** — Combines database connection fields with exactly one supported network location.

**Response** 200 → `result`

- `caching`: object **required**
  - `disabled`: boolean **required** — Defines whether caching is disabled.
  - `max_age`: integer — Defines the maximum duration (in seconds) items persist in the cache.
  - `stale_while_revalidate`: integer — Defines the number of seconds the cache may serve a stale response.
- `created_on`: string — Defines the creation time of the Hyperdrive configuration.
- `id`: string **required** — Define configurations using a unique string identifier.
- `integration`: object
- `modified_on`: string — Defines the last modified time of the Hyperdrive configuration.
- `mtls`: object — mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.
  - `ca_certificate_id`: string — Define CA certificate ID obtained after uploading CA cert.
  - `mtls_certificate_id`: string — Define mTLS certificate ID obtained after uploading client cert.
  - `sslmode`: string — PostgreSQL accepts `require`, `verify-ca`, and `verify-full`. MySQL accepts `REQUIRED`, `VERIFY_CA`, and `VERIFY_IDENTITY`. The verify modes
- `name`: string **required** — The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.
- `origin`: object **required** — Combines database connection fields with exactly one supported network location.
- `origin_connection_limit`: integer — The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.
- `restarted_on`: string — Defines the last time the Hyperdrive connection pool was explicitly restarted via the restart endpoint. Omitted if the pool has never been e

## DELETE /accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}

Delete Hyperdrive

operationId: `delete-hyperdrive`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}

Get Hyperdrive

operationId: `get-hyperdrive`

**Response** 200 → `result`

- `caching`: object **required**
  - `disabled`: boolean **required** — Defines whether caching is disabled.
  - `max_age`: integer — Defines the maximum duration (in seconds) items persist in the cache.
  - `stale_while_revalidate`: integer — Defines the number of seconds the cache may serve a stale response.
- `created_on`: string — Defines the creation time of the Hyperdrive configuration.
- `id`: string **required** — Define configurations using a unique string identifier.
- `integration`: object
- `modified_on`: string — Defines the last modified time of the Hyperdrive configuration.
- `mtls`: object — mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.
  - `ca_certificate_id`: string — Define CA certificate ID obtained after uploading CA cert.
  - `mtls_certificate_id`: string — Define mTLS certificate ID obtained after uploading client cert.
  - `sslmode`: string — PostgreSQL accepts `require`, `verify-ca`, and `verify-full`. MySQL accepts `REQUIRED`, `VERIFY_CA`, and `VERIFY_IDENTITY`. The verify modes
- `name`: string **required** — The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.
- `origin`: object **required** — Combines database connection fields with exactly one supported network location.
- `origin_connection_limit`: integer — The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.
- `restarted_on`: string — Defines the last time the Hyperdrive connection pool was explicitly restarted via the restart endpoint. Omitted if the pool has never been e

## PATCH /accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}

Update Hyperdrive

operationId: `patch-hyperdrive`

**Request** (application/json)

- `caching`: object
- `mtls`: object — mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.
  - `ca_certificate_id`: string — Define CA certificate ID obtained after uploading CA cert.
  - `mtls_certificate_id`: string — Define mTLS certificate ID obtained after uploading client cert.
  - `sslmode`: string — PostgreSQL accepts `require`, `verify-ca`, and `verify-full`. MySQL accepts `REQUIRED`, `VERIFY_CA`, and `VERIFY_IDENTITY`. The verify modes
- `name`: string — The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API. An empty value leaves the 
- `origin`: object
- `origin_connection_limit`: integer — The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.

**Response** 200 → `result`

- `caching`: object **required**
  - `disabled`: boolean **required** — Defines whether caching is disabled.
  - `max_age`: integer — Defines the maximum duration (in seconds) items persist in the cache.
  - `stale_while_revalidate`: integer — Defines the number of seconds the cache may serve a stale response.
- `created_on`: string — Defines the creation time of the Hyperdrive configuration.
- `id`: string **required** — Define configurations using a unique string identifier.
- `integration`: object
- `modified_on`: string — Defines the last modified time of the Hyperdrive configuration.
- `mtls`: object — mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.
  - `ca_certificate_id`: string — Define CA certificate ID obtained after uploading CA cert.
  - `mtls_certificate_id`: string — Define mTLS certificate ID obtained after uploading client cert.
  - `sslmode`: string — PostgreSQL accepts `require`, `verify-ca`, and `verify-full`. MySQL accepts `REQUIRED`, `VERIFY_CA`, and `VERIFY_IDENTITY`. The verify modes
- `name`: string **required** — The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.
- `origin`: object **required** — Combines database connection fields with exactly one supported network location.
- `origin_connection_limit`: integer — The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.
- `restarted_on`: string — Defines the last time the Hyperdrive connection pool was explicitly restarted via the restart endpoint. Omitted if the pool has never been e

## PUT /accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}

Replace Hyperdrive

operationId: `update-hyperdrive`

**Request** (application/json)

- `caching`: object
- `created_on`: string — Defines the creation time of the Hyperdrive configuration.
- `id`: string **required** — Define configurations using a unique string identifier.
- `modified_on`: string — Defines the last modified time of the Hyperdrive configuration.
- `mtls`: object — mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.
  - `ca_certificate_id`: string — Define CA certificate ID obtained after uploading CA cert.
  - `mtls_certificate_id`: string — Define mTLS certificate ID obtained after uploading client cert.
  - `sslmode`: string — PostgreSQL accepts `require`, `verify-ca`, and `verify-full`. MySQL accepts `REQUIRED`, `VERIFY_CA`, and `VERIFY_IDENTITY`. The verify modes
- `name`: string **required** — The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.
- `origin`: object **required** — Combines database connection fields with exactly one supported network location.
- `origin_connection_limit`: integer — The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.
- `restarted_on`: string — Defines the last time the Hyperdrive connection pool was explicitly restarted via the restart endpoint. Omitted if the pool has never been e

**Response** 200 → `result`

- `caching`: object **required**
  - `disabled`: boolean **required** — Defines whether caching is disabled.
  - `max_age`: integer — Defines the maximum duration (in seconds) items persist in the cache.
  - `stale_while_revalidate`: integer — Defines the number of seconds the cache may serve a stale response.
- `created_on`: string — Defines the creation time of the Hyperdrive configuration.
- `id`: string **required** — Define configurations using a unique string identifier.
- `integration`: object
- `modified_on`: string — Defines the last modified time of the Hyperdrive configuration.
- `mtls`: object — mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.
  - `ca_certificate_id`: string — Define CA certificate ID obtained after uploading CA cert.
  - `mtls_certificate_id`: string — Define mTLS certificate ID obtained after uploading client cert.
  - `sslmode`: string — PostgreSQL accepts `require`, `verify-ca`, and `verify-full`. MySQL accepts `REQUIRED`, `VERIFY_CA`, and `VERIFY_IDENTITY`. The verify modes
- `name`: string **required** — The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.
- `origin`: object **required** — Combines database connection fields with exactly one supported network location.
- `origin_connection_limit`: integer — The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.
- `restarted_on`: string — Defines the last time the Hyperdrive connection pool was explicitly restarted via the restart endpoint. Omitted if the pool has never been e

## POST /accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}/restart

Restart Hyperdrive

operationId: `restart-hyperdrive`

**Response** 200 → `result`

- `caching`: object **required**
  - `disabled`: boolean **required** — Defines whether caching is disabled.
  - `max_age`: integer — Defines the maximum duration (in seconds) items persist in the cache.
  - `stale_while_revalidate`: integer — Defines the number of seconds the cache may serve a stale response.
- `created_on`: string — Defines the creation time of the Hyperdrive configuration.
- `id`: string **required** — Define configurations using a unique string identifier.
- `integration`: object
- `modified_on`: string — Defines the last modified time of the Hyperdrive configuration.
- `mtls`: object — mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.
  - `ca_certificate_id`: string — Define CA certificate ID obtained after uploading CA cert.
  - `mtls_certificate_id`: string — Define mTLS certificate ID obtained after uploading client cert.
  - `sslmode`: string — PostgreSQL accepts `require`, `verify-ca`, and `verify-full`. MySQL accepts `REQUIRED`, `VERIFY_CA`, and `VERIFY_IDENTITY`. The verify modes
- `name`: string **required** — The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.
- `origin`: object **required** — Combines database connection fields with exactly one supported network location.
- `origin_connection_limit`: integer — The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.
- `restarted_on`: string — Defines the last time the Hyperdrive connection pool was explicitly restarted via the restart endpoint. Omitted if the pool has never been e

## POST /accounts/{account_id}/hyperdrive/integrationsOperations/planetScale/createDatabaseSignature

Create Database Signature

operationId: `create-hyperdrive-database-signature`

**Response** 200 → `result`

- `account_id`: string **required** — The Cloudflare account the signature authorizes. This is the identifier the signature is computed over, and is passed to the integration par
- `signature`: string **required** — Hex-encoded signature authorizing the database creation.
- `timestamp`: string **required** — Unix timestamp, in seconds, at which the signature was issued. The integration partner uses it to verify the signature and reject stale auth
