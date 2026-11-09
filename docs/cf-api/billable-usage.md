# Billable Usage

2 endpoints.

## GET /accounts/{account_id}/billable-usage

Get Account Billable Usage (Version 1, Alpha)

operationId: `billable-usage-get-v1-account-usage` · query: `from`, `to`

**Response** 200 → `result`

[array of]
- `BilledCost`: number **required** — The amount invoiced for this charge. PayGo is billed directly by Cloudflare, so this equals ContractedCost.
- `BillingAccountId`: string **required** — The identifier of the account the charge is billed to (account tag).
- `BillingAccountName`: string **required** — The display name of the billing account. Null when the name could not be resolved.
- `BillingCurrency`: string **required** — Specifies the billing currency code (ISO 4217).
- `BillingPeriodStart`: string **required** — Indicates the start of the billing period. There is no `BillingPeriodEnd` counterpart; see the known gaps described on this schema.
- `ChargeCategory`: string **required** enum: `Usage` — Describes the nature of the charge. Always "Usage" for this endpoint, which only returns metered usage.
- `ChargeClass`: string **required** — Indicates whether the row corrects a previously invoiced billing period. Always null for this endpoint, which does not return corrections.
- `ChargeDescription`: string **required** — A human-readable summary of the charge.
- `ChargePeriodEnd`: string **required** — Indicates the end of the charge period.
- `ChargePeriodStart`: string **required** — Indicates the start of the charge period.
- `ConsumedQuantity`: number **required** — Specifies the quantity consumed during this charge period.
- `ConsumedUnit`: string **required** — A display name for the unit of measurement used for the product (for example, "GB-months", "GB-seconds"). May be empty when the unit is impl
- `ContractedCost`: number **required** — Specifies the cost for this charge period in the billing currency.
- `CumulatedContractedCost`: number **required** — Specifies the cumulated cost for the billing period in the billing currency.
- `CumulatedPricingQuantity`: integer **required** — Specifies the portion of usage that is actually subject to a unit price.
- `EffectiveCost`: number **required** — The amortized cost of the charge. PayGo has no upfront commitments, so this equals ContractedCost.
- `HostProviderName`: string **required** — The provider that hosts the infrastructure or platform the service runs on.
- `InvoiceIssuerName`: string **required** — The entity that issues the invoice for this charge.
- `ListCost`: number **required** — The cost at published list prices, before any discount. PayGo has no commitment discounts, so this equals ContractedCost.
- `PricingQuantity`: integer **required** — Specifies the pricing quantity for this charge period.
- `PricingUnit`: string **required** — The unit that PricingQuantity is expressed in. Unlike ConsumedUnit this is never empty; it falls back to "Count" when the service has no exp
- `ServiceFamilyName`: string — Identifies the product family for the Cloudflare service.
- `ServiceName`: string **required** — Identifies the Cloudflare service.
- `ServiceProviderName`: string **required** — The provider of the purchased service.
- `SubscriptionId`: string — The identifier for the Cloudflare subscription.
- `ZoneId`: string — The identifier for the Cloudflare zone (zone tag).
- `ZoneName`: string — The display name of the Cloudflare zone.

## GET /accounts/{account_id}/billable-usage/info

Get Account Billable Usage Info (Version 1, Alpha)

operationId: `billable-usage-get-v1-account-usage-info`

**Response** 200 → `result`

- `covered`: boolean **required** — Indicates whether the account is covered.
- `subscriptions`: object[] **required** — List of subscriptions for the account.
  [array of]
  - `billing_cycle_anchor_timestamp`: string **required** — The subscription billing cycle anchor timestamp.
  - `end_timestamp`: string — The subscription end timestamp. Omitted for active subscriptions; present only when the subscription has been cancelled.
  - `id`: string **required** — The identifier for the Cloudflare subscription.
  - `start_timestamp`: string **required** — The subscription start timestamp.
