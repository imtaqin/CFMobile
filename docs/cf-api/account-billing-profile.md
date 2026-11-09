# Account Billing Profile

5 endpoints.

## DELETE /accounts/{account_id}/billing/profile

Delete Billing Profile

operationId: `account-billing-profile-delete-billing-profile`

## GET /accounts/{account_id}/billing/profile

Get Billing Profile

operationId: `account-billing-profile-get-billing-profile`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/billing/profile

Update Billing Email

operationId: `account-billing-profile-update-billing-email`

**Request** (application/json)

- `billing_email`: string
- `preferred_locale`: string
- `secondary_billing_email`: string

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/billing/profile

Create Billing Profile

operationId: `account-billing-profile-create-billing-profile`

**Request** (application/json)

- `address`: string — Street address line 1.
- `address2`: string — Street address line 2 (apt, suite, etc.).
- `billing_email`: string — Primary billing email address.
- `buying_rate_plan`: string — Rate plan being purchased right after profile setup.
- `captcha_challenge_jwt`: string — Captcha challenge JWT issued during onboarding.
- `cf_turnstile_response`: string — Cloudflare Turnstile response.
- `city`: string — City on the billing profile.
- `company`: string — Company name on the billing profile.
- `country`: string — ISO 3166-1 alpha-2 country code.
- `first_name`: string — First name on the billing profile.
- `h_captcha_response`: string — hCaptcha response.
- `last_name`: string — Last name on the billing profile.
- `preferred_locale`: string — Preferred locale for invoice rendering (BCP 47).
- `secondary_billing_email`: string — Secondary billing email address for CC on invoices.
- `state`: string — State or region on the billing profile.
- `tax_id_type`: string — Type of tax ID provided.
- `telephone`: string — Contact phone number.
- `vat`: string — VAT identifier.
- `zipcode`: string — ZIP or postal code.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/billing/profile

Update Billing Profile

operationId: `account-billing-profile-update-billing-profile`

**Request** (application/json)

- `address`: string — Street address line 1.
- `address2`: string — Street address line 2 (apt, suite, etc.).
- `billing_email`: string — Primary billing email address.
- `buying_rate_plan`: string — Rate plan being purchased right after profile setup.
- `captcha_challenge_jwt`: string — Captcha challenge JWT issued during onboarding.
- `cf_turnstile_response`: string — Cloudflare Turnstile response.
- `city`: string — City on the billing profile.
- `company`: string — Company name on the billing profile.
- `country`: string — ISO 3166-1 alpha-2 country code.
- `first_name`: string — First name on the billing profile.
- `h_captcha_response`: string — hCaptcha response.
- `last_name`: string — Last name on the billing profile.
- `preferred_locale`: string — Preferred locale for invoice rendering (BCP 47).
- `secondary_billing_email`: string — Secondary billing email address for CC on invoices.
- `state`: string — State or region on the billing profile.
- `tax_id_type`: string — Type of tax ID provided.
- `telephone`: string — Contact phone number.
- `vat`: string — VAT identifier.
- `zipcode`: string — ZIP or postal code.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
