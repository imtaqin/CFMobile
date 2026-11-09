# Account Payment Methods

6 endpoints.

## GET /accounts/{account_id}/payment-methods

List Payment Methods

operationId: `account-billing-list-payment-methods` · query: `page`, `per_page`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/payment-methods

Create Payment Method

operationId: `account-billing-create-payment-method`

**Request** (application/json)

- `address`: string — Billing address line 1.
- `address2`: string — Billing address line 2.
- `bank_account_type`: string — Bank account type.
- `bank_code`: string — Bank code.
- `bank_country`: string — Bank country.
- `bank_name`: string — Bank name for bank-based payment methods.
- `bank_routing_number`: string — Bank routing number.
- `cashapp_cash_tag`: string — Cash App cash tag.
- `city`: string — Billing city.
- `country`: string — Billing country.
- `default`: boolean — Whether this is the default payment method.
- `device_data`: string — Device data for fraud prevention.
- `expiration_date`: string — Card expiration date.
- `first_name`: string — Billing first name.
- `id`: string — Payment method identifier.
- `last_four`: string — Last four digits of the card number.
- `last_name`: string — Billing last name.
- `nick_name`: string — A nickname for the payment method.
- `payment_account_email`: string — Email associated with the payment account.
- `payment_email`: string — Payment email address.
- `payment_gateway`: string — The payment gateway used.
- `payment_nonce`: string — Payment nonce for tokenized payments.
- `state`: string — Billing state.
- `type`: string enum: `CREDIT_CARD`, `PAYPAL`, `CASHAPP`, `SEPA_DEBIT`, `LINK`, `ACH_DIRECT_DEBIT` — The payment method type.
- `zipcode`: string — Billing zip code.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/payment-methods/{payment_method_id}

Delete Payment Method

operationId: `account-billing-delete-payment-method`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/payment-methods/{payment_method_id}

Get Payment Method

operationId: `account-billing-get-payment-method`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/payment-methods/{payment_method_id}

Update Payment Method

operationId: `account-billing-update-payment-method`

**Request** (application/json)

- `address`: string — Billing address line 1.
- `address2`: string — Billing address line 2.
- `bank_account_type`: string — Bank account type.
- `bank_code`: string — Bank code.
- `bank_country`: string — Bank country.
- `bank_name`: string — Bank name for bank-based payment methods.
- `bank_routing_number`: string — Bank routing number.
- `cashapp_cash_tag`: string — Cash App cash tag.
- `city`: string — Billing city.
- `country`: string — Billing country.
- `default`: boolean — Whether this is the default payment method.
- `device_data`: string — Device data for fraud prevention.
- `expiration_date`: string — Card expiration date.
- `first_name`: string — Billing first name.
- `id`: string — Payment method identifier.
- `last_four`: string — Last four digits of the card number.
- `last_name`: string — Billing last name.
- `nick_name`: string — A nickname for the payment method.
- `payment_account_email`: string — Email associated with the payment account.
- `payment_email`: string — Payment email address.
- `payment_gateway`: string — The payment gateway used.
- `payment_nonce`: string — Payment nonce for tokenized payments.
- `state`: string — Billing state.
- `type`: string enum: `CREDIT_CARD`, `PAYPAL`, `CASHAPP`, `SEPA_DEBIT`, `LINK`, `ACH_DIRECT_DEBIT` — The payment method type.
- `zipcode`: string — Billing zip code.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/payment-methods/{payment_method_id}/set-as-default

Set Default Payment Method

operationId: `account-billing-set-default-payment-method`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
