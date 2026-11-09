# Devices

30 endpoints.

## GET /accounts/{account_id}/devices

List devices (deprecated)

operationId: `devices-list-devices`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/{device_id}

Get device (deprecated)

operationId: `devices-device-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/{device_id}/override_codes

Get override codes (deprecated)

operationId: `devices-list-admin-override-code-for-device`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/policies

List device settings profiles

operationId: `devices-list-device-settings-policies` · query: `profile_type`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/policy

Get the default device settings profile

operationId: `devices-get-default-device-settings-policy`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/devices/policy

Update the default device settings profile

operationId: `devices-update-default-device-settings-policy`

**Request** (application/json)

- `allow_mode_switch`: boolean default: `false` — Whether to allow the user to switch WARP between modes.
- `allow_updates`: boolean default: `false` — Whether to receive update notifications when a new version of the client is available.
- `allowed_to_leave`: boolean default: `true` — Whether to allow devices to leave the organization.
- `auto_connect`: number default: `0` — The amount of time in seconds to reconnect after having been disabled.
- `captive_portal`: number default: `180` — Turn on the captive portal after the specified amount of time.
- `disable_auto_fallback`: boolean default: `false` — If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers
- `dns_search_suffixes`: object[] default: `` — List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.
  [array of]
  - `description`: string — A description of the DNS search suffix.
  - `suffix`: string **required** — The DNS search suffix to append when resolving short hostnames.
- `enable_device_credential_authentication`: boolean default: `false` — Determines whether the WARP client can silently reauthenticate the user with device credentials (Microsoft Entra) instead of prompting for b
- `exclude`: object[] — List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.
  [array of]
  - `address`: string **required** — The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.
  - `description`: string — A description of the Split Tunnel item, displayed in the client UI.
- `exclude_office_ips`: boolean default: `false` — Whether to add Microsoft IPs to Split Tunnel exclusions.
- `global_acceleration`: object — Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default one
  - `allow_manual_override`: boolean default: `true` — Whether WARP users may manually override the automatic Global Acceleration decision. Defaults to true when not provided.
  - `api_endpoints`: string[] **required** — IP:port entries for the API endpoints.
    [array]
  - `autoswitch`: boolean default: `false` — Automatically switch Global Acceleration regions based on device location. Defaults to false when not provided.
  - `enabled`: boolean **required** — Global acceleration settings are used only when "enabled".
  - `masque_endpoints`: string[] **required** — IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.
    [array]
  - `wireguard_endpoints`: string[] **required** — IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.
    [array]
- `include`: object[] — List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.
  [array of]
  - `address`: string **required** — The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.
  - `description`: string — A description of the Split Tunnel item, displayed in the client UI.
- `lan_allow_minutes`: number — The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, su
- `lan_allow_subnet_size`: number — The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.
- `register_interface_ip_with_dns`: boolean default: `true` — Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.
- `sccm_vpn_boundary_support`: boolean default: `false` — Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).
- `service_mode_v2`: object
  - `mode`: string — The mode to run the WARP client under.
  - `port`: number — The port number when used with proxy mode.
- `support_url`: string default: `` — The URL to launch when the Send Feedback button is clicked.
- `switch_locked`: boolean default: `false` — Whether to allow the user to turn off the WARP switch and disconnect the client.
- `tunnel_protocol`: string default: `` — Determines which tunnel protocol to use.
- `uninstall_protection`: boolean default: `false` — Determines whether uninstalling the WARP client requires an override code. (Windows only).
- `virtual_networks`: object — Virtual network access settings for the device.
  - `allowed`: string[] **required** — List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.
    [array]
  - `default`: string **required** — The default virtual network ID. Must be included in the `allowed` list.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/devices/policy

Create a device settings profile

operationId: `devices-create-device-settings-policy`

**Request** (application/json)

- `allow_mode_switch`: boolean default: `false` — Whether to allow the user to switch WARP between modes.
- `allow_updates`: boolean default: `false` — Whether to receive update notifications when a new version of the client is available.
- `allowed_to_leave`: boolean default: `true` — Whether to allow devices to leave the organization.
- `auto_connect`: number default: `0` — The amount of time in seconds to reconnect after having been disabled.
- `browser_extension_config`: object — Browser extension proxy settings. Required when profile_type is browser_extension and invalid for WARP profiles.
  - `proxy_control`: string **required** enum: `unlocked`, `locked` — Whether the user may disable the browser extension proxy.
  - `proxy_enabled`: boolean **required** — Whether the browser extension proxy is active.
- `captive_portal`: number default: `180` — Turn on the captive portal after the specified amount of time.
- `default`: boolean default: `false` — Whether the policy is the account default. WARP group profiles cannot set this field.
- `description`: string default: `` — A description of the policy.
- `disable_auto_fallback`: boolean default: `false` — If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers
- `dns_search_suffixes`: object[] default: `` — List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.
  [array of]
  - `description`: string — A description of the DNS search suffix.
  - `suffix`: string **required** — The DNS search suffix to append when resolving short hostnames.
- `enable_device_credential_authentication`: boolean default: `false` — Determines whether the WARP client can silently reauthenticate the user with device credentials (Microsoft Entra) instead of prompting for b
- `enabled`: boolean default: `true` — Whether the policy will be applied to matching devices.
- `exclude`: object[] — List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.
  [array of]
  - `address`: string **required** — The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.
  - `description`: string — A description of the Split Tunnel item, displayed in the client UI.
- `exclude_office_ips`: boolean default: `false` — Whether to add Microsoft IPs to Split Tunnel exclusions.
- `global_acceleration`: object — Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default one
  - `allow_manual_override`: boolean default: `true` — Whether WARP users may manually override the automatic Global Acceleration decision. Defaults to true when not provided.
  - `api_endpoints`: string[] **required** — IP:port entries for the API endpoints.
    [array]
  - `autoswitch`: boolean default: `false` — Automatically switch Global Acceleration regions based on device location. Defaults to false when not provided.
  - `enabled`: boolean **required** — Global acceleration settings are used only when "enabled".
  - `masque_endpoints`: string[] **required** — IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.
    [array]
  - `wireguard_endpoints`: string[] **required** — IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.
    [array]
- `include`: object[] — List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.
  [array of]
  - `address`: string **required** — The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.
  - `description`: string — A description of the Split Tunnel item, displayed in the client UI.
- `lan_allow_minutes`: number — The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, su
- `lan_allow_subnet_size`: number — The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.
- `match`: string — The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.grou
- `name`: string **required** — The name of the device settings profile.
- `precedence`: number — The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.
- `profile_type`: string enum: `warp`, `browser_extension` default: `warp` — The client type to which the device settings profile applies. This field is set when the profile is created and cannot be changed.
- `register_interface_ip_with_dns`: boolean default: `true` — Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.
- `sccm_vpn_boundary_support`: boolean default: `false` — Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).
- `service_mode_v2`: object
  - `mode`: string — The mode to run the WARP client under.
  - `port`: number — The port number when used with proxy mode.
- `support_url`: string default: `` — The URL to launch when the Send Feedback button is clicked.
- `switch_locked`: boolean default: `false` — Whether to allow the user to turn off the WARP switch and disconnect the client.
- `tunnel_protocol`: string default: `` — Determines which tunnel protocol to use.
- `uninstall_protection`: boolean default: `false` — Determines whether uninstalling the WARP client requires an override code. (Windows only).
- `virtual_networks`: object — Virtual network access settings for the device.
  - `allowed`: string[] **required** — List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.
    [array]
  - `default`: string **required** — The default virtual network ID. Must be included in the `allowed` list.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/devices/policy/{policy_id}

Delete a device settings profile

operationId: `devices-delete-device-settings-policy`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/policy/{policy_id}

Get device settings profile by ID

operationId: `devices-get-device-settings-policy-by-id`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/devices/policy/{policy_id}

Update a device settings profile

operationId: `devices-update-device-settings-policy`

**Request** (application/json)

- `allow_mode_switch`: boolean default: `false` — Whether to allow the user to switch WARP between modes.
- `allow_updates`: boolean default: `false` — Whether to receive update notifications when a new version of the client is available.
- `allowed_to_leave`: boolean default: `true` — Whether to allow devices to leave the organization.
- `auto_connect`: number default: `0` — The amount of time in seconds to reconnect after having been disabled.
- `browser_extension_config`: object — Browser extension proxy settings. Required when profile_type is browser_extension and invalid for WARP profiles.
  - `proxy_control`: string **required** enum: `unlocked`, `locked` — Whether the user may disable the browser extension proxy.
  - `proxy_enabled`: boolean **required** — Whether the browser extension proxy is active.
- `captive_portal`: number default: `180` — Turn on the captive portal after the specified amount of time.
- `default`: boolean default: `false` — Whether the policy is the account default. WARP group profiles cannot set this field.
- `description`: string — A description of the policy.
- `disable_auto_fallback`: boolean default: `false` — If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers
- `dns_search_suffixes`: object[] default: `` — List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.
  [array of]
  - `description`: string — A description of the DNS search suffix.
  - `suffix`: string **required** — The DNS search suffix to append when resolving short hostnames.
- `enable_device_credential_authentication`: boolean default: `false` — Determines whether the WARP client can silently reauthenticate the user with device credentials (Microsoft Entra) instead of prompting for b
- `enabled`: boolean — Whether the policy will be applied to matching devices.
- `exclude`: object[] — List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.
  [array of]
  - `address`: string **required** — The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.
  - `description`: string — A description of the Split Tunnel item, displayed in the client UI.
- `exclude_office_ips`: boolean default: `false` — Whether to add Microsoft IPs to Split Tunnel exclusions.
- `global_acceleration`: object — Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default one
  - `allow_manual_override`: boolean default: `true` — Whether WARP users may manually override the automatic Global Acceleration decision. Defaults to true when not provided.
  - `api_endpoints`: string[] **required** — IP:port entries for the API endpoints.
    [array]
  - `autoswitch`: boolean default: `false` — Automatically switch Global Acceleration regions based on device location. Defaults to false when not provided.
  - `enabled`: boolean **required** — Global acceleration settings are used only when "enabled".
  - `masque_endpoints`: string[] **required** — IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.
    [array]
  - `wireguard_endpoints`: string[] **required** — IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.
    [array]
- `include`: object[] — List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.
  [array of]
  - `address`: string **required** — The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.
  - `description`: string — A description of the Split Tunnel item, displayed in the client UI.
- `lan_allow_minutes`: number — The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, su
- `lan_allow_subnet_size`: number — The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.
- `match`: string — The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.grou
- `name`: string — The name of the device settings profile.
- `precedence`: number — The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.
- `register_interface_ip_with_dns`: boolean default: `true` — Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.
- `sccm_vpn_boundary_support`: boolean default: `false` — Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).
- `service_mode_v2`: object
  - `mode`: string — The mode to run the WARP client under.
  - `port`: number — The port number when used with proxy mode.
- `support_url`: string default: `` — The URL to launch when the Send Feedback button is clicked.
- `switch_locked`: boolean default: `false` — Whether to allow the user to turn off the WARP switch and disconnect the client.
- `tunnel_protocol`: string default: `` — Determines which tunnel protocol to use.
- `uninstall_protection`: boolean default: `false` — Determines whether uninstalling the WARP client requires an override code. (Windows only).
- `virtual_networks`: object — Virtual network access settings for the device.
  - `allowed`: string[] **required** — List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.
    [array]
  - `default`: string **required** — The default virtual network ID. Must be included in the `allowed` list.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/devices/policy/{policy_id}/exclude

Reset Split Tunnel exclude list

operationId: `devices-delete-split-tunnel-exclude-list-for-a-device-settings-policy` · query: `reset_defaults`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/policy/{policy_id}/exclude

Get the Split Tunnel exclude list for a device settings profile

operationId: `devices-get-split-tunnel-exclude-list-for-a-device-settings-policy`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/devices/policy/{policy_id}/exclude

Set the Split Tunnel exclude list for a device settings profile

operationId: `devices-set-split-tunnel-exclude-list-for-a-device-settings-policy`

**Request** (application/json)

[array of]
(one of 2 variants; showing the first)
- `address`: string **required** — The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.
- `description`: string — A description of the Split Tunnel item, displayed in the client UI.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/devices/policy/{policy_id}/fallback_domains

Reset Local Domain Fallback

operationId: `devices-delete-local-domain-fallback-list-for-a-device-settings-policy` · query: `reset_defaults`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/policy/{policy_id}/fallback_domains

Get the Local Domain Fallback list for a device settings profile

operationId: `devices-get-local-domain-fallback-list-for-a-device-settings-policy`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/devices/policy/{policy_id}/fallback_domains

Set the Local Domain Fallback list for a device settings profile

operationId: `devices-set-local-domain-fallback-list-for-a-device-settings-policy`

**Request** (application/json)

[array of]
- `description`: string — A description of the fallback domain, displayed in the client UI.
- `dns_server`: string[] — A list of IP addresses to handle domain resolution.
  [array]
- `suffix`: string **required** — The domain suffix to match when resolving locally.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/policy/{policy_id}/include

Get the Split Tunnel include list for a device settings profile

operationId: `devices-get-split-tunnel-include-list-for-a-device-settings-policy`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/devices/policy/{policy_id}/include

Set the Split Tunnel include list for a device settings profile

operationId: `devices-set-split-tunnel-include-list-for-a-device-settings-policy`

**Request** (application/json)

[array of]
(one of 2 variants; showing the first)
- `address`: string **required** — The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.
- `description`: string — A description of the Split Tunnel item, displayed in the client UI.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/devices/policy/exclude

Reset Split Tunnel exclude list

operationId: `devices-delete-split-tunnel-exclude-list` · query: `reset_defaults`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/policy/exclude

Get the Split Tunnel exclude list

operationId: `devices-get-split-tunnel-exclude-list`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/devices/policy/exclude

Set the Split Tunnel exclude list

operationId: `devices-set-split-tunnel-exclude-list`

**Request** (application/json)

[array of]
(one of 2 variants; showing the first)
- `address`: string **required** — The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.
- `description`: string — A description of the Split Tunnel item, displayed in the client UI.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /accounts/{account_id}/devices/policy/fallback_domains

Reset Local Domain Fallback

operationId: `devices-delete-local-domain-fallback-list` · query: `reset_defaults`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/policy/fallback_domains

Get your Local Domain Fallback list

operationId: `devices-get-local-domain-fallback-list`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/devices/policy/fallback_domains

Set your Local Domain Fallback list

operationId: `devices-set-local-domain-fallback-list`

**Request** (application/json)

[array of]
- `description`: string — A description of the fallback domain, displayed in the client UI.
- `dns_server`: string[] — A list of IP addresses to handle domain resolution.
  [array]
- `suffix`: string **required** — The domain suffix to match when resolving locally.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/policy/include

Get the Split Tunnel include list

operationId: `devices-get-split-tunnel-include-list`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/devices/policy/include

Set the Split Tunnel include list

operationId: `devices-set-split-tunnel-include-list`

**Request** (application/json)

[array of]
(one of 2 variants; showing the first)
- `address`: string **required** — The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.
- `description`: string — A description of the Split Tunnel item, displayed in the client UI.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/devices/revoke

Revoke devices (deprecated)

operationId: `devices-revoke-devices`

**Request** (application/json)

[array of]
string

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /accounts/{account_id}/devices/unrevoke

Unrevoke devices (deprecated)

operationId: `devices-unrevoke-devices`

**Request** (application/json)

[array of]
string

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/devices/policy/certificates

Get device certificate provisioning status

operationId: `devices-get-policy-certificates`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /zones/{zone_id}/devices/policy/certificates

Update device certificate provisioning status

operationId: `devices-update-policy-certificates`

**Request** (application/json)

- `enabled`: boolean **required** — The current status of the device policy certificate provisioning feature for WARP clients.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
