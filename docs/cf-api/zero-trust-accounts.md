# Zero Trust accounts

13 endpoints.

## DELETE /accounts/{account_id}/devices/settings

Reset device settings

operationId: `zero-trust-accounts-delete-device-settings-for-zero-trust-account`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/devices/settings

Get device settings

operationId: `zero-trust-accounts-get-device-settings-for-zero-trust-account`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /accounts/{account_id}/devices/settings

Update device settings

operationId: `zero-trust-accounts-patch-device-settings-for-the-zero-trust-account`

**Request** (application/json)

- `disable_for_time`: number — Sets the time limit, in seconds, that a user can use an override code to bypass WARP.
- `external_emergency_signal_enabled`: boolean — Controls whether the external emergency disconnect feature is enabled.
- `external_emergency_signal_fingerprint`: string — The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external_emergency_signal_url. If provided, the W
- `external_emergency_signal_interval`: string — The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., "5m", "2m30s", "1h"). M
- `external_emergency_signal_url`: string — The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.
- `gateway_proxy_enabled`: boolean — Enable gateway proxy filtering on TCP.
- `gateway_udp_proxy_enabled`: boolean — Enable gateway proxy filtering on UDP.
- `root_certificate_installation_enabled`: boolean — Enable installation of cloudflare managed root certificate.
- `use_zt_virtual_ip`: boolean — Enable using CGNAT virtual IPv4.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /accounts/{account_id}/devices/settings

Update device settings (deprecated)

operationId: `zero-trust-accounts-update-device-settings-for-the-zero-trust-account`

**Request** (application/json)

- `disable_for_time`: number — Sets the time limit, in seconds, that a user can use an override code to bypass WARP.
- `external_emergency_signal_enabled`: boolean — Controls whether the external emergency disconnect feature is enabled.
- `external_emergency_signal_fingerprint`: string — The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external_emergency_signal_url. If provided, the W
- `external_emergency_signal_interval`: string — The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., "5m", "2m30s", "1h"). M
- `external_emergency_signal_url`: string — The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.
- `gateway_proxy_enabled`: boolean — Enable gateway proxy filtering on TCP.
- `gateway_udp_proxy_enabled`: boolean — Enable gateway proxy filtering on UDP.
- `root_certificate_installation_enabled`: boolean — Enable installation of cloudflare managed root certificate.
- `use_zt_virtual_ip`: boolean — Enable using CGNAT virtual IPv4.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /accounts/{account_id}/gateway

Get Zero Trust account information

operationId: `zero-trust-accounts-get-zero-trust-account-information`

**Response** 200 → `result`

- `gateway_tag`: string — Specify the gateway internal ID.
- `id`: string — Specify the Cloudflare account ID.
- `provider_name`: string — Specify the provider name (usually Cloudflare).

## POST /accounts/{account_id}/gateway

Create Zero Trust account

operationId: `zero-trust-accounts-create-zero-trust-account`

**Response** 200 → `result`

- `gateway_tag`: string — Specify the gateway internal ID.
- `id`: string — Specify the Cloudflare account ID.
- `provider_name`: string — Specify the provider name (usually Cloudflare).

## GET /accounts/{account_id}/gateway/configuration

Get Zero Trust account configuration

operationId: `zero-trust-accounts-get-zero-trust-account-configuration`

**Response** 200 → `result`

- `settings`: object — Specify account settings.
  - `activity_log`: object — Specify activity log settings.
    - `enabled`: boolean — Specify whether to log activity.
  - `antivirus`: object — Specify anti-virus settings.
    - `enabled_download_phase`: boolean — Specify whether to enable anti-virus scanning on downloads.
    - `enabled_upload_phase`: boolean — Specify whether to enable anti-virus scanning on uploads.
    - `fail_closed`: boolean — Specify whether to block requests for unscannable files.
    - `notification_settings`: object — Configure the message the user's device shows during an antivirus scan.
  - `block_page`: object — Specify block page layout settings.
    - `background_color`: string — Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.
    - `enabled`: boolean — Specify whether to enable the custom block page.
    - `footer_text`: string — Specify the block page footer text when the mode is customized_block_page.
    - `header_text`: string — Specify the block page header text when the mode is customized_block_page.
    - `include_context`: boolean — Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.
    - `logo_path`: string — Specify the full URL to the logo file when the mode is customized_block_page.
    - `mailto_address`: string — Specify the admin email for users to contact when the mode is customized_block_page.
    - `mailto_subject`: string — Specify the subject line for emails created from the block page when the mode is customized_block_page.
    - `mode`: string enum: ``, `customized_block_page`, `redirect_uri` default: `` — Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.
    - `name`: string — Specify the block page title when the mode is customized_block_page.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `suppress_footer`: boolean — Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.
    - `target_uri`: string — Specify the URI to redirect users to when the mode is redirect_uri.
    - `version`: integer — Indicate the version number of the setting.
  - `body_scanning`: object — Specify the DLP inspection mode.
    - `inspection_mode`: string enum: `deep`, `shallow` — Specify the inspection mode as either `deep` or `shallow`.
  - `browser_isolation`: object — Specify Clientless Browser Isolation settings.
    - `non_identity_enabled`: boolean — Specify whether to enable non-identity onramp support for Browser Isolation.
    - `url_browser_isolation_enabled`: boolean — Specify whether to enable Clientless Browser Isolation.
  - `certificate`: object — Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.
    - `id`: string **required** — Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A ni
  - `custom_certificate`: object — Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.
    - `binding_status`: string — Indicate the internal certificate status.
    - `enabled`: boolean **required** — Specify whether to enable a custom certificate authority for signing Gateway traffic.
    - `id`: string — Specify the UUID of the certificate (ID from MTLS certificate store).
    - `updated_at`: string
  - `extended_email_matching`: object — Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion 
    - `enabled`: boolean — Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `version`: integer — Indicate the version number of the setting.
  - `fips`: object — Specify FIPS settings.
    - `tls`: boolean — Enforce cipher suites and TLS versions compliant with FIPS 140-2.
  - `host_selector`: object — Enable host selection in egress policies.
    - `enabled`: boolean — Specify whether to enable filtering via hosts for egress policies.
  - `inspection`: object — Define the proxy inspection mode.
    - `mode`: string enum: `static`, `dynamic` — Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspect
  - `max_ttl_secs`: integer — Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null me
  - `protocol_detection`: object — Specify whether to detect protocols from the initial bytes of client traffic.
    - `enabled`: boolean — Specify whether to detect protocols from the initial bytes of client traffic.
  - `sandbox`: object — Specify whether to enable the sandbox.
    - `enabled`: boolean — Specify whether to enable the sandbox.
    - `fallback_action`: string enum: `allow`, `block` — Specify the action to take when the system cannot scan the file.
  - `tls_decrypt`: object — Specify whether to inspect encrypted HTTP traffic.
    - `enabled`: boolean — Specify whether to inspect encrypted HTTP traffic.
- `created_at`: string
- `updated_at`: string

## PATCH /accounts/{account_id}/gateway/configuration

Patch Zero Trust account configuration

operationId: `zero-trust-accounts-patch-zero-trust-account-configuration`

**Request** (application/json)

- `settings`: object — Specify account settings.
  - `activity_log`: object — Specify activity log settings.
    - `enabled`: boolean — Specify whether to log activity.
  - `antivirus`: object — Specify anti-virus settings.
    - `enabled_download_phase`: boolean — Specify whether to enable anti-virus scanning on downloads.
    - `enabled_upload_phase`: boolean — Specify whether to enable anti-virus scanning on uploads.
    - `fail_closed`: boolean — Specify whether to block requests for unscannable files.
    - `notification_settings`: object — Configure the message the user's device shows during an antivirus scan.
  - `block_page`: object — Specify block page layout settings.
    - `background_color`: string — Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.
    - `enabled`: boolean — Specify whether to enable the custom block page.
    - `footer_text`: string — Specify the block page footer text when the mode is customized_block_page.
    - `header_text`: string — Specify the block page header text when the mode is customized_block_page.
    - `include_context`: boolean — Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.
    - `logo_path`: string — Specify the full URL to the logo file when the mode is customized_block_page.
    - `mailto_address`: string — Specify the admin email for users to contact when the mode is customized_block_page.
    - `mailto_subject`: string — Specify the subject line for emails created from the block page when the mode is customized_block_page.
    - `mode`: string enum: ``, `customized_block_page`, `redirect_uri` default: `` — Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.
    - `name`: string — Specify the block page title when the mode is customized_block_page.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `suppress_footer`: boolean — Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.
    - `target_uri`: string — Specify the URI to redirect users to when the mode is redirect_uri.
    - `version`: integer — Indicate the version number of the setting.
  - `body_scanning`: object — Specify the DLP inspection mode.
    - `inspection_mode`: string enum: `deep`, `shallow` — Specify the inspection mode as either `deep` or `shallow`.
  - `browser_isolation`: object — Specify Clientless Browser Isolation settings.
    - `non_identity_enabled`: boolean — Specify whether to enable non-identity onramp support for Browser Isolation.
    - `url_browser_isolation_enabled`: boolean — Specify whether to enable Clientless Browser Isolation.
  - `certificate`: object — Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.
    - `id`: string **required** — Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A ni
  - `custom_certificate`: object — Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.
    - `binding_status`: string — Indicate the internal certificate status.
    - `enabled`: boolean **required** — Specify whether to enable a custom certificate authority for signing Gateway traffic.
    - `id`: string — Specify the UUID of the certificate (ID from MTLS certificate store).
    - `updated_at`: string
  - `extended_email_matching`: object — Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion 
    - `enabled`: boolean — Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `version`: integer — Indicate the version number of the setting.
  - `fips`: object — Specify FIPS settings.
    - `tls`: boolean — Enforce cipher suites and TLS versions compliant with FIPS 140-2.
  - `host_selector`: object — Enable host selection in egress policies.
    - `enabled`: boolean — Specify whether to enable filtering via hosts for egress policies.
  - `inspection`: object — Define the proxy inspection mode.
    - `mode`: string enum: `static`, `dynamic` — Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspect
  - `max_ttl_secs`: integer — Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null me
  - `protocol_detection`: object — Specify whether to detect protocols from the initial bytes of client traffic.
    - `enabled`: boolean — Specify whether to detect protocols from the initial bytes of client traffic.
  - `sandbox`: object — Specify whether to enable the sandbox.
    - `enabled`: boolean — Specify whether to enable the sandbox.
    - `fallback_action`: string enum: `allow`, `block` — Specify the action to take when the system cannot scan the file.
  - `tls_decrypt`: object — Specify whether to inspect encrypted HTTP traffic.
    - `enabled`: boolean — Specify whether to inspect encrypted HTTP traffic.

**Response** 200 → `result`

- `settings`: object — Specify account settings.
  - `activity_log`: object — Specify activity log settings.
    - `enabled`: boolean — Specify whether to log activity.
  - `antivirus`: object — Specify anti-virus settings.
    - `enabled_download_phase`: boolean — Specify whether to enable anti-virus scanning on downloads.
    - `enabled_upload_phase`: boolean — Specify whether to enable anti-virus scanning on uploads.
    - `fail_closed`: boolean — Specify whether to block requests for unscannable files.
    - `notification_settings`: object — Configure the message the user's device shows during an antivirus scan.
  - `block_page`: object — Specify block page layout settings.
    - `background_color`: string — Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.
    - `enabled`: boolean — Specify whether to enable the custom block page.
    - `footer_text`: string — Specify the block page footer text when the mode is customized_block_page.
    - `header_text`: string — Specify the block page header text when the mode is customized_block_page.
    - `include_context`: boolean — Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.
    - `logo_path`: string — Specify the full URL to the logo file when the mode is customized_block_page.
    - `mailto_address`: string — Specify the admin email for users to contact when the mode is customized_block_page.
    - `mailto_subject`: string — Specify the subject line for emails created from the block page when the mode is customized_block_page.
    - `mode`: string enum: ``, `customized_block_page`, `redirect_uri` default: `` — Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.
    - `name`: string — Specify the block page title when the mode is customized_block_page.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `suppress_footer`: boolean — Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.
    - `target_uri`: string — Specify the URI to redirect users to when the mode is redirect_uri.
    - `version`: integer — Indicate the version number of the setting.
  - `body_scanning`: object — Specify the DLP inspection mode.
    - `inspection_mode`: string enum: `deep`, `shallow` — Specify the inspection mode as either `deep` or `shallow`.
  - `browser_isolation`: object — Specify Clientless Browser Isolation settings.
    - `non_identity_enabled`: boolean — Specify whether to enable non-identity onramp support for Browser Isolation.
    - `url_browser_isolation_enabled`: boolean — Specify whether to enable Clientless Browser Isolation.
  - `certificate`: object — Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.
    - `id`: string **required** — Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A ni
  - `custom_certificate`: object — Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.
    - `binding_status`: string — Indicate the internal certificate status.
    - `enabled`: boolean **required** — Specify whether to enable a custom certificate authority for signing Gateway traffic.
    - `id`: string — Specify the UUID of the certificate (ID from MTLS certificate store).
    - `updated_at`: string
  - `extended_email_matching`: object — Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion 
    - `enabled`: boolean — Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `version`: integer — Indicate the version number of the setting.
  - `fips`: object — Specify FIPS settings.
    - `tls`: boolean — Enforce cipher suites and TLS versions compliant with FIPS 140-2.
  - `host_selector`: object — Enable host selection in egress policies.
    - `enabled`: boolean — Specify whether to enable filtering via hosts for egress policies.
  - `inspection`: object — Define the proxy inspection mode.
    - `mode`: string enum: `static`, `dynamic` — Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspect
  - `max_ttl_secs`: integer — Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null me
  - `protocol_detection`: object — Specify whether to detect protocols from the initial bytes of client traffic.
    - `enabled`: boolean — Specify whether to detect protocols from the initial bytes of client traffic.
  - `sandbox`: object — Specify whether to enable the sandbox.
    - `enabled`: boolean — Specify whether to enable the sandbox.
    - `fallback_action`: string enum: `allow`, `block` — Specify the action to take when the system cannot scan the file.
  - `tls_decrypt`: object — Specify whether to inspect encrypted HTTP traffic.
    - `enabled`: boolean — Specify whether to inspect encrypted HTTP traffic.
- `created_at`: string
- `updated_at`: string

## PUT /accounts/{account_id}/gateway/configuration

Update Zero Trust account configuration

operationId: `zero-trust-accounts-update-zero-trust-account-configuration.`

**Request** (application/json)

- `settings`: object — Specify account settings.
  - `activity_log`: object — Specify activity log settings.
    - `enabled`: boolean — Specify whether to log activity.
  - `antivirus`: object — Specify anti-virus settings.
    - `enabled_download_phase`: boolean — Specify whether to enable anti-virus scanning on downloads.
    - `enabled_upload_phase`: boolean — Specify whether to enable anti-virus scanning on uploads.
    - `fail_closed`: boolean — Specify whether to block requests for unscannable files.
    - `notification_settings`: object — Configure the message the user's device shows during an antivirus scan.
  - `block_page`: object — Specify block page layout settings.
    - `background_color`: string — Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.
    - `enabled`: boolean — Specify whether to enable the custom block page.
    - `footer_text`: string — Specify the block page footer text when the mode is customized_block_page.
    - `header_text`: string — Specify the block page header text when the mode is customized_block_page.
    - `include_context`: boolean — Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.
    - `logo_path`: string — Specify the full URL to the logo file when the mode is customized_block_page.
    - `mailto_address`: string — Specify the admin email for users to contact when the mode is customized_block_page.
    - `mailto_subject`: string — Specify the subject line for emails created from the block page when the mode is customized_block_page.
    - `mode`: string enum: ``, `customized_block_page`, `redirect_uri` default: `` — Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.
    - `name`: string — Specify the block page title when the mode is customized_block_page.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `suppress_footer`: boolean — Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.
    - `target_uri`: string — Specify the URI to redirect users to when the mode is redirect_uri.
    - `version`: integer — Indicate the version number of the setting.
  - `body_scanning`: object — Specify the DLP inspection mode.
    - `inspection_mode`: string enum: `deep`, `shallow` — Specify the inspection mode as either `deep` or `shallow`.
  - `browser_isolation`: object — Specify Clientless Browser Isolation settings.
    - `non_identity_enabled`: boolean — Specify whether to enable non-identity onramp support for Browser Isolation.
    - `url_browser_isolation_enabled`: boolean — Specify whether to enable Clientless Browser Isolation.
  - `certificate`: object — Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.
    - `id`: string **required** — Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A ni
  - `custom_certificate`: object — Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.
    - `binding_status`: string — Indicate the internal certificate status.
    - `enabled`: boolean **required** — Specify whether to enable a custom certificate authority for signing Gateway traffic.
    - `id`: string — Specify the UUID of the certificate (ID from MTLS certificate store).
    - `updated_at`: string
  - `extended_email_matching`: object — Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion 
    - `enabled`: boolean — Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `version`: integer — Indicate the version number of the setting.
  - `fips`: object — Specify FIPS settings.
    - `tls`: boolean — Enforce cipher suites and TLS versions compliant with FIPS 140-2.
  - `host_selector`: object — Enable host selection in egress policies.
    - `enabled`: boolean — Specify whether to enable filtering via hosts for egress policies.
  - `inspection`: object — Define the proxy inspection mode.
    - `mode`: string enum: `static`, `dynamic` — Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspect
  - `max_ttl_secs`: integer — Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null me
  - `protocol_detection`: object — Specify whether to detect protocols from the initial bytes of client traffic.
    - `enabled`: boolean — Specify whether to detect protocols from the initial bytes of client traffic.
  - `sandbox`: object — Specify whether to enable the sandbox.
    - `enabled`: boolean — Specify whether to enable the sandbox.
    - `fallback_action`: string enum: `allow`, `block` — Specify the action to take when the system cannot scan the file.
  - `tls_decrypt`: object — Specify whether to inspect encrypted HTTP traffic.
    - `enabled`: boolean — Specify whether to inspect encrypted HTTP traffic.

**Response** 200 → `result`

- `settings`: object — Specify account settings.
  - `activity_log`: object — Specify activity log settings.
    - `enabled`: boolean — Specify whether to log activity.
  - `antivirus`: object — Specify anti-virus settings.
    - `enabled_download_phase`: boolean — Specify whether to enable anti-virus scanning on downloads.
    - `enabled_upload_phase`: boolean — Specify whether to enable anti-virus scanning on uploads.
    - `fail_closed`: boolean — Specify whether to block requests for unscannable files.
    - `notification_settings`: object — Configure the message the user's device shows during an antivirus scan.
  - `block_page`: object — Specify block page layout settings.
    - `background_color`: string — Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.
    - `enabled`: boolean — Specify whether to enable the custom block page.
    - `footer_text`: string — Specify the block page footer text when the mode is customized_block_page.
    - `header_text`: string — Specify the block page header text when the mode is customized_block_page.
    - `include_context`: boolean — Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.
    - `logo_path`: string — Specify the full URL to the logo file when the mode is customized_block_page.
    - `mailto_address`: string — Specify the admin email for users to contact when the mode is customized_block_page.
    - `mailto_subject`: string — Specify the subject line for emails created from the block page when the mode is customized_block_page.
    - `mode`: string enum: ``, `customized_block_page`, `redirect_uri` default: `` — Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.
    - `name`: string — Specify the block page title when the mode is customized_block_page.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `suppress_footer`: boolean — Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.
    - `target_uri`: string — Specify the URI to redirect users to when the mode is redirect_uri.
    - `version`: integer — Indicate the version number of the setting.
  - `body_scanning`: object — Specify the DLP inspection mode.
    - `inspection_mode`: string enum: `deep`, `shallow` — Specify the inspection mode as either `deep` or `shallow`.
  - `browser_isolation`: object — Specify Clientless Browser Isolation settings.
    - `non_identity_enabled`: boolean — Specify whether to enable non-identity onramp support for Browser Isolation.
    - `url_browser_isolation_enabled`: boolean — Specify whether to enable Clientless Browser Isolation.
  - `certificate`: object — Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.
    - `id`: string **required** — Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A ni
  - `custom_certificate`: object — Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.
    - `binding_status`: string — Indicate the internal certificate status.
    - `enabled`: boolean **required** — Specify whether to enable a custom certificate authority for signing Gateway traffic.
    - `id`: string — Specify the UUID of the certificate (ID from MTLS certificate store).
    - `updated_at`: string
  - `extended_email_matching`: object — Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion 
    - `enabled`: boolean — Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.
    - `read_only`: boolean — Indicate that this setting was shared via the Orgs API and read only for the current account.
    - `source_account`: string — Indicate the account tag of the account that shared this setting.
    - `version`: integer — Indicate the version number of the setting.
  - `fips`: object — Specify FIPS settings.
    - `tls`: boolean — Enforce cipher suites and TLS versions compliant with FIPS 140-2.
  - `host_selector`: object — Enable host selection in egress policies.
    - `enabled`: boolean — Specify whether to enable filtering via hosts for egress policies.
  - `inspection`: object — Define the proxy inspection mode.
    - `mode`: string enum: `static`, `dynamic` — Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspect
  - `max_ttl_secs`: integer — Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null me
  - `protocol_detection`: object — Specify whether to detect protocols from the initial bytes of client traffic.
    - `enabled`: boolean — Specify whether to detect protocols from the initial bytes of client traffic.
  - `sandbox`: object — Specify whether to enable the sandbox.
    - `enabled`: boolean — Specify whether to enable the sandbox.
    - `fallback_action`: string enum: `allow`, `block` — Specify the action to take when the system cannot scan the file.
  - `tls_decrypt`: object — Specify whether to inspect encrypted HTTP traffic.
    - `enabled`: boolean — Specify whether to inspect encrypted HTTP traffic.
- `created_at`: string
- `updated_at`: string

## GET /accounts/{account_id}/gateway/configuration/custom_certificate

Get Zero Trust certificate configuration

operationId: `zero-trust-accounts-get-zero-trust-certificate-configuration`

**Response** 200 → `result`

- `binding_status`: string — Indicate the internal certificate status.
- `enabled`: boolean **required** — Specify whether to enable a custom certificate authority for signing Gateway traffic.
- `id`: string — Specify the UUID of the certificate (ID from MTLS certificate store).
- `updated_at`: string

## GET /accounts/{account_id}/gateway/egress_cidr_pairs

Get gateway egress CIDRs pairs assigned to this account

operationId: `zero-trust-accounts-get-egress-cidr-pairs`

**Response** 200 → `result`

[array of]
- `geolocation`: object **required** — Specify the geographic location of this CIDR pair.
  - `city`: string — Specify the city of this egress IP.
  - `country`: string — Specify the country of this egress IP.
- `ipv4`: string **required** — Specify the IPv4 address of this egress CIDR pair.
- `ipv4_colo_name`: string **required** — Specify the colocation from which this IPv4 address egresses.
- `ipv6_cidr`: string **required** — Specify the IPv6 network address of this egress CIDR pair.

## GET /accounts/{account_id}/gateway/logging

Get logging settings for the Zero Trust account

operationId: `zero-trust-accounts-get-logging-settings-for-the-zero-trust-account`

**Response** 200 → `result`

- `redact_pii`: boolean default: `false` — Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, dev
- `settings_by_rule_type`: object — Configure logging settings for each rule type.
  - `dns`: any — Configure logging settings for DNS firewall.
  - `http`: any — Configure logging settings for HTTP/HTTPS firewall.
  - `l4`: any — Configure logging settings for Network firewall.

## PUT /accounts/{account_id}/gateway/logging

Update Zero Trust account logging settings

operationId: `zero-trust-accounts-update-logging-settings-for-the-zero-trust-account`

**Request** (application/json)

- `redact_pii`: boolean default: `false` — Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, dev
- `settings_by_rule_type`: object — Configure logging settings for each rule type.
  - `dns`: any — Configure logging settings for DNS firewall.
  - `http`: any — Configure logging settings for HTTP/HTTPS firewall.
  - `l4`: any — Configure logging settings for Network firewall.

**Response** 200 → `result`

- `redact_pii`: boolean default: `false` — Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, dev
- `settings_by_rule_type`: object — Configure logging settings for each rule type.
  - `dns`: any — Configure logging settings for DNS firewall.
  - `http`: any — Configure logging settings for HTTP/HTTPS firewall.
  - `l4`: any — Configure logging settings for Network firewall.
