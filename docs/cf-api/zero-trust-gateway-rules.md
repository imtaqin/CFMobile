# Zero Trust Gateway rules

9 endpoints.

## GET /accounts/{account_id}/gateway/rules

List Zero Trust Gateway rules

operationId: `zero-trust-gateway-rules-list-zero-trust-gateway-rules` · query: `filter`, `search`, `order_by`, `direction`

**Response** 200 → `result`

[array of]
- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `created_at`: string
- `deleted_at`: string — Indicate the date of deletion, if any.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean **required** default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] **required** — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `id`: string — Identify the API resource with a UUID.
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer **required** — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `read_only`: boolean — Indicate that this rule is shared via the Orgs API and read only.
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `sharable`: boolean — Indicate that this rule is sharable via the Orgs API.
- `source_account`: string — Provide the account tag of the account that created the rule.
- `traffic`: string **required** default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To
- `updated_at`: string
- `version`: integer — Indicate the version number of the rule(read-only).
- `warning_status`: string — Indicate a warning for a misconfigured rule, if any.

## PATCH /accounts/{account_id}/gateway/rules

Patch multiple Zero Trust Gateway rules

operationId: `zero-trust-gateway-rules-patch-multiple-zero-trust-gateway-rules`

**Request** (application/json)

[array of]
- `description`: string — Specify the rule description.
- `enabled`: boolean default: `false` — Specify whether the rule is enabled.
- `id`: string **required** — Identify the API resource with a UUID.
- `name`: string — Specify the rule name.
- `precedence`: integer — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order

**Response** 200 → `result`

[array of]
- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `created_at`: string
- `deleted_at`: string — Indicate the date of deletion, if any.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean **required** default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] **required** — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `id`: string — Identify the API resource with a UUID.
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer **required** — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `read_only`: boolean — Indicate that this rule is shared via the Orgs API and read only.
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `sharable`: boolean — Indicate that this rule is sharable via the Orgs API.
- `source_account`: string — Provide the account tag of the account that created the rule.
- `traffic`: string **required** default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To
- `updated_at`: string
- `version`: integer — Indicate the version number of the rule(read-only).
- `warning_status`: string — Indicate a warning for a misconfigured rule, if any.

## POST /accounts/{account_id}/gateway/rules

Create a Zero Trust Gateway rule

operationId: `zero-trust-gateway-rules-create-zero-trust-gateway-rule`

**Request** (application/json)

- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `traffic`: string default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To

**Response** 200 → `result`

- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `created_at`: string
- `deleted_at`: string — Indicate the date of deletion, if any.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean **required** default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] **required** — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `id`: string — Identify the API resource with a UUID.
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer **required** — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `read_only`: boolean — Indicate that this rule is shared via the Orgs API and read only.
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `sharable`: boolean — Indicate that this rule is sharable via the Orgs API.
- `source_account`: string — Provide the account tag of the account that created the rule.
- `traffic`: string **required** default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To
- `updated_at`: string
- `version`: integer — Indicate the version number of the rule(read-only).
- `warning_status`: string — Indicate a warning for a misconfigured rule, if any.

## DELETE /accounts/{account_id}/gateway/rules/{rule_id}

Delete a Zero Trust Gateway rule

operationId: `zero-trust-gateway-rules-delete-zero-trust-gateway-rule`

**Response** 200 → `result`

object

## GET /accounts/{account_id}/gateway/rules/{rule_id}

Get Zero Trust Gateway rule details.

operationId: `zero-trust-gateway-rules-zero-trust-gateway-rule-details`

**Response** 200 → `result`

- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `created_at`: string
- `deleted_at`: string — Indicate the date of deletion, if any.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean **required** default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] **required** — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `id`: string — Identify the API resource with a UUID.
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer **required** — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `read_only`: boolean — Indicate that this rule is shared via the Orgs API and read only.
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `sharable`: boolean — Indicate that this rule is sharable via the Orgs API.
- `source_account`: string — Provide the account tag of the account that created the rule.
- `traffic`: string **required** default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To
- `updated_at`: string
- `version`: integer — Indicate the version number of the rule(read-only).
- `warning_status`: string — Indicate a warning for a misconfigured rule, if any.

## PATCH /accounts/{account_id}/gateway/rules/{rule_id}

Patch a Zero Trust Gateway rule

operationId: `zero-trust-gateway-rules-patch-zero-trust-gateway-rule`

**Request** (application/json)

- `description`: string — Specify the rule description.
- `enabled`: boolean default: `false` — Specify whether the rule is enabled.
- `name`: string — Specify the rule name.
- `precedence`: integer — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order

**Response** 200 → `result`

- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `created_at`: string
- `deleted_at`: string — Indicate the date of deletion, if any.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean **required** default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] **required** — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `id`: string — Identify the API resource with a UUID.
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer **required** — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `read_only`: boolean — Indicate that this rule is shared via the Orgs API and read only.
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `sharable`: boolean — Indicate that this rule is sharable via the Orgs API.
- `source_account`: string — Provide the account tag of the account that created the rule.
- `traffic`: string **required** default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To
- `updated_at`: string
- `version`: integer — Indicate the version number of the rule(read-only).
- `warning_status`: string — Indicate a warning for a misconfigured rule, if any.

## PUT /accounts/{account_id}/gateway/rules/{rule_id}

Update a Zero Trust Gateway rule

operationId: `zero-trust-gateway-rules-update-zero-trust-gateway-rule`

**Request** (application/json)

- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `traffic`: string default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To

**Response** 200 → `result`

- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `created_at`: string
- `deleted_at`: string — Indicate the date of deletion, if any.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean **required** default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] **required** — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `id`: string — Identify the API resource with a UUID.
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer **required** — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `read_only`: boolean — Indicate that this rule is shared via the Orgs API and read only.
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `sharable`: boolean — Indicate that this rule is sharable via the Orgs API.
- `source_account`: string — Provide the account tag of the account that created the rule.
- `traffic`: string **required** default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To
- `updated_at`: string
- `version`: integer — Indicate the version number of the rule(read-only).
- `warning_status`: string — Indicate a warning for a misconfigured rule, if any.

## POST /accounts/{account_id}/gateway/rules/{rule_id}/reset_expiration

Reset the expiration of a Zero Trust Gateway Rule

operationId: `zero-trust-gateway-rules-reset-expiration-zero-trust-gateway-rule`

**Response** 200 → `result`

- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `created_at`: string
- `deleted_at`: string — Indicate the date of deletion, if any.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean **required** default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] **required** — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `id`: string — Identify the API resource with a UUID.
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer **required** — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `read_only`: boolean — Indicate that this rule is shared via the Orgs API and read only.
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `sharable`: boolean — Indicate that this rule is sharable via the Orgs API.
- `source_account`: string — Provide the account tag of the account that created the rule.
- `traffic`: string **required** default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To
- `updated_at`: string
- `version`: integer — Indicate the version number of the rule(read-only).
- `warning_status`: string — Indicate a warning for a misconfigured rule, if any.

## GET /accounts/{account_id}/gateway/rules/tenant

List Zero Trust Gateway rules inherited from the parent account

operationId: `zero-trust-gateway-rules-list-zero-trust-gateway-rules-tenant`

**Response** 200 → `result`

[array of]
- `action`: string **required** enum: `on`, `off`, `allow`, `block`, `scan`, `noscan`, `safesearch`, `ytrestricted` — Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.
- `created_at`: string
- `deleted_at`: string — Indicate the date of deletion, if any.
- `description`: string — Specify the rule description.
- `device_posture`: string default: `` — Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them
- `enabled`: boolean **required** default: `false` — Specify whether the rule is enabled.
- `expiration`: object — Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any.
  - `duration`: integer — Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.
  - `expired`: boolean — Indicates whether the policy is expired.
  - `expires_at`: any **required**
- `filters`: string[] **required** — Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.
  [array]
- `id`: string — Identify the API resource with a UUID.
- `identity`: string default: `` — Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. T
- `name`: string **required** — Specify the rule name.
- `precedence`: integer **required** — Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order
- `read_only`: boolean — Indicate that this rule is shared via the Orgs API and read only.
- `rule_settings`: object — Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, co
  - `add_headers`: object — Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may c
  - `allow_child_bypass`: boolean — Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.
  - `biso_admin_controls`: object — Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.
    - `copy`: string enum: `enabled`, `disabled`, `remote_only` — Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this f
    - `dcp`: boolean — Set to false to enable copy-pasting. Only applies when `version == "v1"`.
    - `dd`: boolean — Set to false to enable downloading. Only applies when `version == "v1"`.
    - `dk`: boolean — Set to false to enable keyboard usage. Only applies when `version == "v1"`.
    - `download`: string enum: `enabled`, `disabled`, `remote_only` — Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading re
    - `dp`: boolean — Set to false to enable printing. Only applies when `version == "v1"`.
    - `du`: boolean — Set to false to enable uploading. Only applies when `version == "v1"`.
    - `keyboard`: string enum: `enabled`, `disabled`, `enable_read_only_actions` — Configure keyboard usage behavior. When set to enable_read_only_actions, only approved browser commands (find, copy, print, zoom, and select
    - `paste`: string enum: `enabled`, `disabled`, `remote_only` — Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is a
    - `printing`: string enum: `enabled`, `disabled` — Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".
    - `upload`: string enum: `enabled`, `disabled` — Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".
    - `version`: string enum: `v1`, `v2` default: `v1` — Indicate which version of the browser isolation controls should apply.
    - `wm_id`: string — Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.
  - `block_page`: object — Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `b
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `block_page_enabled`: boolean — Enable the custom block page. Settable only for `dns` rules with action `block`.
  - `block_reason`: string — Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules
  - `bypass_parent_rule`: boolean — Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.
  - `check_session`: object — Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.
    - `duration`: string — Sets the required session freshness threshold. The API returns a normalized version of this value.
    - `enforce`: boolean — Enable session enforcement.
  - `delete_headers`: string[] — Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name
    [array]
  - `dns_resolvers`: object — Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_int
    - `ipv4`: object[]
    - `ipv6`: object[]
  - `egress`: object — Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate 
    - `ipv4`: string — Specify the IPv4 address to use for egress.
    - `ipv4_fallback`: string — Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.
    - `ipv6`: string — Specify the IPv6 range to use for egress.
  - `forensic_copy`: object — Configure whether a copy of the HTTP request will be sent to storage when the rule matches.
    - `enabled`: boolean — Enable sending the copy to storage.
  - `forward`: object — Forward matching HTTP requests to a Worker. Required for `http` rules with the action set to `forward`.
    - `worker_id`: string **required** — Specify the public Worker ID of the target Worker.
  - `ignore_cname_category_matches`: boolean — Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in th
  - `insecure_disable_dnssec_validation`: boolean — Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.
  - `ip_categories`: boolean — Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for 
  - `ip_indicator_feeds`: boolean — Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for 
  - `l4override`: object — Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.
    - `ip`: string — Defines the IPv4 or IPv6 address.
    - `port`: integer — Defines a port number to use for TCP/UDP overrides.
  - `notification_settings`: object — Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `blo
    - `enabled`: boolean — Enable notification.
    - `include_context`: boolean — Indicates whether to pass the context information as query parameters.
    - `msg`: string — Customize the message shown in the notification.
    - `support_url`: string — Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.
  - `override_host`: string — Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.
  - `override_ips`: string[] — Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.
    [array]
  - `payload_log`: object — Configure DLP payload logging. Settable only for `http` rules.
    - `enabled`: boolean — Enable DLP payload logging for this rule.
  - `quarantine`: object — Configure settings that apply to quarantine rules. Settable only for `http` rules.
    - `file_types`: string[] — Specify the types of files to sandbox.
  - `redirect`: object — Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.
    - `include_context`: boolean — Specify whether to pass the context information as query parameters.
    - `preserve_path_and_query`: boolean — Specify whether to append the path and query parameters from the original request to target_uri.
    - `target_uri`: string **required** — Specify the URI to which the user is redirected.
  - `resolve_dns_internally`: object — Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is speci
    - `fallback`: string enum: `none`, `public_dns` — Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CN
    - `view_id`: string — Specify the internal DNS view identifier to pass to the internal DNS service.
  - `resolve_dns_through_cloudflare`: boolean — Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'res
  - `set_headers`: object — Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may 
  - `untrusted_cert`: object — Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `al
    - `action`: string enum: `pass_through`, `block`, `error` — Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.
- `schedule`: object — Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.
  - `fri`: string — Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rul
  - `mon`: string — Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits).
  - `sat`: string — Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the r
  - `sun`: string — Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule
  - `thu`: string — Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the ru
  - `time_zone`: string — Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#L
  - `tue`: string — Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rul
  - `wed`: string — Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the r
- `sharable`: boolean — Indicate that this rule is sharable via the Orgs API.
- `source_account`: string — Provide the account tag of the account that created the rule.
- `traffic`: string **required** default: `` — Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To
- `updated_at`: string
- `version`: integer — Indicate the version number of the rule(read-only).
- `warning_status`: string — Indicate a warning for a misconfigured rule, if any.
