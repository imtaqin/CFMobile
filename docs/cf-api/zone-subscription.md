# Zone Subscription

7 endpoints.

## DELETE /zones/{zone_id}/subscription

Delete Zone Subscription

operationId: `zone-subscription-delete-zone-subscription`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/subscription

Zone Subscription Details

operationId: `zone-subscription-zone-subscription-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/subscription

Create Zone Subscription

operationId: `zone-subscription-create-zone-subscription`

**Request** (application/json)

- `app`: object — Cloudflare Apps Marketplace is sunset. This field is retained for legacy grandfathered app subscriptions only.
  - `install_id`: string — app install id.
- `component_values`: object[] — Configurable component values for the subscription.
  [array of]
  - `default`: number — The default amount assigned.
  - `display_name`: string — A human-readable version of the component name.
  - `kind`: string enum: `enum`, `sum`, `usage` — The type of component value. "enum" for discrete values (including boolean on/off toggles where 0=off and 1=on), "sum" for countable quantit
  - `name`: string — The name of the component value.
  - `price`: number — The unit price for the component value.
  - `value`: number — The amount of the component value assigned.
- `currency`: string — The monetary unit in which pricing information is displayed.
- `current_period_end`: string — The end of the current period and also when the next billing is due.
- `current_period_start`: string — When the current billing period started. May match initial_period_start if this is the first period.
- `frequency`: string enum: `weekly`, `monthly`, `quarterly`, `yearly` — How often the subscription is renewed automatically.
- `id`: string — Subscription identifier tag.
- `price`: number — The price of the subscription that will be billed, in US dollars.
- `rate_plan`: object — The rate plan applied to the subscription.
  - `currency`: string — The currency applied to the rate plan subscription.
  - `externally_managed`: boolean — Whether this rate plan is managed externally from Cloudflare.
  - `id`: string — The ID of the rate plan.
  - `is_contract`: boolean — Whether a rate plan is enterprise-based (or newly adopted term contract).
  - `public_name`: string — The full name of the rate plan.
  - `scope`: string — The scope that this rate plan applies to.
  - `sets`: string[] — The list of sets this rate plan applies to. Returns array of strings.
    [array]
- `state`: string enum: `Trial`, `Provisioned`, `Paid`, `AwaitingPayment`, `Cancelled`, `Failed`, `Expired` — The state that the subscription is in.
- `zone`: any

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/subscription

Update Zone Subscription

operationId: `zone-subscription-update-zone-subscription`

**Request** (application/json)

- `app`: object — Cloudflare Apps Marketplace is sunset. This field is retained for legacy grandfathered app subscriptions only.
  - `install_id`: string — app install id.
- `component_values`: object[] — Configurable component values for the subscription.
  [array of]
  - `default`: number — The default amount assigned.
  - `display_name`: string — A human-readable version of the component name.
  - `kind`: string enum: `enum`, `sum`, `usage` — The type of component value. "enum" for discrete values (including boolean on/off toggles where 0=off and 1=on), "sum" for countable quantit
  - `name`: string — The name of the component value.
  - `price`: number — The unit price for the component value.
  - `value`: number — The amount of the component value assigned.
- `currency`: string — The monetary unit in which pricing information is displayed.
- `current_period_end`: string — The end of the current period and also when the next billing is due.
- `current_period_start`: string — When the current billing period started. May match initial_period_start if this is the first period.
- `frequency`: string enum: `weekly`, `monthly`, `quarterly`, `yearly` — How often the subscription is renewed automatically.
- `id`: string — Subscription identifier tag.
- `price`: number — The price of the subscription that will be billed, in US dollars.
- `rate_plan`: object — The rate plan applied to the subscription.
  - `currency`: string — The currency applied to the rate plan subscription.
  - `externally_managed`: boolean — Whether this rate plan is managed externally from Cloudflare.
  - `id`: string — The ID of the rate plan.
  - `is_contract`: boolean — Whether a rate plan is enterprise-based (or newly adopted term contract).
  - `public_name`: string — The full name of the rate plan.
  - `scope`: string — The scope that this rate plan applies to.
  - `sets`: string[] — The list of sets this rate plan applies to. Returns array of strings.
    [array]
- `state`: string enum: `Trial`, `Provisioned`, `Paid`, `AwaitingPayment`, `Cancelled`, `Failed`, `Expired` — The state that the subscription is in.
- `zone`: any

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /zones/{zone_id}/subscriptions

Delete Zone Subscription

operationId: `zone-subscription-delete-zone-subscriptions`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/subscriptions

Create Zone Subscription

operationId: `zone-subscription-create-zone-subscriptions`

**Request** (application/json)

- `app`: object — Cloudflare Apps Marketplace is sunset. This field is retained for legacy grandfathered app subscriptions only.
  - `install_id`: string — app install id.
- `component_values`: object[] — Configurable component values for the subscription.
  [array of]
  - `default`: number — The default amount assigned.
  - `display_name`: string — A human-readable version of the component name.
  - `kind`: string enum: `enum`, `sum`, `usage` — The type of component value. "enum" for discrete values (including boolean on/off toggles where 0=off and 1=on), "sum" for countable quantit
  - `name`: string — The name of the component value.
  - `price`: number — The unit price for the component value.
  - `value`: number — The amount of the component value assigned.
- `currency`: string — The monetary unit in which pricing information is displayed.
- `current_period_end`: string — The end of the current period and also when the next billing is due.
- `current_period_start`: string — When the current billing period started. May match initial_period_start if this is the first period.
- `frequency`: string enum: `weekly`, `monthly`, `quarterly`, `yearly` — How often the subscription is renewed automatically.
- `id`: string — Subscription identifier tag.
- `price`: number — The price of the subscription that will be billed, in US dollars.
- `rate_plan`: object — The rate plan applied to the subscription.
  - `currency`: string — The currency applied to the rate plan subscription.
  - `externally_managed`: boolean — Whether this rate plan is managed externally from Cloudflare.
  - `id`: string — The ID of the rate plan.
  - `is_contract`: boolean — Whether a rate plan is enterprise-based (or newly adopted term contract).
  - `public_name`: string — The full name of the rate plan.
  - `scope`: string — The scope that this rate plan applies to.
  - `sets`: string[] — The list of sets this rate plan applies to. Returns array of strings.
    [array]
- `state`: string enum: `Trial`, `Provisioned`, `Paid`, `AwaitingPayment`, `Cancelled`, `Failed`, `Expired` — The state that the subscription is in.
- `zone`: any

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/subscriptions

Update Zone Subscription

operationId: `zone-subscription-update-zone-subscriptions`

**Request** (application/json)

- `app`: object — Cloudflare Apps Marketplace is sunset. This field is retained for legacy grandfathered app subscriptions only.
  - `install_id`: string — app install id.
- `component_values`: object[] — Configurable component values for the subscription.
  [array of]
  - `default`: number — The default amount assigned.
  - `display_name`: string — A human-readable version of the component name.
  - `kind`: string enum: `enum`, `sum`, `usage` — The type of component value. "enum" for discrete values (including boolean on/off toggles where 0=off and 1=on), "sum" for countable quantit
  - `name`: string — The name of the component value.
  - `price`: number — The unit price for the component value.
  - `value`: number — The amount of the component value assigned.
- `currency`: string — The monetary unit in which pricing information is displayed.
- `current_period_end`: string — The end of the current period and also when the next billing is due.
- `current_period_start`: string — When the current billing period started. May match initial_period_start if this is the first period.
- `frequency`: string enum: `weekly`, `monthly`, `quarterly`, `yearly` — How often the subscription is renewed automatically.
- `id`: string — Subscription identifier tag.
- `price`: number — The price of the subscription that will be billed, in US dollars.
- `rate_plan`: object — The rate plan applied to the subscription.
  - `currency`: string — The currency applied to the rate plan subscription.
  - `externally_managed`: boolean — Whether this rate plan is managed externally from Cloudflare.
  - `id`: string — The ID of the rate plan.
  - `is_contract`: boolean — Whether a rate plan is enterprise-based (or newly adopted term contract).
  - `public_name`: string — The full name of the rate plan.
  - `scope`: string — The scope that this rate plan applies to.
  - `sets`: string[] — The list of sets this rate plan applies to. Returns array of strings.
    [array]
- `state`: string enum: `Trial`, `Provisioned`, `Paid`, `AwaitingPayment`, `Cancelled`, `Failed`, `Expired` — The state that the subscription is in.
- `zone`: any

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
