# Zero Trust accounts

13 endpoints.

## DELETE /accounts/{account_id}/devices/settings

Reset device settings for a Zero Trust account with defaults. This turns off all proxying.

operationId: `zero-trust-accounts-delete-device-settings-for-zero-trust-account`

## GET /accounts/{account_id}/devices/settings

Get device settings for a Zero Trust account

operationId: `zero-trust-accounts-get-device-settings-for-zero-trust-account`

## PATCH /accounts/{account_id}/devices/settings

Patch device settings for a Zero Trust account

operationId: `zero-trust-accounts-patch-device-settings-for-the-zero-trust-account`

## PUT /accounts/{account_id}/devices/settings

Update device settings for a Zero Trust account

operationId: `zero-trust-accounts-update-device-settings-for-the-zero-trust-account`

## GET /accounts/{account_id}/gateway

Get Zero Trust account information

operationId: `zero-trust-accounts-get-zero-trust-account-information`

## POST /accounts/{account_id}/gateway

Create Zero Trust account

operationId: `zero-trust-accounts-create-zero-trust-account`

## GET /accounts/{account_id}/gateway/configuration

Get Zero Trust account configuration

operationId: `zero-trust-accounts-get-zero-trust-account-configuration`

## PATCH /accounts/{account_id}/gateway/configuration

Patch Zero Trust account configuration

operationId: `zero-trust-accounts-patch-zero-trust-account-configuration`

## PUT /accounts/{account_id}/gateway/configuration

Update Zero Trust account configuration

operationId: `zero-trust-accounts-update-zero-trust-account-configuration.`

## GET /accounts/{account_id}/gateway/configuration/custom_certificate

Get Zero Trust certificate configuration

operationId: `zero-trust-accounts-get-zero-trust-certificate-configuration`

## GET /accounts/{account_id}/gateway/egress_cidr_pairs

Get gateway egress CIDRs pairs assigned to this account

operationId: `zero-trust-accounts-get-egress-cidr-pairs`

## GET /accounts/{account_id}/gateway/logging

Get logging settings for the Zero Trust account

operationId: `zero-trust-accounts-get-logging-settings-for-the-zero-trust-account`

## PUT /accounts/{account_id}/gateway/logging

Update Zero Trust account logging settings

operationId: `zero-trust-accounts-update-logging-settings-for-the-zero-trust-account`
