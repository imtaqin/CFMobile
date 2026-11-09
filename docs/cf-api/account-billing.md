# Account Billing

9 endpoints.

## GET /accounts/{account_id}/billing/bad-debt

Get Account Bad Debt

operationId: `account-billing-get-bad-debt`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/billing/credits

Get Account Credits

operationId: `account-billing-get-credits`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/billing/profile/payment-method

Create Payment Intent for Billing Profile

operationId: `account-billing-create-payment-intent`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/billing/unpaid-invoice

Get Unpaid Invoices

operationId: `account-billing-get-unpaid-invoices`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/client-secret

Create Setup Intent

operationId: `account-billing-create-setup-intent`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/invoices

Toggle PDF Invoices

operationId: `account-billing-toggle-pdf-invoices`

**Request** (application/json)

- `toggle`: boolean — Whether to enable or disable PDF invoice generation.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/pay-invoice

Pay Invoice

operationId: `account-billing-pay-invoice`

**Request** (application/json)

- `invoice_id`: string — The identifier of the invoice to pay.
- `payment_method_id`: string — The payment method to use. If omitted, the default payment method is used.
- `validate_payment_method`: boolean — Whether to validate the payment method before processing.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/receipts/{receipt_id}/pdf

Get Receipt PDF

operationId: `account-billing-get-receipt-pdf` · query: `doctype`

**Response** 200 → `result`

string

## POST /billing/address-validation

Validate Billing Address

operationId: `billing-validate-address`

**Request** (application/json)

- `address`: string — Address line 1.
- `address2`: string — Address line 2.
- `city`: string — City.
- `country`: string — Country code.
- `state`: string — State or province.
- `zipcode`: string — Postal or zip code.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
