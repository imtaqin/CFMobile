# Workers Smart Placement

1 endpoints.

## GET /accounts/{account_id}/workers/placement/regions

List Workers Smart Placement Regions

operationId: `worker-placement-list-regions`

**Response** 200 → `result`

- `providers`: object[] **required** — List of cloud providers with their available regions.
  [array of]
  - `id`: string **required** — The cloud provider identifier.
  - `regions`: object[] **required** — List of regions available for this provider.
    [array of]
    - `id`: string **required** — The region identifier.
