# Managed Transforms

3 endpoints.

## DELETE /zones/{zone_id}/managed_headers

Delete Managed Transforms

operationId: `deleteManagedTransforms`

## GET /zones/{zone_id}/managed_headers

List Managed Transforms

operationId: `listManagedTransforms`

**Response** 200 → `result`

(one of 5 variants; showing the first)
object

## PATCH /zones/{zone_id}/managed_headers

Update Managed Transforms

operationId: `updateManagedTransforms`

**Request** (application/json)

- `managed_request_headers`: object[] — The list of Managed Request Transforms.
  [array of]
  - `conflicts_with`: object[] — The Managed Transforms that this Managed Transform conflicts with.
    [array]
  - `enabled`: boolean **required** — Whether the Managed Transform is enabled.
  - `has_conflict`: boolean **required** — Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.
  - `id`: string **required** — The human-readable identifier of the Managed Transform.
  - `id`: string
- `managed_response_headers`: object[] — The list of Managed Response Transforms.
  [array of]
  - `conflicts_with`: object[] — The Managed Transforms that this Managed Transform conflicts with.
    [array]
  - `enabled`: boolean **required** — Whether the Managed Transform is enabled.
  - `has_conflict`: boolean **required** — Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.
  - `id`: string **required** — The human-readable identifier of the Managed Transform.
  - `id`: string

**Response** 200 → `result`

(one of 5 variants; showing the first)
object
