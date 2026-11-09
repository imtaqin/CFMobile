# Zone Entitlements

1 endpoints.

## GET /zones/{zone_id}/entitlements

Get Zone Entitlements

operationId: `entitlements-get-zone-entitlements`

**Response** 200 → `result`

[array of]
- `allocation`: object **required** — Represents the allocation value for an entitlement. The shape of `value` depends on `type`: `bool` uses a boolean, `max_count` uses an integ
  - `type`: string **required** enum: `bool`, `max_count`, `enum_number`, `range`, `string` — Allocation type discriminator.
  - `value`: any **required** — Contains the allocation value whose concrete type the `type` field determines: bool yields a boolean, max_count yields an integer, enum_numb
- `created_date`: string **required** — ISO 8601 timestamp (microsecond precision, no timezone offset) when the entitlement was created. Format: `YYYY-MM-DDTHH:MM:SS.ffffff`.
- `deleted_date`: string **required** — ISO 8601 timestamp when the entitlement was deleted, or empty string if not deleted.
- `edited_date`: string **required** — ISO 8601 timestamp (microsecond precision, no timezone offset) when the entitlement was last edited.
- `feature`: object **required** — Describes a product feature associated with an entitlement.
  - `feature_set`: string **required** — The logical grouping (set) this feature belongs to.
  - `id`: integer **required** — Numeric identifier of the feature.
  - `key`: string **required** — Unique string key for the feature.
  - `name`: string **required** — Human-readable name of the feature.
- `id`: string **required** — Entitlement identifier — equal to the feature key.
