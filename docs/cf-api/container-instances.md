# Container Instances

3 endpoints.

## GET /accounts/{account_id}/containers/applications/{application_id}/instances

List container instances (deprecated)

operationId: `listContainerInstances` · query: `per_page`, `page_token`, `state`, `name_prefix`

**Response** 200 → `result`

- `instances`: object[] **required**
  [array of]
  - `application_id`: string — An Application ID represents an identifier of an application.
  - `configuration`: object — The resources allocated to the container instance.
    - `disk`: integer **required** — Disk allocated to the container instance, in decimal MB.
    - `memory`: integer **required** — Memory allocated to the container instance, in MiB.
    - `vcpu`: number **required** — Number of virtual CPUs allocated to the container instance.
  - `id`: string **required** — A container instance ID (64-character hex Durable Object actor ID).
  - `image`: any — The image for the current container placement, when one is available.
  - `location`: object — The location of the instance's current container placement.
    - `name`: string **required** — Unique location code used to identify locations on a logical level.
    - `region`: string **required** — Represents a group of datacenters. Choose one of "AFR", "APAC", "EEUR", "ENAM", "WNAM", "ME", "OC", "SAM", or "WEUR".
  - `name`: string — The customer-provided instance name, when available. Its UTF-8 encoding uses at most 1,024 bytes.
  - `started_at`: any — The time at which the current container placement started, when one exists.
  - `status`: object **required** — The latest known status of a container instance.
    - `exit_code`: integer — The process exit code, when the runtime reports one.
    - `state`: string **required** enum: `provisioning`, `running`, `failed`, `stopping`, `stopped`, `unhealthy`, `inactive`, `unknown` — The current lifecycle state of a container instance.
    - `updated_at`: string **required** — UTC timestamp string in ISO 8601 format.
  - `application_id`: string **required** — An Application ID represents an identifier of an application.
  - `image`: any **required** — The image for the current container placement, or the image currently configured for the application when the instance lacks a placement.

## GET /accounts/{account_id}/containers/applications/{application_id}/instances-v2

List container instances

operationId: `listContainerInstances_v2` · query: `per_page`, `page_token`, `state`, `name_prefix`

**Response** 200 → `result`

[array of]
- `application_id`: string — An Application ID represents an identifier of an application.
- `configuration`: object — The resources allocated to the container instance.
  - `disk`: integer **required** — Disk allocated to the container instance, in decimal MB.
  - `memory`: integer **required** — Memory allocated to the container instance, in MiB.
  - `vcpu`: number **required** — Number of virtual CPUs allocated to the container instance.
- `id`: string **required** — A container instance ID (64-character hex Durable Object actor ID).
- `image`: any — The image for the current container placement, when one is available.
- `location`: object — The location of the instance's current container placement.
  - `name`: string **required** — Unique location code used to identify locations on a logical level.
  - `region`: string **required** — Represents a group of datacenters. Choose one of "AFR", "APAC", "EEUR", "ENAM", "WNAM", "ME", "OC", "SAM", or "WEUR".
- `name`: string — The customer-provided instance name, when available. Its UTF-8 encoding uses at most 1,024 bytes.
- `started_at`: any — The time at which the current container placement started, when one exists.
- `status`: object **required** — The latest known status of a container instance.
  - `exit_code`: integer — The process exit code, when the runtime reports one.
  - `state`: string **required** enum: `provisioning`, `running`, `failed`, `stopping`, `stopped`, `unhealthy`, `inactive`, `unknown` — The current lifecycle state of a container instance.
  - `updated_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `application_id`: string **required** — An Application ID represents an identifier of an application.
- `image`: any **required** — The image for the current container placement, or the image currently configured for the application when the instance lacks a placement.

## GET /accounts/{account_id}/containers/applications/{application_id}/instances/{instance_id}

Get a container instance

operationId: `getContainerInstance`

**Response** 200 → `result`

- `application_id`: string — An Application ID represents an identifier of an application.
- `configuration`: object — The resources allocated to the container instance.
  - `disk`: integer **required** — Disk allocated to the container instance, in decimal MB.
  - `memory`: integer **required** — Memory allocated to the container instance, in MiB.
  - `vcpu`: number **required** — Number of virtual CPUs allocated to the container instance.
- `id`: string **required** — A container instance ID (64-character hex Durable Object actor ID).
- `image`: any — The image for the current container placement, when one is available.
- `location`: object — The location of the instance's current container placement.
  - `name`: string **required** — Unique location code used to identify locations on a logical level.
  - `region`: string **required** — Represents a group of datacenters. Choose one of "AFR", "APAC", "EEUR", "ENAM", "WNAM", "ME", "OC", "SAM", or "WEUR".
- `name`: string — The customer-provided instance name, when available. Its UTF-8 encoding uses at most 1,024 bytes.
- `started_at`: any — The time at which the current container placement started, when one exists.
- `status`: object **required** — The latest known status of a container instance.
  - `exit_code`: integer — The process exit code, when the runtime reports one.
  - `state`: string **required** enum: `provisioning`, `running`, `failed`, `stopping`, `stopped`, `unhealthy`, `inactive`, `unknown` — The current lifecycle state of a container instance.
  - `updated_at`: string **required** — UTC timestamp string in ISO 8601 format.
- `application_id`: string **required** — An Application ID represents an identifier of an application.
- `image`: any **required** — The image for the current container placement, or the image currently configured for the application when the instance lacks a placement.
