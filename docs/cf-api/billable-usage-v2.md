# Billable Usage V2

4 endpoints.

## GET /accounts/{account_id}/billable/usage

Get Account Usage (Version 2, Alpha, Restricted)

operationId: `billable-usage-v2-get-account-usage` · query: `from`, `to`

**Response** 200 → `result`

[array of]
- `BilledCost`: number — A charge serving as the basis for invoicing, inclusive of all reduced rates and discounts while excluding the amortization of upfront charge
- `BillingAccountId`: string — Public identifier of the Cloudflare account (account tag). Omitted when account is not part of the requested grouping, and always omitted fo
- `BillingAccountName`: string — Display name of the Cloudflare account. Omitted when account is not part of the requested grouping, and for usage measured at contract level
- `BillingCurrency`: string — Currency that a charge was billed in (ISO 4217).
- `BillingPeriodEnd`: string — Exclusive end of the billing cycle that contains this usage record.
- `BillingPeriodStart`: string — Inclusive start of the billing cycle that contains this usage record.
- `ChargeCategory`: string **required** enum: `Usage` — Highest-level classification of a charge based on the nature of how it gets billed. Currently only "Usage" is supported.
- `ChargeClass`: string enum: `Correction` — Indicates whether the row represents a correction to one or more charges invoiced in a previous billing period.
- `ChargeDescription`: string **required** — Self-contained summary of the charge's purpose and price.
- `ChargeFrequency`: string **required** enum: `Usage-Based` — Indicates how often a charge occurs. Currently only "Usage-Based" is supported.
- `ChargePeriodEnd`: string **required** — Exclusive end of the time interval during which the usage was consumed.
- `ChargePeriodStart`: string **required** — Inclusive start of the time interval during which the usage was consumed.
- `ConsumedQuantity`: number — Measured usage amount within the charge period. Reflects raw metered consumption before pricing transformations.
- `ConsumedUnit`: string **required** — Unit of measure for the consumed quantity (e.g., "GB", "Requests", "vCPU-Hours").
- `ContractedCost`: number — Cost calculated by multiplying ContractedUnitPrice and the corresponding PricingQuantity.
- `ContractedUnitPrice`: number — The agreed-upon unit price for a single PricingUnit of the associated billable metric, inclusive of negotiated discounts, if present, while 
- `EffectiveCost`: number — The amortized cost of the charge after applying all reduced rates, discounts, and the applicable portion of relevant, prepaid purchases (one
- `HostProviderName`: string **required** — Name of the entity providing the underlying infrastructure or platform.
- `InvoiceIssuerName`: string **required** — Name of the entity responsible for invoicing for the services consumed.
- `ListCost`: number — Cost calculated by multiplying ListUnitPrice and the corresponding PricingQuantity.
- `ListUnitPrice`: number — Suggested provider-published unit price for a single PricingUnit of the associated billable metric, exclusive of any discounts.
- `PricingQuantity`: number — Volume of a given service used or purchased, based on the PricingUnit.
- `PricingUnit`: string — Provider-specified measurement unit for determining unit prices, indicating how the provider rates measured usage after applying pricing rul
- `RegionId`: string — Provider-assigned identifier for an isolated geographic area where a service is provided.
- `RegionName`: string — Name of an isolated geographic area where a service is provided.
- `ServiceProviderName`: string **required** — Name of the entity that made the services available for purchase.
- `SubAccountId`: string — Unique identifier assigned to a grouping of services. For Cloudflare, this is the subscription or contract ID.
- `SubAccountName`: string — Name assigned to a grouping of services. For Cloudflare, this is the subscription or contract display name.
- `Tags`: object — Tag values for the requested `GroupBy` keys. Omitted when `GroupBy` is not provided. Missing keys are omitted, and key-only tags are returne
- `x_BillableMetricId`: string **required** — The unique identifier for the billable metric in the Cloudflare catalog. Cloudflare extension; replaces FOCUS SkuId.
- `x_BillableMetricName`: string — The display name of the billable metric. Cloudflare extension; replaces FOCUS SkuMeter.
- `x_ProductCategoryName`: string — The product category the charge belongs to (e.g., "Developer", "Cloudflare One"). Cloudflare extension; replaces FOCUS ServiceCategory.
- `x_ProductFamilyId`: string — The unique identifier for the product family in the Cloudflare catalog. Cloudflare extension; replaces FOCUS ServiceId.
- `x_ProductFamilyName`: string — The product family the charge belongs to (e.g., "R2", "Workers"). Cloudflare extension; replaces FOCUS ServiceName.
- `x_ZoneId`: string — The identifier for the Cloudflare zone (zone tag). Omitted when zone is not part of the requested grouping, and always omitted for usage mea
- `x_ZoneName`: string — The display name of the Cloudflare zone. Omitted when zone is not part of the requested grouping, and for usage measured at contract level. 

## POST /accounts/{account_id}/billable/usage

Query Account Usage (Version 2, Alpha, Restricted)

operationId: `billable-usage-v2-query-account-usage`

**Request** (application/json)

- `FilterBy`: object — Usage filters. Filters of different kinds are combined with AND, so a record must match every filter present to be returned.
  - `BillableMetricIds`: string[] — Restrict results to rows whose `x_BillableMetricId` matches one of these billable metric ids (e.g. `workers_standard_requests`). Values must
    [array]
  - `ProductFamilyIds`: string[] — Restrict results to billable metrics belonging to these product families. Values must be unique UUIDs.
    [array]
  - `Tags`: object[] — Restrict results by resource tags. Filters for different keys are combined with AND, while values within one filter are combined with OR. Ke
    [array of]
    - `Key`: string **required** — Case-sensitive resource-tag key.
    - `Values`: string[] **required** — Tag values to match. Values are combined with OR and must be unique. An empty string matches a key-only tag.
- `GroupBy`: object[] — Grouping definitions used to split result rows. At most two unique keys may be supplied.
  [array of]
  - `Key`: string **required** — Case-sensitive resource-tag key (for TAG) or dimension key (for DIMENSION), e.g. team, region, account_id or zone_id.
  - `Type`: string **required** enum: `TAG`, `DIMENSION` — Group category.
- `Metric`: string enum: `usage`, `cost` default: `usage` — Type of cost/usage records to retrieve. `usage` returns unrated usage quantities. `cost` returns rated usage with cost and pricing fields; i
- `TimePeriod`: object — Charge period to query, i.e. when consumption happened, not when it was billed. `From` is inclusive and `To` is exclusive. `From` and `To` m
  - `From`: string — Start of the range (ISO 8601). Required if `To` is set.
  - `To`: string — End of the range (ISO 8601). Required if `From` is set. Must be after `From` and no more than 31 days after it.

**Response** 200 → `result`

[array of]
- `BilledCost`: number — A charge serving as the basis for invoicing, inclusive of all reduced rates and discounts while excluding the amortization of upfront charge
- `BillingAccountId`: string — Public identifier of the Cloudflare account (account tag). Omitted when account is not part of the requested grouping, and always omitted fo
- `BillingAccountName`: string — Display name of the Cloudflare account. Omitted when account is not part of the requested grouping, and for usage measured at contract level
- `BillingCurrency`: string — Currency that a charge was billed in (ISO 4217).
- `BillingPeriodEnd`: string — Exclusive end of the billing cycle that contains this usage record.
- `BillingPeriodStart`: string — Inclusive start of the billing cycle that contains this usage record.
- `ChargeCategory`: string **required** enum: `Usage` — Highest-level classification of a charge based on the nature of how it gets billed. Currently only "Usage" is supported.
- `ChargeClass`: string enum: `Correction` — Indicates whether the row represents a correction to one or more charges invoiced in a previous billing period.
- `ChargeDescription`: string **required** — Self-contained summary of the charge's purpose and price.
- `ChargeFrequency`: string **required** enum: `Usage-Based` — Indicates how often a charge occurs. Currently only "Usage-Based" is supported.
- `ChargePeriodEnd`: string **required** — Exclusive end of the time interval during which the usage was consumed.
- `ChargePeriodStart`: string **required** — Inclusive start of the time interval during which the usage was consumed.
- `ConsumedQuantity`: number — Measured usage amount within the charge period. Reflects raw metered consumption before pricing transformations.
- `ConsumedUnit`: string **required** — Unit of measure for the consumed quantity (e.g., "GB", "Requests", "vCPU-Hours").
- `ContractedCost`: number — Cost calculated by multiplying ContractedUnitPrice and the corresponding PricingQuantity.
- `ContractedUnitPrice`: number — The agreed-upon unit price for a single PricingUnit of the associated billable metric, inclusive of negotiated discounts, if present, while 
- `EffectiveCost`: number — The amortized cost of the charge after applying all reduced rates, discounts, and the applicable portion of relevant, prepaid purchases (one
- `HostProviderName`: string **required** — Name of the entity providing the underlying infrastructure or platform.
- `InvoiceIssuerName`: string **required** — Name of the entity responsible for invoicing for the services consumed.
- `ListCost`: number — Cost calculated by multiplying ListUnitPrice and the corresponding PricingQuantity.
- `ListUnitPrice`: number — Suggested provider-published unit price for a single PricingUnit of the associated billable metric, exclusive of any discounts.
- `PricingQuantity`: number — Volume of a given service used or purchased, based on the PricingUnit.
- `PricingUnit`: string — Provider-specified measurement unit for determining unit prices, indicating how the provider rates measured usage after applying pricing rul
- `RegionId`: string — Provider-assigned identifier for an isolated geographic area where a service is provided.
- `RegionName`: string — Name of an isolated geographic area where a service is provided.
- `ServiceProviderName`: string **required** — Name of the entity that made the services available for purchase.
- `SubAccountId`: string — Unique identifier assigned to a grouping of services. For Cloudflare, this is the subscription or contract ID.
- `SubAccountName`: string — Name assigned to a grouping of services. For Cloudflare, this is the subscription or contract display name.
- `Tags`: object — Tag values for the requested `GroupBy` keys. Omitted when `GroupBy` is not provided. Missing keys are omitted, and key-only tags are returne
- `x_BillableMetricId`: string **required** — The unique identifier for the billable metric in the Cloudflare catalog. Cloudflare extension; replaces FOCUS SkuId.
- `x_BillableMetricName`: string — The display name of the billable metric. Cloudflare extension; replaces FOCUS SkuMeter.
- `x_ProductCategoryName`: string — The product category the charge belongs to (e.g., "Developer", "Cloudflare One"). Cloudflare extension; replaces FOCUS ServiceCategory.
- `x_ProductFamilyId`: string — The unique identifier for the product family in the Cloudflare catalog. Cloudflare extension; replaces FOCUS ServiceId.
- `x_ProductFamilyName`: string — The product family the charge belongs to (e.g., "R2", "Workers"). Cloudflare extension; replaces FOCUS ServiceName.
- `x_ZoneId`: string — The identifier for the Cloudflare zone (zone tag). Omitted when zone is not part of the requested grouping, and always omitted for usage mea
- `x_ZoneName`: string — The display name of the Cloudflare zone. Omitted when zone is not part of the requested grouping, and for usage measured at contract level. 

## GET /accounts/{account_id}/billable/usage/billable-metrics

List Account Billable Metrics (Version 2, Alpha, Restricted)

operationId: `billable-usage-v2-get-account-billable-metrics` · query: `from`, `to`

**Response** 200 → `result`

[array of]
- `DimensionKeys`: string[] **required**
  [array]
- `Id`: string **required** — Public catalog identifier of the billable metric.
- `Name`: string **required** — Human-readable billable metric name.
- `ProductCategory`: object[] **required**
  [array of]
  - `Id`: string **required**
  - `Name`: string **required**
- `ProductFamily`: object[] **required**
  [array of]
  - `Id`: string **required**
  - `Name`: string **required**

## GET /organizations/{organization_id}/billable/usage

Get Organization Usage (Version 2, Alpha, Restricted)

operationId: `billable-usage-v2-get-organization-usage` · query: `from`, `to`

**Response** 200 → `result`

[array of]
- `BilledCost`: number — A charge serving as the basis for invoicing, inclusive of all reduced rates and discounts while excluding the amortization of upfront charge
- `BillingAccountId`: string — Public identifier of the Cloudflare account (account tag). Omitted when account is not part of the requested grouping, and always omitted fo
- `BillingAccountName`: string — Display name of the Cloudflare account. Omitted when account is not part of the requested grouping, and for usage measured at contract level
- `BillingCurrency`: string — Currency that a charge was billed in (ISO 4217).
- `BillingPeriodEnd`: string — Exclusive end of the billing cycle that contains this usage record.
- `BillingPeriodStart`: string — Inclusive start of the billing cycle that contains this usage record.
- `ChargeCategory`: string **required** enum: `Usage` — Highest-level classification of a charge based on the nature of how it gets billed. Currently only "Usage" is supported.
- `ChargeClass`: string enum: `Correction` — Indicates whether the row represents a correction to one or more charges invoiced in a previous billing period.
- `ChargeDescription`: string **required** — Self-contained summary of the charge's purpose and price.
- `ChargeFrequency`: string **required** enum: `Usage-Based` — Indicates how often a charge occurs. Currently only "Usage-Based" is supported.
- `ChargePeriodEnd`: string **required** — Exclusive end of the time interval during which the usage was consumed.
- `ChargePeriodStart`: string **required** — Inclusive start of the time interval during which the usage was consumed.
- `ConsumedQuantity`: number — Measured usage amount within the charge period. Reflects raw metered consumption before pricing transformations.
- `ConsumedUnit`: string **required** — Unit of measure for the consumed quantity (e.g., "GB", "Requests", "vCPU-Hours").
- `ContractedCost`: number — Cost calculated by multiplying ContractedUnitPrice and the corresponding PricingQuantity.
- `ContractedUnitPrice`: number — The agreed-upon unit price for a single PricingUnit of the associated billable metric, inclusive of negotiated discounts, if present, while 
- `EffectiveCost`: number — The amortized cost of the charge after applying all reduced rates, discounts, and the applicable portion of relevant, prepaid purchases (one
- `HostProviderName`: string **required** — Name of the entity providing the underlying infrastructure or platform.
- `InvoiceIssuerName`: string **required** — Name of the entity responsible for invoicing for the services consumed.
- `ListCost`: number — Cost calculated by multiplying ListUnitPrice and the corresponding PricingQuantity.
- `ListUnitPrice`: number — Suggested provider-published unit price for a single PricingUnit of the associated billable metric, exclusive of any discounts.
- `PricingQuantity`: number — Volume of a given service used or purchased, based on the PricingUnit.
- `PricingUnit`: string — Provider-specified measurement unit for determining unit prices, indicating how the provider rates measured usage after applying pricing rul
- `RegionId`: string — Provider-assigned identifier for an isolated geographic area where a service is provided.
- `RegionName`: string — Name of an isolated geographic area where a service is provided.
- `ServiceProviderName`: string **required** — Name of the entity that made the services available for purchase.
- `SubAccountId`: string — Unique identifier assigned to a grouping of services. For Cloudflare, this is the subscription or contract ID.
- `SubAccountName`: string — Name assigned to a grouping of services. For Cloudflare, this is the subscription or contract display name.
- `Tags`: object — Tag values for the requested `GroupBy` keys. Omitted when `GroupBy` is not provided. Missing keys are omitted, and key-only tags are returne
- `x_BillableMetricId`: string **required** — The unique identifier for the billable metric in the Cloudflare catalog. Cloudflare extension; replaces FOCUS SkuId.
- `x_BillableMetricName`: string — The display name of the billable metric. Cloudflare extension; replaces FOCUS SkuMeter.
- `x_ProductCategoryName`: string — The product category the charge belongs to (e.g., "Developer", "Cloudflare One"). Cloudflare extension; replaces FOCUS ServiceCategory.
- `x_ProductFamilyId`: string — The unique identifier for the product family in the Cloudflare catalog. Cloudflare extension; replaces FOCUS ServiceId.
- `x_ProductFamilyName`: string — The product family the charge belongs to (e.g., "R2", "Workers"). Cloudflare extension; replaces FOCUS ServiceName.
- `x_ZoneId`: string — The identifier for the Cloudflare zone (zone tag). Omitted when zone is not part of the requested grouping, and always omitted for usage mea
- `x_ZoneName`: string — The display name of the Cloudflare zone. Omitted when zone is not part of the requested grouping, and for usage measured at contract level. 
