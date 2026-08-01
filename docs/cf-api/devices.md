# Devices

26 endpoints.

## GET /accounts/{account_id}/devices

List devices (deprecated)

operationId: `devices-list-devices`

## GET /accounts/{account_id}/devices/{device_id}

Get device (deprecated)

operationId: `devices-device-details`

## GET /accounts/{account_id}/devices/{device_id}/override_codes

Get override codes (deprecated)

operationId: `devices-list-admin-override-code-for-device`

## GET /accounts/{account_id}/devices/policies

List device settings profiles

operationId: `devices-list-device-settings-policies`

## GET /accounts/{account_id}/devices/policy

Get the default device settings profile

operationId: `devices-get-default-device-settings-policy`

## PATCH /accounts/{account_id}/devices/policy

Update the default device settings profile

operationId: `devices-update-default-device-settings-policy`

## POST /accounts/{account_id}/devices/policy

Create a device settings profile

operationId: `devices-create-device-settings-policy`

## DELETE /accounts/{account_id}/devices/policy/{policy_id}

Delete a device settings profile

operationId: `devices-delete-device-settings-policy`

## GET /accounts/{account_id}/devices/policy/{policy_id}

Get device settings profile by ID

operationId: `devices-get-device-settings-policy-by-id`

## PATCH /accounts/{account_id}/devices/policy/{policy_id}

Update a device settings profile

operationId: `devices-update-device-settings-policy`

## GET /accounts/{account_id}/devices/policy/{policy_id}/exclude

Get the Split Tunnel exclude list for a device settings profile

operationId: `devices-get-split-tunnel-exclude-list-for-a-device-settings-policy`

## PUT /accounts/{account_id}/devices/policy/{policy_id}/exclude

Set the Split Tunnel exclude list for a device settings profile

operationId: `devices-set-split-tunnel-exclude-list-for-a-device-settings-policy`

## GET /accounts/{account_id}/devices/policy/{policy_id}/fallback_domains

Get the Local Domain Fallback list for a device settings profile

operationId: `devices-get-local-domain-fallback-list-for-a-device-settings-policy`

## PUT /accounts/{account_id}/devices/policy/{policy_id}/fallback_domains

Set the Local Domain Fallback list for a device settings profile

operationId: `devices-set-local-domain-fallback-list-for-a-device-settings-policy`

## GET /accounts/{account_id}/devices/policy/{policy_id}/include

Get the Split Tunnel include list for a device settings profile

operationId: `devices-get-split-tunnel-include-list-for-a-device-settings-policy`

## PUT /accounts/{account_id}/devices/policy/{policy_id}/include

Set the Split Tunnel include list for a device settings profile

operationId: `devices-set-split-tunnel-include-list-for-a-device-settings-policy`

## GET /accounts/{account_id}/devices/policy/exclude

Get the Split Tunnel exclude list

operationId: `devices-get-split-tunnel-exclude-list`

## PUT /accounts/{account_id}/devices/policy/exclude

Set the Split Tunnel exclude list

operationId: `devices-set-split-tunnel-exclude-list`

## GET /accounts/{account_id}/devices/policy/fallback_domains

Get your Local Domain Fallback list

operationId: `devices-get-local-domain-fallback-list`

## PUT /accounts/{account_id}/devices/policy/fallback_domains

Set your Local Domain Fallback list

operationId: `devices-set-local-domain-fallback-list`

## GET /accounts/{account_id}/devices/policy/include

Get the Split Tunnel include list

operationId: `devices-get-split-tunnel-include-list`

## PUT /accounts/{account_id}/devices/policy/include

Set the Split Tunnel include list

operationId: `devices-set-split-tunnel-include-list`

## POST /accounts/{account_id}/devices/revoke

Revoke devices (deprecated)

operationId: `devices-revoke-devices`

## POST /accounts/{account_id}/devices/unrevoke

Unrevoke devices (deprecated)

operationId: `devices-unrevoke-devices`

## GET /zones/{zone_id}/devices/policy/certificates

Get device certificate provisioning status

operationId: `devices-get-policy-certificates`

## PATCH /zones/{zone_id}/devices/policy/certificates

Update device certificate provisioning status

operationId: `devices-update-policy-certificates`
